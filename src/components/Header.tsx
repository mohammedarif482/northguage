"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-6 sm:px-10 transition-all duration-300 ${
        scrolled
          ? "py-2.5 sm:py-3 bg-[#FCF5CD]/85 backdrop-blur-md border-b border-[#1F1F1F]/10 shadow-[0_4px_20px_rgba(31,31,31,0.06)]"
          : "py-5 sm:py-6 bg-transparent border-b border-transparent"
      }`}
    >
      <div data-hero-anim data-header-row className="max-w-7xl mx-auto flex items-center justify-between">
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
            href="#leak-finder"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#1F1F1F] hover:text-[#FF4B00] text-xs font-bold uppercase tracking-wider shadow-xs border border-[#1F1F1F]/10 hover:border-[#1F1F1F]/30 transition-all duration-150"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4B00] animate-pulse" aria-hidden="true" />
            Leak test
          </a>
        </div>

        {/* Center: Brand Logo Wordmark (as in Two26 screenshot center) */}
        <div className="flex items-center">
          <a
            href="#top"
            className="flex items-center group focus:outline-hidden"
            aria-label="Northgauge Home"
          >
            <div className={`relative transition-all ${scrolled ? "h-9 w-36 sm:h-11 sm:w-44" : "h-11 w-44 sm:h-14 sm:w-56"} group-hover:scale-105 duration-200`}>
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
            <span className="font-mono text-[#1F1F1F]/65">Mon–Fri 09:00–18:00</span>
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
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

    </header>

      {/* Rendered outside <header>: its backdrop-filter would otherwise trap a fixed overlay. */}
      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
