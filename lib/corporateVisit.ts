import {isIP} from "node:net";
import {randomUUID} from "node:crypto";
import {parseUserAgent} from "./parseUserAgent";
import {lookupCorporateIpLocation} from "./corporateIpLocation";

const origin = "https://dev.fairways.tech";
const cors = {
  "Access-Control-Allow-Origin": origin,
  "Cache-Control": "no-store",
  "Vary": "Origin",
};
const eventNames = {
  visit: "Visit session",
  navigation: "Page navigation",
  field: "Form field activated",
  "login-attempt": "Sign-in attempted",
} as const;
const pages = {
  entry: "Corporate entry",
  dashboard: "Dashboard",
  association: "Association portal",
  other: "Other page",
} as const;
const fields = {
  "login-email": "Sign-in email field",
  "login-password": "Sign-in password field",
  input: "Input",
  textarea: "Text area",
  select: "Selection",
} as const;
type VisitEvent = {
  event: keyof typeof eventNames;
  page: keyof typeof pages;
  field?: keyof typeof fields;
  email?: string;
};

function browserRequest(request: Request) {
  return request.headers.get("origin") === origin &&
    new URL(request.url).origin === "https://fairways.tech";
}

export function preflight(request: Request) {
  if (!browserRequest(request) || request.headers.get("access-control-request-method") !== "POST" ||
      request.headers.get("access-control-request-headers")?.trim().toLowerCase() !== "content-type") {
    return new Response(null, {status: 403, headers: {"Cache-Control": "no-store"}});
  }
  return new Response(null, {status: 204, headers: {
    ...cors, "Access-Control-Allow-Methods": "POST", "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "600", "Vary": "Origin, Access-Control-Request-Method, Access-Control-Request-Headers",
  }});
}

const sources = {
  direct: "Direct visit", dashboard: "Dashboard referral", website: "Fairways.Tech website",
  external: "External referral", unknown: "Source unavailable",
} as const;
const knownPaths = ["/", "/login", "/dashboard/workspace", "/dashboard/administration", "/dashboard/farmers"];
type VisitBatch = {visit: string; events: VisitEvent[]; firstStep?: number;
  source?: keyof typeof sources; path?: string; screen?: string; hasCampaign?: boolean};

// HTML email input syntax, with the same length bound as the Corporate sign-in form.
const emailPattern = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

function validEvent(data: unknown): data is VisitEvent {
  if (!data || typeof data !== "object" || Array.isArray(data) ||
      Object.keys(data).some(key => !["page", "event", "field", "email"].includes(key))) return false;
  const item = data as Record<string, unknown>;
  if (typeof item.event !== "string" || !Object.prototype.hasOwnProperty.call(eventNames, item.event) ||
      typeof item.page !== "string" || !Object.prototype.hasOwnProperty.call(pages, item.page)) return false;
  if ("email" in item && (item.event !== "login-attempt" || !["entry", "dashboard"].includes(item.page) || typeof item.email !== "string" ||
      item.email.length > 254 || /\s/.test(item.email) || !emailPattern.test(item.email))) return false;
  if (item.event === "field") return typeof item.field === "string" && Object.prototype.hasOwnProperty.call(fields, item.field);
  return !("field" in item);
}

