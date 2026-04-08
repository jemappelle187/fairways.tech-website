import type { Metadata } from "next";

const SITE_URL = "https://fairways.tech";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og/og-fairways-tech.png`;

type PublicPath =
  | "/"
  | "/about"
  | "/impact"
  | "/team"
  | "/privacy"
  | "/terms"
  | "/cookies"
  | "/disclaimer";

type PageMetadataInput = {
  title: string;
  description: string;
  path: PublicPath;
  ogTitle?: string;
  ogDescription?: string;
};

export function buildPageMetadata({
  title,
  description,
  path,
  ogTitle,
  ogDescription,
}: PageMetadataInput): Metadata {
  const canonicalUrl = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  const effectiveOgTitle = ogTitle ?? title;
  const effectiveOgDescription = ogDescription ?? description;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: effectiveOgTitle,
      description: effectiveOgDescription,
      url: canonicalUrl,
      siteName: "Fairways.Tech",
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: "Fairways.Tech: Turning farm activity into trusted, finance-ready data for smallholder farmers.",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: effectiveOgTitle,
      description: effectiveOgDescription,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}
