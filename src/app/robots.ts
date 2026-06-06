import type { MetadataRoute } from "next";

// Force static generation — required because we use `output: "export"`.
export const dynamic = "force-static";

// AI crawler opt-in inherited from the original static site.
// Explicitly allow major AI crawlers — we want our content surfaced
// in AI Overviews, ChatGPT, Claude, Perplexity, etc.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // AI crawlers — opted in
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
      { userAgent: "Meta-ExternalAgent", allow: "/" },
    ],
    sitemap: "https://pettranslator.ai/sitemap.xml",
  };
}
