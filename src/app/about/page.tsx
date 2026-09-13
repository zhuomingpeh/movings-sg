import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import HeroBanner from "@/components/HeroBanner";
import ClientLogos from "@/components/ClientLogos";
import { getPage } from "@/lib/content";

const FILE = "about";

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
          src="/images/about-us.webp"
          alt="Moving Solutions team"
          width={1024}
          height={576}
        />
      }
    >
      <div className="mt-10 border-t border-black/10 pt-8">
        <h2 className="mb-4 text-xl font-semibold">Some of the Teams We've Moved</h2>
        <ClientLogos />
      </div>
    </PageLayout>
  );
}
