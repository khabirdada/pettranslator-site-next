// IndexNow batch submitter.
//
// Why this exists: IndexNow has two parts. Hosting the key file at
// /<key>.txt verifies you own the domain. POSTing your URL list is
// what actually tells Bing/Yandex/Seznam there's something to crawl.
// The verification file alone is silent — Bing's webmaster dashboard
// shows "Set up IndexNow" until at least one submission lands.
//
// Reads the live sitemap (so the URL list always matches what we
// publish — no manual list to keep in sync) and POSTs the entire
// thing in one request. IndexNow accepts up to 10,000 URLs per
// request; we have ~80 so one shot covers everything.
//
// Usage:
//   node scripts/ping-indexnow.mjs                      # uses prod sitemap
//   HOST=pettranslator.ai node scripts/ping-indexnow.mjs
//
// Run this after every meaningful content push. The /post-deploy
// hook in Vercel could call this automatically — for now it's manual.

const KEY = "366d51358a814468ec5facc37b71d86f";
const HOST = process.env.HOST || "pettranslator.ai";
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/IndexNow";

async function readSitemapUrls(sitemapUrl) {
  const res = await fetch(sitemapUrl, {
    // Bing's IndexNow servers occasionally rate-limit non-browser UAs.
    // Real browser UA = no friction.
    headers: { "User-Agent": "Mozilla/5.0 (IndexNow-Pinger/1.0)" },
  });
  if (!res.ok) {
    throw new Error(`Sitemap fetch failed: ${res.status} ${res.statusText}`);
  }
  const xml = await res.text();
  // Light regex parse — avoids pulling in an XML library for one job.
  // Captures every <loc>...</loc>; ignores sitemap index entries (the
  // pettranslator.ai sitemap is a flat list, not an index).
  const urls = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map(
    (m) => m[1].trim(),
  );
  return urls;
}

async function ping(urls) {
  const body = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  // IndexNow returns 200 on success with no body, 202 if accepted but
  // queued, 400 on bad input, 403 on bad key, 422 on too many URLs.
  // The endpoint is fire-and-forget — Bing crawls when ready.
  return { status: res.status, statusText: res.statusText };
}

async function main() {
  console.log(`→ Reading sitemap at ${SITEMAP_URL}`);
  const urls = await readSitemapUrls(SITEMAP_URL);
  console.log(`✓ Parsed ${urls.length} URLs from sitemap`);
  if (urls.length === 0) {
    console.error("✗ Sitemap returned zero URLs — refusing to ping");
    process.exit(1);
  }
  console.log(`→ POSTing to ${ENDPOINT}`);
  const result = await ping(urls);
  console.log(`✓ Response: ${result.status} ${result.statusText}`);
  if (result.status >= 400) {
    console.error("✗ IndexNow rejected the submission");
    process.exit(1);
  }
  console.log(`✓ Submitted ${urls.length} URLs for crawl. Bing typically picks up within an hour.`);
}

main().catch((err) => {
  console.error(`✗ ${err.message}`);
  process.exit(1);
});
