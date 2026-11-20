"use client";

import { LOGOS, STATS } from "@/lib/content";
import { D, IsbBadge } from "./ui";

function Cell({ name }: { name: string }) {
  const base = "shrink-0 h-20 sm:h-24 w-44 sm:w-52 mx-2 rounded-2xl flex items-center justify-center px-4";
  if (/\.(svg|png|webp|jpg)$/i.test(name)) {
    return (
      <div className={`${base} bg-[#FFFDF2]`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={name} alt="" loading="lazy" className="max-h-10 max-w-[80%] object-contain grayscale hover:grayscale-0 transition" />
      </div>
    );
  }
  if (name === "[Logo]") {
    return (
      <div className={`${base} border-2 border-dashed border-[#1F1F1F]/15 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1F1F1F]/35`}>
        [Logo]
      </div>
    );
  }
  return (
    <div className={`${base} bg-[#FFFDF2]`}>
      <span className="text-base sm:text-lg font-extrabold tracking-[0.16em] uppercase text-[#8C8579] hover:text-[#1F1F1F] transition-colors text-center leading-tight">
        {name}
      </span>
    </div>
  );
}

/** "Brands we've grown since 2022": 3 rows scrolling sideways in alternate directions, pausing on hover. */
export default function LogoRows({ stats = false }: { stats?: boolean }) {
  const anim = ["animate-marquee-slow", "animate-marquee-rev", "animate-marquee-slower"];
  return (
    <section id="brands" className="relative bg-[#FCF5CD] py-20 sm:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10 sm:mb-14">
        <h2 className="font-display font-black uppercase text-3xl sm:text-5xl tracking-tight leading-[0.92]">
          Brands we&rsquo;ve grown <span className="text-[#FF4B00]">since 2022</span>
        </h2>
        <IsbBadge text="Backed by ISB · I-Venture Immersive" className="-rotate-2 self-start sm:self-auto" />
      </div>

      <div
        className="space-y-3"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        {LOGOS.map((row, i) => (
          <div key={i} className="ng-logo-row overflow-hidden">
            <div className={anim[i % 3]}>
              {[...row, ...row].map((n, j) => (
                <Cell key={j} name={n} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {stats && (
        <div className="max-w-7xl mx-auto px-6 sm:px-10 mt-14 sm:mt-20">
          <dl className="grid grid-cols-2 lg:grid-cols-4 border-t border-[#1F1F1F]/12">
            {[
              { v: STATS.brandsGrown, l: "Brands grown" },
              { v: STATS.adSpend, l: "Ad spend managed" },
              { v: STATS.creativesShipped, l: "Creatives shipped and tested" },
              { v: STATS.agenciesReplaced, l: "Agencies replaced" },
            ].map((s, i) => (
              <div
                key={s.l}
                className={`pt-8 pb-2 pr-4 ${i % 2 === 1 ? "pl-6 border-l border-[#1F1F1F]/12" : ""} ${i === 2 ? "lg:pl-6 lg:border-l lg:border-[#1F1F1F]/12" : ""}`}
              >
                <dd className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-[#FF4B00] tracking-tight leading-none">
                  <D v={s.v} />
                </dd>
                <dt className="mt-3 text-xs sm:text-sm font-bold uppercase tracking-[0.14em] text-[#1F1F1F]/75">{s.l}</dt>
              </div>
            ))}
          </dl>
        </div>
      )}
    </section>
  );
}
