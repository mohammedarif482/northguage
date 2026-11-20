"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { getGsap, prefersReducedMotion } from "@/lib/motion";
import { prefillBooking } from "@/lib/prefill";
import { useRegion, type Region } from "@/lib/region";
import { track } from "@/lib/track";
import { FitButton, Hi } from "../ui";

/* ---------- Copy: edit here only ---------- */
type Opt = [label: string, key: string];

const SPEND: Record<Region, Opt[]> = {
  in: [
    ["Under ₹5 lakh", "low"],
    ["₹5 to 12 lakh", "a"],
    ["₹12 to 30 lakh", "b"],
    ["₹30 lakh+", "c"],
  ],
  gl: [
    ["$50k and under", "a"],
    ["$50k to 100k", "a"],
    ["$100k to 250k", "b"],
    ["$250k+", "c"],
  ],
};

const Q: { q: string; key: "spend" | "pain" | "cm"; opts: Opt[] | null }[] = [
  { q: "What is your monthly ad spend?", key: "spend", opts: null },
  {
    q: "What hurts most right now?",
    key: "pain",
    opts: [
      ["ROAS looks fine, profit does not", "margin"],
      ["Results fade after a few weeks", "creative"],
      ["Spend more, ROAS drops", "scale"],
      ["Customers buy once and vanish", "retention"],
    ],
  },
  {
    q: "Do you know your contribution margin per order, after ads, returns and shipping?",
    key: "cm",
    opts: [
      ["Yes, exactly", "yes"],
      ["Roughly", "rough"],
      ["No", "no"],
      ["What is contribution margin?", "no"],
    ],
  },
];

const LEAK: Record<string, { title: string; fixes: string[]; bg: string; ink: string }> = {
  margin: {
    title: "Your leak is measurement.",
    fixes: [
      "Pull last month’s Shopify orders and match them against Meta-reported purchases. The gap is your attribution inflation.",
      "Work out break-even ROAS per hero SKU with the calculator below.",
      "Judge campaigns on blended revenue over total ad spend for 14 days, not on in-platform ROAS.",
    ],
    bg: "bg-[#FF4B00]",
    ink: "text-[#FFFDF2]",
  },
  creative: {
    title: "Your leak is creative fatigue.",
    fixes: [
      "Count how many genuinely new concepts went live in the last 30 days. Under 8 is the problem.",
      "Ship 4 new hooks on your best-performing angle this week: same body, new first 3 seconds.",
      "Kill any ad with frequency above 3 and falling CTR, instead of raising its budget.",
    ],
    bg: "bg-[#FFC83D]",
    ink: "text-[#1F1F1F]",
  },
  scale: {
    title: "Your leak is how you scale.",
    fixes: [
      "Raise budgets on winners by 20% every 2 to 3 days instead of doubling them overnight.",
      "Separate testing and scaling campaigns so new creative is not starved by old winners.",
      "Set a contribution-margin floor per campaign and pull spend from anything below it for 7 days.",
    ],
    bg: "bg-[#B9A6FF]",
    ink: "text-[#1F1F1F]",
  },
  retention: {
    title: "Your leak is the second order.",
    fixes: [
      "Check your repeat rate at 60 and 90 days. Under 20% means acquisition is paying for retention you do not have.",
      "Switch on a 3-step post-purchase flow: usage tip, review ask, replenishment reminder.",
      "Time a reorder nudge to the day the product usually runs out, not to a calendar.",
    ],
    bg: "bg-[#FFFDF2]",
    ink: "text-[#1F1F1F]",
  },
};
/* ------------------------------------------ */

