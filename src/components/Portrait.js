"use client";

import { useState } from "react";

// Profile photo. A local file in public/images wins; otherwise it falls back to
// the GitHub profile picture, loaded by the visitor's browser so it always
// matches the current GitHub photo. If it can't load, nothing is rendered and
// the About text simply keeps the left column.
export default function Portrait({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return null;
  return (
    <div className={`relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-sage-100 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
