import ImageSlot from "@/components/ImageSlot";

// Stand-in artwork for projects that have no screenshot yet: a tinted
// panel with the project's initials and kind. Once `project.image` is set
// the real image is shown instead.
const TINTS = [
  "bg-sage-700 text-white",
  "bg-ink text-amber-300",
  "bg-amber-100 text-ink",
  "bg-sage-200 text-sage-900",
];

const initials = (name) =>
  name
    .replace(/&/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

const tintFor = (slug) => TINTS[[...slug].reduce((n, c) => n + c.charCodeAt(0), 0) % TINTS.length];

export default function ProjectCover({ project, ratio, className = "", sizes, priority = false }) {
  return (
    <ImageSlot
      src={project.image}
      alt={`${project.name} preview`}
      ratio={ratio}
      className={className}
      sizes={sizes}
      priority={priority}
      fallback={
        <div className={`absolute inset-0 flex flex-col justify-between p-6 ${tintFor(project.slug)}`}>
          <span className="text-xs font-semibold uppercase tracking-widest opacity-80">{project.category}</span>
          <span className="font-display text-6xl font-extrabold leading-none opacity-90 md:text-7xl">
            {initials(project.name)}
          </span>
        </div>
      }
    />
  );
}
