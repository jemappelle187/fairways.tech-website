"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const TALLY_BASE_URL = "https://tally.so/r/2EjXOj";

type TrackingState = {
  ip: string;
  country: string;
  city: string;
  device: string;
  browser: string;
  ua: string;
  referrer: string;
};

export function ContactCta() {
  const [open, setOpen] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [tracking, setTracking] = useState<TrackingState>({
    ip: "",
    country: "",
    city: "",
    device: "",
    browser: "",
    ua: "",
    referrer: "",
  });

  // Success toast (after redirect from Tally)
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showToast, setShowToast] = useState(
    searchParams.get("contact") === "success"
  );

  useEffect(() => {
    if (searchParams.get("contact") === "success") {
      setShowToast(true);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!showToast) return;
    const timeout = setTimeout(() => {
      setShowToast(false);
      // Clean query param from URL
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        url.searchParams.delete("contact");
        router.replace(url.pathname + (url.search || ""));
      }
    }, 7000);
    return () => clearTimeout(timeout);
  }, [showToast, router]);

  // Fetch IP + geo + basic device info only when modal opens
  useEffect(() => {
    if (!open) return;

    // Device + browser detection
    if (typeof window !== "undefined") {
      const ua = window.navigator.userAgent || "";
      const lower = ua.toLowerCase();

      let device = "desktop";
      if (/ipad|tablet/.test(lower)) device = "tablet";
      else if (/mobile|iphone|android/.test(lower)) device = "mobile";

      let browser = "other";
      if (/edg\//.test(lower)) browser = "edge";
      else if (/chrome\//.test(lower)) browser = "chrome";
      else if (/safari\//.test(lower) && !/chrome\//.test(lower))
        browser = "safari";
      else if (/firefox\//.test(lower)) browser = "firefox";
      else if (/opr\//.test(lower)) browser = "opera";

      setTracking((prev) => ({
        ...prev,
        device,
        browser,
        ua,
        referrer: document.referrer || "",
      }));
    }

    // IP + geo lookup
    const fetchIp = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        if (!res.ok) return;
        const data = await res.json();

        setTracking((prev) => ({
          ...prev,
          ip: data.ip ?? "",
          country: data.country_name ?? "",
          city: data.city ?? "",
        }));
      } catch {
        // silently ignore
      }
    };

    fetchIp();
  }, [open]);

  // Build Tally URL with tracking params
  const iframeSrc = useMemo(() => {
    const params = new URLSearchParams();

    if (tracking.ip) params.set("ip_address", tracking.ip);
    if (tracking.country) params.set("geo_country", tracking.country);
    if (tracking.city) params.set("geo_city", tracking.city);
    if (tracking.device) params.set("device", tracking.device);
    if (tracking.browser) params.set("browser", tracking.browser);
    if (tracking.ua) params.set("user_agent", tracking.ua);
    if (tracking.referrer) params.set("referrer", tracking.referrer);

    // Tally visual options
    params.set("hideTitle", "1");
    params.set("transparentBackground", "1");

    return `${TALLY_BASE_URL}?${params.toString()}`;
  }, [tracking]);

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
        <div className="relative flex flex-col items-center rounded-3xl bg-white/92 px-6 py-10 text-center shadow-xl shadow-black/10 backdrop-blur-sm md:px-12 md:py-12">
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
              setOpen(true);
              setIframeLoaded(false);
            }}
            className="inline-flex items-center justify-center rounded-full bg-forest px-8 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-forest/90"
          >
            Open contact form
          </button>
        </div>
      </div>

      {/* Premium modal with Tally iframe */}
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
                Tell us who you are and how you&apos;d like to collaborate. The
                form is securely processed via Tally.
              </p>
            </div>

            {/* Body: Tally iframe with loading state */}
            <div className="relative px-4 pb-5 pt-3 md:px-5 md:pb-6">
              {!iframeLoaded && (
                <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-2xl bg-white/80">
                  <div className="h-9 w-9 rounded-full border-2 border-forest/20 border-t-forest/80 animate-spin" />
                  <p className="text-xs font-medium text-slate-600">
                    Loading secure contact form…
                  </p>
                  <p className="max-w-xs text-center text-[11px] text-slate-400">
                    If this takes longer than a few seconds, please check your
                    connection or try again.
                  </p>
                </div>
              )}

              <iframe
                src={iframeSrc}
                title="Contact Fairways.Tech"
                onLoad={() => setIframeLoaded(true)}
                className={`h-[460px] w-full rounded-2xl border border-slate-100 bg-transparent transition-opacity duration-300 ${
                  iframeLoaded ? "opacity-100" : "opacity-0"
                }`}
                allow="clipboard-write; encrypted-media"
              />
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

      {/* Success toast (after Tally redirect to ?contact=success) */}
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