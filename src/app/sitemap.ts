import type { MetadataRoute } from "next";
import {
  getAllPosts,
  getAllCategories,
  getPublishedTagSlugs,
  getAuthorSlugs,
  getPostsByAuthor,
  getPostsByCategory,
  getPostsByTag,
} from "@/lib/content";
import { STATIC_PAGE_LAST_MODIFIED } from "@/content/static-page-dates";

// Force static generation — required because we use `output: "export"`.
export const dynamic = "force-static";

const BASE = "https://pettranslator.ai";

type SitemapEntry = MetadataRoute.Sitemap[number];

function validDate(value: string | undefined): Date | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function latestArticleDate(
  posts: ReturnType<typeof getAllPosts>,
): Date | undefined {
  let latestTimestamp: number | undefined;

  for (const post of posts) {
    const date = validDate(post.updatedAt);
    if (!date) continue;

    const timestamp = date.getTime();
    if (latestTimestamp === undefined || timestamp > latestTimestamp) {
      latestTimestamp = timestamp;
    }
  }

  return latestTimestamp === undefined ? undefined : new Date(latestTimestamp);
}

function sitemapEntry(url: string, lastModified?: string | Date): SitemapEntry {
  return lastModified ? { url, lastModified } : { url };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const allPosts = getAllPosts();

  // Dates for these pages are maintained when their editorial content changes.
  // A deployment on its own must never update their sitemap timestamps.
  const staticPages: MetadataRoute.Sitemap = [
    ...Object.entries(STATIC_PAGE_LAST_MODIFIED).map(([path, lastModified]) =>
      sitemapEntry(`${BASE}${path}`, lastModified),
    ),
    sitemapEntry(`${BASE}/blog`, latestArticleDate(allPosts)),
  ];

  // Articles
  const posts = allPosts.map((post) =>
    sitemapEntry(`${BASE}/blog/${post.slug}`, validDate(post.updatedAt)),
  );

  // Categories
  const categories = getAllCategories().map((category) =>
    sitemapEntry(
      `${BASE}/blog/category/${category.slug}`,
      latestArticleDate(getPostsByCategory(category.slug)),
    ),
  );

  // Tags — ONLY those that meet the publish threshold (≥4 articles).
  // Below-threshold tags exist in the DB but don't get sitemap entries.
  const tags = getPublishedTagSlugs().map((slug) =>
    sitemapEntry(
      `${BASE}/blog/tag/${slug}`,
      latestArticleDate(getPostsByTag(slug)),
    ),
  );

  // Authors
  const authors = getAuthorSlugs().map((slug) =>
    sitemapEntry(
      `${BASE}/blog/author/${slug}`,
      latestArticleDate(getPostsByAuthor(slug)),
    ),
  );

  return [...staticPages, ...posts, ...categories, ...tags, ...authors];
}
