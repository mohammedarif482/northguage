"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { track } from "@/lib/track";

/**
 * Sticky phone button. Appears after 700px of scroll and steps aside
 * while the booking section or footer is on screen.
 */
export default function MobileCTA() {
  const [past, setPast] = useState(false);
  const [nearEnd, setNearEnd] = useState(false);

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const targets: Element[] = [];
    const audit = document.getElementById("audit");
    if (audit) targets.push(audit);
    const footer = document.querySelector("footer");
    if (footer) targets.push(footer);
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
        setNearEnd(visible.size > 0);
      },
      { threshold: 0.1 }
    );
    targets.forEach((t) => io.observe(t));

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  const show = past && !nearEnd;

  return (
    <div
      aria-hidden={!show}
      className={`lg:hidden fixed inset-x-3 z-40 transition-all duration-300 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
      }`}
      style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)" }}
    >
      <a
        href="#audit"
        tabIndex={show ? 0 : -1}
        onClick={() => track("cta_click", { where: "mobile_sticky" })}
        className="flex items-center justify-between pl-6 pr-2 py-2 rounded-full bg-[#1F1F1F] text-[#FFFDF2] text-xs font-bold uppercase tracking-wider shadow-[0_16px_40px_-12px_rgba(31,31,31,0.6)]"
      >
        <span>See if you&rsquo;re a fit</span>
        <span className="w-10 h-10 rounded-full bg-[#FF4B00] flex items-center justify-center">
          <ArrowUpRight className="w-4 h-4" />
        </span>
      </a>
    </div>
  );
}
