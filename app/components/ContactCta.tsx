"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/umami";
import { ContactForm } from "./ContactForm";

export function ContactCta() {
  const [open, setOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleFormSuccess = () => {
    setOpen(false);
    setShowToast(true);
  };

  useEffect(() => {
    if (!showToast) return;
    const timeout = setTimeout(() => {
      setShowToast(false);
    }, 7000);
    return () => clearTimeout(timeout);
  }, [showToast]);

  return (
    <section
      id="cta"
      className="relative scroll-mt-24 overflow-hidden py-16 sm:py-20"
    >
      {/* Background image (farmer holding crops) */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[url('/images/farmer_hold_crop.png')] bg-cover bg-center" />

      {/* Soft dark overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-black/25" />

      {/* Top + bottom fades into sand */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-16 bg-gradient-to-b from-[#f4efe5] via-[#f4efe5]/40 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-24 bg-gradient-to-b from-transparent via-[#f4efe5]/35 to-[#f4efe5]" />

      {/* Content card */}
        <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
        <div className="relative flex flex-col items-center rounded-3xl border border-white/40 bg-white/80 px-6 py-10 text-center shadow-lg shadow-black/10 backdrop-blur-sm md:px-12 md:py-12">
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
            onClick={() => {
              track("cta_opened");
              setOpen(true);
            }}
            className="inline-flex items-center justify-center rounded-full bg-forest px-8 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-forest/90"
          >
            Contact us
          </button>
        </div>
      </div>

      {/* Premium modal with contact form */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm px-4">
          <div className="relative w-full max-w-xl transform rounded-3xl bg-white/95 p-0 shadow-2xl shadow-black/30 transition-all duration-200">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-lg text-slate-500 shadow-sm transition hover:bg-slate-100 hover:text-slate-700"
              aria-label="Close contact form"
            >
              ×
            </button>

            {/* Header */}
            <div className="border-b border-slate-100 px-6 pb-3 pt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-forest">
                Community-driven agri–fintech
              </p>
              <h3 className="mt-1 text-lg font-semibold text-slate-900 md:text-xl">
                Share a few details
              </h3>
              <p className="mt-1 text-xs text-slate-500 md:text-sm">
                Tell us who you are and how you&apos;d like to collaborate.
              </p>
            </div>

            {/* Body: Custom contact form */}
            <div className="px-6 pb-6 pt-4">
              <ContactForm onSuccess={handleFormSuccess} onClose={() => setOpen(false)} />
            </div>

            {/* Footer hint */}
            <div className="border-t border-slate-100 px-6 py-3">
              <p className="text-[11px] text-slate-400">
                By submitting, you agree that Fairways.Tech may contact you
                about partnerships and product updates. Data is processed in
                line with our privacy &amp; cookie statements.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Success toast (after form submission) */}
      {showToast && (
        <div className="fixed bottom-6 left-1/2 z-40 w-[92%] max-w-md -translate-x-1/2">
          <div className="flex items-start gap-3 rounded-2xl bg-forest px-4 py-3 shadow-xl shadow-black/30">
            <div className="mt-1 h-2 w-2 rounded-full bg-emerald-300" />
            <div className="flex-1 text-sm text-white">
              <p className="font-semibold">Thanks for reaching out.</p>
              <p className="mt-0.5 text-[11px] text-emerald-100/90">
                We&apos;ve received your details and will get back to you as
                soon as possible.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowToast(false)}
              className="ml-1 text-lg leading-none text-emerald-100/80 hover:text-white"
              aria-label="Dismiss"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  );
}