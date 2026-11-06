"use client";

import { useState } from "react";
import CaseStudyModal, { CaseStudy } from "./CaseStudyModal";
import { ArrowUpRight } from "lucide-react";

export default function FeaturedWork() {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

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
    <section id="work" className="py-24 sm:py-32 bg-[#FAF1D6]/40 hairline-b">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-10 hairline-b mb-12 sm:mb-16 gap-6">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#1F1F1F]/50 mb-3">
              FEATURED WORK // 07
            </div>
            <h2 className="text-4xl sm:text-6xl font-extrabold text-[#1F1F1F] tracking-tight">
              Proof, not promises.
            </h2>
          </div>
          <p className="text-sm font-medium text-[#1F1F1F]/70 max-w-sm">
            Click any case card to inspect the short case breakdown, the three
            moves executed, and verified results.
          </p>
        </div>

        {/* 3 Cases in a row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cases.map((c) => (
            <div
              key={c.id}
              onClick={() => setSelectedCase(c)}
              className="group cursor-pointer p-8 sm:p-10 rounded-2xl bg-[#FFFDF2] border border-[#1F1F1F]/15 hover:border-[#FF4B00] transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.16em] text-[#1F1F1F]/50 mb-6 pb-3 hairline-b">
                  <span>{c.country}</span>
                  <div className="flex gap-1.5 font-mono text-[11px] text-[#FF4B00]">
                    {c.tags.map((t) => (
                      <span key={t}>[{t}]</span>
                    ))}
                  </div>
                </div>

                <div className="text-4xl sm:text-5xl font-extrabold text-[#FF4B00] tracking-tight mb-2">
                  {c.metric}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#1F1F1F]/50 mb-6">
                  In {c.timeframe}
                </div>

                <h3 className="text-xl font-extrabold text-[#1F1F1F] group-hover:text-[#FF4B00] transition-colors mb-3">
                  {c.brand}
                </h3>

                <p className="text-sm text-[#1F1F1F]/75 leading-relaxed mb-8">
                  {c.story}
                </p>
              </div>

              <div className="pt-4 hairline-t flex items-center justify-between text-xs font-bold uppercase tracking-[0.12em] text-[#1F1F1F] group-hover:text-[#FF4B00] transition-colors">
                <span>View case breakdown</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <CaseStudyModal
        caseStudy={selectedCase}
        onClose={() => setSelectedCase(null)}
      />
    </section>
  );
}
