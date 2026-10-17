import { cookies } from "next/headers";
import Link from "next/link";
import IgnoreSelf from "@/components/IgnoreSelf";
import { projects } from "@/lib/projects";
import { getStats, TZ } from "@/lib/analytics";
import { analyticsConfigured } from "@/lib/mongo";
import { COOKIE_NAME, authConfigured, sessionValid } from "@/lib/insightsAuth";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Insights",
  robots: { index: false, follow: false, nocache: true },
};

const RANGES = [7, 30, 90];
const nf = new Intl.NumberFormat("en-US");
const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
const projectNames = Object.fromEntries(projects.map((p) => [`/projects/${p.slug}`, p.name]));

const staticNames = { "/": "Home", "/projects": "All projects", "/about": "About", "/contact": "Contact" };
const pageLabel = (path) => staticNames[path] || projectNames[path] || path;
const countryLabel = (code) => {
  try {
    return regionNames.of(code) || code;
  } catch {
    return code;
  }
};

function ago(iso) {
  const s = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

function Shell({ children }) {
  return <section className="container-page py-14 md:py-20">{children}</section>;
}

function Login({ error }) {
  return (
    <Shell>
      <form method="post" action="/api/insights/login" className="mx-auto max-w-sm rounded-xl border border-stone-200 bg-paper p-6">
        <h1 className="font-display text-2xl font-bold text-ink">Insights</h1>
        <p className="mt-2 text-sm text-stone-600">Private. Enter the password to continue.</p>
        <label htmlFor="password" className="mt-6 block text-sm font-medium text-ink">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          autoComplete="current-password"
          className="mt-1.5 w-full rounded-md border border-stone-300 bg-paper px-3 py-2.5 text-sm text-ink outline-none focus:border-ink"
        />
        {error && (
          <p role="alert" className="mt-3 text-sm text-red-600">
            {error === "locked" ? "Too many attempts. Try again in 15 minutes." : "That password is not right."}
          </p>
        )}
        <button type="submit" className="mt-5 w-full rounded-md bg-ink px-4 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-hover">
          Sign in
        </button>
      </form>
    </Shell>
  );
}

function Setup({ missing }) {
  return (
    <Shell>
      <div className="mx-auto max-w-xl rounded-xl border border-stone-200 bg-paper p-6">
        <h1 className="font-display text-2xl font-bold text-ink">Insights is not set up yet</h1>
        <p className="mt-2 text-sm text-stone-600">Add these environment variables (Netlify: Site configuration, Environment variables), then redeploy:</p>
        <ul className="mt-4 space-y-2 text-sm">
          {missing.map((m) => (
            <li key={m.name}>
              <code className="rounded bg-sage-50 px-1.5 py-0.5 font-mono text-xs text-ink">{m.name}</code>
              <span className="text-stone-600"> {m.note}</span>
            </li>
          ))}
        </ul>
      </div>
    </Shell>
  );
}

function Delta({ now, before }) {
  if (!before) return <span className="text-stone-500">No earlier data</span>;
  const pct = Math.round(((now - before) / before) * 100);
  const up = pct >= 0;
  return (
    <span className={up ? "text-accent" : "text-red-600"}>
      {up ? "↑" : "↓"} {Math.abs(pct)}% <span className="text-stone-500">vs previous</span>
    </span>
  );
}

function Kpi({ label, value, now, before }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-paper p-5">
      <p className="text-sm text-stone-500">{label}</p>
      <p className="mt-2 font-display text-3xl font-bold text-ink">{value}</p>
      <p className="mt-2 text-xs">{now === undefined ? null : <Delta now={now} before={before} />}</p>
    </div>
  );
}

function Card({ title, note, children, className = "" }) {
  return (
    <div className={`rounded-xl border border-stone-200 bg-paper p-5 ${className}`}>
      <h2 className="font-display text-lg font-semibold text-ink">{title}</h2>
      {note && <p className="mt-0.5 text-xs text-stone-500">{note}</p>}
      <div className="mt-4">{children}</div>
    </div>
  );
}

