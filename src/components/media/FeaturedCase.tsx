"use client";

import { ArrowDown } from "lucide-react";
import { MB_FEATURED } from "@/lib/content";
import { D, Fill } from "../ui";

/** Hero strip: the one featured media buying case. */
export default function FeaturedCase() {
  const f = MB_FEATURED;
  return (
    <a
      href="#cases"
      className="group w-full max-w-3xl flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 rounded-[22px] sm:rounded-full bg-[#1F1F1F] text-[#FFFDF2] pl-5 pr-3 py-3 text-left shadow-[0_18px_40px_-20px_rgba(31,31,31,0.6)] -rotate-1 hover:rotate-0 transition-transform"
    >
      <span className="ng-sticker bg-[#FF4B00] text-[#FFFDF2] shadow-none shrink-0 self-start sm:self-auto">Featured case</span>
      <span className="text-sm font-semibold leading-snug flex-1">
        <b className="font-extrabold">
          <Fill text={f.client} />
        </b>{" "}
        · <Fill text={f.category} /> · <D v={f.spend} /> monthly spend → <Fill text={f.roas} /> blended ROAS · Contribution margin{" "}
        <Fill text={f.margin} /> in <Fill text={f.months} /> months
      </span>
      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF4B00] shrink-0 pr-2">
        Read the case <ArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" />
      </span>
    </a>
  );
}