const maxBytes = 4096;
async function readEvent(request: Request): Promise<VisitBatch | null> {
  if (!request.body || Number(request.headers.get("content-length")) > maxBytes) return null;
  const reader = request.body.getReader();
  const bytes = new Uint8Array(maxBytes);
  let offset = 0;
  try {
    while (true) {
      const {done, value} = await reader.read();
      if (done) break;
      if (offset + value.length > maxBytes) {
        await reader.cancel();
        return null;
      }
      bytes.set(value, offset);
      offset += value.length;
    }
    const data = JSON.parse(new TextDecoder().decode(bytes.subarray(0, offset)));
    if (!data || typeof data !== "object" || Array.isArray(data) ||
        Object.keys(data).some(key => !["visit", "events", "firstStep", "source", "path", "screen", "hasCampaign"].includes(key))) return null;
    if ("hasCampaign" in data && typeof data.hasCampaign !== "boolean") return null;
    if (("firstStep" in data && (!Number.isSafeInteger(data.firstStep) || data.firstStep < 1 || data.firstStep > 1e9)) ||
        ("source" in data && (typeof data.source !== "string" || !Object.hasOwn(sources, data.source))) ||
        ("path" in data && !knownPaths.includes(data.path)) ||
        ("screen" in data && (typeof data.screen !== "string" || !/^[1-9]\d{0,4}x[1-9]\d{0,4}$/.test(data.screen) || /\s/.test(data.screen)))) return null;
    if (typeof data.visit !== "string" ||
        !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(data.visit) ||
        !Array.isArray(data.events) || data.events.length < 1 || data.events.length > 12 ||
        !data.events.every(validEvent)) return null;
    return data;
  } catch {
    return null;
  } finally {
    reader.releaseLock();
  }
}

// Best-effort, per warm function instance. A submitted email is a browser claim.
let windowEnd = 0;
const counts = new Map<string, number>();
let total = 0;
function withinBudget(ip: string) {
  const now = Date.now();
  if (now >= windowEnd) {
    windowEnd = now + 60_000;
    counts.clear();
    total = 0;
  }
  const count = counts.get(ip) ?? 0;
  if (count >= 120 || total >= 600) return false;
  counts.set(ip, count + 1);
  total++;
  return true;
}

function geoPart(headers: Headers, key: string) {
  const raw = headers.get(key);
  if (!raw || raw.length > 200) return "";
  try {
    return decodeURIComponent(raw).replace(/[^\p{L}\p{N} .,'’-]/gu, "").trim().slice(0, 70);
  } catch {
    return "";
  }
}

const countryNames = new Intl.DisplayNames(["en"], {type: "region"});
const messageTime = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Amsterdam", day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit",
});

function section(text: string) {
  return {type: "section", text: {type: "mrkdwn", text, verbatim: true}};
}
function context(text: string) {
  return {type: "context", elements: [{type: "mrkdwn", text, verbatim: true}]};
}

async function slackPayload(data: VisitBatch, headers: Headers, ip: string) {
  const {device, browser, os, isBot} = parseUserAgent(headers.get("user-agent"));
  const country = geoPart(headers, "x-vercel-ip-country");
  const lookup = await lookupCorporateIpLocation(ip);
  const area = lookup?.area || [geoPart(headers, "x-vercel-ip-city"), geoPart(headers, "x-vercel-ip-country-region"),
    /^[A-Z]{2}$/.test(country) ? countryNames.of(country) : country].filter(Boolean).join(", ");
  const locationDetails = ["IP-based estimate", "IP: " + ip, lookup?.network,
    lookup ? "Source: ipapi.co" : area ? "Source: Vercel" : ""].filter(Boolean).join(" • ");
  const deviceIcon = isBot ? "🤖" : /iPhone|iPad|Android/.test(device) ? "📱" : "💻";
  const first = data.events[0].event;
  const last = data.events[data.events.length - 1].event;
  const hasLogin = data.events.some(item => item.event === "login-attempt");
  const title = first === "visit" ? "👤 New visit session" : hasLogin ? "🎯 Sign-in attempted" : "👤 Visit session";
  const firstStep = data.firstStep ?? 1;
  const journey = data.events.map((item, index) => {
    let line: string;
    if (item.event === "field") line = fields[item.field!] + " activated";
    else if (item.event === "login-attempt") line = "Sign-in attempted";
    else line = pages[item.page] + (item.event === "navigation" ? " navigation" : " viewed");
    return (firstStep + index) + ". " + line + (data.path ? " — " + data.path : "");
  });
  const emails = data.events.flatMap((item, index) => item.email
    ? [{type: "section", text: {type: "plain_text",
        text: "✉️ Email entered at step " + (firstStep + index) + " (unverified)\n" + item.email}}] : []);
  const language = headers.get("accept-language")?.split(/[,;]/, 1)[0].trim() ?? "";
  const details = [os, data.screen, /^[a-z]{2,3}(?:-[a-z0-9]{2,8}){0,2}$/i.test(language) ? language : "",
    last === "visit" || last === "navigation" ? "Page viewed" : eventNames[last]].filter(Boolean).join(" • ");
  const eventId = randomUUID();
  return {
    text: "🟠 DEV " + eventNames[first] + " on dev.fairways.tech",
    blocks: [
      {type: "header", text: {type: "plain_text", text: title, emoji: true}},
      context(["🟠 DEV", "dev.fairways.tech", deviceIcon + " " + device, browser, messageTime.format(new Date())].join(" • ")),
      section("*🧭 Journey*\n" + journey.join("\n")),
      ...emails,
      section("*📍 " + (area || "Location unavailable") + "*\n" + locationDetails),
      ...(data.source ? [section("*🌐 " + sources[data.source] + "*" + (data.hasCampaign ? "\nCampaign link" : ""))] : []),
      context("⚙️ " + details + "\n_Session: \`" + data.visit.slice(0, 8) + "…\` • Event: \`" + eventId.slice(0, 8) + "…\`_"),
    ],
  };
}

