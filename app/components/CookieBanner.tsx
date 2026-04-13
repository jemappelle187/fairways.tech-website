"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "fw_cookie_consent_v1";
const LOCATION_SHARED_KEY = "fw_browser_location_shared_v1";
const LOCATION_DISMISSED_KEY = "fw_browser_location_dismissed_v1";

type ConsentValue = "accepted" | "rejected";

/** True while the optional location CTA may still be shown (same rules as LocationShareCta). */
function locationShareCtaPending(): boolean {
  try {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      return false;
    }
    if (window.localStorage.getItem(LOCATION_SHARED_KEY) === "1") {
      return false;
    }
    if (window.localStorage.getItem(LOCATION_DISMISSED_KEY) === "1") {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export function CookieBanner() {
  const [hasMounted, setHasMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const syncVisible = () => {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        const pending = locationShareCtaPending();
        setVisible(!stored && !pending);
      } catch {
        setVisible(false);
      }
    };
    syncVisible();
    window.addEventListener("fw-location-cta-resolved", syncVisible);
    return () =>
      window.removeEventListener("fw-location-cta-resolved", syncVisible);
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
      <div className="pointer-events-auto mx-auto max-w-6xl px-4 pb-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-slate-900 px-4 py-4 text-sm text-sand shadow-xl shadow-black/30 sm:flex sm:items-center sm:justify-between sm:gap-4 sm:px-6">
          <div className="space-y-1.5 sm:space-y-0">
            <p className="font-semibold text-sand">
              Cookies &amp; privacy
            </p>
            <p className="text-[13px] leading-relaxed text-sand/80">
              This website uses essential cookies and privacy-respectful analytics
              (Google Analytics & Umami) to ensure security, reliability and to understand
              how our site is used. For details, please see our{" "}
              <a
                href="/cookies"
                className="underline decoration-sand/70 underline-offset-4 hover:decoration-sand"
              >
                Cookie Policy
              </a>
              .
            </p>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2 sm:mt-0 sm:justify-end">
            <button
              type="button"
              onClick={() => setConsent("rejected")}
              className="inline-flex items-center justify-center rounded-full border border-sand/40 px-3.5 py-1.5 text-xs font-medium text-sand/90 hover:bg-sand/10"
            >
              Decline non-essential
            </button>
            <button
              type="button"
              onClick={() => setConsent("accepted")}
              className="inline-flex items-center justify-center rounded-full bg-forest px-4 py-1.5 text-xs font-semibold text-sand shadow-sm hover:bg-forest/90"
            >
              Accept analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}