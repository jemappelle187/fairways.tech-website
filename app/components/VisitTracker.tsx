"use client";

import Script from "next/script";

/**
 * VisitTracker - Always tracks visits and sends to Slack, regardless of cookie consent.
 * This is separate from Umami analytics which requires consent.
 */
export function VisitTracker() {
  return (
    <Script
      id="visit-tracker-slack"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
(function () {
  if (typeof window === "undefined" || !window.fetch) return;

  try {
    // Simple, privacy-friendly first-time vs returning flag
    var visitorType = "first-time";
    try {
      var key = "fw_visit_seen";
      var stored = window.localStorage.getItem(key);
      if (stored === "1") {
        visitorType = "returning";
      } else {
        window.localStorage.setItem(key, "1");
      }
    } catch (e) {
      // localStorage may be disabled; ignore
    }

    var payload = {
      title: document.title || null,
      url: window.location.href,
      hostname: window.location.hostname,
      language: navigator.language || null,
      referrer: document.referrer || null,
      screen: window.innerWidth + "x" + window.innerHeight,
      visitorType: visitorType
    };

    fetch("/api/umami-to-slack", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true
    }).catch(function () {
      // swallow client-side errors
    });

  } catch (e) {
    console.error("[VISIT_TRACKER] client error", e);
  }
})();
        `,
      }}
    />
  );
}

