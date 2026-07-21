export type ClarityLoadStatus =
  | "not_configured"
  | "loaded"
  | "blocked";

export type ClarityStatusPayload = {
  status: ClarityLoadStatus;
  waitMs: number;
};

declare global {
  interface Window {
    __fwClarityLoaded?: boolean;
  }
}

const CLARITY_WAIT_MS = 3500;

export function isClarityConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID);
}

export function getClarityStatusSnapshot(): ClarityStatusPayload {
  if (!isClarityConfigured()) {
    return { status: "not_configured", waitMs: 0 };
  }
  if (typeof window !== "undefined" && window.__fwClarityLoaded) {
    return { status: "loaded", waitMs: 0 };
  }
  return { status: "blocked", waitMs: 0 };
}

/** Waits briefly for the Clarity tag to load so Slack can explain dashboard gaps. */
export function resolveClarityStatus(): Promise<ClarityStatusPayload> {
  if (!isClarityConfigured()) {
    return Promise.resolve({ status: "not_configured", waitMs: 0 });
  }

  if (typeof window !== "undefined" && window.__fwClarityLoaded) {
    return Promise.resolve({ status: "loaded", waitMs: 0 });
  }

  const started = Date.now();

  return new Promise((resolve) => {
    let settled = false;

    const finish = (status: ClarityLoadStatus) => {
      if (settled) return;
      settled = true;
      window.removeEventListener("fw-clarity-status", onStatus);
      resolve({ status, waitMs: Date.now() - started });
    };

    const onStatus = (event: Event) => {
      const detail = (event as CustomEvent<{ status?: string }>).detail?.status;
      if (detail === "loaded") finish("loaded");
      if (detail === "blocked") finish("blocked");
    };

    window.addEventListener("fw-clarity-status", onStatus);

    window.setTimeout(() => {
      finish(window.__fwClarityLoaded ? "loaded" : "blocked");
    }, CLARITY_WAIT_MS);
  });
}

export function clarityStatusSlackLine(payload: ClarityStatusPayload): string {
  if (payload.status === "not_configured") {
    return "⚪ Clarity not configured on this environment";
  }
  if (payload.status === "loaded") {
    const timing = payload.waitMs > 0 ? ` (${(payload.waitMs / 1000).toFixed(1)}s)` : "";
    return `✅ Clarity script loaded${timing} — session should appear in dashboard`;
  }
  const timing = payload.waitMs > 0 ? ` after ${(payload.waitMs / 1000).toFixed(1)}s` : "";
  return `❌ Clarity script did not load${timing} — likely adblocker, network block, or visitor left too early`;
}
