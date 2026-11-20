"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight, RotateCcw } from "lucide-react";
import { getGsap, prefersReducedMotion } from "@/lib/motion";
import { prefillAudit } from "@/lib/prefill";

type MoveKey = "hook" | "reel" | "keep";
type Score = Partial<Record<MoveKey, number>>;
type Option = { label: string; score?: Score; budget?: "under 10k" | "10–50k" | "50k+ USD" };
type Question = { q: string; options: Option[] };

const questions: Question[] = [
  {
    q: "What's keeping you up at night?",
    options: [
      { label: "People don't remember us", score: { hook: 2 } },
      { label: "Ads got expensive", score: { reel: 2 } },
      { label: "Customers don't come back", score: { keep: 2 } },
      { label: "Honestly? All of it", score: { hook: 1, reel: 1, keep: 1 } },
    ],
  },
  {
    q: "Where does most of your growth come from today?",
    options: [
      { label: "Word of mouth & organic", score: { reel: 2 } },
      { label: "Paid social", score: { hook: 1, keep: 1 } },
      { label: "Repeat customers", score: { hook: 1, reel: 1 } },
      { label: "Not sure, to be honest", score: { reel: 1, keep: 1 } },
    ],
  },
  {
    q: "Roughly, your monthly marketing budget?",
    options: [
      { label: "Under $10k", budget: "under 10k" },
      { label: "$10k – $50k", budget: "10–50k" },
      { label: "$50k+", budget: "50k+ USD" },
    ],
  },
];

const results: Record<
  MoveKey,
  { need: "Hook" | "Reel" | "Keep"; headline: string; diagnosis: string; fixes: string[]; bg: string; ink: string }
> = {
  hook: {
    need: "Hook",
    headline: "Your leak is the Hook.",
    diagnosis: "People see you, then forget you. Spend is buying attention you can't keep hold of.",
    fixes: [
      "Write your 'only we' claim in one sentence, then test it as three ad openers.",
      "Check your first three seconds: is the brand visible before the thumb moves?",
      "Pick one distinctive asset (a colour, a sound, a shape) and use it everywhere.",
    ],
    bg: "bg-[#FF4B00]",
    ink: "text-[#FFFDF2]",
  },
  reel: {
    need: "Reel",
    headline: "Your leak is the Reel.",
    diagnosis: "There's demand, but paid isn't converting it efficiently, or you can't tell what's working.",
    fixes: [
      "Separate prospecting from retargeting before you judge ROAS.",
      "Ship ten new hooks a week and kill the losers inside 72 hours.",
      "Send cold traffic to a focused landing page, not your homepage.",
    ],
    bg: "bg-[#FFC83D]",
    ink: "text-[#1F1F1F]",
  },
  keep: {
    need: "Keep",
    headline: "Your leak is the Keep.",
    diagnosis: "You're paying to acquire the same kind of customer over and over. The second order is where the profit hides.",
    fixes: [
      "Add a day-7 'how's it going?' message before any discount ever goes out.",
      "Build a replenishment flow timed to how long the product actually lasts.",
      "Track second-order rate by monthly cohort, not as one blended number.",
    ],
    bg: "bg-[#B9A6FF]",
    ink: "text-[#1F1F1F]",
  },
};

// Variable reward: a different field note each time.
const fieldNotes = [
  "Most 'creative fatigue' is really same-idea fatigue.",
  "If you can't say why you're different in seven words, neither can your ads.",
  "A discount is a retention tactic you pay for twice.",
  "The best-performing ad is usually the one the founder thought was too weird.",
  "Attribution is a compass, not a map.",
  "Curiosity is the cheapest media you'll ever buy.",
];

function pickFieldNote(exclude?: string) {
  const pool = fieldNotes.filter((n) => n !== exclude);
  return pool[Math.floor(Math.random() * pool.length)];
}

