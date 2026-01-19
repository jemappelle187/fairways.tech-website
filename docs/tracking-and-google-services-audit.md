# Tracking & Google Services Audit

## 📊 What VisitTracker Sends to Slack

**VisitTracker** runs on every page load (regardless of cookie consent) and sends the following data to Slack via `/api/umami-to-slack`:

### Data Collected from Browser:
- **Page Title** (`document.title`)
- **Full URL** (`window.location.href`)
- **Hostname** (`window.location.hostname`)
- **Language** (`navigator.language`)
- **Referrer** (`document.referrer` - where they came from)
- **Screen Size** (`window.innerWidth x window.innerHeight`)
- **Visitor Type** (`first-time` or `returning` - based on localStorage `fw_visit_seen`)

### Data Enriched Server-Side:
- **IP Address** (extracted from `x-forwarded-for`, `x-real-ip`, or `cf-connecting-ip` headers)
- **Geolocation** (via ipapi.co):
  - Country
  - Region/State
  - City
  - Coordinates (latitude, longitude) - clickable Google Maps link
  - Network/ISP (org)
- **Browser Info** (parsed from User-Agent):
  - Browser (Chrome, Safari, Firefox, Edge, Other)
  - OS (iOS, Android, macOS, Windows, Linux)
  - Device (iPhone, iPad, Android device, Desktop/Laptop)

### Slack Message Format:
```
🆕 New visitor on fairways.tech
_First-time visitor • 12/30/2025, 10:47 AM_

─────────────────────────────

📄 Page Information
• Title: Fairways.Tech — Turning farm activity into trusted, finance-ready data
• URL: https://fairways.tech/
• Referrer: Direct visit

🌍 Location & Network
• Country: United States
• Region: California
• City: San Francisco
• Coordinates: 37.7749, -122.4194 (clickable Google Maps link)
• Network: AS15169 Google LLC

💻 Device & Browser
• Browser: Chrome
• OS: macOS
• Device: Desktop/Laptop
• Screen: 1920x1080
• Language: en-US

🔍 Technical
• IP: 8.8.8.8
• Hostname: fairways.tech
```

### ⚠️ Important Notes:
- **No cookie data** is sent to Slack - only localStorage (`fw_visit_seen`)
- **Runs regardless of cookie consent** - this is intentional for security/monitoring
- **No personal identification** - just IP, location, and device info
- **Privacy-friendly** - no cross-site tracking, no advertising IDs

---

## 🔍 Google Services Currently Configured

### ✅ Google Search Console (GSC)
- **Status**: ✅ Configured
- **Domain**: `fairways.tech` verified via DNS (GoDaddy)
- **Sitemap**: `https://fairways.tech/sitemap.xml` submitted and accepted
- **URLs Indexed**: All core pages indexed:
  - `/`, `/about`, `/impact`, `/team`, `/terms`, `/privacy`, `/cookies`, `/disclaimer`
- **Purpose**: SEO monitoring, indexing status, search performance

### ✅ Google Maps Links
- **Usage**: Clickable coordinates in Slack messages
- **Format**: `https://www.google.com/maps?q=lat,lon`
- **Purpose**: Visual location reference in Slack notifications
- **No tracking**: Just a link, no Google Analytics or tracking

### ❌ Google Analytics
- **Status**: ❌ **NOT configured**
- **Current Analytics**: Using Umami Analytics instead
- **Umami**: Privacy-focused, self-hosted analytics (only loads if user accepts cookies)

### ❌ Google Tag Manager (GTM)
- **Status**: ❌ **NOT configured**

### ❌ Google Ads / Marketing
- **Status**: ❌ **NOT configured**

### ✅ Structured Data (Schema.org)
- **Status**: ✅ Configured
- **Schemas**: Organization, WebSite, Person (for team members)
- **Purpose**: Helps Google understand your site structure
- **Validation**: Validated on `validator.schema.org` - 0 issues

### ✅ Google Rich Results Test
- **Status**: ✅ Can be tested
- **URL**: https://search.google.com/test/rich-results
- **Purpose**: Validate structured data for rich snippets

---

## 📋 Summary

### What's Tracked:
- ✅ **VisitTracker** → Slack (runs always, no cookies)
- ✅ **Umami Analytics** → Umami dashboard (only if user accepts cookies)
- ✅ **Google Search Console** → SEO monitoring (server-side, no cookies)

### What's NOT Tracked:
- ❌ Google Analytics (not configured)
- ❌ Google Tag Manager (not configured)
- ❌ Google Ads (not configured)
- ❌ Cookie data in Slack (only localStorage)

### Google Services Used:
1. **Google Search Console** - SEO/Indexing (no cookies, server-side)
2. **Google Maps** - Links only (no tracking)
3. **Google Rich Results Test** - Validation tool (no tracking)

### Google Services NOT Used:
- Google Analytics
- Google Tag Manager
- Google Ads
- Google Marketing Platform

---

## 🎯 Recommendation

**Current Setup is Privacy-Focused:**
- No Google Analytics = No Google tracking cookies
- Umami Analytics = Privacy-friendly alternative
- VisitTracker = Server-side tracking (no cookies)

**If you want Google Analytics:**
- You'll need to add it (not currently configured)
- It will require cookie consent (GDPR compliance)
- It will set cookies: `_ga`, `_gid`, `_ga_<container-id>`
- You'll need to update cookie banner to mention Google Analytics

**Current cookie banner is accurate** - it controls Umami Analytics, which does use cookies when loaded.



