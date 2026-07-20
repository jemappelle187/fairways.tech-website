# Site dates (sitemap + legal pages)

## Single source of truth

All public “last updated” / sitemap `lastmod` values come from **`config/site-dates.ts`**.

| Constant | Used for |
|----------|----------|
| `LEGAL_PAGES_LAST_MODIFIED` | `/terms`, `/privacy`, `/cookies`, `/disclaimer` — sitemap + on-page “Last updated” |
| `MARKETING_PAGES_LAST_MODIFIED` | `/`, `/about`, `/impact`, `/team` — sitemap only |

Do **not** set dates in `app/sitemap.ts` or legal page copy directly.

## When to update

Update `config/site-dates.ts` when **content** materially changes — not for styling, analytics, or bugfix-only deploys.

| Change type | Update |
|-------------|--------|
| Legal copy / structure | `LEGAL_PAGES_LAST_MODIFIED` |
| Marketing copy / new sections | `MARKETING_PAGES_LAST_MODIFIED` |
| CSS, Clarity, contact button polish | Nothing |

## Release checklist

Before merging a content PR:

- [ ] Changed legal pages? → bump `LEGAL_PAGES_LAST_MODIFIED`
- [ ] Changed marketing pages? → bump `MARKETING_PAGES_LAST_MODIFIED`
- [ ] Verify `/terms` (or other legal) still shows the expected “Last updated” label
- [ ] After deploy, spot-check `https://fairways.tech/sitemap.xml`
- [ ] Optional: resubmit sitemap in Google Search Console

## Files involved

- `config/site-dates.ts` — edit dates here
- `config/legal.ts` — re-exports `LEGAL_PAGES_LAST_UPDATED` (formatted label)
- `app/sitemap.ts` — reads both `lastModified` constants
