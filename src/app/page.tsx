import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import EnquiryForm from "@/components/EnquiryForm";
import { getPage } from "@/lib/content";

const FILE = "home";

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
    <PageLayout content={getPage(FILE)}>
      <div className="mt-10 border-t border-black/10 pt-8">
        <h2 className="mb-4 text-xl font-semibold">Book Your Move</h2>
        <EnquiryForm />
      </div>
    </PageLayout>
  );
}
