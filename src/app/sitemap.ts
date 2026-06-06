import type { MetadataRoute } from "next";
import {
  getAllPosts,
  getAllCategories,
  getPublishedTagSlugs,
  getAuthorSlugs,
} from "@/lib/content";

// Force static generation — required because we use `output: "export"`.
export const dynamic = "force-static";

const BASE = "https://pettranslator.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static high-priority pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
  ];

  // Articles
  const posts = getAllPosts().map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Categories
  const categories = getAllCategories().map((c) => ({
    url: `${BASE}/blog/category/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // Tags — ONLY those that meet the publish threshold (≥4 articles).
  // Below-threshold tags exist in the DB but don't get sitemap entries.
  const tags = getPublishedTagSlugs().map((slug) => ({
    url: `${BASE}/blog/tag/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  // Authors
  const authors = getAuthorSlugs().map((slug) => ({
    url: `${BASE}/blog/author/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.4,
  }));

  return [...staticPages, ...posts, ...categories, ...tags, ...authors];
}
