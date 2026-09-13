import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import { getPage, getAllGuides } from "@/lib/content";

export function generateMetadata(): Metadata {
  const { frontmatter } = getPage("guides");
  return {
    title: frontmatter.title,
    description: frontmatter.description,
    alternates: { canonical: frontmatter.slug },
  };
}

export default function Page() {
  const guides = getAllGuides();
  return (
    <PageLayout content={getPage("guides")}>
      <ul className="mt-8 space-y-3">
        {guides.map((g) => (
          <li key={g.file}>
            <Link
              href={g.frontmatter.slug}
              className="font-medium hover:underline"
            >
              {g.frontmatter.h1}
            </Link>
          </li>
        ))}
      </ul>
    </PageLayout>
  );
}
