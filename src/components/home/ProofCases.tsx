"use client";

import { useEffect, useRef } from "react";
import { MAIN_CASES } from "@/lib/content";
import { getGsap, prefersReducedMotion } from "@/lib/motion";
import SwipeHint from "../SwipeHint";
import { Fill, Hi, SectionHead } from "../ui";

const stickers = ["bg-[#FF4B00] text-[#FFFDF2] -rotate-3", "bg-[#FFC83D] text-[#1F1F1F] rotate-2", "bg-[#B9A6FF] text-[#1F1F1F] -rotate-2"];

export default function ProofCases() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || prefersReducedMotion()) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-case]",
        { y: 80, rotation: (i) => [-3, 3, -2][i] ?? 0, opacity: 0 },
        { y: 0, rotation: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.12, scrollTrigger: { trigger: grid, start: "top 80%" } }
      );
    }, grid);
    return () => ctx.revert();
  }, []);

  return (
    <section id="work" data-marker className="relative bg-[#FFFDF2] py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <SectionHead
          eyebrow="Proof, in P&L format"
          title={
            <>
              Results, reported in full. <Hi>Including the difficult months.</Hi>
            </>
          }
          body="Every case shows the same five numbers over the same 12 months: spend, revenue, new customers, cost per new customer, and what went wrong on the way."
          className="mb-12 sm:mb-16"
        />

        <SwipeHint className="lg:hidden mb-3" />
        <div
          ref={gridRef}
          className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-6 px-6 sm:-mx-10 sm:px-10 gap-4 pb-6 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:mx-0 lg:px-0"
        >
          {MAIN_CASES.map((c, i) => (
            <article
              key={c.category}
              data-case
              className="shrink-0 w-[86%] sm:w-[60%] lg:w-auto snap-start rounded-[28px] bg-[#FFFDF2] border border-[#1F1F1F]/10 p-7 sm:p-8 flex flex-col shadow-[0_24px_60px_-28px_rgba(31,31,31,0.35)]"
            >
              <span className={`ng-sticker self-start ${stickers[i]}`}>{c.category}</span>
              <h3 className="mt-5 text-2xl font-extrabold">
                <Fill text={c.client} />
              </h3>
              <dl className="mt-5 divide-y divide-[#1F1F1F]/10 border-y border-[#1F1F1F]/10">
                {c.rows.map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-4 py-3">
                    <dt className="text-sm font-semibold text-[#1F1F1F]/70">{k}</dt>
                    <dd className="font-display font-black text-2xl text-[#FF4B00] tabular-nums">
                      <Fill text={v} />
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 space-y-4 text-sm leading-relaxed">
                <p>
                  <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-[#1F1F1F]/55 mb-1">What went wrong</span>
                  <Fill text={c.wrong} />
                </p>
                <p>
                  <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-[#FF4B00] mb-1">What we changed</span>
                  <Fill text={c.changed} />
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
