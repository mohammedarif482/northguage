"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import Placeholder from "./Placeholder";
import SwipeHint from "./SwipeHint";
import { getGsap, prefersReducedMotion } from "@/lib/motion";
import { prefillAudit } from "@/lib/prefill";

type Move = {
  id: "hook" | "reel" | "keep";
  need: "Hook" | "Reel" | "Keep";
  num: string;
  verb: string;
  name: string;
  title: string;
  pitch: string;
  signal: string;
  does: string[];
  media: { label: string; kind: "image" | "video" };
  cta: string;
  bg: string;
  ink: string;
  muted: string;
  chip: string;
  tone: "orange" | "sun" | "lilac";
};

const moves: Move[] = [
  {
    id: "hook",
    need: "Hook",
    num: "01",
    verb: "Hook",
    name: "Creative-led brand building",
    title: "Be the brand they can't scroll past.",
    pitch: "We find the one thing that makes you interesting and build every asset around it.",
    signal: "Your ads work, but nobody remembers your name.",
    does: ["Positioning", "Identity & packaging", "Campaign concepts", "Creator & UGC"],
    media: { label: "Brand film still", kind: "video" },
    cta: "Start with a brand audit",
    bg: "bg-[#FF4B00]",
    ink: "text-[#FFFDF2]",
    muted: "text-[#FFFDF2]/80",
    chip: "bg-[#FFFDF2]/15 text-[#FFFDF2]",
    tone: "orange",
  },
  {
    id: "reel",
    need: "Reel",
    num: "02",
    verb: "Reel",
    name: "Performance marketing",
    title: "Ads that pay their own way.",
    pitch: "Creative testing at volume, disciplined buying and landing pages that convert interest into revenue.",
    signal: "ROAS slips every time you scale spend.",
    does: ["Meta, Google, TikTok", "50+ ad tests / month", "Landing pages & CRO", "Clean attribution"],
    media: { label: "Ad creative grid", kind: "image" },
    cta: "Get a free ads audit",
    bg: "bg-[#FFC83D]",
    ink: "text-[#1F1F1F]",
    muted: "text-[#1F1F1F]/75",
    chip: "bg-[#1F1F1F]/10 text-[#1F1F1F]",
    tone: "sun",
  },
  {
    id: "keep",
    need: "Keep",
    num: "03",
    verb: "Keep",
    name: "Retention marketing",
    title: "Make the second order easier than the first.",
    pitch: "Lifecycle flows, WhatsApp journeys and loyalty systems that turn first buyers into regulars.",
    signal: "Customers buy once and vanish.",
    does: ["Email & SMS flows", "WhatsApp journeys", "Loyalty & referrals", "LTV reporting"],
    media: { label: "Lifecycle flow mockup", kind: "image" },
    cta: "Get a free retention audit",
    bg: "bg-[#B9A6FF]",
    ink: "text-[#1F1F1F]",
    muted: "text-[#1F1F1F]/75",
    chip: "bg-[#1F1F1F]/10 text-[#1F1F1F]",
    tone: "lilac",
  },
];

