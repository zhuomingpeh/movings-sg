import Link from "next/link";
import type { Metadata } from "next";
import { getBlogPosts } from "@/lib/notion-blog";
export const metadata: Metadata = {
  title: "Moving Blog Singapore | Moving Solutions",
  description:
    "Moving advice, packing tips and storage guides from Moving Solutions in Singapore.",
  alternates: { canonical: "/blog" },
};
export default async function Blog() {
  const posts = await getBlogPosts();
  return (
    <section className="shell home-section">
      <p className="eyebrow">THE MOVING JOURNAL</p>
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        A little planning.
        <br />A better move.
      </h1>
      <p className="mt-5 mb-10 max-w-xl text-slate-600">
        Practical advice on packing, storage, costs and settling into your next
        home.
      </p>
      <div className="blog-grid">
        {posts.map((p) => (
          <Link href={`/blog/${p.slug}`} className="blog-card" key={p.id}>
            {p.cover && (
              <img src={p.cover} alt="" loading="lazy" className="blog-cover" />
            )}
            <div className="blog-card-copy">
              <p className="eyebrow">{p.category || "Moving advice"}</p>
              <h2>{p.title}</h2>
              <p>{p.description}</p>
              {p.date && (
                <time dateTime={p.date}>
                  {new Date(p.date).toLocaleDateString("en-SG", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    timeZone: "Asia/Singapore",
                  })}
                </time>
              )}
            </div>
          </Link>
        ))}
      </div>
      {!posts.length && <p>New moving stories are on the way.</p>}
    </section>
  );
}
