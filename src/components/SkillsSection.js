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

// Near-black brand marks follow the text colour so they stay visible in dark mode.
const DARK_MARKS = new Set(["nextjs", "express", "prisma"]);

// Tools grouped by the part of a product they build. Flutter is the main craft.
const GROUPS = [
  { title: "Mobile", blurb: "iOS and Android apps from one codebase.", tools: ["Flutter", "Dart"] },
  { title: "Web", blurb: "Dashboards, portals and marketing sites.", tools: ["Next.js", "React", "Tailwind CSS"] },
  { title: "Backend", blurb: "APIs, auth, payments and integrations.", tools: ["Node.js", "Express", "NestJS", "Prisma"] },
  { title: "Data and services", blurb: "Where the product keeps and sends its data.", tools: ["MongoDB", "PostgreSQL", "Firebase"] },
];

function Tile({ t }) {
  const dark = DARK_MARKS.has(t.icon);
  return (
    <li className="group flex flex-col items-start gap-3 rounded-lg border border-stone-200 bg-paper p-4 sm:flex-row sm:items-center sm:gap-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-stone-300 hover:bg-sage-50 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <span
        aria-hidden="true"
        className="grid h-12 w-12 shrink-0 place-items-center rounded-md border border-stone-200 bg-paper transition-transform duration-200 group-hover:scale-105 motion-reduce:transition-none"
      >
        <svg viewBox="0 0 24 24" className={`h-6 w-6 ${dark ? "text-ink" : ""}`} fill={dark ? "currentColor" : `#${ICONS[t.icon].hex}`}>
          <path d={ICONS[t.icon].path} />
        </svg>
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-2 font-display text-base font-semibold text-ink">
          {t.name}
          {t.name === "Flutter" && (
            <span className="rounded-full bg-sage-50 px-2 py-0.5 text-[11px] font-semibold text-accent ring-1 ring-stone-200">Main craft</span>
          )}
        </span>
        <span className="block text-sm text-stone-600">{t.note}</span>
      </span>
    </li>
  );
}

// "What I work with": tools grouped by the layer of the product they build.
export default function SkillsSection() {
  const byName = Object.fromEntries(tools.map((t) => [t.name, t]));
  return (
    <section className="container-page py-20 md:py-28" aria-labelledby="skills-heading">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-xl">
          <h2 id="skills-heading" className="font-display text-3xl font-bold text-ink md:text-4xl">
            What I work with
          </h2>
          <p className="mt-3 text-stone-600">The tools I use to design, build and ship products.</p>
        </div>
        <Link href="/contact" className="text-sm font-semibold text-accent hover:underline">
          Need one of these? Get in touch →
        </Link>
      </div>

      <div className="mt-12 divide-y divide-stone-200 border-y border-stone-200">
        {GROUPS.map((g) => (
          <div key={g.title} className="grid gap-5 py-8 lg:grid-cols-[16rem_1fr] lg:gap-10">
            <div>
              <h3 className="font-display text-lg font-semibold text-ink">{g.title}</h3>
              <p className="mt-1 text-sm text-stone-500">{g.blurb}</p>
            </div>
            <ul className="grid grid-cols-2 gap-3 xl:grid-cols-3">
              {g.tools.map((n) => byName[n] && <Tile key={n} t={byName[n]} />)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
