"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "fw_cookie_consent_v1";

export function GoogleAnalytics() {
  const [shouldLoad, setShouldLoad] = useState<boolean | null>(null);
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const pathname = usePathname();
  
  // Immediate log when component function is called (before React renders)
  if (typeof window !== "undefined") {
    console.log("[GoogleAnalytics] 🔍 Component function called");
    console.log("[GoogleAnalytics] Measurement ID from env:", gaMeasurementId || "❌ NOT FOUND");
  }
  
  // Debug logging - always log on mount
  useEffect(() => {
    console.log("[GoogleAnalytics] ✅ Component mounted (useEffect)");
    console.log("[GoogleAnalytics] Measurement ID:", gaMeasurementId || "❌ NOT FOUND");
    console.log("[GoogleAnalytics] All NEXT_PUBLIC vars:", Object.keys(process.env).filter(k => k.startsWith('NEXT_PUBLIC_')));
  }, [gaMeasurementId]);

  useEffect(() => {
    console.log("[GoogleAnalytics] useEffect running, Measurement ID:", gaMeasurementId);
    
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
          console.log("[GoogleAnalytics] Consent accepted, loading GA4");
          setShouldLoad(true);
        } else if (consent === "rejected") {
          console.log("[GoogleAnalytics] Consent rejected, not loading GA4");
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
      console.log("[GoogleAnalytics] Consent changed to:", value);
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
        console.log(`[GoogleAnalytics] Page view tracked for route: ${pathname}`);
      } else {
        // Retry after a short delay if gtag isn't ready yet
        setTimeout(checkAndSend, 100);
      }
    };
    
    checkAndSend();
  }, [pathname, shouldLoad, gaMeasurementId]);

  // Only render GA scripts if consent is accepted
  if (!shouldLoad || !gaMeasurementId) {
    return (
      <div style={{ display: 'none' }} data-ga-component="mounted">
        {/* Debug: GA Component rendered - waiting for consent */}
      </div>
    );
  }

  return (
    <>
      {/* Google Analytics 4 - Standard Implementation */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
        strategy="afterInteractive"
        onLoad={() => {
          console.log("[GoogleAnalytics] ✅ gtag.js script loaded");
        }}
        onError={() => {
          console.error("[GoogleAnalytics] ❌ Failed to load gtag.js script");
        }}
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
            console.log('[GoogleAnalytics] GA4 initialized with ID: ${gaMeasurementId}');
            console.log('[GoogleAnalytics] dataLayer:', window.dataLayer);
            
            // Note: gtag('config') automatically sends a page_view event
            // But we'll also send one explicitly after script is ready
            setTimeout(function() {
              if (window.gtag) {
                window.gtag('event', 'page_view', {
                  page_path: window.location.pathname,
                  page_title: document.title,
                  page_location: window.location.href,
                });
                console.log('[GoogleAnalytics] ✅ Explicit page_view sent for: ' + window.location.pathname);
                console.log('[GoogleAnalytics] Final dataLayer:', window.dataLayer);
              }
            }, 1000);
          `,
        }}
      />
    </>
  );
}
