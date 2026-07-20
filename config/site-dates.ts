/**
 * Single source of truth for public "last updated" / sitemap lastmod dates.
 * Update the ISO constants here when page content materially changes.
 */

/** Legal pages (/terms, /privacy, /cookies, /disclaimer). */
export const LEGAL_PAGES_LAST_MODIFIED = new Date("2026-05-05T00:00:00.000Z");

/** Marketing pages (/, /about, /impact, /team). */
export const MARKETING_PAGES_LAST_MODIFIED = new Date("2026-07-20T00:00:00.000Z");

/** Human-readable label for legal page templates ("Last updated: …"). */
export const LEGAL_PAGES_LAST_UPDATED = formatSiteDate(LEGAL_PAGES_LAST_MODIFIED);

export function formatSiteDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
