import { NextRequest, NextResponse } from "next/server";
import { reverseGeocodeGoogleFormattedAddress } from "@/lib/reverseGeocodeGoogleFormattedAddress";

type BasePayload = {
  title?: string | null;
  url?: string;
  hostname?: string;
  language?: string;
  referrer?: string | null;
  screen?: string;
  visitorType?: "first-time" | "returning" | string;
  country?: string;
  visitCorrelationId?: string;
};

type VisitPayload = BasePayload & {
  kind?: "visit";
};

type BrowserGpsPayload = BasePayload & {
  kind: "browser_gps_followup";
  latitude: number;
  longitude: number;
  accuracyMeters?: number;
  capturedAtIso?: string;
};

type UmamiEventPayload = VisitPayload | BrowserGpsPayload;

function slackEscape(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function getClientIp(req: NextRequest): string | null {
  const localhostCandidates = new Set(["127.0.0.1", "::1"]);

  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    const ips = xff
      .split(",")
      .map((ip) => ip.trim())
      .filter(Boolean);

    const realIp =
      ips.find((ip) => !localhostCandidates.has(ip)) || ips[0];

    if (realIp && !localhostCandidates.has(realIp)) {
      return realIp;
    }
  }

  const xRealIp = req.headers.get("x-real-ip");
  if (xRealIp && !localhostCandidates.has(xRealIp.trim())) {
    return xRealIp.trim();
  }

  const cfIp = req.headers.get("cf-connecting-ip");
  if (cfIp && !localhostCandidates.has(cfIp.trim())) {
    return cfIp.trim();
  }

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

async function lookupIpGeo(clientIp: string | null): Promise<{
  geoCity: string;
  geoRegion: string;
  geoCountry: string;
  geoOrg: string;
  geoLat: string;
  geoLon: string;
}> {
  let geoCity = "";
  let geoRegion = "";
  let geoCountry = "";
  let geoOrg = "";
  let geoLat = "";
  let geoLon = "";

  if (!clientIp) {
    return { geoCity, geoRegion, geoCountry, geoOrg, geoLat, geoLon };
  }

  try {
    const geoRes = await fetch(`https://ipapi.co/${clientIp}/json/`, {
      cache: "no-store",
      headers: {
        "User-Agent": "Fairways.Tech-Webhook/1.0",
      },
    });

    if (geoRes.ok) {
      const geoData: Record<string, unknown> = await geoRes.json();

      if (geoData.error) {
        console.warn(
          `[UMAMI_WEBHOOK] ipapi.co API error for ${clientIp}:`,
          geoData.reason || geoData.error
        );
      } else {
        geoCity = String(geoData.city ?? "");
        geoRegion = String(geoData.region ?? "");
        geoCountry = String(
          geoData.country_name ?? geoData.country ?? ""
        );
        geoOrg = String(geoData.org ?? "");
        if (geoData.latitude != null && geoData.longitude != null) {
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

  return { geoCity, geoRegion, geoCountry, geoOrg, geoLat, geoLon };
}

function formatAmsterdamTime(iso?: string): string {
  const d = iso ? new Date(iso) : new Date();
  if (Number.isNaN(d.getTime())) {
    return new Date().toLocaleString("en-US", {
      timeZone: "Europe/Amsterdam",
      dateStyle: "short",
      timeStyle: "short",
    });
  }
  return d.toLocaleString("en-US", {
    timeZone: "Europe/Amsterdam",
    dateStyle: "short",
    timeStyle: "short",
  });
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

    if (body.kind === "browser_gps_followup") {
      const lat = Number(body.latitude);
      const lon = Number(body.longitude);
      if (Number.isNaN(lat) || Number.isNaN(lon)) {
        return NextResponse.json(
          { error: "Invalid latitude or longitude" },
          { status: 400 }
        );
      }

      const formattedAddress =
        (await reverseGeocodeGoogleFormattedAddress(lat, lon)) ?? null;
      const addressLine = formattedAddress
        ? slackEscape(formattedAddress)
        : "-";

      const mapsLink = `<https://www.google.com/maps?q=${lat},${lon}|${lat}, ${lon}>`;
      const accuracyText =
        typeof body.accuracyMeters === "number" &&
        !Number.isNaN(body.accuracyMeters)
          ? `±${Math.round(body.accuracyMeters)} m`
          : "-";

      const timestamp = formatAmsterdamTime(body.capturedAtIso);
      const corr = body.visitCorrelationId
        ? slackEscape(body.visitCorrelationId)
        : "-";

      const blocks = [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "📍 Visitor shared browser location",
            emoji: true,
          },
        },
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: `_Browser GPS • ${timestamp}_\n_Correlation id: ${corr}_`,
            },
          ],
        },
        { type: "divider" },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text:
              `*📄 Page Information*\n• Title: ${body.title ? slackEscape(String(body.title)) : "-"}\n• URL: ${body.url ? slackEscape(String(body.url)) : "-"}\n• Referrer: ${body.referrer ? slackEscape(String(body.referrer)) : "Direct visit"}`,
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text:
              `*🌍 Location (browser GPS)*` +
              `\n• Latitude: ${lat}` +
              `\n• Longitude: ${lon}` +
              `\n• Accuracy: ${accuracyText}` +
              `\n• Coordinates: ${mapsLink}` +
              `\n• Address: ${addressLine}`,
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

      await fetch(slackWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          text: "Visitor shared browser location (fairways.tech)",
          blocks,
        }),
      });

      return NextResponse.json({ ok: true });
    }

    // ---- Default: IP-based visit ----
    const visitBody = body as VisitPayload;
    const { geoCity, geoRegion, geoCountry, geoOrg, geoLat, geoLon } =
      await lookupIpGeo(clientIp);

    const coordinatesText =
      geoLat && geoLon
        ? `<https://www.google.com/maps?q=${geoLat},${geoLon}|${geoLat}, ${geoLon}>`
        : "-";

    const visitorTypeEmoji =
      visitBody.visitorType === "returning" ? "🔄" : "🆕";
    const visitorTypeText =
      visitBody.visitorType === "returning"
        ? "Returning visitor"
        : "First-time visitor";

    const timestamp = formatAmsterdamTime();
    const corrVisit = visitBody.visitCorrelationId
      ? slackEscape(String(visitBody.visitCorrelationId))
      : "-";

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
            text: `_${visitorTypeText} • ${timestamp}_\n_Correlation id: ${corrVisit}_`,
          },
        ],
      },
      { type: "divider" },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*📄 Page Information*\n• Title: ${visitBody.title ? slackEscape(String(visitBody.title)) : "-"}\n• URL: ${visitBody.url ? slackEscape(String(visitBody.url)) : "-"}\n• Referrer: ${visitBody.referrer ? slackEscape(String(visitBody.referrer)) : "Direct visit"}`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            `*🌍 Location & Network*` +
            `\n• Country: ${geoCountry || visitBody.country || "-"}` +
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
            `\n• Screen: ${visitBody.screen || "-"}` +
            `\n• Language: ${visitBody.language || "-"}`,
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            `*🔍 Technical*` +
            `\n• IP: ${clientIp || "-"}` +
            `\n• Hostname: ${visitBody.hostname || "-"}`,
        },
      },
    ];

    await fetch(slackWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        text: `${visitorTypeEmoji} New visitor on fairways.tech`,
        blocks,
      }),
    });

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[UMAMI_WEBHOOK] Error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "Umami webhook is live",
  });
}
