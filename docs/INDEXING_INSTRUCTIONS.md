# Search indexing — legal pages (manual workflow)

Google Search Console does not offer a supported, automatable “index now” API for normal site owners. This document lists **SEO signals already in the repo** (sitemap `lastModified`, crawlable links) and a **short manual** flow to request recrawling after legal page updates.

---

## 1. Exact URLs (production)

Submit or inspect these URLs in [Google Search Console](https://search.google.com/search-console):

- https://fairways.tech/terms
- https://fairways.tech/privacy
- https://fairways.tech/cookies
- https://fairways.tech/disclaimer

Sitemap (for reference):

- https://fairways.tech/sitemap.xml

---

## 2. Quick manual steps (≈2 minutes)

1. Open [Google Search Console](https://search.google.com/search-console) and select the **fairways.tech** property.
2. Use the top **URL inspection** search bar.
3. Paste one of the four URLs above and press **Enter**.
4. When the result loads, click **Request indexing** (if available; Google may rate-limit or show “URL is on Google” already).
5. Repeat for the other three URLs as needed.

**Note:** “Request indexing” is a best-effort queue; it does not guarantee immediate ranking or cache updates.

---

## 3. Optional: sitemap ping script (not indexing)

A small script can **GET** Google’s legacy sitemap ping URL (recrawl *hint* for the sitemap file only):

- File: `scripts/ping-google.ts`
- Run only when you intend to, for example:  
  `npx tsx scripts/ping-google.ts`  
  (Requires network access; do not add to default deploy scripts unless you want that behavior.)

This does **not** replace URL Inspection and does not force indexing of individual HTML URLs.

---

## 4. What the site already does

- **`app/sitemap.xml`** (generated from `app/sitemap.ts`) lists all four legal URLs with **absolute** `https://fairways.tech/...` URLs and a set **`lastModified`** for those routes.
- **`app/robots.ts`** allows `User-agent: *` for `/` and points to the sitemap; there are **no** `Disallow` rules for `/terms`, `/privacy`, `/cookies`, or `/disclaimer`.
- **Footer** (`SiteChrome`) uses normal `<a href="...">` links to the four routes (crawlable HTML links).
- **Legal `metadata`** uses `buildPageMetadata` (title, description, Open Graph); there is **no** `noindex` on these pages from that helper.

---

## 5. Limitations (cannot be fully automated)

- **Indexing, ranking, and cache refresh** are controlled by Google; no in-repo change can guarantee a timeline.
- **Search Console APIs** for on-demand indexing are not part of this project’s approach (see project instructions).

**Estimated time for manual URL inspection steps above:** under 2 minutes for all four URLs if the tool cooperates.
