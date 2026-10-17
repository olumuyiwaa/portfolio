"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// Anonymous page-view and outbound-click tracking. Sends to /api/track and
// does nothing when the visitor opted out ("analytics-ignore" in localStorage,
// set automatically on the private dashboard so your own visits don't count).
function ignored() {
  try {
    return localStorage.getItem("analytics-ignore") === "1";
  } catch {
    return false;
  }
}

function send(payload) {
  try {
    const body = JSON.stringify(payload);
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/track", new Blob([body], { type: "text/plain" }));
    } else {
      fetch("/api/track", { method: "POST", body, keepalive: true, headers: { "Content-Type": "text/plain" } });
    }
  } catch {}
}

export default function Tracker() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || ignored() || pathname.startsWith("/insights")) return;
    const payload = { type: "view", path: pathname };
    if (first.current) {
      // Only the landing page has a meaningful external referrer.
      payload.ref = document.referrer || "";
      const q = new URLSearchParams(window.location.search);
      payload.src = q.get("utm_source") || q.get("ref") || "";
    }
    first.current = false;
    send(payload);
  }, [pathname]);

  useEffect(() => {
    const onClick = (e) => {
      if (process.env.NODE_ENV !== "production" || ignored()) return;
      const a = e.target instanceof Element ? e.target.closest("a[href]") : null;
      if (!a) return;
      let to = "";
      if (a.protocol === "mailto:") to = "mailto";
      else if (/^https?:$/.test(a.protocol) && a.origin !== window.location.origin) {
        to = a.host.replace(/^www\./, "") + (a.pathname === "/" ? "" : a.pathname);
      }
      if (to) send({ type: "click", path: window.location.pathname, to });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
