"use client";

import { useEffect, useRef } from "react";
import { Check, X } from "lucide-react";
import { getGsap, prefersReducedMotion } from "@/lib/motion";
import { FitButton, Hi, SectionHead } from "./ui";

/* ---------- Spend gauge geometry: a half dial from 180° (left) to 0° (right) ---------- */
const CX = 200;
const CY = 200;
const RAD = 150;

function polar(deg: number, r = RAD) {
  const a = (deg * Math.PI) / 180;
  return [CX + r * Math.cos(a), CY - r * Math.sin(a)] as const;
}
function arc(from: number, to: number) {
  const [x1, y1] = polar(from);
  const [x2, y2] = polar(to);
  return `M ${x1} ${y1} A ${RAD} ${RAD} 0 0 1 ${x2} ${y2}`;
}

type Zone = { from: number; to: number; color: string; name: string; band: string };

const GLOBAL: Zone[] = [
  { from: 180, to: 110, color: "#B7B2A7", name: "Not yet", band: "under $50k" },
  { from: 110, to: 0, color: "#FF4B00", name: "Fit", band: "$50k+" },
];
const INDIA: Zone[] = [
  { from: 180, to: 128, color: "#B7B2A7", name: "Not yet", band: "under ₹5 L" },
  { from: 128, to: 88, color: "#1F1F1F", name: "With a 90-day plan", band: "₹5 to 8 L" },
  { from: 88, to: 0, color: "#FF4B00", name: "Fit", band: "₹8 L+" },
];

function ZoneGroup({ zones, className }: { zones: Zone[]; className: string }) {
  return (
    <g className={className}>
      {zones.map((z) => {
        const gap = 1.2;
        return (
          <path
            key={z.name}
            d={arc(z.from - (z.from === 180 ? 0 : gap), z.to + (z.to === 0 ? 0 : gap))}
            stroke={z.color}
            strokeWidth={38}
            fill="none"
          />
        );
      })}
      {zones.map((z) => {
        const mid = (z.from + z.to) / 2;
        const [x, y] = polar(mid, RAD + 44);
        const anchor = mid > 100 ? "end" : mid < 80 ? "start" : "middle";
        return (
          <text key={z.name} x={x} y={y} textAnchor={anchor} style={{ fontFamily: "var(--font-sans)" }}>
            <tspan x={x} fontSize="14" fontWeight="800" fill="#1F1F1F">
              {z.name}
            </tspan>
            <tspan x={x} dy="17" fontSize="13" fontWeight="600" fill="#1F1F1F" fillOpacity="0.6">
              {z.band}
            </tspan>
          </text>
        );
      })}
    </g>
  );
}

const fitIf = [
  "You sell in beauty and personal care, health and nutrition, or fashion",
  "You will share order, margin and returns data",
  "You want one team accountable for the whole P&L",
  "You want content and ads judged on sales",
];
const notIf = [
  "The product has no proof of demand yet",
  "You want only posting, or “someone to run ads”",
  "You want guaranteed ROAS",
  "You won’t share order, margin and returns data",
];

export default function FitSection() {
  const needleRef = useRef<SVGGElement>(null);
  const dialRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const needle = needleRef.current;
    const dial = dialRef.current;
    if (!needle || !dial) return;
    if (prefersReducedMotion()) return;
    const { gsap } = getGsap();
    // Needle sweeps from "Not yet" into the orange zone.
    const tw = gsap.fromTo(
      needle,
      { rotation: -88, svgOrigin: `${CX} ${CY}` },
      {
        rotation: 42,
        svgOrigin: `${CX} ${CY}`,
        duration: 1.8,
        ease: "elastic.out(1, 0.45)",
        scrollTrigger: { trigger: dial, start: "top 75%" },
      }
    );
    return () => {
      tw.scrollTrigger?.kill();
      tw.kill();
    };
  }, []);

  return (
    <section id="fit" data-marker className="relative bg-[#FFFDF2] py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <SectionHead
              eyebrow="Fit"
              title={
                <>
                  We say no <Hi>more than yes.</Hi>
                </>
              }
              body="We only take brands we know we can grow. This is where the line sits."
            />
            <ul className="mt-8 flex flex-wrap gap-2">
              {["Beauty and personal care", "Health and nutrition", "Fashion"].map((p, i) => (
                <li
                  key={p}
                  className={`ng-sticker ${i === 0 ? "bg-[#FF4B00] text-[#FFFDF2] -rotate-2" : i === 1 ? "bg-[#1F1F1F] text-[#FFFDF2] rotate-1" : "bg-[#FCF5CD] text-[#1F1F1F] -rotate-1"}`}
                >
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Spend gauge: India and Global zones are separate groups, shown by region */}
          <div className="lg:col-span-6">
            <div className="relative rounded-[28px] bg-[#FCF5CD] p-6 sm:p-8 shadow-[0_24px_60px_-24px_rgba(31,31,31,0.3)]">
              <svg ref={dialRef} viewBox="-95 0 590 250" className="w-full h-auto" role="img" aria-labelledby="gauge-title">
                <title id="gauge-title">Monthly ad spend gauge: the needle sits in the orange Fit zone</title>
                <ZoneGroup zones={GLOBAL} className="r-usd" />
                <ZoneGroup zones={INDIA} className="r-inr" />
                <g ref={needleRef} transform={`rotate(42 ${CX} ${CY})`}>
                  <line x1={CX} y1={CY} x2={CX} y2={CY - RAD + 6} stroke="#1F1F1F" strokeWidth="6" strokeLinecap="round" />
                </g>
                <circle cx={CX} cy={CY} r="16" fill="#1F1F1F" />
                <circle cx={CX} cy={CY} r="6" fill="#FF4B00" />
              </svg>
              <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-[#1F1F1F]/65 -mt-2">Monthly ad spend</p>
            </div>
          </div>
        </div>

        <div className="mt-14 sm:mt-20 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          <div className="rounded-[28px] bg-[#FF4B00] text-[#FFFDF2] p-7 sm:p-10">
            <h3 className="font-display font-black uppercase text-3xl sm:text-4xl tracking-tight leading-none mb-6">We are a fit if</h3>
            <ul className="space-y-4">
              {fitIf.map((t) => (
                <li key={t} className="flex gap-3 text-base sm:text-lg font-semibold leading-snug">
                  <span className="w-6 h-6 rounded-full bg-[#1F1F1F] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[28px] bg-[#FFFDF2] border-2 border-[#1F1F1F]/12 p-7 sm:p-10">
            <h3 className="font-display font-black uppercase text-3xl sm:text-4xl tracking-tight leading-none mb-6">We are not for you if</h3>
            <ul className="space-y-4">
              {notIf.map((t) => (
                <li key={t} className="flex gap-3 text-base sm:text-lg font-semibold leading-snug text-[#1F1F1F]/80">
                  <span className="w-6 h-6 rounded-full bg-[#1F1F1F]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3.5 h-3.5" strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <p className="text-lg sm:text-xl font-extrabold">Think you&rsquo;re in the orange?</p>
          <FitButton where="fit_section" />
        </div>
      </div>
    </section>
  );
}
