import type { Metadata } from "next";
import Link from "next/link";
import WhatsAppCta from "@/components/WhatsAppCta";

// Conversion page the enquiry form redirects to. Deliberately noindex and
// excluded from src/lib/routes.ts / the sitemap — it's not a page anyone
// should land on except right after submitting the form.
export const metadata: Metadata = {
  title: "Thanks for reaching out | Moving Solutions",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h1 className="text-3xl font-bold">Thanks, we&apos;ve got your enquiry</h1>
      <p className="mt-4 text-black/70">
        We reply within 30 minutes during working hours. If it&apos;s urgent,
        message us directly on WhatsApp.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <WhatsAppCta />
        <Link
          href="/"
          className="rounded-md border border-black/15 px-5 py-3 font-semibold hover:bg-black/5"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
