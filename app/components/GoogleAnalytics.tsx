"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const STORAGE_KEY = "fw_cookie_consent_v1";

export function GoogleAnalytics() {
  const [shouldLoad, setShouldLoad] = useState<boolean | null>(null);
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  
  // Debug logging - always log on mount
  useEffect(() => {
    console.log("[GoogleAnalytics] ✅ Component mounted");
    console.log("[GoogleAnalytics] Measurement ID:", gaMeasurementId || "❌ NOT FOUND");
    console.log("[GoogleAnalytics] All NEXT_PUBLIC vars:", Object.keys(process.env).filter(k => k.startsWith('NEXT_PUBLIC_')));
  }, [gaMeasurementId]);

  // Function to load GA4 scripts dynamically
  const loadGA4 = () => {
    if (typeof window === "undefined" || !gaMeasurementId) return;
    
    const win = window as any;
    
    // Check if already loaded
    if (win.dataLayer && win.gtag) {
      console.log("[GoogleAnalytics] GA4 already loaded");
      return;
    }

    // Load gtag.js script
    const script1 = document.createElement("script");
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`;
    script1.onload = () => {
      console.log("[GoogleAnalytics] gtag.js script loaded");
    };
    document.head.appendChild(script1);

    // Initialize GA4
    win.dataLayer = win.dataLayer || [];
    function gtag(...args: any[]) {
      win.dataLayer.push(args);
    }
    win.gtag = gtag;
    gtag("js", new Date());
    gtag("config", gaMeasurementId, {
      page_path: window.location.pathname,
      anonymize_ip: true,
      cookie_flags: "SameSite=None;Secure",
    });
    console.log(`[GoogleAnalytics] GA4 initialized with ID: ${gaMeasurementId}`);
  };

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
          loadGA4();
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
        loadGA4();
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

  // For initial page load with consent already accepted, use Next.js Script
  if (shouldLoad && gaMeasurementId && typeof window !== "undefined") {
    const win = window as any;
    if (win.gtag) return null; // Already loaded
    return (
      <>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
          strategy="afterInteractive"
          onLoad={() => {
            console.log("[GoogleAnalytics] GA4 script loaded via Next.js Script");
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
                anonymize_ip: true,
                cookie_flags: 'SameSite=None;Secure',
              });
              console.log('[GoogleAnalytics] GA4 initialized with ID: ${gaMeasurementId}');
            `,
          }}
        />
      </>
    );
  }

  // Always render something for debugging (will be removed in production)
  if (process.env.NODE_ENV === 'development') {
    return (
      <div style={{ display: 'none' }}>
        {/* Debug: GA Component rendered */}
      </div>
    );
  }
  
  return null;
}

