"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function TheProblem() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const punchlineRef = useRef<HTMLParagraphElement>(null);

  const pill1Ref = useRef<HTMLDivElement>(null);
  const pill2Ref = useRef<HTMLDivElement>(null);
  const pill3Ref = useRef<HTMLDivElement>(null);

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

    // Pills initial state: hidden & scaled down
    const pills = [pill1Ref.current, pill2Ref.current, pill3Ref.current].filter(Boolean);
    gsap.set(pills, {
      opacity: 0,
      scale: 0.6,
      y: 20,
    });

    // Pinned scrub timeline (Two26 style kinetic scrub)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 20%",
        end: "bottom 80%",
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
        duration: 2,
        ease: "power1.out",
      },
      0
    );

    // Pop in Pill 1 at 25%
    if (pill1Ref.current) {
      tl.to(
        pill1Ref.current,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          ease: "back.out(2)",
        },
        0.5
      );
    }

    // Pop in Pill 2 at 50%
    if (pill2Ref.current) {
      tl.to(
        pill2Ref.current,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          ease: "back.out(2)",
        },
        1.1
      );
    }

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
        duration: 1.5,
        ease: "power2.out",
      },
      1.6
    );

    // Pop in Pill 3 at end
    if (pill3Ref.current) {
      tl.to(
        pill3Ref.current,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          ease: "back.out(2)",
        },
        2.2
      );
    }

    // Add interactive magnetic & spring hover to the pills (Two26 style)
    const cleanups: (() => void)[] = [];
    [
      { ref: pill1Ref, rot: -3 },
      { ref: pill2Ref, rot: 3.5 },
      { ref: pill3Ref, rot: -2 },
    ].forEach(({ ref, rot }) => {
      const el = ref.current;
      if (!el) return;

      gsap.set(el, { rotation: rot, transformOrigin: "center center" });

      const onEnter = () => {
        gsap.to(el, {
          scale: 1.15,
          rotation: 0,
          boxShadow: "0 18px 36px rgba(0, 0, 0, 0.28)",
          backgroundColor: "rgba(20, 20, 20, 0.75)",
          duration: 0.35,
          ease: "back.out(2)",
        });
      };

      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        gsap.to(el, {
          x: dx * 0.28,
          y: dy * 0.28,
          duration: 0.25,
          ease: "power2.out",
        });
      };

      const onLeave = () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          scale: 1,
          rotation: rot,
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.12)",
          backgroundColor: "rgba(31, 31, 31, 0.48)",
          duration: 0.6,
          ease: "elastic.out(1, 0.4)",
        });
      };

      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);

      cleanups.push(() => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => {
      cleanups.forEach((c) => c());
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

        {/* Main Kinetic Typography Box */}
        <div className="relative">
          {/* Floating Sticker Pill 1 */}
          <div
            ref={pill1Ref}
            className="hero-sticker-pill -top-6 left-[8%] sm:left-[14%]"
          >
            <span>Allergic to generic</span>
          </div>

          {/* Main Manifesto Copy */}
          <p
            ref={textRef}
            className="text-2xl sm:text-4xl md:text-[2.75rem] font-extrabold text-[#1F1F1F] tracking-tight leading-[1.2] mb-8"
          >
            Most brands are split in three. A brand agency that makes things
            pretty. A performance agency that makes things cheap. A CRM
            freelancer nobody talks to. The result: great ads for a brand nobody
            remembers, or a beautiful brand nobody buys twice.
          </p>

          {/* Floating Sticker Pill 2 */}
          <div
            ref={pill2Ref}
            className="hero-sticker-pill top-[48%] right-[4%] sm:right-[10%]"
          >
            <span>One team, full funnel</span>
          </div>

          {/* Punchline */}
          <div className="relative inline-block mt-4">
            <p
              ref={punchlineRef}
              className="text-3xl sm:text-5xl md:text-[3.25rem] font-extrabold text-[#FF4B00] tracking-tight leading-tight"
            >
              Northgauge puts all three on one line.
            </p>

            {/* Floating Sticker Pill 3 */}
            <div
              ref={pill3Ref}
              className="hero-sticker-pill -bottom-8 left-[35%] sm:left-[45%]"
            >
              <span>Zero pitch decks</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
