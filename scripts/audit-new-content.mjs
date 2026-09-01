import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const postsRoot = path.join(root, "src/content/posts");
const failures = [];

function addedPostPaths() {
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
  return [...new Set(`${addedToGit}\n${untracked}`.trim().split("\n"))]
    .filter((file) => file.startsWith("src/content/posts/") && file.endsWith(".mdx"));
}

function readPost(relative) {
  const raw = fs.readFileSync(path.join(root, relative), "utf8");
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return null;
  const data = {};
  for (const line of match[1].split("\n")) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();
    data[key] = value.replace(/^(["'])(.*)\1$/, "$2");
  }
  return { data, content: match[2], raw };
}

function imageDimensions(absolute) {
  const output = execFileSync(
    "sips",
    ["-g", "pixelWidth", "-g", "pixelHeight", absolute],
    { encoding: "utf8" },
  );
  const width = Number(output.match(/pixelWidth: (\d+)/)?.[1]);
  const height = Number(output.match(/pixelHeight: (\d+)/)?.[1]);
  return { width, height };
}

const added = addedPostPaths();
const addedSlugs = new Set(added.map((file) => path.basename(file, ".mdx")));
const allPostFiles = fs.readdirSync(postsRoot).filter((file) => file.endsWith(".mdx"));
const allPostText = new Map(
  allPostFiles.map((file) => [file.replace(/\.mdx$/, ""), fs.readFileSync(path.join(postsRoot, file), "utf8")]),
);

for (const relative of added) {
  const post = readPost(relative);
  if (!post) {
    failures.push(`${relative}: could not parse frontmatter`);
    continue;
  }
  const { data, content } = post;
  const slug = data.slug;

  if (data.title.length > 65) failures.push(`${slug}: title exceeds 65 characters`);
  if (data.description.length < 110 || data.description.length > 160) {
    failures.push(`${slug}: description must be 110-160 characters`);
  }
  if (data.heroAlt.length < 30 || data.heroAlt.length > 150) {
    failures.push(`${slug}: heroAlt must be 30-150 characters`);
  }

  const prose = content
    .replace(/<[^>]+>/g, " ")
    .replace(/\[[^\]]+\]\([^\)]+\)/g, " ")
    .replace(/[^\p{L}\p{N}'-]+/gu, " ")
    .trim();
  const words = prose ? prose.split(/\s+/).length : 0;
  if (words < 900) failures.push(`${slug}: article has only ${words} prose words`);

  const internalSlugs = [...content.matchAll(/\]\(\/blog\/([^\)#?]+)[^\)]*\)/g)]
    .map((match) => match[1]);
  for (const target of new Set(internalSlugs)) {
    if (!allPostText.has(target)) failures.push(`${slug}: broken internal target /blog/${target}`);
  }

  const donorCount = [...allPostText.entries()]
    .filter(([donor]) => donor !== slug && !addedSlugs.has(donor))
    .filter(([, raw]) => raw.includes(`/blog/${slug}`)).length;
  if (donorCount < 4) failures.push(`${slug}: only ${donorCount} established contextual donors`);

  const hero = path.join(root, "public", data.heroImage.replace(/^\//, ""));
  const card = hero.replace(/(\.[a-z0-9]+)$/i, "-card$1");
  const heroSize = imageDimensions(hero);
  const cardSize = imageDimensions(card);
  if (heroSize.width !== 1376 || heroSize.height !== 768) {
    failures.push(`${slug}: hero must be 1376x768, found ${heroSize.width}x${heroSize.height}`);
  }
  if (cardSize.width !== 600 || cardSize.height !== 335) {
    failures.push(`${slug}: card must be 600x335, found ${cardSize.width}x${cardSize.height}`);
  }

  if ((content.match(/<TryItCTA \/>/g) ?? []).length !== 1) {
    failures.push(`${slug}: expected exactly one TryItCTA`);
  }
  if (!/^\*\*[^\n]+\*\*/m.test(content)) failures.push(`${slug}: missing answer-first bold passage`);
  if (!content.includes("## Frequently asked questions")) failures.push(`${slug}: missing FAQ section`);
  if (!content.includes("## Sources")) failures.push(`${slug}: missing Sources section`);
}

if (failures.length) {
  console.error("Expanded content audit failed:\n");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Expanded content audit passed for ${added.length} post(s).`);
