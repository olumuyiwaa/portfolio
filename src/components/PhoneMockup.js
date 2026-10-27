"use client";

import { useEffect, useState } from "react";

// Auto-playing delivery-app phone mockup for the portfolio hero.
// Cycles promos, quick actions, progress, and tabs — no user input.

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
    {
        id: "track",
        label: "Track",
        path: (
            <>
                <circle cx="17" cy="6" r="2.5" />
                <path d="M17 8.5V10c0 2-2 2-4 2H8a3 3 0 0 0 0 6h8" />
            </>
        ),
    },
    {
        id: "send",
        label: "Send",
        path: (
            <>
                <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" />
                <circle cx="7" cy="17.5" r="1.6" />
                <circle cx="17" cy="17.5" r="1.6" />
            </>
        ),
    },
    {
        id: "invoice",
        label: "Invoice",
        path: (
            <>
                <rect x="5" y="3" width="14" height="18" rx="2" />
                <path d="M9 8h6M9 12h6M9 16h4" />
            </>
        ),
    },
    {
        id: "schedule",
        label: "Schedule",
        path: (
            <>
                <rect x="4" y="5" width="16" height="15" rx="2" />
                <path d="M4 10h16M9 3v4M15 3v4" />
            </>
        ),
    },
];

const NAV = [
    {
        id: "home",
        label: "Home",
        path: <path d="M4 11l8-7 8 7v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z" />,
    },
    {
        id: "activity",
        label: "Activity",
        path: (
            <>
                <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" />
                <circle cx="7" cy="17.5" r="1.4" />
                <circle cx="17" cy="17.5" r="1.4" />
            </>
        ),
    },
    {
        id: "wallet",
        label: "Wallet",
        path: (
            <>
                <rect x="3" y="6" width="18" height="13" rx="2.5" />
                <path d="M16 12.5h2" />
            </>
        ),
    },
    {
        id: "profile",
        label: "Profile",
        path: (
            <>
                <circle cx="12" cy="8" r="3.5" />
                <path d="M5 20c.5-3.6 3.3-5.5 7-5.5s6.5 1.9 7 5.5" />
            </>
        ),
    },
];

const PROMOS = [
    {
        title: "Send a package →",
        body: "Courier at your door in under 15 minutes. Insured and tracked.",
    },
    {
        title: "Track live →",
        body: "Share a live link with the receiver. Status updates every step.",
    },
    {
        title: "Business rates →",
        body: "Volume discounts and monthly invoices for teams that ship often.",
    },
];

const RECENT = [
    {
        title: "Business Contracts",
        meta: "Ikoyi → Lekki Phase 1",
        when: "Yesterday",
        status: "Delivered",
        tone: "done",
    },
    {
        title: "Personal Contracts",
        meta: "Epe → Ikeja",
        when: "Yesterday",
        status: "Delivered",
        tone: "done",
    },
    {
        title: "Return parcel",
        meta: "VI → Lekki",
        when: "Mon",
        status: "Delivered",
        tone: "done",
    },
    {
        title: "Laptop sleeve",
        meta: "Lekki → Ajah",
        when: "Today",
        status: "In transit",
        tone: "live",
    },
    {
        title: "Client documents",
        meta: "Ikeja → VI",
        when: "Today",
        status: "Picked up",
        tone: "live",
    },
    {
        title: "Sample Kit",
        meta: "Yaba → Ikeja",
        when: "Today",
        status: "Delivered",
        tone: "done",
    },
];

const WALLET_TX = [
    { label: "Delivery payout", amount: "+₦12,400", when: "Today", credit: true },
    { label: "Withdrawal · GTBank", amount: "-₦50,000", when: "Today", credit: false },
    { label: "Delivery payout", amount: "+₦8,200", when: "Today", credit: true },
    { label: "Withdrawal · GTBank", amount: "-₦50,000", when: "Yesterday", credit: false },
    { label: "Delivery payout", amount: "+₦8,200", when: "Mon", credit: true },
    { label: "Promo credit", amount: "+₦1,500", when: "Sun", credit: true },
];

