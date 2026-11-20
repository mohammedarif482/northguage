"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Pause, Play, Star } from "lucide-react";

type Testimonial = {
  label: string;
  quote: string;
  author: string;
  role: string;
  initials: string;
  result: string;
  rating?: number;
  featured?: boolean;
};

const testimonials: Testimonial[] = [
  {
    label: "Hook · Lumina Home Goods (UK)",
    quote:
      "Northgauge tied our creative directly to ROAS. We stopped burning budget on aesthetic fluff.",
    author: "Arthur Pendelton",
    role: "Founder & CMO",
    initials: "AP",
    result: "+184% YoY",
  },
  {
    label: "Reel · Sól Activewear (US)",
    quote:
      "They completely rewired our retention. Second-purchase velocity dropped from 90 days to 28 flat.",
    author: "Sienna Rodriguez",
    role: "VP of E-commerce",
    initials: "SR",
    result: "4.9x ROAS",
    rating: 4.9,
    featured: true,
  },
  {
    label: "Keep · Aura Botanicals (UAE)",
    quote:
      "One team managing the brand, the ads, and the Klaviyo flows. Our efficiency surged immediately.",
    author: "Kareem Al-Hassan",
    role: "Managing Director",
    initials: "KA",
    result: "58% Repeat",
  },
  {
    label: "Reel · Performance Creative",
    quote:
      "Every hook they shipped came with a hypothesis and a number attached. That's rare.",
    author: "Priya Nair",
    role: "Head of Growth",
    initials: "PN",
    result: "-32% CPA",
  },
  {
    label: "Keep · Retention Flows",
    quote:
      "Our email revenue share doubled in a quarter without a single extra discount code.",
    author: "Tom Whitaker",
    role: "Co-founder",
    initials: "TW",
    result: "2x Email Rev",
    rating: 5.0,
    featured: true,
  },
  {
    label: "Hook · Brand Refresh",
    quote:
      "They made the brand look premium and still made it convert. We didn't think that was possible.",
    author: "Leila Haddad",
    role: "Brand Director",
    initials: "LH",
    result: "+41% CVR",
  },
];

function QuoteMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 26" aria-hidden="true" className={`w-7 h-6 ${className}`}>
      <path
        fill="currentColor"
        d="M0 0h13v13L7 26H1l5-13H0zM19 0h13v13l-6 13h-6l5-13h-6z"
      />
    </svg>
  );
}

