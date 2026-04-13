# Slack browser-GPS + Google reverse geocode — debug handoff (golden template)

Gebruik dit document als vaste context voor ChatGPT of een engineer bij het opsporen van problemen (bijv. **Address: `-`** in Slack).

---

## A. Doel

- Bij een **page visit**: Slack-bericht op basis van **IP** (ipapi.co), met o.a. correlation id.
- Na **opt-in** (cookie consent + knop “Share location” + browser prompt): tweede Slack-bericht **`browser_gps_followup`** met lat/lon, accuracy, Maps-link, en **`Address`** = Google **`formatted_address`** (reverse geocoding).
- Als reverse geocoding faalt: Slack blijft verstuurd worden, **`Address: -`**.

---

## B. Relevante code (repo: fairways.tech-website)

| Onderdeel | Pad |
|-----------|-----|
| Reverse geocode + **server logs** | `lib/reverseGeocodeGoogleFormattedAddress.ts` |
| Slack-route (split visit vs GPS) | `app/api/umami-to-slack/route.ts` |
| Visit + correlation id per load | `app/components/VisitTracker.tsx` |
| Location-CTA (na cookie consent) | `app/components/LocationShareCta.tsx` |
| Mount | `app/layout.tsx` |

Log-prefix op de server: **`[GEOCODE]`** (zoek in **Vercel → Deployment → Functions → Logs**).

---

## C. Omgeving (ZEER BELANGRIJK)

| Variabele | Waar zetten | Waarde |
|-----------|-------------|--------|
| `GOOGLE_MAPS_API_KEY` | **Vercel** Project → Settings → Environment Variables (Production + evt. Preview) | Alleen de **ruwe key string** (geen `GOOGLE_MAPS_API_KEY=...` in het value-veld) |
| `SLACK_WEBHOOK_URL` | Zelfde | Slack incoming webhook URL |

**`.env.local` geldt alleen lokaal** — wordt **niet** naar Vercel gedeployed.

Na toevoegen/wijzigen van env vars: **opnieuw deployen** (redeploy).

---

## D. Google Cloud (verwachte configuratie)

1. **API:** Geocoding API ingeschakeld voor het project van de key.
2. **Billing:** actief.
3. **API key restrictions:** key mag de **Geocoding API** aanroepen (of tijdelijk geen API-restrictie om te isoleren of restricties het probleem zijn).
4. **Application restrictions:** zoals gekozen (None of IP); bij problemen eerst **None** proberen om HTTP-restricties uit te sluiten.

---

## E. Verwacht gedrag vs. fout

| Symptoom | Meest waarschijnlijke oorzaak |
|----------|-------------------------------|
| **Address: `-`** in GPS-Slack-bericht | `GOOGLE_MAPS_API_KEY` ontbreekt/leeg **op Vercel**; of Google `status` ≠ `OK` (zie logs). |
| Geen GPS-bericht | Geen “Share location” geklikt; cookie niet “accepted”; `navigator.geolocation` ontbreekt; of client-fetch faalt. |
| Alleen eerste bezoek-Slack | Normaal: adres uit Google zit **alleen** in het **tweede** bericht (`browser_gps_followup`). |

---

## F. Logs om te zoeken (Vercel Functions)

Zoek op **`[GEOCODE]`**:

| Log (indicatief) | Betekenis |
|------------------|-----------|
| `GOOGLE_MAPS_API_KEY is missing or empty` | Key niet in server-omgeving → zet in Vercel + redeploy. |
| `status=REQUEST_DENIED error_message=...` | Key/API/billing/restricties: Google-uitlezing volgen. |
| `status=OVER_QUERY_LIMIT` / quota | Quota of billing. |
| `status=ZERO_RESULTS` | Zeldzaam voor echte lat/lon; controleer coördinaten. |
| `HTTP error from Geocoding API` | Netwerk of niet-JSON response. |
| `fetch/parse failed` | Exception bij fetch/JSON. |

**De API key wordt nooit gelogd.**

---

## G. Handmatige checks

1. **Production URL:** Cookie banner → **Accept analytics** → **Share location** → browser **Allow**.
2. **Vercel:** `GOOGLE_MAPS_API_KEY` bestaat voor **Production** en deployment is **na** die wijziging.
3. **Google Cloud Console:** Geocoding API enabled + billing.
4. **Eén test-call (lokaal of curl), key uit Vercel niet in chat plakken:**

   ```bash
   curl -sS "https://maps.googleapis.com/maps/api/geocode/json?latlng=52.3676,4.9041&key=YOUR_KEY_HERE"
   ```

   Verwacht JSON met `"status":"OK"` en `results[0].formatted_address`.

---

## H. Scope / geen aannames

- Er is **geen** garantie dat het **eerste** (IP-)Slack-bericht een Google-stratenadres toont; dat is **niet** geïmplementeerd.
- `/api/event` (analytics-event route) zit **niet** in deze flow tenzij later toegevoegd.

---

## I. Korte checklist voor ChatGPT

1. Welk Slack-bericht zie je (titel/header): “New visitor” of “Visitor shared browser location”?
2. Staat `GOOGLE_MAPS_API_KEY` in **Vercel** (niet alleen `.env.local`)?
3. Wat staat er exact in Vercel logs bij `[GEOCODE]` op het moment van het GPS-bericht?
4. Wat geeft een handmatige `geocode/json`-curl met dezelfde key als `status` / `error_message`?

---

*Laatste aanpassing: server-side `[GEOCODE]` logging in `reverseGeocodeGoogleFormattedAddress.ts`.*
