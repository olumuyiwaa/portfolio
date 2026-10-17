import { createHash } from "crypto";
import { getDb } from "@/lib/mongo";

// Privacy-friendly site analytics stored in MongoDB (collection "events").
// No cookies and no IP addresses are stored: a visitor is an anonymous hash
// of IP + user agent + day, so the same person on a different day counts again.
export const TZ = "Africa/Lagos";
const RETENTION_SECONDS = 60 * 60 * 24 * 400;

let indexesReady;
async function events() {
  const db = await getDb();
  if (!db) return null;
  const col = db.collection("events");
  if (!indexesReady) {
    indexesReady = col
      .createIndexes([
        { key: { ts: 1 }, expireAfterSeconds: RETENTION_SECONDS, name: "ts_ttl" },
      ])
      .catch(() => {});
  }
  await indexesReady;
  return col;
}

export function visitorHash(ip, ua) {
  const day = new Date().toISOString().slice(0, 10);
  const salt = process.env.ANALYTICS_SECRET || process.env.ANALYTICS_PASSWORD || "portfolio";
  return createHash("sha256").update(`${salt}|${day}|${ip}|${ua}`).digest("hex").slice(0, 16);
}

export async function recordEvent(doc) {
  const col = await events();
  if (!col) return false;
  await col.insertOne({ ...doc, ts: new Date() });
  return true;
}

// ---------- reading ----------

const dayFormat = new Intl.DateTimeFormat("en-CA", { timeZone: TZ }); // YYYY-MM-DD
const dayKey = (d) => dayFormat.format(d);
const MAX_EVENTS = 300000; // safety cap; a personal site is far below this

function rank(map, limit) {
  return [...map.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count || String(a.label).localeCompare(String(b.label)))
    .slice(0, limit);
}

function summarize(docs) {
  const views = docs.filter((e) => e.type === "view");
  return {
    views: views.length,
    visitors: new Set(views.map((e) => e.vid)).size,
    clicks: docs.length - views.length,
  };
}

// Reads the period and the one before it in a single query and works out every
// figure in JavaScript, so it behaves the same on any MongoDB deployment.
export async function getStats(days = 30) {
  const col = await events();
  if (!col) return null;

  const now = new Date();
  const since = new Date(now.getTime() - days * 86400000);
  const prevSince = new Date(since.getTime() - days * 86400000);

  const all = await col
    .find({ ts: { $gte: prevSince } }, { projection: { _id: 0, type: 1, path: 1, to: 1, ref: 1, vid: 1, country: 1, device: 1, browser: 1, os: 1, ts: 1 } })
    .sort({ ts: -1 })
    .limit(MAX_EVENTS)
    .toArray();

  const docs = all.filter((e) => e.ts >= since);
  const prevDocs = all.filter((e) => e.ts < since);
  const views = docs.filter((e) => e.type === "view");

  // Per day: page views and unique visitors, with empty days filled in.
  const byDay = new Map();
  for (const e of views) {
    const k = dayKey(e.ts);
    const d = byDay.get(k) || { views: 0, vids: new Set() };
    d.views++;
    d.vids.add(e.vid);
    byDay.set(k, d);
  }
  const series = [];
  for (let i = days - 1; i >= 0; i--) {
    const day = dayKey(new Date(now.getTime() - i * 86400000));
    const d = byDay.get(day);
    series.push({ day, views: d?.views || 0, visitors: d?.vids.size || 0 });
  }

  // Top pages.
  const pageMap = new Map();
  for (const e of views) {
    const p = pageMap.get(e.path) || { views: 0, vids: new Set() };
    p.views++;
    p.vids.add(e.vid);
    pageMap.set(e.path, p);
  }
  const pages = [...pageMap.entries()]
    .map(([path, p]) => ({ path, views: p.views, visitors: p.vids.size }))
    .sort((a, b) => b.views - a.views || a.path.localeCompare(b.path))
    .slice(0, 10);

  // Referrers: unique visitors whose visit came from somewhere; the rest are direct.
  const refVids = new Map(); // ref -> Set(vid)
  const withRef = new Set();
  for (const e of views) {
    if (!e.ref) continue;
    withRef.add(e.vid);
    if (!refVids.has(e.ref)) refVids.set(e.ref, new Set());
    refVids.get(e.ref).add(e.vid);
  }
  const referrers = rank(new Map([...refVids].map(([k, v]) => [k, v.size])), 8);
  const allVids = new Set(views.map((e) => e.vid));
  const direct = [...allVids].filter((v) => !withRef.has(v)).length;

  // Audience breakdowns: one entry per unique visitor.
  const firstSeen = new Map();
  for (const e of views) if (!firstSeen.has(e.vid)) firstSeen.set(e.vid, e);
  const tally = (field, limit) => {
    const m = new Map();
    for (const e of firstSeen.values()) if (e[field]) m.set(e[field], (m.get(e[field]) || 0) + 1);
    return rank(m, limit);
  };

  const clickMap = new Map();
  for (const e of docs) if (e.type === "click" && e.to) clickMap.set(e.to, (clickMap.get(e.to) || 0) + 1);

  const liveCutoff = now.getTime() - 30 * 60000;
  const live = new Set(views.filter((e) => e.ts.getTime() >= liveCutoff).map((e) => e.vid)).size;

  return {
    days,
    current: summarize(docs),
    previous: summarize(prevDocs),
    series,
    pages,
    referrers,
    direct,
    countries: tally("country", 8),
    devices: tally("device", 5),
    browsers: tally("browser", 6),
    systems: tally("os", 6),
    clicks: rank(clickMap, 8),
    recent: docs.slice(0, 15).map((e) => ({
      type: e.type,
      path: e.path,
      to: e.to,
      ref: e.ref,
      country: e.country,
      device: e.device,
      ts: e.ts.toISOString(),
    })),
    live,
  };
}
