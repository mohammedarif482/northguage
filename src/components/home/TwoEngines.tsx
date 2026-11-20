"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { getGsap, prefersReducedMotion } from "@/lib/motion";
import { Hi, SectionHead, SmartLink } from "../ui";

const engines = [
  {
    tag: "Engine 01 · Scale",
    name: "Media buying",
    body: "Meta first, then Google, quick commerce and DSP, all bought by margin. For brands whose ROAS drops every time they push spend.",
    points: ["Budget moved by contribution margin", "Reporting on kept orders, after returns", "Flat fee, zero markup on spend"],
    link: { label: "See media buying", href: "/media-buying" },
    graphic: "bars" as const,
  },
  {
    tag: "Engine 02 · Make",
    name: "Hook OS",
    body: "Reels, UGC and statics that double as ad tests, built from 15,000+ winning ads. For brands whose ads die by week three.",
    points: ["Every ad scored on FASCINATE", "Reported on hook rate and cost per purchase", "Winners go straight into paid"],
    link: { label: "See Hook OS", href: "/hook-os" },
    graphic: "fan" as const,
  },
];

function Bars() {
  return (
    <svg viewBox="0 0 300 150" className="w-full h-full" aria-hidden="true">
      {[60, 84, 106, 124, 142].map((h, i) => (
        <rect key={i} data-bar x={20 + i * 54} y={150 - h} width="34" height={h} rx="6" fill={i === 4 ? "#FFFDF2" : "#1F1F1F"} />
      ))}
      <line x1="10" y1="80" x2="290" y2="80" stroke="#FFFDF2" strokeWidth="3" strokeDasharray="8 6" />
    </svg>
  );
}

function Fan() {
  const fills = ["#1F1F1F", "#4A4740", "#B7B2A7", "#FFFDF2"];
  return (
    <svg viewBox="0 0 300 150" className="w-full h-full" aria-hidden="true">
      {fills.map((f, i) => (
        <rect
          key={i}
          data-fan={i}
          x="128"
          y="30"
          width="44"
          height="64"
          rx="7"
          fill={f}
          transform={`rotate(${(i - 1.5) * 16} 150 130)`}
        />
      ))}
      <text x="150" y="138" textAnchor="middle" fontWeight="800" fontSize="16" fill="#1F1F1F" letterSpacing="3" style={{ fontFamily: "var(--font-sans)" }}>
        HOOK OS
      </text>
    </svg>
  );
}

export default function TwoEngines() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      // Orange panel rises from behind each card on scroll.
      gsap.utils.toArray<HTMLElement>("[data-engine]").forEach((wrap) => {
        const panel = wrap.querySelector("[data-panel]");
        gsap.fromTo(
          panel,
          { yPercent: 55 },
          { yPercent: 0, ease: "none", scrollTrigger: { trigger: wrap, start: "top 90%", end: "top 35%", scrub: 0.8 } }
        );
        const bars = wrap.querySelectorAll("[data-bar]");
        if (bars.length)
          gsap.from(bars, {
            scaleY: 0,
            transformOrigin: "50% 100%",
            stagger: 0.08,
            duration: 0.7,
            ease: "back.out(1.6)",
            scrollTrigger: { trigger: wrap, start: "top 70%" },
          });
        const fans = wrap.querySelectorAll("[data-fan]");
        if (fans.length)
          gsap.from(fans, {
            rotation: 0,
            svgOrigin: "150 130",
            stagger: 0.06,
            duration: 0.9,
            ease: "back.out(1.8)",
            scrollTrigger: { trigger: wrap, start: "top 70%" },
          });
      });
    }, root);

    // Cards tilt towards the cursor.
    const cleanups = Array.from(root.querySelectorAll<HTMLElement>("[data-engine]")).map((wrap) => {
      const card = wrap.querySelector<HTMLElement>("[data-card]");
      if (!card) return () => {};
      const move = (e: MouseEvent) => {
        const r = wrap.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(card, { rotationY: x * 10, rotationX: -y * 8, z: 20, duration: 0.4, ease: "power2.out" });
      };
      const leave = () => gsap.to(card, { rotationY: 0, rotationX: 0, z: 0, duration: 0.7, ease: "elastic.out(1, 0.5)" });
      wrap.addEventListener("mousemove", move);
      wrap.addEventListener("mouseleave", leave);
      return () => {
        wrap.removeEventListener("mousemove", move);
        wrap.removeEventListener("mouseleave", leave);
      };
    });

    return () => {
      cleanups.forEach((c) => c());
      ctx.revert();
    };
  }, []);

  return (
    <section id="engines" data-marker className="relative bg-[#FFFDF2] py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <SectionHead
          eyebrow="Two engines, one team"
          title={
            <>
              Start where <Hi>you&rsquo;re leaking.</Hi>
            </>
          }
          align="center"
          className="mb-10 sm:mb-14"
        />

        <div ref={rootRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {engines.map((e) => (
            <div key={e.name} data-engine className="relative pt-36 sm:pt-44" style={{ perspective: 1200 }}>
              {/* Orange panel behind the card */}
              <div data-panel className="absolute inset-x-6 top-0 bottom-24 rounded-[28px] bg-[#FF4B00] overflow-hidden">
                <div className="h-36 sm:h-44 px-8 pt-6">{e.graphic === "bars" ? <Bars /> : <Fan />}</div>
              </div>

              <article
                data-card
                className="relative rounded-[28px] bg-[#FFFDF2] border border-[#1F1F1F]/10 p-7 sm:p-10 shadow-[0_30px_70px_-30px_rgba(31,31,31,0.45)] will-change-transform"
                style={{ transformStyle: "preserve-3d" }}
              >
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#FF4B00]">{e.tag}</span>
                <h3 className="mt-3 font-display font-black uppercase text-5xl sm:text-6xl tracking-tight leading-[0.88]">{e.name}</h3>
                <p className="mt-5 text-base sm:text-lg font-medium text-[#1F1F1F]/75 leading-relaxed">{e.body}</p>
                <ul className="mt-6 space-y-2.5">
                  {e.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm sm:text-base font-bold">
                      <Check className="w-4 h-4 text-[#FF4B00] mt-0.5 shrink-0" strokeWidth={3} />
                      {p}
                    </li>
                  ))}
                </ul>
                <SmartLink
                  href={e.link.href}
                  className="mt-8 inline-flex items-center gap-3 pl-5 pr-2 py-2 rounded-full bg-[#1F1F1F] text-[#FFFDF2] text-xs font-bold uppercase tracking-wider group"
                >
                  <span>{e.link.label}</span>
                  <span className="w-8 h-8 rounded-full bg-[#FF4B00] flex items-center justify-center transition-transform group-hover:rotate-45">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </SmartLink>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
