import { ImageResponse } from "next/og";
import { brandSvgDataUri, loadFont } from "@/lib/brand-svg";

export const alt = "Northgauge — A hook for curious brands.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const subline = "Hook. Reel. Keep. — Brand, performance & retention, one team.";
  const [wordmark, hook, display, sans] = await Promise.all([
    brandSvgDataUri("northgauge-wordmark.svg", "#1F1F1F"),
    brandSvgDataUri("northgauge-hook.svg", "#FF4B00"),
    loadFont("BricolageGrotesque-ExtraBold.ttf"),
    loadFont("PlusJakartaSans-Medium.ttf"),
  ]);
  const fonts = [
    { name: "Bricolage", data: display, weight: 800 as const, style: "normal" as const },
    { name: "Jakarta", data: sans, weight: 500 as const, style: "normal" as const },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FCF5CD",
          padding: "64px 72px",
          position: "relative",
        }}
      >
        <img src={wordmark} width={360} height={91} alt="" />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 92,
              fontFamily: "Bricolage",
              fontWeight: 800,
              lineHeight: 0.92,
              letterSpacing: -4,
              color: "#FF4B00",
              textTransform: "uppercase",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>A hook for</span>
            <span>curious brands.</span>
          </div>
          <div style={{ fontSize: 30, fontFamily: "Jakarta", color: "#1F1F1F", marginTop: 28, opacity: 0.8 }}>
            {subline}
          </div>
        </div>

        <img
          src={hook}
          width={170}
          height={298}
          alt=""
          style={{ position: "absolute", right: 56, top: 110, opacity: 0.9 }}
        />
      </div>
    ),
    { ...size, fonts }
  );
}
