import type { MetadataRoute } from "next";

/** Site-wide recrawl hint for updated legal routes (rebuild / content refresh). */
const LEGAL_PAGES_LASTMOD = new Date("2026-04-23T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://fairways.tech";

  return [
    { url: `${baseUrl}/`, lastModified: new Date() },
    { url: `${baseUrl}/team`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/impact`, lastModified: new Date() },
    { url: `${baseUrl}/terms`, lastModified: LEGAL_PAGES_LASTMOD },
    { url: `${baseUrl}/privacy`, lastModified: LEGAL_PAGES_LASTMOD },
    { url: `${baseUrl}/cookies`, lastModified: LEGAL_PAGES_LASTMOD },
    { url: `${baseUrl}/disclaimer`, lastModified: LEGAL_PAGES_LASTMOD },
  ];
}





