"use client";

import { useEffect, useRef, useState } from "react";

interface CounterProps {
  end: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  sublabel: string;
}

function Counter({ end, decimals = 0, prefix = "", suffix = "", label, sublabel }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.25 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    const duration = 1800; // ms
    const frames = 60;
    const stepTime = duration / frames;
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      // easeOutCubic
      const progress = frame / frames;
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = ease * end;

      if (frame >= frames) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [hasStarted, end]);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center sm:items-start p-6 sm:p-8 rounded-3xl bg-white border border-[#1F1F1F]/8 shadow-xs hover:border-[#FF4B00]/40 transition-colors"
    >
      <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#FF4B00] tracking-tight mb-2">
        {prefix}
        {count.toFixed(decimals)}
        {suffix}
      </div>
      <div className="text-base sm:text-lg font-bold text-[#1F1F1F] mb-1 text-center sm:text-left">
        {label}
      </div>
      <div className="text-xs text-[#1F1F1F]/60 font-medium text-center sm:text-left">
        {sublabel}
      </div>
    </div>
  );
}

export default function ProofNumbers() {
  return (
    <section className="py-20 bg-[#FCF5CD]/20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="mb-10 sm:mb-12 flex flex-col items-center sm:items-start">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#FF4B00] mb-2">
            Measurable Proof
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F1F1F] tracking-tight">
            Numbers that stand up to curious scrutiny.
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Counter
            end={45}
            suffix="+"
            label="Brands Grown"
            sublabel="Across UK, US, UAE & Australia"
          />
          <Counter
            end={4.8}
            decimals={1}
            suffix="x"
            label="Average ROAS"
            sublabel="On all managed client spend"
          />
          <Counter
            end={18}
            prefix="$"
            suffix="M+"
            label="Ad Spend Managed"
            sublabel="Direct response paid social & search"
          />
          <Counter
            end={62}
            suffix="%"
            label="Repeat Revenue"
            sublabel="Driven through retention & CRM"
          />
        </div>
      </div>
    </section>
  );
}
