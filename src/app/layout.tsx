import type { Metadata } from "next";
import { Newsreader, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// Font loading is tuned for Core Web Vitals over typographic perfection:
//
//   weight: only the specific weights we use, not the full variable range.
//     The opsz axis we previously loaded pulled the full Newsreader variable
//     file (~80 KB) which delayed LCP by ~1.4s on Slow 4G. We use display
//     weights (500) for headings and body (400) for prose only — listing
//     them explicitly keeps the woff2 payload small (~25–30 KB each).
//
//   display: "swap" stays — text renders in the fallback (Times/Georgia/
//     system serif) immediately at FCP, then swaps in when the woff2
//     loads. adjustFontFallback (default true) uses size-adjust on the
//     fallback so the swap doesn't cause CLS.
//
//   preload: true (default) — next/font emits <link rel="preload" as=font>
//     in the head for the route's referenced fonts, so the network
//     request starts in parallel with HTML parsing.
const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600"],
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pettranslator.ai"),
  title: {
    // Default homepage title — bumped to ~62 chars so it lands inside
    // the 55–65 SERP-display sweet spot. Was 54 chars, which Bing
    // Webmaster flagged as "too short" because below ~55 leaves SERP
    // real estate unused. Includes the audience phrase ("dog and cat
    // owners") so the title alone qualifies the click intent.
    default: "PetTranslator.ai — Behavioral analysis for dog and cat owners",
    template: "%s | PetTranslator.ai",
  },
  // Kept ≤155 chars so Google doesn't truncate mid-sentence in SERP.
  description:
    "AI behavioral analysis for dog and cat owners. Upload one photo — get observed markers, behavioral state, and an action plan. AVSAB-aligned.",
  openGraph: {
    title: "PetTranslator.ai — Understand your pet, scientifically",
    description:
      "Premium AI behavioral analysis for dog and cat owners. Vet-behaviorist-grade reports from a single photo.",
    url: "https://pettranslator.ai",
    siteName: "PetTranslator.ai",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
  },
  icons: {
    icon: [
      { url: "/assets/favicon-32.png", sizes: "32x32" },
      { url: "/assets/icon-192.png", sizes: "192x192" },
    ],
    apple: "/assets/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  // Search-engine ownership verifications. Emitted on every page so
  // Bing's crawler can confirm domain ownership regardless of which
  // route it hits first. Next.js renders verification.other as
  // <meta name="<key>" content="<value>"> — matches Bing's spec
  // (msvalidate.01) exactly. Add Google, Yandex, etc. to this object
  // as they're issued.
  verification: {
    other: {
      "msvalidate.01": "95423789E7D9A15323FEBDD470C2A2CF",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${jakarta.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* Cloudflare Web Analytics — free forever, no cookies, no PII,
            no Google. Privacy-policy-aligned ("no GA by default").
            Single beacon (~7 KB defer-loaded). Tracks page views, unique
            visitors, referrers, country, device — but NOT outbound link
            clicks or file downloads (those are Plausible-only). For
            launch-stage analytics this is enough; we can layer
            event-level tracking later if needed.
            One token for both pettranslator.ai + app.pettranslator.ai
            so the same Cloudflare dashboard shows both subdomains. */}
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "4d51d6d7b6cd4407a557472f367fd630"}'
        />
      </head>
      <body>
        {/* Sitewide Schema.org graph — Organization + WebSite + WebApplication.
            Three entities, cross-referenced via @id, in one JSON-LD block.
            Google prefers a single @graph over multiple <script> blocks.

            The WebApplication node carries the Wikidata anchor
            (Q140167480 for PetTranslator.ai, Q140157373 for the founder).
            That anchor is what lets Google Knowledge Graph, ChatGPT,
            Claude, Perplexity, and Gemini resolve the brand name to a
            structured entity instead of treating it as ambiguous text —
            the strongest E-E-A-T signal we can ship without a Wikipedia
            article.

            SoftwareApplication + Offers schema still lives on /pricing
            because it's offer-specific (price, currency, availability).
            The WebApplication node here is the *identity* layer; the
            /pricing node is the *commerce* layer. They coexist. */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://pettranslator.ai/#organization",
                  name: "PetTranslator.ai",
                  url: "https://pettranslator.ai/",
                  logo: "https://pettranslator.ai/assets/icon-512.png",
                  email: "hello@pettranslator.ai",
                  description:
                    "Premium AI-powered behavioral analysis for dog and cat owners.",
                  founder: { "@id": "https://journal.elelaf.com/about/#reviewer-person" },
                },
                {
                  "@type": "WebSite",
                  "@id": "https://pettranslator.ai/#website",
                  url: "https://pettranslator.ai/",
                  name: "PetTranslator.ai",
                  publisher: { "@id": "https://pettranslator.ai/#organization" },
                  inLanguage: "en-US",
                },
                {
                  "@type": "WebApplication",
                  "@id": "https://pettranslator.ai/#application",
                  name: "PetTranslator.ai",
                  url: "https://pettranslator.ai/",
                  description:
                    "AI behavioral analysis for dog and cat owners. Upload one photo — get observed markers, behavioral state, and an action plan. AVSAB-aligned.",
                  applicationCategory: "LifestyleApplication",
                  operatingSystem: "All",
                  foundingDate: "2026",
                  creator: { "@id": "https://journal.elelaf.com/about/#reviewer-person" },
                  // Compact AggregateOffer summarizing the 3 tiers at the
                  // identity layer. Detailed per-tier Offer schema lives
                  // on /pricing where it belongs commercially. The layout
                  // version unlocks pricing-snippet rich results across
                  // every page that mounts this graph.
                  offers: {
                    "@type": "AggregateOffer",
                    priceCurrency: "USD",
                    lowPrice: "0",
                    highPrice: "9.99",
                    offerCount: "3",
                    availability: "https://schema.org/InStock",
                    url: "https://pettranslator.ai/pricing",
                  },
                  // sameAs: Wikidata anchor + every owned social profile.
                  // Google Knowledge Graph reads this graph to merge the
                  // brand entity — each platform's profile cross-confirms
                  // the others. Ordering: Wikidata first (canonical),
                  // then social by audience size.
                  sameAs: [
                    "https://www.wikidata.org/wiki/Q140167480",
                    "https://www.linkedin.com/company/pettranslator-ai",
                    "https://x.com/Petranslatorai",
                    "https://www.facebook.com/Pettranslatorai/",
                    "https://www.pinterest.com/pettranslatorai/",
                    "https://pettranslatorai.substack.com/",
                    "https://www.quora.com/profile/Pet-Translator-Ai",
                    "https://www.reddit.com/user/Vegetable-Sherbet-14/",
                  ],
                },
                {
                  "@type": "Person",
                  "@id": "https://journal.elelaf.com/about/#reviewer-person",
                  name: "Khabir Uddin",
                  url: "https://journal.elelaf.com/about/",
                  sameAs: ["https://www.wikidata.org/wiki/Q140157373"],
                },
              ],
            }),
          }}
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
