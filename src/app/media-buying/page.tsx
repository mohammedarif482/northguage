import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import PageHero from "@/components/PageHero";
import FeaturedCase from "@/components/media/FeaturedCase";
import LogoRows from "@/components/LogoRows";
import { AuditFindings, GrowthPlan, Structure } from "@/components/media/Findings";
import { Channels, RetentionLoop, WeeklyRhythm } from "@/components/media/Channels";
import { CaseTabs, ReportTable } from "@/components/media/Cases";
import Guarantee from "@/components/Guarantee";
import FitSection from "@/components/FitSection";
import FitCheck from "@/components/FitCheck";
import FAQ from "@/components/FAQ";
import FishingLine from "@/components/FishingLine";
import { MB_FAQ } from "@/components/faqs";
import { Hi, R } from "@/components/ui";
import { CAL } from "@/lib/content";

export const metadata: Metadata = {
  title: "Media buying",
  description:
    "Meta-led media buying across Google, quick commerce and DSP, bought by contribution margin from kept orders. Flat fee, zero markup on spend, you own the ad accounts.",
  alternates: { canonical: "/media-buying" },
  openGraph: { url: "/media-buying", title: "Media buying | NorthGauge" },
};

export default function MediaBuyingPage() {
  return (
    <SiteShell
      page="media-buying"
      footerHeading={
        <>
          Spend more.
          <br />
          <Hi>Keep more.</Hi>
        </>
      }
    >
      <PageHero
        eyebrow="Media buying · Meta, Google, quick commerce and DSP"
        lines={[{ text: "Buy media by margin." }, { text: "Not by ROAS.", ink: "charcoal" }]}
        body={
          <>
            For D2C brands spending <R india="₹8 lakh+" global="$50k+" /> a month whose ROAS drops every time they push spend.
            Meta leads, the other channels follow, and every rupee and dollar is judged on contribution margin from kept orders.
          </>
        }
        extra={<FeaturedCase />}
        secondary={{ href: "#cases", label: "See the case studies" }}
        ticks={[
          "Since 2022",
          "You own the ad accounts",
          "Flat fee, zero markup",
          "30-day exit after 90 days",
          { text: "Senior lead on your working hours", only: "global" },
        ]}
      />
      <FishingLine words={["Bought by margin", "Kept orders only", "Meta first", "One P&L"]} band="#1F1F1F" ink="#FFFDF2" anchor={0.5} />
      <LogoRows />
      <AuditFindings />
      <GrowthPlan />
      <Structure />
      <RetentionLoop />
      <WeeklyRhythm />
      <Channels />
      <CaseTabs />
      <ReportTable />
      <Guarantee />
      <FitSection />
      <FitCheck
        source="media-buying"
        calLink={CAL.mediaBuying}
        eyebrow="Free ad account audit"
        heading={
          <>
            See what your ROAS <Hi>is hiding.</Hi>
          </>
        }
        body="Give us read-only access for 48 hours. We match your ad platforms against Shopify and show you the real numbers on a 30-minute call."
        steps={[
          { title: "Attribution gap", body: "How many of the purchases your ad platforms claim actually show up as orders." },
          { title: "Real break-even", body: "The ROAS you need per hero SKU after product cost, shipping, payment fees and returns." },
          { title: "Three fixes", body: "The three changes worth the most margin, ranked. Yours to keep, whatever you decide." },
        ]}
        note="Read-only access. Reply within one working day. ISB-backed · You own every account."
      />
      <FAQ items={MB_FAQ} />
    </SiteShell>
  );
}
