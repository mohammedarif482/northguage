"use client";

import Image from "next/image";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[92vh] pt-32 pb-20 md:pt-40 md:pb-28 flex flex-col justify-center bg-[#FCF5CD]/40 overflow-hidden"
    >
      {/* Subtle organic background mesh */}
      <div className="absolute inset-0 pointer-events-none -z-10 opacity-40">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#FF4B00]/10 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-[#FADCC4]/40 blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F1F1F]/5 border border-[#1F1F1F]/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#FF4B00] animate-pulse" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#1F1F1F]/80">
                Creative-Led Growth Agency
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#1F1F1F] tracking-tight leading-[1.08] mb-6">
              A hook for{" "}
              <span className="relative inline-block text-[#FF4B00]">
                curious
                <svg
                  className="absolute left-0 -bottom-2 w-full h-3 text-[#FF4B00]/40 -z-10"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                >
                  <path d="M 0 12 Q 50 18 100 10" />
                </svg>
              </span>{" "}
              brands.
            </h1>

            {/* Subline */}
            <p className="text-lg sm:text-xl text-[#1F1F1F]/75 font-normal leading-relaxed max-w-2xl mb-10">
              We build brands people notice, ads that pay back, and customers who
              come back. One team, three moves:{" "}
              <span className="font-bold text-[#1F1F1F]">Hook. Reel. Keep.</span>
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <a
                href="#audit"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#FF4B00] hover:bg-[#E04200] text-white font-bold text-base tracking-wide transition-all duration-200 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 text-center"
              >
                <span>Get a free growth audit</span>
                <ArrowUpRight className="w-5 h-5" />
              </a>

              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/70 hover:bg-white text-[#1F1F1F] font-semibold text-base border border-[#1F1F1F]/15 hover:border-[#1F1F1F]/30 transition-all duration-200 text-center"
              >
                <span>See how it works</span>
                <ArrowDown className="w-4 h-4 text-[#FF4B00]" />
              </a>
            </div>

            {/* Brand pillars micro-tags */}
            <div className="mt-12 pt-8 border-t border-[#1F1F1F]/10 flex flex-wrap items-center gap-6 sm:gap-8 text-xs font-semibold uppercase tracking-wider text-[#1F1F1F]/60">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4B00]" />
                Curiosity First
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4B00]" />
                Full Funnel (Brand + Ads + CRM)
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4B00]" />
                Senior Craft Only
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Swaying Hook */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm sm:max-w-md aspect-square flex items-center justify-center">
              {/* Backing disk */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#FCF5CD] via-[#FADCC4]/70 to-[#FFFDF2] border border-[#FF4B00]/15 shadow-inner" />

              {/* Gentle fishing line dangling from top */}
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[2px] h-20 bg-gradient-to-b from-[#1F1F1F]/30 to-[#FF4B00]/70" />

              {/* Swaying Hook */}
              <div className="relative z-10 w-48 sm:w-60 h-64 sm:h-80 animate-hook-sway transition-transform">
                <Image
                  src="/northgauge-hook.svg"
                  alt="Northgauge Hook Emblem"
                  fill
                  priority
                  className="object-contain drop-shadow-2xl"
                />
              </div>

              {/* Floating curiosity badge */}
              <div className="absolute top-6 left-2 sm:left-4 z-20 px-3.5 py-2 rounded-2xl bg-white/90 backdrop-blur-md shadow-lg border border-[#1F1F1F]/10 text-xs font-bold text-[#1F1F1F] flex items-center gap-2 animate-float-subtle">
                <div className="w-6 h-6 rounded-full bg-[#FADCC4] flex items-center justify-center text-[#FF4B00]">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[#1F1F1F]/50">The Hook Story</div>
                  <div className="font-bold">Always asking.</div>
                </div>
              </div>

              {/* Floating metric badge */}
              <div className="absolute bottom-6 right-2 sm:right-4 z-20 px-4 py-2.5 rounded-2xl bg-[#1F1F1F] text-white shadow-xl flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF4B00] animate-ping" />
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-stone-400">Average ROAS</div>
                  <div className="text-sm font-extrabold text-[#FCF5CD]">4.8x Managed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