export default function LeakFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [note, setNote] = useState(fieldNotes[0]);
  const cardRef = useRef<HTMLDivElement>(null);
  const hookRef = useRef<HTMLDivElement>(null);

  const done = step >= questions.length;

  const score: Record<MoveKey, number> = { hook: 0, reel: 0, keep: 0 };
  let budget: Option["budget"];
  answers.forEach((a, qi) => {
    const opt = questions[qi].options[a];
    Object.entries(opt.score ?? {}).forEach(([k, v]) => (score[k as MoveKey] += v ?? 0));
    if (opt.budget) budget = opt.budget;
  });
  // Ties resolve in funnel order: Hook → Reel → Keep.
  const leak = (Object.keys(score) as MoveKey[]).reduce((a, b) => (score[b] > score[a] ? b : a), "hook");
  const result = results[leak];

  // Animate each step change; on the result, the hook drops on its line and "catches" the card.
  useEffect(() => {
    const card = cardRef.current;
    if (!card || prefersReducedMotion()) return;
    const { gsap } = getGsap();
    const tl = gsap.timeline();
    tl.fromTo(card, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" });
    if (done && hookRef.current) {
      tl.fromTo(
        hookRef.current,
        { yPercent: -160, rotation: -18 },
        { yPercent: 0, rotation: 0, duration: 0.9, ease: "bounce.out" },
        0
      ).fromTo(card, { rotation: -3 }, { rotation: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" }, 0.55);
    }
    return () => {
      tl.kill();
    };
  }, [step, done]);

  const choose = (i: number) => {
    const next = [...answers.slice(0, step), i];
    setAnswers(next);
    if (step + 1 >= questions.length) {
      setNote((prev) => pickFieldNote(prev));
    }
    setStep(step + 1);
  };

  const restart = () => {
    setAnswers([]);
    setStep(0);
  };

  const sendToAudit = () => {
    prefillAudit({ need: result.need, budget, note: `Leak Finder: ${result.headline}` });
  };

  return (
    <section id="leak-finder" className="relative bg-[#1F1F1F] text-[#FFFDF2] py-24 sm:py-32 overflow-hidden">
      {/* giant outline word */}
      <div
        aria-hidden="true"
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-display font-black uppercase leading-none text-[22vw] tracking-tighter text-transparent pointer-events-none select-none whitespace-nowrap"
        style={{ WebkitTextStroke: "1.5px rgba(255,253,242,0.08)" }}
      >
        Curious
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left: pitch */}
        <div className="lg:col-span-5">
          <p className="font-serif italic text-xl sm:text-2xl text-[#FF4B00] leading-none mb-4">Try this first</p>
          <h2 className="font-display font-black uppercase text-5xl sm:text-7xl tracking-tight leading-[0.9] mb-6">
            Where&apos;s your
            <br />
            <span className="text-[#FF4B00]">growth leaking?</span>
          </h2>
          <p className="text-base sm:text-lg text-[#FFFDF2]/75 font-medium max-w-md mb-8">
            Three questions, about thirty seconds. You get an honest diagnosis and three fixes you can try this week,
            whether or not you ever talk to us.
          </p>

          {/* progress */}
          <ol className="flex items-center gap-2" aria-label="Progress">
            {questions.map((_, i) => (
              <li
                key={i}
                aria-current={i === step ? "step" : undefined}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i < step ? "w-10 bg-[#FF4B00]" : i === step ? "w-10 bg-[#FFFDF2]" : "w-6 bg-[#FFFDF2]/20"
                }`}
              />
            ))}
            <li className="ml-3 text-xs font-bold uppercase tracking-wider text-[#FFFDF2]/60">
              {done ? "Done" : `${step + 1} / ${questions.length}`}
            </li>
          </ol>
        </div>

        {/* Right: card */}
        <div className="lg:col-span-7 relative">
          {done && (
            <div ref={hookRef} aria-hidden="true" className="absolute -top-28 left-10 z-20 flex flex-col items-center pointer-events-none">
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
            className={`relative rounded-[28px] p-7 sm:p-10 shadow-2xl ${
              done ? `${result.bg} ${result.ink}` : "bg-[#FFFDF2] text-[#1F1F1F]"
            }`}
          >
            {!done ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#1F1F1F]/60">
                    Question {step + 1}
                  </span>
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
                <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-8">{questions[step].q}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {questions[step].options.map((o, i) => (
                    <button
                      key={o.label}
                      type="button"
                      onClick={() => choose(i)}
                      className={`text-left px-5 py-4 rounded-2xl border-2 text-base font-bold transition-all duration-150 hover:-translate-y-0.5 hover:border-[#FF4B00] hover:bg-[#FCF5CD] focus-visible:outline-2 focus-visible:outline-[#FF4B00] ${
                        answers[step] === i ? "border-[#FF4B00] bg-[#FCF5CD]" : "border-[#1F1F1F]/12 bg-white"
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between mb-5">
                  <span className="ng-sticker bg-[#1F1F1F] text-[#FFFDF2] -rotate-3">Your diagnosis</span>
                  <button
                    type="button"
                    onClick={restart}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider opacity-70 hover:opacity-100"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Retake
                  </button>
                </div>
                <h3 className="font-display font-black uppercase text-4xl sm:text-6xl tracking-tight leading-[0.9] mb-4">
                  {result.headline}
                </h3>
                <p className="text-base sm:text-lg font-medium opacity-85 mb-6 max-w-xl">{result.diagnosis}</p>

                <ol className="space-y-3 mb-8">
                  {result.fixes.map((f, i) => (
                    <li key={f} className="flex gap-3 text-sm sm:text-base font-semibold">
                      <span className="font-serif italic text-xl leading-none opacity-80">0{i + 1}</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ol>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pt-6 border-t border-current/20">
                  <p className="text-sm italic opacity-80 max-w-xs">
                    <span className="not-italic font-bold">Field note:</span> {note}
                  </p>
                  <a
                    href="#audit"
                    onClick={sendToAudit}
                    className="inline-flex items-center gap-3 pl-5 pr-2 py-2 rounded-full bg-[#1F1F1F] text-[#FFFDF2] text-xs font-bold uppercase tracking-wider group shrink-0"
                  >
                    <span>Send this to my free audit</span>
                    <span className="w-8 h-8 rounded-full bg-[#FF4B00] flex items-center justify-center transition-transform group-hover:rotate-45">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
