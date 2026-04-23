# Legal Rebuild — Execution Report

**Date:** 23 April 2026 (execution)  
**Branch:** `feature/legal-pages-rebuild`  
**Commit message:** `feat(legal): rebuild legal pages with institutional template and unified entity config`

## 1. Files created

| Path |
|------|
| `config/legal.ts` |
| `app/components/legal/LegalPageTemplate.tsx` |
| `app/components/legal/LegalSection.tsx` |
| `app/components/legal/TableOfContents.tsx` |
| `app/components/legal/index.ts` |
| `docs/backups/legal-rebuild-20260423T205834Z/*` (timestamped backups of the six in-scope files) |

## 2. Files modified

| Path | Notes |
|------|--------|
| `app/terms/page.tsx` | `LegalPageTemplate` + `LegalSection` + TOC; `LEGAL_CONFIG`; no cards |
| `app/privacy/page.tsx` | Same; one contact block (section 10); rights/bases as lists |
| `app/cookies/page.tsx` | Neutral intro; roadmap/future consent copy removed; factual consent |
| `app/disclaimer/page.tsx` | Document layout; forward-looking factors as list |
| `app/components/LegalEntityBlock.tsx` | Reads from `config/legal.ts`; no placeholders; compact border block |
| `app/components/SiteChrome.tsx` | Footer: `© 2026 Fairways.Tech. All rights reserved.` (brand only) |
| `app/globals.css` | `.legal-doc` base text color (minimal) |
| `tsconfig.json` | `exclude: ["docs"]` so backup `.tsx` under `docs/` do not break `next build` |

## 3. Entity references updated

- **Single source of truth:** `config/legal.ts` with Ghana name, Netherlands BV + KvK, trading name, emails.
- All four legal pages and `LegalEntityBlock` import `LEGAL_CONFIG` / mailto constants.
- **Removed from live app code (replaced in legal surface):** `Fairways.Tech Ltd` on policy pages, `Fairways.Tech B.V.` in footer.
- **Footer:** No entity names; only brand and year per approved line.

## 4. Styling patterns removed (legal routes)

- Rounded-3xl stacked cards, `bg-white/80`, `backdrop-blur`, gradient feature tiles, forest/leaf accent strips, 2-column “tile” layouts for legal content.

## 5. Build

- `npm run build`: **passed** (after excluding `docs` from TypeScript check).

## 6. Lint

- `npm run lint`: **passed** (existing warnings in `ContactCta.tsx` and `ContactModal.tsx` for `<img>`; unchanged, pre-existing).

## 7. Remaining entity inconsistencies (outside new legal pages / footer / config)

- **`app/about/page.tsx`** (unchanged by request): still references `Fairways.Tech B.V. (Netherlands) and Fairways.Tech Ltd (Ghana)`.
- **`docs/backups/...`**: older copies of pre-migration files; not served by the app.

## 8. PR

- **PR link:** _Created via `gh pr create` — see terminal output or repository PR list._  
- If the link was not available in the agent environment, open GitHub and select branch `feature/legal-pages-rebuild` to open or copy the PR URL.

## Search summary (instructed patterns in `*.{ts,tsx}`)

| Pattern | In-app source (excluding `docs/`) |
|---------|-----------------------------------|
| `Fairways.Tech Ltd` | `app/about/page.tsx` only (and config does not use this string) |
| `Fairways.Tech B.V.` | `app/about/page.tsx` only |
| `Fairways Tech Operations B.V.` | `config/legal.ts` |
| `Fairways.Tech Operations Ghana Ltd` | `config/legal.ts` |