function Stars({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${
              i < Math.round(value)
                ? "fill-[#FF4B00] text-[#FF4B00]"
                : "fill-white/20 text-transparent"
            }`}
          />
        ))}
      </div>
      <span className="font-mono text-xs font-bold">{value.toFixed(1)}</span>
    </div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  const dark = t.featured;
  return (
    <article
      data-card
      className={`relative snap-start shrink-0 overflow-hidden rounded-2xl p-6 sm:p-7 flex flex-col min-h-[300px] ${
        dark
          ? "w-[86vw] sm:w-[400px] bg-[#1F1F1F] text-white shadow-md"
          : "w-[78vw] sm:w-[290px] bg-[#FFFDF2] text-[#1F1F1F] border border-[#1F1F1F]/15 shadow-xs"
      }`}
    >
      {dark && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-16 -right-10 w-56 h-56 rounded-full bg-[#FF4B00]/35 blur-3xl" />
          <div className="absolute -bottom-20 left-6 w-48 h-48 rounded-full bg-[#FADCC4]/15 blur-3xl" />
        </div>
      )}

      <div className="relative flex flex-col grow">
        <div
          className={`text-[10px] font-mono uppercase tracking-widest mb-5 ${
            dark ? "text-white/50" : "text-[#1F1F1F]/65"
          }`}
        >
          {t.label}
        </div>

        <p className="text-lg sm:text-xl font-extrabold tracking-tight leading-[1.25]">
          {t.quote}
        </p>

        {t.rating !== undefined && (
          <div className="mt-5">
            <Stars value={t.rating} />
          </div>
        )}

        {!dark && <QuoteMark className="self-end mt-auto pt-6 text-[#FF4B00]" />}

        <div
          className={`flex items-end justify-between gap-4 mt-auto pt-4 ${
            dark ? "border-t border-white/15" : "hairline-t"
          } ${dark ? "" : "mt-4"}`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-extrabold ${
                dark ? "bg-[#FF4B00] text-white" : "bg-[#FCF5CD] text-[#FF4B00]"
              }`}
            >
              {t.initials}
            </div>
            <div>
              <div className="text-sm font-extrabold">{t.author}</div>
              <div className={`text-xs mt-0.5 ${dark ? "text-white/60" : "text-[#1F1F1F]/60"}`}>
                {t.role}
              </div>
            </div>
          </div>
          {dark ? (
            <QuoteMark className="text-[#FF4B00]" />
          ) : (
            <span className="font-serif italic text-base text-[#FF4B00] whitespace-nowrap">
              {t.result}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

/**
 * Work reel — client creative shown as circles under the headline.
 * Drop files into /public/work and set `src` (and `poster` for videos).
 * While `src` is empty, a branded placeholder renders instead.
 */
type WorkItem = {
  brand: string;
  kind: string;
  media: "image" | "video";
  src?: string;
  poster?: string;
  size: string;
  offset: string;
  tint: string;
};

const work: WorkItem[] = [
  { brand: "Kinto Wellness", kind: "Product Stills", media: "image", src: "/work/kinto-stills.jpg", size: "w-36 h-36 sm:w-44 sm:h-44", offset: "mt-4", tint: "from-[#FADCC4] to-[#FCF5CD]" },
  { brand: "Sól Apparel", kind: "UGC Ad", media: "video", src: "", poster: "/work/sol-ugc.jpg", size: "w-40 h-40 sm:w-48 sm:h-48", offset: "mt-32 sm:mt-40", tint: "from-[#1F1F1F] to-[#3a3a3a]" },
  { brand: "Aura Botanicals", kind: "Brand Film", media: "video", src: "", poster: "/work/aura-film.jpg", size: "w-56 h-56 sm:w-72 sm:h-72", offset: "mt-14 sm:mt-12", tint: "from-[#FF4B00] to-[#FADCC4]" },
  { brand: "Lumina Home", kind: "Campaign", media: "image", src: "/work/lumina-campaign.jpg", size: "w-36 h-36 sm:w-44 sm:h-44", offset: "mt-0", tint: "from-[#B7B2A7] to-[#FFFDF2]" },
  { brand: "Kinto Wellness", kind: "Packaging", media: "image", src: "/work/kinto-packaging.jpg", size: "w-40 h-40 sm:w-48 sm:h-48", offset: "mt-36 sm:mt-44", tint: "from-[#FCF5CD] to-[#FADCC4]" },
  { brand: "Sól Apparel", kind: "Meta Reel", media: "video", src: "", poster: "/work/sol-reel.jpg", size: "w-56 h-56 sm:w-72 sm:h-72", offset: "mt-10 sm:mt-8", tint: "from-[#1F1F1F] to-[#FF4B00]" },
];

function WorkBubble({ item }: { item: WorkItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const dark = item.tint.includes("#1F1F1F") || item.tint.startsWith("from-[#FF4B00]");
  const isVideo = item.media === "video";

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <figure
      className={`group relative shrink-0 rounded-full overflow-hidden ${item.size} ${item.offset}`}
    >
      {item.src || item.poster ? (
        isVideo && item.src ? (
          <video
            ref={videoRef}
            src={item.src}
            poster={item.poster || undefined}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <Image
            src={(item.src || item.poster)!}
            alt={`${item.brand} — ${item.kind}`}
            fill
            sizes="(min-width: 640px) 288px, 224px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )
      ) : (
        <div
          className={`absolute inset-0 bg-linear-to-br ${item.tint} flex flex-col items-center justify-center text-center p-6`}
        >
          <span
            className={`text-[10px] font-mono uppercase tracking-widest ${
              dark ? "text-white/60" : "text-[#1F1F1F]/65"
            }`}
          >
            {item.kind}
          </span>
          <span
            className={`font-serif italic text-lg sm:text-xl mt-1 ${
              dark ? "text-white" : "text-[#1F1F1F]"
            }`}
          >
            {item.brand}
          </span>
        </div>
      )}

      {isVideo && (
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? `Pause ${item.brand} video` : `Play ${item.brand} video`}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#1F1F1F] hover:bg-[#FF4B00] transition-colors flex items-center justify-center shadow-md"
        >
          {item.src && playing ? (
            <Pause className="w-4 h-4 fill-white text-white" />
          ) : (
            <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white text-white ml-0.5" />
          )}
        </button>
      )}

      {/* Hover caption */}
      {(item.src || item.poster) && (
        <figcaption className="absolute bottom-[14%] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#FFFDF2] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#1F1F1F] opacity-0 group-hover:opacity-100 transition-opacity">
          {item.brand} · <span className="font-serif italic normal-case tracking-normal text-[#FF4B00]">{item.kind}</span>
        </figcaption>
      )}
    </figure>
  );
}

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;

  const scrollToIndex = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll<HTMLElement>("[data-card]");
    const target = cards[Math.max(0, Math.min(i, cards.length - 1))];
    if (target) {
      track.scrollTo({ left: target.offsetLeft - track.offsetLeft, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-card]"));
      if (track.scrollLeft >= track.scrollWidth - track.clientWidth - 4) {
        setCurrent(cards.length - 1);
        return;
      }
      let idx = 0;
      cards.forEach((c, i) => {
        if (c.offsetLeft - track.offsetLeft <= track.scrollLeft + 20) idx = i;
      });
      setCurrent(idx);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="pt-24 sm:pt-36 bg-[#FFFDF2] hairline-t hairline-b overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-10 hairline-b mb-10 sm:mb-12 gap-6">
          <div>
            <p className="font-serif italic text-xl sm:text-2xl text-[#FF4B00] leading-none mb-3">In their words</p>
            <h2 className="text-5xl sm:text-7xl text-[#1F1F1F] font-display font-black uppercase tracking-tight leading-[0.9]">
              Founders who
              <br />
              <span className="text-[#FF4B00]">stopped guessing.</span>
            </h2>
          </div>
          <p className="text-sm font-medium text-[#1F1F1F]/70 max-w-sm">
            Real operators, real numbers. Every result tied back to revenue.
          </p>
        </div>
      </div>

      {/* Card track — aligned to the container, bleeds right */}
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-6 sm:px-10 scroll-px-6 sm:scroll-px-10 xl:px-[max(2.5rem,calc((100vw_-_80rem)/2_+_2.5rem))] xl:scroll-px-[max(2.5rem,calc((100vw_-_80rem)/2_+_2.5rem))]"
      >
        {testimonials.map((t) => (
          <TestimonialCard key={t.author} t={t} />
        ))}
      </div>

      {/* Pager */}
      <div className="flex flex-col items-center gap-3 mt-10">
        <div className="font-mono text-xs font-bold text-[#FF4B00] tabular-nums">
          {pad(current + 1)} <span className="text-[#1F1F1F]/65">/ {pad(total)}</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => scrollToIndex(current - 1)}
            disabled={current === 0}
            aria-label="Previous testimonial"
            className="w-10 h-10 rounded-full border border-[#1F1F1F]/20 hover:border-[#1F1F1F] hover:bg-[#FFFDF2] disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-colors text-[#1F1F1F]"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="relative w-28 h-px bg-[#1F1F1F]/15">
            <div
              className="absolute top-1/2 -translate-y-1/2 h-[3px] bg-[#FF4B00] rounded-full transition-all duration-300"
              style={{ width: `${100 / total}%`, left: `${(current / total) * 100}%` }}
            />
          </div>
          <button
            type="button"
            onClick={() => scrollToIndex(current + 1)}
            disabled={current === total - 1}
            aria-label="Next testimonial"
            className="w-10 h-10 rounded-full border border-[#1F1F1F]/20 hover:border-[#1F1F1F] hover:bg-[#FFFDF2] disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-colors text-[#1F1F1F]"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Headline */}
      <h2 className="mt-20 sm:mt-28 px-6 text-center text-4xl sm:text-6xl lg:text-7xl text-[#1F1F1F] font-display font-black uppercase tracking-tight leading-[0.9]">
        Brands scaling across
        <br />
        the <span className="text-[#FF4B00]">UK, US &amp; UAE.</span>
      </h2>

      {/* Work reel — client creative, clipped at the section's bottom edge */}
      <div className="relative mt-12 sm:mt-16 h-[320px] sm:h-[400px]">
        <div className="h-full overflow-hidden">
          {/* Two identical sets → translateX(-50%) loops seamlessly. Pauses on hover. */}
          <div
            className="animate-marquee-slow items-start h-full"
            style={{ animationDuration: "45s" }}
          >
            {[...work, ...work].map((item, i) => (
              <div
                key={i}
                className="shrink-0 pr-2 sm:pr-3"
                inert={i >= work.length}
              >
                <WorkBubble item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
