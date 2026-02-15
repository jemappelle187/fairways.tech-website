# SDG Migration Execution Log

**Started:** 15 February 2026

---

## Phase 0 — Precheck

**Date/Time:** 15 February 2026

**Build:** PASS

**Missing Files:** []

**Warnings:**
- ESLint: `@next/next/no-img-element` in ContactCta.tsx, ContactModal.tsx (pre-existing; not blocking)
- baseline-browser-mapping: module data over two months old (npm advisory)

**Ready For Changes:** YES

```json
{
  "phase": 0,
  "build": "PASS",
  "missing_files": [],
  "warnings": ["ESLint no-img-element in ContactCta.tsx, ContactModal.tsx"],
  "ready": true
}
```

---

## Phase 1 — Asset Copy & Component Creation

**Date/Time:** 15 February 2026

**Branch:** feature/sdg-impact-dev

**Files Created:**
- public/images/sdg/sdg-2-zero-hunger.svg
- public/images/sdg/sdg-8-decent-work.svg
- public/images/sdg/sdg-12-responsible-production.svg
- public/images/sdg/sdg-3-good-health.svg
- public/images/sdg/sdg-5-gender-equality.svg
- public/images/sdg/sdg-9-industry-infrastructure.svg
- app/components/SdgBadges.tsx
- app/components/PoultryCaseStudy.tsx

**Build:** PASS

**Lint:** PASS (warnings only)

**Build log:** docs/build_phase1.log

**Lint log:** docs/lint_phase1.log

```json
{
  "phase": 1,
  "branch": "feature/sdg-impact-dev",
  "files_created": [
    "public/images/sdg/sdg-2-zero-hunger.svg",
    "public/images/sdg/sdg-8-decent-work.svg",
    "public/images/sdg/sdg-12-responsible-production.svg",
    "public/images/sdg/sdg-3-good-health.svg",
    "public/images/sdg/sdg-5-gender-equality.svg",
    "public/images/sdg/sdg-9-industry-infrastructure.svg",
    "app/components/SdgBadges.tsx",
    "app/components/PoultryCaseStudy.tsx"
  ],
  "build_log": "docs/build_phase1.log",
  "lint_log": "docs/lint_phase1.log",
  "build_ok": true,
  "lint_ok": true,
  "errors": []
}
```

---

## Phase 2 — Integration

**Date/Time:** 15 February 2026

**Branch:** feature/sdg-integrate-dev

**PR:** https://github.com/jemappelle187/fairways.tech-website/pull/1

**Modified Files:**
- app/impact/page.tsx
- app/page.tsx
- app/components/SiteChrome.tsx
- public/downloads/fairways-tech-one-pager-placeholder.pdf (created)
- public/downloads/fairways-tech-investor-deck-placeholder.pdf (created)

**Build:** PASS

**Lint:** PASS (warnings only)

**Image fallback:** regulations_compliance.jpg replaced with /images/value_chain_qr2.jpg (compliance_first2.jpg not in repo)

**Build log:** docs/build_phase2.log

**Lint log:** docs/lint_phase2.log

```json
{
  "phase": 2,
  "branch": "feature/sdg-integrate-dev",
  "pr_url": "https://github.com/jemappelle187/fairways.tech-website/pull/1",
  "preview_url": "https://fairways-tech-website-git-feature-sdg-integrate-dev-jemappelle187s-projects.vercel.app (check Vercel PR comment when deploy completes)",
  "build_log": "docs/build_phase2.log",
  "lint_log": "docs/lint_phase2.log",
  "build_ok": true,
  "lint_ok": true,
  "notes": ["compliance_first2.jpg not in repo; used value_chain_qr2.jpg for Institutions card"]
}
```

---

## Phase: sdg-style — start 2026-02-15T17:00:00Z

**Branch:** feature/sdg-style-dev

**Changes:**
- Added glassmorphism CSS (.sdg-glass, .sdg-badge-img, .sdg-card-title, .sdg-card-desc) to app/globals.css
- Updated SdgBadges component to use sdg-glass class for premium hover effect
- Removed footer sentence "Attended Africa Tech Summit Nairobi 2026 — investor follow-ups ongoing." from SiteChrome

**Build:** PASS | **Lint:** PASS

```json
{
  "phase": "sdg-style",
  "timestamp": "2026-02-15T17:00:00Z",
  "branch": "feature/sdg-style-dev",
  "pr_url": "https://github.com/jemappelle187/fairways.tech-website/pull/4",
  "build_log": "docs/sdg_style_build.log",
  "lint_log": "docs/sdg_style_lint.log",
  "notes": ["glass styles added to app/globals.css", "SdgBadges updated", "footer sentence removed from SiteChrome"]
}
```

---

## Phase: sdg-refactor2 — start 2026-02-15T18:00:00Z

**Branch:** feature/sdg-refactor2-dev

**Changes:**
- Removed download CTAs; replaced with contact sentence
- Folded poultry support paragraph into For Farmers section
- Archived PoultryCaseStudy to app/components/_archive/ (fixed import path for build)
- Moved public/downloads placeholder PDFs to docs/backups/public_downloads/
- Primary SDG cards (prominent) + supporting SDG glass tiles (SdgBadges compact) layout

**Build:** PASS | **Lint:** PASS

```json
{
  "phase": "sdg-refactor2",
  "timestamp": "2026-02-15T18:00:00Z",
  "branch": "feature/sdg-refactor2-dev",
  "pr_url": "https://github.com/jemappelle187/fairways.tech-website/pull/5",
  "build_log": "docs/refactor2_build.log",
  "lint_log": "docs/refactor2_lint.log",
  "notes": ["download CTAs removed", "poultry paragraph folded into For Farmers", "PoultryCaseStudy archived under app/components/_archive", "SDG primary/supporting layout updated"]
}
```

