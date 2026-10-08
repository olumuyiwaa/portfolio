"use client";

import { useMemo, useState } from "react";
import ProjectCard from "@/components/ProjectCard";

const ORDER = ["Full-stack", "Web", "Backend", "Mobile"];

export default function ProjectGrid({ projects }) {
  const categories = useMemo(
    () => ORDER.filter((c) => projects.some((p) => p.category === c)),
    [projects]
  );
  const [active, setActive] = useState("All");
  const visible = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      <div role="group" aria-label="Filter projects by type" className="flex flex-wrap gap-2">
        {["All", ...categories].map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={active === c}
            onClick={() => setActive(c)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-500 ${
              active === c
                ? "border-ink bg-ink text-paper"
                : "border-stone-300 text-stone-600 hover:border-stone-400 hover:text-ink"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => <ProjectCard key={p.slug} project={p} />)}
      </div>
    </>
  );
}
