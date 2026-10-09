import Link from "next/link";
import { tools } from "@/lib/projects";

const TINTS = {
  mobile: "bg-sage-600 text-white",
  web: "bg-ink text-white",
  backend: "bg-amber-300 text-ink",
  ops: "bg-sage-200 text-sage-900",
};

// "My Tools": a tile per tool with its name and a short descriptor.
export default function SkillsSection() {
  return (
    <section className="container-page py-16 md:py-20" aria-labelledby="skills-heading">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-xl">
          <h2 id="skills-heading" className="font-display text-2xl font-bold text-ink md:text-3xl">
            What I work with
          </h2>
          <p className="mt-3 text-stone-600">The tools I use to design, build and ship products.</p>
        </div>
        <Link href="/contact" className="text-sm font-semibold text-sage-700 hover:underline">
          Need one of these? Get in touch
        </Link>
      </div>

      <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t) => (
          <li
            key={t.name}
            className="flex items-center gap-4 rounded-lg border border-stone-200 bg-paper p-4 transition-all hover:-translate-y-0.5 hover:border-sage-400"
          >
            <span
              aria-hidden="true"
              className={`grid h-12 w-12 shrink-0 place-items-center rounded-md font-display text-base font-bold ${TINTS[t.tint]}`}
            >
              {t.mark}
            </span>
            <span className="min-w-0">
              <span className="block font-display text-base font-semibold text-ink">{t.name}</span>
              <span className="block text-sm text-stone-600">{t.note}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
