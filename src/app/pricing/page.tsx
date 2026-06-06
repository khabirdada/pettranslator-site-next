// Marketing-side pricing page. Routes the actual checkout to the app
// subdomain (where PayPal Subscriptions + the /pricing page with the
// annual toggle already live).
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — Free + Premium for Dog and Cat Behavioral Analysis",
  description:
    "Three behavioral analyses free, lifetime. Premium at $4.99/mo or $39.99/yr (33% discount) for 30 analyses per month. Cancel anytime. 7-day refund window.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12 sm:py-20">
      <p className="label mb-3">§ Pricing</p>
      <h1 className="mb-4">
        Read your pet, <em className="text-terra">properly</em>.
      </h1>
      <p className="text-slate text-lg max-w-prose mb-12">
        Start free — 3 behavioral analyses with no signup required. Upgrade when
        you want consistent insight across multiple pets and multiple moments.
      </p>

      <div className="grid sm:grid-cols-2 gap-6 mb-12">
        <div className="border border-rule rounded-3xl p-7 bg-paper-light flex flex-col">
          <p className="label mb-3">Free</p>
          <div className="mb-6">
            <span className="font-serif text-4xl">$0</span>
            <span className="text-slate text-sm font-mono ml-1">/ forever</span>
          </div>
          <ul className="space-y-3 text-sm mb-8 flex-1">
            {[
              "3 behavioral analyses (lifetime)",
              "Single pet profile",
              "Full biometric reports",
              "30-day result history",
            ].map((feat) => (
              <li key={feat} className="flex items-start gap-2.5">
                <span className="text-terra font-mono text-xs mt-1">✓</span>
                <span className="text-ink">{feat}</span>
              </li>
            ))}
          </ul>
          <a
            href="https://app.pettranslator.ai/login"
            className="btn btn-light w-full justify-center"
          >
            Start with 3 free →
          </a>
        </div>

        <div className="border-2 border-terra rounded-3xl p-7 bg-paper-light flex flex-col relative">
          <span className="absolute -top-3 left-7 inline-flex items-center bg-terra text-paper-light text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full">
            Premium
          </span>
          <p className="label mb-3">For consistent insight</p>
          <div className="mb-2 flex items-baseline gap-1.5">
            <span className="font-serif text-4xl">$4.99</span>
            <span className="text-slate text-sm font-mono">/ month</span>
          </div>
          <p className="text-xs text-slate-soft font-mono mb-6">
            or $39.99/year — 33% discount, $3.33/mo equivalent
          </p>
          <ul className="space-y-3 text-sm mb-8 flex-1">
            {[
              "30 behavioral analyses per month",
              "Up to 5 pet profiles",
              "Vet-ready PDF exports",
              "Behavioral trends & journal",
              "Priority analysis queue",
            ].map((feat) => (
              <li key={feat} className="flex items-start gap-2.5">
                <span className="text-terra font-mono text-xs mt-1">✓</span>
                <span className="text-ink">{feat}</span>
              </li>
            ))}
          </ul>
          <a
            href="https://app.pettranslator.ai/pricing"
            className="btn w-full justify-center"
          >
            Get Premium →
          </a>
          <p className="label mt-3 text-xs text-slate-soft">
            Checkout & billing managed on app.pettranslator.ai
          </p>
        </div>
      </div>

      <div className="border-t border-rule pt-8 grid sm:grid-cols-2 gap-x-8 gap-y-6 text-sm">
        <div>
          <p className="font-semibold mb-1">7-day refund window</p>
          <p className="text-slate leading-relaxed">
            Email <a className="text-terra hover:underline" href="mailto:refund@pettranslator.ai">refund@pettranslator.ai</a> within 7 days of your first charge for a full refund.
          </p>
        </div>
        <div>
          <p className="font-semibold mb-1">Cancel anytime</p>
          <p className="text-slate leading-relaxed">
            One click in your account. Access continues through the period you've already paid for.
          </p>
        </div>
        <div>
          <p className="font-semibold mb-1">Your data isn't training material</p>
          <p className="text-slate leading-relaxed">
            Anthropic processes uploads under enterprise privacy terms — content is never used to train AI models.
          </p>
        </div>
        <div>
          <p className="font-semibold mb-1">Same AI on every tier</p>
          <p className="text-slate leading-relaxed">
            Free is rate-limited (3 lifetime), not feature-limited. Premium analyses use identical reasoning.
          </p>
        </div>
      </div>

      <div className="mt-12 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-soft font-mono">
        <Link href="/refund-policy" className="hover:text-terra">Refund policy</Link>
        <Link href="/terms" className="hover:text-terra">Terms</Link>
        <Link href="/privacy" className="hover:text-terra">Privacy</Link>
        <a href="mailto:hello@pettranslator.ai" className="hover:text-terra">hello@pettranslator.ai</a>
      </div>
    </main>
  );
}
