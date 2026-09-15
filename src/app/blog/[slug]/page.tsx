import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBlogPost } from "@/lib/notion-blog";
import WhatsAppCta from "@/components/WhatsAppCta";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, SITE_NAME } from "@/lib/site";
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = await getBlogPost(slug);
  if (!p) return { title: "Post not found", robots: { index: false } };
  return {
    title: `${p.title} | ${SITE_NAME}`,
    description: p.description,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: {
      type: "article",
      title: p.title,
      description: p.description,
      ...(p.cover ? { images: [p.cover] } : {}),
    },
  };
}
export default async function Article({ params }: Props) {
  const { slug } = await params;
  const p = await getBlogPost(slug);
  if (!p) notFound();
  return (
    <article className="blog-article">
      <nav className="mb-8 text-sm text-slate-600" aria-label="Breadcrumb">
        <Link href="/">Home</Link> / <Link href="/blog">Blog</Link>
      </nav>
      <p className="eyebrow">{p.category || "Moving advice"}</p>
      <h1>{p.title}</h1>
      {p.date && (
        <time className="blog-date" dateTime={p.date}>
          {new Date(p.date).toLocaleDateString("en-SG", {
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "Asia/Singapore",
          })}
        </time>
      )}
      {p.cover && <img src={p.cover} alt="" className="article-cover" />}
      <div
        className="prose prose-neutral max-w-none blog-body"
        dangerouslySetInnerHTML={{ __html: p.html }}
      />
      <div className="mt-12 border-t pt-8">
        <h2 className="text-2xl font-semibold mb-4">Planning your move?</h2>
        <WhatsAppCta />
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: p.title,
          description: p.description,
          datePublished: p.date || undefined,
          dateModified: p.updated,
          author: { "@type": "Organization", name: SITE_NAME },
          publisher: { "@type": "Organization", name: SITE_NAME },
          mainEntityOfPage: `${SITE_URL}/blog/${p.slug}`,
          image: p.cover || undefined,
        }}
      />
    </article>
  );
}
