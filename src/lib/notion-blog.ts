import { connection } from "next/server";
import "server-only";
import { cache } from "react";
import { marked } from "marked";
import { parseBlogBlocks } from "./blog-shortcodes";
import { prepareNotionMarkdown } from "./notion-markdown";
import sanitizeHtml from "sanitize-html";
import retiredSlugs from "../../content/retired-blog-slugs.json";
import imported from "../../content/blog-import.json";

type RichText = { plain_text?: string; text?: { content: string } };
type Property = {
  title?: RichText[];
  rich_text?: RichText[];
  select?: { name: string } | null;
  date?: { start: string } | null;
  url?: string | null;
};
type NotionPage = {
  id: string;
  properties: Record<string, Property>;
  last_edited_time: string;
  cover?: {
    type: string;
    external?: { url: string };
    file?: { url: string };
  } | null;
};
export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  description: string;
  date: string;
  category: string;
  cover: string;
  updated: string;
};
const source =
  process.env.NOTION_DATA_SOURCE_ID || "3dcb3c5e-8efd-8019-95db-000bd7d5eaab";
async function api(endpoint: string, body?: unknown) {
  if (!process.env.NOTION_TOKEN)
    throw new Error("Notion blog credentials are not configured");
  const res = await fetch(`https://api.notion.com/v1/${endpoint}`, {
    method: body ? "POST" : "GET",
    headers: {
      Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
      "Notion-Version": "2026-03-11",
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
    next: { revalidate: 60 },
    signal: AbortSignal.timeout(20000),
  });
  if (!res.ok) throw new Error(`Notion blog request failed (${res.status})`);
  return res.json();
}
function text(p?: Property) {
  return (p?.title || p?.rich_text || [])
    .map((x) => x.plain_text ?? x.text?.content ?? "")
    .join("");
}
export const getBlogPosts = cache(async (): Promise<BlogPost[]> => {
  await connection();
  const pages: NotionPage[] = [];
  let cursor: string | undefined;
  do {
    const d = await api(`data_sources/${source}/query`, {
      page_size: 100,
      filter: { property: "Status", select: { equals: "Published" } },
      ...(cursor ? { start_cursor: cursor } : {}),
    });
    pages.push(...d.results);
    cursor = d.has_more ? d.next_cursor : undefined;
  } while (cursor);
  const posts = pages
    .map((p) => ({
      id: p.id,
      title: text(p.properties.Name),
      slug: text(p.properties.Slug),
      description: text(p.properties.Description),
      date: p.properties["Published date"]?.date?.start || "",
      category: text(p.properties.Category),
      cover: localLink(
        p.cover?.external?.url ||
        p.cover?.file?.url ||
        p.properties["Cover URL"]?.url ||
        ""),
      updated: p.last_edited_time,
    }))
    .filter(
      (p) =>
        !retiredSlugs.includes(p.slug) &&
        p.title &&
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug) &&
        (!p.date || Date.parse(p.date) <= Date.now()),
    );
  const counts = new Map<string, number>();
  posts.forEach((p) => counts.set(p.slug, (counts.get(p.slug) || 0) + 1));
  return posts
    .filter((p) => counts.get(p.slug) === 1)
    .sort((a, b) => (b.date || b.updated).localeCompare(a.date || a.updated));
});
export const getBlogPost = cache(async (slug: string) => {
  const post = (await getBlogPosts()).find((p) => p.slug === slug);
  if (!post) return null;
  const content = await api(`pages/${post.id}/markdown`);
  const markdown = await prepareNotionMarkdown(content, id => api(`blocks/${id}`));
  return { ...post, blocks: parseBlogBlocks(markdown, sanitizeBlogHtml) };
});
const legacy = new Map(
  imported.map((p) => [p.originalPath.replace(/\/$/, ""), `/blog/${p.slug}`]),
);
function localLink(url: string) {
  if (!url) return "";
  try {
    const u = new URL(url, "https://www.movings.sg");
    if (
      ["movings.sg", "www.movings.sg", "movings-sg.vercel.app"].includes(
        u.hostname,
      )
    )
      return (
        (legacy.get(u.pathname.replace(/\/$/, "")) || u.pathname) +
        u.search +
        u.hash
      );
  } catch {
    return url;
  }
  return url;
}
export function renderBlogMarkdown(markdown: string) {
  const raw = marked.parse(markdown, { async: false }) as string;
  return sanitizeBlogHtml(raw);
}
function sanitizeBlogHtml(raw: string) {
  return sanitizeHtml(raw, {
    allowedTags: [
      ...sanitizeHtml.defaults.allowedTags,
      "img",
      "details",
      "summary",
    ],
    allowedAttributes: {
      a: ["href", "title"],
      img: ["src", "alt", "title", "loading", "decoding"],
      th: ["colspan", "rowspan"],
      td: ["colspan", "rowspan"],
    },
    allowedSchemes: ["https", "http", "mailto", "tel"],
    transformTags: {
      a: (_tag, attrs) => ({
        tagName: "a",
        attribs: { ...attrs, href: localLink(attrs.href || "") },
      }),
      img: (_tag, attrs) => ({
        tagName: "img",
        attribs: {
          ...attrs,
          src: localLink(attrs.src || ""),
          loading: "lazy",
          decoding: "async",
        },
      }),
    },
  });
}
