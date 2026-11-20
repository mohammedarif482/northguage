"use client";

import { useEffect, useRef } from "react";
import { getGsap, prefersReducedMotion } from "@/lib/motion";

interface SpinBadgeProps {
  href: string;
  /** Text around the ring; tune length to ~36 characters to wrap once. */
  text: string;
  ariaLabel: string;
  className?: string;
}

/** Circular rotating sticker with the hook in the middle. Speeds up on hover. */
export default function SpinBadge({ href, text, ariaLabel, className = "" }: SpinBadgeProps) {
  const ringRef = useRef<SVGSVGElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    const link = linkRef.current;
    if (!ring || !link || prefersReducedMotion()) return;
    const { gsap } = getGsap();
    const spin = gsap.to(ring, { rotation: 360, duration: 14, ease: "none", repeat: -1, transformOrigin: "50% 50%" });
    const fast = () => gsap.to(spin, { timeScale: 4, duration: 0.4 });
    const slow = () => gsap.to(spin, { timeScale: 1, duration: 0.8 });
    link.addEventListener("mouseenter", fast);
    link.addEventListener("mouseleave", slow);
    return () => {
      link.removeEventListener("mouseenter", fast);
      link.removeEventListener("mouseleave", slow);
      spin.kill();
    };
  }, []);

  const label = text.toUpperCase();

  return (
    <a
      ref={linkRef}
      href={href}
      aria-label={ariaLabel}
      className={`group relative block w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-[#1F1F1F] text-[#FFFDF2] shadow-[0_14px_30px_-10px_rgba(31,31,31,0.45)] transition-transform hover:scale-105 ${className}`}
    >
      <svg ref={ringRef} viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
        <defs>
          <path id="spin-badge-circle" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
        </defs>
        <text fontSize="17" fontWeight="800" letterSpacing="2.6" fill="currentColor" style={{ fontFamily: "var(--font-sans)" }}>
          <textPath href="#spin-badge-circle">{label}</textPath>
        </text>
      </svg>
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-7 aspect-[203.66/357.03] bg-[#FF4B00] transition-transform group-hover:rotate-12"
        style={{
          maskImage: "url(/northgauge-hook.svg)",
          WebkitMaskImage: "url(/northgauge-hook.svg)",
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        }}
      />
    </a>
  );
}
