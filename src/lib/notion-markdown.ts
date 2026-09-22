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

  // Notion columns are indented XML wrappers, not HTML containing markdown.
  // Stack the contents in reading order and preserve indentation inside them.
  let depth = 0;
  let fence = "";
  return markdown.split("\n").map(line => {
    const dedented = line.replace(new RegExp(`^\\t{0,${depth}}`), "");
    const marker = /^\s*(`{3,}|~{3,})/.exec(dedented)?.[1];
    if (marker) {
      if (!fence) fence = marker;
      else if (marker[0] === fence[0] && marker.length >= fence.length) fence = "";
      return dedented;
    }
    if (fence) return dedented;
    if (/^\s*<(?:columns|column)(?:\s[^>]*)?>\s*$/.test(line)) { depth++; return ""; }
    if (/^\s*<\/(?:columns|column)>\s*$/.test(line)) { depth = Math.max(0, depth - 1); return ""; }
    if (/^\s*<empty-block\s*\/>\s*$/.test(line)) return "";
    return dedented;
  }).join("\n");
}
