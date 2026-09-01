import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const addedToGit = execFileSync(
  "git",
  ["diff", "HEAD", "--name-only", "--diff-filter=A"],
  { cwd: root, encoding: "utf8" },
);
const untracked = execFileSync(
  "git",
  ["ls-files", "--others", "--exclude-standard"],
  { cwd: root, encoding: "utf8" },
);
const added = [...new Set(`${addedToGit}\n${untracked}`.trim().split("\n"))]
  .filter((file) => file.startsWith("src/content/posts/") && file.endsWith(".mdx"));

const failures = [];

for (const relative of added) {
  const absolute = path.join(root, relative);
  const raw = fs.readFileSync(absolute, "utf8");
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    failures.push(`${relative}: invalid or missing frontmatter`);
    continue;
  }
  const [, frontmatter, content] = match;
  const data = {};
  for (const line of frontmatter.split("\n")) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();
    data[key] = value.replace(/^(["'])(.*)\1$/, "$2");
  }

  for (const field of [
    "title",
    "slug",
    "description",
    "tldr",
    "category",
    "author",
    "publishedAt",
    "updatedAt",
    "heroImage",
    "heroAlt",
    "readingTime",
  ]) {
    if (typeof data[field] !== "string" || !data[field].trim()) {
      failures.push(`${relative}: missing substantive ${field}`);
    }
  }

  if (typeof data.tags !== "string" || !/^\[.+\]$/.test(data.tags)) {
    failures.push(`${relative}: tags must be a non-empty array`);
  }

  if (typeof data.tldr === "string" && data.tldr.trim().split(/\s+/).length < 20) {
    failures.push(`${relative}: tldr must contain at least 20 words`);
  }

  if (data.updatedAt && data.publishedAt && data.updatedAt < data.publishedAt) {
    failures.push(`${relative}: updatedAt cannot predate publishedAt`);
  }

  if (!content.includes("## Sources")) {
    failures.push(`${relative}: missing Sources section`);
  }

  if (!content.includes("<TryItCTA />")) {
    failures.push(`${relative}: missing TryItCTA`);
  }

  if (typeof data.heroImage === "string") {
    const hero = path.join(root, "public", data.heroImage.replace(/^\//, ""));
    const card = hero.replace(/(\.[a-z0-9]+)$/i, "-card$1");
    if (!fs.existsSync(hero)) failures.push(`${relative}: hero image is missing`);
    if (!fs.existsSync(card)) failures.push(`${relative}: hero card variant is missing`);
  }

  const expectedSlug = path.basename(relative, ".mdx");
  if (data.slug !== expectedSlug) {
    failures.push(`${relative}: slug must match filename (${expectedSlug})`);
  }
}

if (failures.length) {
  console.error("New-content check failed:\n");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`New-content check passed for ${added.length} added post(s).`);
