import Link from "next/link";
import ImageSlot from "@/components/ImageSlot";
import { skills } from "@/lib/projects";
import { SITE_NAME, IMAGES } from "@/lib/siteConfig";

export default function AboutPage() {
  return (
    <section className="container-page max-w-3xl py-16 md:py-20">
      <div className="grid items-center gap-8 sm:grid-cols-[1fr_200px]">
        <h1 className="font-display text-4xl font-extrabold text-ink">About</h1>
        <ImageSlot
          src={IMAGES.about}
          alt={`Portrait of ${SITE_NAME}`}
          ratio="aspect-square"
          className="rounded-xl sm:order-last"
          sizes="200px"
        />
      </div>
      <div className="mt-6 space-y-4 text-lg leading-relaxed text-stone-600">
        <p>
          I'm a full-stack developer and technical contractor based in Lagos,
          Nigeria. I build complete applications from scratch: the mobile app,
          the web dashboard and the backend behind them.
        </p>
        <p>
          My day-to-day stack is Flutter for mobile, Next.js for web and
          Node.js (Express and NestJS) for APIs. I like consistent
          architecture, clear data models and code the next developer can pick
          up without a tour.
        </p>
      </div>

      <h2 className="mt-12 font-display text-2xl font-bold text-ink">Skills</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {skills.map((g) => (
          <div key={g.group} className="rounded-lg border border-stone-200 p-5">
            <h3 className="text-sm font-semibold text-sage-700">{g.group}</h3>
            <p className="mt-2 text-sm text-stone-700">{g.items.join(" · ")}</p>
          </div>
        ))}
      </div>

      <Link href="/contact" className="mt-12 inline-block rounded-md bg-ink px-5 py-3 text-sm font-semibold text-paper hover:bg-sage-800 transition-colors">
        Work with me
      </Link>
    </section>
  );
}
