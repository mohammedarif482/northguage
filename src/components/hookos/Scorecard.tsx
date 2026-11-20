"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Check } from "lucide-react";
import { SCORECARD_LINES } from "@/lib/content";
import { getGsap, prefersReducedMotion } from "@/lib/motion";
import { Fill, Hi, SectionHead } from "../ui";

const metrics = [
  {
    m: "Hook rate",
    what: "3-second views ÷ impressions. Did the first frame earn attention?",
    line: SCORECARD_LINES.hook,
    below: "Re-cut the first 3 seconds only. The body stays",
  },
  {
    m: "Hold rate",
    what: "Watched to the end ÷ 3-second views. Did the story keep the promise?",
    line: SCORECARD_LINES.hold,
    below: "Tighten the middle and move the payoff earlier",
  },
  {
    m: "Click-through rate",
    what: "Did they want the product, or just the video?",
    line: SCORECARD_LINES.ctr,
    below: "Rework the offer and the call to action, not the creative",
  },
  { m: "Cost per purchase", what: "Can the margin carry it?", line: "Below your break-even CPA", below: "Kill it, whatever the other numbers say" },
  { m: "Spend before verdict", what: "Was the test fair?", line: SCORECARD_LINES.spend, below: "Keep it running. No verdicts on noise" },
];

const patterns = [
  { p: "High hook, low hold", d: "the opening over-promised", fix: "same hook, new body" },
  { p: "Low hook, high hold", d: "a great ad nobody sees", fix: "same body, 4 new hooks" },
  { p: "High CTR, low conversion", d: "the ad works, the landing page doesn’t", fix: "fix the page before the ad" },
  { p: "Strong everything, rising cost", d: "fatigue", fix: "refresh the angle, move budget on" },
  { p: "Low CTR, cheap purchases", d: "pulling the right few buyers", fix: "scale carefully, ignore CTR" },
];

// Sample scorecard: bar lengths are illustrative shapes only, no figures are claimed.
const sample = [
  { ad: "Ad A", verdict: "Scale", bars: [0.85, 0.7, 0.6, 0.85], lesson: "Before and after beats ingredient-first on cold traffic" },
  { ad: "Ad B", verdict: "Iterate", bars: [0.3, 0.8, 0.55, 0.5], lesson: "Strong story, weak first frame. Test 4 new hooks" },
  { ad: "Ad C", verdict: "Kill", bars: [0.65, 0.4, 0.7, 0.15], lesson: "Discount-first messaging trains the wrong buyer" },
];
const verdictTone: Record<string, string> = {
  Scale: "bg-[#FF4B00] text-[#FFFDF2]",
  Iterate: "bg-[#FFC83D] text-[#1F1F1F]",
  Kill: "bg-[#1F1F1F] text-[#FFFDF2]",
};

