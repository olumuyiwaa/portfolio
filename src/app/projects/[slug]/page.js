import Link from "next/link";
import { notFound } from "next/navigation";
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
    <article className="container-page max-w-3xl py-16 md:py-20">
      <Link href="/projects" className="text-sm font-semibold text-sage-700 hover:underline">← All work</Link>
      <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-sage-600">{p.kind}</p>
      <h1 className="mt-2 font-display text-4xl font-extrabold text-ink md:text-5xl">{p.name}</h1>
      <p className="mt-5 text-lg leading-relaxed text-stone-600">{p.summary}</p>

      <dl className="mt-10 grid gap-8 sm:grid-cols-2">
        <div>
          <dt className="text-sm font-semibold text-ink">My role</dt>
          <dd className="mt-2 text-stone-600">{p.role}</dd>
        </div>
        <div>
          <dt className="text-sm font-semibold text-ink">Stack</dt>
          <dd className="mt-2 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <span key={s} className="rounded-full bg-sage-50 px-2.5 py-1 text-xs font-medium text-sage-700">{s}</span>
            ))}
          </dd>
        </div>
      </dl>

      <h2 className="mt-10 font-display text-xl font-bold text-ink">What it covers</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-stone-600">
        {p.highlights.map((h) => <li key={h}>{h}</li>)}
      </ul>

      {p.links.length > 0 && (
        <div className="mt-10 flex flex-wrap gap-3">
          {p.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noreferrer"
               className="rounded-md border border-stone-300 px-4 py-2 text-sm font-semibold text-ink hover:bg-stone-100">
              {l.label} ↗
            </a>
          ))}
        </div>
      )}

      <div className="mt-14 border-t border-stone-200 pt-6">
        <Link href={`/projects/${next.slug}`} className="text-sm font-semibold text-ink hover:text-sage-700">
          Next project: {next.name} →
        </Link>
      </div>
    </article>
  );
}
