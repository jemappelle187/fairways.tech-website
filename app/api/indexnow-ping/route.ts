import { NextRequest, NextResponse } from "next/server";

import { submitToIndexNow } from "@/lib/indexnow";

const URLS_TO_SUBMIT = [
  "https://fairways.tech/",
  "https://fairways.tech/about",
  "https://fairways.tech/impact",
  "https://fairways.tech/team",
  "https://fairways.tech/terms",
  "https://fairways.tech/privacy",
  "https://fairways.tech/cookies",
  "https://fairways.tech/disclaimer",
];

export async function GET(_req: NextRequest) {
  try {
    await submitToIndexNow(URLS_TO_SUBMIT);

    return NextResponse.json({ ok: true, submitted: URLS_TO_SUBMIT });
  } catch (err: any) {
    console.error("[IndexNow] API error", err);

    return NextResponse.json(
      { ok: false, error: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // Optional: allow custom URL list via POST body
    const body = await req.json().catch(() => ({}));
    const urls =
      Array.isArray(body?.urls) && body.urls.length
        ? body.urls
        : URLS_TO_SUBMIT;

    await submitToIndexNow(urls);

    return NextResponse.json({ ok: true, submitted: urls });
  } catch (err: any) {
    console.error("[IndexNow] API error", err);

    return NextResponse.json(
      { ok: false, error: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}


