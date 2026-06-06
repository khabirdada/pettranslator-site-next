import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAuthor, getAuthorSlugs, getPostsByAuthor } from "@/lib/content";

export async function generateStaticParams() {
  return getAuthorSlugs().map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) return {};
  // role like "Founder, PetTranslator.ai" already contains the brand —
  // strip duplicate brand mentions from the description so it doesn't
  // read "Founder, PetTranslator.ai of PetTranslator.ai".
  const cleanRole = author.role.replace(/,?\s*PetTranslator\.ai\s*$/i, "").trim();
  const descRole = cleanRole || author.role;
  return {
    // `absolute` bypasses the root layout's `%s | PetTranslator.ai` template
    // because we want full control of the author title format.
    title: { absolute: `${author.name} — ${author.role} | PetTranslator.ai` },
    description: `Behaviorist-grade pet behavior writing by ${author.name}, ${descRole} at PetTranslator.ai.`,
    alternates: { canonical: `/blog/author/${slug}` },
  };
}

export default async function AuthorPage({ params }: PageProps) {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) notFound();
  const posts = getPostsByAuthor(slug);
  const authorUrl = `https://pettranslator.ai/blog/author/${slug}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "@id": `${authorUrl}#person`,
            name: author.name,
            url: authorUrl,
            jobTitle: author.role,
            email: author.email,
            image: author.photo
              ? `https://pettranslator.ai${author.photo}`
              : undefined,
            worksFor: { "@id": "https://pettranslator.ai/#organization" },
            sameAs: author.sameAs,
          }),
        }}
      />

      <main className="mx-auto max-w-3xl px-6 py-12 sm:py-20">
        <p className="label mb-3">§ Author</p>
        <h1 className="mb-3">{author.name}</h1>
        <p className="label text-slate mb-10">{author.role}</p>

        <div className="prose-editorial mb-12">
          {author.body
            .trim()
            .split(/\n\s*\n/)
            .map((para, i) => (
              <p key={i}>{para}</p>
            ))}
        </div>

        <p className="label mb-5">{posts.length} {posts.length === 1 ? "article" : "articles"}</p>
        <ul className="border-t border-rule">
          {posts.map((post) => (
            <li key={post.slug} className="border-b border-rule">
              <Link
                href={`/blog/${post.slug}`}
                className="flex items-baseline justify-between py-4 hover:text-terra transition"
              >
                <span className="font-serif text-lg leading-snug">{post.title}</span>
                <span className="label whitespace-nowrap ml-4">
                  {new Date(post.publishedAt).toLocaleDateString()}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