const PROFILE_ROWS = [
    { label: "Saved addresses", value: "3" },
    { label: "Default payment", value: "Paystack ·••• 4242" },
    { label: "Notifications", value: "On" },
    { label: "Language", value: "English" },
];

const ACTION_ORDER = ["send", "track", "invoice", "schedule"];
const TAB_BEAT = ["home", "home", "home", "activity", "wallet", "profile", "home"];

const delay = (s) => ({ animationDelay: `${s}s` });

export default function PhoneMockup() {
    const [tab, setTab] = useState("home");
    const [action, setAction] = useState("send");
    const [promo, setPromo] = useState(0);
    const [progress, setProgress] = useState(13);
    const [tick, setTick] = useState(0);

    useEffect(() => {
        const id = window.setInterval(() => {
            setTick((t) => t + 1);
        }, 2800);
        return () => window.clearInterval(id);
    }, []);

    useEffect(() => {
        setPromo((p) => (p + 1) % PROMOS.length);
        setAction(ACTION_ORDER[tick % ACTION_ORDER.length]);
        setTab(TAB_BEAT[tick % TAB_BEAT.length]);
        setProgress((p) => (p >= 18 ? 8 : p + 1));
    }, [tick]);

    const subtitle =
        tab === "home"
            ? "Where are you sending something today?"
            : tab === "activity"
                ? "Your recent moves at a glance"
                : tab === "wallet"
                    ? "Balance and payout methods"
                    : "Account and preferences";

    return (
        <div
            className="relative mx-auto w-[270px] pointer-events-none md:w-[300px]"
            aria-hidden="true"
        >
            <div className="phone-in rounded-[44px] bg-night p-[10px] ring-1 ring-stone-300">
                <div className="relative aspect-[9/19] overflow-hidden rounded-[35px] bg-[#0b0b0b] text-white">
                    {/* status bar */}
                    <div className="flex items-center justify-between px-6 pt-3 text-[10px] font-semibold">
                        <span>9:41</span>
                        <span className="absolute left-1/2 top-2 h-4 w-16 -translate-x-1/2 rounded-full bg-black" />
                        <span className="flex items-center gap-1">
              <span className="flex items-end gap-[1.5px]">
                {[3, 5, 7, 9].map((h) => (
                    <span
                        key={h}
                        className="w-[2px] rounded-sm bg-white"
                        style={{ height: h }}
                    />
                ))}
              </span>
              <span className="h-[8px] w-[15px] rounded-[3px] border border-white/70 p-[1px]">
                <span className="block h-full w-2/3 rounded-[1px] bg-white" />
              </span>
            </span>
                    </div>

                    <div className="px-4 pb-16 pt-3">
                        {/* greeting */}
                        <div className="row-in flex items-center gap-2.5" style={delay(0.5)}>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sage-600 text-[11px] font-bold">
                E
              </span>
                            <span className="min-w-0 flex-1">
                <span className="block font-display text-[12px] font-bold leading-tight">
                  Good morning, Emmanuel
                </span>
                <span className="block truncate text-[8.5px] text-white/55">
                  {subtitle}
                </span>
              </span>
                            <span
                                className={`relative grid h-7 w-7 shrink-0 place-items-center rounded-full ${SURFACE}`}
                            >
                <Icon className="h-3.5 w-3.5">
                  <path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15zM10 20.5h4" />
                </Icon>
                <span
                    className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full"
                    style={{ background: ACCENT }}
                />
              </span>
                        </div>

                        {/* HOME */}
                        {tab === "home" && (
                            <>
                                <div className="row-in mt-3 flex gap-2" style={delay(0.62)}>
                                    <div
                                        className={`flex h-8 flex-1 items-center gap-2 rounded-xl px-2.5 ${SURFACE}`}
                                    >
                    <span style={{ color: ACCENT }}>
                      <Icon className="h-3.5 w-3.5">
                        <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" />
                        <circle cx="7" cy="17.5" r="1.4" />
                      </Icon>
                    </span>
                                        <span className="truncate text-[8.5px] text-white/40">
                      Enter pickup or destination…
                    </span>
                                    </div>
                                    <span
                                        className={`grid h-8 w-8 place-items-center rounded-xl ${SURFACE}`}
                                        style={{ color: ACCENT }}
                                    >
                    <Icon className="h-3.5 w-3.5">
                      <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 18h2v2h-2zM14 20v-2M20 14v2" />
                    </Icon>
                  </span>
                                </div>

                                <div
                                    className="row-in relative mt-3 overflow-hidden rounded-2xl px-3.5 py-3 text-night"
                                    style={{ ...delay(0.74), background: ACCENT }}
                                >
                                    <p className="font-display text-[14px] font-extrabold leading-tight">
                                        {PROMOS[promo].title}
                                    </p>
                                    <p className="mt-1 max-w-[130px] text-[8px] font-medium leading-snug">
                                        {PROMOS[promo].body}
                                    </p>
                                    <span className="absolute -right-1 bottom-0 h-12 w-16 rounded-tl-xl bg-[#D9831A]" />
                                    <span className="absolute bottom-2 right-4 h-8 w-9 rounded-[3px] bg-[#F7C57A]" />
                                </div>
                                <div className="mt-2 flex justify-center gap-1">
                                    {PROMOS.map((_, i) => (
                                        <span
                                            key={i}
                                            className="h-1 w-1 rounded-full transition-colors duration-300"
                                            style={{
                                                background: i === promo ? ACCENT : "rgba(255,255,255,0.25)",
                                            }}
                                        />
                                    ))}
                                </div>

                                <ul className="row-in mt-3 grid grid-cols-4 gap-1" style={delay(0.86)}>
                                    {ACTIONS.map((a) => {
                                        const active = action === a.id;
                                        return (
                                            <li key={a.id} className="flex flex-col items-center gap-1">
                        <span
                            className={`grid h-9 w-9 place-items-center rounded-full ${SURFACE} transition-all duration-300`}
                            style={
                                active
                                    ? { color: ACCENT, boxShadow: `0 0 0 1px ${ACCENT}66` }
                                    : undefined
                            }
                        >
                          <Icon className="h-4 w-4">{a.path}</Icon>
                        </span>
                                                <span
                                                    className="text-[8px] transition-colors duration-300"
                                                    style={{
                                                        color: active ? ACCENT : "rgba(255,255,255,0.8)",
                                                    }}
                                                >
                          {a.label}
                        </span>
                                            </li>
                                        );
                                    })}
                                </ul>

                                <div
                                    className={`row-in mt-3.5 rounded-2xl p-2.5 ${SURFACE}`}
                                    style={delay(1)}
                                >
                                    {action === "send" && (
                                        <>
                                            <div className="flex items-center justify-between">
                                                <span className="text-[8.5px] font-medium">Courier en route</span>
                                                <span
                                                    className="rounded-full px-1.5 py-0.5 text-[7.5px] font-bold text-night"
                                                    style={{ background: ACCENT }}
                                                >
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
                                                    <span
                                                        key={i}
                                                        className="h-full flex-1 rounded-[1px] transition-colors duration-500"
                                                        style={{ background: i < progress ? ACCENT : "#3a3a3a" }}
                                                    />
                                                ))}
                                            </div>
                                        </>
                                    )}
                                    {action === "track" && (
                                        <p className="text-[9px] leading-relaxed text-white/80">
                                            Live map and status history for every package — share a link with the
                                            receiver.
                                        </p>
                                    )}
                                    {action === "invoice" && (
                                        <div className="space-y-1.5 text-[9px]">
                                            <div className="flex justify-between">
                                                <span className="text-white/60">Draft INV-1042</span>
                                                <span style={{ color: ACCENT }}>₦42,500</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-white/60">Paid INV-1038</span>
                                                <span className="text-sage-300">₦18,000</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-white/60">Overdue INV-1029</span>
                                                <span className="text-red-300/90">₦9,750</span>
                                            </div>
                                        </div>
                                    )}
                                    {action === "schedule" && (
                                        <div className="space-y-1.5 text-[9px]">
                                            <p className="leading-relaxed text-white/80">
                                                Book a pickup window. Couriers confirm within minutes.
                                            </p>
                                            <div className="flex gap-1.5 pt-0.5">
                                                {["2–4pm", "4–6pm", "Tomorrow"].map((slot, i) => (
                                                    <span
                                                        key={slot}
                                                        className={`rounded-lg px-2 py-1 text-[8px] ${SURFACE_2}`}
                                                        style={
                                                            i === 0
                                                                ? { boxShadow: `0 0 0 1px ${ACCENT}88`, color: ACCENT }
                                                                : undefined
                                                        }
                                                    >
                            {slot}
                          </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div
                                    className="row-in mt-3 flex items-center justify-between"
                                    style={delay(1.2)}
                                >
                                    <span className="font-display text-[11px] font-bold">Recent deliveries</span>
                                    <span className="text-[8px]" style={{ color: ACCENT }}>
                    See all →
                  </span>
                                </div>
                                <div
                                    className={`row-in mt-2 rounded-xl px-2.5 py-2 ${SURFACE}`}
                                    style={delay(1.28)}
                                >
                  <span className="flex items-center gap-1.5 text-[9px] font-medium">
                    Business Contracts
                    <span className="rounded-full bg-sage-700/40 px-1.5 py-px text-[7px] text-sage-300">
                      Delivered
                    </span>
                  </span>
                                    <span className="mt-0.5 block text-[7.5px] text-white/45">
                    Ikoyi → Lekki Phase 1 · Yesterday
                  </span>
                                </div>
                            </>
                        )}

                        {/* ACTIVITY */}
                        {tab === "activity" && (
                            <div className="mt-4 space-y-3">
                                <div className="flex gap-2">
                                    {["All", "In transit", "Delivered"].map((f, i) => (
                                        <span
                                            key={f}
                                            className={`rounded-full px-2 py-0.5 text-[8px] ${i === 0 ? "" : SURFACE}`}
                                            style={
                                                i === 0
                                                    ? { background: ACCENT, color: "#111" }
                                                    : { color: "rgba(255,255,255,0.7)" }
                                            }
                                        >
                      {f}
                    </span>
                                    ))}
                                </div>
                                <ul className="space-y-2">
                                    {RECENT.map((r) => (
                                        <li
                                            key={r.title + r.when}
                                            className={`rounded-xl px-2.5 py-2 ${SURFACE}`}
                                        >
                      <span className="flex items-center justify-between gap-2">
                        <span className="text-[9px] font-medium">{r.title}</span>
                        <span
                            className="shrink-0 rounded-full px-1.5 py-px text-[7px]"
                            style={
                                r.tone === "live"
                                    ? { background: "rgba(242,155,29,0.2)", color: ACCENT }
                                    : { background: "rgba(74,122,90,0.35)", color: "#b8d4c4" }
                            }
                        >
                          {r.status}
                        </span>
                      </span>
                                            <span className="mt-0.5 block text-[7.5px] text-white/45">
                        {r.meta} · {r.when}
                      </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* WALLET */}
                        {tab === "wallet" && (
                            <div className="mt-4 space-y-3">
                                <div className={`rounded-2xl p-3 ${SURFACE}`}>
                                    <p className="text-[8px] text-white/50">Available balance</p>
                                    <p
                                        className="font-display text-[22px] font-bold"
                                        style={{ color: ACCENT }}
                                    >
                                        ₦128,400
                                    </p>
                                    <p className="mt-0.5 text-[7.5px] text-white/40">Pending · ₦6,200</p>
                                    <div className="mt-3 grid grid-cols-2 gap-2">
                    <span
                        className={`rounded-xl px-2 py-2 text-center text-[8px] font-medium ${SURFACE_2}`}
                    >
                      Add funds
                    </span>
                                        <span
                                            className="rounded-xl px-2 py-2 text-center text-[8px] font-medium text-night"
                                            style={{ background: ACCENT }}
                                        >
                      Withdraw
                    </span>
                                    </div>
                                </div>
                                <div>
                                    <p className="mb-1.5 font-display text-[10px] font-bold">Recent activity</p>
                                    <ul className="space-y-1.5">
                                        {WALLET_TX.map((t) => (
                                            <li
                                                key={t.label + t.when}
                                                className={`flex items-center justify-between rounded-xl px-2.5 py-2 ${SURFACE}`}
                                            >
                        <span>
                          <span className="block text-[8.5px] font-medium">{t.label}</span>
                          <span className="text-[7px] text-white/40">{t.when}</span>
                        </span>
                                                <span
                                                    className="text-[9px] font-semibold"
                                                    style={{
                                                        color: t.credit ? "#8fceb0" : "rgba(255,255,255,0.75)",
                                                    }}
                                                >
                          {t.amount}
                        </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {/* PROFILE */}
                        {tab === "profile" && (
                            <div className="mt-4 space-y-3">
                                <div className={`flex items-center gap-2.5 rounded-2xl p-3 ${SURFACE}`}>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-sage-600 text-[13px] font-bold">
                    E
                  </span>
                                    <span className="min-w-0">
                    <span className="block text-[11px] font-bold">Emmanuel</span>
                    <span className="block text-[8px] text-white/50">
                      emmanuel@example.com
                    </span>
                    <span
                        className="mt-0.5 inline-block rounded-full px-1.5 py-px text-[7px] font-semibold text-night"
                        style={{ background: ACCENT }}
                    >
                      Business
                    </span>
                  </span>
                                </div>
                                <ul className={`overflow-hidden rounded-2xl ${SURFACE}`}>
                                    {PROFILE_ROWS.map((row, i) => (
                                        <li
                                            key={row.label}
                                            className={`flex items-center justify-between px-3 py-2.5 text-[8.5px] ${
                                                i < PROFILE_ROWS.length - 1 ? "border-b border-white/5" : ""
                                            }`}
                                        >
                                            <span className="text-white/60">{row.label}</span>
                                            <span className="font-medium text-white/90">{row.value}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div
                                    className={`rounded-2xl px-3 py-2.5 text-[8px] text-white/45 ${SURFACE}`}
                                >
                                    App version 2.4.1 · Lagos
                                </div>
                            </div>
                        )}
                    </div>

                    {/* bottom nav */}
                    <div
                        className={`absolute inset-x-3 bottom-3 flex items-center justify-around rounded-full px-1.5 py-1.5 ${SURFACE}`}
                    >
                        {NAV.map((n) => {
                            const active = tab === n.id;
                            return (
                                <span
                                    key={n.id}
                                    className={`flex flex-col items-center gap-0.5 rounded-full px-2.5 py-1 text-[7.5px] transition-colors duration-300 ${
                                        active ? "bg-[#3a2a12]" : "text-white/70"
                                    }`}
                                    style={active ? { color: ACCENT } : undefined}
                                >
                  <Icon className="h-3.5 w-3.5">{n.path}</Icon>
                                    {n.label}
                </span>
                            );
                        })}
                    </div>
                </div>
            </div>

            <span
                className="row-in absolute -left-14 top-[58%] hidden rounded-full bg-amber-300 px-3.5 py-1.5 text-sm font-semibold text-night sm:block"
                style={delay(1.4)}
            >
        Flutter
      </span>
        </div>
    );
}