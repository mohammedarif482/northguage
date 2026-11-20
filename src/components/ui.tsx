"use client";

import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import type { Dual } from "@/lib/content";
import { track } from "@/lib/track";

/* ------------------------------------------------------------------ */
/* Region: both variants are rendered, CSS shows one (no flash, no hydration mismatch). */
/* ------------------------------------------------------------------ */

export function R({ india, global }: { india: ReactNode; global: ReactNode }) {
  return (
    <>
      <span className="r-inr">{india}</span>
      <span className="r-usd">{global}</span>
    </>
  );
}

/** Renders a string or an India/Global pair, with any [slot] highlighted. */
export function D({ v }: { v: string | Dual }) {
  if (typeof v === "string") return <Fill text={v} />;
  return <R india={<Fill text={v.india} />} global={<Fill text={v.global} />} />;
}

/** Highlights any remaining [square bracket] slot so missing content is obvious before launch. */
export function Fill({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]*\])/g);
  if (parts.length === 1) return <>{text}</>;
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("[") && p.endsWith("]") ? (
          <span key={i} className="ng-slot" title="Content slot: fill in src/lib/content.ts">
            {p}
          </span>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        )
      )}
    </>
  );
}

/** Internal page links use next/link; hashes and external URLs stay plain anchors. */
export function SmartLink({ href, children, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Section header in the house style: serif-italic eyebrow + display caps. */
/* ------------------------------------------------------------------ */

export function SectionHead({
  eyebrow,
  title,
  body,
  align = "left",
  dark = false,
  className = "",
  size = "lg",
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  body?: ReactNode;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
  size?: "md" | "lg";
}) {
  const center = align === "center";
  return (
    <div className={`${center ? "text-center flex flex-col items-center" : ""} ${className}`}>
      <p className="font-serif italic text-xl sm:text-2xl text-[#FF4B00] leading-none mb-4">{eyebrow}</p>
      <h2
        className={`font-display font-black uppercase tracking-tight leading-[0.92] ${
          size === "lg" ? "text-4xl sm:text-6xl lg:text-7xl" : "text-3xl sm:text-5xl lg:text-6xl"
        } ${dark ? "text-[#FFFDF2]" : "text-[#1F1F1F]"} ${center ? "max-w-5xl" : "max-w-4xl"}`}
      >
        {title}
      </h2>
      {body && (
        <p
          className={`mt-6 text-base sm:text-lg font-medium leading-relaxed max-w-2xl ${
            dark ? "text-[#FFFDF2]/75" : "text-[#1F1F1F]/75"
          }`}
        >
          {body}
        </p>
      )}
    </div>
  );
}

/** Orange accent for the second half of a heading. */
export function Hi({ children }: { children: ReactNode }) {
  return <span className="text-[#FF4B00]">{children}</span>;
}

/* ------------------------------------------------------------------ */
/* Buttons */
/* ------------------------------------------------------------------ */

/** The primary button on every page: "See if you're a fit →". */
export function FitButton({
  label = "See if you’re a fit",
  href = "#audit",
  tone = "dark",
  size = "md",
  className = "",
  where,
}: {
  label?: string;
  href?: string;
  tone?: "dark" | "orange" | "light";
  size?: "sm" | "md";
  className?: string;
  where?: string;
}) {
  const tones = {
    dark: { btn: "bg-[#1F1F1F] hover:bg-black text-[#FFFDF2]", dot: "bg-[#FF4B00] text-white" },
    orange: { btn: "bg-[#FF4B00] hover:bg-[#E04200] text-white", dot: "bg-[#1F1F1F] text-white" },
    light: { btn: "bg-[#FFFDF2] hover:bg-white text-[#1F1F1F]", dot: "bg-[#FF4B00] text-white" },
  }[tone];
  return (
    <SmartLink
      href={href}
      onClick={() => track("cta_click", { label, where })}
      className={`inline-flex items-center gap-3 rounded-full font-bold uppercase tracking-wider shadow-md hover:shadow-xl transition-all duration-150 group ${
        size === "sm" ? "pl-5 pr-2 py-1.5 text-[11px]" : "pl-6 pr-2.5 py-2.5 text-xs"
      } ${tones.btn} ${className}`}
    >
      <span>{label}</span>
      <span
        className={`${size === "sm" ? "w-6 h-6" : "w-7 h-7"} rounded-full flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-45 ${tones.dot}`}
      >
        <ArrowUpRight className={size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"} />
      </span>
    </SmartLink>
  );
}

export function GhostButton({
  href,
  children,
  down = false,
  dark = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  down?: boolean;
  dark?: boolean;
  className?: string;
}) {
  return (
    <SmartLink
      href={href}
      className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-150 ${
        dark
          ? "bg-transparent hover:bg-[#FFFDF2]/10 text-[#FFFDF2] border-[#FFFDF2]/25"
          : "bg-white hover:bg-[#FAF1D6] text-[#1F1F1F] border-[#1F1F1F]/15 shadow-xs"
      } ${className}`}
    >
      <span>{children}</span>
      {down ? <ArrowDown className="w-3.5 h-3.5 text-[#FF4B00]" /> : <ArrowUpRight className="w-3.5 h-3.5 text-[#FF4B00]" />}
    </SmartLink>
  );
}

/* ------------------------------------------------------------------ */
/* Ticks row */
/* ------------------------------------------------------------------ */

export type Tick = string | { text: string; only: "india" | "global" };

export function Ticks({ items, dark = false, className = "" }: { items: Tick[]; dark?: boolean; className?: string }) {
  return (
    <ul className={`flex flex-wrap justify-center gap-x-5 gap-y-2 ${className}`}>
      {items.map((t) => {
        const text = typeof t === "string" ? t : t.text;
        const only = typeof t === "string" ? "" : t.only === "india" ? "r-inr" : "r-usd";
        return (
          <li
            key={text}
            className={`${only} inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-bold ${
              dark ? "text-[#FFFDF2]/80" : "text-[#1F1F1F]/75"
            }`}
          >
            <Check className="w-3.5 h-3.5 text-[#FF4B00] shrink-0" strokeWidth={3} />
            {text}
          </li>
        );
      })}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* ISB badge */
/* ------------------------------------------------------------------ */

export function IsbBadge({ text = "Backed and funded by ISB", className = "" }: { text?: string; className?: string }) {
  return (
    <span className={`ng-sticker bg-[#1F1F1F] text-[#FFFDF2] ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-[#FF4B00]" aria-hidden="true" />
      {text}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Counter: animates to 15,000+ when scrolled into view */
/* ------------------------------------------------------------------ */

export function Counter({ to, className = "" }: { to: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Reduced motion: leave val null, which renders the final figure.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const step = (now: number) => {
          const p = Math.min(1, (now - t0) / 1600);
          setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  // Server and no-JS render the final figure, so the claim is never shown as 0.
  const shown = val ?? to;
  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {shown.toLocaleString("en-GB")}
      {shown === to ? "+" : ""}
    </span>
  );
}
