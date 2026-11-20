"use client";

import { useEffect, useRef, useState } from "react";
import CaseStudyModal, { CaseStudy } from "./CaseStudyModal";
import Placeholder from "./Placeholder";
import SwipeHint from "./SwipeHint";
import { ArrowUpRight } from "lucide-react";
import { getGsap, prefersReducedMotion } from "@/lib/motion";

// Neutral cards: colour only appears on the move tags (Hook / Reel / Keep).
const moveTag: Record<string, string> = {
  Hook: "bg-[#FF4B00] text-[#FFFDF2]",
  Reel: "bg-[#FFC83D] text-[#1F1F1F]",
  Keep: "bg-[#B9A6FF] text-[#1F1F1F]",
};

const base = {
  bg: "bg-[#FFFDF2] border border-[#1F1F1F]/10",
  ink: "text-[#1F1F1F]",
  muted: "text-[#1F1F1F]/70",
  sticker: "bg-[#1F1F1F] text-[#FFFDF2] -rotate-3",
};

const looks = [
  {
    ...base,
    span: "lg:col-span-7 lg:row-span-2",
    tone: "charcoal" as const,
    media: { label: "Campaign film", kind: "video" as const, aspect: "aspect-[16/9] lg:aspect-auto lg:flex-1 lg:min-h-[320px]" },
  },
  {
    ...base,
    span: "lg:col-span-5",
    tone: "cream" as const,
    media: { label: "UGC ad set", kind: "image" as const, aspect: "aspect-[16/9]" },
  },
  {
    ...base,
    span: "lg:col-span-5",
    tone: "cream" as const,
    media: { label: "Unboxing ritual", kind: "image" as const, aspect: "aspect-[16/9]" },
  },
];

