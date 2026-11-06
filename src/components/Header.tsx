"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "Why Northgauge", href: "#why-us" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-[#FFFDF2]/95 backdrop-blur-md py-4 border-b border-[#1F1F1F]/10"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
        {/* Brand Wordmark */}
        <a
          href="#top"
          className="flex items-center group focus:outline-hidden"
          aria-label="Northgauge Home"
        >
          <div className="relative h-7 w-32 sm:h-8 sm:w-40 transition-opacity group-hover:opacity-85">
            <Image
              src="/northgauge-wordmark.svg"
              alt="Northgauge"
              fill
              priority
              className="object-contain object-left text-[#FF4B00]"
            />
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-bold tracking-[0.14em] uppercase text-[#1F1F1F]/70 hover:text-[#FF4B00] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden sm:flex items-center">
          <a
            href="#audit"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF4B00] hover:bg-[#E04200] text-white text-xs font-bold tracking-[0.12em] uppercase transition-all duration-150 shadow-xs hover:shadow-md"
          >
            <span>Book a call</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex items-center gap-3 md:hidden">
          <a
            href="#audit"
            className="px-3.5 py-1.5 rounded-full bg-[#FF4B00] text-white text-xs font-bold uppercase tracking-wider"
          >
            Book call
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-[#1F1F1F] hover:text-[#FF4B00] focus:outline-hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFFDF2] border-b border-[#1F1F1F]/15 px-6 py-6 shadow-xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-bold uppercase tracking-widest text-[#1F1F1F] hover:text-[#FF4B00] py-2 border-b border-[#1F1F1F]/5"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#audit"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-3 w-full text-center py-3 rounded-full bg-[#FF4B00] text-white font-bold text-xs uppercase tracking-widest"
            >
              Get a free growth audit
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
