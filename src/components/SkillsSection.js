import Link from "next/link";
import {
  siFlutter,
  siDart,
  siNextdotjs,
  siReact,
  siTailwindcss,
  siNodedotjs,
  siExpress,
  siNestjs,
  siPrisma,
  siMongodb,
  siPostgresql,
  siFirebase,
} from "simple-icons";
import { tools } from "@/lib/projects";

// Official brand marks (simple-icons), drawn flat in each brand's own colour.
const ICONS = {
  flutter: siFlutter,
  dart: siDart,
  nextjs: siNextdotjs,
  react: siReact,
  tailwind: siTailwindcss,
  nodejs: siNodedotjs,
  express: siExpress,
  nestjs: siNestjs,
  prisma: siPrisma,
  mongodb: siMongodb,
  postgresql: siPostgresql,
  firebase: siFirebase,
};

// "My Tools": a tile per tool with its name and a short descriptor.
export default function SkillsSection() {
  return (
    <section className="container-page py-20 md:py-28" aria-labelledby="skills-heading">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-xl">
          <h2 id="skills-heading" className="font-display text-3xl font-bold text-ink md:text-4xl">
            What I work with
          </h2>
          <p className="mt-3 text-stone-600">The tools I use to design, build and ship products.</p>
        </div>
        <Link href="/contact" className="text-sm font-semibold text-sage-700 hover:underline">
          Need one of these? Get in touch
        </Link>
      </div>

      <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-stone-200 bg-stone-200 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t) => (
          <li
            key={t.name}
            className="flex items-center gap-4 bg-paper p-5 transition-colors hover:bg-sage-50"
          >
            <span
              aria-hidden="true"
              className="grid h-12 w-12 shrink-0 place-items-center rounded-md border border-stone-200 bg-paper"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill={`#${ICONS[t.icon].hex}`}>
                <path d={ICONS[t.icon].path} />
              </svg>
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
