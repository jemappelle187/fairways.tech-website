import { BlockList, isIP } from "node:net";

type Location = { area: string; network: string };
const cache = new Map<string, { expires: number; lookup: Promise<Location | null> }>();
let rateLimitedUntil = 0;

const privateOrReserved = new BlockList();
for (const [network, prefix] of [
  ["0.0.0.0", 8], ["10.0.0.0", 8], ["100.64.0.0", 10], ["127.0.0.0", 8],
  ["169.254.0.0", 16], ["172.16.0.0", 12], ["192.0.0.0", 24], ["192.0.2.0", 24],
  ["192.88.99.0", 24], ["192.168.0.0", 16], ["198.18.0.0", 15], ["198.51.100.0", 24], ["203.0.113.0", 24],
  ["224.0.0.0", 4], ["240.0.0.0", 4],
] as const) privateOrReserved.addSubnet(network, prefix, "ipv4");
const globalV6 = new BlockList();
globalV6.addSubnet("2000::", 3, "ipv6");
// Protocol assignments and transition addresses do not identify an ordinary visitor endpoint.
privateOrReserved.addSubnet("2001::", 23, "ipv6");
privateOrReserved.addSubnet("2001:db8::", 32, "ipv6");
privateOrReserved.addSubnet("2002::", 16, "ipv6");
privateOrReserved.addSubnet("3fff::", 20, "ipv6");

function normalizedAddress(ip: string) {
  if (isIP(ip) === 4) return ip;
  if (isIP(ip) !== 6 || ip.includes("%")) return "";
  return new URL("http://[" + ip + "]/").hostname.slice(1, -1);
}

function label(value: unknown) {
  return typeof value === "string"
    ? value.slice(0, 160).replace(/[^\p{L}\p{M}\p{N} .,'’()&-]/gu, "").trim().replace(/&/g, "&amp;")
    : "";
}

async function requestLocation(ip: string): Promise<Location | null> {
  try {
    // Match the marketing site's ipapi.co city/region/country_name/organisation lookup.
    // This request carries only the edge-observed address and a fixed user agent.
    const response = await fetch("https://ipapi.co/" + encodeURIComponent(ip) + "/json/", {
      cache: "no-store", redirect: "error", credentials: "omit", signal: AbortSignal.timeout(1500),
      headers: {"User-Agent": "Fairways.Tech-Visit-Tracker/2.0"},
    });
    if (response.status === 429) rateLimitedUntil = Date.now() + 60_000;
    if (!response.ok) return null;
    const data = await response.json();
    if (!data || data.error || typeof data.ip !== "string" || normalizedAddress(data.ip) !== ip) return null;
    const city = label(data.city);
    if (!city) return null;
    return {area: [city, label(data.region), label(data.country_name ?? data.country)].filter(Boolean).join(", "),
      network: label(data.org)};
  } catch {
    return null;
  }
}

export function lookupCorporateIpLocation(address: string): Promise<Location | null> {
  const ip = normalizedAddress(address);
  const family = isIP(ip) === 4 ? "ipv4" : "ipv6";
  if (!ip || privateOrReserved.check(ip, family) || (family === "ipv6" && !globalV6.check(ip, family))) {
    return Promise.resolve(null);
  }
  const now = Date.now();
  const cached = cache.get(ip);
  if (cached && cached.expires > now) return cached.lookup;
  if (now < rateLimitedUntil) return Promise.resolve(null);

  // A visit and its form events share one lookup, including while it is in flight.
  cache.delete(ip);
  if (cache.size >= 512) cache.delete(cache.keys().next().value!);
  const entry = {expires: now + 5 * 60_000, lookup: requestLocation(ip)};
  cache.set(ip, entry);
  void entry.lookup.then(location => { if (!location) entry.expires = Date.now() + 30_000; });
  return entry.lookup;
}
