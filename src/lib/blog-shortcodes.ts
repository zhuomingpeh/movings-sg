import { marked, type TokensList, type Token } from "marked";

export type BlogBlock =
  | { type: "html"; html: string }
  | { type: "contact" | "contact-form" | "reviews" };

// Only plain, top-level paragraphs are commands. Code, links, lists and
// quotations remain article content. Parse once to retain reference links.
export function parseBlogBlocks(markdown: string, sanitize: (html: string) => string): BlogBlock[] {
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
      (inline) => inline.type === "text" || inline.type === "escape",
    );
    const match = plain
      ? /^\[(contact|contact-form|reviews)\]$/.exec(token.tokens!.map((inline) => "text" in inline ? inline.text : "").join("").trim())
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
