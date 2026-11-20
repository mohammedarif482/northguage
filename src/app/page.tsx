import SiteShell from "@/components/SiteShell";
import Hero from "@/components/home/Hero";
import FishingLine from "@/components/FishingLine";
import LogoRows from "@/components/LogoRows";
import VideoTestimonials from "@/components/home/VideoTestimonials";
import PortfolioDonuts from "@/components/home/PortfolioDonuts";
import TenLeaks from "@/components/home/TenLeaks";
import TwoEngines from "@/components/home/TwoEngines";
import HookOsEdge from "@/components/home/HookOsEdge";
import GaugeMethod from "@/components/home/GaugeMethod";
import ProofCases from "@/components/home/ProofCases";
import Guarantee from "@/components/Guarantee";
import FitSection from "@/components/FitSection";
import LeakTest from "@/components/home/LeakTest";
import Calculator from "@/components/home/Calculator";
import FitCheck from "@/components/FitCheck";
import FAQ from "@/components/FAQ";
import { MAIN_FAQ } from "@/components/faqs";
import { Hi } from "@/components/ui";
import { CAL } from "@/lib/content";

export default function Home() {
  return (
    <SiteShell
      page="main"
      splash
      footerHeading={
        <>
          Still guessing?
          <br />
          <Hi>Find the leak.</Hi>
        </>
      }
    >
      <Hero />
      <FishingLine words={["Measure", "Make", "Scale", "Keep", "One team. One P&L."]} band="#1F1F1F" ink="#FFFDF2" anchor={0.5} />
      <LogoRows stats />
      <VideoTestimonials />
      <PortfolioDonuts />
      <TenLeaks />
      <TwoEngines />
      <HookOsEdge />
      <GaugeMethod />
      <ProofCases />
      <Guarantee />
      <FitSection />
      <LeakTest />
      <Calculator />
      <FitCheck
        source="main"
        calLink={CAL.main}
        eyebrow="Free P&L audit"
        heading={
          <>
            Find the money <Hi>before you spend more.</Hi>
          </>
        }
        body="A 30-minute working session on your real numbers. You leave with your true break-even and three fixes, even if we never work together."
        founderVideo
        steps={[
          { title: "Tell us about the brand", body: "Website, monthly spend and your biggest growth problem. Takes 60 seconds." },
          { title: "We audit before we pitch", body: "Your Growth Lead runs Audit OS on your tracking, unit economics, creative and retention." },
          { title: "30 minutes, three fixes", body: "You see a sample P&L report and the three changes worth the most money. Yours to keep." },
        ]}
        note="Takes 60 seconds. If we are a fit, you get the free P&L audit. Reply within one working day. ISB-backed · You own every account."
      />
      <FAQ items={MAIN_FAQ} />
    </SiteShell>
  );
}
