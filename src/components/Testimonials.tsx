"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      quote:
        "Northgauge tied our creative directly to ROAS. We stopped burning budget on aesthetic fluff and finally unlocked scale.",
      name: "Arthur Pendelton",
      role: "Founder & CMO",
      brand: "Lumina Home Goods (UK)",
      result: "+184% YoY Growth",
      avatarInitials: "AP",
    },
    {
      quote:
        "They completely rewired our customer retention. The second-purchase velocity dropped from 90 days down to 28 days flat.",
      name: "Sienna Rodriguez",
      role: "VP of E-commerce",
      brand: "Sól Activewear (US)",
      result: "4.9x Blended ROAS",
      avatarInitials: "SR",
    },
    {
      quote:
        "One team managing the brand look, the ads, and the Klaviyo flows made our operating efficiency surge immediately.",
      name: "Kareem Al-Hassan",
      role: "Managing Director",
      brand: "Aura Botanicals (UAE)",
      result: "58% 90-Day Repeat",
      avatarInitials: "KA",
    },
  ];

  const current = testimonials[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-24 bg-[#FCF5CD]/30 border-b border-[#1F1F1F]/10">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF4B00]/10 text-[#FF4B00] mb-4">
            <span className="text-xs font-bold tracking-[0.2em] uppercase">
              Client Feedback
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1F1F1F] tracking-tight">
            Hooked clients say
          </h2>
        </div>

        {/* Carousel Card */}
        <div className="relative p-8 sm:p-14 rounded-3xl bg-white border border-[#1F1F1F]/10 shadow-xl overflow-hidden">
          {/* Subtle Quote icon */}
          <div className="absolute top-8 right-8 text-[#FF4B00]/15 pointer-events-none">
            <Quote className="w-20 h-20" />
          </div>

          {/* Star rating */}
          <div className="flex items-center gap-1 text-[#FF4B00] mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#FF4B00]" />
            ))}
            <span className="text-xs font-extrabold text-[#1F1F1F] ml-2">5.0 Verified Client</span>
          </div>

          {/* Quote (under 30 words) */}
          <blockquote className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1F1F1F] tracking-tight leading-snug mb-10">
            &ldquo;{current.quote}&rdquo;
          </blockquote>

          {/* Author info & Metric */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-8 border-t border-[#1F1F1F]/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#FCF5CD] border-2 border-[#FF4B00] flex items-center justify-center font-extrabold text-sm text-[#FF4B00]">
                {current.avatarInitials}
              </div>
              <div>
                <div className="font-extrabold text-base text-[#1F1F1F]">
                  {current.name}
                </div>
                <div className="text-xs text-[#1F1F1F]/70 font-medium">
                  {current.role} · <span className="font-bold text-[#1F1F1F]">{current.brand}</span>
                </div>
              </div>
            </div>

            {/* Big result pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FCF5CD] border border-[#FF4B00]/30">
              <span className="text-[11px] uppercase tracking-wider font-bold text-stone-600">Verified Result:</span>
              <span className="text-sm font-extrabold text-[#FF4B00]">{current.result}</span>
            </div>
          </div>

          {/* Slider controls */}
          <div className="flex items-center justify-between mt-8 pt-4">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-2.5 rounded-full transition-all duration-200 ${
                    i === activeIndex
                      ? "w-8 bg-[#FF4B00]"
                      : "w-2.5 bg-stone-300 hover:bg-stone-400"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-full bg-stone-100 hover:bg-[#FCF5CD] text-[#1F1F1F] hover:text-[#FF4B00] transition-colors"
                aria-label="Previous quote"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-full bg-stone-100 hover:bg-[#FCF5CD] text-[#1F1F1F] hover:text-[#FF4B00] transition-colors"
                aria-label="Next quote"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
