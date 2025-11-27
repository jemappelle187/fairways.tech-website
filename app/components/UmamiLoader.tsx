"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const STORAGE_KEY = "fw_cookie_consent_v1";

export function UmamiLoader() {
  const [shouldLoad, setShouldLoad] = useState<boolean | null>(null);

  useEffect(() => {
    // Check existing consent
    try {
      const consent = window.localStorage.getItem(STORAGE_KEY);
      if (consent === "accepted") {
        setShouldLoad(true);
      } else if (consent === "rejected") {
        setShouldLoad(false);
      } else {
        // No consent yet - wait for user decision
        setShouldLoad(false);
      }
    } catch {
      setShouldLoad(false);
    }

    // Listen for consent changes
    const handleConsentChange = (event: CustomEvent) => {
      const value = event.detail;
      if (value === "accepted") {
        setShouldLoad(true);
      } else {
        setShouldLoad(false);
      }
    };

    window.addEventListener(
      "fw-cookie-consent-updated",
      handleConsentChange as EventListener
    );

    return () => {
      window.removeEventListener(
        "fw-cookie-consent-updated",
        handleConsentChange as EventListener
      );
    };
  }, []);

  // Don't render anything until we've checked consent
  if (shouldLoad === null) {
    return null;
  }

  // Only load Umami if consent is accepted
  if (!shouldLoad) {
    return null;
  }

  return (
    <>
      <Script
        src="https://cloud.umami.is/script.js"
        data-website-id="35737669-48d9-417b-84b8-219610fbff91"
        data-domains="fairways.tech"
        strategy="afterInteractive"
      />

      {/* One-time visit event -> Slack via /api/umami-to-slack */}
      <Script
        id="umami-slack-visit"
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
    console.error("[UMAMI_SLACK_VISIT] client error", e);
  }
})();
          `,
        }}
      />
    </>
  );
}

