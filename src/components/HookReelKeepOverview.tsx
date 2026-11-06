"use client";

import Image from "next/image";
import { ArrowDown } from "lucide-react";

export default function HookReelKeepOverview() {
  const columns = [
    {
      id: "hook",
      num: "01",
      verb: "HOOK",
      name: "Creative-led brand building",
      pitch: "Get noticed and remembered.",
      desc: "We find the one thing that makes your brand interesting and build every visual, angle, and asset around it.",
    },
    {
      id: "reel",
      num: "02",
      verb: "REEL",
      name: "Performance marketing",
      pitch: "Turn attention into revenue.",
      desc: "Creative testing at volume, disciplined media buying, and landing pages that turn interest into paying customers.",
    },
    {
      id: "keep",
      num: "03",
      verb: "KEEP",
      name: "Retention marketing",
      pitch: "Turn first buyers into repeat buyers.",
      desc: "Lifecycle flows, automated WhatsApp journeys, and cohort retention systems that make the second order easier than the first.",
    },
  ];

  return (
    <section id="services" className="py-24 sm:py-32 bg-[#FCF5CD] hairline-b">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-10 hairline-b mb-12 sm:mb-16 gap-6">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#1F1F1F]/50 mb-3">
              THE SPINE // 05
            </div>
            <h2 className="text-4xl sm:text-6xl font-extrabold text-[#1F1F1F] tracking-tight">
              Three moves. One line.
            </h2>
          </div>
          <p className="text-sm font-medium text-[#1F1F1F]/70 max-w-sm">
            Click any pillar to jump directly to its operational breakdown below.
          </p>
        </div>

        {/* The Thin Orange Fishing Line joined through the 3 columns ending in the hook */}
        <div className="relative mb-10 hidden md:block">
          <div className="h-[2px] bg-[#FF4B00] w-full relative">
            {/* The Hook icon at the end of the line */}
            <div className="absolute -top-3 right-0 w-8 h-8 text-[#FF4B00]">
              <Image
                src="/northgauge-hook.svg"
                alt=""
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Three Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x divide-[#1F1F1F]/15">
          {columns.map((col, idx) => (
            <a
              key={col.id}
              href={`#${col.id}`}
              className={`group flex flex-col justify-between py-6 ${
                idx === 0 ? "md:pr-10" : idx === 1 ? "md:px-10" : "md:pl-10"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-2xl font-bold text-[#FF4B00]">
                    {col.num}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#1F1F1F]/40 group-hover:text-[#FF4B00] transition-colors">
                    {col.verb}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1F1F1F] group-hover:text-[#FF4B00] transition-colors mb-3 leading-tight">
                  {col.name}
                </h3>

                <p className="text-base font-bold text-[#1F1F1F]/90 mb-4">
                  {col.pitch}
                </p>

                <p className="text-sm text-[#1F1F1F]/70 leading-relaxed mb-8">
                  {col.desc}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#FF4B00] pt-4 hairline-t">
                <span>View panel breakdown</span>
                <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
