import { ICON_PATHS } from "@/components/ServiceIcon";
import { skills, projects, projectCount } from "@/lib/projects";

// "What I work with": each tool shows how many of the portfolio projects
// use it (computed from the project data), with a bar scaled to the total.
export default function SkillsSection() {
  const total = projects.length;

  return (
    <section className="container-page py-16 md:py-20" aria-labelledby="skills-heading">
      <div className="max-w-2xl">
        <h2 id="skills-heading" className="font-display text-2xl font-bold text-ink md:text-3xl">
          What I work with
        </h2>
        <p className="mt-3 text-stone-600">
          The tools I reach for, and how many of my {total} projects each one appears in.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((g) => (
          <article key={g.group} className="flex flex-col rounded-lg border border-stone-200 bg-paper p-5">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-sage-50 text-sage-700">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {ICON_PATHS[g.icon] || ICON_PATHS.web}
              </svg>
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold text-ink">{g.group}</h3>
            <p className="mt-1 text-sm leading-relaxed text-stone-600">{g.blurb}</p>

            <ul className="mt-5 space-y-3 border-t border-stone-200 pt-4">
              {g.items.map((item) => {
                const n = projectCount(item);
                return (
                  <li key={item}>
                    <div className="flex items-baseline justify-between gap-3 text-sm">
                      <span className="font-medium text-ink">{item}</span>
                      {n > 0 && (
                        <span className="text-xs text-stone-500">
                          {n} {n === 1 ? "project" : "projects"}
                        </span>
                      )}
                    </div>
                    {n > 0 && (
                      <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-sage-100" aria-hidden="true">
                        <div className="h-full rounded-full bg-sage-500" style={{ width: `${(n / total) * 100}%` }} />
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
