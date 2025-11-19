"use client";

import { useState } from "react";

export function ContactCta() {
  const [open, setOpen] = useState(false);

  return (
    <section
      id="cta"
      className="relative scroll-mt-24 overflow-hidden bg-[#f4efe5] py-16 sm:py-20"
    >
      {/* Background image (hydroponic lettuce) */}
      <div className="absolute inset-0 bg-[url('/images/farmer_hold_crop.png')] bg-cover bg-center" />

      {/* Dark overlay to keep text readable, like hero */}
      <div className="absolute inset-0 bg-black/25" />

      {/* Bottom fade into sand, same idea as hero */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent via-[#f4efe5]/40 to-[#f4efe5]" />

      {/* Top fade – soft sand fade like hero */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-t from-transparent via-[#f4efe5]/40 to-[#f4efe5]" />

      {/* Content card */}
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <div className="relative flex flex-col items-center rounded-3xl bg-white/85 px-6 py-10 text-center shadow-xl shadow-black/10 backdrop-blur-sm md:px-12 md:py-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-forest">
            Let&apos;s scale farming communities together.
          </p>
          <h2 className="mb-4 text-3xl font-semibold text-slate-900 md:text-4xl">
            Partner with Fairways.Tech
          </h2>
          <p className="mb-8 max-w-2xl text-base text-slate-800 md:text-lg">
            Whether you&apos;re a bank, buyer, regulator, cooperative or
            development partner, we&apos;re ready to co-design compliant rails
            for rural finance.
          </p>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center rounded-full bg-forest px-8 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-forest/90"
          >
            Open contact form
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="relative w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl md:p-8">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 text-2xl text-slate-400 transition hover:text-slate-600"
              aria-label="Close contact form"
            >
              ×
            </button>

            <h3 className="text-xl font-semibold text-slate-900 md:text-2xl">
              Share a few details
            </h3>
            <p className="mb-6 mt-2 text-sm text-slate-600">
              Tell us who you are and how you&apos;d like to collaborate.
            </p>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: wire this up to backend / email service
              }}
            >
              {/* First / last name */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">
                    First name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-forest/60 focus:outline-none focus:ring-2 focus:ring-forest/30"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">
                    Last name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-forest/60 focus:outline-none focus:ring-2 focus:ring-forest/30"
                  />
                </div>
              </div>

              {/* Company */}
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">
                  Company<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="company"
                  required
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-forest/60 focus:outline-none focus:ring-2 focus:ring-forest/30"
                />
              </div>

              {/* Email + phone with country code */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">
                    Business / private email<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-forest/60 focus:outline-none focus:ring-2 focus:ring-forest/30"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">
                    Phone number<span className="text-red-500">*</span>
                  </label>
                  <div className="flex rounded-xl border border-slate-200 bg-white text-sm focus-within:border-forest/60 focus-within:ring-2 focus-within:ring-forest/30">
                    <select
                      name="phoneCountry"
                      required
                      defaultValue=""
                      className="rounded-l-xl border-r border-slate-200 bg-slate-50 px-2 py-2 text-xs font-medium text-slate-700 focus:outline-none"
                    >
                      <option value="" disabled>
                        Code
                      </option>
                      <option value="+233">🇬🇭 +233</option>
                      <option value="+31">🇳🇱 +31</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+49">🇩🇪 +49</option>
                      <option value="+33">🇫🇷 +33</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="other">Other</option>
                    </select>
                    <input
                      type="tel"
                      name="phone"
                      required
                      pattern="^[0-9+().\\-\\s]{6,20}$"
                      title="Enter a valid phone number"
                      className="flex-1 rounded-r-xl px-3 py-2 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Country selector */}
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">
                  Country<span className="text-red-500">*</span>
                </label>
                <select
                  name="country"
                  required
                  defaultValue=""
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:border-forest/60 focus:outline-none focus:ring-2 focus:ring-forest/30"
                >
                  <option value="" disabled>
                    Select your country
                  </option>
                  <option value="ghana">Ghana</option>
                  <option value="netherlands">Netherlands</option>
                  <option value="united-kingdom">United Kingdom</option>
                  <option value="germany">Germany</option>
                  <option value="france">France</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Collaboration details */}
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">
                  How would you like to collaborate?
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  rows={3}
                  required
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-forest/60 focus:outline-none focus:ring-2 focus:ring-forest/30"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-slate-200 px-4 py-2 text-xs text-slate-600 hover:bg-slate-50 md:text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-forest px-5 py-2 text-xs font-semibold text-white shadow-md hover:bg-forest/90 md:text-sm"
                >
                  Send details
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}