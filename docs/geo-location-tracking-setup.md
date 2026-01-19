# Geo-Location & IP Tracking Setup Guide

This guide explains how to implement geo-location and IP tracking for Slack notifications in a Next.js application. The implementation uses `ipapi.co` for geolocation lookups and integrates with Slack webhooks.

## Overview

The system tracks visitor IP addresses, enriches them with geolocation data (country, city, region, coordinates), and sends formatted notifications to Slack. This is implemented in two places:

1. **Visit Tracking** (`/api/umami-to-slack`) - Tracks page visits automatically
2. **Form Submissions** (`/api/tally-webhook`) - Tracks form submissions with geo data

## Architecture

```
Client (Browser)
  ↓
VisitTracker Component (client-side)
  ↓ POST /api/umami-to-slack
Server API Route
  ↓ Extract IP from headers
  ↓ Fetch geo data from ipapi.co
  ↓ Format Slack message with coordinates
  ↓
Slack Webhook
```

## Prerequisites

1. **Next.js** application (App Router)
2. **Slack Webhook URL** - Create an incoming webhook in your Slack workspace
3. **Environment Variables** - Set up `.env.local` with required keys

## Environment Variables

Add these to your `.env.local` file:

```bash
# Slack webhook URL (required)
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL

# Optional: If using Airtable for form submissions
AIRTABLE_BASE_ID=your_base_id
AIRTABLE_TOKEN=your_token
AIRTABLE_TABLE_NAME=Submissions
```

## Implementation Steps

### 1. IP Extraction Function

Create a utility function to extract the client IP from request headers. This handles various proxy/CDN scenarios:

```typescript
// app/api/umami-to-slack/route.ts (or similar)

function getClientIp(req: NextRequest): string | null {
  const localhostCandidates = new Set(["127.0.0.1", "::1"]);

  // 1) Try X-Forwarded-For (may contain multiple IPs)
  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    const ips = xff
      .split(",")
      .map((ip) => ip.trim())
      .filter(Boolean);

    // Prefer the first non-localhost IP
    const realIp =
      ips.find((ip) => !localhostCandidates.has(ip)) || ips[0];

    if (realIp && !localhostCandidates.has(realIp)) {
      return realIp;
    }
  }

  // 2) Try X-Real-IP
  const xRealIp = req.headers.get("x-real-ip");
  if (xRealIp && !localhostCandidates.has(xRealIp.trim())) {
    return xRealIp.trim();
  }

  // 3) Try CF-Connecting-IP (Cloudflare / some CDNs)
  const cfIp = req.headers.get("cf-connecting-ip");
  if (cfIp && !localhostCandidates.has(cfIp.trim())) {
    return cfIp.trim();
  }

  return null;
}
```

### 2. Geo-Location Lookup

Use `ipapi.co` (free tier, no API key required) to fetch geolocation data:

```typescript
// In your API route handler

const clientIp = getClientIp(req);

let geoCity = "";
let geoRegion = "";
let geoCountry = "";
let geoOrg = "";
let geoLat = "";
let geoLon = "";

if (clientIp) {
  try {
    const geoRes = await fetch(`https://ipapi.co/${clientIp}/json/`, {
      cache: "no-store",
      headers: {
        "User-Agent": "YourApp-Webhook/1.0",
      },
    });

    if (geoRes.ok) {
      const geoData: any = await geoRes.json();

      if (!geoData.error) {
        geoCity = geoData.city || "";
        geoRegion = geoData.region || "";
        geoCountry = geoData.country_name || geoData.country || "";
        geoOrg = geoData.org || "";
        
        if (geoData.latitude && geoData.longitude) {
          geoLat = String(geoData.latitude);
          geoLon = String(geoData.longitude);
        }
      }
    }
  } catch (e) {
    console.error("Geo lookup error:", e);
  }
}
```

### 3. Format Slack Message with Coordinates

Create a clickable Google Maps link from coordinates:

```typescript
const coordinatesText =
  geoLat && geoLon
    ? `<https://www.google.com/maps?q=${geoLat},${geoLon}|${geoLat}, ${geoLon}>`
    : "-";

// In your Slack message blocks or text:
`*🌍 Location & Network*` +
`\n• Country: ${geoCountry || "-"}` +
`\n• Region: ${geoRegion || "-"}` +
`\n• City: ${geoCity || "-"}` +
`\n• Coordinates: ${coordinatesText}` +
`\n• Network: ${geoOrg || "-"}`
```

### 4. Complete API Route Example

Here's a complete example for a visit tracking endpoint:

```typescript
// app/api/umami-to-slack/route.ts

import { NextRequest, NextResponse } from "next/server";

type UmamiEventPayload = {
  title?: string;
  url?: string;
  hostname?: string;
  language?: string;
  referrer?: string | null;
  screen?: string;
  visitorType?: "first-time" | "returning" | string;
};

