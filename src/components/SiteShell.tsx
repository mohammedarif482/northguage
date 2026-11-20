"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import SmoothScroll from "./SmoothScroll";
import SplashScreen from "./SplashScreen";
import Header, { type PageKey } from "./Header";
import ScrollHookMarker from "./ScrollHookMarker";
import MobileCTA from "./MobileCTA";
import Footer from "./Footer";
import CookieBanner from "./CookieBanner";
import PrivacyModal from "./PrivacyModal";

const SplashContext = createContext(true);

/** True once the splash curtain starts lifting (always true on pages without a splash). */
export function useSplashDone() {
  return useContext(SplashContext);
}

/** Shared frame for every page: header, smooth scroll, sticky mobile button, footer, cookie + privacy. */
export default function SiteShell({
  page,
  footerHeading,
  splash = false,
  children,
}: {
  page: PageKey;
  footerHeading: ReactNode;
  splash?: boolean;
  children: ReactNode;
}) {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [splashDone, setSplashDone] = useState(!splash);

  return (
    <SplashContext.Provider value={splashDone}>
      {splash && <SplashScreen onComplete={() => setSplashDone(true)} />}
      <SmoothScroll>
        <div className="relative min-h-screen flex flex-col bg-[#FFFDF2] text-[#1F1F1F]">
          <Header page={page} />
          <ScrollHookMarker />
          <main id="main" className="grow">
            {children}
          </main>
          <MobileCTA />
          <Footer page={page} heading={footerHeading} onOpenPrivacy={() => setPrivacyOpen(true)} />
          <CookieBanner onOpenPrivacy={() => setPrivacyOpen(true)} />
          <PrivacyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
        </div>
      </SmoothScroll>
    </SplashContext.Provider>
  );
}
