"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { heroEntrance } from "@/lib/hero";
import { FitButton, GhostButton, Ticks, type Tick } from "./ui";

/** Hero for the Media Buying and Hook OS pages, in the same visual language as the main hero. */
export default function PageHero({
  eyebrow,
  lines,
  body,
  extra,
  secondary,
  ticks,
}: {
  eyebrow: ReactNode;
  lines: { text: ReactNode; ink?: "orange" | "charcoal" }[];
  body: ReactNode;
  extra?: ReactNode;
  secondary: { href: string; label: string };
  ticks: Tick[];
}) {
  const rootRef = useRef<HTMLElement>(null);
  useEffect(() => (rootRef.current ? heroEntrance(rootRef.current) : undefined), []);

  return (
    <section ref={rootRef} id="top" data-marker className="relative pt-36 sm:pt-44 pb-28 sm:pb-36 bg-[#FCF5CD] hairline-b overflow-hidden">
      <div
        data-hero-anim
        data-hero-loop
        aria-hidden="true"
        className="absolute -right-24 sm:-right-40 top-[8%] w-52 sm:w-[28rem] lg:w-[34rem] h-[280px] sm:h-[620px] lg:h-[740px] pointer-events-none z-0"
      >
        <svg viewBox="0 0 354 487" fill="none" className="w-full h-full">
          <path
            d="M250.687 12.2982C192.69 52.7982 114.69 199.814 245.687 315.798C376.684 431.783 364.19 140.889 235.187 83.2982C153.19 46.6926 54.8365 106.798 30.1893 172.298C-59.5565 410.798 277.687 471.798 277.687 471.798"
            stroke="#FF4B00"
            strokeWidth="24"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div
        data-hero-anim
        data-hero-loop
        aria-hidden="true"
        className="hidden sm:block absolute -left-28 lg:-left-32 bottom-[-20%] w-[20rem] lg:w-[24rem] h-[800px] pointer-events-none z-0"
      >
        <svg viewBox="0 0 229 599" fill="none" className="w-full h-full">
          <path
            d="M33.502 584.112C104.502 557.112 147.911 474.964 143.002 393.612C139.502 335.612 106.002 281.612 59.0025 252.612C7.82072 221.032 -4.20053 385.572 52.5031 405.612C140.218 436.612 225.002 369.112 212.002 252.612C208.376 220.111 192.539 178.612 152.002 121.612C117.866 73.6124 42.0029 11.6124 42.0029 11.6124"
            stroke="#FF4B00"
            strokeWidth="24"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10 flex flex-col items-center text-center">
        <p data-hero-anim data-hero-fade className="font-serif italic text-xl sm:text-2xl text-[#FF4B00] leading-tight mb-5">
          {eyebrow}
        </p>
        <h1 className="font-display font-black uppercase tracking-tight sm:tracking-tighter leading-[0.88] text-[2.9rem] sm:text-7xl md:text-8xl lg:text-[length:min(8.4rem,13vh)]">
          {lines.map((l, i) => (
            <span key={i} className={`block overflow-hidden pb-1 ${i ? "mt-1 sm:mt-2" : ""}`}>
              <span data-hero-anim data-hero-line className={`block will-change-transform ${l.ink === "charcoal" ? "text-[#1F1F1F]" : "text-[#FF4B00]"}`}>
                {l.text}
              </span>
            </span>
          ))}
        </h1>
        <p data-hero-anim data-hero-fade className="mt-7 text-base sm:text-lg text-[#1F1F1F]/80 font-medium leading-relaxed max-w-2xl">
          {body}
        </p>
        {extra && (
          <div data-hero-anim data-hero-fade className="mt-8 w-full flex justify-center">
            {extra}
          </div>
        )}
        <div data-hero-anim data-hero-fade className="mt-8 flex flex-col sm:flex-row items-center gap-3">
          <FitButton where="page_hero" />
          <GhostButton href={secondary.href} down>
            {secondary.label}
          </GhostButton>
        </div>
        <div data-hero-anim data-hero-fade className="mt-10">
          <Ticks items={ticks} />
        </div>
      </div>
    </section>
  );
}
