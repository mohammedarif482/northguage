"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import gsap from "gsap";

export default function Hero() {
  const pill1Ref = useRef<HTMLAnchorElement>(null);
  const pill2Ref = useRef<HTMLAnchorElement>(null);
  const pill3Ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const pills = [
      { ref: pill1Ref, baseRot: -3.5 },
      { ref: pill2Ref, baseRot: 3 },
      { ref: pill3Ref, baseRot: -2.5 },
    ];

    const cleanups: (() => void)[] = [];

    pills.forEach(({ ref, baseRot }, index) => {
      const el = ref.current;
      if (!el) return;

      // Set initial rotation
      gsap.set(el, { rotation: baseRot, transformOrigin: "center center" });

      // Subtle organic idle float
      const floatTween = gsap.to(el, {
        y: index % 2 === 0 ? "-=4" : "+=4",
        rotation: baseRot + (index % 2 === 0 ? 1 : -1),
        duration: 2.2 + index * 0.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.3,
      });

      // Mouse enter pop (glassmorphic lift, no border)
      const onEnter = () => {
        floatTween.pause();
        gsap.to(el, {
          scale: 1.14,
          rotation: 0,
          boxShadow: "0 20px 45px rgba(0, 0, 0, 0.28)",
          backgroundColor: "rgba(20, 20, 20, 0.72)",
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

      // Elastic snap-back on leave (glassmorphic rest, no border)
      const onLeave = () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          scale: 1,
          rotation: baseRot,
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.14)",
          backgroundColor: "rgba(31, 31, 31, 0.48)",
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
    };
  }, []);
  return (
    <section
      id="top"
      className="relative min-h-screen pt-32 sm:pt-36 pb-16 flex flex-col justify-between bg-[#FDF3EC] hairline-b overflow-hidden select-none"
    >
      {/* ============================================================== */}
      {/* Two26-Style Giant Orange Looping Line Art Left & Right */}
      {/* ============================================================== */}
      {/* Left Orange Loop */}
      <div className="absolute -left-12 sm:left-0 top-20 sm:top-28 w-44 sm:w-64 h-[450px] sm:h-[600px] pointer-events-none z-0 opacity-90">
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

      {/* Right Orange Loop */}
      <div className="absolute -right-16 sm:right-0 top-16 sm:top-24 w-56 sm:w-80 h-[380px] sm:h-[500px] pointer-events-none z-0 opacity-90">
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
        <div className="relative inline-block w-full max-w-5xl my-4 sm:my-8">
          {/* Main Giant Headline */}
          <h1 className="font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[9.5rem] xl:text-[10.5rem] tracking-tight sm:tracking-tighter uppercase text-[#FF4B00] leading-[0.88] drop-shadow-xs">
            <span className="block">A HOOK FOR</span>
            <span className="block mt-1 sm:mt-2">CURIOUS BRANDS</span>
          </h1>

          {/* ============================================================== */}
          {/* Exactly 3 Service Sticker Pills Overlaid (Two26 Style with GSAP) */}
          {/* ============================================================== */}
          {/* Pill 1: Creative-Led Brand Building (over upper line) */}
          <a
            ref={pill1Ref}
            href="#hook"
            className="hero-sticker-pill -top-2 sm:top-1 left-[18%] sm:left-[26%]"
          >
            <span>Creative brand building</span>
          </a>

          {/* Pill 2: Performance Marketing (over CURIOUS) */}
          <a
            ref={pill2Ref}
            href="#reel"
            className="hero-sticker-pill top-[44%] sm:top-[48%] left-[5%] sm:left-[10%]"
          >
            <span>Performance marketing</span>
          </a>

          {/* Pill 3: Retention Marketing (over BRANDS) */}
          <a
            ref={pill3Ref}
            href="#keep"
            className="hero-sticker-pill bottom-2 sm:bottom-4 right-[6%] sm:right-[14%]"
          >
            <span>Retention marketing</span>
          </a>
        </div>

        {/* ============================================================== */}
        {/* Walking Characters / Hook Art (Two26 Style Illustration) */}
        {/* ============================================================== */}
        <div className="w-full max-w-2xl mt-4 sm:mt-6 mb-8 flex flex-col items-center">
          <div className="relative w-full h-44 sm:h-56 flex items-end justify-center">
            {/* Illustrated Characters with Walking Signs HOOK & REEL & KEEP */}
            <svg
              viewBox="0 0 600 160"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full max-w-xl"
            >
              {/* Ground hairline */}
              <line x1="20" y1="150" x2="580" y2="150" stroke="#1F1F1F" strokeWidth="2" strokeDasharray="6 6" />

              {/* Character 1 (Walking left-center with "HOOK" placard) */}
              <g transform="translate(110, 10)">
                {/* Legs */}
                <path d="M 45 95 L 30 148 M 55 95 L 75 148" stroke="#1F1F1F" strokeWidth="3.5" strokeLinecap="round" />
                {/* Feet */}
                <path d="M 22 148 L 34 148 M 68 148 L 84 148" stroke="#1F1F1F" strokeWidth="4" strokeLinecap="round" />
                {/* Orange Pants */}
                <path d="M 40 92 L 25 142 L 35 142 L 48 100 L 62 142 L 72 142 L 60 92 Z" fill="#FF4B00" />
                {/* Torso & Orange Jacket */}
                <rect x="35" y="45" width="30" height="48" rx="6" fill="#FF4B00" stroke="#1F1F1F" strokeWidth="3" />
                {/* Head with hair & sunglasses */}
                <circle cx="50" cy="28" r="14" fill="#FCF5CD" stroke="#1F1F1F" strokeWidth="3" />
                <path d="M 42 18 Q 50 12 58 18 Q 66 24 58 32 Q 50 20 42 18 Z" fill="#7C2D12" />
                <rect x="44" y="24" width="14" height="6" rx="2" fill="#1F1F1F" />
                {/* Placard "HOOK" */}
                <rect x="-10" y="52" width="70" height="42" rx="4" fill="#FFFFFF" stroke="#1F1F1F" strokeWidth="3" transform="rotate(-4 25 73)" />
                <text x="25" y="78" fontFamily="var(--font-display)" fontSize="20" fontWeight="900" fill="#FF4B00" textAnchor="middle" transform="rotate(-4 25 78)">
                  HOOK
                </text>
              </g>

              {/* Center Iconic Swaying Northgauge Hook in Placard Form */}
              <g transform="translate(260, 5)">
                {/* Swinging Hook Mascot */}
                <circle cx="40" cy="26" r="16" fill="#FF4B00" stroke="#1F1F1F" strokeWidth="3" />
                {/* Eye hole */}
                <circle cx="40" cy="26" r="5" fill="#FFFDF2" stroke="#1F1F1F" strokeWidth="2.5" />
                {/* Hook shank & bend */}
                <path
                  d="M 40 42 L 40 90 C 40 120 18 126 12 108 C 8 96 22 92 26 100"
                  fill="none"
                  stroke="#FF4B00"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M 40 42 L 40 90 C 40 120 18 126 12 108 C 8 96 22 92 26 100"
                  fill="none"
                  stroke="#1F1F1F"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Legs running */}
                <path d="M 32 118 L 22 148 M 46 118 L 58 148" stroke="#1F1F1F" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M 14 148 L 26 148 M 52 148 L 66 148" stroke="#1F1F1F" strokeWidth="4" strokeLinecap="round" />
              </g>

              {/* Character 2 (Walking right with "KEEP" placard) */}
              <g transform="translate(380, 8)">
                {/* Legs */}
                <path d="M 45 95 L 28 148 M 55 95 L 72 148" stroke="#1F1F1F" strokeWidth="3.5" strokeLinecap="round" />
                {/* Feet */}
                <path d="M 20 148 L 32 148 M 66 148 L 80 148" stroke="#1F1F1F" strokeWidth="4" strokeLinecap="round" />
                {/* White / Orange Flare Pants */}
                <path d="M 40 92 L 20 142 L 32 142 L 48 100 L 64 142 L 76 142 L 60 92 Z" fill="#FF4B00" />
                {/* Torso */}
                <rect x="35" y="44" width="28" height="48" rx="6" fill="#FFFFFF" stroke="#1F1F1F" strokeWidth="3" />
                {/* Head with curly brown hair */}
                <circle cx="49" cy="26" r="13" fill="#FCF5CD" stroke="#1F1F1F" strokeWidth="3" />
                <path d="M 38 18 Q 49 10 58 18 Q 65 30 54 36 Q 44 34 38 24 Z" fill="#451A03" />
                {/* Placard "KEEP" */}
                <rect x="18" y="52" width="70" height="42" rx="4" fill="#FFFFFF" stroke="#1F1F1F" strokeWidth="3" transform="rotate(4 53 73)" />
                <text x="53" y="78" fontFamily="var(--font-display)" fontSize="20" fontWeight="900" fill="#FF4B00" textAnchor="middle" transform="rotate(4 53 78)">
                  KEEP
                </text>
              </g>

              {/* Cute Cat (like Two26 mascot in screenshot) */}
              <g transform="translate(480, 108)">
                {/* Cat body */}
                <ellipse cx="24" cy="28" rx="16" ry="10" fill="#1F1F1F" />
                {/* Head with ears */}
                <circle cx="10" cy="22" r="8" fill="#1F1F1F" />
                <polygon points="4,16 8,10 11,16" fill="#1F1F1F" />
                <polygon points="10,16 14,10 16,17" fill="#1F1F1F" />
                {/* Tail curled up */}
                <path d="M 38 28 Q 48 20 44 10" stroke="#1F1F1F" strokeWidth="3" fill="none" strokeLinecap="round" />
                {/* Legs */}
                <path d="M 14 36 L 14 42 M 22 36 L 22 42 M 30 36 L 30 42 M 36 36 L 36 42" stroke="#1F1F1F" strokeWidth="2.5" />
              </g>
            </svg>
          </div>

          {/* Subline */}
          <p className="text-base sm:text-xl text-[#1F1F1F]/80 font-medium leading-relaxed max-w-xl text-center mt-3 mb-6">
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

      {/* Editorial Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 w-full mt-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 hairline-t text-xs font-bold uppercase tracking-[0.16em] text-[#1F1F1F]/60 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="font-mono text-[#FF4B00]">01</span>
            <span>HOOK — Creative Brand Building</span>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="font-mono text-[#FF4B00]">02</span>
            <span>REEL — Performance Marketing</span>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="font-mono text-[#FF4B00]">03</span>
            <span>KEEP — Retention & CRM</span>
          </div>
        </div>
      </div>
    </section>
  );
}