function getClientIp(req: NextRequest): string | null {
  // ... (implementation from step 1)
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as UmamiEventPayload;
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;

    if (!slackWebhookUrl) {
      console.warn("SLACK_WEBHOOK_URL not set, skipping Slack push.");
      return NextResponse.json({ ok: true, skipped: true });
    }

    const clientIp = getClientIp(req);

    // Geo enrichment via ipapi.co
    let geoCity = "";
    let geoRegion = "";
    let geoCountry = "";
    let geoOrg = "";
    let geoLat = "";
    let geoLon = "";

    if (clientIp) {
      try {
        const geoRes = await fetch(`https://ipapi.co/${clientIp}/json/`, {
          cache: "no-store",
          headers: {
            "User-Agent": "YourApp-Webhook/1.0",
          },
        });

        if (geoRes.ok) {
          const geoData: any = await geoRes.json();
          if (!geoData.error) {
            geoCity = geoData.city || "";
            geoRegion = geoData.region || "";
            geoCountry = geoData.country_name || geoData.country || "";
            geoOrg = geoData.org || "";
            if (geoData.latitude && geoData.longitude) {
              geoLat = String(geoData.latitude);
              geoLon = String(geoData.longitude);
            }
          }
        }
      } catch (e) {
        console.error("Geo lookup error:", e);
      }
    }

    const coordinatesText =
      geoLat && geoLon
        ? `<https://www.google.com/maps?q=${geoLat},${geoLon}|${geoLat}, ${geoLon}>`
        : "-";

    // Format Slack message (using Slack Block Kit for rich formatting)
    const blocks = [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            `*🌍 Location & Network*` +
            `\n• Country: ${geoCountry || "-"}` +
            `\n• Region: ${geoRegion || "-"}` +
            `\n• City: ${geoCity || "-"}` +
            `\n• Coordinates: ${coordinatesText}` +
            `\n• Network: ${geoOrg || "-"}` +
            `\n• IP: ${clientIp || "-"}`,
        },
      },
    ];

    const payload = {
      text: "New visitor on your site",
      blocks,
    };

    await fetch(slackWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("Error:", err);
    return NextResponse.json(
      { error: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
```

### 5. Client-Side Tracking Component

Create a component that automatically tracks page visits:

```typescript
// app/components/VisitTracker.tsx

"use client";

import Script from "next/script";

export function VisitTracker() {
  return (
    <Script
      id="visit-tracker-slack"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
(function () {
  if (typeof window === "undefined" || !window.fetch) return;

  try {
    var visitorType = "first-time";
    try {
      var key = "fw_visit_seen";
      var stored = window.localStorage.getItem(key);
      if (stored === "1") {
        visitorType = "returning";
      } else {
        window.localStorage.setItem(key, "1");
      }
    } catch (e) {
      // localStorage may be disabled; ignore
    }

    var payload = {
      title: document.title || null,
      url: window.location.href,
      hostname: window.location.hostname,
      language: navigator.language || null,
      referrer: document.referrer || null,
      screen: window.innerWidth + "x" + window.innerHeight,
      visitorType: visitorType
    };

    fetch("/api/umami-to-slack", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true
    }).catch(function () {
      // swallow client-side errors
    });

  } catch (e) {
    console.error("[VISIT_TRACKER] client error", e);
  }
})();
        `,
      }}
    />
  );
}
```

Add it to your root layout:

```typescript
// app/layout.tsx

import { VisitTracker } from "./components/VisitTracker";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <VisitTracker />
      </body>
    </html>
  );
}
```

## Alternative Services

### Option 1: Using ipinfo.io (Paid)

If you prefer `ipinfo.io` (requires API token, more accurate):

1. Get an API token from [ipinfo.io](https://ipinfo.io/)
2. Add to `.env.local`:
   ```bash
   IPINFO_TOKEN=your_token_here
   ```
3. Update the geo lookup:
   ```typescript
   const ipinfoToken = process.env.IPINFO_TOKEN;
   
   if (clientIp && ipinfoToken) {
     const res = await fetch(
       `https://ipinfo.io/${clientIp}?token=${ipinfoToken}`
     );
     if (res.ok) {
       const data = await res.json();
       // ipinfo returns "loc" as "lat,lon" string
       const [lat, lon] = (data.loc || "").split(",");
       geoLat = lat?.trim();
       geoLon = lon?.trim();
       geoCity = data.city || "";
       geoCountry = data.country || "";
       geoOrg = data.org || "";
     }
   }
   ```

### Option 2: Using ipgeolocation.io (More Data Fields)

[ipgeolocation.io](https://ipgeolocation.io/) offers more comprehensive data including currency, timezone, astronomy data, and user-agent parsing.

**Free Tier Features:**
- 1,000 requests/day (~30,000/month)
- Geolocation (city, country, coordinates)
- Currency information
- Timezone details
- Astronomy data
- User-agent parsing
- District/county, state/province, zipcode
- Country flags and metadata

**⚠️ Commercial Use Restriction:** According to [ipgeolocation.io's FAQ](https://ipgeolocation.io/faq.html), the free plan is intended for development and evaluation purposes. **Please verify their current Terms of Service** to confirm if commercial/production use is permitted on the free tier. For guaranteed production use, upgrading to a paid plan ($9+/month for 50,000 requests) is recommended.

**Source:** [ipgeolocation.io FAQ](https://ipgeolocation.io/faq.html) - Always check their current terms before using in production.

**Implementation:**

1. Sign up at [ipgeolocation.io](https://ipgeolocation.io/) and get your API key
2. Add to `.env.local`:
   ```bash
   IPGEOLOCATION_API_KEY=your_api_key_here
   ```
3. Update the geo lookup:
   ```typescript
   const ipgeoApiKey = process.env.IPGEOLOCATION_API_KEY;
   
   if (clientIp && ipgeoApiKey) {
     const res = await fetch(
       `https://api.ipgeolocation.io/ipgeo?apiKey=${ipgeoApiKey}&ip=${clientIp}`
     );
     if (res.ok) {
       const data = await res.json();
       geoCity = data.city || "";
       geoRegion = data.state_prov || "";
       geoCountry = data.country_name || "";
       geoOrg = data.isp || "";
       geoLat = data.latitude || "";
       geoLon = data.longitude || "";
       
       // Additional fields available:
       // data.time_zone.name, data.time_zone.current_time
       // data.currency.code, data.currency.name
       // data.district, data.zipcode
       // data.country_flag, data.country_capital
     }
   }
   ```

**Comparison Summary:**

| Feature | ipapi.co (Current) | ipgeolocation.io Free | ipgeolocation.io Paid |
|---------|-------------------|---------------------|----------------------|
| Commercial Use | ✅ Yes | ❌ No | ✅ Yes |
| Rate Limit | 1K/day | 1K/day | Higher limits |
| Basic Geo | ✅ | ✅ | ✅ |
| Currency | ❌ | ✅ | ✅ |
| Timezone | ❌ | ✅ | ✅ |
| Security Data | ❌ | ❌ | ✅ (Security plan) |
| Cost | Free | Free (dev only) | $9+/month |

**Recommendation:** For production use, stick with `ipapi.co` (current setup) unless you need the additional fields and can justify the paid plan cost.

## Testing

### Local Testing

1. Start your dev server:
   ```bash
   npm run dev
   ```

2. Visit `http://localhost:3000` - the VisitTracker will automatically send a request

3. Check your Slack channel for the notification

### Manual Testing with curl

```bash
curl -X POST http://localhost:3000/api/umami-to-slack \
  -H "Content-Type: application/json" \
  -H "x-forwarded-for: 8.8.8.8" \
  -d '{
    "title": "Test Page",
    "url": "http://localhost:3000/test",
    "hostname": "localhost",
    "language": "en-US",
    "visitorType": "first-time"
  }'
```

## Rate Limits & Considerations

### ipapi.co
- **Free tier**: 1,000 requests/day
- **No API key required**
- Good for development and small projects

### ipinfo.io
- **Free tier**: 50,000 requests/month
- **Requires API token**
- More accurate, better for production

## Privacy & Compliance

⚠️ **Important**: 
- Always inform users about IP tracking in your privacy policy
- Consider GDPR/privacy regulations in your jurisdiction
- Store IP addresses securely and with appropriate retention policies
- The coordinates are approximate (city-level, not exact address)

## Troubleshooting

### No IP extracted
- Check if you're behind a proxy/CDN that sets `x-forwarded-for`
- Verify headers in your deployment environment
- Test with `curl` using `-H "x-forwarded-for: 8.8.8.8"`

### Geo lookup fails
- Check `ipapi.co` status if using free tier
- Verify network connectivity from your server
- Check rate limits if you've exceeded daily quota

### Slack message not received
- Verify `SLACK_WEBHOOK_URL` is set correctly
- Check Slack webhook is still active
- Review server logs for errors

## Example Slack Message Format

The formatted Slack message will look like:

```
🌍 Location & Network
• Country: United States
• Region: California
• City: San Francisco
• Coordinates: 37.7749, -122.4194 (clickable link to Google Maps)
• Network: AS15169 Google LLC
• IP: 8.8.8.8
```

## Next Steps

1. Set up environment variables
2. Implement the IP extraction function
3. Add geo-location lookup
4. Format and send Slack messages
5. Add VisitTracker component to your layout
6. Test and verify notifications

For questions or issues, refer to:
- [ipapi.co Documentation](https://ipapi.co/api/)
- [Slack Incoming Webhooks](https://api.slack.com/messaging/webhooks)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)


