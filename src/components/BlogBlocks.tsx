import type { BlogBlock } from "@/lib/blog-shortcodes";
import { BUSINESS, SOCIAL } from "@/lib/site";
import EnquiryForm from "./EnquiryForm";
import Testimonials from "./Testimonials";
import WhatsAppCta from "./WhatsAppCta";
import Link from "next/link";

export default function BlogBlocks({ blocks }: { blocks: BlogBlock[] }) {
  return blocks.map((block, index) => {
    if (block.type === "html") return <div key={index} className="prose prose-neutral max-w-none blog-body" dangerouslySetInnerHTML={{ __html: block.html }} />;
    if (block.type === "reviews") return (
      <section key={index} className="blog-widget blog-reviews" aria-label="Customer reviews">
        <p className="eyebrow">WHAT CUSTOMERS SAY</p>
        <h2>Moving stories from our customers</h2>
        <p>Selected Google reviews shared by our customers.</p>
        <Testimonials limit={3} />
        <a href={SOCIAL.google} target="_blank" rel="noopener noreferrer" className="text-link">See reviews on Google</a>
      </section>
    );
    return (
      <section key={index} className="blog-widget blog-contact" aria-label="Contact Moving Solutions">
        <p className="eyebrow">LET’S PLAN YOUR MOVE</p>
        <h2>Tell us what you’re moving.</h2>
        <p>Share your moving date, addresses and a few photos of your items. We’ll help you plan the next step.</p>
        <div className="blog-contact-links">
          <WhatsAppCta />
          <a href={`tel:${BUSINESS.phoneHref}`}>Call {BUSINESS.phone}</a>
          <a href="mailto:contact@movings.sg">Email us</a>
          {block.type === "contact" && <Link href="/contact">Contact us</Link>}
        </div>
        {block.type === "contact-form" && <EnquiryForm />}
      </section>
    );
  });
}
