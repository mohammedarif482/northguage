"use client";

import type { ReactNode } from "react";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { CONTACT_EMAIL } from "@/lib/site";
import { SOCIAL } from "@/lib/content";
import { FitButton, R, SmartLink } from "./ui";
import type { PageKey } from "./Header";

interface FooterProps {
  page: PageKey;
  heading: ReactNode;
  onOpenPrivacy: () => void;
}

export default function Footer({ page, heading, onOpenPrivacy }: FooterProps) {
  const services = [
    { label: "Media buying", href: "/media-buying" },
    { label: "Hook OS", href: "/hook-os" },
    { label: "Results", href: page === "main" ? "#work" : page === "media-buying" ? "#cases" : "/#work" },
  ];
  const socials = [
    { label: "Instagram", href: SOCIAL.instagram },
    { label: "LinkedIn", href: SOCIAL.linkedin },
  ];

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16">
          <div className="lg:col-span-7 flex flex-col items-start">
            <h2 className="text-5xl sm:text-7xl mb-8 font-display font-black uppercase tracking-tight leading-[0.9]">{heading}</h2>
            <FitButton tone="orange" where="footer" className="mb-8" />
            <p className="text-base sm:text-lg font-medium leading-relaxed text-[#FFFDF2]/70 max-w-lg">
              Ads, creative and retention for D2C brands, run as one P&amp;L. Backed and funded by the Indian School of
              Business (ISB) through its I-Venture Immersive programme.
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-8">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#FF4B00] mb-5">Services</div>
              <ul className="space-y-3 text-lg sm:text-xl font-bold">
                {services.map((l) => (
                  <li key={l.label}>
                    <SmartLink href={l.href} className="hover:text-[#FF4B00] transition-colors">
                      {l.label}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#FF4B00] mb-5">Contact</div>
              <ul className="space-y-3 text-lg sm:text-xl font-bold">
                <li>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-[#FF4B00] transition-colors break-all text-base sm:text-lg">
                    {CONTACT_EMAIL}
                  </a>
                </li>
                {socials.map((s) => (
                  <li key={s.label}>
                    {s.href ? (
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 hover:text-[#FF4B00] transition-colors group"
                      >
                        <span>{s.label}</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    ) : (
                      // Social URL not set yet (src/lib/content.ts → SOCIAL)
                      <span className="text-[#FFFDF2]/40">{s.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Legal line */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mt-14 sm:mt-16 pt-6 border-t border-[#FFFDF2]/10 text-xs font-bold text-[#FFFDF2]/60">
          <p className="max-w-3xl leading-relaxed">
            © 2026 NorthGauge · Est. 2022 · Mumbai · Working with D2C brands in India, the US, UK, Middle East and
            Australia.{" "}
            <R india="Fees exclude 18% GST." global="International fees are billed in USD." />
          </p>
          <div className="flex items-center gap-5 shrink-0">
            <button onClick={onOpenPrivacy} className="hover:text-[#FF4B00] transition-colors cursor-pointer">
              Privacy policy
            </button>
            <span className="text-[#FFFDF2]/40">·</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
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
          aria-label="NorthGauge"
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
