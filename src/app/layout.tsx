import type { Metadata } from "next";
import { Newsreader, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  axes: ["opsz"],
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pettranslator.ai"),
  title: {
    default: "PetTranslator.ai — Understand your pet, scientifically",
    template: "%s | PetTranslator.ai",
  },
  description:
    "Premium AI behavioral analysis for dog and cat owners. Upload a photo, get a vet-behaviorist-style report — observed markers, behavioral state, owner action plan. AVSAB-aligned, force-free.",
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
