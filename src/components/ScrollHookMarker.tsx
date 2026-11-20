"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function ScrollHookMarker() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const p = Math.min(Math.max(scrollY / docHeight, 0), 1);
        setProgress(p);
        setVisible(scrollY > 160);
      }

      // Check current active section
      const sections = ["top", "services", "hook", "reel", "keep", "leak-finder", "work", "brands", "why-us", "faq", "audit"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 250) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <aside
      className="hidden xl:flex fixed right-8 top-1/2 -translate-y-1/2 flex-col items-center pointer-events-none z-40 transition-opacity duration-300"
      aria-label="Scroll position indicator"
    >
      <div className="relative w-7 h-64 flex flex-col items-center justify-between py-2">
        {/* Subtle background hairline track */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-[#1F1F1F]/15" />

        {/* Section anchor nodes */}
        {["top", "services", "leak-finder", "work", "why-us", "audit"].map((sec) => (
          <div
            key={sec}
            className={`w-1.5 h-1.5 rounded-full transition-colors z-10 ${
              activeSection === sec
                ? "bg-[#FF4B00] scale-125"
                : "bg-[#1F1F1F]/25"
            }`}
          />
        ))}

        {/* Gliding Northgauge Hook */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-5 h-7 transition-all duration-75 ease-out z-20"
          style={{
            top: `calc(${progress * 100}% - 14px)`,
          }}
        >
          <Image
            src="/northgauge-hook.svg"
            alt=""
            fill
            className="object-contain drop-shadow-[0_0_1.5px_#FFFDF2]"
          />
        </div>
      </div>
    </aside>
  );
}
