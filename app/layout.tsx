import Script from "next/script";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://fairways.tech"),
  title: {
    default: "Fairways.Tech – Digital infrastructure empowering farmers to scale",
    template: "%s | Fairways.Tech",
  },
  description:
    "Fairways.Tech is a community-driven agri-fintech ecosystem helping smallholder farmers and horticultural producers scale through trusted data, transparent value chains, and compliance-first finance.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" }
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    url: "https://fairways.tech",
    title: "Fairways.Tech – Digital infrastructure empowering farmers to scale",
    description:
      "Community-driven agri-fintech enabling farmers to grow through trusted data, transparent value chains, and compliant finance.",
    siteName: "Fairways.Tech",
    images: [
      {
        url: "/og-fairways-tech.png",
        width: 1200,
        height: 630,
        alt: "Fairways.Tech – digital infrastructure empowering farmers to scale",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Fairways.Tech – Digital infrastructure empowering farmers to scale",
    description:
      "Community-driven agri-fintech enabling farmers to scale responsibly with trusted data and compliant finance.",
    images: ["/og-fairways-tech.png"]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-sand font-sans text-stone antialiased">
        {children}

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
      </body>
    </html>
  );
}