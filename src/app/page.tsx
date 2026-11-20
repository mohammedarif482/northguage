"use client";

import { useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import SplashScreen from "@/components/SplashScreen";
import Header from "@/components/Header";
import ScrollHookMarker from "@/components/ScrollHookMarker";
import Hero from "@/components/Hero";
import ProofNumbers from "@/components/ProofNumbers";
import TheProblem from "@/components/TheProblem";
import Moves from "@/components/Moves";
import LeakFinder from "@/components/LeakFinder";
import FishingLine from "@/components/FishingLine";
import MobileCTA from "@/components/MobileCTA";
import TrustedBrands from "@/components/TrustedBrands";
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
  const [isSplashDone, setIsSplashDone] = useState(false);

  return (
    <>
      {/* Fullscreen Initial Opening Splash Screen */}
      <SplashScreen onComplete={() => setIsSplashDone(true)} />

      <SmoothScroll>
        <div className="relative min-h-screen flex flex-col bg-[#FFFDF2] text-[#1F1F1F]">
          {/* Floating Glass Pill Navigation */}
          <Header />

          {/* Scroll Progress Indicator Track on the Right Edge */}
          <ScrollHookMarker />

          <main id="main" className="grow">
            {/* Trigger: the hook */}
            <Hero isSplashDone={isSplashDone} />

            {/* Internal trigger: name the pain */}
            <TheProblem />

            {/* The line: signature ribbon on the seam between the problem and the three moves */}
            <FishingLine anchor={0.5} />

            {/* The three moves (#services, #hook, #reel, #keep) */}
            <Moves />

            {/* Action + variable reward (#leak-finder) */}
            <LeakFinder />

            {/* Proof (#work) */}
            <FeaturedWork />
            <ProofNumbers />

            {/* Brands (#brands) */}
            <TrustedBrands />

            {/* Values (#why-us) */}
            <WhyNorthgauge />

            <Testimonials />

            {/* FAQ (#faq) */}
            <FAQ />

            <FishingLine
              words={["Free growth audit", "Three fixes", "No pitch deck"]}
              band="#B7B2A7"
              ink="#1F1F1F"
              reverse
              flip
              anchor={0.5}
            />

            {/* Investment: the audit (#audit) */}
            <AuditBooking />
        </main>

        <MobileCTA />

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
    </>
  );
}
