import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { reverseGeocodeGoogleFormattedAddress } from "@/lib/reverseGeocodeGoogleFormattedAddress";
import { getVisitTrackingDb } from "@/lib/visitTrackingDb";

export const runtime = "nodejs";

type SessionEventType = "page_view" | "cta_click" | "form_submit";

type BasePayload = {
  title?: string | null;
  url?: string;
  path?: string;
  hostname?: string;
  language?: string | null;
  referrer?: string | null;
  screen?: string;
  visitorId?: string;
  sessionId?: string;
  eventId?: string;
};

type SessionEventPayload = BasePayload & {
  kind: "session_event";
  eventType: SessionEventType;
  sessionStartedAt: string;
  occurredAt: string;
  newInBrowser?: boolean;
  actionLabel?: string | null;
  targetUrl?: string | null;
  utm?: Record<string, string>;
};

type BrowserGpsPayload = BasePayload & {
  kind: "browser_gps_followup";
  visitCorrelationId?: string;
  latitude: number;
  longitude: number;
  accuracyMeters?: number;
  capturedAtIso?: string;
};

type TrackerPayload = SessionEventPayload | BrowserGpsPayload;

type SessionSummary = {
  started_at: string;
  last_seen_at: string;
  page_view_count: number;
  event_count: number;
  converted: boolean;
};

type RouteRow = { path: string; title: string | null; occurred_at: string };
type HistoryRow = {
  started_at: string;
  last_seen_at: string;
  page_view_count: number;
  converted: boolean;
};

function rows<T>(result: unknown): T[] {
  return result as T[];
}

