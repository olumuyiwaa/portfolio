"use client";

import { useEffect, useState } from "react";

// Keeps your own visits out of the numbers by flagging this browser.
export default function IgnoreSelf() {
  const [ignored, setIgnored] = useState(true);

  useEffect(() => {
    try {
      if (localStorage.getItem("analytics-ignore") === null) localStorage.setItem("analytics-ignore", "1");
      setIgnored(localStorage.getItem("analytics-ignore") === "1");
    } catch {}
  }, []);

  const toggle = () => {
    const next = !ignored;
    try {
      localStorage.setItem("analytics-ignore", next ? "1" : "0");
    } catch {}
    setIgnored(next);
  };

  return (
    <p className="text-xs text-stone-500">
      {ignored ? "Your visits from this browser are not counted." : "Your visits from this browser are being counted."}{" "}
      <button type="button" onClick={toggle} className="font-semibold text-accent hover:underline">
        {ignored ? "Count them" : "Stop counting"}
      </button>
    </p>
  );
}
