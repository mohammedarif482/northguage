"use client";

import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[94vh] pt-36 pb-16 sm:pt-44 sm:pb-24 flex flex-col justify-between bg-[#FCF5CD] hairline-b overflow-hidden"
    >
      {/* Top Section Tag */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 w-full mb-8 sm:mb-12">
        <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.22em] text-[#1F1F1F]/60 pb-3 hairline-b">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4B00]" />
            <span>CREATIVE-LED GROWTH AGENCY</span>
          </div>
          <span className="font-serif italic text-sm text-[#FF4B00]">01 // HERO</span>
        </div>
      </div>

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="font-serif italic text-xl sm:text-2xl text-[#1F1F1F]/70 mb-3">
              A hook for curious minds.
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-[5.4rem] font-extrabold text-[#1F1F1F] tracking-tight leading-[0.96] mb-8">
              A hook for <br />
              <span className="text-[#FF4B00] relative inline-block">
                curious
              </span>{" "}
              brands.
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
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#FF4B00] hover:bg-[#E04200] text-white font-bold text-xs uppercase tracking-[0.14em] transition-all duration-150 shadow-sm hover:shadow-lg"
              >
                <span>Get a free growth audit</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-transparent hover:bg-[#1F1F1F]/5 text-[#1F1F1F] font-bold text-xs uppercase tracking-[0.14em] border border-[#1F1F1F]/25 hover:border-[#1F1F1F] transition-all duration-150"
              >
                <span>See how it works</span>
                <ArrowDown className="w-3.5 h-3.5 text-[#FF4B00]" />
              </a>
            </div>
          </div>

          {/* Right Column: Hero Visual - Elegant Hook dangling on hairline */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm sm:max-w-md h-[340px] sm:h-[420px] flex items-center justify-center">
              {/* Hairline fishing line coming from top */}
              <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1px] h-44 bg-[#1F1F1F]/25" />

              {/* Hook emblem swaying */}
              <div className="relative w-44 sm:w-56 h-64 sm:h-80 animate-hook-sway">
                <Image
                  src="/northgauge-hook.svg"
                  alt="Northgauge Hook"
                  fill
                  priority
                  className="object-contain drop-shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 w-full mt-10 sm:mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 hairline-t text-xs font-bold uppercase tracking-[0.16em] text-[#1F1F1F]/70">
          <div className="flex items-center gap-2">
            <span className="font-serif italic text-sm text-[#FF4B00]">01</span>
            <span>HOOK — Creative Brand Building</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-serif italic text-sm text-[#FF4B00]">02</span>
            <span>REEL — Performance Marketing</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-serif italic text-sm text-[#FF4B00]">03</span>
            <span>KEEP — Retention & CRM</span>
          </div>
        </div>
      </div>
    </section>
  );
}
