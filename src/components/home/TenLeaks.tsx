"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { getGsap, prefersReducedMotion } from "@/lib/motion";
import { Hi, R, SectionHead } from "../ui";

type Leak = { n: string; quote: ReactNode; what: string; answer: ReactNode };

const BANDS: { band: string; leaks: Leak[] }[] = [
  {
    band: "Measurement",
    leaks: [
      {
        n: "01",
        quote: "“Meta says 4x. Shopify disagrees.”",
        what: "Meta and Google both claim the same order. Add the dashboards together and you’ve “sold” more than you shipped.",
        answer: "Blended reporting from Shopify, with the attribution window stated every month.",
      },
      {
        n: "02",
        quote: <R india="“Every fourth COD order comes back.”" global="“Returns eat the month.”" />,
        what: "RTO and returns never reach the ad dashboard, so the ads get credit for sales that cost you double shipping.",
        answer: "We report kept orders only, and push prepaid where COD returns run high.",
      },
      {
        n: "03",
        quote: "“Nobody can tell me my break-even ROAS.”",
        what: "Product cost, shipping, payment fees and returns are never put in one sum, so every campaign is judged against a guess.",
        answer: "Break-even ROAS per hero SKU in week one, and every campaign judged against it.",
      },
    ],
  },
  {
    band: "Creative and scale",
    leaks: [
      {
        n: "04",
        quote: "“The winning ad died in week three.”",
        what: "Two to four new ads a month can’t outrun fatigue. Frequency climbs, cost per purchase follows.",
        answer: "A monthly creative count in your contract, backed by our creative count guarantee.",
      },
      {
        n: "05",
        quote: "“We doubled the budget. CAC doubled faster.”",
        what: "Overnight budget jumps on top of Meta CPMs up 40 to 60% since 2023, with testing and scaling crammed into one campaign.",
        answer: "Testing and scaling kept separate, with budget moved only above a margin floor.",
      },
      {
        n: "06",
        quote: "“Reels get likes. Ads get nothing.”",
        what: "The social agency counts reach, the performance agency runs out of ads, and the two never share a brief.",
        answer: "One Hook OS: every Reel is also a paid test, judged on cost per purchase.",
      },
    ],
  },
  {
    band: "Retention",
    leaks: [
      {
        n: "07",
        quote: "“Customers only buy in a sale.”",
        what: "Discount-led acquisition trains buyers to wait. Full-price repeat orders never happen.",
        answer: "Second-order flows built around full price, not another code.",
      },
      {
        n: "08",
        quote: "“They buy once and vanish.”",
        what: "Nobody owns the second order. COD buyers repeat least, and no flow catches them.",
        answer: (
          <>
            <R india="Email and WhatsApp" global="Email, SMS and WhatsApp" /> flows from day one of retention work.
          </>
        ),
      },
    ],
  },
  {
    band: "The agency itself",
    leaks: [
      {
        n: "09",
        quote: "“Senior people pitched. Juniors run it.”",
        what: "The pitch team and the delivery team are different people.",
        answer: "A named Growth Lead in the contract.",
      },
      {
        n: "10",
        quote: "“We can’t leave. They hold the accounts.”",
        what: "Ad accounts, pixels and pages sit in the agency’s Business Manager, with exit fees on top.",
        answer: "You own every account and asset. 90-day start, then 30 days’ notice, no exit fee.",
      },
    ],
  },
];

export default function TenLeaks() {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list || prefersReducedMotion()) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-leak]").forEach((el, i) => {
        gsap.from(el, {
          y: 60,
          rotation: i % 2 ? 1.5 : -1.5,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    }, list);
    return () => ctx.revert();
  }, []);

  return (
    <section id="leaks" data-marker className="relative bg-[#1F1F1F] text-[#FFFDF2] py-24 sm:py-32 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute -top-6 left-1/2 -translate-x-1/2 font-display font-black uppercase leading-none text-[22vw] tracking-tighter text-transparent pointer-events-none select-none whitespace-nowrap"
        style={{ WebkitTextStroke: "1.5px rgba(255,253,242,0.07)" }}
      >
        Leaking
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10">
        <SectionHead
          dark
          eyebrow="Where the money goes"
          title={
            <>
              Ten ways a <Hi><R india="₹10 lakh" global="$100k" /></Hi> ad budget leaks.
            </>
          }
          body="Since 2022 we've been inside D2C ad accounts across India and abroad, and the same ten leaks show up every time. Ask founders what blocks growth and the top answer isn't funding or product. It's rising CAC and ROAS that won't hold. Here is what's behind it, and what we put in writing to close each one."
          className="mb-14 sm:mb-20"
        />

        <div ref={listRef} className="space-y-14 sm:space-y-20">
          {BANDS.map((b) => (
            <div key={b.band} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
              <div className="lg:col-span-3">
                <div className="lg:sticky lg:top-32 flex items-center gap-3">
                  <span className="w-6 h-[2px] bg-[#FF4B00]" />
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#FFFDF2]/70">{b.band}</h3>
                </div>
              </div>
              <div className="lg:col-span-9 space-y-4">
                {b.leaks.map((l) => (
                  <article
                    key={l.n}
                    data-leak
                    className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 rounded-[24px] bg-[#FFFDF2]/[0.04] border border-[#FFFDF2]/10 p-6 sm:p-8 hover:bg-[#FFFDF2]/[0.07] transition-colors"
                  >
                    <div className="md:col-span-5">
                      <span className="font-serif italic text-2xl text-[#FF4B00] leading-none">{l.n}</span>
                      <p className="mt-3 text-xl sm:text-2xl font-extrabold leading-snug">{l.quote}</p>
                    </div>
                    <div className="md:col-span-4">
                      <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#FFFDF2]/45 mb-2">What&rsquo;s going on</div>
                      <p className="text-sm sm:text-base text-[#FFFDF2]/75 leading-relaxed">{l.what}</p>
                    </div>
                    <div className="md:col-span-3 md:border-l md:border-[#FFFDF2]/10 md:pl-6">
                      <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#FF4B00] mb-2">Our written answer</div>
                      <p className="text-sm sm:text-base font-semibold leading-relaxed">{l.answer}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
