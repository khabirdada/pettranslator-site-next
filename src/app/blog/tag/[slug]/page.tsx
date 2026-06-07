import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getPublishedTagSlugs,
  getTag,
  getPostsByTag,
  heroImageExists,
} from "@/lib/content";
import { ClampDescription } from "@/components/blog/ClampDescription";

// Only generate routes for tags that BOTH meet the threshold AND have
// a backing MDX file with rich intro content. Above-threshold tags without
// MDX descriptions (e.g. behavior-questions, training-science) stay
// unsurfaced — they exist in article frontmatter but don't get their own
// page until we write the intro copy for them.
export async function generateStaticParams() {
  return getPublishedTagSlugs()
    .filter((slug) => getTag(slug) !== null)
    .map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = getTag(slug);
  if (!tag) return {};
  return {
    // `absolute` bypasses the root layout's `%s | PetTranslator.ai` template —
    // tag seo_title already ends with "| PetTranslator.ai" in MDX.
    title: { absolute: tag.seo_title },
    description: tag.meta_description,
    alternates: { canonical: `/blog/tag/${slug}` },
  };
}

export default async function TagPage({ params }: PageProps) {
  const { slug } = await params;
  const tag = getTag(slug);
  if (!tag) notFound();
  const posts = getPostsByTag(slug);
  const url = `https://pettranslator.ai/blog/tag/${slug}`;

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "CollectionPage",
                "@id": `${url}#collection`,
                name: tag.name,
                description: tag.meta_description,
                url,
                isPartOf: { "@id": "https://pettranslator.ai/blog#blog" },
                publisher: { "@id": "https://pettranslator.ai/#organization" },
                mainEntity: {
                  "@type": "ItemList",
                  numberOfItems: posts.length,
                  itemListElement: posts.slice(0, 30).map((p, i) => ({
                    "@type": "ListItem",
                    position: i + 1,
                    url: `https://pettranslator.ai/blog/${p.slug}`,
                    name: p.title,
                  })),
                },
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://pettranslator.ai/" },
                  { "@type": "ListItem", position: 2, name: "Blog", item: "https://pettranslator.ai/blog" },
                  { "@type": "ListItem", position: 3, name: tag.name },
                ],
              },
            ],
          }),
        }}
      />

      <main className="mx-auto max-w-5xl px-6 py-12 sm:py-20">
        <nav className="label mb-4 flex gap-2 text-slate-soft" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-terra">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-terra">Blog</Link>
          <span>/</span>
          <span className="text-slate">{tag.name}</span>
        </nav>

        <p className="label mb-3">§ Tag</p>
        <h1 className="mb-6">{tag.name}</h1>

        <ClampDescription>
          {tag.body
            .trim()
            .split(/\n\s*\n/)
            .map((para, i) => (
              <p key={i} className="mb-4">
                {para}
              </p>
            ))}
        </ClampDescription>

        <h2 className="label mb-5 font-mono normal-case tracking-wider text-slate-soft">
          {posts.length} {posts.length === 1 ? "article" : "articles"}
        </h2>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="aspect-[16/10] rounded-2xl bg-paper-deep mb-4 overflow-hidden">
                  {heroImageExists(post.heroImage) ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.heroImage}
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
                <h3 className="font-serif text-lg leading-tight mb-2 group-hover:text-terra transition">
                  {post.title}
                </h3>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
