"use client";

import { Search, Compass, ArrowUpRight, ShieldCheck } from "lucide-react";

export default function WhyNorthgauge() {
  const pillars = [
    {
      icon: Search,
      title: "Curiosity first.",
      body: "Every engagement starts with an audit: we ask the uncomfortable questions your last agency skipped.",
      conceptRole: "Curiosity · Always asking, always exploring",
    },
    {
      icon: Compass,
      title: "Creative that's measured.",
      body: "Every idea ships with a clear hypothesis and a concrete number to beat. No aesthetic vanity without commercial return.",
      conceptRole: "Discovery · Finding more in the everyday",
    },
    {
      icon: ArrowUpRight,
      title: "One team, full funnel.",
      body: "Brand, performance and retention sit together at the same desk, so nothing gets lost between siloed vendor handoffs.",
      conceptRole: "Forward-Looking · A mindset that keeps you moving",
    },
    {
      icon: ShieldCheck,
      title: "Senior people on your account.",
      body: "The operators and strategists on your pitch call are the exact craftspeople doing the work every week.",
      conceptRole: "Senior Craft · Direct operator accountability",
    },
  ];

  return (
    <section id="why-us" className="py-24 sm:py-32 bg-[#FFFDF2] border-b border-[#1F1F1F]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF4B00]/10 text-[#FF4B00] mb-4">
            <span className="text-xs font-bold tracking-[0.2em] uppercase">
              Brand Principles
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1F1F1F] tracking-tight mb-4">
            Why curious brands stay with us
          </h2>
          <p className="text-base sm:text-lg text-[#1F1F1F]/70">
            Growth isn&apos;t magic. It&apos;s relentless curiosity paired with disciplined
            creative execution.
          </p>
        </div>

        {/* 2x2 Grid of Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {pillars.map((pillar) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="group p-8 sm:p-10 rounded-3xl bg-[#FCF5CD]/30 border border-[#1F1F1F]/10 hover:border-[#FF4B00] hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-[#FADCC4] group-hover:bg-[#FF4B00] text-[#FF4B00] group-hover:text-white flex items-center justify-center transition-colors mb-6">
                    <IconComponent className="w-7 h-7" />
                  </div>

                  {/* Concept Badge */}
                  <div className="text-[11px] font-extrabold uppercase tracking-widest text-[#FF4B00] mb-2">
                    {pillar.conceptRole}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-extrabold text-[#1F1F1F] mb-3">
                    {pillar.title}
                  </h3>

                  {/* Body */}
                  <p className="text-base text-[#1F1F1F]/75 leading-relaxed">
                    {pillar.body}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-[#1F1F1F]/5 flex items-center justify-between text-xs font-bold text-stone-400 group-hover:text-[#1F1F1F] transition-colors">
                  <span>Northgauge Standard</span>
                  <span className="text-[#FF4B00]">✓ Included</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
