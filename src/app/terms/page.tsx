// Terms of Service. Required for Stripe + PayPal merchant agreements
// and for trust signals to Google + AI search engines. Plain-language,
// scannable, no legalese theater.
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  // Extended from "Terms of Service" (35-char SERP title) to 47-char
  // base. After the layout template appends "| PetTranslator.ai" the
  // final rendered title lands at 66 chars — at the edge of the SERP
  // sweet spot but still well within Bing/Google's visible window.
  title: "Terms of Service — Rules for using the platform",
  description:
    "PetTranslator.ai terms of service — the rules of the road for using our AI-powered pet behavioral analysis platform.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 sm:py-20">
      <nav className="label mb-4 flex gap-2 text-slate-soft" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-terra">Home</Link>
        <span>/</span>
        <span className="text-slate">Terms</span>
      </nav>

      <p className="label mb-3">§ Terms of service</p>
      <h1 className="mb-6">
        Terms of <em className="text-terra">service</em>.
      </h1>

      <p className="label text-slate-soft mb-8">Effective June 1, 2026 · Version 1.0</p>

      <div className="prose-editorial">
        <p>
          By using PetTranslator.ai (the "Service"), you agree to these terms. If you don't agree, please don't use the Service. Plain language version below — no legalese-for-its-own-sake.
        </p>

        <h2>1. What the Service is</h2>
        <p>
          PetTranslator.ai analyzes photos of dogs and cats using a multimodal AI model and returns a structured behavioral observation report. It documents visible markers (body language, posture, vocalization context) and offers interpretation aligned with American Veterinary Society of Animal Behavior (AVSAB) guidance. <strong>It is not a veterinary diagnostic tool.</strong> It does not replace examination by a licensed veterinarian or board-certified behaviorist.
        </p>

        <h2>2. Who can use it</h2>
        <p>
          You must be at least 13 years old to create an account, and at least 18 to subscribe to Premium. By creating an account you confirm you have legal authority to bind yourself (or your business) to these terms.
        </p>

        <h2>3. Your content</h2>
        <p>
          You retain ownership of every photo, video, and note you upload. By uploading, you grant PetTranslator a non-exclusive, time-limited license to process that content through our AI inference pipeline for the purpose of returning your report. <strong>We do not use your content to train AI models</strong> — Anthropic's enterprise API privacy terms apply.
        </p>
        <p>
          We may retain anonymized analytics (image dimensions, model latency, error codes) for service-quality monitoring.
        </p>

        <h2>4. What you may not do</h2>
        <ul>
          <li>Upload content that isn't yours, isn't of a real animal, or violates anyone's privacy.</li>
          <li>Upload content depicting animal abuse, cruelty, or images intended to deceive the model.</li>
          <li>Reverse-engineer, scrape, or attempt to extract our system prompts, embeddings, or training data.</li>
          <li>Use the Service to provide a competing AI inference product, or to resell analyses without written agreement.</li>
          <li>Bypass rate limits, share accounts to circumvent quotas, or use automated tools to submit uploads at non-human rates.</li>
        </ul>

        <h2>5. AI output disclaimers</h2>
        <p>
          AI inference can be wrong. Reports include confidence ratings, observed-marker lists, and uncertainty disclosures — but they are <strong>not a medical diagnosis</strong>. If you suspect your pet is in pain, ill, or in acute distress, contact a licensed veterinarian immediately. PetTranslator is not liable for decisions you make based on a report's interpretation.
        </p>

        <h2>6. Payment, refunds, cancellation</h2>
        <p>
          Premium is billed monthly ($4.99) or annually ($39.99). Pro is billed monthly ($9.99) or annually ($79.99). Both via Stripe. Full refund within 7 days of your first charge — see the{" "}
          <Link href="/refund-policy" className="text-terra hover:underline">
            Refund policy
          </Link>
          . Cancel anytime in account settings; access continues through the end of your paid period.
        </p>

        <h2>7. Service availability</h2>
        <p>
          We aim for high availability but make no uptime guarantee. Scheduled maintenance, AI model outages (Anthropic API), and incidents may interrupt service. If the Service is down for more than 24 consecutive hours and you're on an annual plan, we'll credit a prorated day to your renewal.
        </p>

        <h2>8. Account termination</h2>
        <p>
          You can delete your account anytime in account settings — that triggers immediate cancellation and deletion of your stored analyses within 30 days. We may suspend accounts that violate these terms, with notice when feasible.
        </p>

        <h2>9. Intellectual property</h2>
        <p>
          PetTranslator.ai, the brand, the editorial design, and all original written content on this site are owned by Khabir Mughal / PetTranslator.ai. The AI inference engine is Anthropic Claude under license. You may quote articles from this site with attribution and a link.
        </p>

        <h2>10. Liability</h2>
        <p>
          The Service is provided "as-is". To the maximum extent permitted by law, PetTranslator.ai's total liability for any claim arising from these terms or the Service is limited to the amount you paid for the Service in the 12 months preceding the claim — or, if you've paid nothing, $50.
        </p>

        <h2>11. Changes to these terms</h2>
        <p>
          If we make material changes, we'll notify subscribers by email at least 14 days before the change takes effect. Continued use after the effective date means you accept the updated terms. Old versions are archived on request.
        </p>

        <h2>12. Governing law</h2>
        <p>
          These terms are governed by the laws of the United States, without regard to conflict-of-law principles. Any dispute will be resolved in good faith between you and PetTranslator.ai first; if unresolved, in a court of competent jurisdiction.
        </p>

        <h2>13. Contact</h2>
        <p>
          Operated by Khabir Mughal, founder.
          <br />
          General contact:{" "}
          <a href="mailto:hello@pettranslator.ai" className="text-terra hover:underline">
            hello@pettranslator.ai
          </a>
          <br />
          Legal / data requests:{" "}
          <a href="mailto:legal@pettranslator.ai" className="text-terra hover:underline">
            legal@pettranslator.ai
          </a>
        </p>
      </div>

      <div className="mt-16 pt-8 border-t border-rule flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-soft font-mono">
        <Link href="/pricing" className="hover:text-terra">Pricing</Link>
        <Link href="/refund-policy" className="hover:text-terra">Refund policy</Link>
        <Link href="/privacy" className="hover:text-terra">Privacy</Link>
      </div>
    </main>
  );
}
