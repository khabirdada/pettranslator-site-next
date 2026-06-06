// Content loader for MDX blog posts, categories, tags, author bios.
// Reads frontmatter from src/content/* at build time (static-export friendly).
//
// Tag-publish threshold: tags with fewer than TAG_THRESHOLD articles
// are stored in the DB but NOT surfaced as pages. Keeps tag pages from
// being thin-content.

import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const TAG_THRESHOLD = 4;

const ROOT = process.cwd();
const POSTS_DIR = path.join(ROOT, "src/content/posts");
const CATEGORIES_DIR = path.join(ROOT, "src/content/categories");
const TAGS_DIR = path.join(ROOT, "src/content/tags");
const AUTHOR_DIR = path.join(ROOT, "src/content/author");

// ─── Types ──────────────────────────────────────────────────────────────────

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt: string;
  updatedAt: string;
  heroImage: string;
  heroAlt: string;
  readingTime: string;
}

export interface CategoryMeta {
  slug: string;
  name: string;
  seo_title: string;
  meta_description: string;
  order?: number;
  body: string; // the intro body text
}

export interface TagMeta {
  slug: string;
  name: string;
  seo_title: string;
  meta_description: string;
  article_count_at_publish: number;
  body: string;
}

export interface AuthorMeta {
  slug: string;
  name: string;
  role: string;
  photo: string;
  photoAlt: string;
  email: string;
  sameAs?: string[];
  body: string;
}

// ─── Posts ──────────────────────────────────────────────────────────────────

let _postsCache: PostMeta[] | null = null;

function readFrontmatter<T>(filepath: string): { data: T; body: string } {
  const raw = fs.readFileSync(filepath, "utf-8");
  const parsed = matter(raw);
  return { data: parsed.data as T, body: parsed.content };
}

export function getAllPosts(): PostMeta[] {
  if (_postsCache) return _postsCache;
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));
  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const { data } = readFrontmatter<Omit<PostMeta, "slug">>(
      path.join(POSTS_DIR, file),
    );
    return { slug, ...data } as PostMeta;
  });
  // Newest first by publishedAt
  posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
  _postsCache = posts;
  return posts;
}

export function getPost(slug: string): PostMeta | null {
  return getAllPosts().find((p) => p.slug === slug) ?? null;
}

export function getPostSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

export function getPostsByCategory(categorySlug: string): PostMeta[] {
  return getAllPosts().filter((p) => p.category === categorySlug);
}

export function getPostsByTag(tagSlug: string): PostMeta[] {
  return getAllPosts().filter((p) => p.tags.includes(tagSlug));
}

export function getPostsByAuthor(authorSlug: string): PostMeta[] {
  return getAllPosts().filter((p) => p.author === authorSlug);
}

// ─── Categories ────────────────────────────────────────────────────────────

export function getAllCategories(): CategoryMeta[] {
  if (!fs.existsSync(CATEGORIES_DIR)) return [];
  const files = fs.readdirSync(CATEGORIES_DIR).filter((f) => f.endsWith(".mdx"));
  const cats = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const { data, body } = readFrontmatter<Omit<CategoryMeta, "slug" | "body">>(
      path.join(CATEGORIES_DIR, file),
    );
    return { slug, ...data, body } as CategoryMeta;
  });
  cats.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
  return cats;
}

export function getCategory(slug: string): CategoryMeta | null {
  return getAllCategories().find((c) => c.slug === slug) ?? null;
}

// ─── Tags ──────────────────────────────────────────────────────────────────

/**
 * Returns ALL tags from articles (count > 0).
 * Use getPublishedTags() if you want only the ones above threshold.
 */
export function getAllTagCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      counts[tag] = (counts[tag] ?? 0) + 1;
    }
  }
  return counts;
}

/**
 * Returns tags that meet the publish threshold (≥ TAG_THRESHOLD articles).
 * These are the only ones that get tag pages + sitemap entries.
 */
export function getPublishedTagSlugs(): string[] {
  const counts = getAllTagCounts();
  return Object.entries(counts)
    .filter(([, count]) => count >= TAG_THRESHOLD)
    .map(([slug]) => slug);
}

export function getTag(slug: string): TagMeta | null {
  // Only return if the tag file exists AND it meets threshold.
  if (!getPublishedTagSlugs().includes(slug)) return null;
  const filepath = path.join(TAGS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filepath)) return null;
  const { data, body } = readFrontmatter<Omit<TagMeta, "slug" | "body">>(filepath);
  return { slug, ...data, body } as TagMeta;
}

// ─── Author ────────────────────────────────────────────────────────────────

export function getAuthor(slug: string): AuthorMeta | null {
  const filepath = path.join(AUTHOR_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filepath)) return null;
  const { data, body } = readFrontmatter<Omit<AuthorMeta, "slug" | "body">>(filepath);
  return { slug, ...data, body } as AuthorMeta;
}

export function getAuthorSlugs(): string[] {
  if (!fs.existsSync(AUTHOR_DIR)) return [];
  return fs
    .readdirSync(AUTHOR_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}
