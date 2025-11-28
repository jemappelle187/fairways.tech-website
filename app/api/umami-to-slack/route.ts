import { NextRequest, NextResponse } from "next/server";

type UmamiEventPayload = {
  title?: string;
  url?: string;
  hostname?: string;
  language?: string;
  referrer?: string | null;
  screen?: string;
  visitorType?: "first-time" | "returning" | string;
  country?: string;
};

function getClientIp(req: NextRequest): string | null {
  // Vercel sets x-forwarded-for with the client IP
  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    // x-forwarded-for can contain multiple IPs, the first one is the original client
    const ips = xff.split(",").map((ip) => ip.trim());
    // Filter out Vercel internal IPs and localhost
    const clientIp = ips.find(
      (ip) => !ip.startsWith("10.") && !ip.startsWith("172.16.") && ip !== "127.0.0.1"
    ) || ips[0];
    if (clientIp) return clientIp;
  }
  
  // Fallback headers
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  
  const cfConnectingIp = req.headers.get("cf-connecting-ip"); // Cloudflare
  if (cfConnectingIp) return cfConnectingIp.trim();
  
  return null;
}

function parseUserAgent(ua: string | null): {
  browser?: string;
  os?: string;
  device?: string;
} {
  if (!ua) return {};

  const lower = ua.toLowerCase();
  let browser: string | undefined;
  let os: string | undefined;
  let device: string | undefined;

  // Very small, privacy-friendly parser – just enough for Slack context
  if (lower.includes("edg/")) browser = "Edge";
  else if (lower.includes("chrome/")) browser = "Chrome";
  else if (lower.includes("safari/") && !lower.includes("chrome/"))
    browser = "Safari";
  else if (lower.includes("firefox/")) browser = "Firefox";
  else browser = "Other";

  if (lower.includes("iphone") || lower.includes("ipad")) {
    os = "iOS";
    device = lower.includes("ipad") ? "iPad" : "iPhone";
  } else if (lower.includes("android")) {
    os = "Android";
    device = "Android device";
  } else if (lower.includes("mac os x") || lower.includes("macintosh")) {
    os = "macOS";
    device = "Desktop/Laptop";
  } else if (lower.includes("windows nt")) {
    os = "Windows";
    device = "Desktop/Laptop";
  } else if (lower.includes("linux")) {
    os = "Linux";
    device = "Desktop/Laptop";
  } else {
    os = "Other";
    device = "Unknown";
  }

  return { browser, os, device };
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as UmamiEventPayload;

    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;

    if (!slackWebhookUrl) {
      console.warn(
        "[UMAMI_WEBHOOK] SLACK_WEBHOOK_URL not set, skipping Slack push."
      );
      return NextResponse.json({ ok: true, skipped: true });
    }

    const uaRaw = req.headers.get("user-agent") || null;
    const { browser, os, device } = parseUserAgent(uaRaw);

    const clientIp = getClientIp(req);

    // Debug: log IP extraction
    if (!clientIp) {
      console.warn("[UMAMI_WEBHOOK] No client IP extracted from headers");
    } else {
      console.log(`[UMAMI_WEBHOOK] Extracted IP: ${clientIp}`);
    }

    // --- 3. Optional IP enrichment via ipapi.co (matches contact form) ---
    // Fallback to ipinfo.io if ipapi.co fails (rate limits, etc.)
    let geoCity = "";
    let geoRegion = "";
    let geoCountry = "";
    let geoOrg = "";
    let geoLat = "";
    let geoLon = "";

    try {
      if (clientIp && clientIp !== "127.0.0.1") {
        // Try ipapi.co first (matches contact form)
        let geoData: any = null;
        try {
          const geoRes = await fetch(`https://ipapi.co/${clientIp}/json/`, {
            cache: "no-store",
          });
          if (geoRes.ok) {
            geoData = await geoRes.json();
            // Check if API returned an error (ipapi.co returns error field on rate limit)
            if (geoData.error) {
              console.warn(
                `[UMAMI_WEBHOOK] ipapi.co error for ${clientIp}:`,
                geoData.reason || geoData.error
              );
              geoData = null; // Will trigger fallback
            }
          } else {
            const errorText = await geoRes.text();
            console.warn(
              `[UMAMI_WEBHOOK] ipapi.co lookup failed for ${clientIp}:`,
              geoRes.status,
              errorText
            );
          }
        } catch (e) {
          console.warn("[UMAMI_WEBHOOK] ipapi.co fetch error:", e);
        }

        // Extract data from ipapi.co if successful
        if (geoData && !geoData.error) {
          geoCity = geoData.city || "";
          geoRegion = geoData.region || "";
          geoCountry = geoData.country_name || "";
          geoOrg = geoData.org || "";
          if (geoData.latitude && geoData.longitude) {
            geoLat = String(geoData.latitude);
            geoLon = String(geoData.longitude);
          }
        } else {
          // Fallback to ipinfo.io if available
          const ipinfoToken = process.env.IPINFO_TOKEN;
          if (ipinfoToken) {
            try {
              const ipinfoRes = await fetch(
                `https://ipinfo.io/${clientIp}?token=${ipinfoToken}`,
                { cache: "no-store" }
              );
              if (ipinfoRes.ok) {
                const ipinfoData: any = await ipinfoRes.json();
                geoCity = ipinfoData.city || geoCity;
                geoRegion = ipinfoData.region || geoRegion;
                geoCountry = ipinfoData.country || geoCountry;
                geoOrg = ipinfoData.org || geoOrg;
                if (typeof ipinfoData.loc === "string") {
                  const [lat, lon] = ipinfoData.loc.split(",");
                  geoLat = lat || geoLat;
                  geoLon = lon || geoLon;
                }
              }
            } catch (e) {
              console.warn("[UMAMI_WEBHOOK] ipinfo.io fallback error:", e);
            }
          }
        }
      } else {
        console.warn("[UMAMI_WEBHOOK] No valid client IP for geo lookup");
      }
    } catch (e) {
      console.error("[UMAMI_WEBHOOK] Geo lookup error:", e);
    }

    // Build coordinates link if available
    const coordinatesText =
      geoLat && geoLon
        ? `<https://www.google.com/maps?q=${geoLat},${geoLon}|${geoLat}, ${geoLon}>`
        : "-";

    // Visitor type emoji and text
    const visitorTypeEmoji = body.visitorType === "returning" ? "🔄" : "🆕";
    const visitorTypeText =
      body.visitorType === "returning" ? "Returning visitor" : "First-time visitor";

    // Format timestamp
    const timestamp = new Date().toLocaleString("en-US", {
      timeZone: "Europe/Amsterdam",
      dateStyle: "short",
      timeStyle: "short",
    });

    // Build message using Slack's Block Kit format for proper emoji rendering
    const blocks = [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: `${visitorTypeEmoji} New visitor on fairways.tech`,
          emoji: true,
        },
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: `_${visitorTypeText} • ${timestamp}_`,
          },
        ],
      },
      {
        type: "divider",
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*📄 Page Information*\n• Title: ${body.title || "-"}\n• URL: ${body.url || "-"}\n• Referrer: ${body.referrer || "Direct visit"}`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*🌍 Location & Network*\n• Country: ${geoCountry || body.country || "-"}\n• Region: ${geoRegion || "-"}\n• City: ${geoCity || "-"}\n• Coordinates: ${coordinatesText}\n• Network: ${geoOrg || "-"}`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*💻 Device & Browser*\n• Browser: ${browser || "-"}\n• OS: ${os || "-"}\n• Device: ${device || "-"}\n• Screen: ${body.screen || "-"}\n• Language: ${body.language || "-"}`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*🔍 Technical*\n• IP: ${clientIp || "-"}\n• Hostname: ${body.hostname || "-"}`,
        },
      },
    ];

    // Include both text (fallback) and blocks (rich format with emojis)
    const payload = {
      text: `${visitorTypeEmoji} New visitor on fairways.tech`,
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
    console.error("[UMAMI_WEBHOOK] Error:", err);
    return NextResponse.json(
      { error: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "Umami webhook is live",
  });
}