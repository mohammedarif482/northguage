"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";

export default function AuditBooking() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    country: "UK",
    budget: "10–50k",
    need: "Not sure",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="audit" className="relative bg-[#FF4B00] text-[#FFFDF2] py-24 sm:py-36 overflow-hidden">
      {/* Cropped hook background motif from the brand plan */}
      <div className="absolute -bottom-28 -right-28 w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] opacity-10 pointer-events-none select-none">
        <Image
          src="/northgauge-hook.svg"
          alt=""
          fill
          className="object-contain brightness-0 invert"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Headline, Subline, Three Steps */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#FFFDF2]/70 mb-4">
              ACTION // 11
            </div>

            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[0.98] mb-6 text-white">
              Let&apos;s get <br />
              you hooked.
            </h2>

            <p className="text-xl sm:text-2xl font-medium text-white/90 leading-relaxed mb-12 max-w-md">
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
                  className="flex items-start gap-4 pb-6 border-b border-white/20 last:border-b-0"
                >
                  <span className="font-mono text-sm font-bold text-[#FCF5CD] pt-0.5">
                    0{step.num}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white mb-1">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Clean, honest intake form */}
          <div className="lg:col-span-7">
            <div className="bg-[#FFFDF2] text-[#1F1F1F] rounded-2xl p-8 sm:p-12 shadow-xl">
              {submitted ? (
                <div className="py-12 text-center space-y-6 animate-in fade-in duration-200">
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
                  <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#1F1F1F]/50 pb-3 hairline-b mb-6">
                    Growth Audit Intake
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1F1F]/70 mb-1.5">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Alex Morgan"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-[#1F1F1F]/20 focus:border-[#FF4B00] outline-hidden text-sm bg-white font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1F1F]/70 mb-1.5">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="alex@brand.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-[#1F1F1F]/20 focus:border-[#FF4B00] outline-hidden text-sm bg-white font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1F1F]/70 mb-1.5">
                        Brand Website *
                      </label>
                      <input
                        type="url"
                        required
                        placeholder="https://yourbrand.com"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-[#1F1F1F]/20 focus:border-[#FF4B00] outline-hidden text-sm bg-white font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1F1F]/70 mb-1.5">
                        Country
                      </label>
                      <select
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-[#1F1F1F]/20 focus:border-[#FF4B00] outline-hidden text-sm bg-white font-medium"
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
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1F1F]/70 mb-2">
                      Monthly marketing budget
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {["under 10k", "10–50k", "50k+ USD"].map((b) => (
                        <button
                          key={b}
                          type="button"
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
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1F1F]/70 mb-2">
                      What do you need?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {["Hook", "Reel", "Keep", "Not sure"].map((n) => (
                        <button
                          key={n}
                          type="button"
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

                  <button
                    type="submit"
                    className="w-full mt-4 py-4 rounded-full bg-[#FF4B00] hover:bg-[#E04200] text-white font-bold text-xs uppercase tracking-[0.14em] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span>Book my audit</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-center text-[11px] text-[#1F1F1F]/50 pt-2 font-mono">
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
