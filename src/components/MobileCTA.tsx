"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

/**
 * Thumb-reach action bar for phones. Appears once the hero is scrolled past,
 * and steps aside while the audit form or footer is on screen.
 */
export default function MobileCTA() {
  const [pastHero, setPastHero] = useState(false);
  const [nearEnd, setNearEnd] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const targets = ["audit", "leak-finder"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    const footer = document.querySelector("footer");
    if (footer) targets.push(footer);
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
        setNearEnd(visible.size > 0);
      },
      { threshold: 0.15 }
    );
    targets.forEach((t) => io.observe(t));

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  const show = pastHero && !nearEnd;

  return (
    <div
      aria-hidden={!show}
      className={`lg:hidden fixed inset-x-3 z-40 transition-all duration-300 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
      }`}
      style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)" }}
    >
      <div className="flex items-center gap-2 p-1.5 rounded-full bg-[#1F1F1F] shadow-[0_16px_40px_-12px_rgba(31,31,31,0.6)]">
        <a
          href="#leak-finder"
          tabIndex={show ? 0 : -1}
          className="flex-1 text-center py-3 rounded-full text-[#FFFDF2] text-xs font-bold uppercase tracking-wider"
        >
          30-sec leak test
        </a>
        <a
          href="#audit"
          tabIndex={show ? 0 : -1}
          className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-full bg-[#FF4B00] text-white text-xs font-bold uppercase tracking-wider"
        >
          Free audit <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
