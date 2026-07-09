import Link from "next/link";

// No mt-* on the footer below — its own border-t + internal py-12
// already provide enough visual separation from the page above.
// Previously mt-24 stacked on top of main's sm:py-20 bottom padding
// to produce ~220px of dead space before the footer columns appeared.
export function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto max-w-6xl px-6 py-12 grid sm:grid-cols-4 gap-8 text-sm">
        <div>
          <p className="font-serif text-lg mb-2">
            PetTranslator<span className="text-terra">.ai</span>
          </p>
          <p className="text-slate text-xs leading-relaxed max-w-xs">
            Premium behavioral analysis for dog and cat owners. Not a substitute
            for a veterinarian.
          </p>
        </div>

        <div>
          <p className="label mb-3">Product</p>
          <ul className="space-y-1.5 text-slate">
            <li><a href="https://app.pettranslator.ai/analyze" className="hover:text-terra">Try the analyzer</a></li>
            <li><Link href="/pricing" className="hover:text-terra">Pricing</Link></li>
            <li><a href="https://app.pettranslator.ai/login" className="hover:text-terra">Sign in</a></li>
          </ul>
        </div>

        <div>
          <p className="label mb-3">Blog</p>
          <ul className="space-y-1.5 text-slate">
            <li><Link href="/blog" className="hover:text-terra">All articles</Link></li>
            <li><Link href="/blog/category/dog-behavior" className="hover:text-terra">Dog behavior</Link></li>
            <li><Link href="/blog/category/cat-behavior" className="hover:text-terra">Cat behavior</Link></li>
            <li><Link href="/blog/category/training-science" className="hover:text-terra">Training science</Link></li>
          </ul>
        </div>

        <div>
          <p className="label mb-3">Company</p>
          <ul className="space-y-1.5 text-slate">
            <li><Link href="/blog/author/khabir-mughal" className="hover:text-terra">About the founder</Link></li>
            <li><a href="mailto:hello@pettranslator.ai" className="hover:text-terra">hello@pettranslator.ai</a></li>
            <li><Link href="/refund-policy" className="hover:text-terra">Refund policy</Link></li>
            <li><Link href="/terms" className="hover:text-terra">Terms</Link></li>
            <li><Link href="/privacy" className="hover:text-terra">Privacy</Link></li>
          </ul>
        </div>
      </div>
      {/* Social row — hairline-bordered band above the copyright. Mono
          labels in slate, hover terra. Order: highest-discovery-value
          first (X for share-of-voice, Pinterest for visual-search SEO,
          then long-form on Substack/Quora, community on Reddit, paid
          social on Facebook). The href list also feeds the JSON-LD
          sameAs in app/layout.tsx so the entity graph stays in sync. */}
      <div className="border-t border-rule">
        <div className="mx-auto max-w-6xl px-6 py-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-mono text-slate-soft">
          <span className="uppercase tracking-[0.12em]">Follow</span>
          <a
            href="https://www.linkedin.com/company/pettranslator-ai"
            target="_blank"
            rel="me noopener"
            className="hover:text-terra"
          >
            LinkedIn
          </a>
          <a
            href="https://x.com/Petranslatorai"
            target="_blank"
            rel="me noopener"
            className="hover:text-terra"
          >
            X / Twitter
          </a>
          <a
            href="https://www.pinterest.com/pettranslatorai/"
            target="_blank"
            rel="me noopener"
            className="hover:text-terra"
          >
            Pinterest
          </a>
          <a
            href="https://pettranslatorai.substack.com/"
            target="_blank"
            rel="me noopener"
            className="hover:text-terra"
          >
            Substack
          </a>
          <a
            href="https://www.quora.com/profile/Pet-Translator-Ai"
            target="_blank"
            rel="me noopener"
            className="hover:text-terra"
          >
            Quora
          </a>
          <a
            href="https://www.reddit.com/user/Vegetable-Sherbet-14/"
            target="_blank"
            rel="me noopener"
            className="hover:text-terra"
          >
            Reddit
          </a>
          <a
            href="https://www.facebook.com/Pettranslatorai/"
            target="_blank"
            rel="me noopener"
            className="hover:text-terra"
          >
            Facebook
          </a>
        </div>
      </div>
      <div className="border-t border-rule">
        <div className="mx-auto max-w-6xl px-6 py-4 text-xs font-mono text-slate-soft flex flex-wrap justify-between gap-2">
          <p>© {new Date().getFullYear()} PetTranslator.ai</p>
          <p>AVSAB-aligned · Force-free · Built solo by Khabir Mughal</p>
        </div>
      </div>
    </footer>
  );
}
