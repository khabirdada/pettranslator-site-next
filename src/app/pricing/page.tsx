// Marketing-side pricing page. Routes the actual checkout to the app
// subdomain (where PayPal Subscriptions + the in-app /pricing page with
// the annual toggle already live). This page exists to rank for
// "pet behavior analysis pricing" queries and to communicate the offer
// before signup — not to take payment.
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  // Base title trimmed to ≤41c so rendered SERP title stays ≤60c.
  title: "Pricing — Free + Premium Pet Analysis",
  description:
    "Three behavioral analyses free, lifetime. Premium at $4.99/mo or $39.99/yr (33% discount) for 30 analyses per month. Cancel anytime. 7-day refund window.",
  alternates: { canonical: "/pricing" },
};

const ORG_ID = "https://pettranslator.ai/#organization";
const APP_ID = "https://pettranslator.ai/#software";

// Offer + SoftwareApplication schema. Google uses this for the
// "Pricing" rich snippet under Sitelinks Search Results, and AI search
// engines cite it when answering "how much does PetTranslator cost".
const pricingSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": APP_ID,
      name: "PetTranslator.ai",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
      url: "https://app.pettranslator.ai/",
      description:
        "Multimodal AI behavioral analysis for dog and cat owners. Upload one photo, get a vet-behaviorist-style report — observed markers, behavioral state, owner action plan. AVSAB-aligned methodology.",
      offers: [
        {
          "@type": "Offer",
          name: "Free — 3 behavioral analyses (lifetime)",
          price: "0.00",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: "https://app.pettranslator.ai/login",
        },
        {
          "@type": "Offer",
          name: "Premium — Monthly",
          price: "4.99",
          priceCurrency: "USD",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "4.99",
            priceCurrency: "USD",
            billingDuration: "P1M",
            referenceQuantity: { "@type": "QuantitativeValue", value: 30, unitText: "analyses" },
          },
          availability: "https://schema.org/InStock",
          url: "https://app.pettranslator.ai/pricing",
        },
        {
          "@type": "Offer",
          name: "Premium — Annual (33% off)",
          price: "39.99",
          priceCurrency: "USD",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "39.99",
            priceCurrency: "USD",
            billingDuration: "P1Y",
          },
          availability: "https://schema.org/InStock",
          url: "https://app.pettranslator.ai/pricing",
        },
      ],
      publisher: { "@id": ORG_ID },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://pettranslator.ai/" },
        { "@type": "ListItem", position: 2, name: "Pricing", item: "https://pettranslator.ai/pricing" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How does PetTranslator's free tier work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You get 3 full behavioral analyses, lifetime — not daily or monthly. No credit card, no signup required to try. The free analyses use the same AI reasoning as Premium; they're rate-limited, not feature-limited.",
          },
        },
        {
          "@type": "Question",
          name: "Can I cancel my Premium subscription anytime?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. One click in your account settings cancels your subscription. You keep access through the end of the billing period you've already paid for. No questions asked, no exit interview.",
          },
        },
        {
          "@type": "Question",
          name: "Is there a refund if I'm not satisfied?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes — within 7 days of your first charge, email refund@pettranslator.ai and we'll refund in full. No need to justify it.",
          },
        },
        {
          "@type": "Question",
          name: "Is my pet's photo used to train AI models?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. PetTranslator runs on Anthropic's API under enterprise privacy terms — your uploads are never used to train AI models. They're processed for analysis only and deleted from rolling logs.",
          },
        },
        {
          "@type": "Question",
          name: "Does the Premium plan include vet-ready exports?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Premium reports can be exported as PDF and brought to your veterinarian or behaviorist consultation. PetTranslator is not a diagnostic tool — it's a behavioral observation aid that can support a real clinical visit.",
          },
        },
        {
          "@type": "Question",
          name: "How many pets can I track on Premium?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Up to 5 distinct pet profiles per Premium subscription. Each pet has its own analysis history and behavioral trends.",
          },
        },
      ],
    },
  ],
};

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }}
      />

      <main className="mx-auto max-w-5xl px-6 py-12 sm:py-20">
        <nav className="label mb-4 flex gap-2 text-slate-soft" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-terra">Home</Link>
          <span>/</span>
          <span className="text-slate">Pricing</span>
        </nav>

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
            <h2 className="label mb-3 font-mono normal-case tracking-wider text-slate-soft">Free</h2>
            <div className="mb-6">
              <span className="font-serif text-4xl">$0</span>
              <span className="text-slate text-sm font-mono ml-1">/ forever</span>
            </div>
            <ul className="space-y-3 text-sm mb-8 flex-1">
              {[
                "3 behavioral analyses (lifetime, not daily)",
                "Single pet profile",
                "Full biometric markers report",
                "30-day result history",
                "Same AI model as Premium",
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
            <h2 className="label mb-3 font-mono normal-case tracking-wider text-slate-soft">
              For consistent insight
            </h2>
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
                "Same AI model as Free",
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

        {/* The four-row "trust strip". Each row is a real, repeatable
            commitment — these are also surfaced through FAQPage schema
            so AI search engines (ChatGPT, Perplexity) can answer
            objections directly from the page. */}
        <section className="border-t border-rule pt-8 grid sm:grid-cols-2 gap-x-8 gap-y-6 text-sm mb-16">
          <div>
            <h3 className="font-semibold mb-1">7-day refund window</h3>
            <p className="text-slate leading-relaxed">
              Email <a className="text-terra hover:underline" href="mailto:refund@pettranslator.ai">refund@pettranslator.ai</a> within 7 days of your first charge for a full refund. No justification needed.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-1">Cancel anytime, one click</h3>
            <p className="text-slate leading-relaxed">
              Cancel in your account settings. Access continues through the period you've already paid for — no clawback.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-1">Your data isn't training material</h3>
            <p className="text-slate leading-relaxed">
              Anthropic processes uploads under enterprise privacy terms — your content is never used to train AI models. Logs auto-purge.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-1">Same AI on every tier</h3>
            <p className="text-slate leading-relaxed">
              Free is rate-limited (3 lifetime), not feature-limited. The reasoning, the markers, the report format — identical to Premium.
            </p>
          </div>
        </section>

        {/* What's actually different — the comparison Google + AI search
            engines want to surface. Direct, scannable, no fluff. */}
        <section className="border-t border-rule pt-8 mb-16">
          <h2 className="label mb-5 font-mono normal-case tracking-wider text-slate-soft">
            What's actually different
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-rule text-left">
                  <th className="py-3 font-medium text-slate">Capability</th>
                  <th className="py-3 font-medium text-slate">Free</th>
                  <th className="py-3 font-medium text-terra">Premium</th>
                </tr>
              </thead>
              <tbody className="text-slate">
                {[
                  ["Lifetime analyses", "3 total", "30 per month"],
                  ["Pet profiles", "1", "Up to 5"],
                  ["AI model", "Sonnet 4.6 multimodal", "Sonnet 4.6 multimodal"],
                  ["Biometric markers report", "Full", "Full"],
                  ["Owner action plan (Do/Avoid)", "Yes", "Yes"],
                  ["Confidence calibration", "Yes", "Yes"],
                  ["History retention", "30 days", "Unlimited"],
                  ["Vet-ready PDF export", "—", "Yes"],
                  ["Behavioral trends across uploads", "—", "Yes"],
                  ["Priority queue", "—", "Yes"],
                ].map(([label, free, prem]) => (
                  <tr key={label} className="border-b border-rule/50">
                    <td className="py-3">{label}</td>
                    <td className="py-3">{free}</td>
                    <td className="py-3 text-ink font-medium">{prem}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ — surfaced via FAQPage schema above. Answers are
            self-contained so AI search engines can quote them
            without crawling deeper. */}
        <section className="border-t border-rule pt-8 mb-12">
          <h2 className="label mb-5 font-mono normal-case tracking-wider text-slate-soft">
            Common questions
          </h2>
          <dl className="space-y-6">
            {[
              {
                q: "How does the free tier work?",
                a: "Three behavioral analyses, lifetime. No credit card. The reasoning is identical to Premium — Free is rate-limited, not feature-limited.",
              },
              {
                q: "Is my pet's photo used to train AI?",
                a: "No. Anthropic enterprise terms apply. Uploads are processed for analysis only and never used to train models.",
              },
              {
                q: "Can I export reports for my vet?",
                a: "Yes, on Premium. PDF exports include observed markers, the behavioral interpretation, and the suggested action plan in a format you can email to your vet or behaviorist.",
              },
              {
                q: "Is this a replacement for a behaviorist?",
                a: "No. PetTranslator is a behavioral observation aid — not a diagnostic or treatment tool. If the AI sees signs of pain, illness, or escalating distress, it flags them and recommends a real professional.",
              },
            ].map(({ q, a }) => (
              <div key={q} className="border-b border-rule pb-5">
                <dt className="font-serif text-lg mb-2">{q}</dt>
                <dd className="text-slate leading-relaxed">{a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-soft font-mono">
          <Link href="/refund-policy" className="hover:text-terra">Refund policy</Link>
          <Link href="/terms" className="hover:text-terra">Terms</Link>
          <Link href="/privacy" className="hover:text-terra">Privacy</Link>
          <a href="mailto:hello@pettranslator.ai" className="hover:text-terra">hello@pettranslator.ai</a>
        </div>
      </main>
    </>
  );
}
