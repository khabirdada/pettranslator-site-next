import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Static export — every page pre-rendered at build time, served from CDN.
  // Trades dynamic SSR features (we don't need any) for instant TTFB + perfect SEO.
  output: "export",

  // Allow .mdx files alongside .tsx as page extensions.
  pageExtensions: ["ts", "tsx", "md", "mdx"],

  // We use slug-style URLs without trailing slashes by default.
  // Trailing-slash export is sometimes friendlier to Vercel static hosting.
  trailingSlash: false,

  // Disable image optimization since we're static-exporting.
  // We'll serve images directly from /public/ with explicit width/height.
  images: { unoptimized: true },

  // Surface real TypeScript errors during build.
  typescript: { ignoreBuildErrors: false },

  // Explicit Turbopack loader rule for .mdx. Next.js 16 defaults to Turbopack;
  // createMDX (wrapper below) configures webpack but Turbopack needs its own
  // loader registration.
  turbopack: {
    // Pin the workspace root so Next.js doesn't auto-detect the stray
    // /Users/khabiruddin/package-lock.json upstream.
    root: __dirname,
    rules: {
      "*.mdx": {
        loaders: ["@mdx-js/loader"],
        as: "*.tsx",
      },
    },
  },
};

const withMDX = createMDX({
  // Stay on the default MDX provider chain. Custom rehype/remark plugins
  // can be added here when we want syntax highlighting, footnotes, etc.
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
