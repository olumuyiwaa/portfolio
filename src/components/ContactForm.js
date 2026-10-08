"use client";

import { useState } from "react";
import { CONTACT_EMAIL } from "@/lib/siteConfig";

const PROJECT_TYPES = ["Mobile app", "Web app or dashboard", "Backend or API", "Full product", "Not sure yet"];

// No backend needed: submitting opens the visitor's mail app with the
// message pre-filled. Swap for an API call or a form service later.
export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", type: "Not sure yet", message: "" });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project enquiry from ${form.name}`);
    const body = encodeURIComponent(`Project type: ${form.type}\n\n${form.message}\n\n${form.name}\n${form.email}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  const field = "mt-1 w-full rounded-md border border-stone-200 bg-paper px-3 py-2.5 text-sm outline-none focus:border-sage-500";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="block text-sm font-medium text-ink">
        Name
        <input required className={field} value={form.name} onChange={set("name")} />
      </label>
      <label className="block text-sm font-medium text-ink">
        Email
        <input required type="email" className={field} value={form.email} onChange={set("email")} />
      </label>
      <label className="block text-sm font-medium text-ink">
        Project type
        <select className={field} value={form.type} onChange={set("type")}>
          {PROJECT_TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
      </label>
      <label className="block text-sm font-medium text-ink">
        What are you building?
        <textarea required rows={5} className={field} value={form.message} onChange={set("message")} />
      </label>
      <button className="rounded-md bg-ink px-5 py-2.5 text-sm font-semibold text-paper hover:bg-sage-800 transition-colors">
        Send message
      </button>
    </form>
  );
}
