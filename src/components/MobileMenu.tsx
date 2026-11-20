"use client";

import { useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import { useModal } from "@/lib/useModal";
import { getGsap, prefersReducedMotion } from "@/lib/motion";
import { CONTACT_EMAIL } from "@/lib/site";

const links = [
  { label: "Services", href: "#services", dot: "bg-[#FF4B00]" },
  { label: "Leak test", href: "#leak-finder", dot: "bg-[#FF4B00]", note: "30 sec" },
  { label: "Work", href: "#work", dot: "bg-[#FF4B00]" },
  { label: "Why us", href: "#why-us", dot: "bg-[#FF4B00]" },
  { label: "FAQ", href: "#faq", dot: "bg-[#FF4B00]" },
];

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

/** Full-screen phone menu: big thumb-sized links, CTA in reach, focus-trapped. */
export default function MobileMenu({ open, onClose }: MobileMenuProps) {
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
      className="sm:hidden fixed inset-0 z-[60] bg-[#FCF5CD] text-[#1F1F1F] flex flex-col outline-hidden overflow-y-auto"
    >
      {/* Top row mirrors the header */}
      <div className="flex items-center justify-between px-6 py-5">
        <a href="#top" onClick={onClose} aria-label="Northgauge home" className="relative h-9 w-36">
          <Image src="/northgauge-wordmark.svg" alt="Northgauge" fill className="object-contain object-left" />
        </a>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="w-11 h-11 rounded-full bg-[#1F1F1F] text-[#FFFDF2] flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Links */}
      <nav className="flex-1 flex flex-col justify-center px-6">
        <ul>
          {links.map((l, i) => (
            <li key={l.href} className="relative overflow-hidden border-b border-[#1F1F1F]/10">
              <a
                data-menu-link
                href={l.href}
                onClick={onClose}
                className="flex items-baseline gap-4 py-4 active:text-[#FF4B00]"
              >
                <span className="font-serif italic text-lg text-[#FF4B00] w-6">{i + 1}</span>
                <span className="font-display font-black uppercase text-[2.6rem] sm:text-5xl tracking-tight leading-none whitespace-nowrap">{l.label}</span>
                {l.note && (
                  <span className="ng-sticker absolute right-0 top-3 bg-[#FF4B00] text-[#FFFDF2] rotate-6">{l.note}</span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer: CTA in thumb reach */}
      <div data-menu-foot className="px-6 pb-[calc(env(safe-area-inset-bottom,0px)+24px)] pt-6 space-y-4">
        <a
          href="#audit"
          onClick={onClose}
          className="w-full inline-flex items-center justify-between pl-6 pr-2 py-2 rounded-full bg-[#1F1F1F] text-[#FFFDF2] text-sm font-bold uppercase tracking-wider"
        >
          <span>Get a free growth audit</span>
          <span className="w-11 h-11 rounded-full bg-[#FF4B00] flex items-center justify-center">
            <ArrowUpRight className="w-5 h-5" />
          </span>
        </a>
        <div className="flex items-center justify-between text-xs font-bold text-[#1F1F1F]/65">
          <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-4">
            {CONTACT_EMAIL}
          </a>
          <span>London · NY · Dubai · Sydney</span>
        </div>
      </div>
    </div>
  );
}
