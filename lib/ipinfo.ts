export type IpinfoResponse = {
  ip?: string;
  country?: string;
  region?: string;
  city?: string;
  org?: string;
  loc?: string;
  latitude?: string;
  longitude?: string;
};

/**
 * Look up geo/network details for an IP using ipinfo.io.
 * Returns null if the request fails or input is incomplete.
 */
export async function fetchIpinfo(
  ip: string | null | undefined,
  token: string | undefined,
  opts?: { loggerPrefix?: string }
): Promise<IpinfoResponse | null> {
  if (!ip || !token) return null;

  const prefix = opts?.loggerPrefix ?? "[IPINFO]";

  try {
    const res = await fetch(`https://ipinfo.io/${ip}?token=${token}`);
    if (!res.ok) {
      console.warn(
        `${prefix} ipinfo non-200 response:`,
        res.status,
        await res.text()
      );
      return null;
    }

    const data = (await res.json()) as Record<string, any>;
    const loc =
      typeof data.loc === "string" && data.loc.includes(",")
        ? data.loc.trim()
        : undefined;

    let latitude: string | undefined;
    let longitude: string | undefined;

    if (loc) {
      const [lat, lon] = loc.split(",");
      latitude = lat?.trim?.();
      longitude = lon?.trim?.();
    }

    return {
      ip: typeof data.ip === "string" ? data.ip : undefined,
      country: typeof data.country === "string" ? data.country : undefined,
      region: typeof data.region === "string" ? data.region : undefined,
      city: typeof data.city === "string" ? data.city : undefined,
      org: typeof data.org === "string" ? data.org : undefined,
      loc,
      latitude,
      longitude,
    };
  } catch (err) {
    console.error(`${prefix} ipinfo error:`, err);
    return null;
  }
}



