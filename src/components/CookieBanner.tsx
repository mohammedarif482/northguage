"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface CookieBannerProps {
  onOpenPrivacy: () => void;
}

export default function CookieBanner({ onOpenPrivacy }: CookieBannerProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("ng_consent");
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("ng_consent", "accepted");
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem("ng_consent", "declined");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:max-w-sm z-50 bg-[#FFFDF2] rounded-xl p-5 shadow-lg border border-[#1F1F1F]/20 animate-in slide-in-from-bottom duration-200">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="text-xs font-bold uppercase tracking-wider text-[#1F1F1F]">
          Cookies & Telemetry
        </div>
        <button
          onClick={decline}
          className="text-[#1F1F1F]/40 hover:text-[#1F1F1F]"
          aria-label="Dismiss"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <p className="text-xs text-[#1F1F1F]/70 leading-relaxed mb-4">
        We use privacy-compliant telemetry to measure performance.{" "}
        <button
          onClick={onOpenPrivacy}
          className="text-[#FF4B00] underline font-semibold"
        >
          Privacy Policy
        </button>
        .
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={accept}
          className="px-4 py-1.5 rounded-full bg-[#1F1F1F] hover:bg-[#FF4B00] text-white text-xs font-bold uppercase tracking-wider transition-colors"
        >
          Accept
        </button>
        <button
          onClick={decline}
          className="px-3.5 py-1.5 rounded-full border border-[#1F1F1F]/20 text-xs font-bold uppercase tracking-wider text-[#1F1F1F]/70 hover:text-[#1F1F1F] transition-colors"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
