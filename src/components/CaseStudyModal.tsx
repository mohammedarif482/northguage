"use client";

import { X, ArrowUpRight } from "lucide-react";

export interface CaseStudy {
  id: string;
  brand: string;
  country: string;
  metric: string;
  timeframe: string;
  story: string;
  tags: string[];
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#1F1F1F]/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#FFFDF2] rounded-2xl p-8 sm:p-12 shadow-2xl border border-[#1F1F1F]/20 my-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-stone-200 text-[#1F1F1F] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Meta */}
        <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.16em] text-[#1F1F1F]/60 mb-3 pb-3 hairline-b">
          <span>{caseStudy.brand}</span>
          <span>·</span>
          <span>{caseStudy.country}</span>
          <div className="ml-auto flex gap-1.5 font-mono text-[11px] text-[#FF4B00]">
            {caseStudy.tags.map((t) => (
              <span key={t}>[{t}]</span>
            ))}
          </div>
        </div>

        {/* Result Headline */}
        <h3 className="text-3xl sm:text-4xl font-extrabold text-[#1F1F1F] tracking-tight mb-2">
          {caseStudy.metric} in {caseStudy.timeframe}
        </h3>
        <p className="text-base text-[#1F1F1F]/75 mb-8">
          {caseStudy.story}
        </p>

        {/* Numbers Strip */}
        <div className="grid grid-cols-3 gap-4 py-4 px-6 rounded-xl bg-[#FCF5CD] border border-[#1F1F1F]/10 mb-8">
          {caseStudy.fullCase.results.map((r, i) => (
            <div key={i}>
              <div className="text-2xl font-extrabold text-[#FF4B00]">
                {r.value}
              </div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#1F1F1F]/60 mt-0.5">
                {r.label}
              </div>
            </div>
          ))}
        </div>

        {/* The Bottleneck */}
        <div className="mb-6">
          <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#FF4B00] mb-2">
            The Bottleneck
          </div>
          <p className="text-sm sm:text-base text-[#1F1F1F]/85 leading-relaxed">
            {caseStudy.fullCase.challenge}
          </p>
        </div>

        {/* The Moves Executed */}
        <div className="space-y-3 mb-8">
          <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#FF4B00] mb-2">
            The Three Moves Executed
          </div>

          <div className="p-3.5 rounded-lg bg-white border border-[#1F1F1F]/10 text-xs sm:text-sm">
            <span className="font-mono font-bold text-[#FF4B00] mr-2">01 HOOK:</span>
            <span className="text-[#1F1F1F]/85">{caseStudy.fullCase.moves.hook}</span>
          </div>

          <div className="p-3.5 rounded-lg bg-white border border-[#1F1F1F]/10 text-xs sm:text-sm">
            <span className="font-mono font-bold text-[#FF4B00] mr-2">02 REEL:</span>
            <span className="text-[#1F1F1F]/85">{caseStudy.fullCase.moves.reel}</span>
          </div>

          <div className="p-3.5 rounded-lg bg-white border border-[#1F1F1F]/10 text-xs sm:text-sm">
            <span className="font-mono font-bold text-[#FF4B00] mr-2">03 KEEP:</span>
            <span className="text-[#1F1F1F]/85">{caseStudy.fullCase.moves.keep}</span>
          </div>
        </div>

        {/* Quote */}
        <div className="p-5 rounded-xl bg-stone-100 border-l-2 border-[#FF4B00] mb-8">
          <p className="text-sm italic text-[#1F1F1F] mb-2">
            &ldquo;{caseStudy.fullCase.quote}&rdquo;
          </p>
          <div className="text-xs font-bold text-[#1F1F1F]/70">
            — {caseStudy.fullCase.author}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-end pt-4 hairline-t">
          <a
            href="#audit"
            onClick={onClose}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF4B00] hover:bg-[#E04200] text-white text-xs font-bold uppercase tracking-[0.12em] transition-colors"
          >
            <span>Book an audit for your brand</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
