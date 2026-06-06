// Refund policy. Linked from /pricing footer + Stripe/PayPal checkout
// metadata + Google's local terms-of-service indexing. Keeps the page
// short, scannable, and AI-citable — exact dollar amount, exact day
// count, exact email contact.
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy — 7-Day Money-Back Window",
  description:
    "PetTranslator.ai's refund policy: full refund within 7 days of your first charge, no questions asked. Email refund@pettranslator.ai.",
  alternates: { canonical: "/refund-policy" },
};

export default function RefundPolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 sm:py-20">
      <nav className="label mb-4 flex gap-2 text-slate-soft" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-terra">Home</Link>
        <span>/</span>
        <span className="text-slate">Refund policy</span>
      </nav>

      <p className="label mb-3">§ Refund policy</p>
      <h1 className="mb-6">
        Refund <em className="text-terra">policy</em>.
      </h1>

      <p className="label text-slate-soft mb-8">Effective June 1, 2026</p>

      <div className="prose-editorial">
        <h2>The short version</h2>
        <p>
          If PetTranslator Premium isn't right for you, email{" "}
          <a href="mailto:refund@pettranslator.ai" className="text-terra hover:underline">
            refund@pettranslator.ai
          </a>{" "}
          within <strong>7 days of your first charge</strong> and we'll refund the full amount. No questions, no exit interview, no clawback.
        </p>

        <h2>What qualifies</h2>
        <ul>
          <li>Your <strong>first Premium charge</strong> (monthly or annual). Renewals don't qualify under this window — see "Cancellations" below.</li>
          <li>The request must arrive at refund@pettranslator.ai <strong>within 7 calendar days</strong> of the charge timestamp on your invoice.</li>
          <li>One refund per customer. Re-subscribing after a refund and re-requesting is not eligible.</li>
        </ul>

        <h2>How to request</h2>
        <ol>
          <li>
            Send an email to{" "}
            <a href="mailto:refund@pettranslator.ai" className="text-terra hover:underline">
              refund@pettranslator.ai
            </a>{" "}
            from the address on your PetTranslator account.
          </li>
          <li>Include the invoice number (you'll find it in the email receipt from Stripe or PayPal).</li>
          <li>That's it. You don't need to justify the refund.</li>
        </ol>
        <p>
          We process refunds within <strong>3 business days</strong>. Funds typically land in your account 5–10 business days later, depending on your bank or card network.
        </p>

        <h2>Cancellations (after the 7-day window)</h2>
        <p>
          After 7 days, Premium is not refundable for the period you've already paid for — but you can cancel anytime in your account settings with one click. Your access continues through the end of the billing period you've paid for, and you're not charged again. No prorated refunds for unused days.
        </p>

        <h2>Annual subscriptions</h2>
        <p>
          The 7-day window applies to annual plans too — if you cancel within 7 days of your annual charge, you get the full $39.99 back. After 7 days, annual is non-refundable, but you can still cancel auto-renewal and keep access through your paid period.
        </p>

        <h2>Disputes</h2>
        <p>
          If a refund request is denied (e.g. outside the 7-day window) and you believe it should be honored, reply to the same email thread. We review denied requests within 5 business days. We will not initiate a chargeback dispute for a request we approve.
        </p>

        <h2>Free tier</h2>
        <p>
          The Free tier — 3 lifetime behavioral analyses — has no charge to refund. If you ran into a billing error on Free, email{" "}
          <a href="mailto:hello@pettranslator.ai" className="text-terra hover:underline">
            hello@pettranslator.ai
          </a>{" "}
          and we'll investigate.
        </p>

        <h2>Contact</h2>
        <p>
          PetTranslator.ai — operated by Khabir Mughal, founder.
          <br />
          Refunds & billing:{" "}
          <a href="mailto:refund@pettranslator.ai" className="text-terra hover:underline">
            refund@pettranslator.ai
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
        <Link href="/terms" className="hover:text-terra">Terms</Link>
        <Link href="/privacy" className="hover:text-terra">Privacy</Link>
      </div>
    </main>
  );
}
