"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "Why Us", href: "#why-us" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#FFFDF2]/90 backdrop-blur-md py-3 shadow-xs border-b border-[#1F1F1F]/10"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#top"
          className="flex items-center gap-2 group focus:outline-hidden"
          aria-label="Northgauge Home"
        >
          <div className="relative h-7 w-28 sm:h-8 sm:w-36 transition-transform duration-200 group-hover:scale-[1.02]">
            <Image
              src="/northgauge-wordmark.svg"
              alt="Northgauge"
              fill
              priority
              className="object-contain text-[#FF4B00]"
            />
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-semibold tracking-wide text-[#1F1F1F]/80 hover:text-[#FF4B00] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="#audit"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#FF4B00] hover:bg-[#E04200] text-white text-sm font-bold tracking-wide transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Book a call</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          <a
            href="#audit"
            className="px-3.5 py-1.5 rounded-full bg-[#FF4B00] text-white text-xs font-bold sm:hidden"
          >
            Book call
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#1F1F1F] hover:text-[#FF4B00] transition-colors focus:outline-hidden"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFFDF2] border-b border-[#1F1F1F]/10 px-6 py-6 shadow-xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-[#1F1F1F] hover:text-[#FF4B00] py-2 border-b border-[#1F1F1F]/5"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#audit"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 w-full text-center py-3 rounded-full bg-[#FF4B00] text-white font-bold text-sm shadow-md"
            >
              Book a free growth audit
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
