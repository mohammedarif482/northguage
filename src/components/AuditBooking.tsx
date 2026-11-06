"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle2, ArrowRight, Calendar, Sparkles } from "lucide-react";

export default function AuditBooking() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<"form" | "calendar">("form");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    country: "UK",
    budget: "10-50k",
    need: "Not sure",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section id="audit" className="relative bg-[#FF4B00] text-white py-24 sm:py-32 overflow-hidden">
      {/* Cropped hook background motif (from the brand plan) */}
      <div className="absolute -bottom-24 -right-24 w-[420px] sm:w-[600px] h-[420px] sm:h-[600px] opacity-10 pointer-events-none select-none">
        <Image
          src="/northgauge-hook.svg"
          alt=""
          fill
          className="object-contain brightness-0 invert"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Headline, Subline & 3 Steps */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 text-white text-xs font-extrabold tracking-[0.2em] uppercase mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#FCF5CD]" />
              Free Growth Audit
            </div>

            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6 text-white">
              Let&apos;s get you hooked.
            </h2>

            <p className="text-xl sm:text-2xl font-medium text-white/90 leading-relaxed mb-12">
              Book a free 30-minute growth audit. Three fixes, no pitch deck.
            </p>

            {/* Three Steps */}
            <div className="space-y-6 w-full">
              {[
                {
                  step: "1",
                  title: "Tell us about your brand",
                  desc: "Drop your store URL and primary growth friction below in 60 seconds.",
                },
                {
                  step: "2",
                  title: "We review your brand, ads and retention",
                  desc: "Our senior operators audit your creative hooks, ad spend efficiency, and Klaviyo flows.",
                },
                {
                  step: "3",
                  title: "30-minute call with three fixes",
                  desc: "Direct, high-impact tactical fixes you can execute immediately—whether we work together or not.",
                },
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-4 p-4 rounded-2xl bg-white/10 border border-white/15">
                  <div className="w-9 h-9 rounded-full bg-[#FFFDF2] text-[#FF4B00] flex items-center justify-center font-extrabold text-sm shrink-0 shadow-sm">
                    {s.step}
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-white mb-0.5">
                      {s.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/80 font-normal leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Booking Form / Calendly toggle */}
          <div className="lg:col-span-7">
            <div className="bg-[#FFFDF2] text-[#1F1F1F] rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/30">
              {/* Mode switch */}
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-stone-200">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab("form")}
                    className={`px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider transition-colors ${
                      activeTab === "form"
                        ? "bg-[#FF4B00] text-white"
                        : "bg-stone-100 text-stone-600 hover:text-[#1F1F1F]"
                    }`}
                  >
                    Quick Intake Form
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("calendar")}
                    className={`px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
                      activeTab === "calendar"
                        ? "bg-[#FF4B00] text-white"
                        : "bg-stone-100 text-stone-600 hover:text-[#1F1F1F]"
                    }`}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    Live Calendar
                  </button>
                </div>
                <span className="hidden sm:inline text-xs font-semibold text-[#FF4B00]">
                  Takes ~60 seconds
                </span>
              </div>

              {activeTab === "calendar" ? (
                /* Calendly Embed Mock / Direct scheduler */
                <div className="py-8 text-center space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#FCF5CD] text-[#FF4B00] flex items-center justify-center mx-auto">
                    <Calendar className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-[#1F1F1F] mb-1">
                      Live Calendar Booking
                    </h3>
                    <p className="text-sm text-stone-600 max-w-sm mx-auto">
                      Choose an open 30-minute slot on our senior strategy team&apos;s
                      schedule.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 text-left space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-stone-700">
                      <span>Available Timezones:</span>
                      <span className="text-[#FF4B00]">GMT · EST · GST · AEST</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {["Today 3:30 PM", "Tomorrow 10:00 AM", "Tomorrow 2:00 PM", "Thu 11:30 AM", "Thu 4:00 PM", "Fri 1:00 PM"].map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setFormSubmitted(true)}
                          className="px-3 py-2.5 rounded-xl border border-stone-200 hover:border-[#FF4B00] hover:bg-[#FCF5CD]/50 text-xs font-bold text-[#1F1F1F] text-center transition-colors"
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-stone-400">
                    Prefer email first? Switch back to the Quick Intake Form.
                  </p>
                </div>
              ) : formSubmitted ? (
                /* Thank you State */
                <div className="py-12 text-center space-y-6 animate-in zoom-in-95 duration-200">
                  <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-extrabold text-[#1F1F1F] mb-2">
                      You&apos;re on the line.
                    </h3>
                    <p className="text-base text-stone-600 max-w-md mx-auto leading-relaxed">
                      We&apos;ll be in touch within one working day with your customized
                      audit breakdown and call link.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FCF5CD]/60 border border-[#FF4B00]/20 inline-block text-xs font-bold text-[#1F1F1F]">
                    Audit confirmation sent to:{" "}
                    <span className="text-[#FF4B00]">{formData.email || "your work email"}</span>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={() => setFormSubmitted(false)}
                      className="text-xs font-bold text-stone-500 hover:text-[#FF4B00] underline"
                    >
                      Submit another inquiry
                    </button>
                  </div>
                </div>
              ) : (
                /* Intake Form */
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1F1F]/70 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alex Morgan"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#FF4B00] focus:ring-2 focus:ring-[#FF4B00]/20 outline-hidden text-sm bg-white font-medium"
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
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#FF4B00] focus:ring-2 focus:ring-[#FF4B00]/20 outline-hidden text-sm bg-white font-medium"
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
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#FF4B00] focus:ring-2 focus:ring-[#FF4B00]/20 outline-hidden text-sm bg-white font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1F1F]/70 mb-1.5">
                        Country
                      </label>
                      <select
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-[#FF4B00] focus:ring-2 focus:ring-[#FF4B00]/20 outline-hidden text-sm bg-white font-medium"
                      >
                        <option value="UK">United Kingdom</option>
                        <option value="US">United States</option>
                        <option value="UAE">United Arab Emirates</option>
                        <option value="Australia">Australia</option>
                        <option value="Other">Other / Global</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1F1F]/70 mb-1.5">
                      Monthly Marketing Budget (USD)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "under-10k", label: "Under $10k" },
                        { id: "10-50k", label: "$10k – $50k" },
                        { id: "50k-plus", label: "$50k+" },
                      ].map((b) => (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, budget: b.id })}
                          className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-colors ${
                            formData.budget === b.id
                              ? "bg-[#FCF5CD] border-[#FF4B00] text-[#1F1F1F]"
                              : "border-stone-200 hover:border-stone-300 text-stone-600"
                          }`}
                        >
                          {b.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1F1F1F]/70 mb-1.5">
                      What do you need most right now?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {["Hook (Brand)", "Reel (Ads)", "Keep (CRM)", "Not sure"].map((need) => (
                        <button
                          key={need}
                          type="button"
                          onClick={() => setFormData({ ...formData, need })}
                          className={`py-2.5 px-2 rounded-xl border text-xs font-bold transition-colors ${
                            formData.need === need
                              ? "bg-[#FF4B00] border-[#FF4B00] text-white"
                              : "border-stone-200 hover:border-stone-300 text-stone-700 bg-white"
                          }`}
                        >
                          {need}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-4 py-4 rounded-full bg-[#FF4B00] hover:bg-[#E04200] text-white font-extrabold text-base tracking-wide shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group"
                  >
                    <span>Book my audit</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <p className="text-center text-[11px] text-stone-500 pt-2">
                    Zero sales pitch decks. Three tangible growth recommendations.
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
