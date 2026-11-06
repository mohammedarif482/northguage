"use client";

import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Who do you work with?",
      a: "Consumer and D2C brands across the UK, US, UAE, and Australia—typically doing USD $1M to $25M in annual turnover, looking for systematic creative testing, disciplined media buying, and real retention.",
    },
    {
      q: "Do I need all three services (Hook, Reel, Keep)?",
      a: "No. Most clients start with one stage—often a Reel performance ads sprint or a Hook brand repositioning—and add the next when signal confirms unit economics. Every stage is architected to fit together seamlessly whenever you're ready.",
    },
    {
      q: "How much does it cost?",
      a: "Monthly retainers start from USD $4,500/month for dedicated channel ownership. We scope exact creative volume, media cadence, and retention architecture directly after your free growth audit with 100% price transparency.",
    },
    {
      q: "How fast will we see results?",
      a: "Paid campaigns show signal and winning creative angles within 4–6 weeks. Brand repositioning, landing page CRO, and automated retention flows compound dramatically over 3–6 months into higher LTV.",
    },
    {
      q: "Which time zone do you work in?",
      a: "We overlap directly with UK, US (Eastern & Pacific), UAE, and Australian working hours. You get a dedicated Slack channel, a weekly strategic sprint call, and live real-time Triple Whale / Looker dashboards.",
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 sm:py-32 bg-[#FFFDF2] border-b border-[#1F1F1F]/10">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF4B00]/10 text-[#FF4B00] mb-4">
            <HelpCircle className="w-4 h-4" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase">
              Frequently Asked Questions
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1F1F1F] tracking-tight mb-4">
            Clear answers before we talk.
          </h2>
          <p className="text-base sm:text-lg text-[#1F1F1F]/70">
            Everything you need to know about partnering with Northgauge.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-[#FCF5CD]/40 border-[#FF4B00]/40 shadow-xs"
                    : "bg-white border-[#1F1F1F]/10 hover:border-[#1F1F1F]/20"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-hidden"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg sm:text-xl font-extrabold text-[#1F1F1F]">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isOpen
                        ? "bg-[#FF4B00] text-white"
                        : "bg-stone-100 text-[#1F1F1F]"
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-base text-[#1F1F1F]/80 leading-relaxed font-medium animate-in fade-in duration-200">
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
