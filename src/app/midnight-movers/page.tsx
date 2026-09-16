import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { getPage } from "@/lib/content";

const FILE = "midnight-movers";

export function generateMetadata(): Metadata {
  const { frontmatter } = getPage(FILE);
  return pageMetadata(frontmatter.title, frontmatter.description, frontmatter.slug);
}

export default function Page() {
  return <PageLayout content={getPage(FILE)} />;
}
