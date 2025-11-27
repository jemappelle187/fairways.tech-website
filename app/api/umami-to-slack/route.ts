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
    if (
      hostname === "localhost" ||
      hostname.endsWith(".vercel.app")
    ) {
      return NextResponse.json({ ok: true, skipped: true });
    }

    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;

    if (!slackWebhookUrl) {
      console.warn(
        "[UMAMI_WEBHOOK] SLACK_WEBHOOK_URL not set, skipping Slack push."
      );
      return NextResponse.json({ ok: true, skipped: true });
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
