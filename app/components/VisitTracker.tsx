"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const VISITOR_KEY = "fw_tracker_visitor_id_v1";
const SESSION_KEY = "fw_tracker_session_v1";
const LEGACY_CORRELATION_KEY = "fw_visit_correlation_id";
const SESSION_TIMEOUT_MS = 30 * 60 * 1000;

type StoredSession = {
  id: string;
  startedAt: string;
  lastActivityAt: string;
};

function createId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (char) => {
    const random = (Math.random() * 16) | 0;
    const value = char === "x" ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  });
}

function getVisitor(): { id: string; newInBrowser: boolean } {
  try {
    const existing = window.localStorage.getItem(VISITOR_KEY);
    if (existing) return { id: existing, newInBrowser: false };
    const id = createId();
    window.localStorage.setItem(VISITOR_KEY, id);
    return { id, newInBrowser: true };
  } catch {
    return { id: createId(), newInBrowser: true };
  }
}

function getSession(): StoredSession {
  const now = new Date();
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as StoredSession;
      const lastActivity = new Date(parsed.lastActivityAt).getTime();
      if (
        parsed.id &&
        parsed.startedAt &&
        Number.isFinite(lastActivity) &&
        now.getTime() - lastActivity < SESSION_TIMEOUT_MS
      ) {
        const active = { ...parsed, lastActivityAt: now.toISOString() };
        window.localStorage.setItem(SESSION_KEY, JSON.stringify(active));
        window.localStorage.setItem(LEGACY_CORRELATION_KEY, active.id);
        return active;
      }
    }

    const created = {
      id: createId(),
      startedAt: now.toISOString(),
      lastActivityAt: now.toISOString(),
    };
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(created));
    window.localStorage.setItem(LEGACY_CORRELATION_KEY, created.id);
    return created;
  } catch {
    return {
      id: createId(),
      startedAt: now.toISOString(),
      lastActivityAt: now.toISOString(),
    };
  }
}

function getUtmParameters(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const entries = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]
    .map((key) => [key, params.get(key)] as const)
    .filter((entry): entry is readonly [string, string] => Boolean(entry[1]));
  return Object.fromEntries(entries);
}

function sendEvent(payload: Record<string, unknown>) {
  void fetch("/api/umami-to-slack", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch((error: unknown) => {
    console.error("[VISIT_TRACKER] request failed", error);
  });
}

function actionDetails(target: Element): { label: string; targetUrl: string | null } | null {
  const interactive = target.closest("a,button");
  if (!interactive) return null;

  const label = (interactive.textContent || interactive.getAttribute("aria-label") || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 160);
  const href = interactive instanceof HTMLAnchorElement ? interactive.href : null;
  const highIntent = /contact|demo|talk|partner|apply|get started|learn more/i.test(label) ||
    Boolean(href && /^(mailto:|tel:)/i.test(href)) ||
    Boolean(href && /\/(contact|about)(?:[/?#]|$)/i.test(href));

  return highIntent ? { label: label || "Unlabelled CTA", targetUrl: href } : null;
}

/** Groups page views and high-intent actions into a persistent anonymous visit session. */
export function VisitTracker() {
  const pathname = usePathname();
  const lastTrackedUrlRef = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const visitor = getVisitor();
    const session = getSession();
    const url = window.location.href;
    if (lastTrackedUrlRef.current === url) return;
    lastTrackedUrlRef.current = url;

    sendEvent({
      kind: "session_event",
      eventType: "page_view",
      eventId: createId(),
      visitorId: visitor.id,
      sessionId: session.id,
      sessionStartedAt: session.startedAt,
      occurredAt: new Date().toISOString(),
      newInBrowser: visitor.newInBrowser,
      title: document.title || null,
      url,
      path: `${window.location.pathname}${window.location.search}`,
      hostname: window.location.hostname,
      language: navigator.language || null,
      referrer: document.referrer || null,
      screen: `${window.innerWidth}x${window.innerHeight}`,
      utm: getUtmParameters(),
    });
  }, [pathname]);

  useEffect(() => {
    const sendAction = (
      eventType: "cta_click" | "form_submit",
      label: string,
      targetUrl: string | null
    ) => {
      const visitor = getVisitor();
      const session = getSession();
      sendEvent({
        kind: "session_event",
        eventType,
        eventId: createId(),
        visitorId: visitor.id,
        sessionId: session.id,
        sessionStartedAt: session.startedAt,
        occurredAt: new Date().toISOString(),
        newInBrowser: visitor.newInBrowser,
        title: document.title || null,
        url: window.location.href,
        path: `${window.location.pathname}${window.location.search}`,
        hostname: window.location.hostname,
        language: navigator.language || null,
        referrer: document.referrer || null,
        screen: `${window.innerWidth}x${window.innerHeight}`,
        actionLabel: label,
        targetUrl,
        utm: getUtmParameters(),
      });
    };

    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const details = actionDetails(event.target);
      if (details) sendAction("cta_click", details.label, details.targetUrl);
    };
    const onSubmit = (event: SubmitEvent) => {
      const form = event.target instanceof HTMLFormElement ? event.target : null;
      const label = form?.getAttribute("aria-label") || form?.getAttribute("name") || "Contact form";
      sendAction("form_submit", label.slice(0, 160), null);
    };

    document.addEventListener("click", onClick, true);
    document.addEventListener("submit", onSubmit, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("submit", onSubmit, true);
    };
  }, []);

  return null;
}
