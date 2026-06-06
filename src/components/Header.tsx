// Editorial nav — logo on left, Blog + Pricing text links on sm+, single
// "Try it" CTA always visible. Mobile shows just logo + CTA.
import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-rule">
      <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between gap-6">
        <Link href="/" className="font-serif text-xl tracking-tight whitespace-nowrap">
          PetTranslator<span className="text-terra">.ai</span>
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/blog"
            className="hidden sm:inline hover:text-terra transition"
          >
            Blog
          </Link>
          <Link
            href="/pricing"
            className="hidden sm:inline hover:text-terra transition"
          >
            Pricing
          </Link>
          <a
            href="https://app.pettranslator.ai/analyze"
            className="btn"
          >
            Try it →
          </a>
        </nav>
      </div>
    </header>
  );
}
