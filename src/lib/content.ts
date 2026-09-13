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

export type Faq = { question: string; answer: string };

export type ParsedContent = {
  frontmatter: Frontmatter;
  html: string;
  /** filename without the .md extension */
  file: string;
  /** FAQs found under a "## FAQ" heading, for FAQPage schema. Empty if the
   * page has no FAQ section. */
  faqs: Faq[];
};

/** Strips the markdown formatting we actually use (links, bold, code) down
 * to plain text, for use in JSON-LD where markup doesn't belong. */
function markdownInlineToText(md: string): string {
  return md
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/`(.*?)`/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

/** Pulls Q/A pairs out of a "## FAQ" section written as `**Question?**`
 * followed by an answer paragraph, which is the convention every FAQ
 * section on this site follows. Returns [] if there's no FAQ heading. */
export function extractFaqs(markdown: string): Faq[] {
  const section = markdown.match(/##\s*FAQ\b([\s\S]*?)(?=\n##\s|$)/i);
  if (!section) return [];

  const faqs: Faq[] = [];
  const re = /\*\*(.+?\?)\*\*\s*\n([\s\S]*?)(?=\n\*\*.+?\?\*\*|$)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(section[1]))) {
    faqs.push({
      question: markdownInlineToText(m[1]),
      answer: markdownInlineToText(m[2]),
    });
  }
  return faqs;
}

function readOne(type: ContentType, file: string): ParsedContent {
  const filePath = path.join(CONTENT_DIR, type, `${file}.md`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const html = marked.parse(content, { async: false }) as string;
  return {
    frontmatter: data as Frontmatter,
    html,
    file,
    faqs: extractFaqs(content),
  };
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
