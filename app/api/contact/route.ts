import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Lazy initialization to avoid build-time errors when API key is missing
let resend: Resend | null = null;
function getResend() {
  if (!resend) {
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error("[CONTACT_API] RESEND_API_KEY is not set");
      return null;
    }
    resend = new Resend(resendApiKey);
  }
  return resend;
}

type ContactFormData = {
  firstName: string;
  lastName: string;
  company?: string;
  email: string;
  emailVerify?: string;
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
          const errorText = await airtableRes.text();
          console.error("Airtable error (non-blocking):", airtableRes.status, errorText);
        }
      } catch (airtableError) {
        console.error("Airtable error (non-blocking):", airtableError);
        // Continue even if Airtable fails
      }
    }

    // Send email via Resend
    const recipientEmail = process.env.CONTACT_EMAIL || "emmanuel.martina@fairways.tech";
    const fromEmail = process.env.RESEND_FROM_EMAIL || "emmanuel.martina@fairways.tech";

    const resendInstance = getResend();
    if (!resendInstance) {
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    try {
      const emailResult = await resendInstance.emails.send({
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

    // Send automated thank you email to visitor (non-blocking)
    try {
      const thankYouEmailResult = await resendInstance.emails.send({
        from: fromEmail,
        to: body.email,
        subject: "Thank you for reaching out to Fairways.Tech",
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                body { 
                  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
                  line-height: 1.6; 
                  color: #111827; 
                  margin: 0; 
                  padding: 0; 
                  background-color: #F4EFE7;
                }
                .email-wrapper {
                  padding: 24px 0;
                }
                .email-container { 
                  max-width: 600px; 
                  margin: 0 auto; 
                  background-color: #ffffff;
                  border-radius: 12px;
                  overflow: hidden;
                  box-shadow: 0 8px 24px rgba(31, 77, 54, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04);
                }
                .header { 
                  background: linear-gradient(135deg, #1F4D36 0%, #1F3B2C 100%); 
                  color: white; 
                  padding: 56px 40px 48px; 
                  text-align: center;
                  position: relative;
                }
                .header::after {
                  content: '';
                  position: absolute;
                  bottom: 0;
                  left: 0;
                  right: 0;
                  height: 1px;
                  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                }
                .logo {
                  display: block;
                  margin: 0 auto 24px;
                  height: 48px;
                  width: auto;
                }
                .header h1 { 
                  margin: 0; 
                  font-size: 32px; 
                  font-weight: 600;
                  letter-spacing: -0.03em;
                  line-height: 1.2;
                }
                .content { 
                  padding: 56px 40px; 
                  background-color: #ffffff;
                }
                .greeting {
                  font-size: 22px;
                  color: #1F4D36;
                  font-weight: 600;
                  margin-bottom: 24px;
                  letter-spacing: -0.02em;
                }
                .message {
                  color: #111827;
                  font-size: 17px;
                  line-height: 1.8;
                  margin-bottom: 28px;
                }
                .highlight-box {
                  background: linear-gradient(to right, #F4EFE7 0%, #F9F7F3 100%);
                  border-left: 5px solid #1F4D36;
                  padding: 28px;
                  margin: 36px 0;
                  border-radius: 8px;
                  box-shadow: 0 2px 8px rgba(31, 77, 54, 0.04);
                }
                .highlight-box p {
                  margin: 0;
                  color: #111827;
                  font-size: 17px;
                  line-height: 1.8;
                }
                .highlight-box strong {
                  color: #1F4D36;
                  font-weight: 600;
                  display: block;
                  margin-bottom: 12px;
                  font-size: 18px;
                  letter-spacing: -0.01em;
                }
                .cta-wrapper {
                  text-align: center;
                  margin: 40px 0 32px;
                }
                .cta-button {
                  display: inline-block;
                  background: linear-gradient(135deg, #1F4D36 0%, #1F3B2C 100%);
                  color: white;
                  padding: 18px 48px;
                  text-decoration: none;
                  border-radius: 32px;
                  font-weight: 600;
                  font-size: 17px;
                  letter-spacing: -0.01em;
                  box-shadow: 0 4px 12px rgba(31, 77, 54, 0.25);
                  transition: all 0.2s ease;
                }
                .cta-button:hover {
                  background: linear-gradient(135deg, #1F3B2C 0%, #1F4D36 100%);
                  box-shadow: 0 6px 16px rgba(31, 77, 54, 0.35);
                  transform: translateY(-1px);
                }
                .footer { 
                  background: linear-gradient(to bottom, #F4EFE7 0%, #F9F7F3 100%); 
                  padding: 40px 32px; 
                  text-align: center; 
                  border-top: 1px solid #E8E0D4;
                }
                .footer-brand {
                  margin-bottom: 12px;
                }
                .footer-brand strong {
                  color: #1F4D36;
                  font-weight: 600;
                  font-size: 16px;
                  letter-spacing: -0.01em;
                }
                .footer-tagline {
                  color: #4B5563;
                  font-size: 15px;
                  line-height: 1.6;
                  margin-bottom: 24px;
                }
                .footer p {
                  margin: 8px 0;
                  font-size: 14px;
                  color: #111827;
                }
                .footer a {
                  color: #1F4D36;
                  text-decoration: none;
                  font-weight: 500;
                }
                .footer a:hover {
                  text-decoration: underline;
                }
                .social-links {
                  margin: 24px 0;
                  padding-top: 24px;
                  border-top: 1px solid rgba(31, 77, 54, 0.1);
                }
                .social-links a {
                  display: inline-block;
                  margin: 0 12px;
                  color: #1F4D36;
                  text-decoration: none;
                  font-size: 14px;
                  font-weight: 500;
                  transition: color 0.2s;
                }
                .social-links a:hover {
                  color: #1F3B2C;
                  text-decoration: underline;
                }
                .disclaimer {
                  margin-top: 28px;
                  padding-top: 24px;
                  border-top: 1px solid rgba(31, 77, 54, 0.08);
                  font-size: 12px;
                  color: #6B7280;
                  line-height: 1.6;
                }
                @media only screen and (max-width: 600px) {
                  .email-wrapper {
                    padding: 0;
                  }
                  .email-container {
                    margin: 0;
                    border-radius: 0;
                  }
                  .header {
                    padding: 40px 28px 36px;
                  }
                  .logo {
                    height: 40px;
                    margin-bottom: 20px;
                  }
                  .header h1 {
                    font-size: 26px;
                  }
                  .content {
                    padding: 40px 28px;
                  }
                  .greeting {
                    font-size: 20px;
                  }
                  .message {
                    font-size: 16px;
                  }
                  .highlight-box {
                    padding: 24px;
                  }
                  .cta-button {
                    padding: 16px 36px;
                    font-size: 16px;
                  }
                  .footer {
                    padding: 32px 24px;
                  }
                }
              </style>
            </head>
            <body>
              <div class="email-wrapper">
                <div class="email-container">
                  <div class="header">
                    <img src="https://fairways.tech/images/logo/logo-fairways-white.svg" alt="Fairways.Tech" class="logo" />
                    <h1>Thank you for reaching out</h1>
                  </div>
                  <div class="content">
                    <div class="greeting">
                      Hi ${body.firstName},
                    </div>
                    <div class="message">
                      Thank you for your interest in Fairways.Tech. We've received your message and will get back to you as soon as possible—typically within 24–48 hours.
                    </div>
                    <div class="highlight-box">
                      <p>
                        <strong>What happens next?</strong>
                        Our team will review your partnership inquiry and reach out to discuss how we can collaborate to unlock scalable, compliant finance for rural communities.
                      </p>
                    </div>
                    <div class="message">
                      In the meantime, feel free to explore our website to learn more about our approach, impact, and the partners we work with.
                    </div>
                    <div class="cta-wrapper">
                      <a href="https://fairways.tech" class="cta-button">Visit Fairways.Tech</a>
                    </div>
                  </div>
                  <div class="footer">
                    <p class="footer-brand"><strong>Fairways.Tech</strong></p>
                    <p class="footer-tagline">Community-driven digital infrastructure for smallholder farmers</p>
                    <div class="social-links">
                      <a href="https://www.linkedin.com/company/fairways-tech/">LinkedIn</a> •
                      <a href="https://x.com/FairwaysTech">X (Twitter)</a> •
                      <a href="https://www.instagram.com/fairways.tech/">Instagram</a>
                    </div>
                    <p class="disclaimer">
                      This is an automated confirmation email. If you have any urgent questions, please reply directly to this email.
                    </p>
                  </div>
                </div>
              </div>
            </body>
          </html>
        `,
        text: `
Thank you for reaching out to Fairways.Tech

Hi ${body.firstName},

Thank you for your interest in Fairways.Tech. We've received your message and will get back to you as soon as possible—typically within 24–48 hours.

What happens next?
Our team will review your partnership inquiry and reach out to discuss how we can collaborate to unlock scalable, compliant finance for rural communities.

In the meantime, feel free to explore our website to learn more about our approach, impact, and the partners we work with.

Visit Fairways.Tech: https://fairways.tech

---
Fairways.Tech
Community-driven digital infrastructure for smallholder farmers

LinkedIn: https://www.linkedin.com/company/fairways-tech/
X (Twitter): https://x.com/FairwaysTech
Instagram: https://www.instagram.com/fairways.tech/

This is an automated confirmation email. If you have any urgent questions, please reply directly to this email.
        `.trim(),
      });

      if (!thankYouEmailResult.data) {
        console.error("[CONTACT_API] Failed to send thank you email:", thankYouEmailResult.error);
        // Don't fail the request if thank you email fails
      } else {
        console.log("[CONTACT_API] Thank you email sent successfully to:", body.email);
      }
    } catch (thankYouError: any) {
      console.error("[CONTACT_API] Thank you email error (non-blocking):", thankYouError);
      // Don't fail the request if thank you email fails
    }

    // Send Slack notification (non-blocking)
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
    if (slackWebhookUrl) {
      // Log geo data for debugging
      console.log("[CONTACT_API] Geo data received:", {
        geoCity: body.geoCity,
        geoCountry: body.geoCountry,
        ip: body.ip,
      });

      const slackText = [
        `*New Fairways.Tech contact form submission*`,
        ``,
        `*Name:* ${body.firstName} ${body.lastName}`,
        `*Company:* ${body.company || "-"}`,
        `*Email:* ${body.email}`,
        `*Country (form):* ${body.country || "-"}`,
        `*Geo Country (IP):* ${body.geoCountry || "-"}`,
        `*Browser:* ${body.browser || "-"}`,
        `*Geo City (IP):* ${body.geoCity || "-"}`,
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

