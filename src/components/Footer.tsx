"use client";

import Image from "next/image";
import { ArrowUp } from "lucide-react";

interface FooterProps {
  onOpenPrivacy: () => void;
}

export default function Footer({ onOpenPrivacy }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#FAF1D6] text-[#1F1F1F] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 hairline-b">
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="relative h-8 w-36 mb-4">
              <Image
                src="/northgauge-wordmark.svg"
                alt="Northgauge"
                fill
                className="object-contain object-left text-[#FF4B00]"
              />
            </div>
            <p className="text-xl sm:text-2xl font-extrabold text-[#1F1F1F] tracking-tight mb-4">
              A hook for curious brands.
            </p>
            <p className="text-sm text-[#1F1F1F]/70 max-w-sm mb-6 leading-relaxed">
              We align creative-led brand building, performance marketing, and
              retention on one continuous line.
            </p>
            <a
              href="mailto:hello@northgauge.com"
              className="text-xs font-mono font-bold text-[#FF4B00] hover:underline"
            >
              hello@northgauge.com
            </a>
          </div>

          {/* Nav Col */}
          <div className="md:col-span-3">
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1F1F1F]/40 mb-4">
              THE THREE MOVES
            </div>
            <ul className="space-y-3 text-xs font-bold uppercase tracking-[0.14em] text-[#1F1F1F]/80">
              <li>
                <a href="#hook" className="hover:text-[#FF4B00] transition-colors">
                  01 Hook — Brand Building
                </a>
              </li>
              <li>
                <a href="#reel" className="hover:text-[#FF4B00] transition-colors">
                  02 Reel — Performance Ads
                </a>
              </li>
              <li>
                <a href="#keep" className="hover:text-[#FF4B00] transition-colors">
                  03 Keep — Retention & CRM
                </a>
              </li>
              <li>
                <a href="#audit" className="hover:text-[#FF4B00] transition-colors text-[#FF4B00]">
                  Get Free Growth Audit
                </a>
              </li>
            </ul>
          </div>

          {/* Hubs & Social */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1F1F1F]/40 mb-4">
                OPERATING HUBS
              </div>
              <div className="text-sm font-bold uppercase tracking-wider text-[#1F1F1F] mb-6">
                London · New York · Dubai · Sydney
              </div>

              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1F1F1F]/40 mb-3">
                CONNECT
              </div>
              <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-[#1F1F1F]/80">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FF4B00] transition-colors"
                >
                  LinkedIn
                </a>
                <span>·</span>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FF4B00] transition-colors"
                >
                  Instagram
                </a>
                <span>·</span>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FF4B00] transition-colors"
                >
                  X
                </a>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#1F1F1F]/60 hover:text-[#FF4B00] transition-colors"
              >
                <span>Back to top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#1F1F1F]/50">
          <div>
            © 2026 NORTHGAUGE AGENCY LTD. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-[#FF4B00] transition-colors uppercase tracking-wider cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <span className="uppercase tracking-wider">UK / EU GDPR</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