function BarList({ rows, empty = "No data yet." }) {
  if (!rows.length) return <p className="text-sm text-stone-500">{empty}</p>;
  const max = Math.max(...rows.map((r) => r.value));
  return (
    <ul className="space-y-2.5">
      {rows.map((r) => (
        <li key={r.label} className="relative overflow-hidden rounded-md">
          <span className="absolute inset-y-0 left-0 rounded-md bg-sage-100" style={{ width: `${Math.max(4, (r.value / max) * 100)}%` }} aria-hidden="true" />
          <div className="relative flex items-center justify-between gap-3 px-3 py-1.5 text-sm">
            <span className="min-w-0 truncate text-ink">{r.label}</span>
            <span className="shrink-0 font-semibold tabular-nums text-ink">{nf.format(r.value)}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

function DailyChart({ series }) {
  const max = Math.max(1, ...series.map((d) => d.views));
  const ticks = [0, Math.floor((series.length - 1) / 2), series.length - 1];
  const fmt = (day) => new Date(`${day}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });
  return (
    <div>
      <div className="flex items-center gap-4 text-xs text-stone-600">
        <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-accent" /> Visitors</span>
        <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-sage-200" /> Page views</span>
        <span className="ml-auto tabular-nums text-stone-500">Peak {nf.format(max)}</span>
      </div>
      <div className="mt-4 flex h-48 items-end gap-[3px] border-b border-stone-200" role="img" aria-label="Daily visitors and page views">
        {series.map((d) => (
          <div key={d.day} className="group relative flex h-full flex-1 items-end" title={`${fmt(d.day)}: ${d.visitors} visitors, ${d.views} views`}>
            <div className="relative w-full rounded-t-[2px] bg-sage-200" style={{ height: `${(d.views / max) * 100}%`, minHeight: d.views ? 2 : 0 }}>
              <div className="absolute inset-x-0 bottom-0 rounded-t-[2px] bg-accent" style={{ height: d.views ? `${(d.visitors / d.views) * 100}%` : 0 }} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-xs text-stone-500">
        {ticks.map((i, n) => <span key={n}>{fmt(series[i].day)}</span>)}
      </div>
    </div>
  );
}

function Dashboard({ stats }) {
  const { current: c, previous: p } = stats;
  const perVisitor = c.visitors ? (c.views / c.visitors).toFixed(1) : "0";
  const prevPer = p.visitors ? p.views / p.visitors : 0;
  const referrerRows = [
    ...stats.referrers.map((r) => ({ label: r.label, value: r.count })),
    ...(stats.direct ? [{ label: "Direct / none", value: stats.direct }] : []),
  ].sort((a, b) => b.value - a.value);
  const when = (iso) => new Date(iso).toLocaleString("en-GB", { timeZone: TZ, day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

  return (
    <Shell>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-ink md:text-4xl">Site activity</h1>
          <p className="mt-2 flex items-center gap-2 text-sm text-stone-600">
            <span className={`h-2 w-2 rounded-full ${stats.live ? "bg-accent" : "bg-stone-300"}`} aria-hidden="true" />
            {stats.live} {stats.live === 1 ? "visitor" : "visitors"} in the last 30 minutes
          </p>
        </div>
        <div className="flex items-center gap-3">
          <nav aria-label="Date range" className="flex rounded-md border border-stone-200 p-0.5">
            {RANGES.map((r) => (
              <Link
                key={r}
                href={`/insights?range=${r}`}
                aria-current={stats.days === r ? "page" : undefined}
                className={`rounded px-3 py-1.5 text-sm font-medium transition-colors ${stats.days === r ? "bg-ink text-paper" : "text-stone-600 hover:text-ink"}`}
              >
                {r}d
              </Link>
            ))}
          </nav>
          <form method="post" action="/api/insights/logout">
            <button type="submit" className="rounded-md border border-stone-300 px-3 py-2 text-sm font-semibold text-ink transition-colors hover:border-ink">Sign out</button>
          </form>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi label="Visitors" value={nf.format(c.visitors)} now={c.visitors} before={p.visitors} />
        <Kpi label="Page views" value={nf.format(c.views)} now={c.views} before={p.views} />
        <Kpi label="Pages per visitor" value={perVisitor} now={c.visitors ? c.views / c.visitors : 0} before={prevPer} />
        <Kpi label="Outbound clicks" value={nf.format(c.clicks)} now={c.clicks} before={p.clicks} />
      </div>

      <Card title="Traffic" note={`Last ${stats.days} days, ${TZ.split("/")[1]} time. A visitor is counted once per day.`} className="mt-4">
        <DailyChart series={stats.series} />
      </Card>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card title="Top pages" note="Page views">
          <BarList rows={stats.pages.map((r) => ({ label: pageLabel(r.path), value: r.views }))} />
        </Card>
        <Card title="Where visitors come from" note="Unique visitors by referrer">
          <BarList rows={referrerRows} />
        </Card>
        <Card title="Countries" note="Unique visitors">
          <BarList rows={stats.countries.map((r) => ({ label: countryLabel(r.label), value: r.count }))} empty="No country data yet. It appears once the site is live on Netlify." />
        </Card>
        <Card title="Devices" note="Unique visitors">
          <BarList rows={stats.devices.map((r) => ({ label: r.label, value: r.count }))} />
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-stone-500">Browsers</h3>
              <BarList rows={stats.browsers.map((r) => ({ label: r.label, value: r.count }))} />
            </div>
            <div>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-stone-500">Systems</h3>
              <BarList rows={stats.systems.map((r) => ({ label: r.label, value: r.count }))} />
            </div>
          </div>
        </Card>
        <Card title="Outbound clicks" note="Live sites, store links, GitHub, LinkedIn">
          <BarList rows={stats.clicks.map((r) => ({ label: r.label, value: r.count }))} empty="No outbound clicks yet." />
        </Card>
        <Card title="Latest activity">
          {stats.recent.length ? (
            <ul className="divide-y divide-stone-200 text-sm">
              {stats.recent.map((e, i) => (
                <li key={i} className="flex items-baseline justify-between gap-3 py-2">
                  <span className="min-w-0 truncate text-ink">
                    {e.type === "click" ? <>Clicked <span className="text-accent">{e.to}</span></> : pageLabel(e.path)}
                    <span className="text-stone-500">
                      {" "}· {[e.country && countryLabel(e.country), e.device, e.type === "view" && e.ref].filter(Boolean).join(" · ")}
                    </span>
                  </span>
                  <span className="shrink-0 text-xs text-stone-500" title={when(e.ts)}>{ago(e.ts)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-stone-500">No activity yet.</p>
          )}
        </Card>
      </div>

      <div className="mt-6 space-y-1 text-xs text-stone-500">
        <IgnoreSelf />
        <p>Anonymous by design: no cookies, no IP addresses stored. Events are kept for 400 days.</p>
      </div>
    </Shell>
  );
}

export default async function InsightsPage({ searchParams }) {
  const missing = [];
  if (!analyticsConfigured()) missing.push({ name: "MONGODB_URI", note: "Your MongoDB connection string (Atlas works well). Optional: MONGODB_DB, default \"portfolio\"." });
  if (!authConfigured()) missing.push({ name: "ANALYTICS_PASSWORD", note: "The password for this page. Optional: ANALYTICS_SECRET, any long random string." });
  if (missing.length) return <Setup missing={missing} />;

  const token = cookies().get(COOKIE_NAME)?.value;
  if (!sessionValid(token)) return <Login error={searchParams?.error} />;

  const requested = Number(searchParams?.range);
  const days = RANGES.includes(requested) ? requested : 30;
  let stats;
  try {
    stats = await getStats(days);
  } catch {
    return (
      <Shell>
        <div className="mx-auto max-w-xl rounded-xl border border-stone-200 bg-paper p-6">
          <h1 className="font-display text-2xl font-bold text-ink">Can&apos;t reach the database</h1>
          <p className="mt-2 text-sm text-stone-600">Check MONGODB_URI, and that your MongoDB network access allows connections from Netlify (Atlas: Network Access, allow 0.0.0.0/0).</p>
        </div>
      </Shell>
    );
  }
  return <Dashboard stats={stats} />;
}
