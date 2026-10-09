// A flat, CSS-built phone showing a generic app screen. Decorative only:
// it stands in for real app screenshots until they are added. The screen
// builds in once on load (see .phone-in and .row-in in globals.css).
const ROWS = [
  { tone: "bg-sage-600", w: "w-24" },
  { tone: "bg-amber-300", w: "w-28" },
  { tone: "bg-sage-300", w: "w-20" },
];

export default function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[260px] md:w-[290px]" aria-hidden="true">
      <div className="phone-in rounded-[44px] bg-ink p-3">
        <div className="relative aspect-[9/19] overflow-hidden rounded-[34px] bg-white">
          <div className="absolute left-1/2 top-2.5 h-5 w-20 -translate-x-1/2 rounded-full bg-ink" />

          <div className="px-5 pt-12">
            <div className="row-in h-2.5 w-16 rounded-full bg-stone-200" style={{ animationDelay: "0.5s" }} />
            <div className="row-in mt-3 h-5 w-32 rounded-md bg-ink" style={{ animationDelay: "0.6s" }} />

            <div className="row-in mt-6 rounded-xl bg-sage-600 p-4" style={{ animationDelay: "0.75s" }}>
              <div className="h-2 w-14 rounded-full bg-sage-200" />
              <div className="mt-3 h-6 w-28 rounded-md bg-white" />
              <div className="mt-4 flex gap-2">
                <div className="h-7 w-16 rounded-full bg-white" />
                <div className="h-7 w-16 rounded-full bg-sage-700" />
              </div>
            </div>

            <ul className="mt-5 space-y-3">
              {ROWS.map((r, i) => (
                <li
                  key={i}
                  className="row-in flex items-center gap-3 rounded-lg border border-stone-200 p-3"
                  style={{ animationDelay: `${0.95 + i * 0.12}s` }}
                >
                  <span className={`h-9 w-9 shrink-0 rounded-md ${r.tone}`} />
                  <span className="min-w-0 flex-1">
                    <span className={`block h-2.5 rounded-full bg-ink ${r.w}`} />
                    <span className="mt-2 block h-2 w-16 rounded-full bg-stone-200" />
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="absolute inset-x-0 bottom-0 flex items-center justify-around border-t border-stone-200 bg-white px-6 py-4">
            <span className="h-2.5 w-2.5 rounded-full bg-sage-600" />
            <span className="h-2.5 w-2.5 rounded-full bg-stone-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-stone-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-stone-300" />
          </div>
        </div>
      </div>

      <span className="row-in absolute -left-6 top-24 hidden rounded-full bg-amber-300 px-3.5 py-1.5 text-sm font-semibold text-ink sm:block" style={{ animationDelay: "1.4s" }}>
        Flutter
      </span>
    </div>
  );
}
