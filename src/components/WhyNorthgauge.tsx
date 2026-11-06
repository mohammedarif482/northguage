"use client";

import { Search, Compass, ArrowUpRight, ShieldCheck } from "lucide-react";

export default function WhyNorthgauge() {
  const pillars = [
    {
      icon: Search,
      num: "01",
      title: "Curiosity first.",
      body: "Every engagement starts with an audit: we ask the questions your last agency skipped.",
      conceptRole: "Curiosity · Always asking, always exploring.",
    },
    {
      icon: Compass,
      num: "02",
      title: "Creative that's measured.",
      body: "Every idea ships with a hypothesis and a number to beat.",
      conceptRole: "Discovery · Finding more in the everyday.",
    },
    {
      icon: ArrowUpRight,
      num: "03",
      title: "One team, full funnel.",
      body: "Brand, performance and retention sit together, so nothing gets lost between agencies.",
      conceptRole: "Forward-Looking · A mindset that keeps you moving.",
    },
    {
      icon: ShieldCheck,
      num: "04",
      title: "Senior people on your account.",
      body: "The people on the call are the people doing the work.",
      conceptRole: "Direct Senior Craft · Zero junior account layer.",
    },
  ];

  return (
    <section id="why-us" className="py-24 sm:py-36 bg-[#FFFDF2] hairline-b">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-10 hairline-b mb-12 sm:mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#1F1F1F]/50 mb-3">
              <span>PILLARS</span>
              <span>·</span>
              <span className="font-serif italic text-sm text-[#FF4B00]">08 // STANDARDS</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-extrabold text-[#1F1F1F] tracking-tight">
              Why curious brands stay with us
            </h2>
          </div>
          <p className="text-sm font-medium text-[#1F1F1F]/70 max-w-sm">
            Built on curiosity, discovery, and direct operator accountability.
          </p>
        </div>

        {/* 2x2 Grid with hairline dividers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1F1F1F]/15 rounded-2xl overflow-hidden border border-[#1F1F1F]/15">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-8 sm:p-12 bg-[#FFFDF2] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-xl bg-[#FCF5CD] text-[#FF4B00] flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-serif italic text-2xl font-normal text-[#FF4B00]">
                      {pillar.num}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1F1F1F] mb-3">
                    {pillar.title}
                  </h3>

                  <p className="text-base text-[#1F1F1F]/80 leading-relaxed mb-8">
                    {pillar.body}
                  </p>
                </div>

                <div className="pt-4 hairline-t text-[11px] font-mono text-[#1F1F1F]/50">
                  {pillar.conceptRole}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
