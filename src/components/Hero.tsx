"use client";

import { useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import SpinBadge from "./SpinBadge";

interface HeroProps {
  isSplashDone?: boolean;
}

export default function Hero({ isSplashDone = true }: HeroProps) {
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const pill1Ref = useRef<HTMLAnchorElement>(null);
  const pill2Ref = useRef<HTMLAnchorElement>(null);
  const pill3Ref = useRef<HTMLAnchorElement>(null);
  const loopLeftRef = useRef<HTMLDivElement>(null);
  const loopRightRef = useRef<HTMLDivElement>(null);
  const hookRef = useRef<HTMLDivElement>(null);
  const bottomContentRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isSplashDone) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const line1 = line1Ref.current;
    const line2 = line2Ref.current;
    const line3 = line3Ref.current;
    const pill1 = pill1Ref.current;
    const pill2 = pill2Ref.current;
    const pill3 = pill3Ref.current;
    const loopLeft = loopLeftRef.current;
    const loopRight = loopRightRef.current;
    const hook = hookRef.current;
    const bottomContent = bottomContentRef.current;

    const pills = [
      { el: pill1, baseRot: -3.5 },
      { el: pill2, baseRot: 3 },
      { el: pill3, baseRot: -2.5 },
    ];

    // Initial states before reveal
    const lines = [line1, line2, line3].filter(Boolean);
    if (lines.length) {
      gsap.set(lines, { yPercent: 110, opacity: 0 });
    }
    pills.forEach(({ el, baseRot }) => {
      if (el) {
        gsap.set(el, {
          scale: 0,
          opacity: 0,
          rotation: baseRot - 10,
          transformOrigin: "center center",
        });
      }
    });
    if (hook) {
      gsap.set(hook, { opacity: 0, yPercent: 12 });
    }
    if (loopLeft && loopRight) {
      gsap.set([loopLeft, loopRight], { opacity: 0, scale: 0.9 });
    }
    if (bottomContent) {
      gsap.set(bottomContent, { opacity: 0, y: 25 });
    }

    const headerRow = document.querySelector<HTMLElement>("[data-header-row]");
    const badge = badgeRef.current;
    if (headerRow) gsap.set(headerRow, { opacity: 0, y: -24 });
    if (badge) gsap.set(badge, { opacity: 0, scale: 0.4, rotation: -60 });

    // Master Hero Entrance Timeline: starts while the splash curtain is still lifting.
    const masterTl = gsap.timeline();

    // 1. Headline Lines slide up from mask
    if (lines.length) {
      masterTl.to(lines, {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.12,
      });
    }
    if (headerRow) {
      masterTl.to(headerRow, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.25);
    }

    // 2. The 3 Service Sticker Pills pop in consecutively with spring bounce
    const validPills = pills.map((p) => p.el).filter(Boolean);
    if (validPills.length) {
      masterTl.to(
        validPills,
        {
          scale: 1,
          opacity: 1,
          rotation: (idx) => pills[idx].baseRot,
          duration: 0.65,
          ease: "back.out(2.4)",
          stagger: 0.16,
        },
        "-=0.4"
      );
    }

    // 3. Side loops & bottom copy reveal
    if (loopLeft && loopRight) {
      masterTl.to(
        [loopLeft, loopRight],
        {
          opacity: 0.9,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.5"
      );
    }

    if (hook) {
      masterTl.to(
        hook,
        { opacity: 1, yPercent: 0, duration: 1, ease: "power3.out" },
        "-=0.7"
      );
    }

    if (badge) {
      masterTl.to(badge, { opacity: 1, scale: 1, rotation: -6, duration: 0.9, ease: "back.out(1.8)" }, "-=0.5");
    }

    if (bottomContent) {
      masterTl.to(
        bottomContent,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
        },
        "-=0.6"
      );
    }

    // Setup interactive hover & idle float on the pills
    const cleanups: (() => void)[] = [];

    pills.forEach(({ el, baseRot }, index) => {
      if (!el) return;

      // Subtle organic idle float
      const floatTween = gsap.to(el, {
        y: index % 2 === 0 ? "-=4" : "+=4",
        rotation: baseRot + (index % 2 === 0 ? 1 : -1),
        duration: 2.2 + index * 0.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.2 + index * 0.25,
      });

      // Mouse enter pop (solid dark lift, like CTA)
      const onEnter = () => {
        floatTween.pause();
        gsap.to(el, {
          scale: 1.14,
          rotation: 0,
          boxShadow: "0 18px 40px rgba(0, 0, 0, 0.35)",
          backgroundColor: "#000000",
          duration: 0.35,
          ease: "back.out(2.2)",
          overwrite: "auto",
        });
      };

      // Magnetic pull tracking cursor
      const onMouseMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);

        gsap.to(el, {
          x: relX * 0.32,
          y: relY * 0.32,
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      // Elastic snap-back on leave (solid #1F1F1F rest)
      const onLeave = () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          scale: 1,
          rotation: baseRot,
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.22)",
          backgroundColor: "#1F1F1F",
          duration: 0.7,
          ease: "elastic.out(1.1, 0.4)",
          onComplete: () => {
            floatTween.resume();
          },
        });
      };

      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mousemove", onMouseMove);
      el.addEventListener("mouseleave", onLeave);

      cleanups.push(() => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mousemove", onMouseMove);
        el.removeEventListener("mouseleave", onLeave);
        floatTween.kill();
      });
    });

    return () => {
      cleanups.forEach((c) => c());
      masterTl.kill();
    };
  }, [isSplashDone]);

  return (
    <section
      id="top"
      className="relative min-h-screen pt-28 sm:pt-32 pb-8 sm:pb-10 flex flex-col justify-between bg-[#FCF5CD] hairline-b overflow-hidden select-none"
    >
      {/* ============================================================== */}
      {/* Two26-Style Giant Orange Looping Line Art Left & Right */}
      {/* ============================================================== */}
      {/* Left Orange Loop */}
      <div
        ref={loopLeftRef}
        data-hero-anim
        className="absolute -left-16 sm:-left-28 lg:-left-32 -top-[2%] sm:top-[24%] w-36 sm:w-[22rem] lg:w-[26rem] h-[260px] sm:h-[940px] lg:h-[1080px] pointer-events-none z-0"
      >
        <svg
          viewBox="0 0 229 599"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <path
            d="M33.502 584.112C104.502 557.112 147.911 474.964 143.002 393.612C139.502 335.612 106.002 281.612 59.0025 252.612C7.82072 221.032 -4.20053 385.572 52.5031 405.612C140.218 436.612 225.002 369.112 212.002 252.612C208.376 220.111 192.539 178.612 152.002 121.612C117.866 73.6124 42.0029 11.6124 42.0029 11.6124"
            stroke="#FF4B00"
            strokeWidth="24"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Giant faint hook, cropped by the bottom edge of the hero */}
      <div
        ref={hookRef}
        data-hero-anim
        aria-hidden="true"
        className="absolute bottom-16 sm:bottom-24 lg:bottom-32 inset-x-0 mx-auto w-[180px] sm:w-[260px] lg:w-[320px] aspect-[203.66/357.03] rotate-[-8deg] pointer-events-none z-0"
      >
        <div
          className="w-full h-full bg-[#FF4B00]/10"
          style={{
            maskImage: "url(/northgauge-hook.svg)",
            WebkitMaskImage: "url(/northgauge-hook.svg)",
            maskSize: "contain",
            WebkitMaskSize: "contain",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskPosition: "center",
          }}
        />
      </div>

      {/* Rotating trigger into the Leak Finder */}
      <div ref={badgeRef} data-hero-anim className="hidden lg:block absolute left-[9%] bottom-[12%] z-20">
        <SpinBadge
          href="#leak-finder"
          text="30-sec leak test ✦ find your leak ✦ "
          ariaLabel="Take the 30-second leak test"
        />
      </div>

      {/* Right Orange Loop */}
      <div
        ref={loopRightRef}
        data-hero-anim
        className="absolute -right-24 sm:-right-48 lg:-right-56 top-auto bottom-[-4%] sm:bottom-auto sm:top-[22%] w-52 sm:w-[32rem] lg:w-[38rem] h-[280px] sm:h-[700px] lg:h-[820px] pointer-events-none z-0"
      >
        <svg
          viewBox="0 0 354 487"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <path
            d="M250.687 12.2982C192.69 52.7982 114.69 199.814 245.687 315.798C376.684 431.783 364.19 140.889 235.187 83.2982C153.19 46.6926 54.8365 106.798 30.1893 172.298C-59.5565 410.798 277.687 471.798 277.687 471.798"
            stroke="#FF4B00"
            strokeWidth="24"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* ============================================================== */}
      {/* Main Hero Container */}
      {/* ============================================================== */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 w-full relative z-10 my-auto text-center flex flex-col items-center">
        {/* Giant Two26-Style Display Typography */}
        <div className="relative inline-block max-w-full my-2 sm:my-3">
          {/* Main Giant Headline with overflow masks for slide-up reveal */}
          <h1 className="font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[length:min(9.5rem,14vh)] xl:text-[length:min(10.5rem,15vh)] tracking-tight sm:tracking-tighter uppercase text-[#FF4B00] leading-[0.88] drop-shadow-xs">
            <span className="block overflow-hidden pb-1">
              <span ref={line1Ref} data-hero-anim className="block will-change-transform">
                A HOOK FOR
              </span>
            </span>
            <span className="block overflow-hidden mt-1 sm:mt-2 pb-1">
              <span ref={line2Ref} data-hero-anim className="block will-change-transform">
                CURIOUS
              </span>
            </span>
            <span className="block overflow-hidden mt-1 sm:mt-2 pb-1">
              <span ref={line3Ref} data-hero-anim className="block will-change-transform">
                BRANDS
              </span>
            </span>
          </h1>

          {/* ============================================================== */}
          {/* Exactly 3 Service Sticker Pills Overlaid (Two26 Style with GSAP) */}
          {/* ============================================================== */}
          {/* Pill 1: Creative-Led Brand Building (over upper line) */}
          <a
            ref={pill1Ref}
        data-hero-anim
            href="#hook"
            className="hero-sticker-pill static sm:absolute mx-1 mt-3 sm:mx-0 sm:mt-0 text-[11.5px] px-3.5 py-2 sm:text-[13px] sm:px-5 sm:py-[9px] -top-4 sm:-top-5 right-[-2%] sm:right-[-6%]"
          >
            <span>Creative brand building</span>
          </a>

          {/* Pill 2: Performance Marketing (over CURIOUS) */}
          <a
            ref={pill2Ref}
        data-hero-anim
            href="#reel"
            className="hero-sticker-pill static sm:absolute mx-1 mt-3 sm:mx-0 sm:mt-0 text-[11.5px] px-3.5 py-2 sm:text-[13px] sm:px-5 sm:py-[9px] top-[46%] sm:top-[47%] left-[-2%] sm:left-[-8%]"
          >
            <span>Performance marketing</span>
          </a>

          {/* Pill 3: Retention Marketing (over BRANDS) */}
          <a
            ref={pill3Ref}
        data-hero-anim
            href="#keep"
            className="hero-sticker-pill static sm:absolute mx-1 mt-3 sm:mx-0 sm:mt-0 text-[11.5px] px-3.5 py-2 sm:text-[13px] sm:px-5 sm:py-[9px] bottom-[2%] sm:bottom-[6%] right-[0%] sm:right-[-4%]"
          >
            <span>Retention marketing</span>
          </a>
        </div>

        {/* ============================================================== */}
        {/* Subline & Action Buttons */}
        {/* ============================================================== */}
        <div
          ref={bottomContentRef}
        data-hero-anim
          className="w-full max-w-2xl mt-5 sm:mt-6 mb-2 flex flex-col items-center"
        >
          {/* Subline */}
          <p className="text-base sm:text-lg text-[#1F1F1F]/80 font-medium leading-relaxed max-w-xl text-center mb-6">
            We build brands people notice, ads that pay back, and customers who
            come back. One team, three moves:{" "}
            <span className="font-extrabold text-[#1F1F1F]">Hook. Reel. Keep.</span>
          </p>

          {/* Dual Action Buttons (Two26 Style) */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <a
              href="#audit"
              className="inline-flex items-center gap-3 pl-6 pr-3 py-3 rounded-full bg-[#1F1F1F] hover:bg-black text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-xl transition-all duration-150 group"
            >
              <span>Get a free growth audit</span>
              <div className="w-7 h-7 rounded-full bg-[#FF4B00] text-white flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-45">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </a>

            <a
              href="#services"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-[#FAF1D6] text-[#1F1F1F] text-xs font-bold uppercase tracking-wider border border-[#1F1F1F]/15 transition-all duration-150 shadow-xs"
            >
              <span>See how it works</span>
              <ArrowDown className="w-3.5 h-3.5 text-[#FF4B00]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
