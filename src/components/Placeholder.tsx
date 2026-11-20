import { ImageIcon, Play } from "lucide-react";

interface PlaceholderProps {
  label: string;
  tone?: "cream" | "orange" | "sun" | "lilac" | "charcoal";
  kind?: "image" | "video";
  className?: string;
}

const tones: Record<NonNullable<PlaceholderProps["tone"]>, string> = {
  cream: "bg-[#FCF5CD] text-[#1F1F1F]",
  orange: "bg-[#FF6A2B] text-[#FFFDF2]",
  sun: "bg-[#FFD772] text-[#1F1F1F]",
  lilac: "bg-[#CFC2FF] text-[#1F1F1F]",
  charcoal: "bg-[#2A2A2A] text-[#FFFDF2]",
};

/**
 * Intentional placeholder for photography / video. Swap for <Image> or <video> when assets exist.
 */
export default function Placeholder({ label, tone = "cream", kind = "image", className = "" }: PlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={`Placeholder: ${label}`}
      className={`ng-placeholder flex items-center justify-center rounded-2xl ${tones[tone]} ${className}`}
    >
      {/* faint hook watermark */}
      <div
        aria-hidden="true"
        className="absolute -right-6 -bottom-10 w-28 aspect-[203.66/357.03] bg-current opacity-[0.08]"
        style={{
          maskImage: "url(/northgauge-hook.svg)",
          WebkitMaskImage: "url(/northgauge-hook.svg)",
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        }}
      />
      <div className="relative flex flex-col items-center gap-2 text-center px-4">
        {kind === "video" ? (
          <span className="w-14 h-14 rounded-full bg-[#1F1F1F] text-[#FFFDF2] flex items-center justify-center shadow-lg">
            <Play className="w-5 h-5 translate-x-[1px]" fill="currentColor" />
          </span>
        ) : (
          <ImageIcon className="w-6 h-6 opacity-60" />
        )}
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] opacity-75">{label}</span>
      </div>
    </div>
  );
}
