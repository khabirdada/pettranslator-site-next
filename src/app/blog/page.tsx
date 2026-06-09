import Link from "next/link";
import type { Metadata } from "next";
import {
  getAllPosts,
  getAllCategories,
  heroImageExists,
  heroCardSrc,
} from "@/lib/content";

export const metadata: Metadata = {
  // Base title is ≤41 chars so the layout's ` | PetTranslator.ai`
  // suffix (19c) keeps the rendered SERP title under Google's
  // ~60c truncation threshold.
  title: "Blog — Behavior, Body Language, Training",
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

  // Blog schema gives Google + AI search engines a structured graph of
  // every article on the hub — improves indexing and AI-citation odds.
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": "https://pettranslator.ai/blog#blog",
    name: "PetTranslator.ai — Behavior Notes",
    description:
      "Behaviorist-grade guides to dog and cat body language, stress signals, and training science.",
    url: "https://pettranslator.ai/blog",
    publisher: { "@id": "https://pettranslator.ai/#organization" },
    blogPost: posts.slice(0, 30).map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      url: `https://pettranslator.ai/blog/${p.slug}`,
      datePublished: p.publishedAt,
      dateModified: p.updatedAt,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://pettranslator.ai/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://pettranslator.ai/blog" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="mx-auto max-w-5xl px-6 py-12 sm:py-20">
        <nav className="label mb-4 flex gap-2 text-slate-soft">
          <Link href="/" className="hover:text-terra">Home</Link>
          <span>/</span>
          <span>Blog</span>
        </nav>

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
        <nav className="flex flex-wrap gap-3 mb-12" aria-label="Categories">
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

        {/* Pillars — top billing. h2 promotes section in document outline
            for screen readers + search engines (was a styled <p> before). */}
        {pillars.length > 0 && (
          <section className="mb-16">
            <h2 className="label mb-5 font-mono normal-case tracking-wider text-slate-soft">
              Foundation guides
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {pillars.map((post) => (
                <ArticleCard key={post.slug} post={post} variant="pillar" />
              ))}
            </div>
          </section>
        )}

        {/* All other articles */}
        <section>
          <h2 className="label mb-5 font-mono normal-case tracking-wider text-slate-soft">
            All articles ({rest.length})
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {rest.map((post) => (
              <ArticleCard key={post.slug} post={post} variant="cluster" />
            ))}
          </div>
        </section>
      </main>
    </>
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
        {/* Real hero if the WebP exists on disk at build time; placeholder
            otherwise (article shipped before its Midjourney hero landed). */}
        {heroImageExists(post.heroImage) ? (
          // srcset gives the browser the small 600w card for mobile/retina
          // and the full 1376w only when a really wide grid demands it.
          // Static export → plain <img>, served from Vercel's CDN.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={heroCardSrc(post.heroImage) ?? post.heroImage}
            srcSet={`${heroCardSrc(post.heroImage) ?? post.heroImage} 600w, ${post.heroImage} 1376w`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            alt={post.heroAlt}
            width={1376}
            height={768}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-soft text-xs font-mono">
            —
          </div>
        )}
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
