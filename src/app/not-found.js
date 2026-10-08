import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="container-page py-24 text-center">
      <p className="text-sm font-semibold text-sage-700">404</p>
      <h1 className="mt-2 font-display text-4xl font-extrabold text-ink">That page does not exist</h1>
      <p className="mx-auto mt-4 max-w-md text-lg text-stone-600">
        It may have moved, or the link may be mistyped. Here are some places to start.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="rounded-md bg-ink px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-sage-800">
          Home
        </Link>
        <Link href="/projects" className="rounded-md border border-stone-300 px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-stone-100">
          See my work
        </Link>
      </div>
    </section>
  );
}
