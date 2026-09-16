import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { getGuide } from "@/lib/content";

const FILE = "moving-costs-hidden-fees";

export function generateMetadata(): Metadata {
  const { frontmatter } = getGuide(FILE);
  return pageMetadata(frontmatter.title, frontmatter.description, frontmatter.slug);
}

export default function Page() {
  return <PageLayout content={getGuide(FILE)} />;
}
