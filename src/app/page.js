import Link from "next/link";
import ImageSlot from "@/components/ImageSlot";
import PhoneMockup from "@/components/PhoneMockup";
import ProjectCard from "@/components/ProjectCard";
import ServiceMedia from "@/components/ServiceMedia";
import SkillsSection from "@/components/SkillsSection";
import { projects, services, engagements, testimonials } from "@/lib/projects";
import { SITE_NAME, GITHUB_URL, IMAGES } from "@/lib/siteConfig";

const ENGAGEMENT_ICONS = {
  scope: <><path d="M6 3h9l4 4v14H6z" /><path d="M14 3v5h5M9.5 13h6M9.5 17h4" /></>,
  repeat: <><path d="M4 12a8 8 0 0 1 13.7-5.6L20 8.5M20 4v4.5h-4.5M20 12a8 8 0 0 1-13.7 5.6L4 15.5M4 20v-4.5h4.5" /></>,
  team: <><circle cx="9" cy="8" r="3.2" /><path d="M3 20c.4-3.4 2.8-5.3 6-5.3s5.6 1.9 6 5.3M16 5.2a3.2 3.2 0 0 1 0 5.6M18 14.9c1.7.7 2.8 2.3 3 5.1" /></>,
};

export default function Home() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <>
      <section className="container-page grid items-center gap-14 py-16 md:grid-cols-[1.2fr_0.8fr] md:gap-10 md:py-28">
        <div>
          <h1 className="animate-fade-up max-w-3xl font-display text-[2.75rem] font-extrabold text-ink sm:text-6xl">
            Hi, I&apos;m {SITE_NAME}. I build mobile apps, and the web and backend behind them.
          </h1>
          <p className="animate-fade-up mt-7 max-w-xl text-lg leading-relaxed text-stone-600" style={{ animationDelay: "0.1s" }}>
            I&apos;m a software engineer who builds mobile apps in Flutter, with Next.js and
            Node.js for the dashboards and APIs a product needs. I ship production-structured
            apps for clients: SaaS platforms, staffing and estate tools, logistics
            and restaurant backends.
          </p>
          <div className="animate-fade-up mt-9 flex flex-wrap items-center gap-3" style={{ animationDelay: "0.2s" }}>
            <Link href="/projects" className="rounded-md bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-hover">
              See my work
            </Link>
            <Link href="/contact" className="rounded-md border border-stone-300 px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-ink">
              Get a quote
            </Link>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="rounded-md px-3 py-3.5 text-sm font-semibold text-stone-600 hover:text-ink">
              GitHub
            </a>
          </div>
        </div>

        {IMAGES.hero ? (
          <ImageSlot
            src={IMAGES.hero}
            alt={`Portrait of ${SITE_NAME}`}
            ratio="aspect-[4/5]"
            className="rounded-xl"
            sizes="(min-width: 768px) 40vw, 100vw"
            priority
          />
        ) : (
          <PhoneMockup />
        )}
      </section>

      <section id="services" className="container-page scroll-mt-20 border-t border-stone-200 py-20 md:py-28">
        <div>
          <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">What I can build for you</h2>
          <p className="mt-4 max-w-xl text-stone-600">
            One developer for the whole product, or for the one part you are missing.
          </p>
        </div>
        <ul className="mt-12 grid gap-5 md:gap-6 lg:grid-cols-2">
          {services.map((s) => (
            <li key={s.title} className="grid items-center gap-2 rounded-xl border border-stone-200 bg-paper p-3 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-5 sm:p-4">
              <div className="relative aspect-[5/3] overflow-hidden rounded-md">
                <ServiceMedia src={s.image} name={s.icon} alt={`${s.title} illustration`} />
              </div>
              <div className="px-3 pb-3 pt-4 sm:px-0 sm:py-2 sm:pr-3">
                <h3 className="font-display text-xl font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-stone-600">{s.description}</p>
                <p className="mt-4 text-sm text-accent">{s.stack.join(", ")}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-page border-t border-stone-200 py-20 md:py-28">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">Selected work</h2>
          <Link href="/projects" className="text-sm font-semibold text-accent hover:underline">All projects</Link>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {featured.map((p) => <ProjectCard key={p.slug} project={p} />)}
        </div>
      </section>

      <section className="container-page border-t border-stone-200 py-20 md:py-28">
        <h2 className="max-w-xl font-display text-3xl font-bold text-ink md:text-4xl">Ways to work together</h2>
        <p className="mt-3 max-w-xl text-stone-600">Pick the setup that fits how your team works.</p>
        <ul className="mt-12 grid gap-5 md:grid-cols-3 md:gap-6">
          {engagements.map((e) => (
            <li key={e.title} className="flex flex-col rounded-xl border border-stone-200 bg-paper p-6">
              <span className="grid h-11 w-11 place-items-center rounded-md bg-sage-50 text-accent">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {ENGAGEMENT_ICONS[e.icon]}
                </svg>
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold text-ink">{e.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-600">{e.description}</p>
              <div className="mt-6 border-t border-stone-200 pt-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-stone-500">Best for</p>
                <p className="mt-1 text-sm font-medium text-ink">{e.fit}</p>
              </div>
              <Link href={`/contact?engagement=${e.id}`} className="mt-5 text-sm font-semibold text-accent hover:underline">
                {e.cta} →
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="border-t border-stone-200">
        <SkillsSection />
      </div>

      {testimonials.length > 0 && (
        <section className="border-t border-stone-200 py-20 md:py-28">
          <div className="container-page">
            <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">What clients say</h2>
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              {testimonials.map((t) => (
                <figure key={t.name} className="rounded-lg border border-stone-200 bg-paper p-6">
                  <blockquote className="text-lg leading-relaxed text-ink">{t.quote}</blockquote>
                  <figcaption className="mt-5 flex items-center gap-3">
                    <ImageSlot src={t.avatar} alt={t.name} ratio="aspect-square" className="h-11 w-11 shrink-0 rounded-full" sizes="44px" />
                    <span className="text-sm">
                      <span className="block font-semibold text-ink">{t.name}</span>
                      <span className="text-stone-500">{t.role}</span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="container-page pb-20 md:pb-28">
        <div className="rounded-xl bg-panel px-6 py-14 text-center md:px-12 md:py-20">
          <h2 className="mx-auto max-w-xl font-display text-3xl font-bold text-white md:text-5xl">
            Have something to build?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-white/70">
            I take on contract projects end to end or slot into an existing team.
          </p>
          <Link href="/contact" className="mt-8 inline-block rounded-md bg-white px-6 py-3.5 text-sm font-semibold text-night transition-colors hover:bg-[#DCEBE1]">
            Start a conversation
          </Link>
        </div>
      </section>
    </>
  );
}
