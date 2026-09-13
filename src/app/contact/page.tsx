import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import HeroBanner from "@/components/HeroBanner";
import { getPage } from "@/lib/content";

const FILE = "contact";

export function generateMetadata(): Metadata {
  const { frontmatter } = getPage(FILE);
  return {
    title: frontmatter.title,
    description: frontmatter.description,
    alternates: { canonical: frontmatter.slug },
  };
}

export default function Page() {
  return (
    <PageLayout
      content={getPage(FILE)}
      hero={
        <HeroBanner
          src="/images/contact-us.webp"
          alt="Moving Solutions contact team for moving service enquiries"
          width={1024}
          height={576}
        />
      }
    />
  );
}
