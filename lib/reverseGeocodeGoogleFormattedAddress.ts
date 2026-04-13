/**
 * Reverse geocode via Google Geocoding API (server-side only).
 * Returns formatted_address or null on failure / missing key.
 * Logs diagnostics (never the API key) for Vercel / server debugging.
 */
const LOG_PREFIX = "[GEOCODE]";

export async function reverseGeocodeGoogleFormattedAddress(
  lat: number,
  lon: number
): Promise<string | null> {
  const key = process.env.GOOGLE_MAPS_API_KEY?.trim();

  if (!key) {
    console.warn(
      `${LOG_PREFIX} GOOGLE_MAPS_API_KEY is missing or empty in process.env (set it in Vercel/host env, not only .env.local).`
    );
    return null;
  }

  if (Number.isNaN(lat) || Number.isNaN(lon)) {
    console.warn(
      `${LOG_PREFIX} Invalid coordinates; lat/lon must be numbers. Got lat=${String(lat)} lon=${String(lon)}`
    );
    return null;
  }

  const params = new URLSearchParams({
    latlng: `${lat},${lon}`,
    key,
  });

  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?${params.toString()}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      const snippet = (await res.text()).slice(0, 300);
      console.warn(
        `${LOG_PREFIX} HTTP error from Geocoding API: status=${res.status} bodySnippet=${JSON.stringify(snippet)}`
      );
      return null;
    }

    const data = (await res.json()) as {
      status?: string;
      error_message?: string;
      results?: Array<{ formatted_address?: string }>;
    };

    const status = data.status ?? "UNKNOWN";

    if (status === "OK" && data.results?.length) {
      const addr = data.results[0]?.formatted_address;
      if (typeof addr === "string" && addr.trim()) {
        return addr.trim();
      }
      console.warn(
        `${LOG_PREFIX} status=OK but no usable formatted_address in first result (latlng=${lat},${lon}).`
      );
      return null;
    }

    // ZERO_RESULTS, OVER_QUERY_LIMIT, REQUEST_DENIED, INVALID_REQUEST, etc.
    const googleMsg =
      typeof data.error_message === "string" && data.error_message.trim()
        ? data.error_message.trim()
        : "(no error_message from Google)";
    console.warn(
      `${LOG_PREFIX} Google Geocoding API did not return an address. status=${status} error_message=${googleMsg} latlng=${lat},${lon}`
    );
    return null;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.warn(
      `${LOG_PREFIX} fetch/parse failed: ${message} latlng=${lat},${lon}`
    );
    return null;
  }
}
