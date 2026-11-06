import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Bricolage_Grotesque, Instrument_Serif } from "next/font/google";
import "./globals.css";

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
  title: "Northgauge | Creative-Led Growth Agency",
  description:
    "We build brands people notice, ads that pay back, and customers who come back. One team, three moves: Hook. Reel. Keep.",
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
    <html
      lang="en"
      className={`${jakarta.variable} ${bricolage.variable} ${instrumentSerif.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#FFFDF2] text-[#1F1F1F] font-sans antialiased selection:bg-[#FF4B00] selection:text-white">
        {children}
      </body>
    </html>
  );
}
