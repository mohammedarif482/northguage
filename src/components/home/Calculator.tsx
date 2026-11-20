"use client";

import { useRef, useState } from "react";
import { useRegion, type Region } from "@/lib/region";
import { track } from "@/lib/track";
import { FitButton, Hi, SectionHead } from "../ui";

const DEFAULTS: Record<Region, { aov: number; cogs: number; ship: number; fee: number; ret: number; spend: number; rev: number; spendChips: number[]; revChips: number[] }> = {
  in: { aov: 1600, cogs: 650, ship: 90, fee: 2, ret: 20, spend: 1000000, rev: 3000000, spendChips: [500000, 1000000, 2000000, 5000000], revChips: [1500000, 3000000, 6000000, 15000000] },
  gl: { aov: 60, cogs: 15, ship: 7, fee: 3, ret: 8, spend: 100000, rev: 300000, spendChips: [50000, 100000, 250000, 500000], revChips: [150000, 300000, 750000, 1500000] },
};

function fmt(v: number, region: Region) {
  const neg = v < 0;
  v = Math.abs(v);
  let s: string;
  const trim = (n: number, d: number) => n.toFixed(d).replace(/\.?0+$/, "");
  if (region === "in") {
    if (v >= 1e7) s = `₹${trim(v / 1e7, 2)} Cr`;
    else if (v >= 1e5) s = `₹${trim(v / 1e5, 2)} L`;
    else s = `₹${Math.round(v).toLocaleString("en-IN")}`;
  } else {
    if (v >= 1e6) s = `$${trim(v / 1e6, 2)}M`;
    else if (v >= 1e4) s = `$${trim(v / 1e3, 1)}k`;
    else s = `$${Math.round(v).toLocaleString("en-US")}`;
  }
  return (neg ? "−" : "") + s;
}

type Key = "aov" | "cogs" | "ship" | "fee" | "ret" | "spend" | "rev";