export function Scorecard() {
  const sampleRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = sampleRef.current;
    if (!el || prefersReducedMotion()) return;
    const { gsap } = getGsap();
    const tw = gsap.from(el.querySelectorAll("[data-bar]"), {
      scaleX: 0,
      transformOrigin: "0 50%",
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.04,
      scrollTrigger: { trigger: el, start: "top 80%" },
    });
    return () => {
      tw.scrollTrigger?.kill();
      tw.kill();
    };
  }, []);

  return (
    <section id="scorecard" data-marker className="relative bg-[#1F1F1F] text-[#FFFDF2] py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <SectionHead
          dark
          eyebrow="How content gets judged"
          title={
            <>
              No likes. No reach. <Hi>Just the money.</Hi>
            </>
          }
          body="Every variant gets a verdict within 72 hours. One metric on its own tells you nothing. The pattern between them tells you exactly what to fix."
          className="mb-12 sm:mb-16"
        />

        {/* Metric table */}
        <div className="rounded-[28px] bg-[#FFFDF2] text-[#1F1F1F] overflow-hidden">
          <div className="hidden md:grid grid-cols-12 gap-4 px-7 py-4 bg-[#FCF5CD] text-[11px] font-bold uppercase tracking-[0.16em] text-[#1F1F1F]/65">
            <span className="col-span-3">Metric</span>
            <span className="col-span-4">What it really measures</span>
            <span className="col-span-2">Our starting line</span>
            <span className="col-span-3">Below it, we…</span>
          </div>
          <ul className="divide-y divide-[#1F1F1F]/10">
            {metrics.map((r) => (
              <li key={r.m} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-6 sm:px-7 py-5 items-start">
                <span className="md:col-span-3 font-extrabold text-lg">{r.m}</span>
                <span className="md:col-span-4 text-sm text-[#1F1F1F]/70 leading-relaxed">{r.what}</span>
                <span className="md:col-span-2 font-display font-black text-xl text-[#FF4B00]">
                  <Fill text={r.line} />
                </span>
                <span className="md:col-span-3 text-sm font-semibold leading-relaxed">{r.below}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-4 text-sm text-[#FFFDF2]/60">Starting lines are recalibrated to your account in week one.</p>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Pattern cards */}
          <div className="lg:col-span-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#FFFDF2]/60 mb-4">Read the pattern</h3>
            <ul className="space-y-3">
              {patterns.map((p) => (
                <li key={p.p} className="rounded-2xl border border-[#FFFDF2]/12 bg-[#FFFDF2]/[0.04] p-5">
                  <p className="font-extrabold text-base">
                    {p.p}: <span className="font-medium text-[#FFFDF2]/70">{p.d}</span>
                  </p>
                  <p className="mt-1.5 inline-flex items-center gap-2 text-sm font-bold text-[#FF4B00]">
                    <ArrowRight className="w-4 h-4" /> {p.fix}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Sample scorecard */}
          <div className="lg:col-span-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#FFFDF2]/60">Sample scorecard</h3>
              <span className="ng-sticker bg-[#FFFDF2]/10 text-[#FFFDF2] shadow-none text-[10px]">Illustrative</span>
            </div>
            <div ref={sampleRef} className="space-y-3">
              {sample.map((s) => (
                <article key={s.ad} className="rounded-2xl bg-[#FFFDF2] text-[#1F1F1F] p-5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-extrabold">{s.ad}</span>
                    <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider ${verdictTone[s.verdict]}`}>{s.verdict}</span>
                  </div>
                  <dl className="grid grid-cols-4 gap-3" aria-hidden="true">
                    {["Hook", "Hold", "CTR", "Cost/purchase"].map((label, i) => (
                      <div key={label}>
                        <dt className="text-[10px] font-bold uppercase tracking-wider text-[#1F1F1F]/55 mb-1.5 truncate">{label}</dt>
                        <dd className="h-2 rounded-full bg-[#1F1F1F]/10 overflow-hidden">
                          <span data-bar className={`block h-full rounded-full ${s.verdict === "Kill" && i === 3 ? "bg-[#1F1F1F]" : "bg-[#FF4B00]"}`} style={{ width: `${s.bars[i] * 100}%` }} />
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-4 flex items-start gap-2 text-sm font-semibold">
                    <Check className="w-4 h-4 text-[#FF4B00] mt-0.5 shrink-0" strokeWidth={3} />
                    {s.lesson}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- What's in, what's at cost ---------------- */

export function InAtCost() {
  return (
    <section id="costs" data-marker className="relative bg-[#FCF5CD] py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <SectionHead
          eyebrow="What's in, what's at cost"
          title={
            <>
              What&rsquo;s in. <Hi>What&rsquo;s at cost.</Hi>
            </>
          }
          body="Hidden creative cost is one of the top complaints about agencies. So here is the full list, before you ask."
          className="mb-12"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rounded-[28px] bg-[#FFFDF2] p-7 sm:p-9">
            <h3 className="font-display font-black uppercase text-3xl tracking-tight leading-none mb-6">Included in your fee</h3>
            <ul className="space-y-3">
              {["Static ad variants", "Edits and cut-downs of existing footage", "Creative direction and briefs", "Testing plan and weekly scorecard"].map((x) => (
                <li key={x} className="flex items-start gap-2.5 font-semibold">
                  <Check className="w-4 h-4 mt-1 text-[#FF4B00] shrink-0" strokeWidth={3} />
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[28px] bg-[#1F1F1F] text-[#FFFDF2] p-7 sm:p-9">
            <h3 className="font-display font-black uppercase text-3xl tracking-tight leading-none mb-6">Billed at cost, shown on the invoice</h3>
            <ul className="space-y-3">
              {["Shoot days", "UGC creator fees", "Influencer fees"].map((x) => (
                <li key={x} className="flex items-start gap-2.5 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF4B00] mt-2.5 shrink-0" />
                  {x}
                </li>
              ))}
            </ul>
            <p className="mt-6 pt-5 border-t border-[#FFFDF2]/15 font-extrabold text-[#FF4B00]">Nothing else. If it isn&rsquo;t listed, it&rsquo;s included.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
