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
    <Script
      src="https://cloud.umami.is/script.js"
      data-website-id="35737669-48d9-417b-84b8-219610fbff91"
      data-domains="fairways.tech"
      strategy="afterInteractive"
    />
  );
}

