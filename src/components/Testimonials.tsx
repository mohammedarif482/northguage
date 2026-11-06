"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      quote:
        "Northgauge tied our creative directly to ROAS. We stopped burning budget on aesthetic fluff and finally unlocked scale.",
      author: "Arthur Pendelton",
      role: "Founder & CMO",
      brand: "Lumina Home Goods (UK)",
      result: "+184% YoY Growth",
    },
    {
      quote:
        "They completely rewired our customer retention. The second-purchase velocity dropped from 90 days down to 28 days flat.",
      author: "Sienna Rodriguez",
      role: "VP of E-commerce",
      brand: "Sól Activewear (US)",
      result: "4.9x Blended ROAS",
    },
    {
      quote:
        "One team managing the brand look, the ads, and the Klaviyo flows made our operating efficiency surge immediately.",
      author: "Kareem Al-Hassan",
      role: "Managing Director",
      brand: "Aura Botanicals (UAE)",
      result: "58% 90-Day Repeat",
    },
  ];

  const t = testimonials[currentIndex];

  const prev = () => {
    setCurrentIndex((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  };

  const next = () => {
    setCurrentIndex((c) => (c === testimonials.length - 1 ? 0 : c + 1));
  };

  return (
    <section className="py-24 sm:py-36 bg-[#FCF5CD] hairline-b">
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="flex items-center justify-between pb-8 hairline-b mb-12 sm:mb-16">
          <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#1F1F1F]/50">
            TESTIMONIALS // 09
          </div>
          <div className="font-mono text-xs font-bold text-[#FF4B00]">
            0{currentIndex + 1} / 0{testimonials.length}
          </div>
        </div>

        {/* Large Pull Quote */}
        <div className="min-h-[220px] flex flex-col justify-between">
          <blockquote className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-[#1F1F1F] tracking-tight leading-[1.18] mb-12">
            &ldquo;{t.quote}&rdquo;
          </blockquote>

          {/* Author and Result */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pt-8 hairline-t gap-6">
            <div>
              <div className="text-base font-extrabold text-[#1F1F1F]">
                {t.author}
              </div>
              <div className="text-xs font-medium text-[#1F1F1F]/70 mt-0.5">
                {t.role} · <span className="font-bold text-[#1F1F1F]">{t.brand}</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-[10px] font-mono uppercase text-[#1F1F1F]/50">
                  Client Result
                </div>
                <div className="text-xl font-extrabold text-[#FF4B00]">
                  {t.result}
                </div>
              </div>

              {/* Prev / Next controls */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={prev}
                  className="w-10 h-10 rounded-full border border-[#1F1F1F]/20 hover:border-[#1F1F1F] hover:bg-white flex items-center justify-center transition-colors text-[#1F1F1F]"
                  aria-label="Previous testimonial"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="w-10 h-10 rounded-full border border-[#1F1F1F]/20 hover:border-[#1F1F1F] hover:bg-white flex items-center justify-center transition-colors text-[#1F1F1F]"
                  aria-label="Next testimonial"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
