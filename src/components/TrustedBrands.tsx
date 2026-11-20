"use client";

const brandsA = [
  "KINTO WELLNESS",
  "SÓL APPAREL",
  "AURA BOTANICALS",
  "VELOCE GOODS",
];

const brandsB = [
  "LUMINA HOME",
  "PEAK BREWING",
  "NOMI LIVING",
  "ARC HEALTH",
];

const markets = ["UK", "US", "UAE", "Australia"];

function LogoColumn({
  brands,
  direction,
  className = "",
}: {
  brands: string[];
  direction: "up" | "down";
  className?: string;
}) {
  return (
    <div className={`relative h-full overflow-hidden ${className}`}>
      <div
        className={`flex flex-col ${
          direction === "up" ? "animate-marquee-up" : "animate-marquee-down"
        }`}
      >
        {[...brands, ...brands].map((brand, idx) => (
          <div
            key={`${brand}-${idx}`}
            className="h-36 sm:h-44 flex items-center justify-center text-center px-2"
          >
            <span className="text-base sm:text-lg lg:text-xl font-extrabold tracking-[0.2em] uppercase leading-snug text-[#8C8579] hover:text-[#1F1F1F] transition-colors duration-200 cursor-default">
              {brand}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TrustedBrands() {
  return (
    <section
      id="brands"
      className="relative bg-[#FFFDF2] text-[#1F1F1F] py-24 sm:py-36 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section label */}
        <p className="font-serif italic text-xl sm:text-2xl text-[#FF4B00] leading-none pb-6 hairline-b mb-12 sm:mb-16">Who we work with</p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          {/* Left: Headline + markets */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-12">
            <h2 className="text-5xl sm:text-7xl lg:text-8xl text-[#1F1F1F] font-display font-black uppercase tracking-tight leading-[0.9]">
              Trusted by
              <br />
              <span className="text-[#FF4B00]">curious brands.</span>
            </h2>

            <div>
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-[#1F1F1F]/65 mb-5">
                <span className="w-5 h-[2px] bg-[#FF4B00]" />
                <span>Across four markets</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-3xl sm:text-5xl text-[#1F1F1F] font-display font-black uppercase tracking-tight leading-[0.9]">
                {markets.map((m, i) => (
                  <span key={m} className="flex items-center gap-4">
                    <span>{m}</span>
                    {i < markets.length - 1 && (
                      <span className="text-[#FF4B00]">·</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Two staggered vertical logo columns */}
          <div
            className="lg:col-span-5 grid grid-cols-2 gap-6 h-[420px] sm:h-[520px] lg:h-[600px]"
            style={{
              maskImage:
                "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
            }}
          >
            <LogoColumn brands={brandsA} direction="up" />
            <LogoColumn brands={brandsB} direction="down" className="pt-20" />
          </div>
        </div>
      </div>
    </section>
  );
}
