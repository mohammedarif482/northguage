"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";
import RegionSwitch from "./RegionSwitch";
import { FitButton, Fill, SmartLink } from "./ui";
import { STATS } from "@/lib/content";

export type PageKey = "main" | "media-buying" | "hook-os";

export function navLinks(page: PageKey) {
  return [
    { label: "Media buying", href: "/media-buying", active: page === "media-buying" },
    { label: "Hook OS", href: "/hook-os", active: page === "hook-os" },
    { label: "Results", href: page === "main" ? "#work" : page === "media-buying" ? "#cases" : "/#work", active: false },
  ];
}

export default function Header({ page }: { page: PageKey }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const resultsHref = page === "main" ? "#work" : page === "media-buying" ? "#cases" : "/#work";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* Top bar: collapses once the page scrolls */}
        <div
          className={`bg-[#1F1F1F] text-[#FFFDF2] overflow-hidden transition-[max-height] duration-300 ${
            scrolled ? "max-h-0" : "max-h-12"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-10 py-2 flex items-center justify-center gap-x-3 text-[11px] sm:text-xs font-bold tracking-wide whitespace-nowrap">
            <span>Since 2022</span>
            <span className="text-[#FF4B00]" aria-hidden="true">·</span>
            <span className="hidden sm:inline">
              <Fill text={STATS.brandsGrown} /> brands grown
            </span>
            <span className="hidden sm:inline text-[#FF4B00]" aria-hidden="true">·</span>
            <span>Backed by ISB</span>
            <span className="text-[#FF4B00]" aria-hidden="true">·</span>
            <SmartLink href={resultsHref} className="inline-flex items-center gap-1 underline underline-offset-4 decoration-[#FF4B00] hover:text-[#FF4B00]">
              See results <ArrowRight className="w-3 h-3" />
            </SmartLink>
          </div>
        </div>

        <div
          className={`px-6 sm:px-10 transition-all duration-300 ${
            scrolled
              ? "py-2.5 bg-[#FCF5CD]/85 backdrop-blur-md border-b border-[#1F1F1F]/10 shadow-[0_4px_20px_rgba(31,31,31,0.06)]"
              : "py-4 sm:py-5 bg-transparent border-b border-transparent"
          }`}
        >
          <div data-hero-anim data-header-row className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            {/* Left: nav pills */}
            <nav aria-label="Main" className="hidden lg:flex items-center gap-2 flex-1">
              {navLinks(page).map((l) => (
                <SmartLink
                  key={l.label}
                  href={l.href}
                  aria-current={l.active ? "page" : undefined}
                  className={`px-4 xl:px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-xs border transition-all duration-150 ${
                    l.active
                      ? "bg-[#1F1F1F] text-[#FFFDF2] border-[#1F1F1F]"
                      : "bg-white text-[#1F1F1F] hover:text-[#FF4B00] border-[#1F1F1F]/10 hover:border-[#1F1F1F]/30"
                  }`}
                >
                  {l.label}
                </SmartLink>
              ))}
            </nav>

            {/* Centre: wordmark */}
            <SmartLink href={page === "main" ? "#top" : "/"} className="flex items-center group focus:outline-hidden" aria-label="NorthGauge home">
              <div
                className={`relative transition-all ${
                  scrolled ? "h-9 w-36 sm:h-10 sm:w-40" : "h-10 w-40 sm:h-12 sm:w-48"
                } group-hover:scale-105 duration-200`}
              >
                <Image src="/northgauge-wordmark.svg" alt="NorthGauge" fill priority className="object-contain" />
              </div>
            </SmartLink>

            {/* Right: region switch + primary button */}
            <div className="flex items-center justify-end gap-3 flex-1">
              <RegionSwitch className="hidden md:inline-flex" />
              <RegionSwitch compact className="inline-flex md:hidden" />
              <span className="hidden sm:inline-flex">
                <FitButton size="sm" where="header" />
              </span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-full bg-white border border-[#1F1F1F]/15 text-[#1F1F1F]"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Rendered outside <header>: its backdrop-filter would otherwise trap a fixed overlay. */}
      <MobileMenu page={page} open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
