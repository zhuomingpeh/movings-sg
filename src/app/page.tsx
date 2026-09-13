import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import EnquiryForm from "@/components/EnquiryForm";
import HeroBanner from "@/components/HeroBanner";
import ServiceIconsGrid from "@/components/ServiceIconsGrid";
import FeatureTiles from "@/components/FeatureTiles";
import ClientLogos from "@/components/ClientLogos";
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
    <PageLayout
      content={getPage(FILE)}
      hero={
        <HeroBanner
          src="/images/home/staff-2.jpeg"
          alt="Moving Solutions crew in uniform ready for a home move in Singapore"
          width={1024}
          height={333}
          priority
        />
      }
    >
      <div className="mt-10 border-t border-black/10 pt-8">
        <h2 className="mb-4 text-xl font-semibold">Why Book With Us</h2>
        <FeatureTiles />
      </div>

      <div className="mt-10 border-t border-black/10 pt-8">
        <h2 className="mb-4 text-xl font-semibold">Our Services</h2>
        <ServiceIconsGrid />
        <p className="mt-4 text-sm text-black/70">
          Plus specialist help for{" "}
          <Link href="/no-lift-access-movers" className="underline">
            no-lift-access moves
          </Link>
          ,{" "}
          <Link href="/manpower-only-movers" className="underline">
            manpower-only jobs
          </Link>
          ,{" "}
          <Link href="/midnight-movers" className="underline">
            after-hours moves
          </Link>
          , and{" "}
          <Link href="/specialist-moving" className="underline">
            art, pianos and safes
          </Link>
          .
        </p>
      </div>

      <div className="mt-10 border-t border-black/10 pt-8">
        <h2 className="mb-4 text-xl font-semibold">Trusted By</h2>
        <ClientLogos />
        <p className="mt-4 text-sm text-black/70">
          Alongside residential moves across HDB, condo and landed homes
          island-wide. Read more on <Link href="/about" className="underline">about us</Link>.
        </p>
      </div>

      <div className="mt-10 border-t border-black/10 pt-8">
        <h2 className="mb-4 text-xl font-semibold">What Customers Say</h2>
        <p className="text-sm text-black/60">
          [REVIEW TEXT TBC: Ming to supply 3-5 real customer reviews (name or
          initial, move type) so this section can carry genuine testimonial
          text as plain HTML instead of a client-side widget.]
        </p>
      </div>

      <div className="mt-10 border-t border-black/10 pt-8">
        <h2 className="mb-4 text-xl font-semibold">Book Your Move</h2>
        <EnquiryForm />
      </div>
    </PageLayout>
  );
}
