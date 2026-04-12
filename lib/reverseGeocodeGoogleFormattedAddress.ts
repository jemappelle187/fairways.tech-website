/**
 * Reverse geocode via Google Geocoding API (server-side only).
 * Returns formatted_address or null on failure / missing key.
 */
export async function reverseGeocodeGoogleFormattedAddress(
  lat: number,
  lon: number
): Promise<string | null> {
  const key = process.env.GOOGLE_MAPS_API_KEY?.trim();
  if (!key || Number.isNaN(lat) || Number.isNaN(lon)) {
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
      return null;
    }

    const data = (await res.json()) as {
      status?: string;
      results?: Array<{ formatted_address?: string }>;
    };

    if (data.status !== "OK" || !data.results?.length) {
      return null;
    }

    const addr = data.results[0]?.formatted_address;
    return typeof addr === "string" && addr.trim() ? addr.trim() : null;
  } catch {
    return null;
  }
}
