"use client";

import { useEffect, useRef, useState } from "react";

interface CounterProps {
  end: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

function CounterItem({ end, decimals = 0, prefix = "", suffix = "", label }: CounterProps) {
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
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    const duration = 1600;
    const frames = 50;
    const stepTime = duration / frames;
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
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
    <div ref={ref} className="p-8 sm:p-12 flex flex-col justify-between">
      <div className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#FF4B00] tracking-tight mb-4">
        {prefix}
        {count.toFixed(decimals)}
        {suffix}
      </div>
      <div className="text-sm font-bold uppercase tracking-[0.14em] text-[#1F1F1F]/80 leading-relaxed">
        {label}
      </div>
    </div>
  );
}

export default function ProofNumbers() {
  return (
    <section className="bg-[#FCF5CD] hairline-b">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 divide-x-0 sm:divide-x divide-[#1F1F1F]/12">
          <CounterItem end={45} suffix="+" label="Brands grown" />
          <CounterItem end={4.8} decimals={1} suffix="x" label="Average ROAS on managed spend" />
          <CounterItem end={18} prefix="USD " suffix="M" label="Ad spend managed" />
          <CounterItem end={62} suffix="%" label="Revenue from repeat customers" />
        </div>
      </div>
    </section>
  );
}
