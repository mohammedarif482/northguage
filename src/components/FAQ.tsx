"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Who do you work with?",
      a: "Consumer and D2C brands across the UK, US, UAE, and Australia—typically doing USD $1M to $25M a year looking to profitably scale beyond acquisition plateaus.",
    },
    {
      q: "Do I need all three services?",
      a: "No. Most clients start with one stage—typically a Reel performance ads sprint or a Hook brand repositioning—and add the next when the signal confirms unit economics.",
    },
    {
      q: "How much does it cost?",
      a: "Monthly retainers start from USD $4,500/month for dedicated channel execution. We scope exact creative volume and channel ownership after your free 30-minute growth audit.",
    },
    {
      q: "How fast will we see results?",
      a: "Paid campaigns show signal within 4–6 weeks; brand repositioning and automated retention flows compound over 3–6 months into significantly higher customer lifetime value.",
    },
    {
      q: "Which time zone do you work in?",
      a: "We overlap with UK, US, UAE, and Australian hours, with a weekly strategic sprint call and live real-time dashboards.",
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 sm:py-36 bg-[#FFFDF2] hairline-b">
      <div className="max-w-4xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="pb-10 hairline-b mb-12 sm:mb-16">
          <p className="font-serif italic text-xl sm:text-2xl text-[#FF4B00] leading-none mb-3">Before you ask</p>
          <h2 className="text-5xl sm:text-7xl text-[#1F1F1F] font-display font-black uppercase tracking-tight leading-[0.9]">
            Fair <span className="text-[#FF4B00]">questions.</span>
          </h2>
        </div>

        {/* Clean Accordion List */}
        <div className="divide-y divide-[#1F1F1F]/15">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={faq.q} className="py-8">
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left flex items-start justify-between gap-6 focus:outline-hidden group"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-xs font-bold text-[#FF4B00] pt-1">
                      0{idx + 1}
                    </span>
                    <span className="text-xl sm:text-2xl font-extrabold text-[#1F1F1F] group-hover:text-[#FF4B00] transition-colors leading-snug">
                      {faq.q}
                    </span>
                  </div>
                  <div className="pt-1 text-[#1F1F1F]/60 group-hover:text-[#FF4B00] transition-colors">
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="pt-4 pl-8 sm:pl-9 pr-6 text-base text-[#1F1F1F]/80 leading-relaxed font-normal animate-in fade-in duration-150">
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
