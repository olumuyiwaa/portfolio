"use client";

import { useState } from "react";
import { CONTACT_EMAIL } from "@/lib/siteConfig";

const PROJECT_TYPES = ["Mobile app", "Web app or dashboard", "Backend or API", "Full product", "Not sure yet"];

// Posts to /api/contact. If email sending is not configured or fails, it
// falls back to opening the visitor's mail app with the message pre-filled.
export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", type: "Not sure yet", message: "", website: "" });
  // idle | sending | sent | fallback | error
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const openMailApp = () => {
    const subject = encodeURIComponent(`Project enquiry from ${form.name}`);
    const body = encodeURIComponent(`Project type: ${form.type}\n\n${form.message}\n\n${form.name}\n${form.email}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", type: "Not sure yet", message: "", website: "" });
        return;
      }
      const data = await res.json().catch(() => ({}));
      if (res.status === 400 || res.status === 429) {
        setError(data.error || "Something went wrong.");
        setStatus("error");
        return;
      }
    } catch {
      // Network error: use the fallback below.
    }
    setStatus("fallback");
    openMailApp();
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const field = "mt-1.5 w-full rounded-md border border-stone-300 bg-white px-3.5 py-3 text-sm placeholder:text-stone-400 outline-none focus:border-sage-500 focus-visible:outline-none focus:ring-2 focus:ring-sage-200";

  if (status === "sent") {
    return (
      <div role="status" className="rounded-lg bg-sage-50 p-6">
        <h2 className="font-display text-xl font-bold text-ink">Message sent</h2>
        <p className="mt-2 text-stone-600">Thanks for reaching out. I will reply with next steps soon.</p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-4 text-sm font-semibold text-sage-700 underline underline-offset-2">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-ink">
          Name
          <input required name="name" autoComplete="name" placeholder="Your name" className={field} value={form.name} onChange={set("name")} />
        </label>
        <label className="block text-sm font-medium text-ink">
          Email
          <input required type="email" name="email" autoComplete="email" placeholder="you@company.com" className={field} value={form.email} onChange={set("email")} />
        </label>
      </div>
      <fieldset>
        <legend className="text-sm font-medium text-ink">Project type</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {PROJECT_TYPES.map((t) => (
            <label key={t} className="cursor-pointer">
              <input
                type="radio"
                name="type"
                value={t}
                checked={form.type === t}
                onChange={set("type")}
                className="peer sr-only"
              />
              <span className="inline-block rounded-full border border-stone-300 px-3.5 py-1.5 text-sm font-medium text-stone-600 transition-colors hover:border-stone-400 peer-checked:border-ink peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-sage-500">
                {t}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <label className="block text-sm font-medium text-ink">
        What are you building?
        <textarea
          required
          minLength={10}
          maxLength={5000}
          name="message"
          rows={6}
          placeholder="What it does, who it is for, and any timeline or budget in mind."
          className={field}
          value={form.message}
          onChange={set("message")}
        />
        <span className="mt-1 block text-right text-xs text-stone-500">{form.message.length} / 5000</span>
      </label>

      {/* Honeypot for bots; hidden from people and assistive tech. */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" name="website" value={form.website} onChange={set("website")} />
        </label>
      </div>

      <button
        disabled={status === "sending"}
        className="w-full rounded-md bg-ink px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-sage-800 disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "Sending…" : "Send message →"}
      </button>

      {status === "error" && (
        <p role="alert" className="text-sm text-red-700">{error}</p>
      )}
      {status === "fallback" && (
        <p role="status" className="rounded-md bg-sage-50 p-4 text-sm leading-relaxed text-stone-700">
          I could not send this directly, so your email app should open with the message ready to send. Nothing happened?{" "}
          <button type="button" onClick={copyEmail} className="font-semibold text-sage-700 underline underline-offset-2">
            {copied ? "Address copied" : "Copy my email address"}
          </button>{" "}
          and write to me directly.
        </p>
      )}
    </form>
  );
}
