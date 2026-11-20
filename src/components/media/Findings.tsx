"use client";

import { useEffect, useRef } from "react";
import { MB_AUDIT_CASES, MB_PHASE_CASES } from "@/lib/content";
import { getGsap, prefersReducedMotion } from "@/lib/motion";
import SwipeHint from "../SwipeHint";
import { D, Hi, R, SectionHead } from "../ui";

/* ---------------- What we find in the audit ---------------- */

const findings = [
  {
    n: "01",
    title: "It double-counts",
    body: "Meta and Google both claim the same order. Add the two dashboards together and you’ve sold more than Shopify says you did.",
    seen: MB_AUDIT_CASES.doubleCounts,
  },
  {
    n: "02",
    title: "It counts placed orders",
    body: (
      <>
        <R india="RTO and returns" global="Returns and cancellations" /> never reach the ad dashboard. The ads get credit for sales you never got
        paid for.
      </>
    ),
    seen: MB_AUDIT_CASES.placedOrders,
  },
  {
    n: "03",
    title: "It ignores fatigue",
    body: "Scaling a winner without fresh creative behind it works for two weeks. Then frequency climbs and the cost per purchase follows.",
    seen: MB_AUDIT_CASES.fatigue,
  },
];

export function AuditFindings() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-find]",
        { y: 90, rotation: (i) => [-4, 3, -3][i], opacity: 0 },
        { y: 0, rotation: 0, opacity: 1, duration: 0.9, ease: "back.out(1.4)", stagger: 0.12, scrollTrigger: { trigger: el, start: "top 80%" } }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="findings" data-marker className="relative bg-[#FFFDF2] py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <SectionHead
          eyebrow="What we find in the audit"
          title={
            <>
              Platform ROAS is <Hi>your agency&rsquo;s favourite number.</Hi>
            </>
          }
          body="It shouldn't be yours. Three things make it lie, and they get worse the more you spend."
          className="mb-12 sm:mb-16"
        />
        <SwipeHint className="lg:hidden mb-3" />
        <div
          ref={ref}
          className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-6 px-6 sm:-mx-10 sm:px-10 gap-4 pb-6 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:mx-0 lg:px-0"
        >
          {findings.map((f, i) => (
            <article
              key={f.n}
              data-find
              className={`shrink-0 w-[86%] sm:w-[60%] lg:w-auto snap-start rounded-[28px] p-7 sm:p-9 flex flex-col shadow-[0_24px_60px_-24px_rgba(31,31,31,0.35)] ${
                i === 0 ? "bg-[#FF4B00] text-[#FFFDF2]" : i === 1 ? "bg-[#1F1F1F] text-[#FFFDF2]" : "bg-[#FCF5CD] text-[#1F1F1F]"
              }`}
            >
              <span className="font-serif italic text-3xl leading-none">{f.n}</span>
              <h3 className="mt-4 font-display font-black uppercase text-3xl sm:text-4xl tracking-tight leading-[0.92]">{f.title}</h3>
              <p className="mt-4 text-base leading-relaxed opacity-85">{f.body}</p>
              <p className="mt-auto pt-6 text-sm font-bold border-t border-current/20">
                <D v={f.seen} />
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Growth plan phases ---------------- */

const phases = [
  {
    name: "Foundation",
    when: "Weeks 1 to 2",
    what: "Pixel and Conversions API checked against Shopify, margin baseline, break-even ROAS per SKU, account rebuilt for testing.",
    gate: "Tracking matches orders within an agreed gap",
    seen: MB_PHASE_CASES.foundation,
  },
  {
    name: "Prove",
    when: "Weeks 3 to 6",
    what: "Weekly creative tests on Meta from Hook OS. Winners found, losers killed fast.",
    gate: "A repeatable winner above break-even",
    seen: MB_PHASE_CASES.prove,
  },
  {
    name: "Scale",
    when: "Weeks 7 to 12",
    what: "Budget raised in steps on winners above the margin floor. Retention flows catch every new buyer.",
    gate: "Spend up, contribution margin held",
    seen: MB_PHASE_CASES.scale,
  },
  {
    name: "Expand",
    when: "Month 4 onwards",
    what: "Google, then quick commerce and DSP, added one at a time and judged on blended margin.",
    gate: "Each new channel adds margin, not just revenue",
    seen: MB_PHASE_CASES.expand,
  },
];

export function GrowthPlan() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-rail]", { scaleX: 0 }, { scaleX: 1, ease: "none", transformOrigin: "0 50%", scrollTrigger: { trigger: el, start: "top 75%", end: "bottom 60%", scrub: 0.6 } });
      gsap.utils.toArray<HTMLElement>("[data-phase]").forEach((p) =>
        gsap.from(p, { y: 50, opacity: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: p, start: "top 85%" } })
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="plan" data-marker className="relative bg-[#FCF5CD] py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <SectionHead
          eyebrow="The growth plan"
          title={
            <>
              Four phases. <Hi>Each with a gate.</Hi>
            </>
          }
          body="Nothing moves to the next phase until the last one has earned it. That is how spend grows without margin falling."
          className="mb-12 sm:mb-16"
        />

        <div ref={ref} className="relative">
          {/* Rail fills as you scroll */}
          <div className="hidden lg:block absolute left-0 right-0 top-[22px] h-[3px] bg-[#1F1F1F]/12 rounded-full">
            <div data-rail className="h-full bg-[#FF4B00] rounded-full" />
          </div>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {phases.map((p, i) => (
              <li key={p.name} data-phase className="relative">
                <span className="relative z-10 w-11 h-11 rounded-full bg-[#1F1F1F] text-[#FFFDF2] font-serif italic text-lg flex items-center justify-center border-4 border-[#FCF5CD]">
                  {i + 1}
                </span>
                <div className="mt-5 rounded-[24px] bg-[#FFFDF2] p-6 sm:p-7 h-[calc(100%-4rem)] flex flex-col shadow-[0_18px_40px_-24px_rgba(31,31,31,0.35)]">
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#1F1F1F]/55">{p.when}</span>
                  <h3 className="mt-1 font-display font-black uppercase text-3xl tracking-tight leading-none">{p.name}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-[#1F1F1F]/75">{p.what}</p>
                  <div className="mt-5 rounded-xl bg-[#FF4B00] text-[#FFFDF2] px-4 py-3">
                    <span className="block text-[10px] font-bold uppercase tracking-[0.18em] opacity-80">Gate</span>
                    <span className="text-sm font-bold leading-snug">{p.gate}</span>
                  </div>
                  <p className="mt-auto pt-5 text-xs font-bold text-[#1F1F1F]/70">
                    <D v={p.seen} />
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Our structure: four stacked layers ---------------- */

const layers = [
  { layer: "Test", meta: "Separate testing campaign, fixed budget, 4 to 8 new variants a week", google: "Search query mining to find demand worth buying" },
  { layer: "Scale", meta: "Proven winners only, budget moved by margin floor", google: "Brand and non-brand Search, Shopping, Performance Max" },
  { layer: "Retarget", meta: "Short window, matched to how long buyers take to decide", google: "Remarketing and YouTube" },
  { layer: "Exclude", meta: "Existing buyers kept out of prospecting and handed to retention", google: "Customer lists excluded from acquisition" },
];

export function Structure() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      // Layers drop onto the stack one by one.
      gsap.from("[data-layer]", { y: -60, opacity: 0, duration: 0.7, ease: "bounce.out", stagger: 0.15, scrollTrigger: { trigger: el, start: "top 75%" } });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="structure" data-marker className="relative bg-[#1F1F1F] text-[#FFFDF2] py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <SectionHead
          dark
          eyebrow="Our structure"
          title={
            <>
              Four layers. <Hi>Every account.</Hi>
            </>
          }
          body="Every account we run is built the same way, so new creative never fights old winners and existing buyers never get bought twice."
          className="mb-12 sm:mb-16"
        />

        <div className="hidden md:grid grid-cols-12 gap-4 px-7 mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#FFFDF2]/50">
          <span className="col-span-3">Layer</span>
          <span className="col-span-5">Meta</span>
          <span className="col-span-4">Google</span>
        </div>
        <div ref={ref} className="space-y-3">
          {layers.map((l, i) => (
            <div
              key={l.layer}
              data-layer
              className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 items-center rounded-[22px] px-6 sm:px-7 py-5 sm:py-6"
              style={{
                background: ["#FF4B00", "#E04200", "#3A3936", "#2C2B29"][i],
                marginLeft: `${i * 1.25}%`,
                marginRight: `${(3 - i) * 1.25}%`,
              }}
            >
              <span className="md:col-span-3 font-display font-black uppercase text-3xl sm:text-4xl tracking-tight leading-none">{l.layer}</span>
              <p className="md:col-span-5 text-sm sm:text-base font-semibold leading-snug">
                <span className="md:hidden text-[10px] font-bold uppercase tracking-[0.18em] opacity-60 block mb-0.5">Meta</span>
                {l.meta}
              </p>
              <p className="md:col-span-4 text-sm sm:text-base font-medium leading-snug text-[#FFFDF2]/80">
                <span className="md:hidden text-[10px] font-bold uppercase tracking-[0.18em] opacity-60 block mb-0.5">Google</span>
                {l.google}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
