import Link from "next/link";
import WhatsAppCta from "./WhatsAppCta";
import { SITE_NAME } from "@/lib/site";

// Curated subset for the header nav — the full 24-route list lives in the
// footer. Keep this short; it's a nav, not a sitemap.
const NAV_LINKS = [
  { href: "/pricing", label: "Pricing" },
  { href: "/storage", label: "Storage" },
  { href: "/house-moving", label: "House Moving" },
  { href: "/office-moving", label: "Office Moving" },
  { href: "/guides", label: "Guides" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="border-b border-black/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="text-lg font-bold">
          {SITE_NAME}
        </Link>
        <nav className="hidden gap-6 text-sm font-medium md:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:underline">
              {link.label}
            </Link>
          ))}
        </nav>
        <WhatsAppCta className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700">
          WhatsApp Us
        </WhatsAppCta>
      </div>
    </header>
  );
}
