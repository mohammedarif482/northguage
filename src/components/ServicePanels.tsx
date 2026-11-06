"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function ServicePanels() {
  return (
    <section className="bg-[#FFFDF2]">
      {/* ============================================================== */}
      {/* 01 HOOK */}
      {/* ============================================================== */}
      <div id="hook" className="scroll-mt-20 py-24 sm:py-32 hairline-b">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Editorial Copy */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#FF4B00] mb-4">
                01 // HOOK
              </div>

              <h3 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#1F1F1F] tracking-tight leading-[1.05] mb-6">
                Be the brand they can&apos;t scroll past.
              </h3>

              <p className="text-lg sm:text-xl text-[#1F1F1F]/80 leading-relaxed font-normal mb-10 max-w-xl">
                We find the one thing that makes you interesting and build
                everything around it.
              </p>

              {/* Signs you need this */}
              <div className="w-full mb-10 pb-8 hairline-b">
                <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#1F1F1F]/40 mb-4">
                  Signs you need this
                </div>
                <ul className="space-y-2 text-sm sm:text-base text-[#1F1F1F]/85 font-medium">
                  <li className="flex items-start gap-3">
                    <span className="text-[#FF4B00] font-mono">—</span>
                    <span>Your ads work but nobody remembers your name</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#FF4B00] font-mono">—</span>
                    <span>You look like every competitor in your niche</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#FF4B00] font-mono">—</span>
                    <span>You&apos;re entering a new market or launching new SKUs</span>
                  </li>
                </ul>
              </div>

              {/* What we do */}
              <div className="w-full mb-10">
                <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#1F1F1F]/40 mb-4">
                  What we do
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-semibold text-[#1F1F1F]">
                  <div className="py-2 hairline-b">Brand strategy & positioning</div>
                  <div className="py-2 hairline-b">Identity & packaging</div>
                  <div className="py-2 hairline-b">Content & campaign concepts</div>
                  <div className="py-2 hairline-b">Creator & UGC programmes</div>
                </div>
              </div>

              {/* CTA */}
              <a
                href="#audit"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#1F1F1F] hover:bg-[#FF4B00] text-white text-xs font-bold tracking-[0.12em] uppercase transition-colors"
              >
                <span>Start with a brand audit</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Right: Editorial Visual */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md p-8 sm:p-12 rounded-2xl bg-[#FCF5CD] border border-[#1F1F1F]/15 flex flex-col justify-between aspect-4/5">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.18em] text-[#1F1F1F]/60 pb-4 hairline-b">
                  <span>Visual Craft</span>
                  <span className="font-mono">HOOK.01</span>
                </div>

                <div className="my-auto py-8 text-center">
                  <div className="relative w-36 h-48 mx-auto mb-6">
                    <Image
                      src="/northgauge-hook.svg"
                      alt="Hook letterform"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="text-xl font-extrabold text-[#1F1F1F] tracking-tight">
                    Curiosity into Letterform.
                  </div>
                  <p className="text-xs text-[#1F1F1F]/60 mt-1">
                    A distinctive symbol built to anchor every customer impression.
                  </p>
                </div>

                <div className="pt-4 hairline-t text-[11px] font-mono text-[#1F1F1F]/50 flex justify-between">
                  <span>MEMORABILITY</span>
                  <span>UNAPOLOGETIC</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 02 REEL */}
      {/* ============================================================== */}
      <div id="reel" className="scroll-mt-20 py-24 sm:py-32 bg-[#FCF5CD]/40 hairline-b">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Visual Left on Desktop */}
            <div className="lg:col-span-5 order-2 lg:order-1 flex justify-center">
              <div className="w-full max-w-md p-8 sm:p-12 rounded-2xl bg-[#1F1F1F] text-white flex flex-col justify-between aspect-4/5 shadow-md">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.18em] text-white/50 pb-4 border-b border-white/15">
                  <span>Performance Architecture</span>
                  <span className="font-mono text-[#FF4B00]">REEL.02</span>
                </div>

                <div className="my-auto py-8 space-y-6">
                  <div>
                    <div className="text-[11px] font-mono text-white/50 uppercase tracking-widest">
                      Disciplined Media
                    </div>
                    <div className="text-4xl sm:text-5xl font-extrabold text-[#FCF5CD] mt-1">
                      4.8x ROAS
                    </div>
                    <div className="text-xs text-white/70 mt-1">
                      Blended return across managed spend.
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10">
                    <div className="text-[11px] font-mono text-white/50 uppercase tracking-widest">
                      Creative Testing Cadence
                    </div>
                    <div className="text-2xl font-bold text-white mt-1">
                      50+ Ads / Month
                    </div>
                    <div className="text-xs text-white/70 mt-1">
                      Systematic hypothesis testing across Meta & TikTok.
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/15 text-[11px] font-mono text-white/50 flex justify-between">
                  <span>CLEAN ATTRIBUTION</span>
                  <span>ZERO FLUFF</span>
                </div>
              </div>
            </div>

            {/* Copy Right on Desktop */}
            <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col items-start">
              <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#FF4B00] mb-4">
                02 // REEL
              </div>

              <h3 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#1F1F1F] tracking-tight leading-[1.05] mb-6">
                Ads that pay their own way.
              </h3>

              <p className="text-lg sm:text-xl text-[#1F1F1F]/80 leading-relaxed font-normal mb-10 max-w-xl">
                Performance marketing built on creative testing, clean data and
                honest reporting.
              </p>

              {/* Signs you need this */}
              <div className="w-full mb-10 pb-8 hairline-b">
                <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#1F1F1F]/40 mb-4">
                  Signs you need this
                </div>
                <ul className="space-y-2 text-sm sm:text-base text-[#1F1F1F]/85 font-medium">
                  <li className="flex items-start gap-3">
                    <span className="text-[#FF4B00] font-mono">—</span>
                    <span>ROAS dropping as you scale spend</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#FF4B00] font-mono">—</span>
                    <span>The same few ads running for months with no new winners</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#FF4B00] font-mono">—</span>
                    <span>Can&apos;t tell which channel or campaign really works</span>
                  </li>
                </ul>
              </div>

              {/* What we do */}
              <div className="w-full mb-10">
                <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#1F1F1F]/40 mb-4">
                  What we do
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-semibold text-[#1F1F1F]">
                  <div className="py-2 hairline-b">Meta, Google, TikTok & Amazon ads</div>
                  <div className="py-2 hairline-b">Creative testing at volume (50+ ads/mo)</div>
                  <div className="py-2 hairline-b">Landing pages & CRO sprints</div>
                  <div className="py-2 hairline-b">Tracking, attribution & weekly reports</div>
                </div>
              </div>

              {/* CTA */}
              <a
                href="#audit"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#FF4B00] hover:bg-[#E04200] text-white text-xs font-bold tracking-[0.12em] uppercase transition-colors"
              >
                <span>Get a free ads audit</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 03 KEEP */}
      {/* ============================================================== */}
      <div id="keep" className="scroll-mt-20 py-24 sm:py-32 hairline-b">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Editorial Copy */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#FF4B00] mb-4">
                03 // KEEP
              </div>

              <h3 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#1F1F1F] tracking-tight leading-[1.05] mb-6">
                Keep them hooked.
              </h3>

              <p className="text-lg sm:text-xl text-[#1F1F1F]/80 leading-relaxed font-normal mb-10 max-w-xl">
                We make the second order easier than the first.
              </p>

              {/* Signs you need this */}
              <div className="w-full mb-10 pb-8 hairline-b">
                <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#1F1F1F]/40 mb-4">
                  Signs you need this
                </div>
                <ul className="space-y-2 text-sm sm:text-base text-[#1F1F1F]/85 font-medium">
                  <li className="flex items-start gap-3">
                    <span className="text-[#FF4B00] font-mono">—</span>
                    <span>Customers buy once and vanish into the ether</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#FF4B00] font-mono">—</span>
                    <span>Email is just repetitive discount blasts</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#FF4B00] font-mono">—</span>
                    <span>Rising CAC is eating your operating margin</span>
                  </li>
                </ul>
              </div>

              {/* What we do */}
              <div className="w-full mb-10">
                <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#1F1F1F]/40 mb-4">
                  What we do
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-semibold text-[#1F1F1F]">
                  <div className="py-2 hairline-b">Email & SMS flows (Klaviyo and others)</div>
                  <div className="py-2 hairline-b">WhatsApp & push journeys</div>
                  <div className="py-2 hairline-b">Loyalty, referral & subscriptions</div>
                  <div className="py-2 hairline-b">LTV & cohort reporting</div>
                </div>
              </div>

              {/* CTA */}
              <a
                href="#audit"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#1F1F1F] hover:bg-[#FF4B00] text-white text-xs font-bold tracking-[0.12em] uppercase transition-colors"
              >
                <span>Get a free retention audit</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Right: Editorial Visual */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md p-8 sm:p-12 rounded-2xl bg-[#FCF5CD] border border-[#1F1F1F]/15 flex flex-col justify-between aspect-4/5">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.18em] text-[#1F1F1F]/60 pb-4 hairline-b">
                  <span>Lifecycle Dynamics</span>
                  <span className="font-mono">KEEP.03</span>
                </div>

                <div className="my-auto py-8 space-y-6">
                  <div>
                    <div className="text-[11px] font-mono text-[#1F1F1F]/50 uppercase tracking-widest">
                      Repeat Customer Share
                    </div>
                    <div className="text-4xl sm:text-5xl font-extrabold text-[#FF4B00] mt-1">
                      62% Repeat
                    </div>
                    <div className="text-xs text-[#1F1F1F]/70 mt-1">
                      Automated lifecycle revenue share.
                    </div>
                  </div>

                  <div className="pt-6 hairline-t">
                    <div className="text-[11px] font-mono text-[#1F1F1F]/50 uppercase tracking-widest">
                      Repurchase Velocity
                    </div>
                    <div className="text-2xl font-bold text-[#1F1F1F] mt-1">
                      38 Days Flat
                    </div>
                    <div className="text-xs text-[#1F1F1F]/70 mt-1">
                      Accelerated from a prior 110-day average.
                    </div>
                  </div>
                </div>

                <div className="pt-4 hairline-t text-[11px] font-mono text-[#1F1F1F]/50 flex justify-between">
                  <span>LTV EXPANSION</span>
                  <span>ZERO FRICTION</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
