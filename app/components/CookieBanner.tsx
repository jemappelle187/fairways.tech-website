"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "fw_cookie_consent_v1";

type ConsentValue = "accepted" | "rejected";

export function CookieBanner() {
  const [hasMounted, setHasMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        setVisible(true);
      }
    } catch {
      // If localStorage is not available, show nothing (fail-safe)
      setVisible(false);
    }
  }, []);

  if (!hasMounted || !visible) {
    return null;
  }

  const setConsent = (value: ConsentValue) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
      window.localStorage.setItem(
        `${STORAGE_KEY}_updated_at`,
        new Date().toISOString()
      );
    } catch {
      // Ignore storage errors
    }

    // Let other scripts (e.g. Umami loader) react to consent changes
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("fw-cookie-consent-updated", {
          detail: value,
        })
      );
    }

    setVisible(false);
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50">
      <div className="pointer-events-auto mx-auto max-w-5xl px-4 pb-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(145deg,rgba(17,24,39,0.96),rgba(31,59,44,0.94))] px-4 py-4 text-sm text-sand shadow-[0_18px_45px_rgba(15,23,42,0.28)] ring-1 ring-white/5 sm:flex sm:items-center sm:justify-between sm:gap-5 sm:px-5">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[url('/images/leaf_background.webp')] bg-cover bg-center opacity-[0.12] mix-blend-overlay"
          />
          <div className="relative space-y-1.5 sm:max-w-3xl sm:space-y-1">
            <p className="text-[13px] font-semibold tracking-[0.01em] text-white">
              Cookies &amp; privacy
            </p>
            <p className="text-[12px] leading-relaxed text-sand/78 sm:text-[13px]">
              We use essential technologies to keep this website secure and
              reliable. With your permission, we also use optional analytics to
              understand how the website is used and improve the experience. Learn
              more in our{" "}
              <a
                href="/cookies"
                className="font-medium text-white underline decoration-sand/45 underline-offset-4 transition hover:decoration-white"
              >
                Cookie Policy
              </a>
              .
            </p>
          </div>
          <div className="relative mt-3 flex flex-wrap items-center gap-2 sm:mt-0 sm:shrink-0 sm:justify-end">
            <button
              type="button"
              onClick={() => setConsent("rejected")}
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-sand/90 transition hover:border-white/35 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              Decline non-essential
            </button>
            <button
              type="button"
              onClick={() => setConsent("accepted")}
              className="inline-flex items-center justify-center rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-forest shadow-sm transition hover:bg-sand focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              Accept analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
