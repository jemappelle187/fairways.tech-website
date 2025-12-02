import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { UmamiLoader } from "./components/UmamiLoader";
import { VisitTracker } from "./components/VisitTracker";
import { ContentProtection } from "./components/ContentProtection";

export const metadata: Metadata = {
  metadataBase: new URL("https://fairways.tech"),
  title: {
    default: "Fairways.Tech – Digital Infrastructure for Smallholder Farmers",
    template: "%s | Fairways.Tech",
  },
  description:
    "Transform farm data into trusted finance. Fairways.Tech is a community-driven agri-fintech ecosystem unlocking scalable, compliant access to finance and markets for African smallholder farmers.",
  icons: {
    icon: [
      { url: "/images/favicons/favicon.ico" },
      { url: "/images/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicons/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/images/favicons/favicon-512x512.png", sizes: "512x512", type: "image/png" }
    ],
    apple: "/images/favicons/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Fairways.Tech – Unlock Finance for African Farmers",
    description:
      "Transform farm data into trusted finance. Community-driven agri-fintech ecosystem unlocking scalable, compliant access to finance and markets for smallholder farmers across Africa.",
    url: "https://fairways.tech",
    siteName: "Fairways.Tech",
    images: [
      {
        url: "/og-fairways-tech.png?v=7",
        width: 1200,
        height: 630,
        alt: "Fairways.Tech: Community-driven digital infrastructure empowering African smallholder farmers with trusted data, compliant finance, and market access",
      }
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fairways.Tech – Unlock Finance for African Farmers",
    description:
      "Transform farm data into trusted finance. Community-driven agri-fintech unlocking scalable, compliant access to markets and capital for smallholder farmers.",
    images: ["/og-fairways-tech.png?v=6"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const peopleJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://fairways.tech/#emmanuel-yeboah-martina",
        name: "Emmanuel Yeboah Martina",
        jobTitle: "Co-Founder & CEO",
        description:
          "Financial expert with experience across AML, CTF, KYC, GDPR and digital-asset operations, shaping EU-aligned governance and compliant financial architectures for scalable fintech in frontier markets.",
        worksFor: {
          "@id": "https://fairways.tech/#organization",
        },
        sameAs: ["https://www.linkedin.com/in/eymartina/"],
      },
      {
        "@type": "Person",
        "@id": "https://fairways.tech/#kwan-yuk-li",
        name: "Kwan Yuk Li",
        jobTitle: "Co-Founder & COO",
        description:
          "Specialist across finance and IT regulation and risk — DORA, GDPR, IFRS 9 and 17, Solvency II, Basel III, SOX — and European IT infrastructure, designing secure digital architectures and regulatory-framework strategies for resilient financial services.",
        worksFor: {
          "@id": "https://fairways.tech/#organization",
        },
        sameAs: ["https://nl.linkedin.com/in/kwan-yuk-li-bb040b4"],
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        {/* Explicit favicon links for faster Google indexing */}
        <link rel="icon" type="image/x-icon" href="/images/favicons/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicons/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/images/favicons/favicon-192x192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/favicons/apple-touch-icon.png" />
      </head>
      <body className="bg-sand font-sans text-stone antialiased">
        {/* <ContentProtection /> */}
        {children}
        <VisitTracker />
        <UmamiLoader />
        {/* Organization Schema */}
        <Script
          id="fairways-org-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://fairways.tech/#organization",
              name: "Fairways.Tech",
              url: "https://fairways.tech",
              logo: "https://fairways.tech/og-fairways-tech.png?v=4",
              sameAs: [],
              foundingDate: "2025",
              address: {
                "@type": "PostalAddress",
                addressCountry: "NL",
              },
              contactPoint: {
                "@type": "ContactPoint",
                email: "info@fairways.tech",
                contactType: "General Inquiry",
                areaServed: ["NL", "GH"],
              },
              description:
                "Fairways.Tech builds compliance-first digital infrastructure to unlock fair finance for Africa's smallholder farmers.",
            }),
          }}
        />
        {/* WebSite Schema with SearchAction */}
        <Script
          id="fairways-website-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Fairways.Tech",
              url: "https://fairways.tech",
              description:
                "Digital infrastructure for smallholder farmers: identity, data, and compliant liquidity rails across Africa.",
              publisher: {
                "@type": "Organization",
                name: "Fairways.Tech",
                logo: {
                  "@type": "ImageObject",
                  url: "https://fairways.tech/og-fairways-tech.png?v=4",
                },
              },
            }),
          }}
        />
        {/* People Schema */}
        <Script
          id="people-json-ld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(peopleJsonLd),
          }}
        />
      </body>
    </html>
  );
}