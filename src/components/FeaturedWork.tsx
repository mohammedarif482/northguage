"use client";

import { useState } from "react";
import CaseStudyModal, { CaseStudy } from "./CaseStudyModal";
import { ArrowUpRight, Sparkles } from "lucide-react";

export default function FeaturedWork() {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  const cases: CaseStudy[] = [
    {
      id: "kinto",
      brand: "Kinto Wellness",
      country: "United Kingdom",
      category: "Functional Health & D2C",
      metric: "+184% Revenue",
      timeframe: "6 months",
      story:
        "Replaced 3 disjointed agencies with one line: sharp hook positioning, 50+ UGC tests, and 90-day subscription retention.",
      tags: ["Hook", "Reel", "Keep"],
      background: "from-[#FCF5CD] to-[#FADCC4]/50",
      accentColor: "#FF4B00",
      fullCase: {
        challenge:
          "Kinto had strong repeat organic reviews, but paid Meta ads were stagnant at 1.8x ROAS while churn on recurring orders was sitting at 18% monthly.",
        moves: {
          hook: "Reframed the entire product line from 'everyday vitamins' into 'The 3PM Cognitive Reboot' with bold custom packaging and founder-led storytelling.",
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
      country: "United States",
      category: "Performance Athleisure",
      metric: "4.9x Blended ROAS",
      timeframe: "4 months",
      story:
        "Engineered 60+ modular video hooks and high-converting comparison landers to break past the $100k/month ad spend ceiling.",
      tags: ["Hook", "Reel"],
      background: "from-[#FFFDF2] to-[#FCF5CD]",
      accentColor: "#FF4B00",
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
      country: "United Arab Emirates",
      category: "Luxury Skincare",
      metric: "58% Repeat Rate",
      timeframe: "5 months",
      story:
        "Transformed one-off purchasers into loyal brand evangelists via WhatsApp VIP concierge and skin-analysis lifecycle flows.",
      tags: ["Hook", "Keep"],
      background: "from-[#FADCC4]/40 to-[#FCF5CD]",
      accentColor: "#FF4B00",
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
    <section id="work" className="py-24 bg-[#FCF5CD]/20 border-b border-[#1F1F1F]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF4B00]/10 text-[#FF4B00] mb-4">
              <span className="text-xs font-bold tracking-[0.2em] uppercase">
                Featured Case Studies
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1F1F1F] tracking-tight">
              Proof, not promises.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#1F1F1F]/70 max-w-md">
            Click any case study to inspect the breakdown, the three moves executed,
            and the resulting metrics.
          </p>
        </div>

        {/* Case Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cases.map((c) => (
            <div
              key={c.id}
              onClick={() => setSelectedCase(c)}
              className="group cursor-pointer rounded-3xl p-8 bg-white border border-[#1F1F1F]/10 hover:border-[#FF4B00] shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-stone-500">
                    {c.country}
                  </span>
                  <div className="flex gap-1.5">
                    {c.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-full bg-[#FCF5CD] text-[#1F1F1F] text-[10px] font-bold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Big Metric */}
                <div className="text-3xl sm:text-4xl font-extrabold text-[#FF4B00] tracking-tight mb-2 group-hover:scale-105 transition-transform origin-left">
                  {c.metric}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-6">
                  In {c.timeframe}
                </div>

                {/* Brand Name */}
                <h3 className="text-xl font-extrabold text-[#1F1F1F] group-hover:text-[#FF4B00] transition-colors mb-3">
                  {c.brand}
                </h3>

                {/* One line story */}
                <p className="text-sm text-[#1F1F1F]/75 leading-relaxed mb-6">
                  {c.story}
                </p>
              </div>

              {/* Interactive expand cue */}
              <div className="pt-6 border-t border-[#1F1F1F]/8 flex items-center justify-between text-xs font-bold text-[#FF4B00] uppercase tracking-wider">
                <span>View Case Breakdown</span>
                <div className="w-8 h-8 rounded-full bg-[#FCF5CD] group-hover:bg-[#FF4B00] text-[#FF4B00] group-hover:text-white flex items-center justify-center transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal
        caseStudy={selectedCase}
        onClose={() => setSelectedCase(null)}
      />
    </section>
  );
}
