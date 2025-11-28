import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactFormData = {
  firstName: string;
  lastName: string;
  company?: string;
  email: string;
  phone?: string;
  country?: string;
  message: string;
  // Tracking fields
  ip?: string;
  geoCountry?: string;
  geoCity?: string;
  device?: string;
  browser?: string;
  userAgent?: string;
  referrer?: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ContactFormData;

    // Validate required fields
    if (!body.firstName || !body.lastName || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Save to Airtable (existing logic)
    const baseId = process.env.AIRTABLE_BASE_ID;
    const token = process.env.AIRTABLE_TOKEN;
    const tableName = process.env.AIRTABLE_TABLE_NAME || "Submissions";

    if (baseId && token) {
      const airtableFields: Record<string, any> = {
        "First name": body.firstName,
        "Last name": body.lastName,
        "Company": body.company || "",
        "Email": body.email,
        "Phone": body.phone || "",
        "Country": body.country || "",
        "Message": body.message,
        // Tracking fields
        "IP Address": body.ip || "",
        "Geo Country": body.geoCountry || "",
        "Geo City": body.geoCity || "",
        "Browser": body.browser || "",
        "User Agent": body.userAgent || "",
        "Referrer": body.referrer || "",
        "Created At": new Date().toISOString(),
      };

      try {
        await fetch(
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
      } catch (airtableError) {
        console.error("Airtable error (non-blocking):", airtableError);
        // Continue even if Airtable fails
      }
    }

    // Send email via Resend
    const recipientEmail = process.env.CONTACT_EMAIL || "emmanuel.martina@fairways.tech";
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

    try {
      const emailResult = await resend.emails.send({
        from: fromEmail,
        to: recipientEmail,
        replyTo: body.email,
        subject: `New contact form submission from ${body.firstName} ${body.lastName}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #1F4D36; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
                .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-top: none; }
                .field { margin-bottom: 15px; }
                .label { font-weight: 600; color: #1F4D36; }
                .value { margin-top: 5px; }
                .message-box { background: white; padding: 15px; border-left: 3px solid #1F4D36; margin-top: 10px; }
                .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2 style="margin: 0;">New Contact Form Submission</h2>
                </div>
                <div class="content">
                  <div class="field">
                    <div class="label">Name</div>
                    <div class="value">${body.firstName} ${body.lastName}</div>
                  </div>
                  ${body.company ? `
                  <div class="field">
                    <div class="label">Company</div>
                    <div class="value">${body.company}</div>
                  </div>
                  ` : ""}
                  <div class="field">
                    <div class="label">Email</div>
                    <div class="value"><a href="mailto:${body.email}">${body.email}</a></div>
                  </div>
                  ${body.phone ? `
                  <div class="field">
                    <div class="label">Phone</div>
                    <div class="value">${body.phone}</div>
                  </div>
                  ` : ""}
                  ${body.country ? `
                  <div class="field">
                    <div class="label">Country</div>
                    <div class="value">${body.country}</div>
                  </div>
                  ` : ""}
                  <div class="field">
                    <div class="label">Message</div>
                    <div class="message-box">${body.message.replace(/\n/g, "<br>")}</div>
                  </div>
                  ${(body.geoCountry || body.geoCity) ? `
                  <div class="footer">
                    <strong>Technical Details:</strong><br>
                    ${body.geoCountry ? `Country: ${body.geoCountry}<br>` : ""}
                    ${body.geoCity ? `City: ${body.geoCity}<br>` : ""}
                    ${body.browser ? `Browser: ${body.browser}<br>` : ""}
                  </div>
                  ` : ""}
                </div>
              </div>
            </body>
          </html>
        `,
        text: `
New Contact Form Submission

Name: ${body.firstName} ${body.lastName}
${body.company ? `Company: ${body.company}\n` : ""}Email: ${body.email}
${body.phone ? `Phone: ${body.phone}\n` : ""}${body.country ? `Country: ${body.country}\n` : ""}
Message:
${body.message}

${body.geoCountry || body.geoCity ? `\nTechnical Details:\n${body.geoCountry ? `Country: ${body.geoCountry}\n` : ""}${body.geoCity ? `City: ${body.geoCity}\n` : ""}${body.browser ? `Browser: ${body.browser}\n` : ""}` : ""}
        `.trim(),
      });

      if (!emailResult.data) {
        console.error("Resend error:", emailResult.error);
        return NextResponse.json(
          { error: "Failed to send email" },
          { status: 500 }
        );
      }
    } catch (emailError: any) {
      console.error("Resend email error:", emailError);
      return NextResponse.json(
        { error: "Failed to send email", detail: emailError?.message },
        { status: 500 }
      );
    }

    // Send Slack notification (non-blocking)
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
    if (slackWebhookUrl) {
      const slackText = [
        `*New Fairways.Tech contact form submission*`,
        ``,
        `*Name:* ${body.firstName} ${body.lastName}`,
        `*Company:* ${body.company || "-"}`,
        `*Email:* ${body.email}`,
        `*Country (form):* ${body.country || "-"}`,
        `*Geo Country (IP):* ${body.geoCountry || "-"}`,
        `*Browser:* ${body.browser || "-"}`,
        `*Geo City:* ${body.geoCity || "-"}`,
        ``,
        `*Message:* ${
          body.message && body.message.trim().length
            ? body.message
            : "_(no message)_"
        }`,
      ].join("\n");

      fetch(slackWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: slackText }),
      }).catch((err) => {
        console.error("Slack webhook error:", err);
      });
    }

    return NextResponse.json({ ok: true, message: "Form submitted successfully" });
  } catch (err: any) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}

