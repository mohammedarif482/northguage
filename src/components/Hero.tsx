"use client";

import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[92vh] pt-32 pb-16 sm:pt-40 sm:pb-24 flex flex-col justify-between bg-[#FCF5CD] hairline-b overflow-hidden"
    >
      {/* Top Header Eyebrow Bar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 w-full mb-12 sm:mb-16">
        <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.22em] text-[#1F1F1F]/60 pb-3 hairline-b">
          <span>CREATIVE-LED GROWTH AGENCY</span>
          <span className="font-mono">01 // HERO</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Subline, CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <h1 className="text-5xl sm:text-7xl lg:text-[5.25rem] font-extrabold text-[#1F1F1F] tracking-tight leading-[0.98] mb-8">
              A hook for <br />
              <span className="text-[#FF4B00]">curious</span> brands.
            </h1>

            <p className="text-xl sm:text-2xl text-[#1F1F1F]/80 font-normal leading-relaxed max-w-xl mb-10">
              We build brands people notice, ads that pay back, and customers who
              come back. One team, three moves:{" "}
              <span className="font-extrabold text-[#1F1F1F]">
                Hook. Reel. Keep.
              </span>
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <a
                href="#audit"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#FF4B00] hover:bg-[#E04200] text-white font-bold text-sm tracking-[0.08em] uppercase transition-all duration-150 shadow-sm hover:shadow-md"
              >
                <span>Get a free growth audit</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-transparent hover:bg-[#1F1F1F]/5 text-[#1F1F1F] font-bold text-sm tracking-[0.08em] uppercase border border-[#1F1F1F]/25 hover:border-[#1F1F1F] transition-all duration-150"
              >
                <span>See how it works</span>
                <ArrowDown className="w-3.5 h-3.5 text-[#FF4B00]" />
              </a>
            </div>
          </div>

          {/* Right Column: Hero Visual - Elegant Hook swaying from hairline */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm sm:max-w-md h-[340px] sm:h-[420px] flex items-center justify-center">
              {/* Thin hairline fishing line coming from top of viewport */}
              <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1px] h-36 bg-[#1F1F1F]/25" />

              {/* Hook emblem swaying */}
              <div className="relative w-44 sm:w-56 h-64 sm:h-80 animate-hook-sway">
                <Image
                  src="/northgauge-hook.svg"
                  alt="Northgauge Hook"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 w-full mt-12 sm:mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 hairline-t text-xs font-bold uppercase tracking-[0.16em] text-[#1F1F1F]/70">
          <div className="flex items-center gap-2">
            <span className="text-[#FF4B00] font-mono">01</span>
            <span>HOOK — Creative Brand Building</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#FF4B00] font-mono">02</span>
            <span>REEL — Performance Marketing</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#FF4B00] font-mono">03</span>
            <span>KEEP — Retention & CRM</span>
          </div>
        </div>
      </div>
    </section>
  );
}
