import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-rule mt-24">
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
            <li><Link href="/blog/author/khabir-neelum" className="hover:text-terra">About the founder</Link></li>
            <li><a href="mailto:hello@pettranslator.ai" className="hover:text-terra">hello@pettranslator.ai</a></li>
            <li><Link href="/refund-policy" className="hover:text-terra">Refund policy</Link></li>
            <li><Link href="/terms" className="hover:text-terra">Terms</Link></li>
            <li><Link href="/privacy" className="hover:text-terra">Privacy</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-rule">
        <div className="mx-auto max-w-6xl px-6 py-4 text-xs font-mono text-slate-soft flex flex-wrap justify-between gap-2">
          <p>© {new Date().getFullYear()} PetTranslator.ai</p>
          <p>AVSAB-aligned · Force-free · Built solo by Khabir Neelum</p>
        </div>
      </div>
    </footer>
  );
}
