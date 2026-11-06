"use client";

import Image from "next/image";

export default function TheProblem() {
  return (
    <section className="py-24 sm:py-32 bg-[#FFFDF2] relative overflow-hidden border-b border-[#1F1F1F]/10">
      {/* Subtle backdrop ornament */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#FCF5CD]/30 blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF4B00]/10 text-[#FF4B00] mb-8">
          <span className="text-xs font-bold tracking-[0.2em] uppercase">
            The Industry Fracture
          </span>
        </div>

        {/* Central Manifesto */}
        <p className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#1F1F1F] leading-snug sm:leading-relaxed mb-6">
          Most brands are split in three. A brand agency that makes things pretty.
          A performance agency that makes things cheap. A CRM freelancer nobody
          talks to.
        </p>

        <p className="text-xl sm:text-2xl md:text-3xl font-medium text-[#1F1F1F]/70 leading-relaxed mb-8">
          The result: great ads for a brand nobody remembers, or a beautiful brand
          nobody buys twice.
        </p>

        <div className="inline-block relative">
          <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#FF4B00] leading-snug sm:leading-relaxed">
            Northgauge puts all three on one line.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="h-[2px] w-16 bg-[#FF4B00]/40" />
            <div className="w-5 h-5 relative">
              <Image
                src="/northgauge-hook.svg"
                alt=""
                fill
                className="object-contain"
              />
            </div>
            <div className="h-[2px] w-16 bg-[#FF4B00]/40" />
          </div>
        </div>
      </div>
    </section>
  );
}
