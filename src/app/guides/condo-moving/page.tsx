import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { getGuide } from "@/lib/content";

const FILE = "condo-moving";

export function generateMetadata(): Metadata {
  const { frontmatter } = getGuide(FILE);
  return {
    title: frontmatter.title,
    description: frontmatter.description,
    alternates: { canonical: frontmatter.slug },
  };
}

export default function Page() {
  return <PageLayout content={getGuide(FILE)} />;
}
