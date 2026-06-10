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
    default: "PetTranslator.ai — Understand your pet, scientifically",
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
        {/* Plausible analytics — privacy-friendly, cookieless, GDPR-clean.
            Honors the privacy policy commitment ("no Google Analytics by
            default"). One <script>, ~1 KB, defer-loaded so it doesn't
            block render. Tracks page views + outbound link clicks +
            file downloads via the data-* config below. */}
        <script
          defer
          data-domain="pettranslator.ai"
          src="https://plausible.io/js/script.outbound-links.file-downloads.js"
        />
      </head>
      <body>
        {/* Sitewide Schema.org graph — Organization, WebSite. SoftwareApplication
            + Offers schema lives on /pricing because it's offer-specific. */}
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
                },
                {
                  "@type": "WebSite",
                  "@id": "https://pettranslator.ai/#website",
                  url: "https://pettranslator.ai/",
                  name: "PetTranslator.ai",
                  publisher: { "@id": "https://pettranslator.ai/#organization" },
                  inLanguage: "en-US",
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
