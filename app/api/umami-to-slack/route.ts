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

type IpinfoResponse = {
  ip?: string;
  country?: string;
  city?: string;
  org?: string;
};

function getClientIp(req: NextRequest): string | null {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    return xff.split(",")[0].trim();
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
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
    const ipinfoToken = process.env.IPINFO_TOKEN;

    if (!slackWebhookUrl) {
      console.warn(
        "[UMAMI_WEBHOOK] SLACK_WEBHOOK_URL not set, skipping Slack push."
      );
      return NextResponse.json({ ok: true, skipped: true });
    }

    const uaRaw = req.headers.get("user-agent") || null;
    const { browser, os, device } = parseUserAgent(uaRaw);

    const clientIp = getClientIp(req);
    let ipinfo: IpinfoResponse | null = null;

    if (clientIp && ipinfoToken) {
      try {
        const res = await fetch(
          `https://ipinfo.io/${clientIp}?token=${ipinfoToken}`
        );
        if (res.ok) {
          const data = (await res.json()) as any;
          ipinfo = {
            ip: data.ip,
            country: data.country,
            city: data.city,
            org: data.org,
          };
        } else {
          console.warn(
            "[UMAMI_WEBHOOK] ipinfo non-200 response:",
            res.status,
            await res.text()
          );
        }
      } catch (e) {
        console.error("[UMAMI_WEBHOOK] ipinfo error:", e);
      }
    }

    const visitorLabel =
      body.visitorType === "returning"
        ? "Returning visitor"
        : body.visitorType === "first-time"
        ? "First-time visitor"
        : "-";

    const lines: string[] = [
      "📊 *New Umami event on Fairways.Tech*",
      "",
      `*Title:* ${body.title || "-"}`,
      `*URL:* ${body.url || "-"}`,
      "",
      `*Hostname:* ${body.hostname || "-"}`,
      `*Language:* ${body.language || "-"}`,
      `*Visitor:* ${visitorLabel}`,
      `*Referrer:* ${body.referrer || "-"}`,
      "",
      `*Browser:* ${browser || "-"}`,
      `*OS:* ${os || "-"}`,
      `*Device:* ${device || "-"}`,
      `*Screen:* ${body.screen || "-"}`,
    ];

    if (clientIp) {
      lines.push("", `*IP (proxy header):* ${clientIp}`);
    }

    if (ipinfo) {
      lines.push(
        `*Geo Country (ipinfo):* ${ipinfo.country || "-"}`,
        `*Geo City (ipinfo):* ${ipinfo.city || "-"}`,
        `*Network org (ipinfo):* ${ipinfo.org || "-"}`
      );
    }

    const text = lines.join("\n");

    await fetch(slackWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
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