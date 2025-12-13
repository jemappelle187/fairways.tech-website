"use client";

import { useEffect, useState, useRef } from "react";
import { track } from "@/lib/umami";
import { ContactForm } from "./ContactForm";

export function ContactCta() {
  const [open, setOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

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

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  // Premium fade-in animation on scroll
  useEffect(() => {
    if (!cardRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Animate once
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="cta"
      className="relative scroll-mt-24 overflow-hidden py-16 sm:py-20"
    >
      {/* Background image (farmer holding crops) */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[url('/images/farmer_hold_crop.webp')] bg-cover bg-center" />

      {/* Soft dark overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-black/25" />

      {/* Top + bottom fades into sand */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-16 bg-gradient-to-b from-[#f4efe5] via-[#f4efe5]/40 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-24 bg-gradient-to-b from-transparent via-[#f4efe5]/35 to-[#f4efe5]" />

      {/* Content card */}
        <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8">
        <div 
          ref={cardRef}
          className={`group relative flex flex-col items-center text-center rounded-3xl border border-white/20 bg-white/5 bg-gradient-to-b from-white/10 via-white/5 to-white/15 px-6 py-10 backdrop-blur-xl shadow-[0_18px_45px_rgba(15,23,42,0.45)] transition-all duration-700 ease-out hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(15,23,42,0.65)] hover:border-white/40 md:px-12 md:py-12 ${
            isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
          }`}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-forest">
            Unlock scalable rural finance.
          </p>
          <h2 className="mb-4 text-3xl font-semibold text-white md:text-4xl">
            Partner with Fairways.Tech
          </h2>
          <p className="mb-8 max-w-2xl text-base text-white/85 md:text-lg leading-relaxed">
            Join banks, cooperatives, buyers and development partners building
            trusted, compliant rails for rural finance across Africa.
          </p>
          <button
            type="button"
            onClick={() => {
              track("cta_opened");
              setOpen(true);
            }}
            className="inline-flex items-center justify-center rounded-full bg-forest px-8 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-forest/90"
          >
            Start a partnership
          </button>
        </div>
      </div>

      {/* Premium modal with contact form */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm p-3 sm:p-4">
          <div className="relative w-full max-w-xl max-h-[90vh] sm:max-h-[90vh] my-auto transform rounded-2xl sm:rounded-3xl bg-white/95 shadow-2xl shadow-black/30 transition-all duration-200 flex flex-col overflow-hidden">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-2 top-2 sm:right-3 sm:top-3 z-20 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-lg text-slate-500 shadow-sm transition hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2"
              aria-label="Close contact form"
            >
              ×
            </button>

            {/* Scrollable content area */}
            <div className="flex-1 overflow-y-auto overscroll-contain min-h-0">
              {/* Header */}
              <div className="border-b border-slate-100 px-4 pb-2 pt-4 sm:px-6 sm:pb-3 sm:pt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-forest">
                  Community-driven agri–fintech
                </p>
                <h3 className="mt-1 text-base sm:text-lg font-semibold text-slate-900 md:text-xl">
                  Share a few details
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Tell us who you are and how you&apos;d like to collaborate.
                </p>
              </div>

              {/* Body: Custom contact form */}
              <div className="px-4 pb-4 pt-3 sm:px-6 sm:pb-6 sm:pt-4">
                <ContactForm onSuccess={handleFormSuccess} onClose={() => setOpen(false)} />
              </div>

              {/* Footer hint */}
              <div className="border-t border-slate-100 px-4 py-2 sm:px-6 sm:py-3">
                <p className="text-[10px] sm:text-[11px] text-slate-400">
                  By submitting, you agree that Fairways.Tech may contact you
                  about partnerships and product updates. Data is processed in
                  line with our privacy &amp; cookie statements.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Premium success notification (after form submission) */}
      {showToast && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="relative w-full max-w-md transform rounded-3xl bg-white/95 p-0 shadow-2xl shadow-black/30 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex flex-col items-center px-8 py-10 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center">
                <img
                  src="/images/logo/logo-fairways-forest.svg"
                  alt="Fairways.Tech"
                  className="h-10 w-10"
                />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900">
                Message sent successfully
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-slate-600">
                Thanks for reaching out. We&apos;ve received your details and will
                get back to you as soon as possible.
              </p>
              <button
                type="button"
                onClick={() => setShowToast(false)}
                className="inline-flex items-center justify-center rounded-full bg-forest px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-forest/90"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}