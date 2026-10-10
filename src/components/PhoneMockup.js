// A flat, CSS-built phone showing a dark delivery-app home screen. Decorative
// only: it stands in for real app screenshots until they are added. The screen
// builds in once on load (see .phone-in and .row-in in globals.css).
const ACCENT = "#F29B1D";
const SURFACE = "bg-[#1b1b1b]";
const SURFACE_2 = "bg-[#262626]";

function Icon({ children, className = "h-4 w-4" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

const ACTIONS = [
  { label: "Track", active: false, path: <><circle cx="17" cy="6" r="2.5" /><path d="M17 8.5V10c0 2-2 2-4 2H8a3 3 0 0 0 0 6h8" /></> },
  { label: "Send", active: true, path: <><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" /><circle cx="7" cy="17.5" r="1.6" /><circle cx="17" cy="17.5" r="1.6" /></> },
  { label: "Invoice", active: false, path: <><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h4" /></> },
  { label: "Schedule", active: false, path: <><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M4 10h16M9 3v4M15 3v4" /></> },
];

const NAV = [
  { label: "Home", active: true, path: <path d="M4 11l8-7 8 7v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z" /> },
  { label: "Activity", active: false, path: <><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" /><circle cx="7" cy="17.5" r="1.4" /><circle cx="17" cy="17.5" r="1.4" /></> },
  { label: "Wallet", active: false, path: <><rect x="3" y="6" width="18" height="13" rx="2.5" /><path d="M16 12.5h2" /></> },
  { label: "Profile", active: false, path: <><circle cx="12" cy="8" r="3.5" /><path d="M5 20c.5-3.6 3.3-5.5 7-5.5s6.5 1.9 7 5.5" /></> },
];

const delay = (s) => ({ animationDelay: `${s}s` });

export default function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[270px] md:w-[300px]" aria-hidden="true">
      <div className="phone-in rounded-[44px] bg-ink p-[10px] ring-1 ring-stone-300">
        <div className="relative aspect-[9/19] overflow-hidden rounded-[35px] bg-[#0b0b0b] text-white">
          {/* status bar */}
          <div className="flex items-center justify-between px-6 pt-3 text-[10px] font-semibold">
            <span>9:41</span>
            <span className="absolute left-1/2 top-2 h-4 w-16 -translate-x-1/2 rounded-full bg-black" />
            <span className="flex items-center gap-1">
              <span className="flex items-end gap-[1.5px]">
                {[3, 5, 7, 9].map((h) => (
                  <span key={h} className="w-[2px] rounded-sm bg-white" style={{ height: h }} />
                ))}
              </span>
              <span className="h-[8px] w-[15px] rounded-[3px] border border-white/70 p-[1px]">
                <span className="block h-full w-2/3 rounded-[1px] bg-white" />
              </span>
            </span>
          </div>

          <div className="px-4 pt-3">
            {/* greeting */}
            <div className="row-in flex items-center gap-2.5" style={delay(0.5)}>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sage-600 text-[11px] font-bold">E</span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-[12px] font-bold leading-tight">Good morning, Emmanuel</span>
                <span className="block truncate text-[8.5px] text-white/55">Where are you sending something today?</span>
              </span>
              <span className={`relative grid h-7 w-7 shrink-0 place-items-center rounded-full ${SURFACE}`}>
                <Icon className="h-3.5 w-3.5"><path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15zM10 20.5h4" /></Icon>
                <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
              </span>
            </div>

            {/* search */}
            <div className="row-in mt-3 flex gap-2" style={delay(0.62)}>
              <div className={`flex h-8 flex-1 items-center gap-2 rounded-xl px-2.5 ${SURFACE}`}>
                <span style={{ color: ACCENT }}><Icon className="h-3.5 w-3.5"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" /><circle cx="7" cy="17.5" r="1.4" /></Icon></span>
                <span className="truncate text-[8.5px] text-white/40">Enter pickup or destination…</span>
              </div>
              <span className={`grid h-8 w-8 place-items-center rounded-xl ${SURFACE}`} style={{ color: ACCENT }}>
                <Icon className="h-3.5 w-3.5"><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 18h2v2h-2zM14 20v-2M20 14v2" /></Icon>
              </span>
            </div>

            {/* promo */}
            <div
              className="row-in relative mt-3 overflow-hidden rounded-2xl px-3.5 py-3 text-ink"
              style={{ ...delay(0.74), background: ACCENT }}
            >
              <p className="font-display text-[14px] font-extrabold leading-tight">Send a package →</p>
              <p className="mt-1 max-w-[120px] text-[8px] font-medium leading-snug">
                Courier at your door in under 15 minutes. Insured and tracked.
              </p>
              <span className="absolute -right-1 bottom-0 h-12 w-16 rounded-tl-xl bg-[#D9831A]" />
              <span className="absolute bottom-2 right-4 h-8 w-9 rounded-[3px] bg-[#F7C57A]" />
            </div>
            <div className="mt-2 flex justify-center gap-1">
              <span className="h-1 w-1 rounded-full bg-white/25" />
              <span className="h-1 w-1 rounded-full" style={{ background: ACCENT }} />
              <span className="h-1 w-1 rounded-full bg-white/25" />
            </div>

            {/* quick actions */}
            <ul className="row-in mt-3 grid grid-cols-4 gap-1" style={delay(0.86)}>
              {ACTIONS.map((a) => (
                <li key={a.label} className="flex flex-col items-center gap-1">
                  <span
                    className={`grid h-9 w-9 place-items-center rounded-full ${SURFACE}`}
                    style={a.active ? { color: ACCENT } : undefined}
                  >
                    <Icon className="h-4 w-4">{a.path}</Icon>
                  </span>
                  <span className="text-[8px] text-white/80">{a.label}</span>
                </li>
              ))}
            </ul>

            {/* active delivery */}
            <div className="row-in mt-3.5 flex items-center justify-between" style={delay(1)}>
              <span className="font-display text-[11px] font-bold">
                Active delivery <span className="ml-0.5 inline-block h-1.5 w-1.5 rounded-full bg-sage-400 align-middle" />
              </span>
              <span className={`flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[7.5px] text-white/70 ${SURFACE}`}>
                In Transit
                <span className="grid h-3 w-3 place-items-center rounded-full bg-sage-500 text-[7px] font-bold text-white">2</span>
              </span>
            </div>

            <div className={`row-in mt-2 rounded-2xl p-2.5 ${SURFACE}`} style={delay(1.12)}>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[8.5px]">
                  <span className="h-4 w-4 rounded-full" style={{ background: "#3a2a12" }} />
                  Courier en route
                </span>
                <span className="rounded-full px-1.5 py-0.5 text-[7.5px] font-bold text-ink" style={{ background: ACCENT }}>
                  18 min ETA
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
              <div className="mt-2 flex h-1.5 gap-[3px]">
                {Array.from({ length: 18 }).map((_, i) => (
                  <span key={i} className="h-full flex-1 rounded-[1px]" style={{ background: i < 13 ? ACCENT : "#3a3a3a" }} />
                ))}
              </div>
            </div>

            {/* recent deliveries */}
            <div className="row-in mt-3 flex items-center justify-between" style={delay(1.24)}>
              <span className="font-display text-[11px] font-bold">Recent deliveries</span>
              <span className="text-[8px]" style={{ color: ACCENT }}>See all →</span>
            </div>
            <div className={`row-in mt-2 rounded-xl px-2.5 py-2 ${SURFACE}`} style={delay(1.32)}>
              <span className="flex items-center gap-1.5 text-[9px] font-medium">
                Business Contracts
                <span className="rounded-full bg-sage-700/40 px-1.5 py-px text-[7px] text-sage-300">Delivered</span>
              </span>
              <span className="mt-0.5 block text-[7.5px] text-white/45">Ikoyi → Lekki Phase 1 · Yesterday</span>
            </div>
          </div>

          {/* bottom nav */}
          <div className={`absolute inset-x-3 bottom-3 flex items-center justify-around rounded-full px-1.5 py-1.5 ${SURFACE}`}>
            {NAV.map((n) => (
              <span
                key={n.label}
                className={`flex flex-col items-center gap-0.5 rounded-full px-2.5 py-1 text-[7.5px] ${n.active ? "bg-[#3a2a12]" : "text-white/70"}`}
                style={n.active ? { color: ACCENT } : undefined}
              >
                <Icon className="h-3.5 w-3.5">{n.path}</Icon>
                {n.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <span className="row-in absolute -left-14 top-[58%] hidden rounded-full bg-amber-300 px-3.5 py-1.5 text-sm font-semibold text-ink sm:block" style={delay(1.4)}>
        Flutter
      </span>
    </div>
  );
}
