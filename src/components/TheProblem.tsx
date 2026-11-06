"use client";

export default function TheProblem() {
  return (
    <section className="py-28 sm:py-40 bg-[#FFFDF2] hairline-b">
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        {/* Section label */}
        <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#1F1F1F]/40 mb-12 sm:mb-16">
          THE FRACTURE // 04
        </div>

        {/* Large Centred Paragraph */}
        <div className="space-y-6 sm:space-y-8 text-2xl sm:text-4xl md:text-[2.65rem] font-medium text-[#1F1F1F] tracking-tight leading-[1.25]">
          <p>
            Most brands are split in three. A brand agency that makes things
            pretty. A performance agency that makes things cheap. A CRM
            freelancer nobody talks to.
          </p>

          <p className="text-[#1F1F1F]/70">
            The result: great ads for a brand nobody remembers, or a beautiful
            brand nobody buys twice.
          </p>

          <p className="font-extrabold text-[#FF4B00] pt-4">
            Northgauge puts all three on one line.
          </p>
        </div>
      </div>
    </section>
  );
}
