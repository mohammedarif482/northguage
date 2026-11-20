"use client";

import { useEffect, useRef } from "react";
import { MB_CHANNEL_CASES, MB_RETENTION_CASE, SHOW_EMPTY_SLOTS } from "@/lib/content";
import { getGsap, prefersReducedMotion } from "@/lib/motion";
import SwipeHint from "../SwipeHint";
import { D, Fill, Hi, SectionHead } from "../ui";

/* ---------------- Media buying with retention (animated loop) ---------------- */

const steps = [
  { b: "Ads bring in the first order.", t: "Bought on margin, not on platform ROAS." },
  { b: "Retention turns it into a second and third.", t: "Flows start the day the first order lands." },
  { b: "Higher lifetime value lets us pay more to acquire,", t: "and still keep margin." },
  { b: "Repeat buyers become our best lookalikes,", t: "and are kept out of prospecting so you stop paying to win them twice." },
];

const NODES = [
  { label: "Acquire", angle: -90 },
  { label: "Retain", angle: 0 },
  { label: "LTV up", angle: 90 },
  { label: "Lookalike", angle: 180 },
];

export function RetentionLoop() {
  const ringRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring || prefersReducedMotion()) return;
    const { gsap } = getGsap();
    const len = 2 * Math.PI * 150;
    // The orange ring draws itself on scroll.
    const tw = gsap.fromTo(
      ring,
      { strokeDasharray: len, strokeDashoffset: len },
      { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: ring, start: "top 85%", end: "bottom 45%", scrub: 0.7 } }
    );
    return () => {
      tw.scrollTrigger?.kill();
      tw.kill();
    };
  }, []);

  return (
    <section id="retention" data-marker className="relative bg-[#FCF5CD] py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-6">
          <SectionHead
            eyebrow="Media buying with retention"
            title={
              <>
                Ads find the buyer. <Hi>Retention pays for them.</Hi>
              </>
            }
            size="md"
          />
          <ol className="mt-8 space-y-4">
            {steps.map((s, i) => (
              <li key={s.b} className="flex gap-4">
                <span className="font-serif italic text-2xl text-[#FF4B00] leading-none w-6 shrink-0">{i + 1}</span>
                <p className="text-base sm:text-lg leading-snug">
                  <b className="font-extrabold">{s.b}</b> <span className="text-[#1F1F1F]/75">{s.t}</span>
                </p>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-sm font-bold text-[#1F1F1F]/70">
            <Fill text={MB_RETENTION_CASE} />
          </p>
          <p className="mt-6 text-xl sm:text-2xl font-extrabold leading-snug">
            Most agencies stop at the first order. <span className="text-[#FF4B00]">We&rsquo;re paid on what happens after it.</span>
          </p>
        </div>

        <div className="lg:col-span-6">
          <svg viewBox="0 0 400 400" className="w-full max-w-[480px] mx-auto h-auto overflow-visible" role="img" aria-label="Loop: acquire, retain, lifetime value up, lookalike, back to acquire">
            <circle cx="200" cy="200" r="150" fill="none" stroke="#1F1F1F" strokeOpacity="0.12" strokeWidth="22" />
            <circle
              ref={ringRef}
              cx="200"
              cy="200"
              r="150"
              fill="none"
              stroke="#FF4B00"
              strokeWidth="22"
              strokeLinecap="round"
              transform="rotate(-90 200 200)"
            />
            <circle cx="200" cy="200" r="92" fill="#1F1F1F" />
            <text x="200" y="192" textAnchor="middle" fontWeight="800" fontSize="20" fill="#FFFDF2" style={{ fontFamily: "var(--font-sans)" }}>
              One P&amp;L
            </text>
            <text x="200" y="218" textAnchor="middle" fontWeight="600" fontSize="13" fill="#FFFDF2" fillOpacity="0.7" style={{ fontFamily: "var(--font-sans)" }}>
              buying × retention
            </text>
            {NODES.map((n) => {
              const a = (n.angle * Math.PI) / 180;
              const x = 200 + 150 * Math.cos(a);
              const y = 200 + 150 * Math.sin(a);
              return (
                <g key={n.label}>
                  <rect x={x - 52} y={y - 19} width="104" height="38" rx="19" fill="#FFFDF2" stroke="#1F1F1F" strokeWidth="2" />
                  <text x={x} y={y + 5} textAnchor="middle" fontWeight="800" fontSize="14" fill="#1F1F1F" style={{ fontFamily: "var(--font-sans)" }}>
                    {n.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Our process: weekly rhythm ---------------- */

const week = [
  { day: "Monday", card: "Margin read", copy: "Last week’s spend, kept orders and contribution margin, by campaign." },
  { day: "Tuesday", card: "Tests go live", copy: "New variants from Hook OS launch in the testing layer." },
  { day: "Wednesday", card: "Retention check", copy: "New-buyer flows, repeat orders and audience exclusions." },
  { day: "Thursday", card: "Budget moves", copy: "Scale above the margin floor, cut below it. No exceptions." },
  { day: "Friday", card: "Your update", copy: "One page to you, with next week’s tests." },
];

export function WeeklyRhythm() {
  return (
    <section id="process" data-marker className="relative bg-[#FFFDF2] py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <SectionHead
          eyebrow="Our process"
          title={
            <>
              The same week, <Hi>every week.</Hi>
            </>
          }
          className="mb-12 sm:mb-16"
        />
        <SwipeHint className="lg:hidden mb-3" />
        <ol className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-6 px-6 sm:-mx-10 sm:px-10 gap-4 pb-6 lg:grid lg:grid-cols-5 lg:overflow-visible lg:mx-0 lg:px-0">
          {week.map((d, i) => (
            <li
              key={d.day}
              className={`shrink-0 w-[70%] sm:w-[40%] lg:w-auto snap-start rounded-[24px] p-6 flex flex-col min-h-[240px] ${
                i === 4 ? "bg-[#FF4B00] text-[#FFFDF2]" : "bg-[#FCF5CD] text-[#1F1F1F]"
              }`}
            >
              <span className="font-serif italic text-xl text-current opacity-80">{d.day}</span>
              <h3 className="mt-auto font-display font-black uppercase text-2xl tracking-tight leading-[0.95]">{d.card}</h3>
              <p className="mt-3 text-sm leading-relaxed opacity-80">{d.copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------- Growth across channels ---------------- */

type Channel = { name: string; role: string; copy: string; caseLine: React.ReactNode; live: boolean; only?: "india" | "global"; big?: boolean };

export function Channels() {
  const channels: Channel[] = [
    {
      name: "Meta",
      role: "Where growth starts",
      copy: "Prospecting, creative testing and scaling on Facebook and Instagram, with Hook OS feeding new variants every week.",
      caseLine: <D v={MB_CHANNEL_CASES.meta.line} />,
      live: MB_CHANNEL_CASES.meta.live,
      big: true,
    },
    {
      name: "Google",
      role: "Capture demand",
      copy: "Search, Shopping, Performance Max and YouTube, for the people who come looking.",
      caseLine: <Fill text={MB_CHANNEL_CASES.google.line} />,
      live: MB_CHANNEL_CASES.google.live,
    },
    {
      name: "Quick commerce",
      role: "Be there in 10 minutes",
      copy: "Blinkit, Zepto and Instamart ads, sized against your D2C margin so the channels don’t cannibalise each other.",
      caseLine: <Fill text={MB_CHANNEL_CASES.quickCommerce.line} />,
      live: MB_CHANNEL_CASES.quickCommerce.live,
      only: "india",
    },
    {
      name: "TikTok",
      role: "Second social channel",
      copy: "Added once Meta creative is proven, using the same Hook OS variants.",
      caseLine: <Fill text={MB_CHANNEL_CASES.tiktok.line} />,
      live: MB_CHANNEL_CASES.tiktok.live,
      only: "global",
    },
    {
      name: "DSP",
      role: "Reach beyond the feed",
      copy: "Amazon DSP and programmatic display for retargeting and reach at scale.",
      caseLine: <Fill text={MB_CHANNEL_CASES.dsp.line} />,
      live: MB_CHANNEL_CASES.dsp.live,
    },
    {
      name: "Blended P&L",
      role: "One report",
      copy: "Every channel judged on the same number: contribution margin from kept orders.",
      caseLine: "One number across every channel.",
      live: true,
    },
  ];
  // Hide any channel card that has no case yet (once SHOW_EMPTY_SLOTS is switched off for launch).
  const shown = channels.filter((c) => c.live || SHOW_EMPTY_SLOTS);

  return (
    <section id="channels" data-marker className="relative bg-[#FCF5CD] py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <SectionHead
          eyebrow="Growth across channels"
          title={
            <>
              Meta first. <Hi>Then everywhere it pays.</Hi>
            </>
          }
          body="Most D2C brands win or lose on Meta first, so that is where we start. Every channel after it is added one at a time, under one report."
          className="mb-12 sm:mb-16"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {shown.map((c) => (
            <article
              key={c.name}
              className={`${c.only === "india" ? "r-inr" : c.only === "global" ? "r-usd" : ""} rounded-[24px] p-6 sm:p-8 flex flex-col ${
                c.big
                  ? "sm:col-span-2 lg:row-span-2 bg-[#1F1F1F] text-[#FFFDF2] min-h-[320px]"
                  : c.name === "Blended P&L"
                    ? "bg-[#FF4B00] text-[#FFFDF2]"
                    : "bg-[#FFFDF2] text-[#1F1F1F]"
              }`}
            >
              <span className={`text-[11px] font-bold uppercase tracking-[0.18em] ${c.big ? "text-[#FF4B00]" : "opacity-60"}`}>{c.role}</span>
              <h3 className={`mt-2 font-display font-black uppercase tracking-tight leading-none ${c.big ? "text-6xl sm:text-8xl" : "text-3xl sm:text-4xl"}`}>
                {c.name}
              </h3>
              <p className={`mt-4 leading-relaxed opacity-85 ${c.big ? "text-lg max-w-md" : "text-sm"}`}>{c.copy}</p>
              <p className={`mt-auto pt-5 font-bold ${c.big ? "text-base" : "text-sm"}`}>{c.caseLine}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
