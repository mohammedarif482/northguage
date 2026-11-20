"use client";

import { useEffect, useRef, useState } from "react";
import { Play, X } from "lucide-react";
import { TESTIMONIALS } from "@/lib/content";
import { useModal } from "@/lib/useModal";
import { track } from "@/lib/track";
import Placeholder from "../Placeholder";
import SwipeHint from "../SwipeHint";
import { Fill, Hi, SectionHead } from "../ui";

type T = (typeof TESTIMONIALS)[number];

function Lightbox({ item, onClose }: { item: T; onClose: () => void }) {
  const ref = useModal<HTMLDivElement>(true, onClose);
  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.founder}, ${item.brand}`}
      tabIndex={-1}
      data-lenis-prevent
      className="fixed inset-0 z-[80] bg-[#1F1F1F]/95 flex items-center justify-center p-4 outline-hidden"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close video"
        className="absolute top-5 right-5 w-11 h-11 rounded-full bg-[#FFFDF2] text-[#1F1F1F] flex items-center justify-center"
      >
        <X className="w-5 h-5" />
      </button>
      <video
        src={item.src}
        poster={item.poster || undefined}
        controls
        autoPlay
        playsInline
        className="max-h-[90vh] aspect-[9/16] rounded-2xl bg-black"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

function Tile({ item, i, onOpen }: { item: T; i: number; onOpen: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Muted autoplay only while on screen.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.4 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <figure className={`shrink-0 w-[68%] sm:w-[40%] lg:w-auto snap-start ${i % 2 ? "lg:translate-y-10" : ""}`}>
      <button
        type="button"
        onClick={item.src ? onOpen : undefined}
        aria-label={item.src ? `Play ${item.founder}, ${item.brand} with sound` : undefined}
        className="relative block w-full rounded-[22px] overflow-hidden shadow-[0_24px_50px_-24px_rgba(31,31,31,0.5)] group"
      >
        {item.src ? (
          <>
            <video
              ref={videoRef}
              src={item.src}
              poster={item.poster || undefined}
              muted
              loop
              playsInline
              preload="none"
              className="w-full aspect-[9/16] object-cover bg-[#1F1F1F]"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-14 h-14 rounded-full bg-[#FF4B00] text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                <Play className="w-5 h-5 translate-x-[1px]" fill="currentColor" />
              </span>
            </span>
          </>
        ) : (
          <Placeholder label="Founder video 9:16" kind="video" tone={i % 2 ? "charcoal" : "orange"} className="aspect-[9/16] rounded-none" />
        )}
        <span className="absolute top-3 left-3 ng-sticker bg-[#FFFDF2] text-[#1F1F1F] text-[11px] -rotate-2">
          <Fill text={item.result} />
        </span>
      </button>
      <figcaption className="mt-3 px-1">
        <div className="text-sm font-extrabold">
          <Fill text={item.founder} />
        </div>
        <div className="text-xs font-semibold text-[#1F1F1F]/60">
          <Fill text={item.brand} /> · <Fill text={item.category} />
        </div>
      </figcaption>
    </figure>
  );
}

export default function VideoTestimonials() {
  const [open, setOpen] = useState<T | null>(null);
  return (
    <section id="voices" className="relative bg-[#FFFDF2] py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <SectionHead
          eyebrow="In their words"
          title={
            <>
              Founders who <Hi>stopped guessing.</Hi>
            </>
          }
          body="No scripts. Just founders on what changed, and the number that proves it."
          className="mb-12 sm:mb-16"
        />
        <SwipeHint className="lg:hidden mb-3" />
        <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-6 px-6 sm:-mx-10 sm:px-10 gap-4 pb-12 lg:grid lg:grid-cols-5 lg:gap-5 lg:overflow-visible lg:mx-0 lg:px-0">
          {TESTIMONIALS.map((t, i) => (
            <Tile
              key={i}
              item={t}
              i={i}
              onOpen={() => {
                setOpen(t);
                track("video_play", { where: "testimonials", index: i });
              }}
            />
          ))}
        </div>
      </div>
      {open && <Lightbox item={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
