// Homepage — editorial port of the original site/index.html (1,400 lines)
// into Tailwind + React, structured for static export and reusing the
// design tokens from globals.css.
//
// Motion layer (read-progress bar, scroll-triggered reveal, magnetic CTA,
// SVG dial stroke-fill) is intentionally OUT of Sprint 1. Add via a
// separate <MotionLayer /> client component in v1.1 if real-world data
// shows the static version converts poorly.
import Link from "next/link";
import type { Metadata } from "next";
import { HomePricing } from "@/components/HomePricing";

// Homepage gets its own explicit canonical — the root layout sets
// `metadataBase` but Next.js doesn't auto-emit a canonical for the
// homepage unless we declare it here.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      {/* HERO — tighter vertical rhythm. The previous py-16 sm:py-24 left
          ~200px of dead space above the eyebrow on tall viewports. py-10
          sm:py-14 keeps the editorial whitespace feel but lets the hero
          headline land in the first scroll. */}
      <section className="border-b border-rule">
        <div className="mx-auto max-w-6xl px-6 py-10 sm:py-14 grid lg:grid-cols-[1.6fr_1fr] gap-12">
          <div>
            <p className="label mb-4">A scientific instrument for pet owners</p>
            {/* Whitespace between <em> and <span> matters for SEO/a11y:
                <br> inserts a visual line break but no text whitespace, so
                `textContent` and screen readers would read "actuallytrying"
                if we don't include an explicit space. */}
            <h1 className="mb-6">
              Know what your pet is <em>actually</em>{" "}
              <br />
              <span className="text-terra">trying to say.</span>
            </h1>
            <p className="text-slate text-lg leading-relaxed max-w-prose mb-8">
              Upload a photo or short video. A multimodal AI documents visible body-language markers, weighs the context you provide, and turns them into a plain-English observation report with an owner action plan.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://app.pettranslator.ai/analyze"
                className="btn"
              >
                Start with 3 free →
              </a>
              <Link href="/blog" className="btn btn-light">
                Read the journal
              </Link>
            </div>
            <p className="label mt-4 text-xs text-slate-soft">
              No credit card · No signup for the first analysis · AVSAB-aligned
            </p>
          </div>

          <aside className="text-xs font-mono leading-relaxed text-slate border-l border-rule pl-6 self-start">
            <p className="mb-1">Issue №01</p>
            <p className="mb-1">Status · <strong className="text-ink">Live</strong></p>
            <p className="mb-1">Methodology · multimodal AI, AVSAB-aligned</p>
            <p className="mb-1">Focus · canine + feline</p>
            <p className="mb-1">Privacy · <strong className="text-ink">your data never trains AI</strong></p>
            <p>Delivery · ~10 seconds</p>
          </aside>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="border-b border-rule">
        <div className="mx-auto max-w-2xl px-6 py-10 sm:py-12">
          <p className="label mb-4">§ 01 · The premise</p>
          <p className="font-serif text-2xl sm:text-3xl leading-snug text-ink">
            Most "pet translator" apps are entertainment products — cartoon translations that monetize through weekly-trial rugpulls. We built the opposite: a behavioral-observation tool that <em className="text-terra">documents what it sees</em> in your pet's body language, weighs the context you provide, and clearly separates observation from interpretation.
          </p>
          <p className="label mt-6">— Khabir Mughal, founder · {new Date().getFullYear()}</p>
        </div>
      </section>

      {/* THREE PRINCIPLES */}
      <section className="border-b border-rule">
        <div className="mx-auto max-w-6xl px-6 py-10 sm:py-12">
          <p className="label mb-3">§ 02 · How we think about it</p>
          <h2 className="mb-8 max-w-2xl">
            Three principles, applied <em className="text-terra">strictly</em>.
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                num: "i.",
                title: "Observation before interpretation.",
                body: "The model documents tail carriage, ear angle, jaw tension, pupil dilation, posture, and vocal context first — then reasons from there. No cartoon mind-reading. Every report shows the markers it found.",
              },
              {
                num: "ii.",
                title: "Honest confidence, never inflated.",
                body: "Every report carries a confidence score calibrated against signal clarity. Short clip, poor lighting, ambiguous markers — you'll see a lower number, not a confident guess.",
              },
              {
                num: "iii.",
                title: "Behavior, not medicine.",
                body: "If the AI sees signs of pain, illness, or distress that need a veterinarian, it stops and tells you. We are emphatically not a diagnostic tool — and we say so out loud.",
              },
            ].map((p) => (
              <article key={p.num}>
                <div className="font-serif text-terra text-2xl mb-2">{p.num}</div>
                <h3 className="mb-3 text-xl">{p.title}</h3>
                <p className="text-slate text-sm leading-relaxed">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SPECIMEN REPORT */}
      <section className="border-b border-rule">
        <div className="mx-auto max-w-6xl px-6 py-10 sm:py-12">
          <p className="label mb-3">§ 03 · Specimen report</p>
          <h2 className="mb-3 max-w-2xl">
            This is what a <em className="text-terra">real</em> analysis looks like.
          </h2>
          <p className="text-slate max-w-prose mb-6">
            Not "Woof! Feed me!" cartoons. Behavioral signals, mapped to recommendations you can act on today.
          </p>

          <article className="border border-rule rounded-3xl p-8 bg-paper-light">
            <header className="flex flex-wrap items-start justify-between gap-6 mb-8 pb-6 border-b border-rule">
              <div>
                <p className="label mb-2">Report №8492 · Canine</p>
                <h3 className="text-2xl mb-2">
                  Acute environmental <em className="text-terra">stress.</em>
                </h3>
                <p className="text-xs font-mono text-slate-soft">Mixed breed · still image · evening lighting</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="label mb-0.5">Confidence</p>
                  <p className="font-serif text-terra text-2xl leading-none">High</p>
                  <p className="text-xs font-mono text-slate-soft mt-0.5">92% signal agreement</p>
                </div>
              </div>
            </header>

            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <p className="label mb-3">Decoded intent</p>
                <blockquote className="font-serif italic text-lg leading-relaxed border-l-2 border-terra pl-5 mb-8">
                  "This dog appears uncertain and overwhelmed by what's in front of it. The posture suggests holding tension in case of escape need, while displacement signals (yawn, lip-lick) attempt self-regulation. Body language reads: needs space, not engagement."
                </blockquote>

                <div className="border border-rule rounded-2xl p-5 bg-paper">
                  <p className="label mb-2" style={{ color: "var(--terra)" }}>Owner action plan</p>
                  <p className="text-sm text-ink leading-relaxed">
                    This dog is exhibiting classic <em>displacement signals</em> — they're approaching their emotional threshold. Avoid direct eye contact, don't lean over them, give a quiet exit route. Don't force interaction with whatever is currently in front of them.
                  </p>
                </div>
              </div>

              <div>
                <p className="label mb-3">Observed biometric cues</p>
                <ol className="space-y-2 text-sm">
                  {[
                    ["Lip-licking", " absent of food proximity"],
                    ["Yawning", " as physiological displacement"],
                    ["Whale-eye", " with sclera visible at corners"],
                    ["Tense jaw", " with tight commissures"],
                    ["Low-amplitude wag", " held below spine"],
                    ["Weight shifted back", " away from stimulus"],
                  ].map(([bold, rest], i) => (
                    <li key={i} className="font-mono flex gap-3">
                      <span className="text-terra">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-ink">
                        <strong className="font-semibold">{bold}</strong>
                        {rest}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-b border-rule">
        <div className="mx-auto max-w-6xl px-6 py-10 sm:py-12">
          <p className="label mb-3">§ 04 · The process</p>
          <h2 className="mb-8 max-w-2xl">
            Three chapters, about <em className="text-terra">ten seconds.</em>
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                num: "Chapter I — Upload",
                title: <>Snap. <em className="text-terra">Or import.</em></>,
                body: "One clear photo of your dog or cat, from your phone or camera roll. No app to install. Works on every modern browser.",
              },
              {
                num: "Chapter II — Context",
                title: <>One sentence <em className="text-terra">changes everything.</em></>,
                body: "\"Whining near the front door\" means something different from \"whining at an empty food bowl.\" The AI weighs your context, but the physical signals lead.",
              },
              {
                num: "Chapter III — Read",
                title: <>The report, <em className="text-terra">delivered.</em></>,
                body: "Instant observations, behavioral interpretation, confidence score, Do/Avoid action plan — in about ten seconds. PDF-exportable on Premium.",
              },
            ].map((c, i) => (
              <article key={i}>
                <p className="label mb-3">{c.num}</p>
                <h3 className="mb-3 text-xl">{c.title}</h3>
                <p className="text-slate text-sm leading-relaxed">{c.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING — moved to its own client component so the
          monthly/annual toggle can run client-side without making the
          whole homepage a client tree. The Schema.org Offer JSON-LD
          that used to live here now lives on /pricing (canonical) so
          Google doesn't see two competing SoftwareApplication graphs. */}
      <HomePricing />

      {/* FAQ */}
      <section className="border-b border-rule">
        <div className="mx-auto max-w-3xl px-6 py-10 sm:py-12">
          <p className="label mb-3">§ 06 · Common questions</p>
          <h2 className="mb-8">
            You're <em className="text-terra">right</em> to ask.
          </h2>
          <div className="divide-y divide-rule">
            {[
              {
                q: "Is this actually scientific or is the AI making things up?",
                a: "We use multimodal AI prompted with published animal behavioral science. The model identifies physical markers (tail carriage, ear position, jaw tension, posture, lip line) BEFORE generating an interpretation. Every report includes a confidence score calibrated against signal clarity, so you know how clear the read was.",
              },
              {
                q: "Is this a replacement for a vet?",
                a: "Categorically not. PetTranslator.ai is a behavioral analysis tool, not a medical diagnostic. If your pet shows signs of pain, illness, or sudden behavioral change, see a licensed veterinarian. Our PDF export is designed to help that conversation, not replace it.",
              },
              {
                q: "What pets does it work with?",
                a: "Dogs and cats are fully supported. Other companion animals (rabbits, birds, small mammals) follow — we want them right before we ship them.",
              },
              {
                q: "How are my pet's photo or video used?",
                a: "Processed by Anthropic Claude under enterprise privacy terms — your content is never used for AI model training. We do not sell, share, or publish your uploads. You can delete any analysis at any time.",
              },
              {
                q: "What about dominance theory or alpha training?",
                a: "We reject both. AVSAB has explicitly rejected dominance-based training, and the peer-reviewed evidence (Herron 2009, Hiby 2004, China 2020) shows aversive methods increase aggression and worsen behavioral outcomes. Every report is force-free, AVSAB-aligned, and references credentialed behaviorist methodology when professional referral is appropriate.",
              },
              {
                q: "Is there an iOS / Android app?",
                a: "Not yet. The web app works on every modern phone and desktop browser. We'll add native apps once we know which features owners use most.",
              },
            ].map((item, i) => (
              <details key={i} className="py-5 group">
                <summary className="cursor-pointer font-serif text-lg leading-snug list-none flex items-start justify-between gap-4">
                  <span>{item.q}</span>
                  <span className="text-terra text-xl group-open:rotate-45 transition flex-shrink-0">+</span>
                </summary>
                <p className="text-slate text-sm leading-relaxed mt-3 pr-8">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section>
        {/* Closing CTA — previously py-20 sm:py-28 left ~180px of dead
            space stacked on top of FAQ's bottom padding. Pulled in line
            with the other interior sections (py-10 sm:py-12). */}
        <div className="mx-auto max-w-3xl px-6 py-10 sm:py-12 text-center">
          <p className="label mb-3" style={{ color: "var(--terra)" }}>§ 07 · Try it</p>
          <h2 className="mb-6">
            Read your pet, <em className="text-terra">properly.</em>
          </h2>
          <p className="text-slate text-lg leading-relaxed max-w-prose mx-auto mb-8">
            Upload a photo or short video of your dog or cat. In about ten seconds, the AI returns a structured observation report — visible markers, behavioral interpretation, and a Do/Avoid action plan. Three free analyses to start, no signup, no card.
          </p>
          <a
            href="https://app.pettranslator.ai/analyze"
            className="btn"
          >
            Start with 3 free →
          </a>
        </div>
      </section>
    </>
  );
}
