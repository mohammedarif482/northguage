"use client";

import { useEffect, useRef } from "react";
import { heroEntrance } from "@/lib/hero";
import { HERO_ADS, STATS } from "@/lib/content";
import { useSplashDone } from "../SiteShell";
import SpinBadge from "../SpinBadge";
import Media from "../Media";
import { D, FitButton, GhostButton, IsbBadge, R, SmartLink, Ticks } from "../ui";

const pills = [
  { label: "Ads", href: "/media-buying", pos: "sm:-top-6 sm:right-[-4%]", rot: "-rotate-[4deg]" },
  { label: "Creative", href: "/hook-os", pos: "sm:top-[42%] sm:left-[-9%]", rot: "rotate-[3deg]" },
  { label: "Retention", href: "#method", pos: "sm:bottom-[4%] sm:right-[-7%]", rot: "-rotate-[3deg]" },
];

const tileTones = ["orange", "charcoal", "sun", "lilac"] as const;

export default function Hero() {
  const ready = useSplashDone();
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ready || !rootRef.current) return;
    return heroEntrance(rootRef.current);
  }, [ready]);

  return (
    <section
      ref={rootRef}
      id="top"
      data-marker
      className="relative pt-36 sm:pt-44 pb-28 sm:pb-36 bg-[#FCF5CD] hairline-b overflow-hidden"
    >
      {/* Orange loops, left and right */}
      <div
        data-hero-anim
        data-hero-loop
        aria-hidden="true"
        className="absolute -left-16 sm:-left-28 lg:-left-32 top-[2%] sm:top-[14%] w-36 sm:w-[22rem] lg:w-[26rem] h-[260px] sm:h-[940px] lg:h-[1080px] pointer-events-none z-0"
      >
        <svg viewBox="0 0 229 599" fill="none" className="w-full h-full">
          <path
            d="M33.502 584.112C104.502 557.112 147.911 474.964 143.002 393.612C139.502 335.612 106.002 281.612 59.0025 252.612C7.82072 221.032 -4.20053 385.572 52.5031 405.612C140.218 436.612 225.002 369.112 212.002 252.612C208.376 220.111 192.539 178.612 152.002 121.612C117.866 73.6124 42.0029 11.6124 42.0029 11.6124"
            stroke="#FF4B00"
            strokeWidth="24"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div
        data-hero-anim
        data-hero-loop
        aria-hidden="true"
        className="absolute -right-24 sm:-right-48 lg:-right-56 bottom-[30%] sm:bottom-auto sm:top-[10%] w-52 sm:w-[32rem] lg:w-[38rem] h-[280px] sm:h-[700px] lg:h-[820px] pointer-events-none z-0"
      >
        <svg viewBox="0 0 354 487" fill="none" className="w-full h-full">
          <path
            d="M250.687 12.2982C192.69 52.7982 114.69 199.814 245.687 315.798C376.684 431.783 364.19 140.889 235.187 83.2982C153.19 46.6926 54.8365 106.798 30.1893 172.298C-59.5565 410.798 277.687 471.798 277.687 471.798"
            stroke="#FF4B00"
            strokeWidth="24"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Rotating trigger into the leak test */}
      <div data-hero-anim data-hero-pop className="hidden xl:block absolute left-[6%] top-[46%] z-20 -rotate-6">
        <SpinBadge href="#leak-test" text="30-second leak test ✦ find your leak ✦ " ariaLabel="Take the 30-second leak test" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 w-full relative z-10 text-center flex flex-col items-center">
        <p data-hero-anim data-hero-fade className="font-serif italic text-xl sm:text-2xl text-[#1F1F1F]/80 leading-tight mb-4 sm:mb-6">
          For D2C brands spending <R india="₹8 lakh+" global="$50k+" /> a month
        </p>

        <div className="relative inline-block max-w-full">
          <h1 className="font-display font-black uppercase tracking-tight sm:tracking-tighter leading-[0.88] text-[2.9rem] sm:text-7xl md:text-8xl lg:text-[length:min(8.4rem,13vh)] xl:text-[length:min(9rem,14vh)]">
            <span className="block overflow-hidden pb-1">
              <span data-hero-anim data-hero-line className="block text-[#FF4B00] will-change-transform">
                Your growth
              </span>
            </span>
            <span className="block overflow-hidden pb-1 mt-1 sm:mt-2">
              <span data-hero-anim data-hero-line className="block text-[#FF4B00] will-change-transform">
                isn&rsquo;t stuck.
              </span>
            </span>
            <span className="block overflow-hidden pb-1 mt-1 sm:mt-2">
              <span data-hero-anim data-hero-line className="block text-[#1F1F1F] will-change-transform">
                It&rsquo;s leaking.
              </span>
            </span>
          </h1>

          {/* Service stickers: Ads · Creative · Retention */}
          <div className="flex justify-center gap-2 mt-4 sm:mt-0">
            {pills.map((p) => (
              <SmartLink
                key={p.label}
                href={p.href}
                data-hero-anim
                data-hero-pop
                className={`hero-sticker-pill static sm:absolute text-[11.5px] px-3.5 py-2 sm:text-[13px] sm:px-5 sm:py-[9px] transition-transform hover:scale-110 hover:rotate-0 hover:bg-black ${p.pos} ${p.rot}`}
              >
                {p.label}
              </SmartLink>
            ))}
          </div>
        </div>

        <p data-hero-anim data-hero-fade className="mt-6 sm:mt-8 text-base sm:text-lg text-[#1F1F1F]/80 font-medium leading-relaxed max-w-2xl">
          Most founders think they need more ad spend. They usually have one leak: the gap between ROAS on the dashboard
          and margin in the bank. We find yours in a free P&amp;L audit, then run ads, creative and retention to close it.
        </p>

        <div data-hero-anim data-hero-fade className="mt-7 flex flex-col sm:flex-row items-center gap-3">
          <FitButton where="hero" />
          <GhostButton href="#leak-test" down>
            Take the 30-second leak test
          </GhostButton>
        </div>

        {/* Ads strip (replaces the hero video) */}
        <div className="relative w-full max-w-4xl mt-14 sm:mt-16">
          <span data-hero-anim data-hero-pop className="ng-sticker absolute -top-4 left-2 sm:left-6 z-20 -rotate-6 bg-[#FF4B00] text-[#FFFDF2]">
            ✦ Ads we&rsquo;ve made
          </span>
          <div className="flex items-end justify-center gap-2.5 sm:gap-5">
            {HERO_ADS.map((ad, i) => (
              <div
                key={i}
                data-hero-anim
                data-hero-card
                className={`${ad.aspect === "9/16" ? "w-[21%]" : "w-[26%]"} rounded-2xl shadow-[0_24px_50px_-20px_rgba(31,31,31,0.45)] will-change-transform`}
              >
                <Media item={ad} tone={tileTones[i]} sizes="(min-width: 1024px) 240px, 25vw" />
              </div>
            ))}
          </div>
        </div>

        {/* Proof row */}
        <div data-hero-anim data-hero-fade className="w-full mt-14 sm:mt-16 pt-8 border-t border-[#1F1F1F]/12">
          <div className="flex flex-wrap items-center justify-center gap-x-8 sm:gap-x-12 gap-y-5">
            <div className="text-left">
              <div className="font-display font-black text-3xl sm:text-4xl text-[#FF4B00] leading-none">Since 2022</div>
              <div className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] text-[#1F1F1F]/70 mt-1.5">Growing D2C brands</div>
            </div>
            <div className="text-left">
              <div className="font-display font-black text-3xl sm:text-4xl text-[#FF4B00] leading-none">
                <D v={STATS.adSpend} />
              </div>
              <div className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] text-[#1F1F1F]/70 mt-1.5">Ad spend managed</div>
            </div>
            <div className="text-left">
              <div className="font-display font-black text-3xl sm:text-4xl text-[#FF4B00] leading-none">
                <D v={STATS.agenciesReplaced} />
              </div>
              <div className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] text-[#1F1F1F]/70 mt-1.5">Agencies replaced</div>
            </div>
            <IsbBadge className="rotate-2" />
          </div>

          <Ticks
            className="mt-8"
            items={[
              "You own every ad account",
              "Named Growth Lead in the contract",
              "90-day start, then a 30-day exit",
              "Zero markup on ad spend",
              { text: "Senior team on your working hours", only: "global" },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
