import Link from "next/link";
import ProjectCover from "@/components/ProjectCover";

export default function ProjectCard({ project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-stone-200 bg-paper transition-colors hover:border-sage-400"
    >
      <ProjectCover project={project} ratio="aspect-[16/10]" sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" />
      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm text-sage-600">{project.kind}</p>
        <h3 className="mt-1 font-display text-xl font-semibold text-ink">{project.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">{project.summary}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <li key={s} className="rounded-full bg-sage-50 px-2.5 py-1 text-xs font-medium text-sage-700">{s}</li>
          ))}
        </ul>
        <span className="mt-5 text-sm font-semibold text-ink underline decoration-stone-300 underline-offset-4 group-hover:decoration-sage-500">
          View case study
        </span>
      </div>
    </Link>
  );
}
