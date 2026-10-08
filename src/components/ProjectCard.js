import Link from "next/link";

export default function ProjectCard({ project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col rounded-lg border border-stone-200 bg-paper p-6 transition hover:-translate-y-1 hover:border-sage-300 hover:shadow-md"
    >
      <span className="text-xs font-semibold uppercase tracking-wide text-sage-600">{project.kind}</span>
      <h3 className="mt-2 font-display text-xl font-semibold text-ink">{project.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">{project.summary}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <li key={s} className="rounded-full bg-sage-50 px-2.5 py-1 text-xs font-medium text-sage-700">{s}</li>
        ))}
      </ul>
      <span className="mt-4 text-sm font-semibold text-ink group-hover:text-sage-700">View project →</span>
    </Link>
  );
}
