"use client";

import { useEffect, useRef } from "react";
import { HOOK_OS_PROOF } from "@/lib/content";
import { getGsap, prefersReducedMotion } from "@/lib/motion";
import Fascinate from "../Fascinate";
import { Counter, Fill, FitButton, GhostButton, Hi } from "../ui";

/** Ad tiles drop into an orange funnel labelled FASCINATE; a winner drops out of the bottom. */
function Funnel() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const { gsap } = getGsap();
    const tiles = el.querySelectorAll<HTMLElement>("[data-drop]");
    const winner = el.querySelector<HTMLElement>("[data-winner]");
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.4, paused: true });
    tiles.forEach((t, i) => {
      tl.fromTo(
        t,
        { y: -40, x: 0, opacity: 0, scale: 1, rotation: (i - 2) * 9 },
        { y: 130, x: () => -parseFloat(t.dataset.x ?? "0"), opacity: 1, scale: 0.35, rotation: 0, duration: 0.9, ease: "power2.in" },
        i * 0.28
      ).to(t, { opacity: 0, duration: 0.15 }, ">-0.1");
    });
    tl.fromTo(winner, { y: -30, scale: 0.4, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.6, ease: "back.out(2)" }, ">-0.1").to(
      winner,
      { opacity: 0, duration: 0.3, delay: 1 }
    );
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? tl.play() : tl.pause()), { threshold: 0.2 });
    io.observe(el);
    return () => {
      io.disconnect();
      tl.kill();
    };
  }, []);

  const xs = [-110, -55, 0, 55, 110];
  const fills = ["#FFFDF2", "#B7B2A7", "#FFC83D", "#B9A6FF", "#FFFDF2"];
  return (
    <div ref={ref} className="relative w-full max-w-md mx-auto h-[360px]" aria-hidden="true">
      {xs.map((x, i) => (
        <div
          key={i}
          data-drop
          data-x={x}
          className="absolute top-6 w-12 h-16 rounded-lg shadow-lg"
          style={{ background: fills[i], left: `calc(50% + ${x - 24}px)`, transform: `rotate(${(i - 2) * 9}deg)` }}
        />
      ))}
      <svg viewBox="0 0 400 160" className="absolute left-0 right-0 top-[120px] w-full" preserveAspectRatio="xMidYMid meet">
        <path d="M10 0 L390 0 L245 110 L245 160 L155 160 L155 110 Z" fill="#FF4B00" />
        <text x="200" y="52" textAnchor="middle" fontWeight="800" fontSize="22" letterSpacing="6" fill="#1F1F1F" style={{ fontFamily: "var(--font-sans)" }}>
          FASCINATE
        </text>
      </svg>
      <div
        data-winner
        className="absolute bottom-0 left-1/2 -ml-8 w-16 h-20 rounded-xl bg-[#FF4B00] border-4 border-[#FFFDF2] shadow-[0_12px_30px_rgba(255,75,0,0.5)] flex items-center justify-center text-[10px] font-extrabold uppercase tracking-wider text-[#FFFDF2]"
      >
        Live
      </div>
    </div>
  );
}

export default function HookOsEdge() {
  return (
    <section id="hook-os" data-marker className="relative bg-[#1F1F1F] text-[#FFFDF2] py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <p className="font-serif italic text-xl sm:text-2xl text-[#FF4B00] leading-none mb-4">Our edge · Built by an ISB-backed team</p>
            <h2 className="font-display font-black uppercase tracking-tight leading-[0.92] text-4xl sm:text-6xl lg:text-7xl">
              Most agencies guess what will work. <Hi>We start from ads that already did.</Hi>
            </h2>
            <p className="mt-6 text-base sm:text-lg font-medium leading-relaxed text-[#FFFDF2]/75 max-w-2xl">
              Hook OS is the system we built to make ads at the speed they die. Every brief starts from a library of
              15,000+ winning ads, ads we&rsquo;ve run and ads we&rsquo;ve reverse-engineered, broken down into the hooks,
              angles and formats that made them work. FASCINATE turns that library into creative for your brand, tested
              every week.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <FitButton label="See how Hook OS works" href="/hook-os" tone="orange" where="hook_os_edge" />
              <GhostButton href="#audit" dark>
                See if you&rsquo;re a fit
              </GhostButton>
            </div>
          </div>

          <div className="lg:col-span-5 text-center">
            <div className="font-display font-black text-7xl sm:text-8xl text-[#FF4B00] leading-none tracking-tight">
              <Counter to={15000} />
            </div>
            <p className="mt-3 text-sm font-bold uppercase tracking-[0.16em] text-[#FFFDF2]/70">
              winning ads with proven spend behind them
            </p>
            <Funnel />
          </div>
        </div>

        <div className="mt-16 sm:mt-20">
          <Fascinate dark line="Every ad we make is scored against all nine before it goes live." />
        </div>

        <dl className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { v: HOOK_OS_PROOF.adsShipped, l: "ads shipped through Hook OS" },
            { v: HOOK_OS_PROOF.beatAveragePct, l: "of tested ads beat the account average" },
            { v: HOOK_OS_PROOF.daysBriefToLive, l: "days from brief to live" },
          ].map((s) => (
            <div key={s.l} className="rounded-2xl border border-[#FFFDF2]/12 p-6">
              <dd className="font-display font-black text-5xl text-[#FFFDF2] leading-none">
                <Fill text={s.v} />
              </dd>
              <dt className="mt-2 text-sm font-semibold text-[#FFFDF2]/65">{s.l}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
