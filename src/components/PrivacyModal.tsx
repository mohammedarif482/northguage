"use client";

import { X, Shield } from "lucide-react";

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#FFFDF2] rounded-3xl p-6 sm:p-10 shadow-2xl border border-[#1F1F1F]/10 my-8 overflow-hidden max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-[#1F1F1F] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#FCF5CD] text-[#FF4B00] flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#1F1F1F]">
              Privacy & Data Policy
            </h3>
            <p className="text-xs text-stone-500">
              Compliant with UK GDPR, EU GDPR & Global Privacy Standards
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-[#1F1F1F]/80 leading-relaxed">
          <p>
            <strong>1. Who We Are:</strong> Northgauge is a creative-led growth agency
            operating across London (UK), New York (US), Dubai (UAE), and Sydney (Australia).
            We are dedicated to safeguarding the privacy and confidential growth metrics of our clients and site visitors.
          </p>

          <p>
            <strong>2. Data We Collect:</strong> When you request a growth audit or submit an inquiry, we collect your name, work email address, company website URL, and self-reported marketing metrics solely to conduct the audit and prepare strategic recommendations.
          </p>

          <p>
            <strong>3. How We Use Data:</strong> We never sell, rent, or lease brand or personal data to third parties. Data is used exclusively to evaluate growth opportunities, prepare audit decks, and provide client service communications.
          </p>

          <p>
            <strong>4. Cookies & Analytics:</strong> We use privacy-compliant cookies for aggregate site traffic telemetry (GA4, server-side attribution) to optimize user experience. You can withdraw or amend your consent at any time.
          </p>

          <p>
            <strong>5. Your Rights:</strong> Under UK and EU GDPR, you have the right to request access, rectification, or erasure of your personal data at any time by emailing{" "}
            <a href="mailto:privacy@northgauge.com" className="text-[#FF4B00] underline">
              privacy@northgauge.com
            </a>.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-[#1F1F1F]/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#1F1F1F] text-white text-xs font-bold hover:bg-[#FF4B00] transition-colors"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
}
