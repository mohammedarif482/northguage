"use client";

import { useEffect, useRef } from "react";
import { getGsap, prefersReducedMotion } from "@/lib/motion";
import { Hi } from "./ui";

/** Creative count guarantee, with a rotating seal. Same on every page. */
export default function Guarantee() {
  const sealRef = useRef<SVGSVGElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const seal = sealRef.current;
    const wrap = wrapRef.current;
    if (!seal || !wrap || prefersReducedMotion()) return;
    const { gsap } = getGsap();
    const spin = gsap.to(seal, { rotation: 360, duration: 22, ease: "none", repeat: -1, transformOrigin: "50% 50%" });
    const pop = gsap.from(wrap, {
      scale: 0.4,
      rotation: -40,
      opacity: 0,
      duration: 1,
      ease: "back.out(1.7)",
      scrollTrigger: { trigger: wrap, start: "top 85%" },
    });
    return () => {
      spin.kill();
      pop.scrollTrigger?.kill();
      pop.kill();
    };
  }, []);

  return (
    <section id="guarantee" className="relative bg-[#1F1F1F] text-[#FFFDF2] py-24 sm:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div ref={wrapRef} className="md:col-span-4 flex justify-center">
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-[#FF4B00] shadow-[0_30px_60px_-20px_rgba(255,75,0,0.5)]">
            <svg ref={sealRef} viewBox="0 0 200 200" className="absolute inset-0 w-full h-full text-[#FFFDF2]" aria-hidden="true">
              <defs>
                <path id="seal-circle" d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0" />
              </defs>
              <text fontSize="14" fontWeight="800" fill="currentColor" style={{ fontFamily: "var(--font-sans)" }}>
                <textPath href="#seal-circle" textLength="470" lengthAdjust="spacing">
                  CREATIVE COUNT GUARANTEE ✦ NO SMALL PRINT ✦
                </textPath>
              </text>
            </svg>
            <div className="absolute inset-[22%] rounded-full bg-[#1F1F1F] flex items-center justify-center">
              <span
                aria-hidden="true"
                className="w-8 sm:w-10 aspect-[203.66/357.03] bg-[#FF4B00]"
                style={{
                  maskImage: "url(/northgauge-hook.svg)",
                  WebkitMaskImage: "url(/northgauge-hook.svg)",
                  maskSize: "contain",
                  WebkitMaskSize: "contain",
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                }}
              />
            </div>
            <span className="sr-only">Creative count guarantee</span>
          </div>
        </div>

        <div className="md:col-span-8">
          <p className="font-serif italic text-xl sm:text-2xl text-[#FF4B00] leading-none mb-4">Our guarantee</p>
          <h2 className="font-display font-black uppercase tracking-tight leading-[0.92] text-4xl sm:text-6xl lg:text-7xl">
            Miss the count, <Hi>and you don&rsquo;t pay for it.</Hi>
          </h2>
          <p className="mt-6 text-base sm:text-xl font-medium leading-relaxed text-[#FFFDF2]/75 max-w-2xl">
            If we ship fewer tested creatives in a month than your contract states, the shortfall is credited against your
            next invoice, pro rata. No arguments, no small print.
          </p>
        </div>
      </div>
    </section>
  );
}
