import WhatsAppCta from "./WhatsAppCta";
import type { ParsedContent } from "@/lib/content";

type Props = {
  content: ParsedContent;
  /** Optional extra content rendered after the markdown body (e.g. FAQ, a
   * rate table, related links) for pages that need more than prose. */
  children?: React.ReactNode;
};

/**
 * Shared renderer for every markdown-backed page. The markdown body is
 * authored by us (not user input) and rendered server-side, so the full
 * text is present in the HTML response — no client-side rendering of
 * content, per the brief.
 */
export default function PageLayout({ content, children }: Props) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        {content.frontmatter.h1}
      </h1>
      <div
        className="prose prose-neutral mt-6 max-w-none"
        dangerouslySetInnerHTML={{ __html: content.html }}
      />
      {children}
      <div className="mt-10 border-t border-black/10 pt-8">
        <p className="mb-4 font-medium">Ready to move? Get a quote on WhatsApp.</p>
        <WhatsAppCta />
      </div>
    </article>
  );
}
