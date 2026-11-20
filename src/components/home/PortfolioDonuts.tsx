"use client";

import { useEffect, useRef } from "react";
import { INDUSTRY, STAGE, STAGE_PREVIEW } from "@/lib/content";
import { getGsap, prefersReducedMotion } from "@/lib/motion";
import { Hi, SectionHead } from "../ui";

type Row = { label: string; note?: string; value: number | null; highlight?: boolean };

const INDUSTRY_COLOURS = ["#FF4B00", "#1F1F1F", "#B7B2A7", "#F2B38F", "#E8DFB8"];

function Donut({ title, data, preview, colours }: { title: string; data: Row[]; preview?: number[]; colours: string[] }) {
  const ref = useRef<SVGSVGElement>(null);
  const filled = data.every((d) => typeof d.value === "number");
  const vals = data.map((d, i) => (filled ? (d.value as number) : preview ? preview[i] : 1));
  const total = vals.reduce((a, b) => a + b, 0) || 1;
  const r = 70;
  const C = 2 * Math.PI * r;
  const lens = vals.map((v) => (C * v) / total);
  const segs = lens.map((len, i) => ({
    len,
    off: lens.slice(0, i).reduce((a, b) => a + b, 0),
    colour: colours[i],
    wide: !!data[i].highlight,
  }));

  useEffect(() => {
    const svg = ref.current;
    if (!svg || prefersReducedMotion()) return;
    const { gsap } = getGsap();
    const tw = gsap.from(svg.querySelectorAll("circle"), {
      strokeDasharray: `0 ${C}`,
      duration: 1.1,
      ease: "power3.out",
      stagger: 0.12,
      scrollTrigger: { trigger: svg, start: "top 80%" },
    });
    return () => {
      tw.scrollTrigger?.kill();
      tw.kill();
    };
  }, [C]);

  return (
    <figure className="rounded-[28px] bg-[#FFFDF2] p-7 sm:p-10 shadow-[0_24px_60px_-24px_rgba(31,31,31,0.3)]">
      <figcaption className="text-xs font-bold uppercase tracking-[0.18em] text-[#1F1F1F]/65 mb-6">{title}</figcaption>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
        <div className="relative w-full max-w-[240px] mx-auto aspect-square">
          <svg ref={ref} viewBox="0 0 180 180" className="w-full h-full -rotate-90" aria-hidden="true">
            {segs.map((s, i) => (
              <circle
                key={i}
                cx="90"
                cy="90"
                r={r}
                fill="none"
                stroke={s.colour}
                strokeWidth={s.wide ? 30 : 24}
                strokeDasharray={`${Math.max(s.len - 2, 0)} ${C - s.len + 2}`}
                strokeDashoffset={-s.off}
              />
            ))}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <b className="font-display font-black text-4xl leading-none">
              {filled ? vals.reduce((a, b) => a + b, 0) : <span className="ng-slot">[X]</span>}
            </b>
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#1F1F1F]/60 mt-1">brands</span>
          </div>
        </div>
        <ul className="space-y-3">
          {data.map((d, i) => (
            <li key={d.label} className="flex items-start gap-3">
              <i className="w-3 h-3 rounded-full mt-1.5 shrink-0" style={{ background: colours[i] }} aria-hidden="true" />
              <span className={`flex-1 text-sm ${d.highlight ? "font-extrabold text-[#FF4B00]" : "font-bold"}`}>
                {d.label}
                {d.note && <small className="block text-xs font-medium text-[#1F1F1F]/60">{d.note}</small>}
              </span>
              <b className="text-sm font-extrabold tabular-nums">
                {filled ? `${Math.round((100 * (d.value as number)) / total)}%` : <span className="ng-slot">[X]%</span>}
              </b>
            </li>
          ))}
        </ul>
      </div>
    </figure>
  );
}

export default function PortfolioDonuts() {
  const stageColours = STAGE.map((s, i) => (s.highlight ? "#FF4B00" : i === 0 ? "#1F1F1F" : "#B7B2A7"));
  return (
    <section id="portfolio" className="relative bg-[#FCF5CD] py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <SectionHead
          eyebrow="Our portfolio"
          title={
            <>
              Who we grow, <Hi>and where they are now.</Hi>
            </>
          }
          className="mb-12 sm:mb-16"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
          <Donut title="Clients by industry" data={INDUSTRY} colours={INDUSTRY_COLOURS} />
          <Donut title="Clients by stage with us" data={STAGE} preview={STAGE_PREVIEW} colours={stageColours} />
        </div>
      </div>
    </section>
  );
}
