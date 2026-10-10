import Link from "next/link";
import { notFound } from "next/navigation";
import ImageSlot from "@/components/ImageSlot";
import ProjectCover from "@/components/ProjectCover";
import { projects, getProject } from "@/lib/projects";
import { buildMetadata } from "@/lib/siteConfig";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const p = getProject(params.slug);
  if (!p) return {};
  return buildMetadata({ title: p.name, description: p.summary, path: `/projects/${p.slug}` });
}

export default function ProjectPage({ params }) {
  const p = getProject(params.slug);
  if (!p) notFound();
  const i = projects.indexOf(p);
  const next = projects[(i + 1) % projects.length];

  return (
    <article className="container-page py-14 md:py-20">
      <div className="max-w-3xl">
        <Link href="/projects" className="text-sm font-semibold text-sage-700 hover:underline">Back to all work</Link>
        <p className="mt-6 text-sm font-medium text-sage-600">{p.kind}</p>
        <h1 className="mt-1 font-display text-4xl font-extrabold text-ink md:text-5xl">{p.name}</h1>
        <p className="mt-5 text-lg leading-relaxed text-stone-600">{p.summary}</p>

        {p.links?.length > 0 && (
          <div className="mt-7 flex flex-wrap gap-3">
            {p.links.map((l, idx) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className={
                  idx === 0
                    ? "rounded-md bg-ink px-5 py-2.5 text-sm font-semibold text-white hover:bg-sage-800"
                    : "rounded-md border border-stone-300 px-5 py-2.5 text-sm font-semibold text-ink hover:border-ink"
                }
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        )}
      </div>

      <ProjectCover project={p} ratio="aspect-[16/9]" className="mt-10 rounded-xl" sizes="(min-width: 1200px) 1200px, 100vw" priority />

      {p.stats?.length > 0 && (
        <dl className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-stone-200 bg-stone-200 sm:grid-cols-3 lg:grid-cols-4">
          {p.stats.map((s) => (
            <div key={s.label} className="bg-paper p-5">
              <dd className="font-display text-2xl font-extrabold text-ink">{s.value}</dd>
              <dt className="mt-1 text-sm text-stone-600">{s.label}</dt>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
        <div className="max-w-3xl">
          <section>
            <h2 className="font-display text-2xl font-bold text-ink">Overview</h2>
            <div className="mt-4 space-y-4 leading-relaxed text-stone-600">
              {p.overview?.map((para, idx) => <p key={idx}>{para}</p>)}
            </div>
          </section>

          {p.features?.length > 0 && (
            <section className="mt-12">
              <h2 className="font-display text-2xl font-bold text-ink">What I built</h2>
              <ul className="mt-5 divide-y divide-stone-200 border-y border-stone-200">
                {p.features.map((f) => (
                  <li key={f.title} className="py-5">
                    <h3 className="font-display text-base font-bold text-ink">{f.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-stone-600">{f.text}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {p.engineering?.length > 0 && (
            <section className="mt-12">
              <h2 className="font-display text-2xl font-bold text-ink">Engineering notes</h2>
              <ul className="mt-4 space-y-3 text-stone-600">
                {p.engineering.map((e, idx) => (
                  <li key={idx} className="flex gap-3 leading-relaxed">
                    <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-sage-500" />
                    <span>{e}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="h-fit rounded-xl border border-stone-200 bg-paper p-6 lg:sticky lg:top-24">
          <dl className="space-y-6">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-widest text-stone-500">My role</dt>
              <dd className="mt-2 text-sm leading-relaxed text-ink">{p.role}</dd>
            </div>
            {p.platforms?.length > 0 && (
              <div>
                <dt className="text-xs font-semibold uppercase tracking-widest text-stone-500">Platforms</dt>
                <dd className="mt-2 text-sm text-ink">{p.platforms.join(", ")}</dd>
              </div>
            )}
            {p.availability && (
              <div>
                <dt className="text-xs font-semibold uppercase tracking-widest text-stone-500">Availability</dt>
                <dd className="mt-2 text-sm text-ink">{p.availability}</dd>
              </div>
            )}
            <div>
              <dt className="text-xs font-semibold uppercase tracking-widest text-stone-500">Stack</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span key={s} className="rounded-full bg-sage-50 px-2.5 py-1 text-xs font-medium text-sage-700">{s}</span>
                ))}
              </dd>
            </div>
          </dl>
        </aside>
      </div>

      {p.gallery?.some(Boolean) && (
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {p.gallery.filter(Boolean).map((src, idx) => (
            <ImageSlot key={idx} src={src} alt={`${p.name} screenshot ${idx + 1}`} ratio="aspect-[16/10]" className="rounded-lg" sizes="(min-width: 640px) 50vw, 100vw" />
          ))}
        </div>
      )}

      <div className="mt-14 border-t border-stone-200 pt-6">
        <Link href={`/projects/${next.slug}`} className="text-sm font-semibold text-ink hover:text-sage-700">
          Next project: {next.name}
        </Link>
      </div>
    </article>
  );
}
