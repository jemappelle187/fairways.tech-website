import { NextRequest, NextResponse } from "next/server";

type UmamiEventPayload = {
  website?: string;
  hostname?: string;
  language?: string;
  referrer?: string | null;
  title?: string;
  url?: string;
  screen?: string;
  browser?: string;
  os?: string;
  device?: string;
  country?: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as UmamiEventPayload;

    const hostname = body.hostname || "";

    // Ignore localhost & Vercel preview traffic
    if (hostname === "localhost" || hostname.endsWith(".vercel.app")) {
      return NextResponse.json({ ok: true, skipped: true });
    }

    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
    const ipinfoToken = process.env.IPINFO_TOKEN;

    if (!slackWebhookUrl) {
      console.warn(
        "[UMAMI_WEBHOOK] SLACK_WEBHOOK_URL not set, skipping Slack push."
      );
      return NextResponse.json({ ok: true, skipped: true });
    }

    // --- Geo-IP enrichment (best-effort, non-fatal) ---
    // Try to infer the visitor IP from proxy headers.
    const forwardedFor = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const ip = forwardedFor?.split(",")[0]?.trim() || realIp || undefined;

    let ipCity: string | undefined;
    let ipCountry: string | undefined;
    let ipOrg: string | undefined;

    if (ip && ipinfoToken) {
      try {
        const ipRes = await fetch(`https://ipinfo.io/${ip}?token=${ipinfoToken}`);
        if (ipRes.ok) {
          const ipJson = (await ipRes.json()) as {
            city?: string;
            country?: string;
            org?: string;
          };
          ipCity = ipJson.city;
          ipCountry = ipJson.country;
          ipOrg = ipJson.org;
        } else {
          console.warn("[UMAMI_WEBHOOK] ipinfo error status:", ipRes.status);
        }
      } catch (geoErr) {
        console.warn("[UMAMI_WEBHOOK] ipinfo fetch failed:", geoErr);
      }
    }

    const lines = [
      "📊 *New Umami event on Fairways.Tech*",
      "",
      `*Title:* ${body.title || "-"}`,
      `*URL:* ${body.url || "-"}`,
      "",
      `*Hostname:* ${hostname || "-"}`,
      `*Language:* ${body.language || "-"}`,
      `*Referrer:* ${body.referrer || "-"}`,
      "",
      `*Screen:* ${body.screen || "-"}`,
      "",
      ip ? `*IP (proxy header):* ${ip}` : "*IP (proxy header):* -",
      `*Country (Umami):* ${body.country || "-"}`,
      ipCountry ? `*Geo Country (ipinfo):* ${ipCountry}` : "*Geo Country (ipinfo):* -",
      ipCity ? `*Geo City (ipinfo):* ${ipCity}` : "*Geo City (ipinfo):* -",
      ipOrg ? `*Network org (ipinfo):* ${ipOrg}` : "*Network org (ipinfo):* -",
    ];

    const text = lines.join("\n");

    fetch(slackWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    }).catch((err) => {
      console.error("[UMAMI_WEBHOOK] Slack error:", err);
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
