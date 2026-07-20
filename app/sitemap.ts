import type { MetadataRoute } from "next";
import {
  LEGAL_PAGES_LAST_MODIFIED,
  MARKETING_PAGES_LAST_MODIFIED,
} from "@/config/site-dates";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://fairways.tech";

  return [
    { url: `${baseUrl}/`, lastModified: MARKETING_PAGES_LAST_MODIFIED },
    { url: `${baseUrl}/team`, lastModified: MARKETING_PAGES_LAST_MODIFIED },
    { url: `${baseUrl}/about`, lastModified: MARKETING_PAGES_LAST_MODIFIED },
    { url: `${baseUrl}/impact`, lastModified: MARKETING_PAGES_LAST_MODIFIED },
    { url: `${baseUrl}/terms`, lastModified: LEGAL_PAGES_LAST_MODIFIED },
    { url: `${baseUrl}/privacy`, lastModified: LEGAL_PAGES_LAST_MODIFIED },
    { url: `${baseUrl}/cookies`, lastModified: LEGAL_PAGES_LAST_MODIFIED },
    { url: `${baseUrl}/disclaimer`, lastModified: LEGAL_PAGES_LAST_MODIFIED },
  ];
}
