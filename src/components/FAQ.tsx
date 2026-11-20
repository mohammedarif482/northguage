"use client";

import { useState, type ReactNode } from "react";
import { Plus, Minus } from "lucide-react";
import { Hi } from "./ui";

export type FaqItem = { q: string; a: ReactNode };

export default function FAQ({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" data-marker className="py-24 sm:py-36 bg-[#FFFDF2] hairline-b">
      <div className="max-w-4xl mx-auto px-6 sm:px-10">
        <div className="pb-10 hairline-b mb-6 sm:mb-10">
          <p className="font-serif italic text-xl sm:text-2xl text-[#FF4B00] leading-none mb-3">Before you ask</p>
          <h2 className="text-5xl sm:text-7xl text-[#1F1F1F] font-display font-black uppercase tracking-tight leading-[0.9]">
            Fair <Hi>questions.</Hi>
          </h2>
        </div>

        <div className="divide-y divide-[#1F1F1F]/15">
          {items.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const id = `faq-${idx}`;
            return (
              <div key={faq.q} className="py-7">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left flex items-start justify-between gap-6 focus:outline-hidden group"
                  aria-expanded={isOpen}
                  aria-controls={id}
                >
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-xs font-bold text-[#FF4B00] pt-1.5 w-5 shrink-0">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-lg sm:text-2xl font-extrabold text-[#1F1F1F] group-hover:text-[#FF4B00] transition-colors leading-snug">
                      {faq.q}
                    </span>
                  </div>
                  <div className="pt-1 text-[#1F1F1F]/60 group-hover:text-[#FF4B00] transition-colors">
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                </button>

                {isOpen && (
                  <div id={id} className="pt-4 pl-9 pr-6 text-base text-[#1F1F1F]/80 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
