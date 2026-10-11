import Link from "next/link";
import { SITE_NAME, CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/siteConfig";

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-50">
      <div className="container-page flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href="/" className="font-display text-base font-semibold text-ink">{SITE_NAME}</Link>
          <p className="mt-1 text-sm text-stone-500">Software engineer in Lagos, Nigeria</p>
        </div>
        <ul className="flex flex-wrap gap-5 text-sm text-stone-500">
          <li><Link href="/#services" className="hover:text-accent">Services</Link></li>
          <li><Link href="/projects" className="hover:text-accent">Work</Link></li>
          <li><Link href="/about" className="hover:text-accent">About</Link></li>
          <li><a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-accent">Email</a></li>
          <li><a href={GITHUB_URL} className="hover:text-accent" target="_blank" rel="noreferrer">GitHub</a></li>
          {LINKEDIN_URL && (
            <li><a href={LINKEDIN_URL} className="hover:text-accent" target="_blank" rel="noreferrer">LinkedIn</a></li>
          )}
        </ul>
      </div>
      <div className="container-page border-t border-stone-200 py-4 text-xs text-stone-500">
        © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
      </div>
    </footer>
  );
}
