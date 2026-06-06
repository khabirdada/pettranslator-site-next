import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts, getAllCategories } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog — Pet Behavior, Body Language, and Training Science",
  description:
    "Behaviorist-grade guides to dog and cat body language, stress signals, training science, and the real meanings behind your pet's behavior. AVSAB-aligned, force-free.",
  alternates: { canonical: "/blog" },
};

export default function BlogHubPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  // Pillar posts get top billing; cluster posts below.
  const isPillar = (slug: string) =>
    slug === "dog-body-language" ||
    slug === "cat-body-language" ||
    slug === "do-pet-translator-apps-work";
  const pillars = posts.filter((p) => isPillar(p.slug));
  const rest = posts.filter((p) => !isPillar(p.slug));

  return (
    <main className="mx-auto max-w-5xl px-6 py-12 sm:py-20">
      <p className="label mb-3">§ Blog</p>
      <h1 className="mb-4">
        Behavior <em className="text-terra">notes</em>.
      </h1>
      <p className="text-slate max-w-prose text-lg leading-relaxed mb-12">
        Behaviorist-grade guides to dog and cat body language, stress signals,
        and the science behind what your pet is actually communicating. Every
        article cites primary sources. No dominance theory.
      </p>

      {/* Category nav strip */}
      <nav className="flex flex-wrap gap-3 mb-12">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/blog/category/${cat.slug}`}
            className="inline-flex items-center gap-2 border border-rule rounded-full px-4 py-2 text-sm hover:border-terra hover:text-terra transition"
          >
            {cat.name}
          </Link>
        ))}
      </nav>

      {/* Pillars — top billing */}
      {pillars.length > 0 && (
        <section className="mb-16">
          <p className="label mb-5">Foundation guides</p>
          <div className="grid sm:grid-cols-3 gap-6">
            {pillars.map((post) => (
              <ArticleCard key={post.slug} post={post} variant="pillar" />
            ))}
          </div>
        </section>
      )}

      {/* All other articles */}
      <section>
        <p className="label mb-5">All articles ({rest.length})</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {rest.map((post) => (
            <ArticleCard key={post.slug} post={post} variant="cluster" />
          ))}
        </div>
      </section>
    </main>
  );
}

function ArticleCard({
  post,
  variant,
}: {
  post: ReturnType<typeof getAllPosts>[number];
  variant: "pillar" | "cluster";
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block"
    >
      <div
        className={`aspect-[16/10] rounded-2xl bg-paper-deep mb-4 overflow-hidden ${
          variant === "pillar" ? "ring-1 ring-terra/30" : ""
        }`}
      >
        {/* Hero image placeholder — real images go in /public/blog/heroes/ */}
        <div className="w-full h-full flex items-center justify-center text-slate-soft text-xs font-mono">
          {post.heroImage ? "image" : "—"}
        </div>
      </div>
      <p className="label mb-1">
        {post.category} · {post.readingTime}
      </p>
      <h3
        className={`font-serif leading-tight mb-2 group-hover:text-terra transition ${
          variant === "pillar" ? "text-xl" : "text-lg"
        }`}
      >
        {post.title}
      </h3>
      <p className="text-slate text-sm leading-relaxed line-clamp-3">
        {post.description}
      </p>
    </Link>
  );
}
