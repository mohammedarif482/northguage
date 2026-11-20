"use client";

import { getGsap, prefersReducedMotion } from "./motion";

/**
 * Hero entrance shared by every page. Elements carry `data-hero-anim` (hidden from first paint by CSS)
 * plus one role: data-hero-line (slides up from a mask), data-hero-pop (sticker pop),
 * data-hero-card (creative tiles fan in), data-hero-fade (rise + fade). The header row is revealed too.
 */
export function heroEntrance(root: HTMLElement) {
  if (prefersReducedMotion()) return () => {};
  const { gsap } = getGsap();
  const q = (s: string) => Array.from(root.querySelectorAll<HTMLElement>(s));
  const header = document.querySelector<HTMLElement>("[data-header-row]");
  const lines = q("[data-hero-line]");
  const pops = q("[data-hero-pop]");
  const cards = q("[data-hero-card]");
  const fades = q("[data-hero-fade]");
  const loops = q("[data-hero-loop]");

  const tl = gsap.timeline();
  if (lines.length) tl.fromTo(lines, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.9, ease: "power4.out", stagger: 0.12 });
  if (header) tl.fromTo(header, { opacity: 0, y: -24 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.25);
  if (pops.length)
    tl.fromTo(
      pops,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(2.4)", stagger: 0.14 },
      "-=0.45"
    );
  if (loops.length) tl.fromTo(loops, { opacity: 0, scale: 0.9 }, { opacity: 0.9, scale: 1, duration: 0.8, ease: "power2.out" }, "-=0.5");
  if (fades.length) tl.fromTo(fades, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", stagger: 0.1 }, "-=0.6");
  if (cards.length)
    tl.fromTo(
      cards,
      { opacity: 0, y: 90, rotation: (i: number) => (i % 2 ? 10 : -10) },
      {
        opacity: 1,
        y: 0,
        rotation: (i: number) => [-4, 2, -2, 4, -3, 3][i % 6],
        duration: 0.9,
        ease: "back.out(1.5)",
        stagger: 0.09,
      },
      "-=0.55"
    );
  return () => {
    tl.kill();
  };
}
