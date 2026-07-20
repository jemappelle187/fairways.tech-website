"use client";

import Script from "next/script";

/**
 * Microsoft Clarity — loads for all visitors (not gated by cookie banner).
 *
 * For EEA/UK/CH traffic Clarity requires a consent signal for full features
 * (recordings/heatmaps). We grant analytics_storage so monitoring works without
 * the banner; ad_storage stays denied. Prefer also turning Cookies Off under
 * Settings → Installatie (Setup) → advanced / cookies in the Clarity dashboard.
 */
export function ClarityLoader() {
  const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

  if (!projectId) {
    return null;
  }

  return (
    <Script
      id="microsoft-clarity"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${projectId}");
          window.clarity("consentv2", {
            ad_Storage: "denied",
            analytics_Storage: "granted"
          });
        `,
      }}
    />
  );
}
