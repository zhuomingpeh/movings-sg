import { marked, type TokensList, type Token } from "marked";

export type BlogBlock =
  | { type: "html"; html: string }
  | { type: "columns"; columns: { ratio: number; blocks: BlogBlock[] }[] }
  | { type: "contact" | "contact-form" | "reviews" };

export function hasBlogReviews(blocks: BlogBlock[]): boolean {
  return blocks.some(block => block.type === "reviews" || (block.type === "columns" && block.columns.some(column => hasBlogReviews(column.blocks))));
}

// Only plain, top-level paragraphs are commands. Code, links, lists and
// quotations remain article content. Parse once to retain reference links.
export function parseBlogBlocks(markdown: string, sanitize: (html: string) => string): BlogBlock[] {
  // Isolate Notion layout wrappers before CommonMark interprets them as raw
  // HTML. Each column then uses the same safe article/shortcode renderer.
  const lines = markdown.split("\n");
  let fence = "";
  for (let i = 0; i < lines.length; i++) {
    const marker = /^\s*(`{3,}|~{3,})/.exec(lines[i])?.[1];
    if (marker) {
      if (!fence) fence = marker;
      else if (marker[0] === fence[0] && marker.length >= fence.length) fence = "";
      continue;
    }
    if (fence || !/^<columns>\s*$/.test(lines[i])) continue;
    let depth = 1;
    let end = i + 1;
    for (; end < lines.length; end++) {
      if (/^\s*<columns>\s*$/.test(lines[end])) depth++;
      if (/^\s*<\/columns>\s*$/.test(lines[end]) && --depth === 0) break;
    }
    if (end === lines.length) throw new Error("Incomplete Notion column layout");
    const columns: { ratio: number; blocks: BlogBlock[] }[] = [];
    const inside = lines.slice(i + 1, end).map(line => line.replace(/^\t/, ""));
    for (let c = 0; c < inside.length; c++) {
      const opening = /^<column(?: ratio="([\d.]+)")?>\s*$/.exec(inside[c]);
      if (!opening) continue;
      let close = c + 1;
      while (close < inside.length && !/^<\/column>\s*$/.test(inside[close])) close++;
      if (close === inside.length) throw new Error("Incomplete Notion column");
      const ratio = Number(opening[1] || 1);
      columns.push({ ratio: Math.max(1, Math.min(100, ratio)), blocks: parseBlogBlocks(inside.slice(c + 1, close).map(line => line.replace(/^\t/, "")).join("\n"), sanitize) });
      c = close;
    }
    return [...parseBlogBlocks(lines.slice(0, i).join("\n"), sanitize), { type: "columns", columns }, ...parseBlogBlocks(lines.slice(end + 1).join("\n"), sanitize)];
  }
  const tokens = marked.lexer(markdown);
  const blocks: BlogBlock[] = [];
  let pending: Token[] = [];
  function flush() {
    if (!pending.length) return;
    const list = Object.assign(pending, { links: tokens.links }) as TokensList;
    const html = sanitize(marked.parser(list));
    if (html.trim()) blocks.push({ type: "html", html });
    pending = [];
  }
  for (const token of tokens) {
    // WordPress imports stored entire Trustindex widgets as fenced text.
    // Match their specific signature, never arbitrary review-related prose.
    if (token.type === "code" && /^EXCELLENT\s+Based on \d+ reviews\b/.test(token.text.trim()) && token.text.includes("Trustindex verifies that the original source of the review is Google.")) {
      flush();
      if (!blocks.some(block => block.type === "reviews")) blocks.push({ type: "reviews" });
      continue;
    }
    const plain = token.type === "paragraph" && token.tokens?.every(
      (inline) => inline.type === "text" || inline.type === "escape" || (inline.type === "html" && /^<br\s*\/?>$/i.test(inline.raw)),
    );
    const match = plain
      ? /^\[(contact|contact-form|reviews)\]$/.exec(token.tokens!.map((inline) => inline.type !== "html" && "text" in inline ? inline.text : "").join("").trim())
      : null;
    if (match) {
      flush();
      if (match[1] !== "reviews" || !blocks.some(block => block.type === "reviews")) {
        blocks.push({ type: match[1] as "contact" | "contact-form" | "reviews" });
      }
    } else pending.push(token);
  }
  flush();
  return blocks;
}
