"use client";

import { useEffect, useState } from "react";

// Sun/moon icon button. Theme follows the system (light if unavailable); a click overrides it for the current visit only.
// The initial class on <html> is set by the inline script
// in layout.js, so this only reads it after mount to avoid a hydration mismatch.
export default function ThemeToggle({ className = "" }) {
  const [dark, setDark] = useState(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    // Follow the system setting live; the button only overrides it for this visit.
    let mq;
    const onChange = (e) => {
      document.documentElement.classList.toggle("dark", e.matches);
      setDark(e.matches);
    };
    try {
      mq = window.matchMedia("(prefers-color-scheme: dark)");
      mq.addEventListener("change", onChange);
    } catch (e) {}
    return () => {
      try {
        mq && mq.removeEventListener("change", onChange);
      } catch (e) {}
    };
  }, []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    setDark(next);
  };

  const label = dark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`grid h-9 w-9 shrink-0 place-items-center rounded-md border border-stone-200 text-stone-600 transition-colors hover:border-stone-300 hover:text-ink ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {dark ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" />
          </>
        ) : (
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
        )}
      </svg>
    </button>
  );
}
