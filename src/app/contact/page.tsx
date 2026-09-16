import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import HeroBanner from "@/components/HeroBanner";
import EnquiryForm from "@/components/EnquiryForm";
import { getPage } from "@/lib/content";

const FILE = "contact";

export function generateMetadata(): Metadata {
  const { frontmatter } = getPage(FILE);
  return pageMetadata(frontmatter.title, frontmatter.description, frontmatter.slug);
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
    >
      <div className="mt-10 border-t border-black/10 pt-8">
        <h2 className="mb-4 text-xl font-semibold">Send an Enquiry</h2>
        <EnquiryForm />
      </div>
    </PageLayout>
  );
}
