/**
 * Optional manual step: ping Google with the public sitemap URL so Google may
 * fetch the sitemap sooner (recrawl hint; not a substitute for Search Console).
 *
 * Do not run in CI or as part of deploy by default.
 *
 * Run manually, for example:
 *   npx tsx scripts/ping-google.ts
 */

const PING_URL =
  "https://www.google.com/ping?sitemap=https://fairways.tech/sitemap.xml";

async function main(): Promise<void> {
  const res = await fetch(PING_URL, { method: "GET" });
  console.log("GET", PING_URL);
  console.log("Response:", res.status, res.statusText);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
