"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function ScrollHookMarker() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress(Math.min(Math.max(scrollY / docHeight, 0), 1));
        setVisible(scrollY > 150);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="hidden xl:block fixed right-6 top-28 bottom-28 w-4 pointer-events-none z-40 transition-opacity duration-300"
      aria-hidden="true"
    >
      {/* Subtle hairline guide */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-[#1F1F1F]/15" />

      {/* Miniature Hook gliding on line */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-5 h-7 transition-all duration-75 ease-out"
        style={{
          top: `calc(${progress * 100}% - 14px)`,
        }}
      >
        <Image
          src="/northgauge-hook.svg"
          alt=""
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}
