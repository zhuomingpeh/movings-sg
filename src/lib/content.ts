import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type ContentType = "pages" | "guides";

export type Frontmatter = {
  title: string;
  description: string;
  slug: string;
  h1: string;
  [key: string]: unknown;
};

export type ParsedContent = {
  frontmatter: Frontmatter;
  html: string;
  /** filename without the .md extension */
  file: string;
};

function readOne(type: ContentType, file: string): ParsedContent {
  const filePath = path.join(CONTENT_DIR, type, `${file}.md`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const html = marked.parse(content, { async: false }) as string;
  return { frontmatter: data as Frontmatter, html, file };
}

/** Load one page from /content/pages by its filename (no extension). */
export function getPage(file: string): ParsedContent {
  return readOne("pages", file);
}

/** Load one guide from /content/guides by its filename (no extension). */
export function getGuide(file: string): ParsedContent {
  return readOne("guides", file);
}

/** All guides, sorted by title, for the /guides index. */
export function getAllGuides(): ParsedContent[] {
  const dir = path.join(CONTENT_DIR, "guides");
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => readOne("guides", f.replace(/\.md$/, "")))
    .sort((a, b) => a.frontmatter.title.localeCompare(b.frontmatter.title));
}
