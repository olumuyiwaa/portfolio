"use client";

import { useEffect, useRef, useState } from "react";
import PhoneMockup from "@/components/PhoneMockup";
import TabletMockup from "@/components/TabletMockup";

// Hero artwork: the web dashboard on a tablet, with the courier app on a phone
// in front of it. The pair is laid out at a fixed design size and scaled to fit
// its column; on narrow columns a compact stacked layout is used.
const W = 850;
const H = 620;
const MIN_SCALE = 0.66;
// Compact layout (small screens): tablet stacked above the phone, no overlap.
const CW = 520;
const CH = 1060;

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

  const wide = width !== null && width >= W * MIN_SCALE;
  const L = wide ? { w: W, h: H } : { w: CW, h: CH };
  const scale = width === null ? null : Math.min(1, width / L.w);
  const onBeat = (name) => setBeat({ name, n: Date.now() });

  return (
    <div ref={ref} className="w-full">
      {width === null ? (
        <div className="h-[560px]" />
      ) : (
        <div className="mx-auto" style={{ width: L.w * scale, height: L.h * scale }}>
          <div className="relative" style={{ width: L.w, height: L.h, transform: `scale(${scale})`, transformOrigin: "top left" }}>
            {wide ? (
              <>
                <div className="absolute left-0 top-[70px]" style={{ transform: "scale(1.3)", transformOrigin: "top left" }}>
                  <TabletMockup beat={beat} />
                </div>
                <div className="absolute left-[610px] top-[96px]" style={{ transform: "scale(0.8)", transformOrigin: "top left" }}>
                  <PhoneMockup fixed onBeat={onBeat} />
                </div>
                <span className="row-in absolute left-[12px] top-[20px] rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-night ring-1 ring-stone-300" style={{ animationDelay: "1.2s" }}>
                  Next.js
                </span>
                <span className="row-in absolute left-[490px] top-[570px] rounded-full bg-amber-300 px-3.5 py-1.5 text-sm font-semibold text-night" style={{ animationDelay: "1.4s" }}>
                  Flutter
                </span>
              </>
            ) : (
              <>
                {/* Compact stack for small screens: tablet on top, phone below it. */}
                <div className="absolute left-[10px] top-0">
                  <TabletMockup beat={beat} />
                </div>
                <div className="absolute left-[110px] top-[410px]">
                  <PhoneMockup fixed onBeat={onBeat} />
                </div>
                <span className="row-in absolute left-[10px] top-[425px] rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-night ring-1 ring-stone-300" style={{ animationDelay: "1.2s" }}>
                  Next.js
                </span>
                <span className="row-in absolute left-[415px] top-[425px] rounded-full bg-amber-300 px-3.5 py-1.5 text-sm font-semibold text-night" style={{ animationDelay: "1.4s" }}>
                  Flutter
                </span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
