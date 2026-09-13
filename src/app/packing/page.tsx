import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { getPage } from "@/lib/content";

const FILE = "packing";

export function generateMetadata(): Metadata {
  const { frontmatter } = getPage(FILE);
  return {
    title: frontmatter.title,
    description: frontmatter.description,
    alternates: { canonical: frontmatter.slug },
  };
}

export default function Page() {
  return <PageLayout content={getPage(FILE)} />;
}
