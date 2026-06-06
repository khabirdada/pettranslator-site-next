import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPosts, getPost, getPostSlugs, getAuthor, getCategory } from "@/lib/content";

// Pre-render all article URLs at build time (static export).
export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = `https://pettranslator.ai/blog/${slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      tags: post.tags,
      images: post.heroImage ? [{ url: post.heroImage, alt: post.heroAlt }] : undefined,
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  // Dynamic import of the MDX content. Webpack statically analyzes the
  // template literal and bundles every matching .mdx file in src/content/posts/.
  const { default: Content } = await import(`@/content/posts/${slug}.mdx`);

  const author = getAuthor(post.author);
  const category = getCategory(post.category);

  // Sibling articles in the same category — used in related-articles below.
  const related = getAllPosts()
    .filter((p) => p.category === post.category && p.slug !== slug)
    .slice(0, 4);

  const url = `https://pettranslator.ai/blog/${slug}`;

  return (
    <>
      {/* Article + BreadcrumbList JSON-LD per page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Article",
                "@id": `${url}#article`,
                headline: post.title,
                description: post.description,
                datePublished: post.publishedAt,
                dateModified: post.updatedAt,
                author: author
                  ? {
                      "@type": "Person",
                      name: author.name,
                      url: `https://pettranslator.ai/blog/author/${author.slug}`,
                    }
                  : undefined,
                publisher: { "@id": "https://pettranslator.ai/#organization" },
                image: post.heroImage
                  ? `https://pettranslator.ai${post.heroImage}`
                  : undefined,
                mainEntityOfPage: url,
                articleSection: category?.name,
                keywords: post.tags.join(", "),
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://pettranslator.ai/",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Blog",
                    item: "https://pettranslator.ai/blog",
                  },
                  category && {
                    "@type": "ListItem",
                    position: 3,
                    name: category.name,
                    item: `https://pettranslator.ai/blog/category/${category.slug}`,
                  },
                  {
                    "@type": "ListItem",
                    position: category ? 4 : 3,
                    name: post.title,
                  },
                ].filter(Boolean),
              },
            ],
          }),
        }}
      />

      <main className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
        {/* Breadcrumb */}
        <nav className="label mb-6 flex gap-2 flex-wrap text-slate-soft">
          <Link href="/blog" className="hover:text-terra">Blog</Link>
          <span>/</span>
          {category && (
            <>
              <Link
                href={`/blog/category/${category.slug}`}
                className="hover:text-terra"
              >
                {category.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-slate">{post.title.split(":")[0]}</span>
        </nav>

        <header className="mb-12">
          <h1 className="mb-5">{post.title}</h1>
          <p className="text-slate text-lg leading-relaxed max-w-prose mb-6">
            {post.description}
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs font-mono text-slate-soft">
            {author && (
              <Link
                href={`/blog/author/${author.slug}`}
                className="hover:text-terra"
              >
                By {author.name}
              </Link>
            )}
            <span>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span>{post.readingTime} read</span>
          </div>
        </header>

        {/* The MDX body — picks up TryItCTA, Callout via mdx-components.tsx */}
        <article className="prose-editorial">
          <Content />
        </article>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mt-12 pt-6 border-t border-rule flex flex-wrap gap-2">
            <span className="label">Tags</span>
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tag/${tag}`}
                className="text-xs font-mono text-slate hover:text-terra"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}

        {/* Related articles in the same category */}
        {related.length > 0 && (
          <section className="mt-16 pt-8 border-t border-rule">
            <p className="label mb-5">From our {category?.name ?? "journal"}</p>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-5">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/blog/${r.slug}`}
                    className="group block"
                  >
                    <p className="label mb-1">{r.readingTime}</p>
                    <h4 className="font-serif text-base leading-snug group-hover:text-terra transition">
                      {r.title}
                    </h4>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </>
  );
}
