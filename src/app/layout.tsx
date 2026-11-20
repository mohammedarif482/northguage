import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Bricolage_Grotesque, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { CONTACT_EMAIL, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";
import { REGION_SCRIPT } from "@/lib/region-script";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FCF5CD",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/northgauge-wordmark.svg`,
  image: `${SITE_URL}/opengraph-image`,
  description: SITE_DESCRIPTION,
  email: CONTACT_EMAIL,
  foundingDate: "2022",
  address: { "@type": "PostalAddress", addressLocality: "Mumbai", addressCountry: "IN" },
  areaServed: ["India", "United States", "United Kingdom", "United Arab Emirates", "Saudi Arabia", "Australia"],
  knowsAbout: ["Performance marketing", "Media buying", "Meta ads", "Creative strategy", "Retention marketing", "D2C growth"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`global ${jakarta.variable} ${bricolage.variable} ${instrumentSerif.variable} scroll-smooth`}
    >
      <head>
        {/* Region before first paint: Global $ by default, India ₹ via #india or the saved choice. */}
        <script dangerouslySetInnerHTML={{ __html: REGION_SCRIPT }} />
      </head>
      <body className="min-h-screen bg-[#FFFDF2] text-[#1F1F1F] font-sans antialiased selection:bg-[#FF4B00] selection:text-white">
        <script
          // Runs before paint so returning visitors never see the splash flash.
          dangerouslySetInnerHTML={{
            __html: `try{var d=document.documentElement,r=matchMedia("(prefers-reduced-motion: reduce)").matches;if(r)d.dataset.motion="reduce";if(r||sessionStorage.getItem("ng_splash_seen"))d.dataset.splash="skip"}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <noscript>
          <style>{`[data-hero-anim]{opacity:1!important}.ng-splash{display:none!important}`}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-full focus:bg-[#1F1F1F] focus:text-white focus:text-xs focus:font-bold focus:uppercase focus:tracking-wider"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
