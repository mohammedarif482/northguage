"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function TheProblem() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const punchlineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const textEl = textRef.current;
    const punchlineEl = punchlineRef.current;
    if (!section || !textEl || !punchlineEl) return;

    // Split main text into character spans
    const originalText = textEl.innerText;
    textEl.innerHTML = originalText
      .split("")
      .map(
        (char) =>
          `<span class="manifesto-char inline-block transition-colors">${
            char === " " ? "&nbsp;" : char
          }</span>`
      )
      .join("");

    const chars = textEl.querySelectorAll<HTMLSpanElement>(".manifesto-char");

    // Split punchline into character spans
    const punchlineText = punchlineEl.innerText;
    punchlineEl.innerHTML = punchlineText
      .split("")
      .map(
        (char) =>
          `<span class="punchline-char inline-block transition-colors">${
            char === " " ? "&nbsp;" : char
          }</span>`
      )
      .join("");

    const punchChars = punchlineEl.querySelectorAll<HTMLSpanElement>(".punchline-char");

    // Initial state: characters are faded out
    gsap.set(chars, {
      color: "rgba(31, 31, 31, 0.2)",
    });

    gsap.set(punchChars, {
      color: "rgba(255, 75, 0, 0.25)",
      scale: 0.98,
    });

    // Pinned scrub timeline (Two26 style kinetic scrub)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 25%",
        end: "bottom 75%",
        scrub: 0.8,
      },
    });

    // Kinetic scrub across main text characters
    tl.to(
      chars,
      {
        color: "#1F1F1F",
        stagger: {
          each: 0.02,
          from: "start",
        },
        duration: 2.2,
        ease: "power1.out",
      },
      0
    );

    // Kinetic scrub across punchline
    tl.to(
      punchChars,
      {
        color: "#FF4B00",
        scale: 1,
        stagger: {
          each: 0.03,
          from: "start",
        },
        duration: 1.6,
        ease: "power2.out",
      },
      1.8
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 sm:py-44 bg-[#FFFDF2] hairline-b overflow-hidden select-none"
    >
      <div
        ref={containerRef}
        className="max-w-5xl mx-auto px-6 sm:px-10 relative z-10"
      >
        {/* Two26-Style Section Header: A BIT ABOUT US */}
        <div className="flex items-center justify-between pb-4 hairline-b mb-12 sm:mb-16">
          <div className="text-xs sm:text-sm font-bold uppercase tracking-[0.24em] text-[#1F1F1F]/70">
            A BIT ABOUT US 
          </div>
          <div className="font-serif italic text-sm text-[#FF4B00]">
            04 // MANIFESTO
          </div>
        </div>

        {/* Main Kinetic Typography Box - Pure, No Pills */}
        <div className="relative space-y-8">
          {/* Main Manifesto Copy - Light, Refined Weight */}
          <p
            ref={textRef}
            className="text-2xl sm:text-3xl md:text-[2.4rem] font-medium text-[#1F1F1F] tracking-tight leading-[1.32]"
          >
            Most brands are split in three. A brand agency that makes things
            pretty. A performance agency that makes things cheap. A CRM
            freelancer nobody talks to. The result: great ads for a brand nobody
            remembers, or a beautiful brand nobody buys twice.
          </p>

          {/* Punchline */}
          <div className="pt-2">
            <p
              ref={punchlineRef}
              className="text-2xl sm:text-4xl md:text-[2.85rem] font-bold text-[#FF4B00] tracking-tight leading-snug"
            >
              Northgauge puts all three on one line.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
