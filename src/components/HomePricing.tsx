"use client";

// Homepage pricing section — three-card layout with monthly/annual toggle.
//
// Why a client component for this one section: the toggle's "prices update
// in place" interaction is the whole point — without it the section feels
// like a static SaaS template from 2019. Everything else on the homepage
// stays server-rendered.
//
// Design intent: editorial register, not "SaaS pricing energy". Big serif
// numbers, hairline borders, slate body text. Premium gets a 2px terracotta
// border (the only colored border on the page) so it carries the eye through
// the three-card row L→R: Free (free trial) → Premium (recommended) → Pro
// (upsell ceiling).
//
// Pricing is locked (June 2026, post-Pro):
//   Free     — 3 analyses lifetime
//   Premium  — $4.99/mo OR $39.99/yr (33% off)
//   Pro      — $9.99/mo OR $79.99/yr (33% off)
import { useState } from "react";

type Interval = "monthly" | "annual";

const ANNUAL_DISCOUNT_PERCENT = 33;

const TIERS = [
  {
    id: "free",
    name: "Free",
    tagline: "For trying it out",
    price: { monthly: 0, annual: 0 },
    period: { monthly: "forever", annual: "forever" },
    features: [
      "3 behavioral analyses (lifetime)",
      "1 pet profile, full report",
      "30-day result history",
      "Same AI model as paid tiers",
    ],
    cta: { label: "Start with 3 free", href: "https://app.pettranslator.ai/login" },
    recommended: false,
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "For consistent insight",
    price: { monthly: 4.99, annual: 39.99 },
    period: { monthly: "month", annual: "year" },
    features: [
      "30 analyses per month",
      "Up to 5 pet profiles",
      "Behavioral trends & journal",
      "Vet-ready PDF exports",
    ],
    cta: { label: "Get Premium", href: "https://app.pettranslator.ai/pricing" },
    recommended: true,
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For multi-pet households",
    price: { monthly: 9.99, annual: 79.99 },
    period: { monthly: "month", annual: "year" },
    features: [
      "75 analyses per month",
      "Up to 15 pet profiles",
      "Priority analysis queue",
      "Everything in Premium",
    ],
    cta: { label: "Get Pro", href: "https://app.pettranslator.ai/pricing" },
    recommended: false,
  },
] as const;

// "$3.33/mo equivalent" type math, only shown on annual.
function equivalentMonthly(annualPrice: number): string {
  return (annualPrice / 12).toFixed(2);
}