export default function FeaturedWork() {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || prefersReducedMotion()) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      // Cards drop in tilted and land perfectly straight.
      gsap.fromTo("[data-case]", {
        y: 80,
        rotation: (i) => [-3, 3, -2][i] ?? 0,
        opacity: 0,
      }, {
        y: 0,
        rotation: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: grid, start: "top 80%" },
      });
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -6 },
          { yPercent: 6, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } }
        );
      });
    }, grid);
    return () => ctx.revert();
  }, []);

  const cases: CaseStudy[] = [
    {
      id: "kinto",
      brand: "Kinto Wellness",
      country: "UK",
      metric: "+184% Revenue",
      timeframe: "6 months",
      story:
        "Replaced 3 disjointed agencies with one line: sharp hook positioning, 50+ UGC tests, and 90-day subscription replenishment.",
      tags: ["Hook", "Reel", "Keep"],
      fullCase: {
        challenge:
          "Kinto had strong repeat organic reviews, but paid Meta ads were stagnant at 1.8x ROAS while churn on recurring orders was sitting at 18% monthly.",
        moves: {
          hook: "Reframed the entire product line from generic vitamins into 'The 3PM Cognitive Reboot' with bold custom packaging and founder-led storytelling.",
          reel: "Tested 42 creative angle iterations per month across TikTok and Meta, lowering blended acquisition cost by 38%.",
          keep: "Architected a personalized Klaviyo replenishment cadence that triggers precisely when bottles hit 10 days remaining.",
        },
        results: [
          { label: "Revenue Lift", value: "+184%" },
          { label: "Blended ROAS", value: "4.2x" },
          { label: "Active Subs", value: "3.4x" },
        ],
        quote:
          "Northgauge solved the gap between our creative team and media buyers. We scaled spend 4x while improving customer payback.",
        author: "Marcus Vance, Founder & CEO",
      },
    },
    {
      id: "sol",
      brand: "Sól Apparel",
      country: "US",
      metric: "4.9x ROAS",
      timeframe: "4 months",
      story:
        "Engineered 60+ modular video hooks and high-converting comparison landers to break past the $100k/month ad spend ceiling.",
      tags: ["Hook", "Reel"],
      fullCase: {
        challenge:
          "Ad fatigue was destroying margins within 14 days of launching new creatives. The brand lacked a repeatable creative testing system.",
        moves: {
          hook: "Created 12 high-contrast visual hooks emphasizing breathability tests and water-repellent fabric demos.",
          reel: "Implemented automated bid-capping and high-velocity asset testing on TikTok and Meta with dedicated advertorial landing pages.",
          keep: "Triggered dynamic SMS flash drops for VIP customers, producing instant six-figure launch weekends.",
        },
        results: [
          { label: "Blended ROAS", value: "4.9x" },
          { label: "Monthly Spend", value: "$380k" },
          { label: "CVR on Lander", value: "5.8%" },
        ],
        quote:
          "The speed of their creative testing is unlike any agency we've hired. We finally have ad consistency.",
        author: "Elena Rostova, Head of Growth",
      },
    },
    {
      id: "aura",
      brand: "Aura Botanicals",
      country: "UAE",
      metric: "58% Repeat",
      timeframe: "5 months",
      story:
        "Transformed one-off purchasers into loyal brand evangelists via WhatsApp VIP concierge and skin-analysis lifecycle flows.",
      tags: ["Hook", "Keep"],
      fullCase: {
        challenge:
          "Customers were acquiring trial sets during promotions but second order conversion was stalled at under 14%.",
        moves: {
          hook: "Redesigned sensory unboxing touchpoints and developed QR-guided ritual guides that set immediate post-delivery expectations.",
          reel: "Launched retargeting campaigns built solely around customer unboxing rituals and dermatologist commentary.",
          keep: "Launched an automated WhatsApp Skin Advisory flow with personalized check-ins at Day 7, Day 21, and Day 45.",
        },
        results: [
          { label: "90-Day Repeat", value: "58%" },
          { label: "LTV Expansion", value: "+120%" },
          { label: "Review Rate", value: "32%" },
        ],
        quote:
          "Retention is where our profits are made now. Northgauge made customer retention an effortless machine.",
        author: "Zayn Al-Mansoor, Co-Founder",
      },
    },
  ];

  return (
    <section id="work" className="py-24 sm:py-32 bg-[#FCF5CD]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <p className="font-serif italic text-xl sm:text-2xl text-[#FF4B00] leading-none mb-4">Recent work</p>
            <h2 className="font-display font-black uppercase text-5xl sm:text-7xl tracking-tight leading-[0.9] text-[#1F1F1F]">
              Proof,
              <br />
              <span className="text-[#FF4B00]">not promises.</span>
            </h2>
          </div>
          <p className="text-base font-medium text-[#1F1F1F]/75 max-w-sm">
            Every case shows the bottleneck, the three moves we made and what changed. Tap one to open it up.
          </p>
        </div>

        {/* Bento */}
        <SwipeHint className="lg:hidden mb-3" />
        <div ref={gridRef} className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-6 px-6 sm:-mx-10 sm:px-10 scroll-px-6 sm:scroll-px-10 gap-4 pb-6 lg:grid lg:grid-cols-12 lg:gap-6 lg:overflow-visible lg:mx-0 lg:px-0 lg:pb-0">
          {cases.map((c, idx) => {
            const look = looks[idx % looks.length];
            return (
              <div
                key={c.id}
                data-case
                role="button"
                tabIndex={0}
                onClick={() => setSelectedCase(c)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedCase(c);
                  }
                }}
                aria-haspopup="dialog"
                aria-label={`${c.brand}: ${c.metric} in ${c.timeframe}. View case breakdown`}
                className={`shrink-0 w-[86%] sm:w-[62%] lg:w-auto snap-start group relative cursor-pointer rounded-[28px] p-5 sm:p-8 flex flex-col gap-6 overflow-hidden outline-hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1F1F1F] transition-[translate] duration-300 hover:-translate-y-1 ${look.span} ${look.bg} ${look.ink}`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold uppercase tracking-[0.16em]">
                  <span className={look.muted}>
                    {c.brand} · {c.country}
                  </span>
                  <span className="flex gap-1.5">
                    {c.tags.map((t) => (
                      <span key={t} className={`px-2.5 py-1 rounded-full ${moveTag[t] ?? "bg-[#1F1F1F]/10"}`}>
                        {t}
                      </span>
                    ))}
                  </span>
                </div>

                <div className={`relative rounded-2xl overflow-hidden ${look.media.aspect}`}>
                  <div data-parallax className="absolute -inset-y-[8%] inset-x-0">
                    <Placeholder label={look.media.label} kind={look.media.kind} tone={look.tone} className="w-full h-full rounded-2xl" />
                  </div>
                  <span className={`ng-sticker absolute top-4 right-4 ${look.sticker}`}>{c.metric}</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mt-auto">
                  <div className="max-w-md">
                    <div className="font-display font-black uppercase text-4xl sm:text-5xl tracking-tight leading-none mb-2 text-[#FF4B00]">
                      {c.metric}
                    </div>
                    <p className={`text-sm leading-relaxed line-clamp-2 sm:line-clamp-none ${look.muted}`}>
                      In {c.timeframe}. {c.story}
                    </p>
                  </div>
                  <span className="shrink-0 w-12 h-12 rounded-full bg-[#1F1F1F] text-[#FFFDF2] flex items-center justify-center transition-transform duration-300 group-hover:rotate-45 group-hover:scale-110">
                    <ArrowUpRight className="w-5 h-5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <CaseStudyModal caseStudy={selectedCase} onClose={() => setSelectedCase(null)} />
    </section>
  );
}
