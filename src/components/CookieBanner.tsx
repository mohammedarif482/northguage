"use client";

import { useState, useEffect } from "react";
import { Cookie, X } from "lucide-react";

interface CookieBannerProps {
  onOpenPrivacy: () => void;
}

export default function CookieBanner({ onOpenPrivacy }: CookieBannerProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("ng_cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("ng_cookie_consent", "accepted");
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem("ng_cookie_consent", "declined");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-[#FFFDF2] rounded-2xl p-5 shadow-2xl border border-[#1F1F1F]/15 animate-in slide-in-from-bottom duration-300">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#FCF5CD] text-[#FF4B00] flex items-center justify-center shrink-0 mt-0.5">
          <Cookie className="w-4 h-4" />
        </div>
        <div className="grow">
          <div className="text-xs font-bold text-[#1F1F1F] mb-1">
            Cookie & Analytics Notice
          </div>
          <p className="text-[11px] text-[#1F1F1F]/70 leading-relaxed mb-3">
            We use essential and analytics cookies to measure site interactions and enhance performance.
            Compliant with UK & EU ePrivacy guidelines.{" "}
            <button
              onClick={onOpenPrivacy}
              className="text-[#FF4B00] underline font-semibold"
            >
              Learn more
            </button>
            .
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={accept}
              className="px-4 py-1.5 rounded-full bg-[#FF4B00] hover:bg-[#E04200] text-white text-xs font-bold transition-colors"
            >
              Accept All
            </button>
            <button
              onClick={decline}
              className="px-3.5 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors"
            >
              Essential Only
            </button>
          </div>
        </div>
        <button
          onClick={decline}
          className="text-stone-400 hover:text-stone-600 p-1"
          aria-label="Dismiss cookie notice"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
