import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import HeroBanner from "@/components/HeroBanner";
import { getGuide } from "@/lib/content";

const FILE = "bto-moving";

export function generateMetadata(): Metadata {
  const { frontmatter } = getGuide(FILE);
  return pageMetadata(frontmatter.title, frontmatter.description, frontmatter.slug);
}

export default function Page() {
  return (
    <PageLayout
      content={getGuide(FILE)}
      hero={
        <HeroBanner
          src="/images/guides/bto-hdb-moving.webp"
          alt="BTO HDB moving in Singapore"
          width={800}
          height={800}
        />
      }
    />
  );
}
