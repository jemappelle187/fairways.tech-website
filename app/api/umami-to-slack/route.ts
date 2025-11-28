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

  // 4) If everything fails, return null
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

    if (!clientIp) {
      console.warn("[UMAMI_WEBHOOK] No client IP extracted from headers");
    } else {
      console.log(`[UMAMI_WEBHOOK] Extracted IP: ${clientIp}`);
    }

    // ---- Geo enrichment via ipapi.co ----
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
            "User-Agent": "Fairways.Tech-Webhook/1.0",
          },
        });

        if (geoRes.ok) {
          const geoData: any = await geoRes.json();

          if (geoData.error) {
            console.warn(
              `[UMAMI_WEBHOOK] ipapi.co API error for ${clientIp}:`,
              geoData.reason || geoData.error
            );
          } else {
            geoCity = geoData.city || "";
            geoRegion = geoData.region || "";
            geoCountry = geoData.country_name || geoData.country || "";
            geoOrg = geoData.org || "";
            if (geoData.latitude && geoData.longitude) {
              geoLat = String(geoData.latitude);
              geoLon = String(geoData.longitude);
            }

            console.log(
              `[UMAMI_WEBHOOK] Geo data from ipapi.co for ${clientIp}: ${geoCity}, ${geoCountry}`
            );
          }
        } else {
          const errorText = await geoRes.text();
          console.warn(
            `[UMAMI_WEBHOOK] ipapi.co lookup failed for ${clientIp}:`,
            geoRes.status,
            errorText.substring(0, 200)
          );
        }
      } catch (e) {
        console.error(`[UMAMI_WEBHOOK] Geo lookup error for ${clientIp}:`, e);
      }
    }

    const coordinatesText =
      geoLat && geoLon
        ? `<https://www.google.com/maps?q=${geoLat},${geoLon}|${geoLat}, ${geoLon}>`
        : "-";

    const visitorTypeEmoji = body.visitorType === "returning" ? "🔄" : "🆕";
    const visitorTypeText =
      body.visitorType === "returning" ? "Returning visitor" : "First-time visitor";

    const timestamp = new Date().toLocaleString("en-US", {
      timeZone: "Europe/Amsterdam",
      dateStyle: "short",
      timeStyle: "short",
    });

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
          text:
            `*🌍 Location & Network*` +
            `\n• Country: ${geoCountry || body.country || "-"}` +
            `\n• Region: ${geoRegion || "-"}` +
            `\n• City: ${geoCity || "-"}` +
            `\n• Coordinates: ${coordinatesText}` +
            `\n• Network: ${geoOrg || "-"}`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            `*💻 Device & Browser*` +
            `\n• Browser: ${browser || "-"}` +
            `\n• OS: ${os || "-"}` +
            `\n• Device: ${device || "-"}` +
            `\n• Screen: ${body.screen || "-"}` +
            `\n• Language: ${body.language || "-"}`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            `*🔍 Technical*` +
            `\n• IP: ${clientIp || "-"}` +
            `\n• Hostname: ${body.hostname || "-"}`,
        },
      },
    ];

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