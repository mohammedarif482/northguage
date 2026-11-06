"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Services", number: "01", href: "#services" },
    { label: "Work", number: "02", href: "#work" },
    { label: "Why Us", number: "03", href: "#why-us" },
    { label: "FAQ", number: "04", href: "#faq" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-5 pointer-events-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
        {/* Brand Logo - Top Left */}
        <div className="pointer-events-auto">
          <a
            href="#top"
            className="flex items-center group focus:outline-hidden"
            aria-label="Northgauge Home"
          >
            <div className="relative h-8 w-36 sm:h-9 sm:w-44 transition-opacity group-hover:opacity-80">
              <Image
                src="/northgauge-wordmark.svg"
                alt="Northgauge"
                fill
                priority
                className="object-contain object-left text-[#FF4B00]"
              />
            </div>
          </a>
        </div>

        {/* Center: Microdose / Two26-Style Floating Glass Nav Pill */}
        <nav className="hidden md:flex pointer-events-auto">
          <div className="nav-floating-pill">
            <div className="flex items-center gap-1 sm:gap-2 mr-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="group px-3.5 py-1.5 rounded-full hover:bg-[#1F1F1F]/5 transition-colors flex items-center gap-1.5"
                >
                  <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#1F1F1F]/75 group-hover:text-[#1F1F1F]">
                    {link.label}
                  </span>
                  <span className="font-serif italic text-xs text-[#FF4B00] font-normal">
                    {link.number}
                  </span>
                </a>
              ))}
            </div>

            {/* Integrated CTA inside pill */}
            <a
              href="#audit"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FF4B00] hover:bg-[#E04200] text-white text-xs font-bold uppercase tracking-wider transition-all duration-150 shadow-xs hover:shadow-md"
            >
              <span>Book a call</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </nav>

        {/* Right side: Accepting Brands micro-badge / Mobile Toggle */}
        <div className="pointer-events-auto flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCF5CD]/80 border border-[#1F1F1F]/10 text-[11px] font-bold uppercase tracking-wider text-[#1F1F1F]/70">
            <span className="w-2 h-2 rounded-full bg-[#FF4B00] animate-pulse" />
            <span>Q1 / Q2 Slots Open</span>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-[#FFFDF2]/90 border border-[#1F1F1F]/15 text-[#1F1F1F] focus:outline-hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden pointer-events-auto bg-[#FFFDF2] border-b border-[#1F1F1F]/15 px-6 py-6 shadow-2xl mx-4 mt-2 rounded-2xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-sm font-bold uppercase tracking-wider text-[#1F1F1F] hover:text-[#FF4B00] py-2 border-b border-[#1F1F1F]/5"
              >
                <span>{link.label}</span>
                <span className="font-serif italic text-sm text-[#FF4B00]">
                  {link.number}
                </span>
              </a>
            ))}
            <a
              href="#audit"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-3 w-full text-center py-3.5 rounded-full bg-[#FF4B00] text-white font-bold text-xs uppercase tracking-widest shadow-md"
            >
              Get a free growth audit
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
