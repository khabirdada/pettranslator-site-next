// Privacy policy. Required for Stripe + PayPal merchant agreements and
// for GDPR/CCPA-aware visitors. Plain-language, no dark patterns.
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  // Extended from "Privacy Policy" (33-char SERP title) to 44-char base
  // so the final rendered title lands at ~63 chars after the layout
  // template appends "| PetTranslator.ai". Inside Bing/Google's 55–65
  // SERP-display sweet spot. The qualifier ("Your pet photos, your data")
  // also doubles as a click-intent signal — the user understands what
  // the page covers without needing to click.
  title: "Privacy Policy — Your pet photos, your data",
  description:
    "PetTranslator.ai privacy policy — what we collect, how we store it, what we never do with your pet photos. Anthropic enterprise terms apply.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 sm:py-20">
      <nav className="label mb-4 flex gap-2 text-slate-soft" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-terra">Home</Link>
        <span>/</span>
        <span className="text-slate">Privacy</span>
      </nav>

      <p className="label mb-3">§ Privacy policy</p>
      <h1 className="mb-6">
        Privacy <em className="text-terra">policy</em>.
      </h1>

      <p className="label text-slate-soft mb-8">Effective June 1, 2026 · Version 1.0</p>

      <div className="prose-editorial">
        <h2>What we collect</h2>
        <ul>
          <li>
            <strong>Account data:</strong> email address (required), display name (optional). That's the entire account profile.
          </li>
          <li>
            <strong>Uploaded content:</strong> photos and short clips of your pet, plus any context notes you type. Stored in Supabase Storage with row-level security — only your account can read your own files.
          </li>
          <li>
            <strong>Analysis history:</strong> the AI report we returned for each upload, plus structured behavioral markers.
          </li>
          <li>
            <strong>Billing data:</strong> handled entirely by Stripe and PayPal — we receive a subscription ID and your billing email. We never see, store, or have access to your card number, CVV, or PayPal credentials.
          </li>
          <li>
            <strong>Technical data:</strong> session timestamps, IP address (for rate-limiting), browser user-agent, error logs. Auto-purged after 90 days.
          </li>
          <li>
            <strong>Analytics:</strong> we use privacy-preserving analytics (no third-party tracking pixels, no cross-site cookies, no Facebook Pixel, no Google Analytics by default). Page-view and conversion events only.
          </li>
        </ul>

        <h2>What we don't do with your pet photos</h2>
        <ul>
          <li>
            <strong>We don't train AI models on your content.</strong> Anthropic processes your uploads under enterprise API privacy terms — content is never used for model training.
          </li>
          <li>We don't sell or share your photos with third parties for marketing or product development.</li>
          <li>We don't use your photos in our marketing site, social posts, or blog without explicit written permission.</li>
          <li>We don't apply facial recognition, identity matching, or owner-identification systems to uploaded content.</li>
        </ul>

        <h2>How long we keep things</h2>
        <ul>
          <li>
            <strong>Photos:</strong> 30 days on Free, indefinite on Premium (until you delete them or your account).
          </li>
          <li>
            <strong>Analysis reports:</strong> 30 days on Free, indefinite on Premium.
          </li>
          <li>
            <strong>Account profile:</strong> as long as your account exists.
          </li>
          <li>
            <strong>Technical logs:</strong> auto-purged after 90 days.
          </li>
          <li>
            <strong>Billing records:</strong> 7 years (required for accounting / tax purposes).
          </li>
        </ul>

        <h2>Your rights</h2>
        <p>
          Regardless of where you live, you have the right to:
        </p>
        <ul>
          <li>Access — get a copy of everything we have on file for your account.</li>
          <li>Delete — wipe your account, photos, and analysis history. One-click in account settings, takes effect within 30 days.</li>
          <li>Correct — fix errors in your profile.</li>
          <li>Export — download your analysis history as JSON or PDF.</li>
          <li>Opt-out of marketing — every email has a one-click unsubscribe.</li>
        </ul>
        <p>
          To exercise any of these, email{" "}
          <a href="mailto:privacy@pettranslator.ai" className="text-terra hover:underline">
            privacy@pettranslator.ai
          </a>{" "}
          from the account address. We respond within 7 days.
        </p>

        <h2>Cookies</h2>
        <p>
          We use a single first-party session cookie to keep you logged in. No third-party advertising cookies, no fingerprinting. If you decline cookies entirely, the Service won't work — but we never set them for tracking purposes alone.
        </p>

        <h2>International data</h2>
        <p>
          We're a US-based service operated by Khabir Mughal. Your data is stored in Supabase (US region) and processed by Anthropic (US region). If you're an EU/UK resident, GDPR applies; if California, CCPA applies. Either way, the rights above are honored equally.
        </p>

        <h2>Children</h2>
        <p>
          The Service isn't for children under 13. We don't knowingly collect data from anyone under 13. If you believe a child created an account, email us and we'll delete it.
        </p>

        <h2>Security</h2>
        <p>
          All connections use TLS 1.3. Passwords are bcrypt-hashed (Supabase Auth). Photos are stored in private buckets with row-level security; only the uploader's account can read them. We follow standard cloud-security practice — but no system is perfectly secure, and we'll notify affected users within 72 hours of any verified breach.
        </p>

        <h2>Changes</h2>
        <p>
          Material changes get emailed to subscribers 14 days in advance. Old versions archived on request.
        </p>

        <h2>Contact</h2>
        <p>
          Operated by Khabir Mughal, founder.
          <br />
          Privacy & data:{" "}
          <a href="mailto:privacy@pettranslator.ai" className="text-terra hover:underline">
            privacy@pettranslator.ai
          </a>
          <br />
          General contact:{" "}
          <a href="mailto:hello@pettranslator.ai" className="text-terra hover:underline">
            hello@pettranslator.ai
          </a>
        </p>
      </div>

      <div className="mt-16 pt-8 border-t border-rule flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-soft font-mono">
        <Link href="/pricing" className="hover:text-terra">Pricing</Link>
        <Link href="/refund-policy" className="hover:text-terra">Refund policy</Link>
        <Link href="/terms" className="hover:text-terra">Terms</Link>
      </div>
    </main>
  );
}
