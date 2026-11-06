"use client";

import { useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import gsap from "gsap";

interface HeroProps {
  isSplashDone?: boolean;
}

export default function Hero({ isSplashDone = true }: HeroProps) {
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const pill1Ref = useRef<HTMLAnchorElement>(null);
  const pill2Ref = useRef<HTMLAnchorElement>(null);
  const pill3Ref = useRef<HTMLAnchorElement>(null);
  const loopLeftRef = useRef<HTMLDivElement>(null);
  const loopRightRef = useRef<HTMLDivElement>(null);
  const bottomContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isSplashDone) return;

    const line1 = line1Ref.current;
    const line2 = line2Ref.current;
    const pill1 = pill1Ref.current;
    const pill2 = pill2Ref.current;
    const pill3 = pill3Ref.current;
    const loopLeft = loopLeftRef.current;
    const loopRight = loopRightRef.current;
    const bottomContent = bottomContentRef.current;

    const pills = [
      { el: pill1, baseRot: -3.5 },
      { el: pill2, baseRot: 3 },
      { el: pill3, baseRot: -2.5 },
    ];

    // Initial states before reveal
    if (line1 && line2) {
      gsap.set([line1, line2], { yPercent: 110, opacity: 0 });
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
    if (loopLeft && loopRight) {
      gsap.set([loopLeft, loopRight], { opacity: 0, scale: 0.9 });
    }
    if (bottomContent) {
      gsap.set(bottomContent, { opacity: 0, y: 25 });
    }

    // Master Hero Entrance Timeline
    const masterTl = gsap.timeline({
      delay: 0.1,
    });

    // 1. Headline Lines slide up from mask
    if (line1 && line2) {
      masterTl.to([line1, line2], {
        yPercent: 0,
        opacity: 1,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.16,
      });
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
      masterTl.kill();
    };
  }, [isSplashDone]);

  return (
    <section
      id="top"
      className="relative min-h-screen pt-32 sm:pt-36 pb-16 flex flex-col justify-between bg-[#FDF3EC] hairline-b overflow-hidden select-none"
    >
      {/* ============================================================== */}
      {/* Two26-Style Giant Orange Looping Line Art Left & Right */}
      {/* ============================================================== */}
      {/* Left Orange Loop */}
      <div
        ref={loopLeftRef}
        className="absolute -left-12 sm:left-0 top-20 sm:top-28 w-44 sm:w-64 h-[450px] sm:h-[600px] pointer-events-none z-0"
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

      {/* Right Orange Loop */}
      <div
        ref={loopRightRef}
        className="absolute -right-16 sm:right-0 top-16 sm:top-24 w-56 sm:w-80 h-[380px] sm:h-[500px] pointer-events-none z-0"
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
        <div className="relative inline-block w-full max-w-5xl my-4 sm:my-8">
          {/* Main Giant Headline with overflow masks for slide-up reveal */}
          <h1 className="font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[9.5rem] xl:text-[10.5rem] tracking-tight sm:tracking-tighter uppercase text-[#FF4B00] leading-[0.88] drop-shadow-xs">
            <span className="block overflow-hidden pb-1">
              <span ref={line1Ref} className="block will-change-transform">
                A HOOK FOR
              </span>
            </span>
            <span className="block overflow-hidden mt-1 sm:mt-2 pb-1">
              <span ref={line2Ref} className="block will-change-transform">
                CURIOUS BRANDS
              </span>
            </span>
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
        {/* Subline & Action Buttons */}
        {/* ============================================================== */}
        <div
          ref={bottomContentRef}
          className="w-full max-w-2xl mt-8 sm:mt-12 mb-6 flex flex-col items-center"
        >
          {/* Subline */}
          <p className="text-base sm:text-xl text-[#1F1F1F]/80 font-medium leading-relaxed max-w-xl text-center mb-8">
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
