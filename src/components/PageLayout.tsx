import Image from "next/image";
import Link from "next/link";
import WhatsAppCta from "./WhatsAppCta";
import JsonLd from "./JsonLd";
import type { ParsedContent } from "@/lib/content";
import { getBreadcrumbs, isServicePath } from "@/lib/routes";
import {
  breadcrumbListSchema,
  faqPageSchema,
  localBusinessSchema,
  serviceSchema,
} from "@/lib/schema";

const servicePhotos: Record<
  string,
  { src: string; alt: string; width: number; height: number }
> = {
  "/house-moving": {
    src: "/images/library/1167.webp",
    alt: "Furniture protected for a home move",
    width: 1080,
    height: 1080,
  },
  "/packing": {
    src: "/images/library/1158.webp",
    alt: "Cartons and packing materials prepared for a home move",
    width: 1080,
    height: 1080,
  },
  "/office-moving": {
    src: "/images/library/1190.webp",
    alt: "Labelled cartons ready for an office move",
    width: 1080,
    height: 1080,
  },
  "/storage": {
    src: "/images/library/1013.webp",
    alt: "Packed furniture and belongings ready for transport",
    width: 2240,
    height: 1260,
  },
  "/manpower-only-movers": {
    src: "/images/library/1183.webp",
    alt: "Moving crew handling items at a truck",
    width: 1080,
    height: 1080,
  },
  "/no-lift-access-movers": {
    src: "/images/library/1008.webp",
    alt: "Crew moving a wardrobe rack and boxes at a landed property gate",
    width: 2000,
    height: 1125,
  },
};

type Props = {
  content: ParsedContent;
  /** Optional extra content rendered after the markdown body (e.g. FAQ, a
   * rate table, related links) for pages that need more than prose. */
  children?: React.ReactNode;
  /** Optional full-bleed image rendered above the constrained article
   * container (outside the max-w-3xl column), for a page hero photo. */
  hero?: React.ReactNode;
};

/**
 * Shared renderer for every markdown-backed page. The markdown body is
 * authored by us (not user input) and rendered server-side, so the full
 * text is present in the HTML response — no client-side rendering of
 * content, per the brief. Also carries the Phase 4 structured data:
 * BreadcrumbList everywhere, LocalBusiness on the homepage, Service on
 * service pages, and FAQPage wherever the content has a "## FAQ" section.
 */
export default function PageLayout({ content, children, hero }: Props) {
  const path = content.frontmatter.slug;
  const breadcrumbs = getBreadcrumbs(path);
  const isHome = path === "/";
  const photo = servicePhotos[path];

  return (
    <>
      {hero}
      <article className="mx-auto max-w-3xl px-4 py-12">
        <JsonLd data={breadcrumbListSchema(breadcrumbs)} />
        {isHome && <JsonLd data={localBusinessSchema()} />}
        {!isHome && isServicePath(path) && (
          <JsonLd
            data={serviceSchema({
              name: content.frontmatter.h1,
              description: content.frontmatter.description,
              url: path,
            })}
          />
        )}
        {content.faqs.length > 0 && (
          <JsonLd data={faqPageSchema(content.faqs)} />
        )}

        {!isHome && (
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-black/60">
            {breadcrumbs.map((crumb, i) => (
              <span key={crumb.path}>
                {i > 0 && <span className="mx-2">/</span>}
                {i === breadcrumbs.length - 1 ? (
                  <span aria-current="page">{crumb.name}</span>
                ) : (
                  <Link href={crumb.path} className="hover:underline">
                    {crumb.name}
                  </Link>
                )}
              </span>
            ))}
          </nav>
        )}

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {content.frontmatter.h1}
        </h1>
        {photo && !hero && (
          <figure className="service-photo">
            <Image {...photo} sizes="(max-width:768px) 95vw, 736px" />
            <figcaption>{photo.alt}</figcaption>
          </figure>
        )}
        <div
          className="prose prose-neutral mt-6 max-w-none"
          dangerouslySetInnerHTML={{ __html: content.html }}
        />
        {children}
        <div className="mt-10 border-t border-black/10 pt-8">
          <p className="mb-4 font-medium">
            Ready to move? Get a quote on WhatsApp.
          </p>
          <WhatsAppCta />
        </div>
      </article>
    </>
  );
}
