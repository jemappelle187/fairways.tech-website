# About page — entity alignment (execution report)

**Branch:** `feature/about-entity-alignment`  
**Commit:** `fix(about): align entity naming with legal pages`

## 1. File modified

- `app/about/page.tsx`

## 2. Sentence replaced

**Before (entity sentence only):**

`Fairways.Tech B.V. (Netherlands) and Fairways.Tech Ltd (Ghana) anchor our presence between Europe and West Africa.`

**After (required sentence, with following sentence kept for flow):**

`Fairways Tech Operations B.V. (Netherlands) and Fairways.Tech Operations Ghana Ltd (Ghana) together operate under the Fairways.Tech trading name. We build to supervisory and market standards, including alignment with expectations under AMLR, FATF, DORA, GDPR and regulatory oversight.`

The new entity wording is exactly as specified; the second sentence (AMLR, FATF, DORA, GDPR) was left unchanged from the previous paragraph to avoid a larger copy edit.

## 3. Old entity names on About page

- `Fairways.Tech B.V.` — **none** in `app/about/page.tsx` after the update  
- `Fairways.Tech Ltd` — **none** in `app/about/page.tsx` after the update  

**Approved names present:** `Fairways Tech Operations B.V.`, `Fairways.Tech Operations Ghana Ltd`, and the trading name reference `Fairways.Tech` in the same paragraph.

## 4. Build status

- `npm run build` — **passed**

## 5. Lint status

- `npm run lint` — **passed** (existing warnings: `@next/next/no-img-element` in `ContactCta.tsx`, `ContactModal.tsx`)

## 6. PR link

Set after `gh pr create` — see repository PRs for `feature/about-entity-alignment`, or the URL printed by the GitHub CLI.

## Backup

- `docs/backups/about-entity-alignment-20260423T214340Z/page.tsx` (pre-change copy of `app/about/page.tsx`)
