"use client";

import Image from "next/image";
import type { Creative } from "@/lib/content";
import Placeholder from "./Placeholder";

const aspectClass: Record<Creative["aspect"], string> = {
  "9/16": "aspect-[9/16]",
  "4/5": "aspect-[4/5]",
  "16/9": "aspect-[16/9]",
};

const isVideo = (src: string) => /\.(mp4|webm|mov)(\?|$)/i.test(src);

/**
 * One creative tile: muted looping video, image, or an intentional placeholder until the asset exists.
 * Videos are lazy (preload="none") so they never block first paint.
 */
export default function Media({
  item,
  tone = "cream",
  className = "",
  sizes = "(min-width: 1024px) 25vw, 50vw",
}: {
  item: Creative;
  tone?: "cream" | "orange" | "sun" | "lilac" | "charcoal";
  className?: string;
  sizes?: string;
}) {
  const box = `${aspectClass[item.aspect]} ${className}`;
  if (!item.src) {
    return (
      <Placeholder
        label={`${item.label} ${item.aspect.replace("/", ":")}`}
        kind={item.aspect === "4/5" ? "image" : "video"}
        tone={tone}
        className={box}
      />
    );
  }
  if (isVideo(item.src)) {
    return (
      <video
        className={`${box} w-full object-cover rounded-2xl bg-[#1F1F1F]`}
        src={item.src}
        poster={item.poster || undefined}
        muted
        loop
        autoPlay
        playsInline
        preload="none"
        aria-label={item.label}
      />
    );
  }
  return (
    <div className={`${box} relative overflow-hidden rounded-2xl`}>
      <Image src={item.src} alt={item.label} fill sizes={sizes} className="object-cover" loading="lazy" />
    </div>
  );
}
