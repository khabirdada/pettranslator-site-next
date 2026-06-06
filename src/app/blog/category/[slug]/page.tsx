import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllCategories,
  getCategory,
  getPostsByCategory,
} from "@/lib/content";
import { ClampDescription } from "@/components/blog/ClampDescription";

export async function generateStaticParams() {
  return getAllCategories().map((c) => ({ slug: c.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) return {};
  return {
    title: cat.seo_title,
    description: cat.meta_description,
    alternates: { canonical: `/blog/category/${slug}` },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const cat = getCategory(slug);
  if (!cat) notFound();
  const posts = getPostsByCategory(slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: cat.name,
            description: cat.meta_description,
            url: `https://pettranslator.ai/blog/category/${slug}`,
          }),
        }}
      />

      <main className="mx-auto max-w-5xl px-6 py-12 sm:py-20">
        <p className="label mb-3">§ Category</p>
        <h1 className="mb-6">{cat.name}</h1>

        {/* Full intro body is rendered as text below. Clamped to 2 visible lines
            via CSS; "See more" expands. Full content is always in the DOM
            so Google indexes everything. */}
        <ClampDescription>
          {cat.body
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
                <p className="label mb-1">{post.readingTime}</p>
                <h3 className="font-serif text-lg leading-tight mb-2 group-hover:text-terra transition">
                  {post.title}
                </h3>
                <p className="text-slate text-sm leading-relaxed line-clamp-3">
                  {post.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
