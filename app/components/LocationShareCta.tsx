"use client";

import { useCallback, useEffect, useState } from "react";

const COOKIE_CONSENT_KEY = "fw_cookie_consent_v1";
const LOCATION_SHARED_KEY = "fw_browser_location_shared_v1";
const LOCATION_DISMISSED_KEY = "fw_browser_location_dismissed_v1";
const CORRELATION_KEY = "fw_visit_correlation_id";

function readCorrelationId(): string | null {
  try {
    return window.localStorage.getItem(CORRELATION_KEY);
  } catch {
    return null;
  }
}

export function LocationShareCta() {
  const [eligible, setEligible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshEligibility = useCallback(() => {
    try {
      const consent = window.localStorage.getItem(COOKIE_CONSENT_KEY);
      const shared = window.localStorage.getItem(LOCATION_SHARED_KEY);
      const dismissed = window.localStorage.getItem(LOCATION_DISMISSED_KEY);
      const ok =
        consent === "accepted" &&
        shared !== "1" &&
        dismissed !== "1" &&
        typeof navigator !== "undefined" &&
        !!navigator.geolocation;
      setEligible(ok);
      setVisible(ok);
    } catch {
      setEligible(false);
      setVisible(false);
    }
  }, []);

  useEffect(() => {
    refreshEligibility();
    const onConsent = () => refreshEligibility();
    window.addEventListener("fw-cookie-consent-updated", onConsent);
    return () =>
      window.removeEventListener("fw-cookie-consent-updated", onConsent);
  }, [refreshEligibility]);

  const dismiss = () => {
    try {
      window.localStorage.setItem(LOCATION_DISMISSED_KEY, "1");
    } catch {
      // ignore
    }
    setVisible(false);
  };

  const shareLocation = () => {
    if (!navigator.geolocation) return;
    setBusy(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const visitCorrelationId = readCorrelationId();
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;
        const accuracyMeters =
          typeof pos.coords.accuracy === "number"
            ? pos.coords.accuracy
            : undefined;
        const capturedAtIso = new Date().toISOString();

        const pagePayload = {
          kind: "browser_gps_followup" as const,
          visitCorrelationId: visitCorrelationId || undefined,
          latitude,
          longitude,
          accuracyMeters,
          capturedAtIso,
          title: typeof document !== "undefined" ? document.title : null,
          url:
            typeof window !== "undefined" ? window.location.href : undefined,
          hostname:
            typeof window !== "undefined"
              ? window.location.hostname
              : undefined,
          language:
            typeof navigator !== "undefined" ? navigator.language : undefined,
          referrer:
            typeof document !== "undefined" ? document.referrer || null : null,
          screen:
            typeof window !== "undefined"
              ? `${window.innerWidth}x${window.innerHeight}`
              : undefined,
        };

        fetch("/api/umami-to-slack", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pagePayload),
          keepalive: true,
        })
          .then(() => {
            try {
              window.localStorage.setItem(LOCATION_SHARED_KEY, "1");
            } catch {
              // ignore
            }
            setVisible(false);
          })
          .catch(() => {
            setError("Could not send location. Please try again.");
          })
          .finally(() => setBusy(false));
      },
      () => {
        setError("Location unavailable or denied.");
        setBusy(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 12_000,
        maximumAge: 0,
      }
    );
  };

  if (!eligible || !visible) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 pb-4">
      <div className="pointer-events-auto mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-stone/15 bg-sand/95 px-4 py-3 text-sm text-stone shadow-lg backdrop-blur-sm sm:flex sm:items-center sm:justify-between sm:gap-4 sm:px-5">
          <p className="text-[13px] leading-relaxed">
            Optional: share your approximate location to help us understand
            where visitors find us. You can decline anytime.
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2 sm:mt-0 sm:shrink-0">
            {error ? (
              <span className="text-xs text-red-800">{error}</span>
            ) : null}
            <button
              type="button"
              onClick={dismiss}
              disabled={busy}
              className="inline-flex items-center justify-center rounded-full border border-stone/25 px-3 py-1.5 text-xs font-medium text-stone hover:bg-stone/10 disabled:opacity-50"
            >
              Not now
            </button>
            <button
              type="button"
              onClick={shareLocation}
              disabled={busy}
              className="inline-flex items-center justify-center rounded-full bg-forest px-4 py-1.5 text-xs font-semibold text-sand shadow-sm hover:bg-forest/90 disabled:opacity-50"
            >
              {busy ? "Sharing…" : "Share location"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
