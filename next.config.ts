import type { NextConfig } from "next";

// Next.js 16 defaults to Turbopack. Turbopack and webpack can't share the
// MDX plugin pipeline because function references (remark/rehype plugins)
// can't be serialized across Turbopack's worker boundary. So instead of
// using @next/mdx's `createMDX()` wrapper (which registers a webpack rule
// with non-serializable options), we register the MDX loader manually via
// `turbopack.rules` with string-based plugin references that are
// JSON-serializable.

const nextConfig: NextConfig = {
  // Static export — every page pre-rendered at build time, served from CDN.
  output: "export",

  // Allow .mdx files alongside .tsx as page extensions.
  pageExtensions: ["ts", "tsx", "md", "mdx"],

  trailingSlash: false,

  images: { unoptimized: true },

  typescript: { ignoreBuildErrors: false },

  turbopack: {
    // Pin the workspace root so Next.js doesn't auto-detect the stray
    // /Users/khabiruddin/package-lock.json upstream.
    root: __dirname,
    rules: {
      "*.mdx": {
        loaders: [
          {
            loader: "@mdx-js/loader",
            // Strip the YAML --- block from .mdx files so it doesn't render
            // as body text. gray-matter still parses the frontmatter
            // separately at the lib/content.ts layer for metadata.
            options: {
              remarkPlugins: [["remark-frontmatter", "yaml"]],
            },
          },
        ],
        as: "*.tsx",
      },
    },
  },
};

export default nextConfig;
