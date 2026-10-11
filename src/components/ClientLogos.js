import { clients } from "@/lib/projects";

// A quiet "worked with" strip. Logos render muted and monochrome so mixed brand
// colours do not compete with the page; they are tinted white in dark mode.
export default function ClientLogos() {
  if (!clients.length) return null;
  return (
    <section aria-label="Organisations I have worked with" className="border-t border-stone-200">
      <div className="container-page py-10 md:py-12">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-stone-500">
          Trusted by teams and founders at
        </p>
        <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 md:gap-x-16">
          {clients.map((c) => {
            const inner = c.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={c.logo}
                alt={c.name}
                loading="lazy"
                className={`w-auto max-w-[140px] object-contain opacity-75 grayscale transition-opacity hover:opacity-100 dark:opacity-70 dark:brightness-0 dark:invert ${c.tall ? "h-10 md:h-12" : "h-7 md:h-8"}`}
              />
            ) : (
              <span className="font-display text-lg font-bold text-stone-500 transition-colors hover:text-ink">{c.name}</span>
            );
            return (
              <li key={c.name} className="flex items-center">
                {c.href ? (
                  <a href={c.href} target="_blank" rel="noreferrer" aria-label={c.name}>{inner}</a>
                ) : (
                  inner
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
