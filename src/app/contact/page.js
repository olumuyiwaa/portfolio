import ContactForm from "@/components/ContactForm";
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/siteConfig";

export default function ContactPage() {
  return (
    <section className="container-page grid gap-12 py-16 md:grid-cols-2 md:py-20">
      <div>
        <h1 className="font-display text-4xl font-extrabold text-ink">Let's talk</h1>
        <p className="mt-4 text-lg text-stone-600">
          Tell me what you're building and I'll reply with next steps.
        </p>
        <ul className="mt-8 space-y-2 text-sm text-stone-700">
          <li><a className="font-semibold hover:text-sage-700" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></li>
          <li><a className="hover:text-sage-700" href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub ↗</a></li>
          {LINKEDIN_URL && <li><a className="hover:text-sage-700" href={LINKEDIN_URL} target="_blank" rel="noreferrer">LinkedIn ↗</a></li>}
        </ul>
      </div>
      <ContactForm />
    </section>
  );
}