---

## Phase: sdg-layout-refine — start 2026-02-15T19:00:00Z

**Branch:** feature/sdg-layout-refine-dev

**Changes:**
- Primary SDG cards use sdg-glass + sdg-primary-card (glassmorphism + hover)
- Expanded icon size: 72px primary, 56px supporting
- Supporting SDGs in horizontal grid with SDG-9 centered (order 3, 9, 5)
- SdgBadges updated with variant prop (primary/supporting)

**Build:** PASS | **Lint:** PASS

```json
{
  "phase": "sdg-layout-refine",
  "timestamp": "2026-02-15T19:00:00Z",
  "branch": "feature/sdg-layout-refine-dev",
  "pr_url": "https://github.com/jemappelle187/fairways.tech-website/pull/6",
  "build_log": "docs/sdg_layout_build.log",
  "lint_log": "docs/sdg_layout_lint.log",
  "notes": ["primary cards use sdg-glass + larger icons", "supporting row grid with sdg-9 centered", "SdgBadges updated with variant prop"]
}
```

---

## Phase: sdg-alt-view — start 2026-02-15T20:00:00Z

**Branch:** feature/sdg-alt-view-dev

**Changes:**
- Created SdgGridAlt component (icon above, caption below)
- Appended alternate SDG grid to Impact page for A/B comparison
- CSS tweaks for SdgGridAlt icons and responsive sizing

**Build:** PASS | **Lint:** PASS

```json
{
  "phase": "sdg-alt",
  "timestamp": "2026-02-15T20:00:00Z",
  "branch": "feature/sdg-alt-view-dev",
  "pr_url": "https://github.com/jemappelle187/fairways.tech-website/pull/7",
  "build_log": "docs/sdg_alt_build.log",
  "lint_log": "docs/sdg_alt_lint.log",
  "notes": ["SdgGridAlt created and appended to impact page", "icon-first grid for A/B comparison", "kept existing layout intact"]
}
```

---

## Phase: sdg-alt-tweak — start 2026-02-15T21:00:00Z

**Branch:** feature/sdg-alt-tweak-dev

**Changes:**
- SdgGridAlt logos enlarged (112px desktop, 96px tablet, 72px mobile)
- Hover effect on logo: translateY(-6px) scale(1.08) + drop-shadow
- Captions below logos; sdg-logo-wrap for hover target

**Build:** PASS | **Lint:** PASS

```json
{
  "phase": "sdg-alt-tweak",
  "timestamp": "2026-02-15T21:00:00Z",
  "branch": "feature/sdg-alt-tweak-dev",
  "pr_url": "https://github.com/jemappelle187/fairways.tech-website/pull/8",
  "build_log": "docs/sdg_alt_tweak_build.log",
  "lint_log": "docs/sdg_alt_tweak_lint.log",
  "notes": ["SdgGridAlt logos enlarged and hoverable", "captions placed below logos", "responsive size rules added"]
}
```

---

## Phase: sdg-grouped-view — start 2026-02-15T22:00:00Z

**Branch:** feature/sdg-grouped-view-dev

**Changes:**
- Created SdgGroupedAlt component (single glass container)
- Icons + captions arranged in grid inside one panel; left sidebar "Our SDG focus"
- Appended to Impact page after SdgGridAlt for A/B comparison
- Hover-on-logo enabled for grouped view

**Build:** PASS | **Lint:** PASS

```json
{
  "phase": "sdg-grouped",
  "timestamp": "2026-02-15T22:00:00Z",
  "branch": "feature/sdg-grouped-view-dev",
  "pr_url": "https://github.com/jemappelle187/fairways.tech-website/pull/9",
  "build_log": "docs/sdg_grouped_build.log",
  "lint_log": "docs/sdg_grouped_lint.log",
  "notes": ["SdgGroupedAlt created (single glass container)", "icons arranged in compact grid inside one panel", "hover-on-logo enabled"]
}
```

---

## Phase: sdg-logos-only — start 2026-02-15T23:00:00Z

**Branch:** feature/sdg-logos-only-dev

**Changes:**
- SdgGroupedAlt replaced with logos-only grid (no glass container)
- Plain grid; logos in button for hover/focus; captions below
- Responsive sizes: 112px → 96px → 72px

**Build:** PASS | **Lint:** PASS

```json
{
  "phase": "sdg-logos-only",
  "timestamp": "2026-02-15T23:00:00Z",
  "branch": "feature/sdg-logos-only-dev",
  "pr_url": "https://github.com/jemappelle187/fairways.tech-website/pull/10",
  "build_log": "docs/sdg_logos_build.log",
  "lint_log": "docs/sdg_logos_lint.log",
  "notes": ["SdgGroupedAlt converted to logos-only grid (no glass container)", "logos hover and responsive sizes added"]
}
```

---

## Phase: sdg-distinguish-groups — start 2026-02-16T00:00:00Z

**Branch:** feature/sdg-distinguish-groups-dev

**Changes:**
- Primary row (first 3): larger logos (128px), ring/gradient background, stronger hover
- Supporting row (last 3): smaller logos (88px), muted styling
- Responsive sizes for both groups

**Build:** PASS | **Lint:** PASS

```json
{
  "phase": "sdg-distinguish",
  "timestamp": "2026-02-16T00:00:00Z",
  "branch": "feature/sdg-distinguish-groups-dev",
  "pr_url": "https://github.com/jemappelle187/fairways.tech-website/pull/11",
  "build_log": "docs/sdg_distinguish_build.log",
  "lint_log": "docs/sdg_distinguish_lint.log",
  "notes": ["primary row emphasised (larger logos + ring + stronger hover)", "supporting row smaller & muted", "responsive sizes included"]
}
```