export default function Moves() {
  const sectionRef = useRef<HTMLElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const deck = deckRef.current;
    if (!section || !deck || prefersReducedMotion()) return;
    const { gsap } = getGsap();
    const cards = gsap.utils.toArray<HTMLElement>("[data-move-card]", deck);

    const mm = gsap.matchMedia();
    // Desktop: cards start as a tilted, stacked hand and fan out to straight, evenly spread cards.
    mm.add("(min-width: 1024px)", () => {
      gsap.fromTo(
        cards,
        {
          xPercent: (i) => (1 - i) * 100,
          rotation: (i) => [-10, 6, 14][i],
          y: 60,
        },
        {
          xPercent: 0,
          rotation: 0,
          y: 0,
          ease: "power3.out",
          stagger: 0.05,
          scrollTrigger: { trigger: deck, start: "top 85%", end: "top 30%", scrub: 0.9 },
        }
      );
    });
    // Mobile: simple rise-in.
    mm.add("(max-width: 1023px)", () => {
      gsap.from(cards, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: deck, start: "top 85%" },
      });
    });

    // Hover: straighten + lift (all sizes with a pointer).
    const cleanups = cards.map((card) => {
      const enter = () => gsap.to(card, { rotation: 0, y: -10, scale: 1.02, duration: 0.45, ease: "back.out(2)" });
      const leave = () =>
        gsap.to(card, {
          rotation: 0,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "elastic.out(1, 0.5)",
        });
      card.addEventListener("mouseenter", enter);
      card.addEventListener("mouseleave", leave);
      return () => {
        card.removeEventListener("mouseenter", enter);
        card.removeEventListener("mouseleave", leave);
      };
    });

    return () => {
      cleanups.forEach((c) => c());
      mm.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="services" className="relative bg-[#FFFDF2] pt-36 pb-24 sm:pt-48 sm:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Header */}
        <div className="relative flex flex-col items-center text-center mb-16 sm:mb-24">
          <p className="font-serif italic text-xl sm:text-2xl text-[#FF4B00] leading-none mb-4">What we do</p>
          <h2 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight leading-[0.9] text-[#1F1F1F]">
            Three moves.
            <br />
            <span className="text-[#FF4B00]">One line.</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-[#1F1F1F]/75 font-medium max-w-xl">
            Most brands hire three agencies and lose the plot in between. We run brand, ads and retention as one
            continuous line, so every move feeds the next.
          </p>

          {/* stickers */}
          <span className="ng-sticker hidden md:inline-flex absolute left-[4%] top-6 -rotate-12 bg-[#FF4B00] text-[#FFFDF2]">
            ✦ No hand-offs
          </span>
          <span className="ng-sticker hidden md:inline-flex absolute right-[6%] bottom-2 rotate-6 bg-[#1F1F1F] text-[#FFFDF2]">
            One team · one report
          </span>
        </div>

        {/* Deck */}
        <SwipeHint className="lg:hidden mb-3" />
        <div ref={deckRef} className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-6 px-6 sm:-mx-10 sm:px-10 scroll-px-6 sm:scroll-px-10 gap-4 pt-2 pb-10 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:mx-0 lg:px-4 lg:pb-0">
          {moves.map((m) => (
            <article
              key={m.id}
              id={m.id}
              data-move-card
              className={`shrink-0 w-[86%] sm:w-[62%] lg:w-auto snap-start scroll-mt-28 relative rounded-[28px] p-6 sm:p-8 shadow-[0_24px_60px_-20px_rgba(31,31,31,0.35)] ${m.bg} ${m.ink} flex flex-col will-change-transform`}
            >
              <div className="flex items-start justify-between gap-4 mb-4 sm:mb-6">
                <span className="font-serif italic text-3xl leading-none shrink-0">{m.num}</span>
                <span className={`text-[11px] font-bold uppercase tracking-[0.18em] text-right ${m.muted}`}>{m.name}</span>
              </div>

              <h3 className="font-display font-black uppercase text-5xl sm:text-7xl tracking-tight leading-[0.85] mb-3 sm:mb-4">
                {m.verb}
              </h3>
              <p className="text-lg sm:text-xl font-extrabold leading-snug mb-4 sm:mb-3">{m.title}</p>
              <p className={`hidden sm:block text-sm leading-relaxed mb-6 ${m.muted}`}>{m.pitch}</p>

              <Placeholder label={m.media.label} kind={m.media.kind} tone={m.tone} className="aspect-[16/9] sm:aspect-[4/3] mb-4 sm:mb-6 shadow-inner" />

              <ul className="flex flex-wrap gap-2 mb-5 sm:mb-6">
                {m.does.map((d) => (
                  <li key={d} className={`px-3 py-1.5 rounded-full text-xs font-bold ${m.chip}`}>
                    {d}
                  </li>
                ))}
              </ul>

              <p className={`hidden sm:block text-sm mb-6 ${m.muted}`}>
                <span className="font-bold">You need this if:</span> {m.signal}
              </p>

              <a
                href="#audit"
                onClick={() => prefillAudit({ need: m.need })}
                className="mt-auto inline-flex items-center justify-between gap-3 pl-5 pr-2 py-2 rounded-full bg-[#1F1F1F] text-[#FFFDF2] text-xs font-bold uppercase tracking-wider group"
              >
                <span>{m.cta}</span>
                <span className="w-8 h-8 rounded-full bg-[#FF4B00] flex items-center justify-center transition-transform group-hover:rotate-45">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
