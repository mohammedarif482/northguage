"use client";

export default function LogoStrip() {
  const brands = [
    { name: "KINTO WELLNESS", category: "D2C UK", metric: "+184% YoY" },
    { name: "SÓL APPAREL", category: "Apparel US", metric: "4.9x ROAS" },
    { name: "AURA BOTANICALS", category: "Beauty UAE", metric: "58% Repeat" },
    { name: "VELOCE ACTIVE", category: "Fitness AUS", metric: "3.8x Scale" },
    { name: "LUMINA HOME", category: "Design UK", metric: "+210% LTV" },
    { name: "PEAK BREWING CO", category: "Beverage US", metric: "64% Retention" },
    { name: "NOMI LIVING", category: "Home Goods UAE", metric: "5.2x ROAS" },
  ];

  return (
    <section className="py-12 bg-[#FFFDF2] border-y border-[#1F1F1F]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#1F1F1F]/50">
          Trusted by curious brands in UK · US · UAE · Australia
        </p>
      </div>

      {/* Infinite marquee ticker */}
      <div className="relative w-full overflow-hidden mask-fade-edges">
        <div className="flex w-max animate-marquee gap-12 sm:gap-16 items-center">
          {/* Double list for smooth seamless loop */}
          {[...brands, ...brands].map((brand, idx) => (
            <div
              key={`${brand.name}-${idx}`}
              className="flex items-center gap-3 group opacity-60 hover:opacity-100 transition-opacity duration-200 cursor-default"
            >
              <div className="w-2 h-2 rounded-full bg-[#FF4B00]/40 group-hover:bg-[#FF4B00] transition-colors" />
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-extrabold tracking-wider text-[#1F1F1F]">
                  {brand.name}
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#B7B2A7]">
                  {brand.category} · {brand.metric}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