function text(value: unknown, max = 500): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function slackEscape(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function validUuid(value: unknown): value is string {
  return typeof value === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function validDate(value: unknown): value is string {
  return typeof value === "string" && Number.isFinite(new Date(value).getTime());
}

function cleanUtm(value: unknown): Record<string, string> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const allowed = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
  return Object.fromEntries(
    allowed
      .map((key) => [key, text((value as Record<string, unknown>)[key], 160)] as const)
      .filter(([, entry]) => Boolean(entry))
  );
}

function getClientIp(req: NextRequest): string | null {
  const local = new Set(["127.0.0.1", "::1"]);
  const forwarded = req.headers.get("x-forwarded-for")
    ?.split(",")
    .map((ip) => ip.trim())
    .find((ip) => ip && !local.has(ip));
  if (forwarded) return forwarded;

  for (const header of ["x-real-ip", "cf-connecting-ip"]) {
    const candidate = req.headers.get(header)?.trim();
    if (candidate && !local.has(candidate)) return candidate;
  }
  return null;
}

function parseUserAgent(ua: string | null) {
  const lower = (ua || "").toLowerCase();
  const browser = lower.includes("edg/") ? "Edge"
    : lower.includes("chrome/") ? "Chrome"
      : lower.includes("safari/") && !lower.includes("chrome/") ? "Safari"
        : lower.includes("firefox/") ? "Firefox" : "Other";
  const device = lower.includes("ipad") ? "iPad"
    : lower.includes("iphone") ? "iPhone"
      : lower.includes("android") ? "Android device"
        : /macintosh|windows nt|linux/.test(lower) ? "Desktop/Laptop" : "Unknown";
  const os = /ipad|iphone/.test(lower) ? "iOS"
    : lower.includes("android") ? "Android"
      : /mac os x|macintosh/.test(lower) ? "macOS"
        : lower.includes("windows nt") ? "Windows"
          : lower.includes("linux") ? "Linux" : "Other";
  const isBot = /bot|crawler|spider|slurp|headless|lighthouse|vercel-screenshot/i.test(ua || "");
  return { browser, device, os, isBot };
}

async function lookupIpGeo(clientIp: string | null) {
  const empty = { city: "", region: "", country: "", network: "" };
  if (!clientIp) return empty;
  try {
    const response = await fetch(`https://ipapi.co/${encodeURIComponent(clientIp)}/json/`, {
      cache: "no-store",
      headers: { "User-Agent": "Fairways.Tech-Visit-Tracker/2.0" },
    });
    if (!response.ok) return empty;
    const data = await response.json() as Record<string, unknown>;
    if (data.error) return empty;
    return {
      city: text(data.city, 120),
      region: text(data.region, 120),
      country: text(data.country_name ?? data.country, 120),
      network: text(data.org, 180),
    };
  } catch (error) {
    console.warn("[VISIT_TRACKER] IP geolocation failed", error);
    return empty;
  }
}

function environmentLabel(hostname: string) {
  const environment = process.env.VERCEL_ENV ||
    (hostname === "localhost" || hostname === "127.0.0.1" ? "development" : "unknown");
  if (environment === "production") return { value: environment, badge: "🟢 PRODUCTION" };
  if (environment === "preview") return { value: environment, badge: "🟡 PREVIEW" };
  if (environment === "development") return { value: environment, badge: "🔵 LOCAL" };
  return { value: environment, badge: "⚪ UNKNOWN" };
}

function amsterdamTime(value?: string) {
  const date = value ? new Date(value) : new Date();
  return date.toLocaleString("en-GB", {
    timeZone: "Europe/Amsterdam",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function durationText(startedAt: string, lastSeenAt: string) {
  const seconds = Math.max(0, Math.round(
    (new Date(lastSeenAt).getTime() - new Date(startedAt).getTime()) / 1000
  ));
  if (seconds < 60) return `${seconds}s`;
  return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
}

function utmText(utm: Record<string, string>) {
  const parts = Object.entries(utm)
    .filter(([, value]) => value)
    .map(([key, value]) => `${key.replace("utm_", "")}: ${slackEscape(value)}`);
  return parts.length ? parts.join(" • ") : "-";
}

function pageName(path: string) {
  const pathname = path.split(/[?#]/, 1)[0] || "/";
  const knownPages: Record<string, string> = {
    "/": "Homepage",
    "/about": "About page",
    "/team": "Team page",
    "/impact": "Impact page",
    "/cookies": "Cookie policy",
    "/privacy": "Privacy policy",
    "/terms": "Terms page",
    "/disclaimer": "Disclaimer",
  };
  return { pathname, label: knownPages[pathname] || "Page" };
}

async function sendSlack(blocks: unknown[], fallbackText: string) {
  const webhook = process.env.SLACK_WEBHOOK_URL;
  if (!webhook) {
    console.warn("[VISIT_TRACKER] SLACK_WEBHOOK_URL is not configured");
    return { ok: false, skipped: true };
  }
  const response = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ text: fallbackText, blocks }),
  });
  if (!response.ok) {
    console.error(`[VISIT_TRACKER] Slack rejected notification: ${response.status}`);
  }
  return { ok: response.ok, skipped: false };
}

async function handleGps(body: BrowserGpsPayload) {
  const latitude = Number(body.latitude);
  const longitude = Number(body.longitude);
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return NextResponse.json({ error: "Invalid browser GPS coordinates" }, { status: 400 });
  }

  const sessionId = validUuid(body.sessionId)
    ? body.sessionId
    : validUuid(body.visitCorrelationId) ? body.visitCorrelationId : null;
  if (sessionId) {
    try {
      const sql = getVisitTrackingDb();
      const sessionRows = await sql`
        select visitor_id from tracker_sessions where id = ${sessionId} limit 1
      ` as Array<{ visitor_id: string }>;
      const visitorId = sessionRows[0]?.visitor_id;
      if (visitorId) {
        const eventId = validUuid(body.eventId) ? body.eventId : randomUUID();
        await sql`
          insert into tracker_events (
            id, session_id, visitor_id, event_type, occurred_at, url, path, title, metadata
          ) values (
            ${eventId}, ${sessionId}, ${visitorId}, 'browser_gps',
            ${validDate(body.capturedAtIso) ? body.capturedAtIso : new Date().toISOString()},
            ${text(body.url, 2000)}, ${text(body.path || new URL(body.url || "https://fairways.tech").pathname, 1000)},
            ${text(body.title, 300) || null},
            ${JSON.stringify({ latitude, longitude, accuracyMeters: body.accuracyMeters ?? null })}::jsonb
          ) on conflict (id) do nothing
        `;
      }
    } catch (error) {
      console.error("[VISIT_TRACKER] Failed to retain browser GPS event", error);
    }
  }

  const address = await reverseGeocodeGoogleFormattedAddress(latitude, longitude);
  const accuracy = Number.isFinite(body.accuracyMeters)
    ? `±${Math.round(Number(body.accuracyMeters))} m` : "-";
  const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
  const blocks = [
    { type: "header", text: { type: "plain_text", text: "📍 Browser location shared", emoji: true } },
    { type: "context", elements: [{ type: "mrkdwn", text: `_${amsterdamTime(body.capturedAtIso)} • explicit location permission_` }] },
    { type: "section", text: { type: "mrkdwn", text: `*Location*\n• Address: <${mapUrl}|${slackEscape(address || "Open in Google Maps")}>\n• Accuracy: ${accuracy}\n• Session: ${sessionId ? `\`${sessionId.slice(0, 8)}…\`` : "-"}` } },
  ];
  const slack = await sendSlack(blocks, "Browser location shared on fairways.tech");
  return NextResponse.json({ ok: true, slack });
}

async function handleSessionEvent(req: NextRequest, body: SessionEventPayload) {
  if (!validUuid(body.visitorId) || !validUuid(body.sessionId) || !validUuid(body.eventId) ||
      !validDate(body.sessionStartedAt) || !validDate(body.occurredAt) ||
      !["page_view", "cta_click", "form_submit"].includes(body.eventType)) {
    return NextResponse.json({ error: "Invalid tracker payload" }, { status: 400 });
  }

  const clientIp = getClientIp(req);
  const userAgent = req.headers.get("user-agent");
  const { browser, device, os, isBot } = parseUserAgent(userAgent);
  const hostname = text(body.hostname, 255);
  const environment = environmentLabel(hostname);
  const utm = cleanUtm(body.utm);
  const geo = await lookupIpGeo(clientIp);
  const sql = getVisitTrackingDb();
  const visitorBefore = rows<{ id: string }>(await sql`
    select id from tracker_visitors where id = ${body.visitorId} limit 1
  `);

  await sql`
    insert into tracker_visitors (
      id, first_seen_at, last_seen_at, first_ip, last_ip, user_agent, browser,
      operating_system, device, language, first_referrer, first_utm, is_bot
    ) values (
      ${body.visitorId}, ${body.occurredAt}, ${body.occurredAt},
      cast(${clientIp} as inet), cast(${clientIp} as inet), ${text(userAgent, 1000) || null},
      ${browser}, ${os}, ${device}, ${text(body.language, 40) || null},
      ${text(body.referrer, 2000) || null}, ${JSON.stringify(utm)}::jsonb, ${isBot}
    )
    on conflict (id) do update set
      last_seen_at = excluded.last_seen_at,
      last_ip = excluded.last_ip,
      user_agent = excluded.user_agent,
      browser = excluded.browser,
      operating_system = excluded.operating_system,
      device = excluded.device,
      language = excluded.language,
      is_bot = excluded.is_bot
  `;

  const insertedSession = rows<{ id: string }>(await sql`
    insert into tracker_sessions (
      id, visitor_id, started_at, last_seen_at, entry_url, last_url, referrer, utm,
      ip_address, geo_city, geo_region, geo_country, network_org, device,
      environment, screen
    ) values (
      ${body.sessionId}, ${body.visitorId}, ${body.sessionStartedAt}, ${body.occurredAt},
      ${text(body.url, 2000)}, ${text(body.url, 2000)}, ${text(body.referrer, 2000) || null},
      ${JSON.stringify(utm)}::jsonb, cast(${clientIp} as inet),
      ${geo.city || null}, ${geo.region || null}, ${geo.country || null}, ${geo.network || null},
      ${device}, ${environment.value}, ${text(body.screen, 60) || null}
    ) on conflict (id) do nothing returning id
  `);
  const isNewSession = insertedSession.length > 0;
  if (isNewSession) {
    await sql`update tracker_visitors set session_count = session_count + 1 where id = ${body.visitorId}`;
  }

  const insertedEvent = rows<{ id: string }>(await sql`
    insert into tracker_events (
      id, session_id, visitor_id, event_type, occurred_at, url, path, title,
      action_label, target_url, metadata
    ) values (
      ${body.eventId}, ${body.sessionId}, ${body.visitorId}, ${body.eventType},
      ${body.occurredAt}, ${text(body.url, 2000)}, ${text(body.path, 1000)},
      ${text(body.title, 300) || null}, ${text(body.actionLabel, 160) || null},
      ${text(body.targetUrl, 2000) || null}, '{}'::jsonb
    ) on conflict (id) do nothing returning id
  `);
  if (!insertedEvent.length) {
    return NextResponse.json({ ok: true, duplicate: true });
  }

  const pageView = body.eventType === "page_view";
  const conversion = body.eventType === "cta_click" || body.eventType === "form_submit";
  await sql`
    update tracker_sessions set
      last_seen_at = ${body.occurredAt},
      last_url = ${text(body.url, 2000)},
      page_view_count = page_view_count + case when ${pageView} then 1 else 0 end,
      event_count = event_count + 1,
      converted = converted or ${conversion}
    where id = ${body.sessionId}
  `;

  const [sessionResult, visitorResult, routeResult, browserHistoryResult, probableHistoryResult] = await Promise.all([
    sql`select started_at, last_seen_at, page_view_count, event_count, converted
        from tracker_sessions where id = ${body.sessionId}`,
    sql`select session_count from tracker_visitors where id = ${body.visitorId}`,
    sql`select path, title, occurred_at from tracker_events
        where session_id = ${body.sessionId} and event_type = 'page_view'
        order by occurred_at asc limit 8`,
    sql`select started_at, last_seen_at, page_view_count, converted from tracker_sessions
        where visitor_id = ${body.visitorId} and id <> ${body.sessionId}
        order by started_at desc limit 3`,
    clientIp
      ? sql`select started_at, last_seen_at, page_view_count, converted from tracker_sessions
            where ip_address = cast(${clientIp} as inet) and device = ${device}
              and visitor_id <> ${body.visitorId}
            order by started_at desc limit 3`
      : Promise.resolve([]),
  ]);
  const sessionRows = rows<SessionSummary>(sessionResult);
  const visitorRows = rows<{ session_count: number }>(visitorResult);
  const routeRows = rows<RouteRow>(routeResult);
  const browserHistory = rows<HistoryRow>(browserHistoryResult);
  const probableHistory = rows<HistoryRow>(probableHistoryResult);

  if (isNewSession) {
    try {
      await sql`delete from tracker_sessions where last_seen_at < now() - interval '90 days'`;
      await sql`delete from tracker_visitors where last_seen_at < now() - interval '90 days'`;
    } catch (error) {
      console.warn("[VISIT_TRACKER] Retention cleanup failed", error);
    }
  }

  const session = sessionRows[0];
  const sessionNumber = Number(visitorRows[0]?.session_count || 1);
  const seenRoutes = new Set<string>();
  const route = routeRows
    .map((row, index) => {
      const path = text(row.path, 180) || "/";
      const page = pageName(path);
      const repeated = seenRoutes.has(page.pathname);
      seenRoutes.add(page.pathname);
      return `${index + 1}. ${page.label} ${repeated ? "viewed again" : "viewed"} — ${slackEscape(path)}`;
    })
    .join("\n") || "-";
  const priorBrowser = browserHistory;
  const priorProbable = probableHistory;
  const status = visitorBefore.length === 0 ? "New in this browser" : "Returning in this browser";
  const eventLabel = body.eventType === "page_view" ? "Page viewed"
    : body.eventType === "form_submit" ? "Form submitted" : "CTA clicked";
  const titleEmoji = conversion ? "🎯" : isBot ? "🤖" : "👤";
  const deviceEmoji = isBot ? "🤖" : /iPhone|iPad|Android/.test(device) ? "📱" : "💻";
  const title = conversion ? "High-intent action" : isNewSession ? "New visit session" : "Visit session";
  const source = text(body.referrer, 2000) || "Direct visit";
  const duration = durationText(session.started_at, session.last_seen_at);
  const location = [geo.city, geo.region, geo.country].filter(Boolean).join(", ") || "Location unknown";
  const locationDetails = [
    "IP-based estimate",
    clientIp ? `IP: ${clientIp}` : "",
    slackEscape(geo.network),
  ].filter(Boolean).join(" • ");
  const sourceDetails = [
    Object.keys(utm).length ? utmText(utm) : "",
    body.actionLabel ? `Action: ${slackEscape(text(body.actionLabel, 160))}` : "",
    body.targetUrl ? `Target: ${slackEscape(text(body.targetUrl, 500))}` : "",
  ].filter(Boolean).join("\n");
  const history = [
    priorBrowser.length
      ? `🔁 ${priorBrowser.length} previous session(s) in this browser • last seen ${amsterdamTime(priorBrowser[0].last_seen_at)}`
      : "",
    priorProbable.length
      ? `🔎 ${priorProbable.length} possible previous session(s) on the same IP/device`
      : "",
  ].filter(Boolean).join("\n");
  const blocks = [
    { type: "header", text: { type: "plain_text", text: `${titleEmoji} ${title}`, emoji: true } },
    { type: "context", elements: [{ type: "mrkdwn", text: `${environment.badge} • ${deviceEmoji} ${device} • ${browser} • ${amsterdamTime(body.occurredAt)} • ${status} • session #${sessionNumber}` }] },
    { type: "section", text: { type: "mrkdwn", text: `*🧭 Journey*\n${route}${duration !== "0s" ? `\n⏱️ ${duration}` : ""}${isBot ? "\n🤖 Likely bot" : ""}${session.converted ? "\n🎯 High intent" : ""}` } },
    { type: "section", text: { type: "mrkdwn", text: `*📍 ${slackEscape(location)}*\n${locationDetails}` } },
    { type: "section", text: { type: "mrkdwn", text: `*🌐 ${slackEscape(source)}*${sourceDetails ? `\n${sourceDetails}` : ""}` } },
    ...(history ? [{ type: "section", text: { type: "mrkdwn", text: `*🕘 Previous visits*\n${history}` } }] : []),
    { type: "context", elements: [{ type: "mrkdwn", text: `⚙️ ${os} • ${text(body.screen, 60) || "Screen unknown"} • ${text(body.language, 40) || "Language unknown"} • ${eventLabel}\n_Session: \`${body.sessionId.slice(0, 8)}…\` • Event: \`${body.eventId.slice(0, 8)}…\`_` }] },
  ];

  const slack = await sendSlack(blocks, `${environment.badge} Visit session on fairways.tech`);
  return NextResponse.json({ ok: true, stored: true, slack });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as TrackerPayload;
    if (body.kind === "browser_gps_followup") return handleGps(body);
    if (body.kind === "session_event") return handleSessionEvent(req, body);
    return NextResponse.json({ error: "Unsupported tracker event" }, { status: 400 });
  } catch (error) {
    console.error("[VISIT_TRACKER] Unhandled error", error);
    return NextResponse.json({ error: "Visit tracking failed" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, message: "Visit session tracker is live" });
}
