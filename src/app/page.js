import Link from "next/link";
import ImageSlot from "@/components/ImageSlot";
import ProjectCard from "@/components/ProjectCard";
import ServiceIcon from "@/components/ServiceIcon";
import SkillsSection from "@/components/SkillsSection";
import { projects, skills, services, engagements, testimonials } from "@/lib/projects";
import { SITE_NAME, GITHUB_URL, IMAGES } from "@/lib/siteConfig";

export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      <section className="container-page grid items-center gap-10 py-16 md:grid-cols-[1.15fr_0.85fr] md:gap-14 md:py-24">
        <div>
          <h1 className="animate-fade-up max-w-3xl font-display text-4xl font-extrabold leading-tight text-ink md:text-6xl">
            Hi, I&apos;m {SITE_NAME}. I build mobile apps, and the web and backend behind them.
          </h1>
          <p className="animate-fade-up mt-6 max-w-xl text-lg leading-relaxed text-stone-600">
            I&apos;m a software engineer who builds mobile apps in Flutter, with Next.js and
            Node.js for the dashboards and APIs a product needs. I ship production-structured
            apps for clients: SaaS platforms, staffing and estate tools, logistics
            and restaurant backends.
          </p>
          <div className="animate-fade-up mt-8 flex flex-wrap items-center gap-3">
            <Link href="/projects" className="rounded-md bg-ink px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-sage-800">
              See my work
            </Link>
            <Link href="/contact" className="rounded-md border border-stone-300 px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-stone-100">
              Get a quote
            </Link>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="rounded-md px-3 py-3 text-sm font-semibold text-stone-600 hover:text-ink">
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
          <aside
            aria-label="Stack at a glance"
            className="animate-fade-up rounded-xl border border-sage-200 bg-sage-50 p-6 md:p-8"
          >
            <p className="text-sm font-semibold text-sage-700">Stack at a glance</p>
            <dl className="mt-5 space-y-5">
              {skills.map((g) => (
                <div key={g.group}>
                  <dt className="text-xs font-semibold uppercase tracking-widest text-stone-500">{g.group}</dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {g.items.map((i) => (
                      <span key={i} className="rounded-full bg-paper px-2.5 py-1 text-xs font-medium text-sage-700 ring-1 ring-sage-200">
                        {i}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 border-t border-sage-200 pt-4 text-sm text-stone-600">
              {projects.length} projects across mobile, web and backend · Lagos, Nigeria
            </p>
          </aside>
        )}
      </section>

      <section id="services" className="scroll-mt-20 bg-sage-50 py-16 md:py-20">
        <div className="container-page">
          <h2 className="max-w-xl font-display text-2xl font-bold text-ink md:text-3xl">What I can build for you</h2>
          <p className="mt-3 max-w-2xl text-stone-600">
            One developer for the whole product, or for the one part you are missing.
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <article key={s.title} className="flex flex-col">
                <ImageSlot src={s.image} alt={s.title} ratio="aspect-[4/3]" className="rounded-lg" sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw" fallback={<ServiceIcon name={s.icon} />} />
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{s.description}</p>
                <p className="mt-3 text-sm text-sage-700">{s.stack.join(", ")}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16 md:py-20">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">Selected work</h2>
          <Link href="/projects" className="text-sm font-semibold text-sage-700 hover:underline">All projects</Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {featured.map((p) => <ProjectCard key={p.slug} project={p} />)}
        </div>
      </section>

      <section className="bg-sage-50 py-16 md:py-20">
        <div className="container-page">
          <h2 className="max-w-xl font-display text-2xl font-bold text-ink md:text-3xl">Ways to work together</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {engagements.map((e) => (
              <div key={e.title} className="border-t-2 border-sage-500 pt-5">
                <h3 className="font-display text-lg font-semibold text-ink">{e.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{e.description}</p>
                <p className="mt-3 text-sm text-sage-700">Good for: {e.fit}</p>
              </div>
            ))}
          </div>
          <Link href="/contact" className="mt-10 inline-block rounded-md bg-ink px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-sage-800">
            Tell me about your project
          </Link>
        </div>
      </section>

      <SkillsSection />

      {testimonials.length > 0 && (
        <section className="bg-sage-50 py-16 md:py-20">
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

      <section className="container-page py-20 text-center">
        <h2 className="mx-auto max-w-xl font-display text-2xl font-bold text-ink md:text-3xl">
          Have something to build?
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-stone-600">
          I take on contract projects end to end or slot into an existing team.
        </p>
        <Link href="/contact" className="mt-6 inline-block rounded-md bg-ink px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-sage-800">
          Start a conversation
        </Link>
      </section>
    </>
  );
}
