"use client";

import { useState } from "react";
import ServiceIllustration from "@/components/ServiceIllustration";

// Shows the service's photo when the file exists, otherwise the drawn
// illustration, so the card is never blank.
export default function ServiceMedia({ src, name, alt }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return <ServiceIllustration name={name} />;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="absolute inset-0 h-full w-full object-cover"
      onError={() => setFailed(true)}
    />
  );
}
