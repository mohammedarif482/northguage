"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { getGsap, prefersReducedMotion } from "@/lib/motion";
import { Hi, R, SectionHead } from "../ui";

type Stage = {
  num: string;
  move: string;
  headline: ReactNode;
  system: string;
  what: string;
  get: string;
  answer: string;
  bg: string;
  ink: string;
  muted: string;
  chip: string;
};

const stages: Stage[] = [
  {
    num: "01",
    move: "Measure",
    headline: (
      <>
        Find the leak before you spend another <R india="rupee" global="dollar" />.
      </>
    ),
    system: "Audit OS",
    what: "Every purchase Meta and Google claim is matched against real Shopify orders, and every hero SKU is priced to its true break-even. The audit runs in a fixed order, so no account is diagnosed from the symptom.",
    get: "Attribution gap, break-even ROAS per SKU, your three biggest leaks ranked",
    answer: "Contribution margin per order",
    bg: "bg-[#FF4B00]",
    ink: "text-[#FFFDF2]",
    muted: "text-[#FFFDF2]/80",
    chip: "bg-[#1F1F1F] text-[#FFFDF2]",
  },
  {
    num: "02",
    move: "Make",
    headline: "Creative at the speed ads die.",
    system: "Hook OS",
    what: "Briefs written from live account data and the 15,000+ library, produced as variants of one idea and scored on FASCINATE. AI-assisted production, with a strategist signing off every asset.",
    get: "Your contracted creative count, every month, on a weekly testing calendar",
    answer: "Hook rate and cost per purchase",
    bg: "bg-[#FFC83D]",
    ink: "text-[#1F1F1F]",
    muted: "text-[#1F1F1F]/75",
    chip: "bg-[#1F1F1F] text-[#FFFDF2]",
  },
  {
    num: "03",
    move: "Scale",
    headline: "Budget follows margin, not the platform.",
    system: "Eye of Soren",
    what: "Our ad intelligence layer watches every account daily for fatigue, spend anomalies and attribution gaps. Testing and scaling run apart, and spend moves only above the margin floor.",
    get: "A weekly read of what to scale, fix or kill",
    answer: "Cost per new customer",
    bg: "bg-[#B9A6FF]",
    ink: "text-[#1F1F1F]",
    muted: "text-[#1F1F1F]/75",
    chip: "bg-[#1F1F1F] text-[#FFFDF2]",
  },
  {
    num: "04",
    move: "Keep",
    headline: "Make the second order the easy one.",
    system: "Revenue Engine",
    what: "Post-purchase, replenishment and win-back flows, plus landing page and checkout tests built from real visitor session recordings.",
    get: "Flows live, tests running, repeat revenue reported monthly",
    answer: "Repeat rate at 60 and 90 days",
    bg: "bg-[#1F1F1F]",
    ink: "text-[#FFFDF2]",
    muted: "text-[#FFFDF2]/75",
    chip: "bg-[#FF4B00] text-[#FFFDF2]",
  },
];

export default function GaugeMethod() {
  const deckRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const deck = deckRef.current;
    if (!deck || prefersReducedMotion()) return;
    const { gsap } = getGsap();
    const cards = gsap.utils.toArray<HTMLElement>("[data-stage]", deck);
    const tw = gsap.fromTo(
      cards,
      { y: 120, rotation: (i) => [-5, 4, -3, 5][i], opacity: 0 },
      {
        y: 0,
        rotation: 0,
        opacity: 1,
        duration: 1,
        ease: "back.out(1.3)",
        stagger: 0.12,
        scrollTrigger: { trigger: deck, start: "top 80%" },
      }
    );
    return () => {
      tw.scrollTrigger?.kill();
      tw.kill();
    };
  }, []);

  return (
    <section id="method" data-marker className="relative bg-[#FCF5CD] py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="relative">
          <SectionHead
            eyebrow="The Gauge Method"
            title={
              <>
                Four moves. Four systems. <Hi>One P&amp;L.</Hi>
              </>
            }
            body="Most agencies run on people and spreadsheets. We run every account through four systems we built ourselves, so the work gets sharper with every client."
            className="mb-14 sm:mb-20"
          />
          <span className="ng-sticker hidden md:inline-flex absolute right-[4%] top-4 rotate-6 bg-[#1F1F1F] text-[#FFFDF2]">
            Audit OS · Hook OS · Eye of Soren · Revenue Engine
          </span>
        </div>

        <div ref={deckRef} className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {stages.map((s) => (
            <article
              key={s.move}
              data-stage
              className={`relative rounded-[28px] p-7 sm:p-10 flex flex-col shadow-[0_24px_60px_-20px_rgba(31,31,31,0.35)] ${s.bg} ${s.ink}`}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <span className="font-serif italic text-3xl leading-none">{s.num}</span>
                <span className={`ng-sticker ${s.chip} -rotate-2`}>{s.system}</span>
              </div>
              <h3 className="font-display font-black uppercase text-5xl sm:text-6xl tracking-tight leading-[0.85]">{s.move}</h3>
              <p className="mt-4 text-xl sm:text-2xl font-extrabold leading-snug">{s.headline}</p>
              <p className={`mt-4 text-sm sm:text-base leading-relaxed ${s.muted}`}>{s.what}</p>
              <dl className="mt-auto pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-current/20">
                <div>
                  <dt className={`text-[11px] font-bold uppercase tracking-[0.16em] ${s.muted}`}>You get</dt>
                  <dd className="mt-1 text-sm font-bold leading-snug">{s.get}</dd>
                </div>
                <div>
                  <dt className={`text-[11px] font-bold uppercase tracking-[0.16em] ${s.muted}`}>We answer to</dt>
                  <dd className="mt-1 text-sm font-bold leading-snug">{s.answer}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>

        <p className="mt-12 sm:mt-16 text-center text-lg sm:text-2xl font-bold leading-snug max-w-3xl mx-auto">
          Every system feeds the next. What Measure finds sets the briefs. What Hook OS makes, we scale.{" "}
          <span className="text-[#FF4B00]">What we scale, Keep brings back.</span>
        </p>
      </div>
    </section>
  );
}
