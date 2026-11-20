"use client";

import { useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import { useModal } from "@/lib/useModal";
import { getGsap, prefersReducedMotion } from "@/lib/motion";
import { CONTACT_EMAIL } from "@/lib/site";
import { navLinks, type PageKey } from "./Header";
import RegionSwitch from "./RegionSwitch";
import { SmartLink } from "./ui";

interface MobileMenuProps {
  page: PageKey;
  open: boolean;
  onClose: () => void;
}

/** Full-screen phone menu: big thumb-sized links, CTA in reach, focus-trapped. */
export default function MobileMenu({ page, open, onClose }: MobileMenuProps) {
  const dialogRef = useModal<HTMLDivElement>(open, onClose);

  useEffect(() => {
    const el = dialogRef.current;
    if (!open || !el || prefersReducedMotion()) return;
    const { gsap } = getGsap();
    const tl = gsap.timeline();
    tl.fromTo(el, { clipPath: "circle(0% at 92% 4%)" }, { clipPath: "circle(150% at 92% 4%)", duration: 0.6, ease: "power3.inOut" })
      .from(el.querySelectorAll("[data-menu-link]"), { yPercent: 110, opacity: 0, duration: 0.55, ease: "power3.out", stagger: 0.06 }, "-=0.25")
      .from(el.querySelectorAll("[data-menu-foot]"), { y: 20, opacity: 0, duration: 0.4, ease: "power2.out" }, "-=0.3");
    return () => {
      tl.kill();
    };
  }, [open, dialogRef]);

  if (!open) return null;

  return (
    <div
      ref={dialogRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      tabIndex={-1}
      data-lenis-prevent
      className="lg:hidden fixed inset-0 z-[60] bg-[#FCF5CD] text-[#1F1F1F] flex flex-col outline-hidden overflow-y-auto"
    >
      <div className="flex items-center justify-between px-6 py-5">
        <SmartLink href="/" onClick={onClose} aria-label="NorthGauge home" className="relative h-9 w-36">
          <Image src="/northgauge-wordmark.svg" alt="NorthGauge" fill className="object-contain object-left" />
        </SmartLink>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="w-11 h-11 rounded-full bg-[#1F1F1F] text-[#FFFDF2] flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav aria-label="Main" className="flex-1 flex flex-col justify-center px-6">
        <ul>
          {navLinks(page).map((l, i) => (
            <li key={l.label} className="relative overflow-hidden border-b border-[#1F1F1F]/10">
              <SmartLink
                data-menu-link
                href={l.href}
                onClick={onClose}
                aria-current={l.active ? "page" : undefined}
                className={`flex items-baseline gap-4 py-4 active:text-[#FF4B00] ${l.active ? "text-[#FF4B00]" : ""}`}
              >
                <span className="font-serif italic text-lg text-[#FF4B00] w-6">{i + 1}</span>
                <span className="font-display font-black uppercase text-[2.4rem] sm:text-5xl tracking-tight leading-none whitespace-nowrap">
                  {l.label}
                </span>
              </SmartLink>
            </li>
          ))}
        </ul>
        <div data-menu-link className="mt-8 flex items-center gap-4">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#1F1F1F]/60">Market</span>
          <RegionSwitch className="inline-flex" />
        </div>
      </nav>

      <div data-menu-foot className="px-6 pb-[calc(env(safe-area-inset-bottom,0px)+24px)] pt-6 space-y-4">
        <a
          href="#audit"
          onClick={onClose}
          className="w-full inline-flex items-center justify-between pl-6 pr-2 py-2 rounded-full bg-[#1F1F1F] text-[#FFFDF2] text-sm font-bold uppercase tracking-wider"
        >
          <span>See if you&rsquo;re a fit</span>
          <span className="w-11 h-11 rounded-full bg-[#FF4B00] flex items-center justify-center">
            <ArrowUpRight className="w-5 h-5" />
          </span>
        </a>
        <div className="flex items-center justify-between text-xs font-bold text-[#1F1F1F]/65">
          <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-4">
            {CONTACT_EMAIL}
          </a>
          <span>Since 2022 · Mumbai</span>
        </div>
      </div>
    </div>
  );
}