export function HomePricing() {
  // Annual preselected — 30-50% lift on annual conversion per published
  // SaaS pricing experiments. Users who want monthly toggle deliberately.
  const [interval, setInterval] = useState<Interval>("annual");

  return (
    <section id="pricing" className="border-b border-rule">
      <div className="mx-auto max-w-6xl px-6 py-10 sm:py-12">
        <p className="label mb-3">§ 05 · Subscription</p>
        <h2 className="mb-3 max-w-2xl">
          Simple pricing. <em className="text-terra">Cancel in one click.</em>
        </h2>
        <p className="text-slate max-w-prose mb-6">
          Try it free — three full analyses, no signup. Upgrade only if you'd
          actually use it month after month.
        </p>

        {/* Monthly / Annual toggle.
            Pure CSS sliding indicator: a single absolutely-positioned pill
            translates between the two halves on click. Subtle but premium —
            users notice the motion without it being a distraction. */}
        <div
          role="tablist"
          aria-label="Billing interval"
          className="inline-flex relative border border-rule rounded-full p-1 bg-paper-light mb-8"
        >
          {/* Sliding indicator behind the active tab */}
          <span
            aria-hidden
            className="absolute top-1 bottom-1 w-[calc(50%-0.25rem)] rounded-full bg-ink transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              transform: interval === "annual" ? "translateX(100%)" : "translateX(0)",
            }}
          />
          <button
            role="tab"
            type="button"
            aria-selected={interval === "monthly"}
            onClick={() => setInterval("monthly")}
            className={`relative z-10 px-5 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
              interval === "monthly" ? "text-paper-light" : "text-slate hover:text-ink"
            }`}
          >
            Monthly
          </button>
          <button
            role="tab"
            type="button"
            aria-selected={interval === "annual"}
            onClick={() => setInterval("annual")}
            className={`relative z-10 px-5 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${
              interval === "annual" ? "text-paper-light" : "text-slate hover:text-ink"
            }`}
          >
            Annual
            <span
              className={`text-xs font-mono ${
                interval === "annual" ? "text-terra" : "text-terra"
              }`}
            >
              −{ANNUAL_DISCOUNT_PERCENT}%
            </span>
          </button>
        </div>

        {/* THREE CARDS — stacks on mobile, side-by-side on sm+.
            Premium card uses 2px terracotta border (the only colored
            border on the page) so the eye lands on it first. */}
        <div className="grid sm:grid-cols-3 gap-5">
          {TIERS.map((tier) => {
            const price = tier.price[interval];
            const period = tier.period[interval];
            const isFree = tier.id === "free";
            const showEquivalent = !isFree && interval === "annual";
            return (
              <article
                key={tier.id}
                className={`flex flex-col rounded-3xl p-7 bg-paper-light transition-all duration-300 ${
                  tier.recommended
                    ? "border-2 border-terra shadow-[0_2px_24px_-12px] shadow-terra/40 relative"
                    : "border border-rule hover:border-ink/30"
                }`}
              >
                {tier.recommended && (
                  <span className="absolute -top-3 left-7 inline-flex items-center bg-terra text-paper-light text-[10px] font-mono uppercase tracking-[0.15em] px-3 py-1 rounded-full">
                    Recommended
                  </span>
                )}

                <div className="mb-6">
                  <p className="font-serif text-xl">{tier.name}</p>
                  <p className="label mt-0.5">{tier.tagline}</p>
                </div>

                {/* Price block. Uses Newsreader serif for the number
                    + a subtle key-based transition wrapper so the number
                    visibly "swaps" when the toggle flips. */}
                <div className="mb-6" key={`${tier.id}-${interval}`}>
                  <div className="flex items-baseline gap-1.5 animate-[fadeIn_200ms_ease-out]">
                    <span className="font-serif text-5xl tracking-tight">
                      ${isFree ? "0" : price.toFixed(2).replace(/\.00$/, "")}
                    </span>
                    <span className="text-slate text-sm font-mono">
                      / {period}
                    </span>
                  </div>
                  {showEquivalent && (
                    <p className="text-xs text-slate-soft font-mono mt-1.5">
                      ${equivalentMonthly(price)}/mo equivalent · billed yearly
                    </p>
                  )}
                  {isFree && (
                    <p className="text-xs text-slate-soft font-mono mt-1.5">
                      No credit card · no signup
                    </p>
                  )}
                  {!isFree && !showEquivalent && (
                    <p className="text-xs text-slate-soft font-mono mt-1.5">
                      Cancel anytime · no contract
                    </p>
                  )}
                </div>

                <ul className="space-y-2.5 text-sm text-ink mb-8 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <span className="text-terra font-mono text-xs mt-1">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={tier.cta.href}
                  className={`btn w-full justify-center ${
                    tier.recommended ? "" : "btn-light"
                  }`}
                >
                  {tier.cta.label} →
                </a>
              </article>
            );
          })}
        </div>

        {/* Trust strip — small reassurance row under the cards. */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-3 text-xs font-mono text-slate-soft border-t border-rule pt-6">
          <p>· Same Claude Sonnet 4.6 on every plan</p>
          <p>· 7-day refund window on first charge</p>
          <p>· Cancel anytime — one click</p>
          <p>· Your data never trains AI models</p>
        </div>
      </div>
    </section>
  );
}
