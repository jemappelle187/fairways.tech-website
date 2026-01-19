# Fairways.Tech Brand Assets

This directory contains organized brand assets for Fairways.Tech.

## Directory Structure

### Master Logo
**Location:** `master/`

Contains the full Fairways.Tech master logo with text in various styles:
- `fairways-master-logo.png` - Standard master logo
- `fairways-master-logo-glow-bg-black.png` - Glow effect for black backgrounds
- `fairways-master-logo-glow-bg-white.png` - Glow effect for white backgrounds
- `fairways-master-logo-glow-outline-bg-black.png` - Glow with outline for black backgrounds
- `fairways-master-logo-glow-outline-bg-white.png` - Glow with outline for white backgrounds
- `fairways-master-logo-drop-bg-black.png` - Drop shadow effect for black backgrounds

### System Icon
**Location:** `system/`

Contains the Fairways.Tech system icon (leaf symbol) in both SVG and PNG formats:

**SVG (vector, recommended for web):**
- `fairways-system-icon.svg` - Canonical system icon
- `fairways-system-icon-glow-bg-black.svg`
- `fairways-system-icon-glow-bg-white.svg`
- `fairways-system-icon-outline-bg-black.svg`
- `fairways-system-icon-outline-bg-white.svg`
- `fairways-system-icon-drop-bg-black.svg`

**PNG (raster, for specific sizes):**
- `fairways-system-icon.png` - Standard PNG export
- `fairways-system-icon-glow-bg-black.png`
- `fairways-system-icon-glow-bg-white.png`
- `fairways-system-icon-outline-bg-black.png`
- `fairways-system-icon-outline-bg-white.png`
- `fairways-system-icon-drop-bg-black.png`

### Legacy Logo Files
**Location:** `./` (root of logo directory)

These are the original logo variants, maintained for backward compatibility:
- `logo-fairways-black.svg`
- `logo-fairways-forest.svg`
- `logo-fairways-grey.svg`
- `logo-fairways-leaf.svg`
- `logo-fairways-white.svg`

**Note:** Current site components reference these legacy files. When migrating, update references to use the new organized assets.

## Usage Guidelines

### When to Use Master Logo vs System Icon

**Master Logo** (`master/`):
- Marketing materials
- Presentations
- Large-format displays
- When brand name visibility is important

**System Icon** (`system/`):
- Favicons and app icons
- Small UI elements
- Social media profile images
- When space is limited

### Background Variants

- **`-bg-black`**: Use on dark/black backgrounds
- **`-bg-white`**: Use on light/white backgrounds
- **`-glow-*`**: Adds glow effect for emphasis
- **`-outline-*`**: Adds outline for better contrast
- **`-drop-*`**: Adds drop shadow effect

## Favicons

Favicon assets are located in `/public/images/favicons/` and include:
- Standard favicon sizes (16x16, 32x32, 192x192, 512x512)
- Apple touch icon (180x180)
- Multiple color variants (standard, forest-green, white)

## Open Graph Images

Open Graph images for social sharing are located in:
- `/public/og/og-fairways-tech.png` - New canonical OG image (1200x630)
- `/public/og-fairways-tech.webp` - Legacy OG image (kept for SEO stability)

**Note:** Legacy OG images at `/public/og-fairways-tech.*` are maintained at their original paths to preserve SEO and social media card functionality.

## File Naming Convention

- Prefix: `fairways-` for brand consistency
- Type: `master-logo` or `system-icon`
- Variant: descriptive suffix (e.g., `-glow-bg-black`)
- Extension: `.svg` for vector, `.png` for raster

## Integration Notes

Current site references (as of reorganization):
- Header/Footer logo: `/images/logo/logo-fairways-forest.svg`
- Email templates: `/images/logo/logo-fairways-white.svg`
- Favicons: `/images/favicons/*`
- OG Image: `/og-fairways-tech.webp`

When updating components, migrate to the new organized asset paths for better maintainability.
