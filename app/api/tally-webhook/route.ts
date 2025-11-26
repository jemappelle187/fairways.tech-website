import { NextRequest, NextResponse } from "next/server";

type TallyField = {
  key: string;
  label: string;
  type: string;
  value: any;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const eventType = body?.eventType;
    const data = body?.data;
    const fieldsArray: TallyField[] = data?.fields ?? [];

    // Optional: only handle real submissions (Tally uses FORM_RESPONSE)
    if (eventType && eventType !== "FORM_RESPONSE") {
      return NextResponse.json({ ok: true, ignored: true });
    }

    // Turn the fields array into a simple { [label]: value } map
    const fieldByLabel: Record<string, any> = {};
    for (const f of fieldsArray) {
      if (f?.label) {
        fieldByLabel[f.label] = f.value ?? "";
      }
    }

    const airtableFields: Record<string, any> = {
      "First name": fieldByLabel["First name"] ?? "",
      "Last name": fieldByLabel["Last name"] ?? "",
      "Company": fieldByLabel["Company"] ?? "",
      "Email": fieldByLabel["Email"] ?? "",
      "Country": fieldByLabel["Country"] ?? "",
      "Message": fieldByLabel["What would you like to ask/tell us?"] ?? fieldByLabel["Message"] ?? "",

      // Hidden diagnostic fields (labels come from your Tally form)
      "IP Address": fieldByLabel["ip_address"] ?? "",
      "Geo Country": fieldByLabel["geo_country"] ?? "",
      "User Agent": fieldByLabel["user_agent"] ?? "",
      "Referrer": fieldByLabel["referrer"] ?? "",

      // Raw payload + timestamp for debugging/audit
      "Raw Submission": JSON.stringify(body),
      "Created At": new Date().toISOString(),
    };

    const baseId = process.env.AIRTABLE_BASE_ID;
    const token = process.env.AIRTABLE_TOKEN;
    const tableName = process.env.AIRTABLE_TABLE_NAME || "Submissions";

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

// Quick health-check endpoint
export async function GET() {
  return NextResponse.json({ ok: true, message: "Tally webhook is live" });
}