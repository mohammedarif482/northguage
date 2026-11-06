"use client";

export default function LogoStrip() {
  const clientLogos = [
    "KINTO WELLNESS",
    "SÓL APPAREL",
    "AURA BOTANICALS",
    "VELOCE GOODS",
    "LUMINA HOME",
    "PEAK BREWING",
    "NOMI LIVING",
    "ARC HEALTH",
  ];

  return (
    <section className="py-10 bg-[#FAF1D6]/70 hairline-b overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 mb-6">
        <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#1F1F1F]/50">
          Trusted by curious brands in UK · US · UAE · Australia
        </p>
      </div>

      {/* Clean, slow horizontal ticker in stone grey */}
      <div className="relative w-full overflow-hidden">
        <div className="flex w-max animate-marquee-slow gap-16 sm:gap-24 items-center">
          {[...clientLogos, ...clientLogos, ...clientLogos].map((brand, idx) => (
            <div
              key={`${brand}-${idx}`}
              className="flex items-center gap-4 text-[#B7B2A7] hover:text-[#1F1F1F] transition-colors duration-200 cursor-default"
            >
              <span className="text-sm sm:text-base font-extrabold tracking-[0.2em] uppercase font-sans">
                {brand}
              </span>
              <span className="text-[#B7B2A7]/60 text-xs font-mono">/</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
