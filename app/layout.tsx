import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { UmamiLoader } from "./components/UmamiLoader";
import { VisitTracker } from "./components/VisitTracker";

export const metadata: Metadata = {
  metadataBase: new URL("https://fairways.tech"),
  title: {
    default: "Fairways.Tech – Digital Infrastructure for Smallholder Farmers",
    template: "%s | Fairways.Tech",
  },
  description:
    "Fairways.Tech builds compliance-first digital rails, identity, and data infrastructure to unlock fair finance for Africa's smallholder farmers.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-512x512.png", sizes: "512x512", type: "image/png" }
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Fairways.Tech – Digital Infrastructure for Smallholder Farmers",
    description:
      "Digital infrastructure for smallholder farmers: identity, data, and compliant liquidity rails across Africa.",
    url: "https://fairways.tech",
    siteName: "Fairways.Tech",
    images: [
      {
        url: "/og-fairways-tech.png",
        width: 1200,
        height: 630,
        alt: "Fairways.Tech – Digital Infrastructure for Smallholder Farmers",
      }
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fairways.Tech – Digital Infrastructure for Smallholder Farmers",
    description:
      "Compliance-first digital rails and data infrastructure for African smallholder farmers.",
    images: ["/og-fairways-tech.png"],
  },
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
        <VisitTracker />
        <UmamiLoader />
        <Script
          id="fairways-org-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Fairways.Tech",
              url: "https://fairways.tech",
              logo: "https://fairways.tech/og-fairways-tech.png",
              sameAs: [],
              foundingDate: "2025",
              address: {
                "@type": "PostalAddress",
                addressCountry: "NL",
              },
              description:
                "Fairways.Tech builds compliance-first digital infrastructure to unlock fair finance for Africa's smallholder farmers.",
            }),
          }}
        />
      </body>
    </html>
  );
}