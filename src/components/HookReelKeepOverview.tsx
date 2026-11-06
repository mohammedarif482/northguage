"use client";

import Image from "next/image";
import { ArrowDown, Sparkles, Target, Repeat } from "lucide-react";

export default function HookReelKeepOverview() {
  const steps = [
    {
      id: "hook",
      step: "01",
      verb: "HOOK",
      name: "Creative-Led Brand Building",
      tagline: "Get noticed and remembered.",
      description:
        "Distinctive visual identity, scroll-stopping concepts, and creative strategy designed to embed your brand in mind.",
      icon: Sparkles,
      color: "#FF4B00",
    },
    {
      id: "reel",
      step: "02",
      verb: "REEL",
      name: "Performance Marketing",
      tagline: "Turn attention into revenue.",
      description:
        "High-velocity creative testing, algorithmic paid media across Meta & Google, and ruthless CRO that lowers customer acquisition cost.",
      icon: Target,
      color: "#FF4B00",
    },
    {
      id: "keep",
      step: "03",
      verb: "KEEP",
      name: "Retention Marketing",
      tagline: "Turn first buyers into repeat buyers.",
      description:
        "Automated lifecycle flows, SMS & WhatsApp journeys, and cohort-driven retention that makes the second order frictionless.",
      icon: Repeat,
      color: "#FF4B00",
    },
  ];

  return (
    <section id="services" className="py-24 bg-[#FCF5CD]/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF4B00]/10 text-[#FF4B00] mb-4">
            <span className="text-xs font-bold tracking-[0.2em] uppercase">
              The Northgauge Spine
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1F1F1F] tracking-tight mb-4">
            Three moves. One line.
          </h2>
          <p className="text-base sm:text-lg text-[#1F1F1F]/70 max-w-xl">
            A cohesive continuous thread from the very first impression through to
            compounding lifetime value.
          </p>
        </div>

        {/* The Three Columns joined by Fishing Line */}
        <div className="relative">
          {/* Desktop Connecting Fishing Line */}
          <div
            className="hidden md:block absolute top-[72px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-[#FF4B00]/30 via-[#FF4B00] to-[#FF4B00]/30 z-0"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, idx) => {
              const IconComponent = step.icon;
              return (
                <a
                  key={step.id}
                  href={`#${step.id}`}
                  className="group flex flex-col p-8 sm:p-10 rounded-3xl bg-white border border-[#1F1F1F]/10 hover:border-[#FF4B00] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative"
                >
                  {/* Top node */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-[#FCF5CD] group-hover:bg-[#FF4B00] text-[#FF4B00] group-hover:text-white flex items-center justify-center transition-colors duration-200">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <span className="text-sm font-extrabold tracking-widest text-[#B7B2A7] group-hover:text-[#FF4B00] transition-colors">
                      {step.step}
                    </span>
                  </div>

                  {/* Verb & Title */}
                  <div className="mb-4">
                    <span className="text-xs font-extrabold tracking-[0.25em] uppercase text-[#FF4B00]">
                      {step.verb}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#1F1F1F] group-hover:text-[#FF4B00] transition-colors mt-1">
                      {step.name}
                    </h3>
                  </div>

                  {/* One line pitch */}
                  <p className="text-base font-bold text-[#1F1F1F]/90 mb-3">
                    {step.tagline}
                  </p>

                  <p className="text-sm text-[#1F1F1F]/65 leading-relaxed mb-8 grow">
                    {step.description}
                  </p>

                  {/* Jump action */}
                  <div className="flex items-center gap-2 text-xs font-bold text-[#FF4B00] uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                    <span>Explore details</span>
                    <ArrowDown className="w-4 h-4" />
                  </div>

                  {/* Corner hook watermark on 3rd card */}
                  {idx === 2 && (
                    <div className="absolute -bottom-3 -right-3 w-10 h-10 opacity-30 group-hover:opacity-80 transition-opacity">
                      <Image
                        src="/northgauge-hook.svg"
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
