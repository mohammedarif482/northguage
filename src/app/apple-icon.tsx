import { ImageResponse } from "next/og";
import { brandSvgDataUri } from "@/lib/brand-svg";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const hook = await brandSvgDataUri("northgauge-hook.svg", "#FCF5CD");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FF4B00",
        }}
      >
        <img src={hook} width={74} height={130} alt="" />
      </div>
    ),
    size
  );
}
