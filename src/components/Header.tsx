import ArrowUpRight from "@/components/ArrowUpRight";
import Image from "next/image";
import Link from "next/link";
import WhatsAppCta from "./WhatsAppCta";
const links = [
  ["Services", "/#services"],
  ["Pricing", "/pricing"],
  ["Storage", "/storage"],
  ["About us", "/about"],
  ["Guides", "/guides"],
  ["Contact", "/contact"],
];
export default function Header() {
  return (
    <header className="site-header">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <div className="shell header-inner">
        <Link href="/" className="wordmark" aria-label="Moving Solutions home">
          <Image
            src="/images/moving-solutions-logo.webp"
            alt="Moving Solutions"
            width={948}
            height={294}
            sizes="(max-width:480px) 140px, 200px"
            className="brand-logo"
            preload
          />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([label, href]) => (
            <Link href={href} key={href}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <WhatsAppCta className="button-primary header-quote">
            Get a quote <ArrowUpRight />
          </WhatsAppCta>
          <details className="mobile-menu">
            <summary>Menu</summary>
            <nav aria-label="Mobile navigation">
              {links.map(([label, href]) => (
                <Link href={href} key={href}>
                  {label}
                </Link>
              ))}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