async function postToSlack(webhook: string, body: string) {
  async function post(attempt: number): Promise<Response | undefined> {
    try {
      const result = await fetch(webhook, {
        method: "POST", redirect: "error", signal: AbortSignal.timeout(3000),
        headers: {"Content-Type": "application/json"}, body,
      });
      if (!result.ok) {
        const wait = result.headers.get("retry-after") ?? "";
        console.warn("[CORPORATE_VISIT] Slack rejected", {attempt, status: result.status,
          retryAfterSeconds: /^\d{1,6}$/.test(wait) ? Number(wait) : null});
      }
      return result;
    } catch (error) {
      const cause = error instanceof Error && error.name === "TimeoutError" ? "timeout" : "transport";
      console.warn("[CORPORATE_VISIT] Slack delivery uncertain", {attempt, cause});
      return undefined;
    }
  }
  let result = await post(1);
  // Retry only an explicit rate rejection, never an uncertain delivery.
  if (result?.status === 429) {
    const wait = result.headers.get("retry-after");
    if (wait && /^[1-5]$/.test(wait)) {
      await new Promise(resolve => setTimeout(resolve, Number(wait) * 1000));
      result = await post(2);
    }
  }
  return result?.ok === true;
}

export async function receiveVisit(request: Request) {
  if (!browserRequest(request)) return new Response(null, {status: 403, headers: {"Cache-Control": "no-store"}});
  const reply = (status: number) => new Response(null, {status, headers: cors});
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") return reply(415);
  const data = await readEvent(request);
  if (!data) return reply(400);
  // Only Vercel's edge-provided address is used. No IP/host/location is accepted in the payload.
  const ip = request.headers.get("x-vercel-forwarded-for")?.trim() ?? "";
  if (process.env.VERCEL !== "1" || !isIP(ip)) return reply(503);
  if (!withinBudget(ip)) return reply(429);

  const webhook = process.env.SLACK_WEBHOOK_URL_DEV;
  if (!webhook) {
    console.warn("[CORPORATE_VISIT] DEV webhook is not configured");
    return reply(204);
  }
  if (!/^https:\/\/hooks\.slack\.com\/services\/[A-Za-z0-9_-]+\/[A-Za-z0-9_-]+\/[A-Za-z0-9_-]+$/.test(webhook)) {
    console.warn("[CORPORATE_VISIT] Invalid DEV webhook configuration");
    return reply(503);
  }
  const sent = await postToSlack(webhook, JSON.stringify(await slackPayload(data, request.headers, ip)));
  return reply(sent ? 204 : 502);
}
