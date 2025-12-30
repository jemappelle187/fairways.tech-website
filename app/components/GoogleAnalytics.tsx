"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "fw_cookie_consent_v1";

export function GoogleAnalytics() {
  const [shouldLoad, setShouldLoad] = useState<boolean | null>(null);
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const pathname = usePathname();

  useEffect(() => {
    // Don't load if no measurement ID is configured
    if (!gaMeasurementId) {
      console.error("[GoogleAnalytics] ❌ No NEXT_PUBLIC_GA_MEASUREMENT_ID found! Check environment variables.");
      setShouldLoad(false);
      return;
    }

    // Check existing consent
    const checkConsent = () => {
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
    };

    // Check immediately
    checkConsent();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gaMeasurementId]);

  // Track page views on route changes (Next.js App Router)
  useEffect(() => {
    if (!shouldLoad || !gaMeasurementId || typeof window === "undefined") return;
    
    const win = window as any;
    
    // Wait for gtag to be available (script might still be loading)
    const checkAndSend = () => {
      if (win.gtag && win.dataLayer) {
        // Send page view event on route change
        win.gtag("event", "page_view", {
          page_path: pathname,
          page_title: document.title,
          page_location: window.location.href,
        });
      } else {
        // Retry after a short delay if gtag isn't ready yet
        setTimeout(checkAndSend, 100);
      }
    };
    
    checkAndSend();
  }, [pathname, shouldLoad, gaMeasurementId]);

  // Only render GA scripts if consent is accepted
  if (!shouldLoad || !gaMeasurementId) {
    return null;
  }

  return (
    <>
      {/* Google Analytics 4 - Standard Implementation */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
              gtag('config', '${gaMeasurementId}', {
                page_path: window.location.pathname,
                page_title: document.title,
                anonymize_ip: true,
                cookie_flags: 'SameSite=None;Secure',
              });
              
              // Note: gtag('config') automatically sends a page_view event
              // Send an explicit page_view after script is ready for consistency
              setTimeout(function() {
                if (window.gtag) {
                  window.gtag('event', 'page_view', {
                    page_path: window.location.pathname,
                    page_title: document.title,
                    page_location: window.location.href,
                  });
                }
              }, 1000);
          `,
        }}
      />
    </>
  );
}
