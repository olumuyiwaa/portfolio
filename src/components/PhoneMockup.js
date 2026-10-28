"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Hero phone mockup: a delivery app that demos itself.
// A touch cursor taps through the app on a loop (send, track, invoice, schedule,
// a push notification, activity filters, wallet withdraw, profile toggle). Visitors
// can also tap it themselves; that pauses the demo for a few seconds, then it
// restarts from Home. It pauses when off-screen or in a hidden tab, and stays
// still for people who prefer reduced motion.

const ACCENT = "#F29B1D";
const SURFACE = "bg-[#1b1b1b]";
const SURFACE_2 = "bg-[#262626]";
const BALANCE = 128400;
const WITHDRAW = 50000;

function Icon({ children, className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

const ACTIONS = [
  { id: "track", label: "Track", path: <><circle cx="17" cy="6" r="2.5" /><path d="M17 8.5V10c0 2-2 2-4 2H8a3 3 0 0 0 0 6h8" /></> },
  { id: "send", label: "Send", path: <><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" /><circle cx="7" cy="17.5" r="1.6" /><circle cx="17" cy="17.5" r="1.6" /></> },
  { id: "invoice", label: "Invoice", path: <><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h4" /></> },
  { id: "schedule", label: "Schedule", path: <><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M4 10h16M9 3v4M15 3v4" /></> },
];

const NAV = [
  { id: "home", label: "Home", path: <path d="M4 11l8-7 8 7v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z" /> },
  { id: "activity", label: "Activity", path: <><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" /><circle cx="7" cy="17.5" r="1.4" /><circle cx="17" cy="17.5" r="1.4" /></> },
  { id: "wallet", label: "Wallet", path: <><rect x="3" y="6" width="18" height="13" rx="2.5" /><path d="M16 12.5h2" /></> },
  { id: "profile", label: "Profile", path: <><circle cx="12" cy="8" r="3.5" /><path d="M5 20c.5-3.6 3.3-5.5 7-5.5s6.5 1.9 7 5.5" /></> },
];

const PROMOS = [
  { title: "Send a package →", body: "Courier at your door in under 15 minutes. Insured and tracked." },
  { title: "Track live →", body: "Share a live link with the receiver. Status updates every step." },
  { title: "Business rates →", body: "Volume discounts and monthly invoices for teams that ship often." },
];

const RECENT = [
  { title: "Business Contracts", meta: "Ikoyi → Lekki Phase 1", when: "Yesterday", status: "Delivered", tone: "done" },
  { title: "Laptop sleeve", meta: "Lekki → Ajah", when: "Today", status: "In transit", tone: "live" },
  { title: "Personal Contracts", meta: "Epe → Ikeja", when: "Yesterday", status: "Delivered", tone: "done" },
  { title: "Client documents", meta: "Ikeja → VI", when: "Today", status: "Picked up", tone: "live" },
  { title: "Return parcel", meta: "VI → Lekki", when: "Mon", status: "Delivered", tone: "done" },
  { title: "Sample Kit", meta: "Yaba → Ikeja", when: "Today", status: "Delivered", tone: "done" },
];

const FILTERS = [
  { id: "all", label: "All" },
  { id: "transit", label: "In transit" },
  { id: "delivered", label: "Delivered" },
];

const WALLET_TX = [
  { label: "Delivery payout", amount: "+₦12,400", when: "Today", credit: true },
  { label: "Withdrawal · GTBank", amount: "-₦50,000", when: "Today", credit: false },
  { label: "Delivery payout", amount: "+₦8,200", when: "Today", credit: true },
  { label: "Withdrawal · GTBank", amount: "-₦50,000", when: "Yesterday", credit: false },
  { label: "Promo credit", amount: "+₦1,500", when: "Sun", credit: true },
];

const SLOTS = ["2–4pm", "4–6pm", "Tomorrow"];

const SUBTITLES = {
  home: "Where are you sending something today?",
  activity: "Your recent moves at a glance",
  wallet: "Balance and payout methods",
  profile: "Account and preferences",
};

// The demo script: each step taps an element (data-tap id) or waits.
const SCRIPT = [
  { wait: 1800 },
  { tap: "act-track" },
  { tap: "act-invoice" },
  { tap: "act-schedule" },
  { tap: "slot-1" },
  { tap: "act-send" },
  { event: "notif-in", wait: 1500 },
  { tap: "notif" },
  { tap: "filter-transit" },
  { tap: "filter-delivered" },
  { tap: "filter-all" },
  { tap: "nav-wallet" },
  { tap: "withdraw" },
  { tap: "nav-profile" },
  { tap: "toggle-notif" },
  { tap: "nav-home" },
];

const USER_PAUSE_MS = 9000;
const fmt = (n) => `₦${n.toLocaleString("en-US")}`;

function MiniMap() {
  const route = "M16 54 C52 54 62 22 104 30 S168 16 204 20";
  return (
    <svg viewBox="0 0 220 72" className="h-full w-full" aria-hidden="true">
      <rect width="220" height="72" fill="#141414" />
      {[18, 36, 54].map((y) => <path key={y} d={`M0 ${y}H220`} stroke="#222" strokeWidth="1" />)}
      {[40, 80, 120, 160, 200].map((x) => <path key={x} d={`M${x} 0V72`} stroke="#222" strokeWidth="1" />)}
      <path d={route} fill="none" stroke="#3a3a3a" strokeWidth="3" strokeLinecap="round" />
      <path d={route} fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeDasharray="4 5" />
      <circle cx="16" cy="54" r="3.5" fill="#fff" />
      <circle cx="204" cy="20" r="4.5" fill={ACCENT} />
      <circle r="9" fill={ACCENT} opacity="0.25">
        <animateMotion dur="4s" repeatCount="indefinite" path={route} />
        <animate attributeName="r" values="5;11;5" dur="1.6s" repeatCount="indefinite" />
      </circle>
      <circle r="4" fill="#fff">
        <animateMotion dur="4s" repeatCount="indefinite" path={route} />
      </circle>
    </svg>
  );
}

export default function PhoneMockup({ fixed = false, onBeat }) {
  const rootRef = useRef(null);
  const screenRef = useRef(null);
  const timers = useRef({});
  const beatRef = useRef(onBeat);
  useEffect(() => {
    beatRef.current = onBeat;
  }, [onBeat]);

  const [tab, setTab] = useState("home");
  const [action, setAction] = useState("send");
  const [filter, setFilter] = useState("all");
  const [slot, setSlot] = useState(0);
  const [notif, setNotif] = useState(false);
  const [notifOn, setNotifOn] = useState(true);
  const [withdrawn, setWithdrawn] = useState(false);
  const [toast, setToast] = useState(null);
  const [promo, setPromo] = useState(0);
  const [progress, setProgress] = useState(10);
  const [balance, setBalance] = useState(0);
  const shown = useRef(0);

  const [cursor, setCursor] = useState({ x: 200, y: 460, show: false, down: false });
  const [ripple, setRipple] = useState(null);

  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const playing = visible && !reduced && !userPaused;

  // ---- environment: reduced motion, off-screen, hidden tab ----
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting && !document.hidden), { threshold: 0.2 });
    if (rootRef.current) io.observe(rootRef.current);
    const onVis = () => setVisible((v) => (document.hidden ? false : v));
    document.addEventListener("visibilitychange", onVis);
    return () => {
      mq.removeEventListener("change", sync);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  // ---- app behaviour: one handler for both the script and real taps ----
  const showToast = useCallback((text) => {
    setToast(text);
    clearTimeout(timers.current.toast);
    timers.current.toast = setTimeout(() => setToast(null), 2200);
  }, []);

  const apply = useCallback(
    (id) => {
      if (id.startsWith("nav-")) {
        setTab(id.slice(4));
        setNotif(false);
        return;
      }
      if (id.startsWith("act-")) return setAction(id.slice(4));
      if (id.startsWith("filter-")) return setFilter(id.slice(7));
      if (id.startsWith("slot-")) return setSlot(Number(id.slice(5)));
      if (id === "notif-in") {
        beatRef.current?.("pickup");
        setNotif(true);
        clearTimeout(timers.current.notif);
        timers.current.notif = setTimeout(() => setNotif(false), 5000);
      } else if (id === "notif") {
        setNotif(false);
        setTab("activity");
      } else if (id === "withdraw") {
        setWithdrawn(true);
        showToast(`Withdrawal requested · ${fmt(WITHDRAW)}`);
      } else if (id === "add-funds") {
        showToast("Choose a payment method");
      } else if (id === "toggle-notif") {
        setNotifOn((v) => !v);
      }
    },
    [showToast]
  );

  const resetScreen = useCallback(() => {
    beatRef.current?.("reset");
    setTab("home");
    setAction("send");
    setFilter("all");
    setSlot(0);
    setNotif(false);
    setNotifOn(true);
    setWithdrawn(false);
    setToast(null);
    setCursor((c) => ({ ...c, show: false, down: false }));
  }, []);

  // ---- touch cursor ----
  const targetCenter = useCallback((id) => {
    const screen = screenRef.current;
    const el = screen?.querySelector(`[data-tap="${id}"]`);
    if (!el) return null;
    const s = screen.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const k = s.width / screen.offsetWidth || 1; // the hero may scale this phone with CSS
    return { el, x: (r.left - s.left + r.width / 2) / k, y: (r.top - s.top + r.height / 2) / k };
  }, []);

  const press = useCallback(
    (id) => {
      const t = targetCenter(id);
      if (!t) return;
      setCursor((c) => ({ ...c, x: t.x, y: t.y, down: true }));
      setRipple({ x: t.x, y: t.y, n: Date.now() });
      t.el.animate?.([{ transform: "scale(1)" }, { transform: "scale(0.9)" }, { transform: "scale(1)" }], { duration: 280, easing: "ease-out" });
      clearTimeout(timers.current.down);
      timers.current.down = setTimeout(() => setCursor((c) => ({ ...c, down: false })), 200);
    },
    [targetCenter]
  );

  // ---- the autoplay loop ----
  useEffect(() => {
    if (!playing) {
      setCursor((c) => ({ ...c, show: false }));
      return undefined;
    }
    let cancelled = false;
    const pending = [];
    const later = (fn, ms) => pending.push(setTimeout(() => !cancelled && fn(), ms));
    let i = 0;

    const next = () => {
      const step = SCRIPT[i % SCRIPT.length];
      i += 1;
      if (!step.tap) {
        if (step.event) apply(step.event);
        later(next, step.wait);
        return;
      }
      const t = targetCenter(step.tap);
      if (t) setCursor((c) => ({ ...c, x: t.x, y: t.y, show: true }));
      later(() => {
        press(step.tap);
        apply(step.tap);
        later(next, 1300);
      }, 800);
    };

    resetScreen();
    later(next, 700);
    return () => {
      cancelled = true;
      pending.forEach(clearTimeout);
    };
  }, [playing, apply, press, resetScreen, targetCenter]);

  // a real tap: do it, hide the cursor, pause the demo for a while
  const onUser = useCallback(
    (id) => {
      apply(id);
      setCursor((c) => ({ ...c, show: false }));
      setUserPaused(true);
      clearTimeout(timers.current.pause);
      timers.current.pause = setTimeout(() => setUserPaused(false), USER_PAUSE_MS);
    },
    [apply]
  );

  useEffect(() => {
    const t = timers.current;
    return () => Object.values(t).forEach(clearTimeout);
  }, []);

  // ---- ambient motion: promo carousel and delivery progress ----
  useEffect(() => {
    if (!visible || reduced) return undefined;
    const a = setInterval(() => setPromo((p) => (p + 1) % PROMOS.length), 3200);
    const b = setInterval(() => setProgress((p) => (p >= 16 ? 9 : p + 1)), 1100);
    return () => {
      clearInterval(a);
      clearInterval(b);
    };
  }, [visible, reduced]);

  // ---- wallet: count the balance up, and down after a withdrawal ----
  useEffect(() => {
    if (tab !== "wallet") {
      shown.current = 0;
      setWithdrawn(false);
      return undefined;
    }
    const from = shown.current;
    const to = withdrawn ? BALANCE - WITHDRAW : BALANCE;
    const t0 = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / 800);
      const v = Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3)));
      shown.current = v;
      setBalance(v);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [tab, withdrawn]);

  const tap = (id) => ({ "data-tap": id, onClick: () => onUser(id), type: "button", tabIndex: -1 });
  const list = RECENT.filter((r) => filter === "all" || (filter === "transit" ? r.tone === "live" : r.tone === "done"));

  return (
    <div ref={rootRef} className={`relative mx-auto ${fixed ? "w-[300px]" : "w-[270px] md:w-[300px]"}`} aria-hidden="true">
      <div className="phone-in relative rounded-[44px] bg-night p-[10px] ring-1 ring-stone-300">
        {/* side buttons */}
        <span className="absolute -left-[3px] top-24 h-8 w-[3px] rounded-l bg-night" />
        <span className="absolute -left-[3px] top-36 h-12 w-[3px] rounded-l bg-night" />
        <span className="absolute -right-[3px] top-32 h-16 w-[3px] rounded-r bg-night" />

        <div ref={screenRef} className="relative aspect-[9/19] select-none overflow-hidden rounded-[35px] bg-[#0b0b0b] text-white">
          {/* status bar */}
          <div className="relative z-10 flex items-center justify-between px-6 pt-3 text-[10px] font-semibold">
            <span>9:41</span>
            <span className="absolute left-1/2 top-2 h-4 w-16 -translate-x-1/2 rounded-full bg-black" />
            <span className="flex items-center gap-1">
              <span className="flex items-end gap-[1.5px]">
                {[3, 5, 7, 9].map((h) => <span key={h} className="w-[2px] rounded-sm bg-white" style={{ height: h }} />)}
              </span>
              <span className="h-[8px] w-[15px] rounded-[3px] border border-white/70 p-[1px]">
                <span className="block h-full w-2/3 rounded-[1px] bg-white" />
              </span>
            </span>
          </div>

          {/* push notification */}
          {notif && (
            <button
              {...tap("notif")}
              className="notif-in absolute inset-x-2.5 top-7 z-20 flex items-center gap-2 rounded-2xl bg-[#2a2a2a] p-2 text-left ring-1 ring-white/10"
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-night" style={{ background: ACCENT }}>
                <Icon className="h-4 w-4"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" /><circle cx="7" cy="17.5" r="1.4" /><circle cx="17" cy="17.5" r="1.4" /></Icon>
              </span>
              <span className="min-w-0">
                <span className="block text-[8.5px] font-bold">Courier picked up your parcel</span>
                <span className="block truncate text-[7.5px] text-white/60">Laptop sleeve · Lekki → Ajah · now</span>
              </span>
            </button>
          )}

          <div className="px-4 pt-3">
            {/* greeting */}
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sage-600 text-[11px] font-bold">E</span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-display text-[12px] font-bold leading-tight">Good morning, Emmanuel</span>
                <span className="block truncate text-[8.5px] text-white/55">{SUBTITLES[tab]}</span>
              </span>
              <span className={`relative grid h-7 w-7 shrink-0 place-items-center rounded-full ${SURFACE}`}>
                <Icon className="h-3.5 w-3.5"><path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15zM10 20.5h4" /></Icon>
                <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
              </span>
            </div>

            {/* HOME */}
            {tab === "home" && (
              <div key="home" className="screen-in">
                <div className="mt-3 flex gap-2">
                  <div className={`flex h-8 flex-1 items-center gap-2 rounded-xl px-2.5 ${SURFACE}`}>
                    <span style={{ color: ACCENT }}>
                      <Icon className="h-3.5 w-3.5"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" /><circle cx="7" cy="17.5" r="1.4" /></Icon>
                    </span>
                    <span className="truncate text-[8.5px] text-white/40">Enter pickup or destination…</span>
                  </div>
                  <span className={`grid h-8 w-8 place-items-center rounded-xl ${SURFACE}`} style={{ color: ACCENT }}>
                    <Icon className="h-3.5 w-3.5"><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 18h2v2h-2zM14 20v-2M20 14v2" /></Icon>
                  </span>
                </div>

                {/* promo carousel */}
                <div className="mt-3 overflow-hidden rounded-2xl">
                  <div className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" style={{ transform: `translateX(-${promo * 100}%)` }}>
                    {PROMOS.map((p) => (
                      <div key={p.title} className="relative w-full shrink-0 overflow-hidden px-3.5 py-3 text-night" style={{ background: ACCENT }}>
                        <p className="font-display text-[14px] font-extrabold leading-tight">{p.title}</p>
                        <p className="mt-1 max-w-[130px] text-[8px] font-medium leading-snug">{p.body}</p>
                        <span className="absolute -right-1 bottom-0 h-12 w-16 rounded-tl-xl bg-[#D9831A]" />
                        <span className="absolute bottom-2 right-4 h-8 w-9 rounded-[3px] bg-[#F7C57A]" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-2 flex justify-center gap-1">
                  {PROMOS.map((p, i) => (
                    <span key={p.title} className="h-1 rounded-full transition-all duration-300" style={{ width: i === promo ? 10 : 4, background: i === promo ? ACCENT : "rgba(255,255,255,0.25)" }} />
                  ))}
                </div>

                {/* quick actions */}
                <ul className="mt-3 grid grid-cols-4 gap-1">
                  {ACTIONS.map((a) => {
                    const active = action === a.id;
                    return (
                      <li key={a.id}>
                        <button {...tap(`act-${a.id}`)} className="flex w-full flex-col items-center gap-1">
                          <span
                            className={`grid h-9 w-9 place-items-center rounded-full ${SURFACE} transition-all duration-300`}
                            style={active ? { color: ACCENT, boxShadow: `0 0 0 1px ${ACCENT}99` } : undefined}
                          >
                            <Icon className="h-4 w-4">{a.path}</Icon>
                          </span>
                          <span className="text-[8px] transition-colors duration-300" style={{ color: active ? ACCENT : "rgba(255,255,255,0.8)" }}>{a.label}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>

                {/* action detail: fixed height so nothing below it jumps */}
                <div className={`mt-3.5 h-[92px] overflow-hidden rounded-2xl ${SURFACE}`}>
                  <div key={action} className="screen-in h-full">
                    {action === "send" && (
                      <div className="p-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[8.5px] font-medium">Courier en route</span>
                          <span className="rounded-full px-1.5 py-0.5 text-[7.5px] font-bold text-night" style={{ background: ACCENT }}>
                            {Math.max(4, 26 - progress)} min ETA
                          </span>
                        </div>
                        <div className="mt-2 flex items-center gap-1.5">
                          <span className={`flex-1 rounded-lg px-2 py-1 ${SURFACE_2}`}>
                            <span className="block text-[6.5px] text-white/50">Pickup</span>
                            <span className="block text-[9px] font-medium">Lekki Phase 1</span>
                          </span>
                          <span className="text-[9px] text-white/70">→</span>
                          <span className={`flex-1 rounded-lg px-2 py-1 ${SURFACE_2}`}>
                            <span className="block text-[6.5px] text-white/50">Destination</span>
                            <span className="block text-[9px] font-medium">Victoria Island</span>
                          </span>
                        </div>
                        <div className="mt-2.5 flex h-1.5 gap-[3px]">
                          {Array.from({ length: 18 }).map((_, i) => (
                            <span key={i} className="h-full flex-1 rounded-[1px] transition-colors duration-500" style={{ background: i < progress ? ACCENT : "#3a3a3a" }} />
                          ))}
                        </div>
                      </div>
                    )}
                    {action === "track" && (
                      <div className="relative h-full">
                        <MiniMap />
                        <span className="absolute left-2 top-2 rounded-full bg-black/70 px-1.5 py-0.5 text-[7px] font-semibold">
                          <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-sage-400 align-middle" />Live · Lekki → VI
                        </span>
                      </div>
                    )}
                    {action === "invoice" && (
                      <div className="space-y-2 p-3 text-[9px]">
                        <div className="flex justify-between"><span className="text-white/60">Draft INV-1042</span><span style={{ color: ACCENT }}>₦42,500</span></div>
                        <div className="flex justify-between"><span className="text-white/60">Paid INV-1038</span><span className="text-sage-300">₦18,000</span></div>
                        <div className="flex justify-between"><span className="text-white/60">Overdue INV-1029</span><span className="text-red-300/90">₦9,750</span></div>
                      </div>
                    )}
                    {action === "schedule" && (
                      <div className="p-3 text-[9px]">
                        <p className="leading-relaxed text-white/80">Book a pickup window. Couriers confirm within minutes.</p>
                        <div className="mt-2.5 flex gap-1.5">
                          {SLOTS.map((s, i) => (
                            <button
                              key={s}
                              {...tap(`slot-${i}`)}
                              className={`rounded-lg px-2 py-1 text-[8px] transition-all duration-300 ${SURFACE_2}`}
                              style={i === slot ? { boxShadow: `0 0 0 1px ${ACCENT}`, color: ACCENT } : { color: "rgba(255,255,255,0.7)" }}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="font-display text-[11px] font-bold">Recent deliveries</span>
                  <span className="text-[8px]" style={{ color: ACCENT }}>See all →</span>
                </div>
                <div className={`mt-2 rounded-xl px-2.5 py-2 ${SURFACE}`}>
                  <span className="flex items-center gap-1.5 text-[9px] font-medium">
                    {RECENT[0].title}
                    <span className="rounded-full bg-sage-700/40 px-1.5 py-px text-[7px] text-sage-300">{RECENT[0].status}</span>
                  </span>
                  <span className="mt-0.5 block text-[7.5px] text-white/45">{RECENT[0].meta} · {RECENT[0].when}</span>
                </div>
              </div>
            )}

            {/* ACTIVITY */}
            {tab === "activity" && (
              <div key="activity" className="screen-in mt-4 space-y-3">
                <div className="flex gap-1.5">
                  {FILTERS.map((f) => {
                    const on = filter === f.id;
                    return (
                      <button
                        key={f.id}
                        {...tap(`filter-${f.id}`)}
                        className={`rounded-full px-2.5 py-1 text-[8px] transition-colors duration-300 ${on ? "" : SURFACE}`}
                        style={on ? { background: ACCENT, color: "#111" } : { color: "rgba(255,255,255,0.7)" }}
                      >
                        {f.label}
                      </button>
                    );
                  })}
                </div>
                <ul className="space-y-2">
                  {list.map((r) => (
                    <li key={r.title} className={`screen-in rounded-xl px-2.5 py-2 ${SURFACE}`}>
                      <span className="flex items-center justify-between gap-2">
                        <span className="text-[9px] font-medium">{r.title}</span>
                        <span
                          className="shrink-0 rounded-full px-1.5 py-px text-[7px]"
                          style={r.tone === "live" ? { background: "rgba(242,155,29,0.2)", color: ACCENT } : { background: "rgba(74,122,90,0.35)", color: "#b8d4c4" }}
                        >
                          {r.status}
                        </span>
                      </span>
                      <span className="mt-0.5 block text-[7.5px] text-white/45">{r.meta} · {r.when}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* WALLET */}
            {tab === "wallet" && (
              <div key="wallet" className="screen-in mt-4 space-y-3">
                <div className={`rounded-2xl p-3 ${SURFACE}`}>
                  <p className="text-[8px] text-white/50">Available balance</p>
                  <p className="font-display text-[22px] font-bold tabular-nums" style={{ color: ACCENT }}>{fmt(balance)}</p>
                  <p className="mt-0.5 text-[7.5px] text-white/40">Pending · ₦6,200</p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <button {...tap("add-funds")} className={`rounded-xl px-2 py-2 text-center text-[8px] font-medium ${SURFACE_2}`}>Add funds</button>
                    <button {...tap("withdraw")} className="rounded-xl px-2 py-2 text-center text-[8px] font-medium text-night" style={{ background: ACCENT }}>Withdraw</button>
                  </div>
                </div>
                <div>
                  <p className="mb-1.5 font-display text-[10px] font-bold">Recent activity</p>
                  <ul className="space-y-1.5">
                    {withdrawn && (
                      <li className={`screen-in flex items-center justify-between rounded-xl px-2.5 py-2 ${SURFACE}`}>
                        <span><span className="block text-[8.5px] font-medium">Withdrawal · GTBank</span><span className="text-[7px] text-white/40">Just now</span></span>
                        <span className="text-[9px] font-semibold text-white/75">-{fmt(WITHDRAW)}</span>
                      </li>
                    )}
                    {WALLET_TX.slice(0, withdrawn ? 3 : 4).map((t) => (
                      <li key={t.label + t.when + t.amount} className={`flex items-center justify-between rounded-xl px-2.5 py-2 ${SURFACE}`}>
                        <span><span className="block text-[8.5px] font-medium">{t.label}</span><span className="text-[7px] text-white/40">{t.when}</span></span>
                        <span className="text-[9px] font-semibold" style={{ color: t.credit ? "#8fceb0" : "rgba(255,255,255,0.75)" }}>{t.amount}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* PROFILE */}
            {tab === "profile" && (
              <div key="profile" className="screen-in mt-4 space-y-3">
                <div className={`flex items-center gap-2.5 rounded-2xl p-3 ${SURFACE}`}>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-sage-600 text-[13px] font-bold">E</span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-bold">Emmanuel</span>
                    <span className="block text-[8px] text-white/50">emmanuel@example.com</span>
                    <span className="mt-0.5 inline-block rounded-full px-1.5 py-px text-[7px] font-semibold text-night" style={{ background: ACCENT }}>Business</span>
                  </span>
                </div>
                <ul className={`overflow-hidden rounded-2xl ${SURFACE}`}>
                  {[["Saved addresses", "3"], ["Default payment", "Paystack ·••• 4242"]].map(([k, v]) => (
                    <li key={k} className="flex items-center justify-between border-b border-white/5 px-3 py-2.5 text-[8.5px]">
                      <span className="text-white/60">{k}</span>
                      <span className="font-medium text-white/90">{v}</span>
                    </li>
                  ))}
                  <li className="flex items-center justify-between border-b border-white/5 px-3 py-2 text-[8.5px]">
                    <span className="text-white/60">Notifications</span>
                    <button {...tap("toggle-notif")} className="relative h-4 w-7 rounded-full transition-colors duration-300" style={{ background: notifOn ? ACCENT : "#3a3a3a" }} role="switch" aria-checked={notifOn}>
                      <span className="absolute top-[2px] h-3 w-3 rounded-full bg-white transition-all duration-300" style={{ left: notifOn ? 14 : 2 }} />
                    </button>
                  </li>
                  <li className="flex items-center justify-between px-3 py-2.5 text-[8.5px]">
                    <span className="text-white/60">Language</span>
                    <span className="font-medium text-white/90">English</span>
                  </li>
                </ul>
                <div className={`rounded-2xl px-3 py-2.5 text-[8px] text-white/45 ${SURFACE}`}>App version 2.4.1 · Lagos</div>
              </div>
            )}
          </div>

          {/* toast */}
          {toast && (
            <div className="screen-in absolute inset-x-5 bottom-[62px] z-20 flex items-center gap-1.5 rounded-full bg-[#2a2a2a] px-3 py-1.5 text-[8px] font-medium ring-1 ring-white/10">
              <span className="grid h-3.5 w-3.5 place-items-center rounded-full bg-sage-500 text-white">
                <Icon className="h-2.5 w-2.5"><path d="M5 12.5l4.5 4.5L19 7.5" /></Icon>
              </span>
              <span className="truncate">{toast}</span>
            </div>
          )}

          {/* bottom nav */}
          <div className={`absolute inset-x-3 bottom-3 z-10 flex items-center justify-around rounded-full px-1.5 py-1.5 ${SURFACE}`}>
            {NAV.map((n) => {
              const active = tab === n.id;
              return (
                <button
                  key={n.id}
                  {...tap(`nav-${n.id}`)}
                  className={`flex flex-col items-center gap-0.5 rounded-full px-2.5 py-1 text-[7.5px] transition-colors duration-300 ${active ? "bg-[#3a2a12]" : "text-white/70"}`}
                  style={active ? { color: ACCENT } : undefined}
                >
                  <Icon className="h-3.5 w-3.5">{n.path}</Icon>
                  {n.label}
                </button>
              );
            })}
          </div>

          {/* touch cursor */}
          {ripple && (
            <span key={ripple.n} className="tap-ripple pointer-events-none absolute z-30 h-7 w-7 rounded-full" style={{ left: ripple.x - 14, top: ripple.y - 14, background: `${ACCENT}` }} />
          )}
          <span
            className="pointer-events-none absolute left-0 top-0 z-30"
            style={{
              transform: `translate(${cursor.x - 14}px, ${cursor.y - 14}px)`,
              opacity: cursor.show ? 1 : 0,
              transition: "transform 750ms cubic-bezier(0.4, 0, 0.2, 1), opacity 300ms",
            }}
          >
            <span
              className="block h-7 w-7 rounded-full border border-white/80 bg-white/25 transition-transform duration-150"
              style={{ transform: cursor.down ? "scale(0.7)" : "scale(1)" }}
            />
          </span>
        </div>
      </div>

      {!fixed && (
        <span className="row-in absolute -left-14 top-[58%] hidden rounded-full bg-amber-300 px-3.5 py-1.5 text-sm font-semibold text-night sm:block" style={{ animationDelay: "1.4s" }}>
          Flutter
        </span>
      )}
    </div>
  );
}