function Quiz({ region }: { region: Region }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<{ key: string; label: string }[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);
  const hookRef = useRef<HTMLDivElement>(null);
  const done = step >= Q.length;
  const pain = answers[1]?.key;
  const leak = LEAK[pain ?? "margin"] ?? LEAK.margin;

  useEffect(() => {
    const card = cardRef.current;
    if (!card || prefersReducedMotion()) return;
    const { gsap } = getGsap();
    const tl = gsap.timeline();
    tl.fromTo(card, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" });
    if (done && hookRef.current) {
      // The hook drops on its line and "catches" the diagnosis card.
      tl.fromTo(hookRef.current, { yPercent: -160, rotation: -18 }, { yPercent: 0, rotation: 0, duration: 0.9, ease: "bounce.out" }, 0).fromTo(
        card,
        { rotation: -3 },
        { rotation: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" },
        0.55
      );
    }
    return () => {
      tl.kill();
    };
  }, [step, done]);

  const choose = (opt: Opt) => {
    const next = [...answers.slice(0, step), { key: opt[1], label: opt[0] }];
    setAnswers(next);
    setStep(step + 1);
    if (step + 1 >= Q.length) {
      const l = LEAK[next[1]?.key] ?? LEAK.margin;
      track("leak_test_complete", { leak: next[1]?.key, spend: next[0]?.label, cm: next[2]?.key, region });
      prefillBooking({
        notes: `Leak test: ${l.title} Spend: ${next[0]?.label}. Biggest problem: ${next[1]?.label}. Knows contribution margin: ${next[2]?.label}.`,
      });
    }
  };

  const restart = () => {
    setAnswers([]);
    setStep(0);
  };

  const opts = done ? [] : (Q[step].opts ?? SPEND[region]);

  return (
    <>
      {/* progress */}
      <ol className="flex items-center gap-2 mb-6" aria-label="Progress">
        {Q.map((_, i) => (
          <li
            key={i}
            aria-current={i === step ? "step" : undefined}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i < step ? "w-10 bg-[#FF4B00]" : i === step ? "w-10 bg-[#FFFDF2]" : "w-6 bg-[#FFFDF2]/20"
            }`}
          />
        ))}
        <li className="ml-3 text-xs font-bold uppercase tracking-wider text-[#FFFDF2]/60">
          {done ? "Your diagnosis" : `Question ${step + 1} of ${Q.length}`}
        </li>
      </ol>

      {done && (
        <div ref={hookRef} aria-hidden="true" className="absolute -top-28 right-10 z-20 flex flex-col items-center pointer-events-none">
          <div className="w-[2px] h-20 bg-[#FFFDF2]/60" />
          <div
            className="w-10 aspect-[203.66/357.03] bg-[#FFFDF2] -mt-1"
            style={{
              maskImage: "url(/northgauge-hook.svg)",
              WebkitMaskImage: "url(/northgauge-hook.svg)",
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
            }}
          />
        </div>
      )}

      <div
        ref={cardRef}
        key={step}
        aria-live="polite"
        className={`relative rounded-[28px] p-7 sm:p-10 shadow-2xl ${done ? `${leak.bg} ${leak.ink}` : "bg-[#FFFDF2] text-[#1F1F1F]"}`}
      >
        {!done ? (
          <>
            <div className="flex items-center justify-between mb-6 min-h-5">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#1F1F1F]/60">Question {step + 1}</span>
              {step > 0 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1F1F1F]/60 hover:text-[#FF4B00]"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
              )}
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-8">{Q[step].q}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {opts.map((o) => (
                <button
                  key={o[0]}
                  type="button"
                  onClick={() => choose(o)}
                  className={`text-left px-5 py-4 rounded-2xl border-2 text-base font-bold transition-all duration-150 hover:-translate-y-0.5 hover:border-[#FF4B00] hover:bg-[#FCF5CD] focus-visible:outline-2 focus-visible:outline-[#FF4B00] ${
                    answers[step]?.label === o[0] ? "border-[#FF4B00] bg-[#FCF5CD]" : "border-[#1F1F1F]/12 bg-white"
                  }`}
                >
                  {o[0]}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <span className="ng-sticker bg-[#1F1F1F] text-[#FFFDF2] -rotate-3 mb-5">Your diagnosis</span>
            <h3 className="font-display font-black uppercase text-4xl sm:text-6xl tracking-tight leading-[0.9] mb-6">{leak.title}</h3>
            <ol className="space-y-3 mb-6">
              {leak.fixes.map((f, i) => (
                <li key={f} className="flex gap-3 text-sm sm:text-base font-semibold">
                  <span className="font-serif italic text-xl leading-none opacity-80">0{i + 1}</span>
                  <span>{f}</span>
                </li>
              ))}
            </ol>
            {answers[2]?.key !== "yes" && (
              <p className="text-sm font-medium opacity-85 mb-6">
                You also said you do not know your contribution margin exactly. That is the first thing we fix, whatever the leak.
              </p>
            )}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-6 border-t border-current/20">
              <FitButton where="leak_test" />
              <button
                type="button"
                onClick={restart}
                className="inline-flex items-center justify-center gap-1.5 px-5 py-3 text-xs font-bold uppercase tracking-wider opacity-80 hover:opacity-100"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Start again
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default function LeakTest() {
  const region = useRegion();
  return (
    <section id="leak-test" data-marker className="relative bg-[#1F1F1F] text-[#FFFDF2] py-24 sm:py-32 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-display font-black uppercase leading-none text-[22vw] tracking-tighter text-transparent pointer-events-none select-none whitespace-nowrap"
        style={{ WebkitTextStroke: "1.5px rgba(255,253,242,0.08)" }}
      >
        Margin
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-5">
          <p className="font-serif italic text-xl sm:text-2xl text-[#FF4B00] leading-none mb-4">Free · 30 seconds</p>
          <h2 className="font-display font-black uppercase text-5xl sm:text-7xl tracking-tight leading-[0.9] mb-6">
            Where is your <Hi>margin leaking?</Hi>
          </h2>
          <p className="text-base sm:text-lg text-[#FFFDF2]/75 font-medium max-w-md">
            Three questions. You get a diagnosis and three fixes you can run this week, whether or not you ever speak to us.
          </p>
        </div>
        <div className="lg:col-span-7 relative">
          {/* Region change restarts the quiz with the right spend bands */}
          <Quiz key={region} region={region} />
        </div>
      </div>
    </section>
  );
}
