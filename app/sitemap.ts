import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://fairways.tech";

  return [
    { url: `${baseUrl}/`, lastModified: new Date() },
    { url: `${baseUrl}/team`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/impact`, lastModified: new Date() },
    { url: `${baseUrl}/terms`, lastModified: new Date() },
    { url: `${baseUrl}/privacy`, lastModified: new Date() },
    { url: `${baseUrl}/cookies`, lastModified: new Date() },
    { url: `${baseUrl}/disclaimer`, lastModified: new Date() },
  ];
}



