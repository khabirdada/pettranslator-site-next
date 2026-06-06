import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getPublishedTagSlugs,
  getTag,
  getPostsByTag,
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: tag.name,
            description: tag.meta_description,
            url: `https://pettranslator.ai/blog/tag/${slug}`,
          }),
        }}
      />

      <main className="mx-auto max-w-5xl px-6 py-12 sm:py-20">
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

        <p className="label mb-5">{posts.length} {posts.length === 1 ? "article" : "articles"}</p>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="aspect-[16/10] rounded-2xl bg-paper-deep mb-4 flex items-center justify-center text-slate-soft text-xs font-mono">
                  {post.heroImage ? "image" : "—"}
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
