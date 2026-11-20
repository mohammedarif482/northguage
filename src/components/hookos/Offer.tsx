"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Check, Minus } from "lucide-react";
import { CREATIVE_COUNT, HOOK_OS_WORK } from "@/lib/content";
import { getGsap, prefersReducedMotion } from "@/lib/motion";
import Media from "../Media";
import { Fill, FitButton, Hi, R, SectionHead } from "../ui";

/* ---------------- What ships every month ---------------- */

const plans: {
  name: string;
  featured?: boolean;
  tag: string;
  count: string;
  included: ReactNode[];
  excluded: string[];
}[] = [
  {
    name: "Hook OS",
    tag: "Works alongside your media buyer",
    count: CREATIVE_COUNT.hookOs,
    included: [
      "Static and edited ad variants",
      "UGC and creator video ads",
      <>
        Reels<span className="r-usd"> and TikToks</span> that double as ad tests
      </>,
      "Creative strategist and weekly scorecard",
    ],
    excluded: ["Media buying", "Retention flows and checkout testing"],
  },
  {
    name: "Hook OS + full engagement",
    featured: true,
    tag: "Creative, buying and retention on one P&L",
    count: CREATIVE_COUNT.full,
    included: [
      "Everything in Hook OS",
      <>
        Media buying on Meta, Google, <R india="quick commerce" global="TikTok" /> and DSP
      </>,
      <R key="flows" india="Email and WhatsApp flows" global="Email, SMS and WhatsApp flows" />,
      "Landing page and checkout testing",
      "Named Growth Lead and a monthly P&L report",
      "Shoot days for bigger engagements",
    ],
    excluded: [],
  },
];

export function WhatShips() {
  return (
    <section id="ships" data-marker className="relative bg-[#FFFDF2] py-24 sm:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <SectionHead
          eyebrow="What ships every month"
          title={
            <>
              Volume you can <Hi>hold us to.</Hi>
            </>
          }
          body="Fewer than 8 to 12 new variants a month throttles any account spending serious money. So the count is written into your contract."
          className="mb-12 sm:mb-16"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-start">
          {plans.map((p) => (
            <article
              key={p.name}
              className={`relative rounded-[28px] p-7 sm:p-10 ${
                p.featured ? "bg-[#1F1F1F] text-[#FFFDF2] shadow-[0_30px_70px_-30px_rgba(31,31,31,0.6)] md:-mt-4" : "bg-[#FCF5CD] text-[#1F1F1F]"
              }`}
            >
              {p.featured && <span className="ng-sticker absolute -top-4 right-6 rotate-3 bg-[#FF4B00] text-[#FFFDF2]">Most brands start here</span>}
              <span className={`text-[11px] font-bold uppercase tracking-[0.18em] ${p.featured ? "text-[#FF4B00]" : "text-[#1F1F1F]/60"}`}>{p.tag}</span>
              <h3 className="mt-2 font-display font-black uppercase text-4xl sm:text-5xl tracking-tight leading-[0.92]">{p.name}</h3>
              <div
                className={`mt-6 inline-flex items-center gap-2 rounded-xl border-2 border-dashed px-4 py-2.5 -rotate-1 font-extrabold text-sm ${
                  p.featured ? "border-[#FF4B00] text-[#FFFDF2]" : "border-[#1F1F1F]/40"
                }`}
              >
                Creative count: <Fill text={p.count} /> a month, in writing
              </div>
              <ul className="mt-7 space-y-3">
                {p.included.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm sm:text-base font-semibold leading-snug">
                    <Check className="w-4 h-4 mt-0.5 text-[#FF4B00] shrink-0" strokeWidth={3} />
                    <span>{item}</span>
                  </li>
                ))}
                {p.excluded.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm sm:text-base font-medium leading-snug opacity-55">
                    <Minus className="w-4 h-4 mt-0.5 shrink-0" strokeWidth={3} />
                    <span>
                      <span className="sr-only">Not included: </span>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <FitButton where="what_ships" />
        </div>
      </div>
    </section>
  );
}

/* ---------------- The work (creative grid) ---------------- */

export function WorkGrid() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.from("[data-work]", {
        y: 80,
        rotation: (i) => (i % 2 ? 6 : -6),
        opacity: 0,
        duration: 0.9,
        ease: "back.out(1.4)",
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: "top 80%" },
      });
    }, el);
    return () => ctx.revert();
  }, []);
  const tones = ["orange", "cream", "charcoal", "sun", "lilac", "cream"] as const;
  return (
    <section id="work" data-marker className="relative bg-[#FCF5CD] py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <SectionHead
          eyebrow="The work"
          title={
            <>
              Made by Hook OS. <Hi>Bought with real money.</Hi>
            </>
          }
          body="Every ad here ran with real budget behind it. Each one started as a hypothesis and a number to beat."
          className="mb-12 sm:mb-16"
        />
        <div ref={ref} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 items-end">
          {HOOK_OS_WORK.map((w, i) => (
            <div key={i} data-work className="rounded-2xl shadow-[0_18px_40px_-20px_rgba(31,31,31,0.45)]">
              <Media item={w} tone={tones[i]} sizes="(min-width: 1024px) 16vw, 45vw" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Built for your category ---------------- */

export function Categories() {
  const cats = [
    {
      name: "Beauty and personal care",
      tag: "Lead category",
      line: "Creative burns fastest here, so volume wins.",
      formats: ["Before and after video", "Ingredient education", "Dermatologist and expert formats", "UGC as the native format"],
      bg: "bg-[#FF4B00] text-[#FFFDF2]",
      chip: "bg-[#FFFDF2]/15",
    },
    {
      name: "Health and nutrition",
      tag: "Biggest budgets",
      line: "Large spends make the second order matter.",
      formats: [
        "Testimonial video",
        "UGC with science framing",
        "Routine and results content",
        <>
          Replenishment flows on <R india="WhatsApp" global="SMS and email" />
        </>,
      ],
      bg: "bg-[#FFC83D] text-[#1F1F1F]",
      chip: "bg-[#1F1F1F]/10",
    },
    {
      name: "Fashion",
      tag: "Largest by sales",
      line: "Catalogue drives revenue; returns decide profit.",
      formats: ["Catalogue ad creative and overlays", "Fit and fabric explainers", "Styling Reels", "Reporting net of returns"],
      bg: "bg-[#B9A6FF] text-[#1F1F1F]",
      chip: "bg-[#1F1F1F]/10",
    },
  ];
  return (
    <section id="categories" data-marker className="relative bg-[#FFFDF2] py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <SectionHead
          eyebrow="Built for your category"
          title={
            <>
              Different categories <Hi>buy differently.</Hi>
            </>
          }
          body="A skincare brand and an apparel brand should never get the same creative plan. Here is where we start for each."
          className="mb-12 sm:mb-16"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cats.map((c) => (
            <article key={c.name} className={`rounded-[28px] p-7 sm:p-9 flex flex-col ${c.bg}`}>
              <span className="ng-sticker self-start bg-[#1F1F1F] text-[#FFFDF2] -rotate-2">{c.tag}</span>
              <h3 className="mt-5 font-display font-black uppercase text-3xl sm:text-4xl tracking-tight leading-[0.92]">{c.name}</h3>
              <p className="mt-4 text-lg font-extrabold leading-snug">{c.line}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {c.formats.map((f, i) => (
                  <li key={i} className={`px-3 py-1.5 rounded-full text-xs font-bold ${c.chip}`}>
                    {f}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
