"use client";

import { useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import ScrollHookMarker from "@/components/ScrollHookMarker";
import Hero from "@/components/Hero";
import LogoStrip from "@/components/LogoStrip";
import ProofNumbers from "@/components/ProofNumbers";
import TheProblem from "@/components/TheProblem";
import HookReelKeepOverview from "@/components/HookReelKeepOverview";
import ServicePanels from "@/components/ServicePanels";
import FeaturedWork from "@/components/FeaturedWork";
import WhyNorthgauge from "@/components/WhyNorthgauge";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import AuditBooking from "@/components/AuditBooking";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import PrivacyModal from "@/components/PrivacyModal";

export default function Home() {
  const [privacyOpen, setPrivacyOpen] = useState(false);

  return (
    <SmoothScroll>
      <div className="relative min-h-screen flex flex-col bg-[#FFFDF2] text-[#1F1F1F]">
        {/* Floating Glass Pill Navigation */}
        <Header />

        {/* Scroll Progress Indicator Track on the Right Edge */}
        <ScrollHookMarker />

        <main className="grow">
          {/* 1. Hero (#top) */}
          <Hero />

          {/* 2. Client Logo Strip */}
          <LogoStrip />

          {/* 3. Proof Numbers Counters */}
          <ProofNumbers />

          {/* 4. The Problem Manifesto */}
          <TheProblem />

          {/* 5. Hook. Reel. Keep. Spine Overview (#services) */}
          <HookReelKeepOverview />

          {/* 6. Service Deep Dives (#hook, #reel, #keep) */}
          <ServicePanels />

          {/* 7. Featured Work Case Studies (#work) */}
          <FeaturedWork />

          {/* 8. Why Northgauge Brand Pillars (#why-us) */}
          <WhyNorthgauge />

          {/* 9. Testimonials */}
          <Testimonials />

          {/* 10. FAQ Accordion (#faq) */}
          <FAQ />

          {/* 11. Book an Audit (Full-bleed Orange CTA block) (#audit) */}
          <AuditBooking />
        </main>

        {/* Footer */}
        <Footer onOpenPrivacy={() => setPrivacyOpen(true)} />

        {/* Cookie Banner */}
        <CookieBanner onOpenPrivacy={() => setPrivacyOpen(true)} />

        {/* Privacy Policy Modal */}
        <PrivacyModal
          isOpen={privacyOpen}
          onClose={() => setPrivacyOpen(false)}
        />
      </div>
    </SmoothScroll>
  );
}