function Calc({ region }: { region: Region }) {
  const d = DEFAULTS[region];
  const [v, setV] = useState<Record<Key, string>>({
    aov: String(d.aov),
    cogs: String(d.cogs),
    ship: String(d.ship),
    fee: String(d.fee),
    ret: String(d.ret),
    spend: String(d.spend),
    rev: String(d.rev),
  });
  const tracked = useRef(false);
  const n = (k: Key) => {
    const x = parseFloat(v[k]);
    return isFinite(x) && x >= 0 ? x : 0;
  };
  const set = (k: Key, val: string) => {
    setV((p) => ({ ...p, [k]: val }));
    if (!tracked.current) {
      tracked.current = true;
      track("calculator_used", { region });
    }
  };

  // Formulas from the build spec. Paid orders bring revenue; returned or RTO orders bring none but still cost shipping.
  const aov = n("aov");
  const ret = Math.min(n("ret"), 99) / 100;
  const fee = n("fee") / 100;
  const spend = n("spend");
  const rev = n("rev");
  const kept = aov * (1 - ret);
  const perOrder = kept - n("cogs") * (1 - ret) - n("ship") - kept * fee;
  const mPct = aov > 0 ? perOrder / aov : 0;
  const be = perOrder > 0 ? aov / perOrder : Infinity;
  const now = spend > 0 ? rev / spend : 0;
  const profit = rev * mPct - spend;
  const bad = profit < 0;
  const cur = region === "gl" ? "$" : "₹";

  let verdict: string;
  if (!isFinite(be)) verdict = "This product loses money before any ads run. Fix price, product cost or returns first.";
  else if (spend <= 0) verdict = "Add your monthly ad spend to see where you stand.";
  else if (now >= be)
    verdict = `You are ${(now - be).toFixed(2)}x above break-even. Every extra ${cur}1 of ad spend at this ROAS keeps about ${cur}${(now * mPct - 1).toFixed(2)}.`;
  else verdict = `You are ${(be - now).toFixed(2)}x below break-even: losing ${fmt(-profit, region)} a month on ads.`;

  const unit = region === "gl" ? "In dollars" : "In rupees";

  const field = (k: Key, label: string, hint: string) => (
    <label className="block">
      <span className="block text-xs font-bold uppercase tracking-wider text-[#1F1F1F]/70 mb-1.5">{label}</span>
      <input
        type="number"
        inputMode="decimal"
        min={0}
        value={v[k]}
        onChange={(e) => set(k, e.target.value)}
        className="w-full px-4 py-3 rounded-lg border border-[#1F1F1F]/20 focus:border-[#FF4B00] focus-visible:ring-2 focus-visible:ring-[#FF4B00]/30 outline-hidden text-sm bg-white font-semibold tabular-nums"
      />
      <span className="block text-[11px] text-[#1F1F1F]/55 mt-1">{hint}</span>
    </label>
  );

  const chips = (k: "spend" | "rev", list: number[], label: string) => (
    <div>
      <span className="block text-xs font-bold uppercase tracking-wider text-[#1F1F1F]/70 mb-2">{label}</span>
      <div className="flex flex-wrap gap-2 mb-2">
        {list.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={n(k) === c}
            onClick={() => set(k, String(c))}
            className={`px-3.5 py-2 rounded-full text-xs font-bold border transition-colors ${
              n(k) === c ? "bg-[#1F1F1F] text-[#FFFDF2] border-[#1F1F1F]" : "bg-white border-[#1F1F1F]/15 hover:border-[#1F1F1F]/35"
            }`}
          >
            {fmt(c, region)}
          </button>
        ))}
      </div>
      <input
        type="number"
        inputMode="decimal"
        min={0}
        aria-label={`${label}, custom amount`}
        value={v[k]}
        onChange={(e) => set(k, e.target.value)}
        className="w-full px-4 py-3 rounded-lg border border-[#1F1F1F]/20 focus:border-[#FF4B00] focus-visible:ring-2 focus-visible:ring-[#FF4B00]/30 outline-hidden text-sm bg-white font-semibold tabular-nums"
      />
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7 rounded-[28px] bg-[#FFFDF2] border border-[#1F1F1F]/10 p-6 sm:p-8 space-y-6">
        {chips("spend", d.spendChips, "Monthly ad spend")}
        {chips("rev", d.revChips, "Monthly website revenue")}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
          {field("aov", "Average order value", unit)}
          {field("cogs", "Product cost per order", unit)}
          {field("ship", "Shipping per order", unit)}
          {field("fee", "Payment fees %", "Of order value")}
          {field("ret", region === "in" ? "Returns + RTO %" : "Returns %", "Of orders")}
        </div>
      </div>

      <div className="lg:col-span-5 rounded-[28px] bg-[#1F1F1F] text-[#FFFDF2] p-6 sm:p-8 flex flex-col" aria-live="polite">
        <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#FFFDF2]/65">What your ads leave in the bank each month</span>
        <output className={`mt-3 font-display font-black text-6xl sm:text-7xl tracking-tight leading-none tabular-nums ${bad ? "text-[#FF6B6B]" : "text-[#FF4B00]"}`}>
          {fmt(profit, region)}
        </output>
        <dl className="mt-8 grid grid-cols-3 gap-3 border-y border-[#FFFDF2]/12 py-5">
          {[
            ["Break-even ROAS", isFinite(be) ? `${be.toFixed(2)}x` : "Loss"],
            ["Your ROAS now", spend > 0 ? `${now.toFixed(2)}x` : "–"],
            ["Margin before ads", `${(mPct * 100).toFixed(1)}%`],
          ].map(([k, val]) => (
            <div key={k}>
              <dt className="text-[11px] font-bold uppercase tracking-wider text-[#FFFDF2]/55">{k}</dt>
              <dd className="mt-1 text-2xl font-extrabold tabular-nums">{val}</dd>
            </div>
          ))}
        </dl>
        <p className={`mt-5 text-base font-bold leading-snug ${bad ? "text-[#FF8A80]" : ""}`}>{verdict}</p>
        <p className="mt-4 text-xs text-[#FFFDF2]/60 leading-relaxed">
          Your ROAS here is all website revenue over all ad spend, so it is what your bank account sees, not what Meta reports.
        </p>
        <div className="mt-auto pt-6">
          <FitButton tone="orange" where="calculator" />
        </div>
      </div>
    </div>
  );
}

export default function Calculator() {
  const region = useRegion();
  return (
    <section id="calculator" data-marker className="relative bg-[#FFFDF2] py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <SectionHead
          eyebrow="Free tool"
          title={
            <>
              Are your ads <Hi>actually making money?</Hi>
            </>
          }
          body="Put in one hero product and your real monthly numbers. You get your break-even ROAS, your ROAS now, and what your ads leave in the bank each month."
          className="mb-12 sm:mb-14"
        />
        {/* Chips and defaults reset when the region changes */}
        <Calc key={region} region={region} />
      </div>
    </section>
  );
}
