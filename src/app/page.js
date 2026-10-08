import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { projects, skills } from "@/lib/projects";
import { SITE_NAME, GITHUB_URL } from "@/lib/siteConfig";

export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      <section className="container-page py-20 md:py-28">
        <p className="animate-fade-up text-sm font-semibold uppercase tracking-wide text-sage-600">
          Full-stack developer · Lagos, Nigeria
        </p>
        <h1 className="animate-fade-up mt-4 max-w-3xl font-display text-4xl font-extrabold leading-tight text-ink md:text-6xl">
          Hi, I'm {SITE_NAME}. I build complete products, from mobile app to backend.
        </h1>
        <p className="animate-fade-up mt-6 max-w-2xl text-lg leading-relaxed text-stone-600">
          I work across Flutter, Next.js and Node.js to ship production-structured
          apps for clients: SaaS platforms, staffing and estate tools, logistics
          and restaurant backends.
        </p>
        <div className="animate-fade-up mt-8 flex flex-wrap gap-3">
          <Link href="/projects" className="rounded-md bg-ink px-5 py-3 text-sm font-semibold text-paper hover:bg-sage-800 transition-colors">
            See my work
          </Link>
          <Link href="/contact" className="rounded-md border border-stone-300 px-5 py-3 text-sm font-semibold text-ink hover:bg-stone-100 transition-colors">
            Get in touch
          </Link>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="rounded-md px-5 py-3 text-sm font-semibold text-stone-600 hover:text-ink">
            GitHub ↗
          </a>
        </div>
      </section>

      <section className="container-page pb-20">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">Selected work</h2>
          <Link href="/projects" className="text-sm font-semibold text-sage-700 hover:underline">All projects →</Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {featured.map((p) => <ProjectCard key={p.slug} project={p} />)}
        </div>
      </section>

      <section className="bg-sage-50 py-16">
        <div className="container-page">
          <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">What I work with</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((g) => (
              <div key={g.group}>
                <h3 className="text-sm font-semibold text-sage-700">{g.group}</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-stone-700">
                  {g.items.map((i) => <li key={i}>{i}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20 text-center">
        <h2 className="mx-auto max-w-xl font-display text-2xl font-bold text-ink md:text-3xl">
          Have something to build?
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-stone-600">
          I take on contract projects end to end or slot into an existing team.
        </p>
        <Link href="/contact" className="mt-6 inline-block rounded-md bg-ink px-5 py-3 text-sm font-semibold text-paper hover:bg-sage-800 transition-colors">
          Start a conversation
        </Link>
      </section>
    </>
  );
}
