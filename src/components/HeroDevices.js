"use client";

import { useEffect, useRef, useState } from "react";
import PhoneMockup from "@/components/PhoneMockup";
import TabletMockup from "@/components/TabletMockup";

// Hero artwork: the web dashboard on a tablet, with the courier app on a phone
// in front of it. The pair is laid out at a fixed design size and scaled to fit
// its column; when the column is too narrow for the pair to stay readable, only
// the phone is shown at full size.
const W = 780;
const H = 640;
const MIN_SCALE = 0.64;

export default function HeroDevices() {
  const ref = useRef(null);
  const [width, setWidth] = useState(null);
  const [beat, setBeat] = useState(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    setWidth(el.getBoundingClientRect().width);
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const scale = width === null ? null : Math.min(1, width / W);
  const duo = scale !== null && scale >= MIN_SCALE;
  const onBeat = (name) => setBeat({ name, n: Date.now() });

  return (
    <div ref={ref} className="w-full">
      {width === null ? (
        <div className="h-[560px]" />
      ) : duo ? (
        <div className="mx-auto" style={{ width: W * scale, height: H * scale }}>
          <div className="relative" style={{ width: W, height: H, transform: `scale(${scale})`, transformOrigin: "top left" }}>
            <div className="absolute left-0 top-[118px]">
              <TabletMockup beat={beat} />
            </div>
            <div className="absolute left-[470px] top-[8px]">
              <PhoneMockup fixed onBeat={onBeat} />
            </div>
            <span className="row-in absolute left-[12px] top-[58px] rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-night ring-1 ring-stone-300" style={{ animationDelay: "1.2s" }}>
              Next.js
            </span>
            <span className="row-in absolute left-[392px] top-[560px] rounded-full bg-amber-300 px-3.5 py-1.5 text-sm font-semibold text-night" style={{ animationDelay: "1.4s" }}>
              Flutter
            </span>
          </div>
        </div>
      ) : (
        <PhoneMockup />
      )}
    </div>
  );
}
