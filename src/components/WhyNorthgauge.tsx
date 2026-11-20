"use client";

import { useEffect, useRef } from "react";
import { Search, Compass, ArrowUpRight, Users } from "lucide-react";
import { getGsap, prefersReducedMotion } from "@/lib/motion";
import SwipeHint from "./SwipeHint";

const pillars = [
  {
    icon: Search,
    num: "01",
    value: "Curiosity",
    title: "We ask the questions your last agency skipped.",
    body: "Every engagement starts with an audit, not a proposal.",
  },
  {
    icon: Compass,
    num: "02",
    value: "Discovery",
    title: "Creative that's measured.",
    body: "Every idea ships with a hypothesis and a number to beat.",
  },
  {
    icon: ArrowUpRight,
    num: "03",
    value: "Forward-looking",
    title: "One team, full funnel.",
    body: "Brand, ads and retention sit together, so nothing gets lost in a hand-off.",
  },
  {
    icon: Users,
    num: "04",
    value: "Senior craft",
    title: "The people on the call do the work.",
    body: "No junior account layer between you and the thinking.",
  },
];

export default function WhyNorthgauge() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || prefersReducedMotion()) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-pillar]", { y: 120, rotation: (i) => [-6, 4, -4, 6][i], opacity: 0 }, {
        y: 0,
        rotation: 0,
        opacity: 1,
        duration: 1,
        ease: "back.out(1.4)",
        stagger: 0.1,
        scrollTrigger: { trigger: grid, start: "top 80%" },
      });
    }, grid);
    return () => ctx.revert();
  }, []);

  return (
    <section id="why-us" className="relative bg-[#FCF5CD] text-[#1F1F1F] py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 sm:mb-20">
          <div>
            <p className="font-serif italic text-xl sm:text-2xl text-[#FF4B00] leading-none mb-4">How we work</p>
            <h2 className="font-display font-black uppercase text-5xl sm:text-7xl tracking-tight leading-[0.9]">
              A hook for
              <br />
              <span className="text-[#FF4B00]">curious minds.</span>
            </h2>
          </div>
          <p className="text-base font-medium text-[#1F1F1F]/75 max-w-sm">
            Our mark started as a fish hook, simplified into a &lsquo;g&rsquo;. It&apos;s a reminder that the work
            starts with a question.
          </p>
        </div>

        <SwipeHint className="sm:hidden mb-3" />
        <div ref={gridRef} className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-6 px-6 sm:-mx-10 sm:px-10 scroll-px-6 sm:scroll-px-10 gap-4 pb-6 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 sm:overflow-visible sm:mx-0 sm:px-0 sm:pb-0">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.num}
                data-pillar
                className="shrink-0 w-[78%] sm:w-auto snap-start rounded-[28px] p-6 sm:p-7 flex flex-col min-h-[280px] sm:min-h-[320px] bg-[#FFFDF2] border border-[#1F1F1F]/10 transition-[translate,box-shadow] duration-300 hover:-translate-y-2 hover:shadow-[0_24px_50px_-24px_rgba(31,31,31,0.35)]"
              >
                <div className="flex items-center justify-between mb-10">
                  <span className="w-12 h-12 rounded-full flex items-center justify-center bg-[#FF4B00] text-[#FFFDF2]">
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="font-serif italic text-2xl text-[#FF4B00]">{p.num}</span>
                </div>
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] opacity-70 mb-3">{p.value}</div>
                <h3 className="text-2xl font-extrabold leading-tight mb-3">{p.title}</h3>
                <p className="text-sm opacity-80 leading-relaxed mt-auto">{p.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
