import { breadcrumbListSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBlogPost } from "@/lib/notion-blog";
import WhatsAppCta from "@/components/WhatsAppCta";
import BlogBlocks from "@/components/BlogBlocks";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, SITE_NAME } from "@/lib/site";
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = await getBlogPost(slug);
  if (!p) return { title: "Post not found", robots: { index: false } };
  return {
    ...pageMetadata(`${p.title} | ${SITE_NAME}`, p.description, `/blog/${p.slug}`, p.cover || undefined),
    description: p.description,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: {
      type: "article",
      url: `${SITE_URL}/blog/${p.slug}`,
      siteName: SITE_NAME,
      publishedTime: p.date || undefined,
      modifiedTime: p.updated,
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
      <JsonLd data={breadcrumbListSchema([{name: "Home", path: "/"}, {name: "Blog", path: "/blog"}, {name: p.title, path: `/blog/${p.slug}`}])} />
      <nav className="mb-8 text-sm text-slate-600" aria-label="Breadcrumb">
        <Link href="/">Home</Link> / <Link href="/blog">Blog</Link>
      </nav>
      <p className="eyebrow">{p.category && p.category !== "Uncategorized" ? p.category : "Moving advice"}</p>
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
      <BlogBlocks blocks={p.blocks} />
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
          image: p.cover ? new URL(p.cover, SITE_URL).href : undefined,
        }}
      />
    </article>
  );
}
