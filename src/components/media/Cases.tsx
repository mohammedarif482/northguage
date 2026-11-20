"use client";

import { useState } from "react";
import Image from "next/image";
import { MB_CASES } from "@/lib/content";
import Placeholder from "../Placeholder";
import { Fill, Hi, R, SectionHead } from "../ui";

/* ---------------- Case studies (#cases) ---------------- */

export function CaseTabs() {
  const [active, setActive] = useState(0);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (active + (e.key === "ArrowRight" ? 1 : MB_CASES.length - 1)) % MB_CASES.length;
    setActive(next);
    document.getElementById(`case-tab-${MB_CASES[next].id}`)?.focus();
  };

  return (
    <section id="cases" data-marker className="relative bg-[#FFFDF2] py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <SectionHead
          eyebrow="Case studies"
          title={
            <>
              Results, reported in full. <Hi>Including the difficult months.</Hi>
            </>
          }
          className="mb-10 sm:mb-14"
        />

        <div role="tablist" aria-label="Case studies by category" className="flex flex-wrap gap-2 mb-8" onKeyDown={onKey}>
          {MB_CASES.map((c, i) => (
            <button
              key={c.id}
              id={`case-tab-${c.id}`}
              role="tab"
              type="button"
              aria-selected={active === i}
              aria-controls={`case-panel-${c.id}`}
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-colors ${
                active === i ? "bg-[#1F1F1F] text-[#FFFDF2] border-[#1F1F1F]" : "bg-white border-[#1F1F1F]/15 hover:border-[#1F1F1F]/35"
              }`}
            >
              {c.tab}
            </button>
          ))}
        </div>

        {MB_CASES.map((c, i) => (
          <div
            key={c.id}
            id={`case-panel-${c.id}`}
            role="tabpanel"
            aria-labelledby={`case-tab-${c.id}`}
            hidden={active !== i}
            className="rounded-[28px] bg-[#FCF5CD] p-6 sm:p-10"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
              <div className="lg:col-span-5">
                <span className="ng-sticker bg-[#FF4B00] text-[#FFFDF2] -rotate-2">{c.tab}</span>
                <h3 className="mt-4 text-3xl font-extrabold">
                  <Fill text={c.client} />
                </h3>
                <table className="mt-6 w-full text-sm">
                  <thead>
                    <tr className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#1F1F1F]/55 text-left">
                      <th className="py-2 font-bold"></th>
                      <th className="py-2 font-bold text-right">Before</th>
                      <th className="py-2 font-bold text-right">After</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1F1F1F]/10 border-y border-[#1F1F1F]/10">
                    {c.rows.map(([k, before, after]) => (
                      <tr key={k}>
                        <th scope="row" className="py-3 text-left font-semibold text-[#1F1F1F]/75">
                          {k}
                        </th>
                        <td className="py-3 text-right font-bold tabular-nums">
                          <Fill text={before} />
                        </td>
                        <td className="py-3 text-right font-extrabold text-[#FF4B00] tabular-nums">
                          <Fill text={after} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="lg:col-span-7">
                {c.chart ? (
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-[#FFFDF2]">
                    <Image src={c.chart} alt={`${c.tab}: monthly spend against contribution margin, 12 months`} fill className="object-contain" />
                  </div>
                ) : (
                  <Placeholder label="Spend vs contribution margin · 12 months" tone="cream" className="aspect-[16/9]" />
                )}
                <dl className="mt-6 grid grid-cols-2 gap-4">
                  {Object.entries(c.phases).map(([phase, text]) => (
                    <div key={phase} className="rounded-xl bg-[#FFFDF2] p-4">
                      <dt className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#FF4B00]">{phase}</dt>
                      <dd className="mt-1 text-sm font-semibold">
                        <Fill text={text} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <blockquote className="mt-8 pt-6 border-t border-[#1F1F1F]/12">
              <p className="text-xl sm:text-2xl font-extrabold leading-snug">
                &ldquo;<Fill text={c.quote} />&rdquo;
              </p>
              <footer className="mt-2 text-sm font-semibold text-[#1F1F1F]/65">
                <Fill text={c.by} />
              </footer>
            </blockquote>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- The report behind every case ---------------- */

const report: { line: string; means: React.ReactNode; india: string; global: string }[] = [
  { line: "Ad spend", means: "All channels, from the invoices", india: "₹10,00,000", global: "$100,000" },
  { line: "Blended revenue", means: "All website revenue, from Shopify, not from the ad platforms", india: "₹31,00,000", global: "$310,000" },
  {
    line: "Kept-order revenue",
    means: (
      <>
        Blended revenue minus returns
        <span className="r-inr"> and RTO</span>
      </>
    ),
    india: "₹27,00,000",
    global: "$270,000",
  },
  { line: "Contribution margin", means: "Kept revenue minus product, shipping, payment fees and ad spend", india: "₹4,20,000", global: "$42,000" },
  { line: "New customers", means: "First-time buyers this month", india: "1,150", global: "3,570" },
  { line: "Cost per new customer", means: "Ad spend divided by new customers", india: "₹870", global: "$28" },
  { line: "Attribution window", means: "Stated every month, so nothing moves quietly", india: "7-day click, 1-day view", global: "7-day click, 1-day view" },
];

export function ReportTable() {
  return (
    <section id="report" data-marker className="relative bg-[#FCF5CD] text-[#1F1F1F] py-24 sm:py-32 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        <SectionHead
          eyebrow="The report behind every case"
          title={
            <>
              One page. <Hi>The numbers that pay bills.</Hi>
            </>
          }
          body="This is the monthly report every client gets, and the format behind every case above. Numbers below are illustrative."
          className="mb-12"
        />
        <div className="rounded-[28px] bg-[#FFFDF2] text-[#1F1F1F] p-5 sm:p-8 shadow-[0_30px_70px_-30px_rgba(31,31,31,0.45)] -rotate-[0.6deg]">
          <div className="flex items-center justify-between pb-4 hairline-b">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#1F1F1F]/65">Monthly P&amp;L report · Sample month</span>
            <span className="ng-sticker bg-[#FCF5CD] text-[#1F1F1F] text-[10px]">Illustrative</span>
          </div>
          <table className="w-full text-sm sm:text-base">
            <tbody className="divide-y divide-[#1F1F1F]/10">
              {report.map((r) => (
                <tr key={r.line} className={r.line === "Contribution margin" ? "bg-[#FF4B00]/8" : ""}>
                  <th scope="row" className="py-4 pr-4 text-left font-extrabold align-top w-[34%]">
                    {r.line}
                  </th>
                  <td className="py-4 pr-4 text-[#1F1F1F]/70 align-top hidden sm:table-cell">{r.means}</td>
                  <td
                    className={`py-4 text-right align-top font-display font-black tabular-nums whitespace-nowrap ${
                      r.line === "Contribution margin" ? "text-[#FF4B00] text-xl sm:text-2xl" : "text-lg sm:text-xl"
                    }`}
                  >
                    <R india={r.india} global={r.global} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
