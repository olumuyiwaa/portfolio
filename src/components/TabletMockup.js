"use client";

import { useEffect, useRef, useState } from "react";

// Landscape tablet showing the web dashboard behind the courier app on the phone.
// It animates on its own (counters, bars, moving couriers, progress) and reacts
// to the phone through the `beat` prop: when the phone's courier picks up a
// parcel, the matching delivery here flips to "In transit".
// Fixed design size 500x375; HeroDevices scales it.

const ACCENT = "#F29B1D";
const LINE = "#ECEAE4";
const MUTED = "#8a867c";

function Icon({ children, className = "h-3 w-3" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

const NAV = [
  { label: "Overview", active: true, path: <><rect x="3" y="3" width="7.5" height="7.5" rx="1.5" /><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" /><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" /><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" /></> },
  { label: "Deliveries", path: <><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" /><circle cx="7" cy="17.5" r="1.6" /><circle cx="17" cy="17.5" r="1.6" /></> },
  { label: "Couriers", path: <><circle cx="9" cy="8" r="3.3" /><path d="M3 20c.4-3.4 2.8-5.3 6-5.3s5.6 1.9 6 5.3M16 5.2a3.2 3.2 0 0 1 0 5.6M18 14.9c1.7.7 2.8 2.3 3 5.1" /></> },
  { label: "Customers", path: <><circle cx="12" cy="8" r="3.5" /><path d="M5 20c.5-3.6 3.3-5.5 7-5.5s6.5 1.9 7 5.5" /></> },
  { label: "Invoices", path: <><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h4" /></> },
];

const KPIS = [
  { label: "Active deliveries", value: 24, fmt: (n) => String(n), delta: "+12%", up: true },
  { label: "Delivered today", value: 138, fmt: (n) => String(n), delta: "+8%", up: true },
  { label: "Avg. delivery time", value: 21, fmt: (n) => `${n} min`, delta: "-3 min", up: true },
  { label: "Revenue", value: 1.84, fmt: (n) => `₦${n.toFixed(2)}M`, delta: "+15%", up: true },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const BARS = [42, 58, 51, 74, 66, 39, 28];

const ROUTES = [
  { d: "M14 78 C30 70 38 48 62 52 S96 34 128 30", color: ACCENT, dur: 5.5 },
  { d: "M20 22 C44 30 52 56 82 60 S118 80 136 88", color: "#1f1f1f", dur: 7 },
  { d: "M104 10 C98 30 110 44 100 66", color: "#2f7d57", dur: 4.2 },
];

const STATUS = {
  assigned: { label: "Assigned", bg: "#EEECE6", fg: "#6b675e" },
  transit: { label: "In transit", bg: "#FDF1DC", fg: "#B86F0A" },
  delivered: { label: "Delivered", bg: "#E3F1E8", fg: "#2f7d57" },
};

function useActive(ref) {
  const [on, setOn] = useState(true);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting && !document.hidden), { threshold: 0.1 });
    if (ref.current) io.observe(ref.current);
    const vis = () => setOn((v) => (document.hidden ? false : v));
    document.addEventListener("visibilitychange", vis);
    return () => {
      mq.removeEventListener("change", sync);
      io.disconnect();
      document.removeEventListener("visibilitychange", vis);
    };
  }, [ref]);
  return { active: on && !reduced, reduced };
}

function useCountUp(target, reduced, delay = 0) {
  const [v, setV] = useState(reduced ? target : 0);
  const last = useRef(0);
  useEffect(() => {
    if (reduced) {
      setV(target);
      return undefined;
    }
    let raf;
    const start = performance.now() + (last.current === 0 ? delay : 0);
    const from = last.current;
    const tick = (now) => {
      const p = Math.max(0, Math.min(1, (now - start) / 900));
      last.current = from + (target - from) * (1 - Math.pow(1 - p, 3));
      setV(last.current);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, reduced, delay]);
  return v;
}

function Kpi({ k, i, reduced, flash }) {
  const n = useCountUp(k.value, reduced, 400 + i * 90);
  const shown = k.fmt(Number.isInteger(k.value) ? Math.round(n) : n);
  return (
    <div className="rounded-lg border bg-white p-2 transition-colors duration-500" style={{ borderColor: flash ? ACCENT : LINE }}>
      <p className="truncate text-[6.5px]" style={{ color: MUTED }}>{k.label}</p>
      <p className="mt-0.5 font-display text-[13px] font-bold leading-none tabular-nums">{shown}</p>
      <p className="mt-1 inline-block rounded px-1 text-[6px] font-semibold" style={{ background: "#E3F1E8", color: "#2f7d57" }}>
        {k.up ? "↑" : "↓"} {k.delta}
      </p>
    </div>
  );
}

export default function TabletMockup({ beat }) {
  const rootRef = useRef(null);
  const { active, reduced } = useActive(rootRef);

  const [hi, setHi] = useState(3);
  const [hover, setHover] = useState(null);
  const [row1, setRow1] = useState("assigned");
  const [flash, setFlash] = useState(false);
  const [active24, setActive24] = useState(24);
  const [p, setP] = useState([22, 58, 100]);

  // ambient: chart highlight and delivery progress
  useEffect(() => {
    if (!active) return undefined;
    const a = setInterval(() => setHi((h) => (h + 1) % 7), 2400);
    const b = setInterval(() => setP(([x, y, z]) => [x >= 96 ? 22 : x + 3, y >= 96 ? 30 : y + 2, z]), 1100);
    return () => {
      clearInterval(a);
      clearInterval(b);
    };
  }, [active]);

  // sync with the phone
  useEffect(() => {
    if (!beat) return undefined;
    if (beat.name === "pickup") {
      setRow1("transit");
      setActive24(25);
      setFlash(true);
      const t = setTimeout(() => setFlash(false), 1600);
      return () => clearTimeout(t);
    }
    if (beat.name === "reset") {
      setRow1("assigned");
      setActive24(24);
    }
    return undefined;
  }, [beat]);

  const lit = hover ?? hi;
  const rows = [
    { id: "#2041", item: "Laptop sleeve", route: "Lekki → Ajah", who: "Tunde A.", status: row1, pct: row1 === "assigned" ? 8 : p[0], hot: flash },
    { id: "#2040", item: "Client documents", route: "Ikeja → VI", who: "Chioma O.", status: "transit", pct: p[1] },
    { id: "#2039", item: "Sample Kit", route: "Yaba → Ikeja", who: "Ibrahim S.", status: "delivered", pct: 100 },
  ];

  return (
    <div ref={rootRef} className="relative w-[500px]" aria-hidden="true">
      <div className="phone-in relative h-[375px] rounded-[26px] bg-night p-[9px] ring-1 ring-stone-300">
        <span className="absolute left-[3px] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-white/15" />
        <div className="flex h-full overflow-hidden rounded-[18px] bg-[#F7F6F2] text-[#1b1b1b]">
          {/* sidebar */}
          <div className="flex w-[78px] shrink-0 flex-col border-r bg-white px-2 py-2.5" style={{ borderColor: LINE }}>
            <div className="flex items-center gap-1.5 px-1">
              <span className="grid h-5 w-5 place-items-center rounded-md text-white" style={{ background: ACCENT }}>
                <Icon className="h-3 w-3"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" /></Icon>
              </span>
              <span className="font-display text-[8.5px] font-extrabold">Dispatch</span>
            </div>
            <ul className="mt-4 space-y-0.5">
              {NAV.map((n) => (
                <li
                  key={n.label}
                  className="flex items-center gap-1.5 rounded-md px-1.5 py-1.5 text-[7px] font-medium"
                  style={n.active ? { background: "#FDF1DC", color: "#B86F0A" } : { color: "#6b675e" }}
                >
                  <Icon className="h-3 w-3 shrink-0">{n.path}</Icon>
                  {n.label}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex items-center gap-1.5 rounded-md px-1 py-1">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-sage-600 text-[7px] font-bold text-white">E</span>
              <span className="min-w-0 text-[6.5px] leading-tight">
                <span className="block font-semibold">Emmanuel</span>
                <span style={{ color: MUTED }}>Admin</span>
              </span>
            </div>
          </div>

          {/* main */}
          <div className="min-w-0 flex-1 p-2.5">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-display text-[11px] font-bold leading-tight">Overview</p>
                <p className="text-[6.5px]" style={{ color: MUTED }}>Lagos · Today, 9:41 AM</p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="flex h-5 w-[86px] items-center gap-1 rounded-md border bg-white px-1.5 text-[6.5px]" style={{ borderColor: LINE, color: MUTED }}>
                  <Icon className="h-2.5 w-2.5"><circle cx="11" cy="11" r="6" /><path d="M20 20l-4-4" /></Icon>
                  Search orders…
                </span>
                <span className="relative grid h-5 w-5 place-items-center rounded-md border bg-white" style={{ borderColor: LINE }}>
                  <Icon className="h-2.5 w-2.5"><path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15zM10 20.5h4" /></Icon>
                  <span className="absolute right-0.5 top-0.5 h-1 w-1 rounded-full" style={{ background: ACCENT }} />
                </span>
              </div>
            </div>

            <div className="mt-2 grid grid-cols-4 gap-1.5">
              {KPIS.map((k, i) => (
                <Kpi key={k.label} k={i === 0 ? { ...k, value: active24 } : k} i={i} reduced={reduced} flash={i === 0 && flash} />
              ))}
            </div>

            <div className="mt-1.5 grid grid-cols-[1.35fr_1fr] gap-1.5">
              {/* chart */}
              <div className="rounded-lg border bg-white p-2" style={{ borderColor: LINE }}>
                <div className="flex items-center justify-between">
                  <p className="text-[7.5px] font-bold">Deliveries · this week</p>
                  <p className="text-[6.5px] font-semibold" style={{ color: "#B86F0A" }}>{BARS[lit] * 4} orders</p>
                </div>
                <div className="mt-2 flex h-[82px] items-end gap-1.5 border-b" style={{ borderColor: LINE }}>
                  {BARS.map((v, i) => (
                    <button
                      key={DAYS[i]}
                      type="button"
                      tabIndex={-1}
                      onMouseEnter={() => setHover(i)}
                      onMouseLeave={() => setHover(null)}
                      className="flex h-full flex-1 items-end"
                      aria-label={`${DAYS[i]}: ${v * 4} orders`}
                    >
                      <span
                        className="bar-grow block w-full rounded-t-[3px] transition-colors duration-300"
                        style={{ height: `${v}%`, background: i === lit ? ACCENT : "#E9E5DB", animationDelay: `${0.5 + i * 0.06}s` }}
                      />
                    </button>
                  ))}
                </div>
                <div className="mt-1 flex gap-1.5">
                  {DAYS.map((d, i) => (
                    <span key={d} className="flex-1 text-center text-[6px]" style={{ color: i === lit ? "#B86F0A" : MUTED }}>{d}</span>
                  ))}
                </div>
              </div>

              {/* live map */}
              <div className="relative overflow-hidden rounded-lg border bg-white" style={{ borderColor: LINE }}>
                <svg viewBox="0 0 150 120" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
                  <rect width="150" height="120" fill="#EFEDE6" />
                  <path d="M96 120 C100 96 126 92 150 84 V120Z" fill="#DCE8EA" />
                  {[24, 52, 80].map((y) => <path key={y} d={`M0 ${y}H150`} stroke="#fff" strokeWidth="3" />)}
                  {[30, 66, 102].map((x) => <path key={x} d={`M${x} 0V120`} stroke="#fff" strokeWidth="3" />)}
                  <path d="M0 100L150 20" stroke="#fff" strokeWidth="3" />
                  {ROUTES.map((r) => (
                    <g key={r.d}>
                      <path d={r.d} fill="none" stroke={r.color} strokeWidth="1.4" strokeDasharray="3 3" opacity="0.8" />
                      <circle r="6" fill={r.color} opacity="0.2">
                        <animateMotion dur={`${r.dur}s`} repeatCount="indefinite" path={r.d} />
                      </circle>
                      <circle r="2.6" fill={r.color} stroke="#fff" strokeWidth="1">
                        <animateMotion dur={`${r.dur}s`} repeatCount="indefinite" path={r.d} />
                      </circle>
                    </g>
                  ))}
                </svg>
                <span className="absolute left-1.5 top-1.5 flex items-center gap-1 rounded-full bg-white px-1.5 py-0.5 text-[6.5px] font-semibold shadow-none ring-1 ring-black/5">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#2f7d57" }} />
                  5 couriers online
                </span>
              </div>
            </div>

            {/* live deliveries */}
            <div className="mt-1.5 rounded-lg border bg-white px-2 pb-1 pt-1.5" style={{ borderColor: LINE }}>
              <p className="text-[7.5px] font-bold">Live deliveries</p>
              <ul className="mt-1 divide-y" style={{ borderColor: LINE }}>
                {rows.map((r) => {
                  const s = STATUS[r.status];
                  return (
                    <li
                      key={r.id}
                      className="grid grid-cols-[28px_1fr_46px_52px] items-center gap-1.5 py-[3.5px] text-[6.5px] transition-colors duration-500"
                      style={{ borderColor: LINE, background: r.hot ? "#FFF8EA" : "transparent" }}
                    >
                      <span style={{ color: MUTED }}>{r.id}</span>
                      <span className="min-w-0">
                        <span className="block truncate font-semibold">{r.item}</span>
                        <span className="block truncate" style={{ color: MUTED }}>{r.route} · {r.who}</span>
                      </span>
                      <span className="rounded-full px-1.5 py-px text-center text-[6px] font-semibold transition-colors duration-500" style={{ background: s.bg, color: s.fg }}>
                        {s.label}
                      </span>
                      <span className="h-1 overflow-hidden rounded-full bg-[#EEECE6]">
                        <span className="block h-full rounded-full transition-all duration-700" style={{ width: `${r.pct}%`, background: r.status === "delivered" ? "#2f7d57" : ACCENT }} />
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
