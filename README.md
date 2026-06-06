# pettranslator-site (Next.js)

Marketing site + blog for PetTranslator.ai. Static-exported Next.js 16 + Tailwind v4 + MDX.

This is the **new Next.js version** of the marketing site. The legacy hand-written HTML version lives in `../site/` and is still live at pettranslator.ai. Once this scaffold is reviewed and content is verified, we'll swap the Vercel deploy to point at this project.

## Architecture

```
src/
├── app/
│   ├── layout.tsx               sitewide header, footer, fonts, Schema.org graph
│   ├── page.tsx                 homepage (currently a placeholder — full port pending)
│   ├── globals.css              design tokens + prose styles
│   ├── sitemap.ts               dynamic sitemap.xml
│   ├── robots.ts                AI crawler opt-in
│   └── blog/
│       ├── page.tsx             blog hub
│       ├── [slug]/page.tsx      individual article
│       ├── category/[slug]/page.tsx
│       ├── tag/[slug]/page.tsx
│       └── author/[slug]/page.tsx
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── blog/
│       ├── TryItCTA.tsx         "Try the analyzer" CTA at end of each article
│       ├── Callout.tsx          referral / info / warning boxes
│       └── ClampDescription.tsx 2-line clamp + see-more (SEO-safe)
├── content/
│   ├── posts/                   60 MDX articles
│   ├── categories/              3 MDX category descriptions
│   ├── tags/                    10 MDX tag pages (only ≥4-article tags surfaced)
│   └── author/                  1 MDX author bio
└── lib/
    └── content.ts               frontmatter parser + tag-threshold logic

mdx-components.tsx               global MDX component map (TryItCTA, Callout)
public/
├── llms.txt                     AI crawler hints
├── og.png                       social preview
└── assets/                      favicons, logo, etc.
```

## Setup

```bash
cd site-next
npm install
npm run dev
```

Open <http://localhost:3000>. The blog hub is at `/blog`.

## Tag publish threshold

Tags with fewer than 4 articles tagged are **not surfaced as pages**. They exist in the article frontmatter but `getPublishedTagSlugs()` filters them out. To change the threshold, edit `TAG_THRESHOLD` in `src/lib/content.ts`.

## Adding a new article

1. Create `src/content/posts/your-article-slug.mdx` with the standard frontmatter block (title, slug, description, category, tags, author, publishedAt, updatedAt, heroImage, heroAlt, readingTime).
2. Import `<TryItCTA />` and `<Callout />` from the components dir at the top of the file if you want to use them in the body.
3. Run `npm run build` — the article is auto-discovered, added to the sitemap, included in its category page, and counted toward its tags' thresholds.

## Build

```bash
npm run build
```

Output goes to `out/`. Deploy that directory to any static host (Vercel auto-detects).

## Deploy

Currently this repo is **not yet** wired to the live `pettranslator.ai` deployment. Steps to swap:

1. Verify the build works locally (`npm run build && npm run start`)
2. Spot-check 3-5 articles, the homepage, the blog hub
3. Create a new Vercel project pointing at this directory
4. Test the preview URL
5. Once verified, point `pettranslator.ai` at the new deploy
6. Archive or delete `../site/`
