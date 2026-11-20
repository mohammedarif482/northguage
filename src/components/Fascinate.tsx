"use client";

import { useState } from "react";

export const FASCINATE = [
  { l: "F", name: "Famous face", d: "A face the viewer already trusts or recognises, in the first frame." },
  { l: "A", name: "Authority", d: "Proof the brand has earned the right to make the claim." },
  { l: "S", name: "Stakes", d: "Make it clear what the viewer loses by scrolling past." },
  { l: "C", name: "Controversy", d: "Take a side the category avoids, so people stop to agree or argue." },
  { l: "I", name: "Insight", d: "Something true about their problem they hadn’t put into words." },
  { l: "N", name: "Novel visual", d: "An image the feed hasn’t shown them a hundred times today." },
  { l: "A", name: "Actionable value", d: "Something useful before asking for anything." },
  { l: "T", name: "Tension", d: "Open a promise early, pay it off late, so they watch to the end." },
  { l: "E", name: "Editing", d: "Cuts, captions and pacing built to stop the thumb." },
];

/**
 * The nine FASCINATE tiles. Hover, focus or tap opens a tile; its meaning shows in the readout.
 */
export default function Fascinate({ dark = false, line }: { dark?: boolean; line: string }) {
  const [active, setActive] = useState<number | null>(null);
  const cur = active === null ? null : FASCINATE[active];

  return (
    <div>
      <div className="grid grid-cols-3 sm:grid-cols-9 gap-2 sm:gap-3" onMouseLeave={() => setActive(null)}>
        {FASCINATE.map((f, i) => {
          const on = active === i;
          return (
            <button
              key={f.name}
              type="button"
              aria-pressed={on}
              aria-describedby="fascinate-readout"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(on ? null : i)}
              className={`group relative rounded-2xl aspect-[4/5] sm:aspect-[3/5] flex flex-col items-center justify-center gap-1 sm:gap-2 p-2 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[#FF4B00] ${
                on
                  ? "bg-[#FF4B00] text-[#FFFDF2] -translate-y-1.5 -rotate-2 shadow-[0_18px_30px_-12px_rgba(255,75,0,0.55)]"
                  : dark
                    ? "bg-[#FFFDF2]/8 text-[#FFFDF2] hover:bg-[#FFFDF2]/12"
                    : "bg-[#FFFDF2] text-[#1F1F1F] border border-[#1F1F1F]/10 hover:border-[#1F1F1F]/25"
              }`}
            >
              <span className="font-display font-black text-4xl sm:text-5xl leading-none">{f.l}</span>
              <span className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-center leading-tight ${on ? "" : "opacity-70"}`}>
                {f.name}
              </span>
            </button>
          );
        })}
      </div>

      <div
        id="fascinate-readout"
        aria-live="polite"
        className={`mt-4 min-h-[76px] rounded-2xl px-5 sm:px-7 py-4 flex items-center gap-4 ${
          dark ? "bg-[#FFFDF2]/6 text-[#FFFDF2]" : "bg-[#1F1F1F] text-[#FFFDF2]"
        }`}
      >
        {cur ? (
          <>
            <span className="font-display font-black text-4xl text-[#FF4B00] leading-none shrink-0">{cur.l}</span>
            <p className="text-sm sm:text-base font-medium">
              <span className="font-extrabold">{cur.name}:</span> {cur.d.charAt(0).toLowerCase() + cur.d.slice(1)}
            </p>
          </>
        ) : (
          <p className="text-sm sm:text-base font-bold">
            <span className="text-[#FF4B00] mr-2">✦</span>
            {line}
          </p>
        )}
      </div>
    </div>
  );
}
