"use client";

import { X } from "lucide-react";
import { useModal } from "@/lib/useModal";

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  const dialogRef = useModal<HTMLDivElement>(isOpen, onClose);
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#1F1F1F]/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-title"
        tabIndex={-1}
        data-lenis-prevent
        className="outline-hidden relative w-full max-w-xl bg-[#FFFDF2] rounded-2xl p-8 sm:p-10 shadow-2xl border border-[#1F1F1F]/20 my-8 max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-stone-200 text-[#1F1F1F] transition-colors"
          aria-label="Close privacy policy"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF4B00] mb-2">
          COMPLIANCE
        </div>
        <h3 id="privacy-title" className="text-2xl font-extrabold text-[#1F1F1F] mb-6">
          Privacy Policy
        </h3>

        <div className="space-y-4 text-xs sm:text-sm text-[#1F1F1F]/80 leading-relaxed">
          <p>
            <strong>1. Scope:</strong> NorthGauge provides performance, creative and retention services to D2C brands in India, the US, UK, Middle East and Australia.
          </p>
          <p>
            <strong>2. Data Collection:</strong> Details you give when you book a fit check (name, email, website and your answers to the booking questions) are used only to prepare your audit and reply to you.
          </p>
          <p>
            <strong>3. Delivery &amp; Storage:</strong> Bookings are handled by our scheduling provider (Cal.com) and are not used for marketing lists.
          </p>
          <p>
            <strong>4. Analytics &amp; Cookies:</strong> We set no advertising cookies. If you accept analytics, we load cookieless Plausible Analytics to count page visits. Your choice is stored in your browser&apos;s local storage.
          </p>
          <p>
            <strong>5. Third Parties:</strong> We do not sell or monetize client or prospect data.
          </p>
          <p>
            <strong>6. Your Rights:</strong> You may request deletion or export of your submitted information at any time by contacting{" "}
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
