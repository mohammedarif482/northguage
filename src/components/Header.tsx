"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-5 sm:py-6 px-6 sm:px-10 transition-all duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: White rounded pill navigation (as in Two26 screenshot) */}
        <div className="hidden sm:flex items-center gap-2">
          <a
            href="#services"
            className="px-5 py-2.5 rounded-full bg-white text-[#1F1F1F] hover:text-[#FF4B00] text-xs font-bold uppercase tracking-wider shadow-xs border border-[#1F1F1F]/10 hover:border-[#1F1F1F]/30 transition-all duration-150"
          >
            Services
          </a>
          <a
            href="#work"
            className="px-5 py-2.5 rounded-full bg-white text-[#1F1F1F] hover:text-[#FF4B00] text-xs font-bold uppercase tracking-wider shadow-xs border border-[#1F1F1F]/10 hover:border-[#1F1F1F]/30 transition-all duration-150"
          >
            Work
          </a>
          <a
            href="#why-us"
            className="hidden md:inline-flex px-5 py-2.5 rounded-full bg-white text-[#1F1F1F] hover:text-[#FF4B00] text-xs font-bold uppercase tracking-wider shadow-xs border border-[#1F1F1F]/10 hover:border-[#1F1F1F]/30 transition-all duration-150"
          >
            Why Us
          </a>
        </div>

        {/* Center: Brand Logo Wordmark (as in Two26 screenshot center) */}
        <div className="flex items-center">
          <a
            href="#top"
            className="flex items-center group focus:outline-hidden"
            aria-label="Northgauge Home"
          >
            <div className="relative h-8 w-36 sm:h-9 sm:w-44 transition-transform group-hover:scale-105 duration-200">
              <Image
                src="/northgauge-wordmark.svg"
                alt="Northgauge"
                fill
                priority
                className="object-contain"
              />
            </div>
          </a>
        </div>

        {/* Right: Working hours + Black pill button with orange arrow (as in Two26 screenshot) */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex flex-col text-right text-[11px] font-bold uppercase tracking-wider text-[#1F1F1F]/60 leading-tight">
            <span>London · NY · Dubai · Sydney</span>
            <span className="font-mono text-[#1F1F1F]/40">Mon–Fri 09:00–18:00</span>
          </div>

          <a
            href="#audit"
            className="hidden sm:inline-flex items-center gap-2.5 pl-5 pr-2.5 py-2 rounded-full bg-[#1F1F1F] hover:bg-black text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-150 group"
          >
            <span>Book a call</span>
            <div className="w-6 h-6 rounded-full bg-[#FF4B00] text-white flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-45">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 rounded-full bg-white border border-[#1F1F1F]/15 text-[#1F1F1F]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#FFFDF2] border border-[#1F1F1F]/15 px-6 py-6 shadow-2xl mt-3 rounded-2xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-3">
            {[
              { label: "Services", href: "#services" },
              { label: "Work", href: "#work" },
              { label: "Why Northgauge", href: "#why-us" },
              { label: "FAQ", href: "#faq" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-bold uppercase tracking-wider text-[#1F1F1F] py-2 border-b border-[#1F1F1F]/5"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#audit"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 w-full text-center py-3.5 rounded-full bg-[#FF4B00] text-white font-bold text-xs uppercase tracking-widest shadow-md"
            >
              Book a call
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
