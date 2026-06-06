// Uniform "try the analyzer" CTA used at the end of every article.
// Brand-consistent. Routes to the app subdomain.
export function TryItCTA() {
  return (
    <aside className="not-prose my-12 border border-terra rounded-3xl p-7 bg-paper-light">
      <p className="label mb-3" style={{ color: "var(--terra)" }}>
        Try it on your own pet
      </p>
      <h3 className="mb-3 text-xl">
        Read your pet — <em className="text-terra">properly</em>.
      </h3>
      <p className="text-slate text-sm leading-relaxed mb-5 max-w-prose">
        Upload one clear photo of your dog or cat. In about ten seconds, the AI
        returns a structured behavioral report drawing on the same framework
        this article describes. Three free analyses to start, no credit card.
      </p>
      <a
        href="https://app.pettranslator.ai/analyze"
        className="btn"
      >
        Start with 3 free →
      </a>
    </aside>
  );
}
