"use client";

import { useEffect, useRef } from "react";

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

/**
 * After analytics cookie consent, requests browser geolocation once (native prompt only)
 * and POSTs the same browser_gps_followup payload as the former LocationShareCta.
 */
export function LocationShareNativeTrigger() {
  const hasRequestedRef = useRef(false);

  useEffect(() => {
    const attempt = () => {
      if (hasRequestedRef.current) return;
      if (typeof window === "undefined") return;
      try {
        if (window.localStorage.getItem(COOKIE_CONSENT_KEY) !== "accepted") {
          return;
        }
        if (window.localStorage.getItem(LOCATION_SHARED_KEY) === "1") {
          return;
        }
        if (window.localStorage.getItem(LOCATION_DISMISSED_KEY) === "1") {
          return;
        }
        if (!navigator.geolocation) {
          return;
        }
      } catch {
        return;
      }

      hasRequestedRef.current = true;

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
            title: document.title || null,
            url: window.location.href,
            hostname: window.location.hostname,
            language: navigator.language,
            referrer: document.referrer || null,
            screen: `${window.innerWidth}x${window.innerHeight}`,
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
            })
            .catch(() => {
              // leave shared unset; no retry this session (hasRequestedRef)
            });
        },
        () => {
          try {
            window.localStorage.setItem(LOCATION_DISMISSED_KEY, "1");
          } catch {
            // ignore
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 12_000,
          maximumAge: 0,
        }
      );
    };

    attempt();
    const onConsent = (e: Event) => {
      const ce = e as CustomEvent<string>;
      if (ce.detail === "accepted") {
        attempt();
      }
    };
    window.addEventListener(
      "fw-cookie-consent-updated",
      onConsent as EventListener
    );
    return () =>
      window.removeEventListener(
        "fw-cookie-consent-updated",
        onConsent as EventListener
      );
  }, []);

  return null;
}
