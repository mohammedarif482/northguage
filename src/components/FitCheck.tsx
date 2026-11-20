"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Cal, { getCalApi } from "@calcom/embed-react";
import { CalendarDays, Mail } from "lucide-react";
import { CONTACT_EMAIL } from "@/lib/site";
import { onPrefill, readPrefill } from "@/lib/prefill";
import { useRegion } from "@/lib/region";
import { track } from "@/lib/track";
import { FOUNDER_VIDEO } from "@/lib/content";
import Media from "./Media";
import { SectionHead } from "./ui";

export type FitCheckProps = {
  /** Lead source sent to Cal.com as booking metadata: main | media-buying | hook-os */
  source: "main" | "media-buying" | "hook-os";
  calLink: string;
  eyebrow: string;
  heading: ReactNode;
  body: string;
  steps: { title: string; body: string }[];
  note: string;
  founderVideo?: boolean;
  tone?: "cream" | "orange";
};

/**
 * "Fit check" (#audit). The visitor books straight into Cal.com; the booking questions
 * (country, WhatsApp, spend band, focus) are configured on the Cal.com event itself.
 */
export default function FitCheck({
  source,
  calLink,
  eyebrow,
  heading,
  body,
  steps,
  note,
  founderVideo = false,
  tone = "cream",
}: FitCheckProps) {
  const region = useRegion();
  const embedRef = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [notes, setNotes] = useState("");
  const namespace = `fit-${source}`;
  const orange = tone === "orange";

  // Leak-test answers carry into the booking notes.
  useEffect(() => {
    const t = setTimeout(() => setNotes(readPrefill()?.notes ?? ""), 0);
    const off = onPrefill((p) => setNotes(p.notes ?? ""));
    return () => {
      clearTimeout(t);
      off();
    };
  }, []);

  // Load the Cal.com embed only as the section approaches (keeps it off the critical path).
  useEffect(() => {
    const el = embedRef.current;
    if (!el || !calLink) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "800px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [calLink]);

  useEffect(() => {
    if (!near) return;
    let cancelled = false;
    (async () => {
      const cal = await getCalApi({ namespace });
      if (cancelled) return;
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: { light: { "cal-brand": "#FF4B00" }, dark: { "cal-brand": "#FF4B00" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
      cal("on", {
        action: "bookingSuccessful",
        callback: () => track("fit_check_submit", { source, region }),
      });
    })();
    return () => {
      cancelled = true;
    };
  }, [near, namespace, source, region]);

  return (
    <section
      id="audit"
      data-marker
      className={`relative py-24 sm:py-32 overflow-hidden ${orange ? "bg-[#FF4B00] text-[#FFFDF2]" : "bg-[#FCF5CD] text-[#1F1F1F]"}`}
    >
      <div className="absolute -bottom-28 -right-28 w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] opacity-[0.06] pointer-events-none select-none">
        <Image src="/northgauge-hook.svg" alt="" fill className="object-contain brightness-0" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: pitch, founder video, steps */}
          <div className="lg:col-span-5">
            {orange ? (
              <div>
                <p className="font-serif italic text-xl sm:text-2xl text-[#1F1F1F] leading-none mb-4">{eyebrow}</p>
                <h2 className="font-display font-black uppercase tracking-tight leading-[0.92] text-4xl sm:text-6xl">{heading}</h2>
                <p className="mt-6 text-base sm:text-lg font-medium leading-relaxed text-[#FFFDF2]/85">{body}</p>
              </div>
            ) : (
              <SectionHead eyebrow={eyebrow} title={heading} body={body} size="md" />
            )}

            {founderVideo && (
              <Media
                item={{ label: "Founder video", aspect: "16/9", src: FOUNDER_VIDEO.src, poster: FOUNDER_VIDEO.poster }}
                tone="charcoal"
                className="mt-10 shadow-[0_24px_60px_-24px_rgba(31,31,31,0.45)]"
              />
            )}

            <ol className="mt-10 space-y-6">
              {steps.map((s, i) => (
                <li
                  key={s.title}
                  className={`flex items-start gap-4 pb-6 border-b last:border-b-0 ${orange ? "border-[#FFFDF2]/20" : "border-[#1F1F1F]/12"}`}
                >
                  <span className={`font-mono text-sm font-bold pt-0.5 ${orange ? "text-[#1F1F1F]" : "text-[#FF4B00]"}`}>0{i + 1}</span>
                  <div>
                    <h3 className="text-base font-bold mb-1">{s.title}</h3>
                    <p className={`text-sm leading-relaxed ${orange ? "text-[#FFFDF2]/80" : "text-[#1F1F1F]/70"}`}>{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Right: Cal.com booking */}
          <div className="lg:col-span-7">
            <div className="bg-[#FFFDF2] text-[#1F1F1F] rounded-[28px] p-3 sm:p-4 shadow-[0_24px_60px_-24px_rgba(31,31,31,0.35)] border border-[#1F1F1F]/8">
              <div className="flex items-center justify-between gap-4 px-3 sm:px-5 pt-3 pb-4 hairline-b">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#1F1F1F]/65">Fit check</span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF4B00]">
                  <CalendarDays className="w-4 h-4" /> Pick a time
                </span>
              </div>

              <div ref={embedRef} className="min-h-[560px] relative" data-lenis-prevent>
                {calLink ? (
                  near && (
                    <Cal
                      namespace={namespace}
                      calLink={calLink}
                      style={{ width: "100%", height: "100%", minHeight: 560, overflow: "auto" }}
                      config={{
                        layout: "month_view",
                        theme: "light",
                        ...(notes ? { notes } : {}),
                        "metadata[source]": source,
                        "metadata[region]": region,
                      }}
                    />
                  )
                ) : (
                  // No Cal.com link configured yet (NEXT_PUBLIC_CAL_LINK): keep a working route to us.
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center gap-5 px-6">
                    <span className="w-14 h-14 rounded-full bg-[#FCF5CD] text-[#FF4B00] flex items-center justify-center">
                      <CalendarDays className="w-6 h-6" />
                    </span>
                    <p className="text-lg font-bold max-w-sm">Booking opens here shortly.</p>
                    <a
                      href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Fit check")}${notes ? `&body=${encodeURIComponent(notes)}` : ""}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1F1F1F] text-[#FFFDF2] text-xs font-bold uppercase tracking-wider"
                    >
                      <Mail className="w-4 h-4" /> {CONTACT_EMAIL}
                    </a>
                  </div>
                )}
              </div>
            </div>
            <p className={`text-center text-xs mt-5 font-medium leading-relaxed ${orange ? "text-[#FFFDF2]/85" : "text-[#1F1F1F]/65"}`}>
              {note}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
