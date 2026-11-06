"use client";

import { X } from "lucide-react";

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#1F1F1F]/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-[#FFFDF2] rounded-2xl p-8 sm:p-10 shadow-2xl border border-[#1F1F1F]/20 my-8 max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-stone-200 text-[#1F1F1F] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF4B00] mb-2">
          COMPLIANCE
        </div>
        <h3 className="text-2xl font-extrabold text-[#1F1F1F] mb-6">
          Privacy Policy
        </h3>

        <div className="space-y-4 text-xs sm:text-sm text-[#1F1F1F]/80 leading-relaxed">
          <p>
            <strong>1. Scope:</strong> Northgauge Agency Ltd provides brand, performance, and retention services across the UK, US, UAE, and Australia.
          </p>
          <p>
            <strong>2. Data Collection:</strong> Information submitted via our growth audit form (name, email, URL, and marketing budget) is used exclusively to prepare customized audit recommendations.
          </p>
          <p>
            <strong>3. Third Parties:</strong> We do not sell or monetize client or prospect data.
          </p>
          <p>
            <strong>4. Your Rights:</strong> You may request deletion or export of your submitted information at any time by contacting{" "}
            <a href="mailto:privacy@northgauge.com" className="text-[#FF4B00] underline">
              privacy@northgauge.com
            </a>.
          </p>
        </div>

        <div className="mt-8 pt-6 hairline-t flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-[#1F1F1F] text-white text-xs font-bold uppercase tracking-wider"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
