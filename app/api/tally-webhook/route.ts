import { NextRequest, NextResponse } from "next/server";

type TallyField = {
  key: string;
  label: string | null;
  type: string;
  value: any;
  options?: { id: string; text: string }[];
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const eventType = body?.eventType;
    const data = body?.data;
    const fieldsArray: TallyField[] = data?.fields ?? [];

    // Only handle real submissions
    if (eventType && eventType !== "FORM_RESPONSE") {
      return NextResponse.json({ ok: true, ignored: true });
    }

    // Map by label (for fields that actually have labels)
    const fieldByLabel: Record<string, any> = {};
    for (const f of fieldsArray) {
      if (f?.label) {
        fieldByLabel[f.label] = f.value ?? "";
      }
    }

    // ----- Email: first INPUT_EMAIL field -----
    const emailField = fieldsArray.find(
      (f) => f.type === "INPUT_EMAIL"
    );
    const emailValue =
      emailField?.value ??
      fieldByLabel["Email"] ??
      fieldByLabel["Yourname@example.com"] ??
      "";

    // ----- Country: first DROPDOWN field, map id -> text -----
    let countryText = "";
    const countryField = fieldsArray.find(
      (f) => f.type === "DROPDOWN"
    );
    if (countryField) {
      const v = countryField.value;
      if (Array.isArray(v) && v.length > 0 && Array.isArray(countryField.options)) {
        const match = countryField.options.find((opt) => opt.id === v[0]);
        if (match) countryText = match.text;
      }
    }

    const airtableFields: Record<string, any> = {
      "First name": fieldByLabel["First name"] ?? "",
      "Last name": fieldByLabel["Last name"] ?? "",
      "Company": fieldByLabel["Company"] ?? "",
      "Email": emailValue,
      "Country": countryText,
      "Message":
        fieldByLabel["What would you like to ask/tell us?"] ??
        fieldByLabel["Message"] ??
        "",
    
      // Hidden diagnostic fields
      "IP Address": fieldByLabel["ip_address"] ?? "",
      "Geo Country": fieldByLabel["geo_country"] ?? "",
      "Browser": fieldByLabel["browser"] ?? "",
      "Geo City": fieldByLabel["geo_city"] ?? "",
      "User Agent": fieldByLabel["user_agent"] ?? "",
      "Referrer": fieldByLabel["referrer"] ?? "",
    
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

export async function GET() {
  return NextResponse.json({ ok: true, message: "Tally webhook is live" });
}