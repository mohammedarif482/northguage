"use client";

import Image from "next/image";
import { ArrowUp, Mail } from "lucide-react";

interface FooterProps {
  onOpenPrivacy: () => void;
}

export default function Footer({ onOpenPrivacy }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#FCF5CD] text-[#1F1F1F] py-16 sm:py-20 border-t border-[#1F1F1F]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-[#1F1F1F]/15">
          {/* Col 1: Logo & Tagline */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="relative h-9 w-40 mb-4">
              <Image
                src="/northgauge-wordmark.svg"
                alt="Northgauge"
                fill
                className="object-contain"
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
              className="inline-flex items-center gap-2 text-sm font-bold text-[#FF4B00] hover:text-[#E04200] transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>hello@northgauge.com</span>
            </a>
          </div>

          {/* Col 2: Services / Navigation */}
          <div className="md:col-span-3">
            <div className="text-xs font-extrabold uppercase tracking-widest text-[#FF4B00] mb-4">
              The Three Moves
            </div>
            <ul className="space-y-2.5 text-sm font-semibold text-[#1F1F1F]/80">
              <li>
                <a href="#hook" className="hover:text-[#FF4B00] transition-colors">
                  01 Hook · Creative Brand Building
                </a>
              </li>
              <li>
                <a href="#reel" className="hover:text-[#FF4B00] transition-colors">
                  02 Reel · Performance Ads & CRO
                </a>
              </li>
              <li>
                <a href="#keep" className="hover:text-[#FF4B00] transition-colors">
                  03 Keep · Lifecycle Retention
                </a>
              </li>
              <li>
                <a href="#audit" className="hover:text-[#FF4B00] transition-colors">
                  Free Growth Audit
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Global Hubs & Social */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <div className="text-xs font-extrabold uppercase tracking-widest text-[#FF4B00] mb-4">
                Global Operating Hubs
              </div>
              <div className="text-sm font-bold text-[#1F1F1F] mb-6">
                London · New York · Dubai · Sydney
              </div>

              <div className="text-xs font-extrabold uppercase tracking-widest text-[#FF4B00] mb-3">
                Connect
              </div>
              <div className="flex items-center gap-4 text-sm font-semibold text-[#1F1F1F]/80">
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
                  X / Twitter
                </a>
              </div>
            </div>

            {/* Back to top button */}
            <div className="mt-8">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#1F1F1F]/60 hover:text-[#FF4B00] transition-colors"
              >
                <span>Back to top</span>
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-[#1F1F1F]/60">
          <div>
            © 2026 Northgauge Agency Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-[#FF4B00] transition-colors underline cursor-pointer"
            >
              Privacy & Cookie Policy
            </button>
            <span>·</span>
            <span>UK / EU GDPR Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
