import type { Metadata } from "next";
import Script from "next/script";
import HomePageClient from "./HomePageClient";

const homeWebPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://fairways.tech/#homepage",
  url: "https://fairways.tech/",
  name: "Fairways.Tech",
  description:
    "Fairways.Tech is digital infrastructure for agricultural financing. Banks and financial institutions use verified farm data and compliance-aligned rails to serve smallholder farmers, with operations in Ghana, the Netherlands, and other emerging markets.",
  isPartOf: {
    "@type": "WebSite",
    url: "https://fairways.tech",
    name: "Fairways.Tech",
  },
  about: {
    "@id": "https://fairways.tech/#organization",
  },
};

export const metadata: Metadata = {
  title: "Fairways.Tech | Digital infrastructure for agricultural finance and smallholder farmers",
  alternates: {
    canonical: "/",
  },
  description:
    "Fairways.Tech is digital infrastructure for agricultural financing: verified farm data and rails so banks can serve smallholder farmers in Ghana, the Netherlands, and emerging markets.",
  openGraph: {
    siteName: "Fairways.Tech",
    title: "Fairways.Tech — Turning farm activity into trusted, finance-ready data",
    description:
      "Fairways.Tech is digital infrastructure for agricultural financing: verified farm data and rails so banks can serve smallholder farmers in Ghana, the Netherlands, and emerging markets.",
    url: "https://fairways.tech",
  },
};

export default function HomePage() {
  return (
    <>
      <Script
        id="home-webpage-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeWebPageJsonLd),
        }}
      />
      <HomePageClient />
    </>
  );
}
