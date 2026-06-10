// Per-article OG image — generated once per article at build time via
// Next.js's opengraph-image convention. Output: 1200×630 PNG served at
// /blog/<slug>/opengraph-image.png and referenced from <meta og:image>
// automatically — no extra wiring required.
//
// Design intent: editorial register matching the live site.
//   - Cream/alabaster background (same paper-light as the site)
//   - Hero image as a right-side panel (40% of canvas)
//   - Big serif title (Newsreader) left-side
//   - Small category label + brand wordmark
//   - One terracotta accent rule across the top
//
// Implementation notes:
//   - Reads the hero WebP from public/ at build time and inlines as
//     data: URL. Avoids any runtime fetch; @vercel/og's ImageResponse
//     only accepts URLs or data URIs for <img src>.
//   - Loads Newsreader from Google Fonts at build time so the brand
//     serif renders correctly. Cached after first fetch.
//   - Returns generateImageMetadata only when needed for variants —
//     we keep one OG per slug, so it's omitted.

import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { getPost, getPostSlugs, getCategory } from "@/lib/content";

export const alt = "PetTranslator.ai — vet-behaviorist-grade pet behavior analysis";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Pre-generate OG image for every published article slug.
export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

// Cache the font once across all 60 builds — repeated fetch would
// triple build time for no reason.
let cachedSerifBold: ArrayBuffer | null = null;
let cachedSerifRegular: ArrayBuffer | null = null;

// Resolve current Google Fonts TTF URL for a family + weights tuple by
// scraping the CSS API. Notes:
//   - We use the v1 endpoint (`css?family=...`) instead of v2 (`css2?...`)
//     because v1 still serves TTF when the User-Agent looks like an older
//     Android device. v2 returns woff2-only universally, and Satori (which
//     ImageResponse uses internally) does not consume woff2.
//   - Google rotates the gstatic hash paths whenever the font version is
//     bumped — hardcoding URLs causes silent 404s. Resolving at build time
//     keeps us evergreen.
async function resolveGoogleFontUrls(
  family: string,
  weights: number[],
): Promise<Record<number, string>> {
  const css = await fetch(
    `https://fonts.googleapis.com/css?family=${encodeURIComponent(family)}:${weights.join(",")}`,
    {
      headers: {
        // Android 4.4 era UA → Google falls back to TTF.
        "User-Agent": "Mozilla/5.0 (Linux; Android 4.4)",
      },
    },
  ).then((r) => r.text());

  const result: Record<number, string> = {};
  // Capture every @font-face block; pair each weight with the TTF URL
  // declared in the same block. Order in CSS matches the order we passed
  // weights, but parsing weight explicitly is safer than relying on that.
  const blocks = css.split(/@font-face\s*\{/).slice(1);
  for (const block of blocks) {
    const w = block.match(/font-weight:\s*(\d+)/);
    const u = block.match(/url\(([^)]+\.ttf)\)/);
    if (w && u) result[parseInt(w[1], 10)] = u[1];
  }
  for (const weight of weights) {
    if (!result[weight]) {
      throw new Error(`Could not resolve TTF for ${family} ${weight}`);
    }
  }
  return result;
}

