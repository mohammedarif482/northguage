"use client";

import { ArrowUp, ArrowUpRight } from "lucide-react";

interface FooterProps {
  onOpenPrivacy: () => void;
}

const menuLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Why us", href: "#why-us" },
  { label: "FAQ", href: "#faq" },
];

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "X", href: "https://twitter.com" },
];

export default function Footer({ onOpenPrivacy }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#1F1F1F] text-[#FFFDF2] overflow-hidden border-t border-[#FFFDF2]/10">
      {/* Faint looping fishing-line pattern */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <g stroke="#FFFDF2" strokeOpacity="0.045" strokeWidth="34" strokeLinecap="round">
          <path d="M-60 120C120 40 260 180 210 300C160 420 20 360 60 260C110 140 320 160 430 260C560 380 520 560 380 600C250 640 230 470 340 430C470 380 640 520 700 640" />
          <path d="M620 -40C700 80 860 120 960 60C1080 -10 1180 120 1100 230C1020 340 900 260 960 170C1030 70 1220 110 1300 230C1380 350 1300 480 1200 470C1100 460 1110 340 1210 340C1340 340 1460 450 1500 520" />
          <path d="M760 940C720 820 820 700 940 720C1060 740 1060 880 960 880C860 880 880 740 1000 690C1140 630 1300 700 1340 820" />
        </g>
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 pt-14 sm:pt-20">
        {/* Top: Headline + CTA | Menu + Socials */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16">
          <div className="lg:col-span-7 flex flex-col items-start">
            <h2 className="text-5xl sm:text-7xl mb-6 font-display font-black uppercase tracking-tight leading-[0.9]">
              Still curious?
              <br />
              <span className="text-[#FF4B00]">Say hello.</span>
            </h2>

            <a
              href="#audit"
              className="inline-flex items-center gap-3 pl-6 pr-2.5 py-2.5 rounded-full bg-[#FF4B00] hover:bg-[#E04200] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-xl transition-all duration-150 group mb-8"
            >
              <span>Book a call</span>
              <span className="w-7 h-7 rounded-full bg-[#1F1F1F] text-white flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-45">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </a>

            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#FF4B00] mb-2">Email us</div>
            <a
              href="mailto:hello@northgauge.com"
              className="text-xl sm:text-2xl font-bold hover:underline underline-offset-4"
            >
              hello@northgauge.com
            </a>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-8">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#FF4B00] mb-5">Main menu</div>
              <ul className="space-y-3 text-lg sm:text-xl font-bold">
                {menuLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="hover:text-[#FF4B00] transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#FF4B00] mb-5">Follow</div>
              <ul className="space-y-3 text-lg sm:text-xl font-bold">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 hover:text-[#FF4B00] transition-colors group"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Middle: tagline + hubs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 mt-12 sm:mt-16">
          <p className="lg:col-span-7 text-lg sm:text-xl font-bold leading-snug">
            A hook for curious brands.
            <br />
            <span className="text-[#FFFDF2]/60">Brand, performance &amp; retention on one line.</span>
          </p>
          <p className="lg:col-span-5 text-lg sm:text-xl font-bold leading-snug">
            London · New York
            <br />
            Dubai · Sydney
          </p>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-10 text-xs font-bold text-[#FFFDF2]/60">
          <span>© 2026 Northgauge Agency Ltd.</span>
          <div className="flex items-center gap-5">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-[#FF4B00] transition-colors cursor-pointer"
            >
              Privacy policy
            </button>
            <span className="text-[#FFFDF2]/40">·</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 hover:text-[#FF4B00] transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Giant bleeding wordmark */}
      <div className="relative z-10 px-4 sm:px-6 mt-4 -mb-[6%]">
        <div
          role="img"
          aria-label="Northgauge"
          className="w-full aspect-[1440/365] bg-[#FCF5CD]"
          style={{
            maskImage: "url(/northgauge-wordmark.svg)",
            WebkitMaskImage: "url(/northgauge-wordmark.svg)",
            maskSize: "contain",
            WebkitMaskSize: "contain",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskPosition: "center",
          }}
        />
      </div>
    </footer>
  );
}
