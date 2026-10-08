import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/projects";

export default function ProjectsPage() {
  return (
    <section className="container-page py-16 md:py-20">
      <h1 className="font-display text-4xl font-extrabold text-ink">Work</h1>
      <p className="mt-3 max-w-2xl text-lg text-stone-600">
        A selection of products I have designed and built, across mobile, web and backend.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => <ProjectCard key={p.slug} project={p} />)}
      </div>
    </section>
  );
}
