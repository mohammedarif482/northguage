"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function ScrollHookMarker() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const progress = Math.min(Math.max(scrollY / docHeight, 0), 1);
        setScrollProgress(progress);
        setIsVisible(scrollY > 120);
      }
    };

    window.addEventListener("scroll", updateScroll, { passive: true });
    updateScroll();
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="hidden lg:block fixed right-4 top-24 bottom-24 w-6 pointer-events-none z-40 transition-opacity duration-300"
      aria-hidden="true"
    >
      {/* Fishing line trace */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-[#FF4B00]/20 via-[#FF4B00]/40 to-[#FF4B00]/20" />

      {/* Sliding hook icon */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-6 h-6 transition-all duration-75 ease-out"
        style={{
          top: `calc(${scrollProgress * 100}% - 12px)`,
        }}
      >
        <div className="relative w-6 h-6 p-0.5 rounded-full bg-[#FFFDF2] shadow-sm border border-[#FF4B00]/40 flex items-center justify-center">
          <Image
            src="/northgauge-hook.svg"
            alt=""
            width={16}
            height={16}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
