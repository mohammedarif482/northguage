"use client";

import { useEffect, useId, useRef } from "react";
import { getGsap, prefersReducedMotion } from "@/lib/motion";

interface FishingLineProps {
  /** Phrases repeated along the line. */
  words?: string[];
  /** Band colour and text colour. */
  band?: string;
  ink?: string;
  /** Scroll direction of the text. */
  reverse?: boolean;
  /** Mirror the wave shape. */
  flip?: boolean;
  /** How much of the ribbon sits above the seam it's placed on (0 = all below, 0.5 = centred). */
  anchor?: number;
  className?: string;
}

/**
 * The brand's "line": a thick wavy ribbon with copy running along it (SVG textPath).
 * Scroll scrubs the text along the path and gently draws the wave.
 */
export default function FishingLine({
  words = ["Hook", "Reel", "Keep", "A hook for curious brands"],
  band = "#FF4B00",
  ink = "#FFFDF2",
  reverse = false,
  flip = false,
  anchor = 0.3,
  className = "",
}: FishingLineProps) {
  const id = useId().replace(/:/g, "");
  const rootRef = useRef<HTMLDivElement>(null);
  const textPathRef = useRef<SVGTextPathElement>(null);
  const bandRef = useRef<SVGPathElement>(null);

  const phrase = words.map((w) => `${w.toUpperCase()}  ✦  `).join("");
  const text = phrase.repeat(8);

  useEffect(() => {
    const root = rootRef.current;
    const tp = textPathRef.current;
    const bandPath = bandRef.current;
    if (!root || !tp || !bandPath || prefersReducedMotion()) return;
    const { gsap } = getGsap();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        tp,
        { attr: { startOffset: reverse ? "-60%" : "0%" } },
        {
          attr: { startOffset: reverse ? "0%" : "-60%" },
          ease: "none",
          scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 0.6 },
        }
      );

      // Band and text rise in together, so copy never floats without its line.
      gsap.from(root.querySelector("svg"), {
        yPercent: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 92%" },
      });
    }, root);

    return () => ctx.revert();
  }, [reverse]);

  const d = flip
    ? "M-80 70 C 180 210, 380 10, 640 110 S 1060 220, 1280 90 S 1560 40, 1560 40"
    : "M-80 150 C 180 10, 380 210, 640 110 S 1060 0, 1280 130 S 1560 180, 1560 180";

  return (
    // Zero-height anchor: the ribbon overlays the seam between two sections and takes no layout space.
    <div
      ref={rootRef}
      aria-hidden="true"
      className={`relative z-20 w-full h-0 pointer-events-none select-none ${className}`}
    >
      <div className="absolute inset-x-0 top-0 overflow-hidden" style={{ transform: `translateY(-${anchor * 100}%)` }}>
      <svg viewBox="0 -30 1440 280" className="w-full h-[140px] sm:h-[200px] lg:h-[240px]" preserveAspectRatio="xMidYMid slice">
        <defs>
          <path id={`line-${id}`} d={d} />
        </defs>
        <path
          ref={bandRef}
          d={d}
          fill="none"
          stroke={band}
          strokeWidth={58}
          strokeLinecap="round"
        />
        <text
          fill={ink}
          fontSize={22}
          fontWeight={800}
          letterSpacing="0.14em"
          dominantBaseline="central"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <textPath ref={textPathRef} href={`#line-${id}`} startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>
      </div>
    </div>
  );
}
