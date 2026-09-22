const NOTION_IMAGE_HOST = "prod-files-secure.s3.us-west-2.amazonaws.com";
const RESPONSIVE_WIDTHS = [640, 828, 1200, 1600] as const;

function canOptimize(src: string) {
  if (src.startsWith("/")) return !src.startsWith("//");
  try {
    const url = new URL(src);
    return url.protocol === "https:" && url.hostname === NOTION_IMAGE_HOST;
  } catch {
    return false;
  }
}

export function optimizedImageUrl(src: string, width: number) {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=70`;
}

export function responsiveImageAttributes(src: string): Record<string, string> {
  if (!canOptimize(src)) return {};
  return {
    src: optimizedImageUrl(src, 828),
    srcset: RESPONSIVE_WIDTHS.map(width => `${optimizedImageUrl(src, width)} ${width}w`).join(", "),
    sizes: "(max-width: 820px) calc(100vw - 40px), 780px",
  };
}
