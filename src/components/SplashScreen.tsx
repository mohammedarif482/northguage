"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hookRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    const hook = hookRef.current;
    const wordmark = wordmarkRef.current;
    const line = lineRef.current;
    const tag = tagRef.current;

    if (!container || !hook || !wordmark || !line || !tag) return;

    // Prevent background scrolling while splash is active
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        setMounted(false);
        onComplete();
      },
    });

    // 1. Initial states
    gsap.set(hook, { scale: 0.7, opacity: 0, rotation: -12 });
    gsap.set(wordmark, { opacity: 0, y: 15 });
    gsap.set(tag, { opacity: 0, y: 10 });
    gsap.set(line, { scaleX: 0, transformOrigin: "center center" });

    // 2. Hook emblem bounce & swing in
    tl.to(hook, {
      scale: 1,
      opacity: 1,
      rotation: 0,
      duration: 0.65,
      ease: "back.out(2)",
    })
      // 3. Wordmark and tagline reveal
      .to(
        wordmark,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.2"
      )
      .to(
        tag,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.2"
      )
      // 4. Subtle line trace fill
      .to(
        line,
        {
          scaleX: 1,
          duration: 0.55,
          ease: "power2.inOut",
        },
        "-=0.3"
      )
      // 5. Brief hold so user feels the craft
      .to({}, { duration: 0.35 })
      // 6. Smooth curtain lift (slide up to reveal hero)
      .to(container, {
        yPercent: -100,
        duration: 0.85,
        ease: "power4.inOut",
      });

    return () => {
      document.body.style.overflow = "";
      tl.kill();
    };
  }, [onComplete]);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FCF5CD] text-[#1F1F1F] select-none"
    >
      <div className="flex flex-col items-center max-w-sm px-6">
        {/* Animated Northgauge Hook Emblem */}
        <div ref={hookRef} className="relative w-20 h-28 mb-5">
          <Image
            src="/northgauge-hook.svg"
            alt="Northgauge Hook"
            fill
            priority
            className="object-contain"
          />
        </div>

        {/* Wordmark Logo */}
        <div ref={wordmarkRef} className="relative w-48 h-10 mb-3">
          <Image
            src="/northgauge-wordmark.svg"
            alt="Northgauge"
            fill
            priority
            className="object-contain"
          />
        </div>

        {/* Minimalist Progress hairline */}
        <div className="w-36 h-[2px] bg-[#1F1F1F]/10 rounded-full overflow-hidden my-3">
          <div ref={lineRef} className="w-full h-full bg-[#FF4B00] rounded-full" />
        </div>

        {/* Subtitle Monograph */}
        <div
          ref={tagRef}
          className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#1F1F1F]/60"
        >
          Creative-Led Growth
        </div>
      </div>
    </div>
  );
}