async function loadFont(url: string): Promise<ArrayBuffer> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Font load failed: ${url} → ${res.status}`);
  return res.arrayBuffer();
}

async function getFonts() {
  if (!cachedSerifBold) {
    const urls = await resolveGoogleFontUrls("Newsreader", [400, 600]);
    [cachedSerifRegular, cachedSerifBold] = await Promise.all([
      loadFont(urls[400]),
      loadFont(urls[600]),
    ]);
  }
  return { bold: cachedSerifBold!, regular: cachedSerifRegular! };
}

// Read the hero from disk + inline as a data URI. Critically: Satori
// (the renderer behind next/og) only consumes PNG and JPEG — passing a
// WebP throws "u2 is not iterable" deep in its CSS parser. So we decode
// every WebP to JPEG in-memory at build time via sharp. JPEG is the
// smaller of the two re-encoded options for natural photographs and
// keeps the final OG PNG under 80 KB.
//
// Returns null if the hero doesn't exist on disk yet — the layout
// renders a clean text-only card in that case.
async function loadHeroDataUri(heroPath: string | undefined): Promise<string | null> {
  if (!heroPath) return null;
  try {
    const abs = path.join(process.cwd(), "public", heroPath.replace(/^\//, ""));
    const bytes = await readFile(abs);
    // Decode any input format → JPEG at quality 82 (matches our card
    // variants' webp quality). Resizing to 480x624 to match the on-canvas
    // size lets sharp throw away ~70% of the source bytes upfront.
    const jpeg = await sharp(bytes)
      .resize(480, 624, { fit: "cover" })
      .jpeg({ quality: 82 })
      .toBuffer();
    return `data:image/jpeg;base64,${jpeg.toString("base64")}`;
  } catch {
    return null;
  }
}

// Brand palette — mirrors globals.css
const INK = "#1F1B16";
const SLATE = "#5C5648";
const SLATE_SOFT = "#8B8475";
const TERRA = "#B85A3E";
const PAPER = "#FBF9F1";
const RULE = "#E8E3D3";

export default async function Image({
  params,
}: {
  // Next.js 16: params is async on every metadata-generation file, not just
  // page.tsx. Awaiting was silently a no-op on a plain object — typing it
  // as Promise + awaiting is what actually unwraps the slug.
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  // If somehow called for a missing slug, render a generic card rather
  // than throwing — Next would otherwise fail the entire static export.
  const title = post?.title ?? "PetTranslator.ai";
  const category = post ? getCategory(post.category) : null;
  const categoryLabel = category?.name ?? "Behavior";
  let heroSrc: string | null = null;
  let fonts: { bold: ArrayBuffer; regular: ArrayBuffer };
  try {
    heroSrc = await loadHeroDataUri(post?.heroImage);
    fonts = await getFonts();
  } catch (err) {
    console.error(`[og-image] ${slug} preload failed:`, err);
    throw err;
  }

  // Layout notes:
  //   - Every container that has children MUST set display: flex (Satori
  //     limitation — undeclared display kills the renderer with a cryptic
  //     "u2 is not iterable" error).
  //   - No `gap` shorthand and no flex `letterSpacing` (Satori has
  //     incomplete support — we use margin-bottom on children + explicit
  //     letter-spacing in px).
  //   - One outer flex column. Hero image is laid out as a SIBLING below
  //     the text in a row, then absolutely positioned via the parent's
  //     flex-row arrangement — simpler than nested absolute.
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: "100%",
          width: "100%",
          backgroundColor: PAPER,
        }}
      >
        {/* LEFT — text block. Width adapts to hero presence. */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "70px 56px 60px 56px",
            width: heroSrc ? "62%" : "100%",
            // Top terra accent bar drawn via top border on this panel —
            // simpler than absolute positioning.
            borderTop: `6px solid ${TERRA}`,
          }}
        >
          {/* Category eyebrow */}
          <div
            style={{
              display: "flex",
              fontSize: 20,
              color: SLATE_SOFT,
              fontFamily: "Newsreader",
              fontWeight: 400,
              textTransform: "uppercase",
              letterSpacing: "3px",
            }}
          >
            § {categoryLabel.replace(/-/g, " ")}
          </div>

          {/* Title — big serif, scales down on long titles. Satori needs
              explicit display:flex on the text node when it contains a
              single string child. */}
          <div
            style={{
              display: "flex",
              fontFamily: "Newsreader",
              fontWeight: 600,
              fontSize: title.length > 70 ? 54 : title.length > 50 ? 62 : 70,
              lineHeight: 1.08,
              color: INK,
            }}
          >
            {title}
          </div>

          {/* Bottom: brand wordmark above tagline */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              borderTop: `1px solid ${RULE}`,
              paddingTop: 18,
            }}
          >
            <div
              style={{
                display: "flex",
                fontFamily: "Newsreader",
                fontWeight: 600,
                fontSize: 30,
                color: INK,
              }}
            >
              PetTranslator.ai
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 16,
                color: SLATE,
                marginTop: 4,
              }}
            >
              Vet-behaviorist-grade pet behavior analysis
            </div>
          </div>
        </div>

        {/* RIGHT — hero image panel. Only when the WebP exists. */}
        {heroSrc ? (
          <div
            style={{
              display: "flex",
              width: "38%",
              borderTop: `6px solid ${TERRA}`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
            <img
              src={heroSrc}
              width={480}
              height={624}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        ) : null}
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Newsreader", data: fonts.regular, weight: 400, style: "normal" },
        { name: "Newsreader", data: fonts.bold, weight: 600, style: "normal" },
      ],
    },
  );
}
