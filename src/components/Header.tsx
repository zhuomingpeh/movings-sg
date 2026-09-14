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
          <span className="brand-icon" aria-hidden="true">
            ↗
          </span>
          <span>
            moving<span className="brand-sub">SOLUTIONS</span>
          </span>
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
            Get a quote ↗
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
