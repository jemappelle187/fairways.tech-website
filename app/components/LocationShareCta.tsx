"use client";

import { useCallback, useEffect, useState } from "react";

const LOCATION_SHARED_KEY = "fw_browser_location_shared_v1";
const LOCATION_DISMISSED_KEY = "fw_browser_location_dismissed_v1";
const CORRELATION_KEY = "fw_visit_correlation_id";

function notifyLocationCtaResolved() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("fw-location-cta-resolved"));
}

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
      const shared = window.localStorage.getItem(LOCATION_SHARED_KEY);
      const dismissed = window.localStorage.getItem(LOCATION_DISMISSED_KEY);
      const ok =
        shared !== "1" &&
        dismissed !== "1" &&
        typeof navigator !== "undefined" &&
        !!navigator.geolocation;
      setEligible(ok);
      setVisible(ok);
      if (!ok) {
        notifyLocationCtaResolved();
      }
    } catch {
      setEligible(false);
      setVisible(false);
      notifyLocationCtaResolved();
    }
  }, []);

  useEffect(() => {
    refreshEligibility();
  }, [refreshEligibility]);

  useEffect(() => {
    if (!eligible || !visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [eligible, visible]);

  const dismiss = () => {
    try {
      window.localStorage.setItem(LOCATION_DISMISSED_KEY, "1");
    } catch {
      // ignore
    }
    setVisible(false);
    notifyLocationCtaResolved();
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
            notifyLocationCtaResolved();
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
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-stone-900/35 backdrop-blur-[2px] transition-opacity"
        aria-label="Close location prompt"
        onClick={dismiss}
      />
      <div
        className="relative z-10 w-full max-w-md rounded-[28px] border border-white/50 bg-white/55 px-6 py-7 text-center shadow-[0_24px_80px_rgba(15,23,42,0.18)] backdrop-blur-2xl ring-1 ring-stone-900/5 sm:px-8 sm:py-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="location-share-title"
        aria-describedby="location-share-desc"
      >
        <p
          id="location-share-title"
          className="text-xs font-semibold uppercase tracking-[0.2em] text-forest"
        >
          Optional
        </p>
        <h2 className="mt-2 text-lg font-semibold tracking-tight text-stone sm:text-xl">
          Share approximate location?
        </h2>
        <p
          id="location-share-desc"
          className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-[15px]"
        >
          We&apos;re building from the field up. A rough idea of which country
          you&apos;re visiting from helps us see whether our message lands where
          it matters most.
        </p>
        {error ? (
          <p className="mt-3 text-xs font-medium text-red-800" role="alert">
            {error}
          </p>
        ) : null}
        <div className="mt-6 flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-center sm:gap-3">
          <button
            type="button"
            onClick={dismiss}
            disabled={busy}
            className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full border border-stone/25 bg-white/40 px-5 py-2.5 text-sm font-medium text-stone backdrop-blur-sm transition hover:bg-white/60 disabled:opacity-50 sm:w-auto"
          >
            Not now
          </button>
          <button
            type="button"
            onClick={shareLocation}
            disabled={busy}
            className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-sand shadow-md transition hover:bg-forest/90 disabled:opacity-50 sm:w-auto"
          >
            {busy ? "Sharing…" : "Share location"}
          </button>
        </div>
      </div>
    </div>
  );
}
