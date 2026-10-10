import Link from "next/link";
import ImageSlot from "@/components/ImageSlot";
import PhoneMockup from "@/components/PhoneMockup";
import ProjectCard from "@/components/ProjectCard";
import ServiceMedia from "@/components/ServiceMedia";
import SkillsSection from "@/components/SkillsSection";
import { projects, services, engagements, testimonials } from "@/lib/projects";
import { SITE_NAME, GITHUB_URL, IMAGES } from "@/lib/siteConfig";

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
            <Link href="/projects" className="rounded-md bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-sage-800">
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
        <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-stone-200 bg-stone-200 lg:grid-cols-2">
          {services.map((s) => (
            <li key={s.title} className="grid items-center gap-2 bg-paper p-3 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-5 sm:p-4">
              <div className="relative aspect-[5/3] overflow-hidden rounded-md">
                <ServiceMedia src={s.image} name={s.icon} alt={`${s.title} illustration`} />
              </div>
              <div className="px-3 pb-3 pt-4 sm:px-0 sm:py-2 sm:pr-3">
                <h3 className="font-display text-xl font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-stone-600">{s.description}</p>
                <p className="mt-4 text-sm text-sage-700">{s.stack.join(", ")}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-page border-t border-stone-200 py-20 md:py-28">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">Selected work</h2>
          <Link href="/projects" className="text-sm font-semibold text-sage-700 hover:underline">All projects</Link>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {featured.map((p) => <ProjectCard key={p.slug} project={p} />)}
        </div>
      </section>

      <section className="container-page border-t border-stone-200 py-20 md:py-28">
        <h2 className="max-w-xl font-display text-3xl font-bold text-ink md:text-4xl">Ways to work together</h2>
        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {engagements.map((e) => (
            <div key={e.title} className="border-t-2 border-ink pt-6">
              <h3 className="font-display text-xl font-semibold text-ink">{e.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">{e.description}</p>
              <p className="mt-4 text-sm text-sage-700">Good for: {e.fit}</p>
            </div>
          ))}
        </div>
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
        <div className="rounded-xl bg-ink px-6 py-14 text-center md:px-12 md:py-20">
          <h2 className="mx-auto max-w-xl font-display text-3xl font-bold text-paper md:text-5xl">
            Have something to build?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-stone-300">
            I take on contract projects end to end or slot into an existing team.
          </p>
          <Link href="/contact" className="mt-8 inline-block rounded-md bg-paper px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-sage-100">
            Start a conversation
          </Link>
        </div>
      </section>
    </>
  );
}
