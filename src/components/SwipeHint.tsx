import { ArrowRight } from "lucide-react";

/** Mobile-only cue that a row of cards scrolls sideways. */
export default function SwipeHint({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-end gap-2 text-xs font-bold uppercase tracking-[0.18em] ${
        dark ? "text-[#FFFDF2]/60" : "text-[#1F1F1F]/55"
      } ${className}`}
    >
      Swipe <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
    </div>
  );
}
