export type ParsedUserAgent = {
  browser: string;
  device: string;
  os: string;
  isBot: boolean;
};

/**
 * Best-effort browser detection from the User-Agent string.
 * Reliable for DuckDuckGo, Chrome/Firefox/Edge (incl. iOS variants), and Safari.
 */
export function parseUserAgent(ua: string | null): ParsedUserAgent {
  const raw = ua || "";
  const lower = raw.toLowerCase();

  const browser = detectBrowser(lower);
  const device = lower.includes("ipad")
    ? "iPad"
    : lower.includes("iphone")
      ? "iPhone"
      : lower.includes("android")
        ? "Android device"
        : /macintosh|windows nt|linux/.test(lower)
          ? "Desktop/Laptop"
          : "Unknown";
  const os = /ipad|iphone/.test(lower)
    ? "iOS"
    : lower.includes("android")
      ? "Android"
      : /mac os x|macintosh/.test(lower)
        ? "macOS"
        : lower.includes("windows nt")
          ? "Windows"
          : lower.includes("linux")
            ? "Linux"
            : "Other";
  const isBot = /bot|crawler|spider|slurp|headless|lighthouse|vercel-screenshot/i.test(raw);

  return { browser, device, os, isBot };
}

function detectBrowser(lower: string): string {
  if (/duckduckgo\/|(?:^|\s)ddg\//.test(lower)) return "DuckDuckGo";
  if (lower.includes("crios/")) return "Chrome";
  if (lower.includes("fxios/")) return "Firefox";
  if (lower.includes("edgios/")) return "Edge";
  if (lower.includes("edg/")) return "Edge";
  if (lower.includes("chrome/")) return "Chrome";
  if (lower.includes("firefox/")) return "Firefox";
  if (lower.includes("safari/")) return "Safari";
  return "Other";
}
