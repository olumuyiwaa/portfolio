import { projects } from "@/lib/projects";
import { SITE_URL } from "@/lib/siteConfig";
import { recordEvent, visitorHash } from "@/lib/analytics";
import { isBot, parseUA } from "@/lib/uaParse";

export const dynamic = "force-dynamic";

// Receives page views and outbound clicks from the Tracker component.
// It always answers 204 so tracking can never break or slow the site.
const KNOWN_PATHS = new Set(["/", "/projects", "/about", "/contact", ...projects.map((p) => `/projects/${p.slug}`)]);

// Best-effort per-instance throttle: 120 events per minute per IP.
const hits = new Map();
function throttled(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 60000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 120;
}

function clientIp(headers) {
  return (
    headers.get("x-nf-client-connection-ip") ||
    headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    "unknown"
  );
}

function countryOf(headers) {
  const nf = headers.get("x-nf-geo"); // Netlify: base64-encoded JSON
  if (nf) {
    try {
      const code = JSON.parse(Buffer.from(nf, "base64").toString("utf8"))?.country?.code;
      if (typeof code === "string" && /^[A-Za-z]{2}$/.test(code)) return code.toUpperCase();
    } catch {}
  }
  const raw = headers.get("x-country") || headers.get("cf-ipcountry") || headers.get("x-vercel-ip-country");
  return raw && /^[A-Za-z]{2}$/.test(raw) ? raw.toUpperCase() : null;
}

const hostOf = (value) => {
  try {
    return new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
};

export async function POST(request) {
  const done = () => new Response(null, { status: 204 });
  try {
    const headers = request.headers;
    const ua = headers.get("user-agent") || "";
    const ip = clientIp(headers);
    if (isBot(ua) || throttled(ip)) return done();

    let data;
    try {
      data = JSON.parse(await request.text());
    } catch {
      return done();
    }
    if (!data || typeof data !== "object") return done();

    const path = typeof data.path === "string" ? data.path.split(/[?#]/)[0].replace(/(.)\/$/, "$1").slice(0, 200) : "";
    if (!path.startsWith("/") || path.startsWith("/insights") || path.startsWith("/api")) return done();

    const base = { path: KNOWN_PATHS.has(path) ? path : "(not found)", vid: visitorHash(ip, ua), country: countryOf(headers), ...parseUA(ua) };

    if (data.type === "click") {
      const to = typeof data.to === "string" ? data.to.trim().slice(0, 200) : "";
      if (!to) return done();
      await recordEvent({ type: "click", to, ...base });
      return done();
    }

    if (data.type !== "view") return done();

    // Referrer: drop self-referrals; fall back to ?utm_source / ?ref.
    const own = new Set([hostOf(SITE_URL), headers.get("host")?.split(":")[0]]);
    let ref = typeof data.ref === "string" && data.ref ? hostOf(data.ref) : null;
    if (ref && own.has(ref)) ref = null;
    if (!ref && typeof data.src === "string" && /^[\w.\-]{1,60}$/.test(data.src)) ref = data.src.toLowerCase();

    await recordEvent({ type: "view", ref, ...base });
  } catch {
    // Swallow everything: analytics must never surface errors to visitors.
  }
  return done();
}
