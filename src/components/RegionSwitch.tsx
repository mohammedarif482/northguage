"use client";

import { useEffect } from "react";
import { setRegion, useRegion, type Region } from "@/lib/region";

/**
 * India ₹ / Global $ toggle. Active styling is CSS-driven from the <html> class,
 * so it is correct from first paint.
 */
export default function RegionSwitch({ compact = false, className = "" }: { compact?: boolean; className?: string }) {
  const region = useRegion();

  // A link ending #india / #global switches the market on the current page too.
  useEffect(() => {
    const onHash = () => {
      const h = location.hash.toLowerCase();
      if (h === "#india") setRegion("in");
      if (h === "#global") setRegion("gl");
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const opts: { r: Region; label: string; short: string; active: string }[] = [
    { r: "in", label: "India ₹", short: "₹", active: "[html:not(.global)_&]:bg-[#1F1F1F] [html:not(.global)_&]:text-[#FFFDF2]" },
    { r: "gl", label: "Global $", short: "$", active: "[html.global_&]:bg-[#1F1F1F] [html.global_&]:text-[#FFFDF2]" },
  ];

  return (
    <div
      role="group"
      aria-label="Market"
      className={`items-center p-1 rounded-full bg-white border border-[#1F1F1F]/10 shadow-xs ${className}`}
    >
      {opts.map((o) => (
        <button
          key={o.r}
          type="button"
          aria-pressed={region === o.r}
          aria-label={o.label}
          onClick={() => setRegion(o.r)}
          className={`rounded-full font-bold uppercase tracking-wider transition-colors text-[#1F1F1F]/70 hover:text-[#1F1F1F] ${
            compact ? "w-8 h-8 text-sm" : "px-3.5 py-1.5 text-[11px]"
          } ${o.active}`}
        >
          {compact ? o.short : o.label}
        </button>
      ))}
    </div>
  );
}
