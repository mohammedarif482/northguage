"use client";

import { useState } from "react";
import { HOOK_OS_LOOP_CENTRE } from "@/lib/content";
import Fascinate from "../Fascinate";
import { Fill, Hi, SectionHead } from "../ui";

/* ---------------- The problem ---------------- */

export function HookProblem() {
  const cards = [
    { n: "01", t: "Two to four ads a month", b: "That is what most retainers ship. Fatigue sets in by month two and ROAS falls with it." },
    { n: "02", t: "Organic and paid never meet", b: "Your best-performing Reel never becomes an ad. Your best ad never shapes the next Reel." },
    { n: "03", t: "Reports count posts", b: "“16 posts delivered” tells you what was made, not what it sold. It is the wrong question." },
  ];
  return (
    <section id="problem" data-marker className="relative bg-[#1F1F1F] text-[#FFFDF2] py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <SectionHead
          dark
          eyebrow="The problem"
          title={
            <>
              Ads got expensive. <Hi>Content got ignored.</Hi>
            </>
          }
          body="Meta CPMs are up 40 to 60% since 2023. The only lever left that you fully control is the creative. Most brands still split it across a social agency that counts likes and a performance agency that runs out of ads."
          className="mb-12 sm:mb-16"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {cards.map((c, i) => (
            <article
              key={c.n}
              className={`rounded-[24px] p-7 sm:p-8 ${i === 1 ? "bg-[#FF4B00]" : "bg-[#FFFDF2]/[0.05] border border-[#FFFDF2]/10"}`}
            >
              <span className="font-serif italic text-3xl leading-none">{c.n}</span>
              <h3 className="mt-4 font-display font-black uppercase text-3xl tracking-tight leading-[0.95]">{c.t}</h3>
              <p className="mt-4 text-base leading-relaxed opacity-80">{c.b}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- How Hook OS runs (#how) ---------------- */

const STATIONS = [
  {
    k: "mine",
    n: "01",
    name: "Mine",
    copy: "Every brief starts in the 15,000+ library: ads that ran with real money behind them, broken down into hooks, angles and formats. Then your reviews, comments and competitors’ live ads, turned into angles your buyers already use.",
    pos: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
  },
  {
    k: "make",
    n: "02",
    name: "Make",
    copy: "One idea becomes four first-three-seconds, not one finished ad. Every variant is scored against all nine FASCINATE elements before it goes live, and a strategist signs off every asset.",
    pos: "top-1/2 right-0 translate-x-1/2 -translate-y-1/2",
  },
  {
    k: "test",
    n: "03",
    name: "Test",
    copy: "Variants go out as Reels and as paid tests at the same time. Each gets a fair spend and a verdict inside 72 hours, not at month end.",
    pos: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
  },
  {
    k: "scale",
    n: "04",
    name: "Scale",
    copy: "Winners move into paid with budget behind them. Losers are killed, and what they taught us goes straight into next week’s brief.",
    pos: "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2",
  },
];

const TILES = 8;

export function HookLoop() {
  const [active, setActive] = useState(0);
  const s = STATIONS[active];
  const c = HOOK_OS_LOOP_CENTRE;

  return (
    <section id="how" data-marker className="relative bg-[#FCF5CD] py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <SectionHead
          eyebrow="How Hook OS runs"
          title={
            <>
              A testing system, <Hi>not a content calendar.</Hi>
            </>
          }
          body="One weekly loop. Every piece of content has a job, a hypothesis and a number to beat. Tap a station to see what happens there."
          className="mb-14 sm:mb-20"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-center">
          {/* Ring with orbiting ad tiles; winners in orange */}
          <div className="lg:col-span-6 px-10 sm:px-14">
            <div className="relative aspect-square w-full max-w-[460px] mx-auto">
              <div className="absolute inset-[8%] rounded-full border-[18px] border-[#1F1F1F]/10" aria-hidden="true" />
              <div className="absolute inset-0" aria-hidden="true" style={{ ["--orbit-r" as string]: "42%" }}>
                {Array.from({ length: TILES }, (_, i) => (
                  <span
                    key={i}
                    className={`ng-orbit-tile absolute top-0 left-0 w-6 h-8 sm:w-7 sm:h-9 rounded-md shadow-md ${
                      i % 3 === 1 ? "bg-[#FF4B00]" : "bg-[#FFFDF2] border border-[#1F1F1F]/15"
                    }`}
                    style={{ animationDelay: `${(-16 / TILES) * i}s`, offsetDistance: `${(100 / TILES) * i}%` }}
                  />
                ))}
              </div>

              {/* Centre readout */}
              <div className="absolute inset-[26%] rounded-full bg-[#1F1F1F] text-[#FFFDF2] flex flex-col items-center justify-center text-center p-4">
                <span className="font-display font-black text-2xl sm:text-3xl leading-none">
                  Week <Fill text={c.week} />
                </span>
                <span className="mt-2 text-[11px] sm:text-xs font-bold leading-snug text-[#FFFDF2]/80">
                  <Fill text={c.variantsLive} /> variants live
                  <br />
                  <Fill text={c.winnersScaled} /> winners scaled
                </span>
                <span className="mt-2 text-[9px] font-bold uppercase tracking-[0.2em] text-[#FF4B00]">Illustrative</span>
              </div>

              {/* Stations */}
              <div role="tablist" aria-label="Hook OS stations">
                {STATIONS.map((st, i) => (
                  <button
                    key={st.k}
                    id={`station-${st.k}`}
                    type="button"
                    role="tab"
                    aria-selected={active === i}
                    aria-controls="station-card"
                    onClick={() => setActive(i)}
                    className={`absolute ${st.pos} z-10 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-lg transition-all ${
                      active === i ? "bg-[#FF4B00] text-[#FFFDF2] scale-110" : "bg-[#FFFDF2] text-[#1F1F1F] hover:bg-white hover:scale-105"
                    }`}
                  >
                    {st.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div
              id="station-card"
              role="tabpanel"
              aria-labelledby={`station-${s.k}`}
              aria-live="polite"
              className="rounded-[28px] bg-[#FFFDF2] p-7 sm:p-10 shadow-[0_24px_60px_-24px_rgba(31,31,31,0.35)]"
            >
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#FF4B00]">
                {s.n} · {s.name}
              </span>
              <h3 className="mt-2 font-display font-black uppercase text-5xl sm:text-6xl tracking-tight leading-none">{s.name}</h3>
              <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#1F1F1F]/80">{s.copy}</p>
              <div className="mt-8 flex gap-2" aria-hidden="true">
                {STATIONS.map((x, i) => (
                  <span key={x.k} className={`h-1.5 rounded-full transition-all ${i === active ? "w-10 bg-[#FF4B00]" : "w-5 bg-[#1F1F1F]/15"}`} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 sm:mt-20">
          <Fascinate line="Every ad is scored against all nine FASCINATE elements at the Make station before it goes live." />
        </div>
      </div>
    </section>
  );
}
