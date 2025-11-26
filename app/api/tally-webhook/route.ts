import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { eventName, data } = body;

    // Only handle actual form submissions
    if (eventName !== "FORM.SUBMITTED") {
      return NextResponse.json({ ok: true, ignored: true });
    }

    const fields = data?.fields ?? {};

    // Map Tally fields -> Airtable columns
    const airtableFields: Record<string, any> = {
      "First name": fields.first_name ?? "",
      "Last name": fields.last_name ?? "",
      "Company": fields.company ?? "",
      "Email": fields.email ?? "",
      "Country": fields.country ?? "",
      "Message": fields.message ?? "",
      "IP Address": fields.ip_address ?? "",
      "Geo Country": fields.geo_country ?? "",
      "User Agent": fields.user_agent ?? "",
      "Referrer": fields.referrer ?? "",
      // This will auto-create a "Raw Submission" column in Airtable if it doesn't exist yet
      "Raw Submission": JSON.stringify(body),
      "Created At": new Date().toISOString(),
    };

    const baseId = process.env.AIRTABLE_BASE_ID;
    const token = process.env.AIRTABLE_TOKEN;
    const tableName = process.env.AIRTABLE_TABLE_NAME || "Table 1";

    if (!baseId || !token) {
      console.error("Missing Airtable env vars");
      return NextResponse.json(
        { error: "Server not configured for Airtable" },
        { status: 500 }
      );
    }

    const airtableRes = await fetch(
      `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          records: [{ fields: airtableFields }],
        }),
      }
    );

    if (!airtableRes.ok) {
      const text = await airtableRes.text();
      console.error("Airtable error:", text);
      return NextResponse.json(
        { error: "Airtable error", detail: text },
        { status: 500 }
      );
    }

    const result = await airtableRes.json();

    return NextResponse.json({ ok: true, airtable: result });
  } catch (err: any) {
    console.error("Webhook error", err);
    return NextResponse.json(
      { error: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}

// Optional GET handler so you can quickly check it's deployed
export async function GET() {
  return NextResponse.json({ ok: true, message: "Tally webhook is live" });
}