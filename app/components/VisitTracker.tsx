"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Sends an internal Slack notification for the initial visit and every
 * client-side page navigation.
 */
export function VisitTracker() {
  const pathname = usePathname();
  const lastTrackedUrlRef = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.fetch) return;

    const url = window.location.href;
    if (lastTrackedUrlRef.current === url) return;
    lastTrackedUrlRef.current = url;

    let visitorType = "first-time";
    try {
      const key = "fw_visit_seen";
      if (window.localStorage.getItem(key) === "1") {
        visitorType = "returning";
      } else {
        window.localStorage.setItem(key, "1");
      }
    } catch {
      // localStorage may be disabled; continue without persistence.
    }

    let visitCorrelationId: string | null = null;
    try {
      visitCorrelationId =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
              const random = (Math.random() * 16) | 0;
              const value = char === "x" ? random : (random & 0x3) | 0x8;
              return value.toString(16);
            });
      window.localStorage.setItem(
        "fw_visit_correlation_id",
        visitCorrelationId
      );
    } catch {
      // localStorage may be disabled; continue without a correlation id.
    }

    void fetch("/api/umami-to-slack", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kind: "visit",
        visitCorrelationId,
        title: document.title || null,
        url,
        hostname: window.location.hostname,
        language: navigator.language || null,
        referrer: document.referrer || null,
        screen: `${window.innerWidth}x${window.innerHeight}`,
        visitorType,
      }),
      keepalive: true,
    })
      .then((response) => {
        if (!response.ok) {
          console.error(
            `[VISIT_TRACKER] notification failed with status ${response.status}`
          );
        }
      })
      .catch((error: unknown) => {
        console.error("[VISIT_TRACKER] notification request failed", error);
      });
  }, [pathname]);

  return null;
}
