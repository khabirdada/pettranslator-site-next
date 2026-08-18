# PetTranslator.ai Campaign Content SOP

This project follows the workspace `AGENTS.md` and the canonical PetTranslator.ai SOP at `../../pettranslator-site-next/docs/content-sop.md`. Every new standing content instruction from the user must be recorded in both places during the same task. Humanize all prose, research the current search landscape when targeting a keyword, use supportable claims, never imply scientifically validated animal translation, optimize metadata and visual accessibility, and complete factual, originality, link, and build checks before publishing.

Every new or updated article must include `dateModified` in its frontmatter or schema, set to the actual editorial update date. Do not publish an article with a missing or stale modification date.

Completed content, metadata, internal links, and associated image assets may be committed and pushed to the existing default branch without requesting approval for each article after the required checks pass. The normal Vercel deployment may proceed. This does not authorize destructive Git operations, credentials, billing, or unrelated production changes.

Render every article table inside the site's shared horizontal scroll container so columns stay readable on narrow screens. Do not compress multi-column tables into word-by-word wrapping. For listicles, use a natural topic-specific at-a-glance heading and place the summary table after the answer-first opening copy but before detailed entries.

After publishing a keyword cluster, verify every new canonical URL in the production XML sitemap and request indexing through Google Search Console. Add relevant contextual links from established articles, then audit titles, descriptions, canonicals, article schema, mobile tables, and conversion CTAs. Monitor impressions, average position, clicks, click-through rate, signups, and paid conversions for 4 to 6 weeks. Refresh pages with meaningful impressions but weak click-through rates using their actual Search Console queries, and update `dateModified` whenever editorial copy changes.
