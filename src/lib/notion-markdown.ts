type MarkdownResponse = { markdown: string; truncated?: boolean; unknown_block_ids?: string[] };
type Block = { type: string; has_children?: boolean; unsupported?: { block_type?: string } };

export async function prepareNotionMarkdown(content: MarkdownResponse, getBlock: (id: string) => Promise<Block>) {
  let markdown = content.markdown;
  const ids = [...new Set(content.unknown_block_ids || [])];
  if (content.truncated && !ids.length) throw new Error("Notion article is incomplete");
  for (const id of ids) {
    const block = await getBlock(id);
    if (block.type !== "unsupported" || block.unsupported?.block_type !== "button" || block.has_children) {
      throw new Error("Notion article contains unsupported or incomplete content");
    }
    let replaced = false;
    markdown = markdown.replace(/<unknown\s+url="([^"]+)"\s+alt="button"\s*\/>/g, (tag, url: string) => {
      const fragment = url.split("#")[1]?.replaceAll("-", "");
      if (fragment !== id.replaceAll("-", "")) return tag;
      replaced = true;
      // Notion does not expose the button's label or action. Offer a clearly
      // labelled website contact link instead of pretending to run its action.
      return "[Contact Moving Solutions](/contact)";
    });
    if (!replaced) throw new Error("Could not resolve Notion button placeholder");
  }
  if (/<unknown\b/.test(markdown)) throw new Error("Unresolved Notion content");

  // Notion separates blocks with ONE newline; CommonMark merges these into
  // paragraphs. Restore boundaries without changing fenced code or tables.
  let fence = "";
  let table = false;
  return markdown.split("\n").map(line => {
    const marker = /^\s*(`{3,}|~{3,})/.exec(line)?.[1];
    if (marker) {
      if (!fence) { fence = marker; return "\n" + line; }
      if (marker[0] === fence[0] && marker.length >= fence.length) { fence = ""; return line + "\n"; }
      return line;
    }
    if (fence) return line;
    if (/^\s*<table\b/.test(line)) table = true;
    if (table) { if (/<\/table>/.test(line)) table = false; return line; }
    if (/^\s*\|/.test(line)) return line;
    if (/^\s*<empty-block\s*\/>\s*$/.test(line)) return "";
    return line + "\n";
  }).join("\n");
}
