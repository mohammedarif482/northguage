import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 bg-[#FCF5CD] overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[260px] sm:w-[340px] aspect-[203.66/357.03] bg-[#FF4B00]/10 pointer-events-none"
        style={{
          maskImage: "url(/northgauge-hook.svg)",
          WebkitMaskImage: "url(/northgauge-hook.svg)",
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        }}
      />
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#1F1F1F]/65 mb-4">
          <span>ERROR</span>
          <span>·</span>
          <span className="font-serif italic text-sm text-[#FF4B00]">404 // OFF THE LINE</span>
        </div>
        <h1 className="font-display font-black text-6xl sm:text-8xl uppercase tracking-tight text-[#FF4B00] leading-[0.9] mb-6">
          Nothing
          <br />
          biting here.
        </h1>
        <p className="text-base sm:text-lg text-[#1F1F1F]/80 font-medium max-w-md mb-8">
          This page slipped off the hook. Head back and we&apos;ll reel you in.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-3 pl-6 pr-3 py-3 rounded-full bg-[#1F1F1F] hover:bg-black text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all duration-150 group"
        >
          <span>Back to home</span>
          <span className="w-7 h-7 rounded-full bg-[#FF4B00] text-white flex items-center justify-center transition-transform group-hover:rotate-45">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </Link>
      </div>
    </main>
  );
}
