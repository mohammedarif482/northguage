"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Check, Loader2 } from "lucide-react";
import { BOOKING_URL, CONTACT_EMAIL } from "@/lib/site";
import { readPrefill, type AuditPrefill } from "@/lib/prefill";

export default function AuditBooking() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [invalid, setInvalid] = useState<string[]>([]);
  const [honeypot, setHoneypot] = useState("");
  const [prefillNote, setPrefillNote] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    country: "UK",
    budget: "10–50k",
    need: "Not sure",
  });

  // Hooked "investment": answers given elsewhere on the page carry into the form.
  useEffect(() => {
    const apply = (p: AuditPrefill | null) => {
      if (!p) return;
      setFormData((f) => ({
        ...f,
        ...(p.need ? { need: p.need } : {}),
        ...(p.budget ? { budget: p.budget } : {}),
      }));
      if (p.note) setPrefillNote(p.note);
    };
    const onPrefill = (e: Event) => apply((e as CustomEvent<AuditPrefill>).detail);
    window.addEventListener("ng:prefill", onPrefill);
    const t = setTimeout(() => apply(readPrefill()), 0);
    return () => {
      clearTimeout(t);
      window.removeEventListener("ng:prefill", onPrefill);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);
    setInvalid([]);
    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, note: prefillNote ?? "", company: honeypot }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json.error ?? `Something went wrong. Please email ${CONTACT_EMAIL}.`);
        setInvalid(Array.isArray(json.fields) ? json.fields : []);
        return;
      }
      setSubmitted(true);
    } catch {
      setError(`Network error. Please try again or email ${CONTACT_EMAIL}.`);
    } finally {
      setSubmitting(false);
    }
  };

  const fieldClass = (field: string) =>
    `w-full px-4 py-3 rounded-lg border ${
      invalid.includes(field) ? "border-[#D92D20]" : "border-[#1F1F1F]/20"
    } focus:border-[#FF4B00] focus-visible:ring-2 focus-visible:ring-[#FF4B00]/30 outline-hidden text-sm bg-white font-medium`;

  return (
    <section id="audit" className="relative bg-[#FCF5CD] text-[#1F1F1F] py-24 sm:py-36 overflow-hidden">
      {/* Cropped hook background motif from the brand plan */}
      <div className="absolute -bottom-28 -right-28 w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] opacity-[0.06] pointer-events-none select-none">
        <Image
          src="/northgauge-hook.svg"
          alt=""
          fill
          className="object-contain brightness-0"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Headline, Subline, Three Steps */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <p className="font-serif italic text-xl sm:text-2xl text-[#FF4B00] leading-none mb-4">Your next move</p>

            <h2 className="text-5xl sm:text-7xl mb-6 text-[#1F1F1F] font-display font-black uppercase tracking-tight leading-[0.9]">
              Let&apos;s get <br />
              <span className="text-[#FF4B00]">you hooked.</span>
            </h2>

            <p className="text-xl sm:text-2xl font-medium text-[#1F1F1F]/80 leading-relaxed mb-12 max-w-md">
              Book a free 30-minute growth audit. Three fixes, no pitch deck.
            </p>

            {/* Three Steps from the plan */}
            <div className="space-y-6 w-full max-w-md">
              {[
                {
                  num: "1",
                  title: "Tell us about your brand",
                  desc: "Share your website and primary growth friction in 60 seconds.",
                },
                {
                  num: "2",
                  title: "We review your brand, ads and retention",
                  desc: "Our senior operators audit your creative hooks, ad spend, and Klaviyo flows.",
                },
                {
                  num: "3",
                  title: "30-minute call with three fixes",
                  desc: "A direct working session with tangible, high-impact fixes you keep.",
                },
              ].map((step) => (
                <div
                  key={step.num}
                  className="flex items-start gap-4 pb-6 border-b border-[#1F1F1F]/12 last:border-b-0"
                >
                  <span className="font-mono text-sm font-bold text-[#FF4B00] pt-0.5">
                    0{step.num}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-[#1F1F1F] mb-1">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#1F1F1F]/70 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Clean, honest intake form */}
          <div className="lg:col-span-7">
            <div className="bg-[#FFFDF2] text-[#1F1F1F] rounded-[28px] p-8 sm:p-12 shadow-[0_24px_60px_-24px_rgba(31,31,31,0.35)] border border-[#1F1F1F]/8">
              {submitted ? (
                <div role="status" aria-live="polite" className="py-12 text-center space-y-6 animate-in fade-in duration-200">
                  <div className="w-16 h-16 rounded-full bg-[#FF4B00] text-white flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-extrabold text-[#1F1F1F] mb-3">
                      You&apos;re on the line.
                    </h3>
                    <p className="text-base text-[#1F1F1F]/70 max-w-md mx-auto leading-relaxed">
                      We&apos;ll be in touch within one working day with your customized audit
                      notes and direct calendar link.
                    </p>
                  </div>
                  {BOOKING_URL && (
                    <a
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 pl-6 pr-3 py-3 rounded-full bg-[#1F1F1F] hover:bg-black text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all duration-150 group"
                    >
                      <span>Pick a time now</span>
                      <span className="w-7 h-7 rounded-full bg-[#FF4B00] text-white flex items-center justify-center transition-transform group-hover:rotate-45">
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </a>
                  )}
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="text-xs font-bold uppercase tracking-wider text-[#FF4B00] hover:underline"
                    >
                      Submit another inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Honeypot (hidden from humans) */}
                  <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
                    <label htmlFor="audit-company">Company</label>
                    <input
                      id="audit-company"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>
                  <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#1F1F1F]/65 pb-3 hairline-b mb-6">
                    Growth Audit Intake
                  </div>

                  {prefillNote && (
                    <p className="flex items-center gap-2 text-sm font-semibold text-[#1F1F1F] bg-[#FCF5CD] rounded-lg px-4 py-3 -mt-2">
                      <span className="text-[#FF4B00]">✦</span>
                      {prefillNote} We&apos;ve pre-selected your answers below.
                    </p>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1F1F]/70 mb-1.5" htmlFor="audit-name">
                        Name *
                      </label>
                      <input
                        id="audit-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        aria-invalid={invalid.includes("name")}
                        placeholder="Alex Morgan"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={fieldClass("name")}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1F1F]/70 mb-1.5" htmlFor="audit-email">
                        Work Email *
                      </label>
                      <input
                        id="audit-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        aria-invalid={invalid.includes("email")}
                        placeholder="alex@brand.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={fieldClass("email")}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1F1F]/70 mb-1.5" htmlFor="audit-website">
                        Brand Website *
                      </label>
                      <input
                        id="audit-website"
                        name="website"
                        type="url"
                        autoComplete="url"
                        required
                        aria-invalid={invalid.includes("website")}
                        placeholder="https://yourbrand.com"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        className={fieldClass("website")}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1F1F]/70 mb-1.5" htmlFor="audit-country">
                        Country
                      </label>
                      <select
                        id="audit-country"
                        name="country"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className={fieldClass("country")}
                      >
                        <option value="UK">United Kingdom</option>
                        <option value="US">United States</option>
                        <option value="UAE">United Arab Emirates</option>
                        <option value="Australia">Australia</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <div id="audit-budget-label" className="block text-xs font-bold uppercase tracking-wider text-[#1F1F1F]/70 mb-2">
                      Monthly marketing budget
                    </div>
                    <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-labelledby="audit-budget-label">
                      {["under 10k", "10–50k", "50k+ USD"].map((b) => (
                        <button
                          key={b}
                          type="button"
                          role="radio"
                          aria-checked={formData.budget === b}
                          onClick={() => setFormData({ ...formData, budget: b })}
                          className={`py-2.5 px-3 rounded-lg border text-xs font-bold tracking-wider uppercase transition-colors ${
                            formData.budget === b
                              ? "bg-[#FCF5CD] border-[#FF4B00] text-[#1F1F1F]"
                              : "border-[#1F1F1F]/15 hover:border-[#1F1F1F]/30 text-[#1F1F1F]/70 bg-white"
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div id="audit-need-label" className="block text-xs font-bold uppercase tracking-wider text-[#1F1F1F]/70 mb-2">
                      What do you need?
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2" role="radiogroup" aria-labelledby="audit-need-label">
                      {["Hook", "Reel", "Keep", "Not sure"].map((n) => (
                        <button
                          key={n}
                          type="button"
                          role="radio"
                          aria-checked={formData.need === n}
                          onClick={() => setFormData({ ...formData, need: n })}
                          className={`py-2.5 px-3 rounded-lg border text-xs font-bold tracking-wider uppercase transition-colors ${
                            formData.need === n
                              ? "bg-[#1F1F1F] border-[#1F1F1F] text-white"
                              : "border-[#1F1F1F]/15 hover:border-[#1F1F1F]/30 text-[#1F1F1F]/70 bg-white"
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>

                  {error && (
                    <p role="alert" className="text-sm font-semibold text-[#D92D20] bg-[#D92D20]/5 border border-[#D92D20]/20 rounded-lg px-4 py-3">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    aria-busy={submitting}
                    className="disabled:opacity-70 disabled:cursor-wait w-full mt-4 py-4 rounded-full bg-[#FF4B00] hover:bg-[#E04200] text-white font-bold text-xs uppercase tracking-[0.14em] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span>{submitting ? "Sending…" : "Book my audit"}</span>
                    {submitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                  </button>

                  <p className="text-center text-[11px] text-[#1F1F1F]/65 pt-2 font-mono">
                    Zero pitch deck. 3 actionable fixes. 1 working day response.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
