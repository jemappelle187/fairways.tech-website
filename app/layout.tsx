import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { UmamiLoader } from "./components/UmamiLoader";
import { VisitTracker } from "./components/VisitTracker";
import { GoogleAnalytics } from "./components/GoogleAnalytics";
import { ContentProtection } from "./components/ContentProtection";

export const metadata: Metadata = {
  metadataBase: new URL("https://fairways.tech"),
  title: {
    default: "Fairways.Tech — Turning farm activity into trusted, finance-ready data",
    template: "%s | Fairways.Tech",
  },
  description:
    "Turning farm activity into trusted, finance-ready data. Fairways.Tech builds compliance-first digital infrastructure enabling scalable access to finance and markets for smallholder farmers.",
  authors: [
    { name: "Fairways.Tech" },
    { name: "Emmanuel Yeboah Martina", url: "https://www.linkedin.com/in/eymartina/" },
    { name: "Kwan Yuk Li", url: "https://nl.linkedin.com/in/kwan-yuk-li-bb040b4" }
  ],
  creator: "Fairways.Tech",
  publisher: "Fairways.Tech",
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
    title: "Fairways.Tech — Turning farm activity into trusted, finance-ready data",
    description:
      "Turning farm activity into trusted, finance-ready data. Fairways.Tech builds compliance-first digital infrastructure enabling scalable access to finance and markets for smallholder farmers.",
    url: "https://fairways.tech",
    siteName: "Fairways.Tech",
    images: [
      {
        url: "/og-fairways-tech.webp?v=9",
        width: 1200,
        height: 630,
        alt: "Fairways.Tech: Turning farm activity into trusted, finance-ready data for smallholder farmers.",
      }
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fairways.Tech — Turning farm activity into trusted, finance-ready data",
    description:
      "Turning farm activity into trusted, finance-ready data. Fairways.Tech builds compliance-first digital infrastructure enabling scalable access to finance and markets for smallholder farmers.",
    images: ["/og-fairways-tech.webp?v=9"],
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
        <ContentProtection />
        {children}
        <VisitTracker />
        <UmamiLoader />
        <GoogleAnalytics />
        {/* Debug: Test if env var is available at build time - Fixed typo: O -> 0 */}
        <Script
          id="ga-env-test"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              console.log('[ENV TEST] NEXT_PUBLIC_GA_MEASUREMENT_ID:', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'NOT_FOUND'}');
              console.log('[ENV TEST] All NEXT_PUBLIC vars:', ${JSON.stringify(
                Object.keys(process.env).filter(k => k.startsWith('NEXT_PUBLIC_'))
              )});
            `,
          }}
        />
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
              logo: "https://fairways.tech/og-fairways-tech.webp?v=9",
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
                "Fairways.Tech builds compliance-first digital infrastructure, turning farm activity into trusted, finance-ready data for smallholder farmers.",
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
                "Digital infrastructure for smallholder farmers: identity, data, and compliant liquidity rails that turn farm activity into trusted, finance-ready data.",
              publisher: {
                "@type": "Organization",
                name: "Fairways.Tech",
                logo: {
                  "@type": "ImageObject",
                  url: "https://fairways.tech/og-fairways-tech.webp?v=9",
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