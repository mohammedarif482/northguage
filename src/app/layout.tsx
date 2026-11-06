import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Northgauge | Creative-Led Growth Agency",
  description:
    "We build brands people notice, ads that pay back, and customers who come back. One team, three moves: Hook. Reel. Keep.",
  keywords: [
    "creative agency",
    "performance marketing",
    "retention marketing",
    "growth agency",
    "D2C marketing",
    "e-commerce growth",
  ],
  authors: [{ name: "Northgauge" }],
  openGraph: {
    title: "Northgauge | A Hook for Curious Brands",
    description:
      "Creative-led brand building, performance marketing, and retention on one continuous line.",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: "/northgauge-hook.svg",
    shortcut: "/northgauge-hook.svg",
    apple: "/northgauge-hook.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#FFFDF2] text-[#1F1F1F] font-sans antialiased selection:bg-[#FF4B00] selection:text-white">
        {children}
      </body>
    </html>
  );
}
