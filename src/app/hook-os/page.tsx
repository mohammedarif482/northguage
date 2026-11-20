import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import PageHero from "@/components/PageHero";
import LogoRows from "@/components/LogoRows";
import FishingLine from "@/components/FishingLine";
import { HookLoop, HookProblem } from "@/components/hookos/Loop";
import { Categories, WhatShips, WorkGrid } from "@/components/hookos/Offer";
import { InAtCost, Scorecard } from "@/components/hookos/Scorecard";
import Guarantee from "@/components/Guarantee";
import FitSection from "@/components/FitSection";
import FitCheck from "@/components/FitCheck";
import FAQ from "@/components/FAQ";
import { HOOK_FAQ } from "@/components/faqs";
import { Counter, Hi } from "@/components/ui";
import { CAL } from "@/lib/content";

export const metadata: Metadata = {
  title: "Hook OS",
  description:
    "Hook OS makes content that doubles as ad tests, built from 15,000+ winning ads and scored on FASCINATE. Shipped every week, reported on hook rate and cost per purchase.",
  alternates: { canonical: "/hook-os" },
  openGraph: { url: "/hook-os", title: "Hook OS | NorthGauge" },
};

export default function HookOsPage() {
  return (
    <SiteShell
      page="hook-os"
      footerHeading={
        <>
          Stop posting.
          <br />
          <Hi>Start testing.</Hi>
        </>
      }
    >
      <PageHero
        eyebrow="Hook OS · Built by an ISB-backed team"
        lines={[{ text: "Every reel" }, { text: "is an ad test.", ink: "charcoal" }]}
        body="For D2C brands whose ads die by week three. Hook OS doesn't sell a posting calendar. It makes content that doubles as ad tests, built from 15,000+ winning ads, shipped every week and reported on hook rate and cost per purchase."
        extra={
          <div className="inline-flex items-center gap-4 rounded-full bg-[#1F1F1F] text-[#FFFDF2] pl-6 pr-7 py-3 -rotate-1 shadow-[0_18px_40px_-20px_rgba(31,31,31,0.6)]">
            <span className="font-display font-black text-4xl sm:text-5xl text-[#FF4B00] leading-none">
              <Counter to={15000} />
            </span>
            <span className="text-left text-xs sm:text-sm font-bold uppercase tracking-[0.12em] leading-tight">
              winning ads
              <br />
              behind every brief
            </span>
          </div>
        }
        secondary={{ href: "#how", label: "See how it works" }}
        ticks={["Since 2022", "Creative count written into the contract", "Winners go straight into paid", "You own every file"]}
      />
      <FishingLine words={["Mine", "Make", "Test", "Scale", "Every reel is an ad test"]} band="#1F1F1F" ink="#FFFDF2" anchor={0.5} />
      <LogoRows />
      <HookProblem />
      <HookLoop />
      <WhatShips />
      <WorkGrid />
      <Categories />
      <Scorecard />
      <InAtCost />
      <Guarantee />
      <FitSection />
      <FitCheck
        source="hook-os"
        calLink={CAL.hookOs}
        tone="orange"
        eyebrow="Free creative teardown"
        heading="Find out why your ads die."
        body="We pull your last 90 days of ads and your competitors' live ads, run them against FASCINATE, and show you on a 30-minute call where the creative is breaking."
        steps={[
          { title: "Fatigue map", body: "How long your winners last, and how many new concepts you actually shipped." },
          { title: "FASCINATE score", body: "Your top ads scored on all nine elements, with the gaps marked." },
          { title: "Five hooks to test", body: "Written for your product from the 15,000+ library. Yours to keep." },
        ]}
        note="Reply within one working day. ISB-backed · You own every file."
      />
      <FAQ items={HOOK_FAQ} />
    </SiteShell>
  );
}
