const INDEXNOW_KEY = "e16be45daf6dcb1ee5d62a216d90dc799411184e"; // same key as in the public file

const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

const INDEXNOW_HOST = "fairways.tech";

export async function submitToIndexNow(urls: string[]) {
  if (!urls.length) return;

  try {
    const body = {
      host: INDEXNOW_HOST,
      key: INDEXNOW_KEY,
      keyLocation: `https://${INDEXNOW_HOST}/indexnow-${INDEXNOW_KEY}.txt`,
      urlList: urls,
    };

    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      console.error("[IndexNow] Non-200 response", res.status, await res.text());
    } else {
      console.log("[IndexNow] Submitted URLs", urls);
    }
  } catch (err) {
    console.error("[IndexNow] Error submitting URLs", err);
  }
}



