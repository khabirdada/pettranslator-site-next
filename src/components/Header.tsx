// Editorial nav — minimal, 3 blog categories under one dropdown to keep
// the bar from getting crowded. The "Try it" CTA links to the app subdomain.
import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-rule">
      <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">
        <Link href="/" className="font-serif text-xl tracking-tight">
          PetTranslator<span className="text-terra">.ai</span>
        </Link>

        <nav className="hidden sm:flex items-center gap-7 text-sm">
          <Link href="/blog" className="hover:text-terra transition">
            Blog
          </Link>
          <Link href="/pricing" className="hover:text-terra transition">
            Pricing
          </Link>
          <a
            href="https://app.pettranslator.ai/analyze"
            className="btn"
          >
            Try it →
          </a>
        </nav>

        {/* Mobile: stash full nav inside the Try-it CTA target page for now;
            v1.1 will add a hamburger if needed. */}
        <a
          href="https://app.pettranslator.ai/analyze"
          className="sm:hidden btn"
        >
          Try it →
        </a>
      </div>
    </header>
  );
}
