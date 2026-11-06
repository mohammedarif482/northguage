"use client";

import { X, CheckCircle2, TrendingUp, Sparkles, ArrowUpRight } from "lucide-react";

export interface CaseStudy {
  id: string;
  brand: string;
  country: string;
  metric: string;
  timeframe: string;
  story: string;
  tags: string[];
  category: string;
  background: string;
  accentColor: string;
  fullCase: {
    challenge: string;
    moves: {
      hook: string;
      reel: string;
      keep: string;
    };
    results: {
      label: string;
      value: string;
    }[];
    quote: string;
    author: string;
  };
}

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
}

export default function CaseStudyModal({ caseStudy, onClose }: CaseStudyModalProps) {
  if (!caseStudy) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#FFFDF2] rounded-3xl p-6 sm:p-10 shadow-2xl border border-[#1F1F1F]/10 my-8 overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-[#1F1F1F] transition-colors focus:outline-hidden"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header tags */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="px-3 py-1 rounded-full bg-[#FF4B00] text-white text-xs font-bold uppercase tracking-wider">
            {caseStudy.brand}
          </span>
          <span className="text-xs font-semibold text-stone-500">
            {caseStudy.country} · {caseStudy.category}
          </span>
          {caseStudy.tags.map((t) => (
            <span
              key={t}
              className="px-2.5 py-0.5 rounded-full bg-[#FCF5CD] text-[#1F1F1F] text-[11px] font-bold"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Metric Highlight */}
        <h3 className="text-2xl sm:text-4xl font-extrabold text-[#1F1F1F] tracking-tight mb-2">
          {caseStudy.metric} in {caseStudy.timeframe}
        </h3>
        <p className="text-base text-[#1F1F1F]/70 font-medium mb-8">
          {caseStudy.story}
        </p>

        {/* Results Bar */}
        <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#FCF5CD]/50 border border-[#1F1F1F]/10 mb-8">
          {caseStudy.fullCase.results.map((res, i) => (
            <div key={i} className="text-center sm:text-left">
              <div className="text-xl sm:text-2xl font-extrabold text-[#FF4B00]">
                {res.value}
              </div>
              <div className="text-[11px] font-semibold text-stone-600 uppercase tracking-wider mt-0.5">
                {res.label}
              </div>
            </div>
          ))}
        </div>

        {/* The Challenge */}
        <div className="mb-6">
          <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#FF4B00] mb-2">
            The Bottleneck
          </h4>
          <p className="text-sm sm:text-base text-[#1F1F1F]/80 leading-relaxed">
            {caseStudy.fullCase.challenge}
          </p>
        </div>

        {/* The Three Moves Delivered */}
        <div className="space-y-3 mb-8">
          <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#FF4B00]">
            The Three Moves Executed
          </h4>

          <div className="p-3.5 rounded-xl bg-white border border-[#1F1F1F]/8">
            <span className="text-xs font-extrabold text-[#FF4B00] mr-2">01 HOOK:</span>
            <span className="text-xs sm:text-sm text-[#1F1F1F]/90 font-medium">
              {caseStudy.fullCase.moves.hook}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-[#1F1F1F]/8">
            <span className="text-xs font-extrabold text-[#FF4B00] mr-2">02 REEL:</span>
            <span className="text-xs sm:text-sm text-[#1F1F1F]/90 font-medium">
              {caseStudy.fullCase.moves.reel}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-[#1F1F1F]/8">
            <span className="text-xs font-extrabold text-[#FF4B00] mr-2">03 KEEP:</span>
            <span className="text-xs sm:text-sm text-[#1F1F1F]/90 font-medium">
              {caseStudy.fullCase.moves.keep}
            </span>
          </div>
        </div>

        {/* Founder Quote */}
        <div className="p-4 rounded-2xl bg-stone-100/70 border-l-4 border-[#FF4B00] mb-8">
          <p className="text-sm italic text-[#1F1F1F] font-medium mb-1">
            &ldquo;{caseStudy.fullCase.quote}&rdquo;
          </p>
          <p className="text-xs font-bold text-stone-600">
            — {caseStudy.fullCase.author}
          </p>
        </div>

        {/* CTA */}
        <div className="flex justify-end">
          <a
            href="#audit"
            onClick={onClose}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF4B00] hover:bg-[#E04200] text-white text-sm font-bold shadow-md transition-colors"
          >
            <span>Book an audit for your brand</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
