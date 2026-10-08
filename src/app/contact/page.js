import ContactForm from "@/components/ContactForm";
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/siteConfig";

const STEPS = [
  { title: "Send the details", text: "Tell me what you are building and what you need help with." },
  { title: "I reply with next steps", text: "Questions, a rough approach and how we could work together." },
  { title: "We agree the scope", text: "A fixed project, a retainer or an embedded role, then we start." },
];

const Icon = ({ children }) => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

const CHANNELS = [
  {
    label: "Email",
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    icon: <><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m3.5 7 8.5 6 8.5-6" /></>,
  },
  {
    label: "GitHub",
    value: GITHUB_URL.replace(/^https?:\/\//, ""),
    href: GITHUB_URL,
    external: true,
    icon: <><path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" /></>,
  },
  ...(LINKEDIN_URL
    ? [{
        label: "LinkedIn",
        value: LINKEDIN_URL.replace(/^https?:\/\/(www\.)?/, ""),
        href: LINKEDIN_URL,
        external: true,
        icon: <><rect x="3.5" y="3.5" width="17" height="17" rx="3" /><path d="M8 10.5V16M8 8h.01M12 16v-3.2a2.3 2.3 0 0 1 4.6 0V16M12 10.5V16" /></>,
      }]
    : []),
];

export default function ContactPage() {
  return (
    <section className="container-page py-14 md:py-20">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <p className="text-sm font-semibold text-sage-700">Contact</p>
          <h1 className="mt-2 font-display text-4xl font-extrabold leading-tight text-ink md:text-5xl">
            Let&apos;s build something together
          </h1>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-stone-600">
            Tell me what you&apos;re building and I&apos;ll reply with next steps. Mobile, web or backend, from a first MVP to an existing product.
          </p>

          <ul className="mt-8 space-y-3">
            {CHANNELS.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="group flex items-center gap-4 rounded-lg border border-stone-200 bg-paper p-4 transition-colors hover:border-sage-400"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-sage-50 text-sage-700 transition-colors group-hover:bg-sage-100">
                    <Icon>{c.icon}</Icon>
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold uppercase tracking-widest text-stone-500">{c.label}</span>
                    <span className="block truncate text-sm font-semibold text-ink">{c.value}</span>
                  </span>
                  <span aria-hidden="true" className="ml-auto text-stone-400 transition-transform group-hover:translate-x-0.5 group-hover:text-sage-700">
                    {c.external ? "↗" : "→"}
                  </span>
                </a>
              </li>
            ))}
            <li className="flex items-center gap-4 p-4 text-sm text-stone-600">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-sage-50 text-sage-700">
                <Icon><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></Icon>
              </span>
              Based in Lagos, Nigeria. Working with clients anywhere.
            </li>
          </ul>

          <h2 className="mt-10 font-display text-lg font-bold text-ink">What happens next</h2>
          <ol className="mt-4 space-y-4">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink text-xs font-bold text-paper">{i + 1}</span>
                <span>
                  <span className="block text-sm font-semibold text-ink">{s.title}</span>
                  <span className="block text-sm leading-relaxed text-stone-600">{s.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="self-start rounded-xl border border-stone-200 bg-paper p-6 shadow-[0_20px_50px_-30px_rgba(22,35,28,0.35)] md:p-8">
          <h2 className="font-display text-xl font-bold text-ink">Send me a message</h2>
          <p className="mt-1 text-sm text-stone-600">All fields are required.</p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
