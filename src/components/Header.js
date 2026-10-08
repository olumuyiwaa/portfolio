"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SITE_NAME } from "@/lib/siteConfig";

const NAV_ITEMS = [
  { label: "Work", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  const isActive = (href) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-200 ${
        scrolled ? "border-stone-200 bg-paper/85 backdrop-blur-xl" : "border-transparent bg-paper/80 backdrop-blur-md"
      }`}
    >
      <div className="container-page flex items-center justify-between gap-6 py-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[linear-gradient(135deg,#3f6b52,#6e9c82)] text-paper font-display font-semibold shadow-sm">
            {SITE_NAME[0]}
          </span>
          <span className="font-display text-lg font-semibold text-ink">{SITE_NAME}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-sm px-3 py-2 text-sm font-medium transition-colors ${
                isActive(item.href) ? "text-sage-700 bg-sage-50" : "text-stone-600 hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block shrink-0">
          <Link
            href="/contact"
            className="rounded-md bg-ink px-4 py-2 text-sm font-semibold text-paper hover:bg-sage-800 transition-colors"
          >
            Hire me
          </Link>
        </div>

        <button
          className="md:hidden grid h-9 w-9 place-items-center rounded-sm border border-stone-200"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="relative block h-3 w-5">
            <span className={`absolute left-0 top-0 h-[2px] w-full bg-ink transition-transform ${menuOpen ? "translate-y-[5px] rotate-45" : ""}`} />
            <span className={`absolute left-0 bottom-0 h-[2px] w-full bg-ink transition-transform ${menuOpen ? "-translate-y-[5px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-paper">
          <div className="container-page flex flex-col py-3">
            {NAV_ITEMS.map((item) => (
              <Link key={item.href} href={item.href} className="py-2.5 text-sm font-medium text-stone-700">
                {item.label}
              </Link>
            ))}
            <Link href="/contact" className="mt-2 rounded-md bg-ink px-4 py-2.5 text-center text-sm font-semibold text-paper">
              Hire me
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
