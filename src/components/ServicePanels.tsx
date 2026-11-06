"use client";

import { CheckCircle2, AlertCircle, ArrowUpRight, Sparkles, TrendingUp, RefreshCw } from "lucide-react";

export default function ServicePanels() {
  return (
    <section className="py-12 space-y-16 sm:space-y-24 bg-[#FFFDF2]">
      {/* ============================================================== */}
      {/* PANEL 1: 01 HOOK */}
      {/* ============================================================== */}
      <div id="hook" className="scroll-mt-24 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="p-8 sm:p-14 lg:p-16 rounded-[2.5rem] bg-[#FCF5CD]/40 border border-[#1F1F1F]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Text Side */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4B00] text-white text-xs font-extrabold tracking-[0.2em] uppercase mb-6">
                01 HOOK · Creative-Led Brand Building
              </div>

              <h3 className="text-3xl sm:text-5xl font-extrabold text-[#1F1F1F] tracking-tight leading-[1.12] mb-4">
                Be the brand they can&apos;t scroll past.
              </h3>

              <p className="text-lg sm:text-xl text-[#1F1F1F]/80 font-medium leading-relaxed mb-8">
                We find the one thing that makes you interesting and build
                everything around it.
              </p>

              {/* Signs you need this */}
              <div className="w-full mb-8 p-6 rounded-2xl bg-white/80 border border-[#1F1F1F]/8">
                <div className="text-xs font-extrabold tracking-wider uppercase text-[#FF4B00] mb-3 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" />
                  Signs you need this:
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {[
                    "Your ads work but nobody remembers your name",
                    "You look like every competitor in your niche",
                    "You're entering a new market or launching new SKUs",
                  ].map((sign) => (
                    <span
                      key={sign}
                      className="px-3.5 py-1.5 rounded-full bg-[#FCF5CD] text-[#1F1F1F] text-xs font-semibold"
                    >
                      {sign}
                    </span>
                  ))}
                </div>
              </div>

              {/* What we do */}
              <div className="w-full mb-8">
                <div className="text-xs font-extrabold tracking-wider uppercase text-[#1F1F1F]/50 mb-3">
                  What we do:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Brand strategy and positioning",
                    "Visual identity and packaging design",
                    "Content and campaign concepts",
                    "Creator and UGC programmes at scale",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-sm font-semibold text-[#1F1F1F]">
                      <CheckCircle2 className="w-4 h-4 text-[#FF4B00] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <a
                href="#audit"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#1F1F1F] hover:bg-[#FF4B00] text-white text-sm font-bold tracking-wide transition-all duration-200 shadow-md"
              >
                <span>Start with a brand audit</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* Visual Side */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md p-6 rounded-3xl bg-white border border-[#1F1F1F]/10 shadow-lg relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF4B00]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1F1F1F]">
                      Brand Memorability Index
                    </span>
                  </div>
                  <span className="text-xs font-extrabold text-[#FF4B00]">+240% Lift</span>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-[#FFFDF2] border border-[#1F1F1F]/5">
                    <div className="text-xs text-[#1F1F1F]/60 mb-1">Positioning Anchor</div>
                    <div className="text-sm font-bold text-[#1F1F1F]">
                      &ldquo;The Unapologetic Ritual for Curious Everyday Seekers&rdquo;
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FCF5CD]/60 border border-[#1F1F1F]/5">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-[#1F1F1F]">Scroll-Stop Rate</span>
                      <span className="text-xs font-extrabold text-[#FF4B00]">64.8% (Top 1%)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-stone-200 overflow-hidden">
                      <div className="h-full bg-[#FF4B00] rounded-full w-[85%]" />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-[#1F1F1F]/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#FADCC4] flex items-center justify-center text-[#FF4B00]">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#1F1F1F]">Creative Testing Hub</div>
                        <div className="text-[10px] text-stone-500">Weekly UGC & Hook Sprints</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* PANEL 2: 02 REEL */}
      {/* ============================================================== */}
      <div id="reel" className="scroll-mt-24 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="p-8 sm:p-14 lg:p-16 rounded-[2.5rem] bg-[#FFFDF2] border border-[#1F1F1F]/15 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Visual Side (Left on desktop) */}
            <div className="lg:col-span-5 order-2 lg:order-1 flex justify-center">
              <div className="w-full max-w-md p-6 rounded-3xl bg-[#1F1F1F] text-white shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-300">
                      Live Performance Engine
                    </span>
                  </div>
                  <span className="text-xs font-extrabold text-[#FF4B00]">Real-time Attribution</span>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex justify-between items-center">
                    <div>
                      <div className="text-[11px] uppercase tracking-wider text-stone-400">Blended ROAS</div>
                      <div className="text-3xl font-extrabold text-white mt-0.5">4.82x</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] uppercase tracking-wider text-stone-400">New Customer CAC</div>
                      <div className="text-xl font-bold text-emerald-400 mt-0.5">-34% YoY</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex justify-between text-xs mb-2 text-stone-300 font-semibold">
                      <span>Meta + TikTok Creative Testing</span>
                      <span className="text-[#FF4B00]">62 Ads / Month</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#FF4B00] to-amber-400 rounded-full w-[92%]" />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#FF4B00]">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">CRO Lander Conversion</div>
                        <div className="text-[10px] text-stone-400">Dedicated pre-purchase flow</div>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold text-[#FCF5CD]">6.4% CVR</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Side (Right on desktop) */}
            <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4B00] text-white text-xs font-extrabold tracking-[0.2em] uppercase mb-6">
                02 REEL · Performance Marketing
              </div>

              <h3 className="text-3xl sm:text-5xl font-extrabold text-[#1F1F1F] tracking-tight leading-[1.12] mb-4">
                Ads that pay their own way.
              </h3>

              <p className="text-lg sm:text-xl text-[#1F1F1F]/80 font-medium leading-relaxed mb-8">
                Performance marketing built on creative testing, clean data and
                honest reporting.
              </p>

              {/* Signs you need this */}
              <div className="w-full mb-8 p-6 rounded-2xl bg-[#FCF5CD]/40 border border-[#1F1F1F]/8">
                <div className="text-xs font-extrabold tracking-wider uppercase text-[#FF4B00] mb-3 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" />
                  Signs you need this:
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {[
                    "ROAS dropping as you scale spend past $30k/mo",
                    "The same few winning ads running for months with no fresh winners",
                    "Can't tell which channel or campaign really drives incremental profit",
                  ].map((sign) => (
                    <span
                      key={sign}
                      className="px-3.5 py-1.5 rounded-full bg-white text-[#1F1F1F] text-xs font-semibold border border-[#1F1F1F]/10"
                    >
                      {sign}
                    </span>
                  ))}
                </div>
              </div>

              {/* What we do */}
              <div className="w-full mb-8">
                <div className="text-xs font-extrabold tracking-wider uppercase text-[#1F1F1F]/50 mb-3">
                  What we do:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Meta, Google, TikTok and Amazon ads execution",
                    "Creative testing at volume (50+ high-conv ads/mo)",
                    "Dedicated landing pages and continuous CRO sprints",
                    "Server-side tracking, Triple Whale attribution & honest weekly reports",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-sm font-semibold text-[#1F1F1F]">
                      <CheckCircle2 className="w-4 h-4 text-[#FF4B00] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <a
                href="#audit"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#FF4B00] hover:bg-[#E04200] text-white text-sm font-bold tracking-wide transition-all duration-200 shadow-md"
              >
                <span>Get a free ads audit</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* PANEL 3: 03 KEEP */}
      {/* ============================================================== */}
      <div id="keep" className="scroll-mt-24 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="p-8 sm:p-14 lg:p-16 rounded-[2.5rem] bg-[#FCF5CD]/40 border border-[#1F1F1F]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Text Side */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4B00] text-white text-xs font-extrabold tracking-[0.2em] uppercase mb-6">
                03 KEEP · Retention Marketing
              </div>

              <h3 className="text-3xl sm:text-5xl font-extrabold text-[#1F1F1F] tracking-tight leading-[1.12] mb-4">
                Keep them hooked.
              </h3>

              <p className="text-lg sm:text-xl text-[#1F1F1F]/80 font-medium leading-relaxed mb-8">
                We make the second order easier than the first.
              </p>

              {/* Signs you need this */}
              <div className="w-full mb-8 p-6 rounded-2xl bg-white/80 border border-[#1F1F1F]/8">
                <div className="text-xs font-extrabold tracking-wider uppercase text-[#FF4B00] mb-3 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" />
                  Signs you need this:
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {[
                    "Customers buy once and vanish into the ether",
                    "Email strategy is just repetitive discount blasts",
                    "Rising customer acquisition costs are eating your operating margin",
                  ].map((sign) => (
                    <span
                      key={sign}
                      className="px-3.5 py-1.5 rounded-full bg-[#FCF5CD] text-[#1F1F1F] text-xs font-semibold"
                    >
                      {sign}
                    </span>
                  ))}
                </div>
              </div>

              {/* What we do */}
              <div className="w-full mb-8">
                <div className="text-xs font-extrabold tracking-wider uppercase text-[#1F1F1F]/50 mb-3">
                  What we do:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Email and SMS flows (Klaviyo, Attentive & Omnisend)",
                    "WhatsApp VIP journeys and push re-engagement",
                    "Loyalty, referral and recurring subscription architecture",
                    "Cohort retention analysis and true LTV payback reporting",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-sm font-semibold text-[#1F1F1F]">
                      <CheckCircle2 className="w-4 h-4 text-[#FF4B00] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <a
                href="#audit"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#1F1F1F] hover:bg-[#FF4B00] text-white text-sm font-bold tracking-wide transition-all duration-200 shadow-md"
              >
                <span>Get a free retention audit</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* Visual Side */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md p-6 rounded-3xl bg-white border border-[#1F1F1F]/10 shadow-lg relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1F1F1F]">
                      Klaviyo Lifecycle Hub
                    </span>
                  </div>
                  <span className="text-xs font-extrabold text-[#FF4B00]">62% Repeat Rate</span>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-[#FCF5CD]/40 border border-[#1F1F1F]/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#FF4B00] text-white flex items-center justify-center font-bold text-xs">
                        90d
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#1F1F1F]">Second Purchase Velocity</div>
                        <div className="text-[10px] text-stone-500">Accelerated from 110d to 38d</div>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold text-emerald-600">+192%</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-[#1F1F1F]/10">
                    <div className="text-xs font-bold text-[#1F1F1F] mb-1">
                      Automated VIP Replenishment
                    </div>
                    <div className="text-xs text-stone-500 mb-3">
                      Personalized dynamic SMS triggered by consumption cycle.
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-semibold text-[#1F1F1F]/70">
                      <span className="px-2 py-0.5 rounded-sm bg-stone-100">SMS: 42% CVR</span>
                      <span className="px-2 py-0.5 rounded-sm bg-stone-100">Email: $3.80 RPR</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FFFDF2] border border-[#1F1F1F]/5 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <RefreshCw className="w-4 h-4 text-[#FF4B00]" />
                      <span className="text-xs font-bold text-[#1F1F1F]">Subscriber Churn Shield</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      -41% Churn
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
