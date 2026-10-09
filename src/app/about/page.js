import Link from "next/link";
import ImageSlot from "@/components/ImageSlot";
import SkillsSection from "@/components/SkillsSection";
import { projects } from "@/lib/projects";
import { SITE_NAME, ROLE, IMAGES, GITHUB_URL } from "@/lib/siteConfig";

const PRINCIPLES = [
  {
    title: "Mobile first, whole product",
    text: "I start from the mobile app and build the web dashboard and backend behind it, so the pieces fit together from the first screen.",
  },
  {
    title: "Consistent architecture",
    text: "Each project follows clear, repeatable patterns, which keeps it production-structured and easy to extend.",
  },
  {
    title: "Clear data models",
    text: "Authentication, payments and integrations sit on a data model that is designed up front, not patched in later.",
  },
  {
    title: "Code the next developer can pick up",
    text: "Readable structure and handover documentation, so nobody needs a tour to continue the work.",
  },
];

export default function AboutPage() {
  const recent = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <>
      <section className="container-page py-14 md:py-20">
        <div className={IMAGES.about ? "grid items-center gap-10 md:grid-cols-[1.2fr_0.8fr]" : ""}>
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-sage-700">About</p>
            <h1 className="mt-2 max-w-3xl font-display text-5xl font-extrabold text-ink md:text-6xl">
              {ROLE} who ships the whole product
            </h1>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-stone-600">
              <p>
                I&apos;m {SITE_NAME}, a software engineer and technical contractor based in Lagos,
                Nigeria. I build Flutter apps for iOS and Android, and when a product needs them,
                the web dashboard and the backend behind the app.
              </p>
              <p>
                Mobile is my main craft, in Flutter. Around it I use Next.js for web and Node.js
                (Express and NestJS) for APIs. I like consistent architecture, clear data models and code the
                next developer can pick up without a tour.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="rounded-md bg-ink px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-sage-800">
                Work with me
              </Link>
              <Link href="/projects" className="rounded-md border border-stone-300 px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-stone-100">
                See my work
              </Link>
            </div>
          </div>
          <ImageSlot
            src={IMAGES.about}
            alt={`Portrait of ${SITE_NAME}`}
            ratio="aspect-[4/5]"
            className="rounded-xl"
            sizes="(min-width: 768px) 35vw, 100vw"
            priority
            hideWhenEmpty
          />
        </div>

        <dl className="mt-12 grid gap-px overflow-hidden rounded-lg border border-stone-200 bg-stone-200 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Based in", "Lagos, Nigeria"],
            ["Core stack", "Flutter first, plus Next.js and Node.js"],
            ["Projects", `${projects.length} across mobile, web and backend`],
            ["Works as", "Contractor, on projects or inside your team"],
          ].map(([k, v]) => (
            <div key={k} className="bg-paper p-5">
              <dt className="text-sm text-stone-500">{k}</dt>
              <dd className="mt-1.5 text-sm font-semibold text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border-t border-stone-200 py-20 md:py-28">
        <div className="container-page">
          <h2 className="max-w-xl font-display text-3xl font-bold text-ink md:text-4xl">How I work</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {PRINCIPLES.map((p, i) => (
              <div key={p.title} className="flex gap-4">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink text-xs font-bold text-paper">{i + 1}</span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-stone-600">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-stone-200">
        <SkillsSection />
      </div>

      <section className="border-t border-stone-200 py-20 md:py-28">
        <div className="container-page">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">Recent work</h2>
            <Link href="/projects" className="text-sm font-semibold text-sage-700 hover:underline">All projects</Link>
          </div>
          <ul className="mt-8 divide-y divide-stone-200 border-y border-stone-200">
            {recent.map((p) => (
              <li key={p.slug}>
                <Link href={`/projects/${p.slug}`} className="group flex items-center justify-between gap-4 py-5">
                  <span>
                    <span className="block font-display text-lg font-semibold text-ink">{p.name}</span>
                    <span className="block text-sm text-stone-600">{p.kind} · {p.stack.slice(0, 3).join(", ")}</span>
                  </span>
                  <span aria-hidden="true" className="text-stone-400 transition-transform group-hover:translate-x-1 group-hover:text-sage-700">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-page pb-20 md:pb-28">
        <div className="rounded-xl bg-ink p-8 text-paper md:p-14">
          <h2 className="max-w-xl font-display text-2xl font-bold md:text-3xl">Let&apos;s work together</h2>
          <p className="mt-3 max-w-xl text-stone-300">
            I take on fixed-scope projects, monthly retainers and embedded contractor roles.
            Tell me what you&apos;re building.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="/contact" className="rounded-md bg-paper px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-sage-100">
              Start a conversation
            </Link>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="rounded-md px-3 py-3 text-sm font-semibold text-stone-300 hover:text-paper">
              GitHub ↗
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
