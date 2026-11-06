"use client";

import { useState } from "react";
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
    <div className="relative min-h-screen flex flex-col bg-[#FFFDF2] text-[#1F1F1F]">
      {/* Sticky Header with dynamic shrink */}
      <Header />

      {/* Floating scroll progress hook marker along right edge */}
      <ScrollHookMarker />

      <main className="grow">
        {/* 1. Hero Section (#top) */}
        <Hero />

        {/* 2. Client Logo Marquee Strip */}
        <LogoStrip />

        {/* 3. Proof Numbers with interactive count-up */}
        <ProofNumbers />

        {/* 4. The Problem Manifesto */}
        <TheProblem />

        {/* 5. Hook. Reel. Keep. Spine Overview (#services) */}
        <HookReelKeepOverview />

        {/* 6. Service Deep Dives (#hook, #reel, #keep) */}
        <ServicePanels />

        {/* 7. Featured Work Case Studies & Interactive Modal (#work) */}
        <FeaturedWork />

        {/* 8. Why Northgauge Brand Pillars (#why-us) */}
        <WhyNorthgauge />

        {/* 9. Testimonial Carousel */}
        <Testimonials />

        {/* 10. FAQ Accordion (#faq) */}
        <FAQ />

        {/* 11. Book an Audit (Full-width Orange block + interactive form) (#audit) */}
        <AuditBooking />
      </main>

      {/* Footer */}
      <Footer onOpenPrivacy={() => setPrivacyOpen(true)} />

      {/* Cookie consent banner */}
      <CookieBanner onOpenPrivacy={() => setPrivacyOpen(true)} />

      {/* Privacy modal */}
      <PrivacyModal
        isOpen={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
      />
    </div>
  );
}
