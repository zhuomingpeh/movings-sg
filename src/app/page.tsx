import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ClientLogos from "@/components/ClientLogos";
import WhatsAppCta from "@/components/WhatsAppCta";
import JsonLd from "@/components/JsonLd";
import { localBusinessSchema } from "@/lib/schema";
import { getPage } from "@/lib/content";

export function generateMetadata(): Metadata {
  const { frontmatter } = getPage("home");
  return {
    title: frontmatter.title,
    description: frontmatter.description,
    alternates: { canonical: "/" },
  };
}
const services = [
  [
    "01",
    "House moving",
    "From your first HDB to your next family home.",
    "/house-moving",
    "moving",
  ],
  [
    "02",
    "Packing & unpacking",
    "A little extra care for everything you bring.",
    "/packing",
    "packing",
  ],
  [
    "03",
    "Moving & storage",
    "Room for your belongings between addresses.",
    "/storage",
    "storage",
  ],
  [
    "04",
    "Furniture disposal",
    "Make space for what comes next.",
    "/disposal",
    "disposal",
  ],
];
export default function Page() {
  const content = getPage("home");
  return (
    <div className="home-design">
      <JsonLd data={localBusinessSchema()} />
      <section className="home-hero shell">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" /> YOUR LOCAL SINGAPORE MOVERS
          </p>
          <h1>
            A new place.
            <br />A fresh start.
            <br />
            <em>We’ll move you.</em>
          </h1>
          <p className="hero-description">
            From the first box to the last piece of furniture. Moving, packing
            and storage for homes and businesses across Singapore.
          </p>
          <div className="button-row">
            <WhatsAppCta className="button-primary">
              Get a moving quote <span aria-hidden="true">↗</span>
            </WhatsAppCta>
            <Link className="button-secondary" href="/pricing">
              Explore our prices
            </Link>
          </div>
          <div className="hero-notes">
            <span>HDB · Condo · Landed</span>
            <span>Office & commercial</span>
          </div>
        </div>
        <div className="hero-photo">
          <Image
            src="/images/about-us.webp"
            alt="Moving Solutions crew loading furniture into a moving truck"
            width={1024}
            height={576}
            sizes="(max-width: 800px) 100vw, 55vw"
            preload
          />
          <div className="photo-caption">
            <span>THE PEOPLE BEHIND YOUR MOVE</span>
            <strong>Real crew. Real care.</strong>
          </div>
          <div className="photo-label">
            Singapore, island-wide <span aria-hidden="true">↗</span>
          </div>
        </div>
      </section>
      <div className="service-strip">
        <div className="shell">
          <span>Moving homes.</span>
          <span>Moving businesses.</span>
          <span>Making room for what’s next.</span>
          <span aria-hidden="true">↗</span>
        </div>
      </div>
      <section className="shell home-section" id="services">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / WHAT WE DO</p>
            <h2>
              Big moves.
              <br />
              Small details, handled.
            </h2>
          </div>
          <p>
            Pick the help you need. We’ll plan around your items, access and
            moving dates.
          </p>
        </div>
        <div className="service-cards">
          {services.map(([n, title, desc, href, img]) => (
            <Link href={href} className="service-card" key={href}>
              <div className="service-art">
                <Image
                  src={`/images/services/${img}.webp`}
                  alt=""
                  width={1080}
                  height={1080}
                  sizes="(max-width: 600px) 85vw, (max-width: 1000px) 45vw, 25vw"
                />
              </div>
              <div className="service-card-copy">
                <span className="service-number">{n}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
                <span className="round-arrow" aria-hidden="true">
                  ↗
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="specialist-links">
          <span>A move with a twist?</span>
          {[
            ["Stairs & walk-ups", "/no-lift-access-movers"],
            ["Office relocation", "/office-moving"],
            ["Manpower only", "/manpower-only-movers"],
            ["After hours", "/midnight-movers"],
            ["Art, pianos & safes", "/specialist-moving"],
          ].map(([label, href]) => (
            <Link key={href} href={href}>
              {label} ↗
            </Link>
          ))}
        </div>
      </section>
      <section className="process-section">
        <div className="shell home-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">02 / LET’S GET YOU MOVING</p>
              <h2>
                Less guesswork.
                <br />A clearer moving plan.
              </h2>
            </div>
            <Link href="/guides/moving-checklist" className="text-link">
              Your moving checklist ↗
            </Link>
          </div>
          <div className="process-grid">
            {[
              [
                "01",
                "Show us your move",
                "Send an item list, photos and your preferred date. Tell us about lifts, stairs and loading bays.",
              ],
              [
                "02",
                "Agree on the details",
                "We’ll work through access, packing, storage and the scope of your quote before moving day.",
              ],
              [
                "03",
                "Leave the lifting to us",
                "Our crew loads, transports and places your belongings according to the agreed plan.",
              ],
            ].map(([n, title, desc]) => (
              <div key={n}>
                <span className="step-number">{n}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="shell home-section story-section">
        <div>
          <p className="eyebrow">03 / PEOPLE, NOT JUST BOXES</p>
          <h2>
            Your next chapter.
            <br />
            Our everyday work.
          </h2>
          <div
            className="prose prose-neutral"
            dangerouslySetInnerHTML={{ __html: content.html }}
          />
          <Link className="text-link" href="/about">
            Meet Moving Solutions ↗
          </Link>
        </div>
        <figure>
          <Image
            src="/images/home/staff-2.jpeg"
            alt="Moving Solutions team in uniform"
            width={1024}
            height={333}
            sizes="(max-width:800px) 100vw, 50vw"
          />
          <figcaption>Our team, ready for your next move.</figcaption>
          <div className="story-note">
            <span aria-hidden="true">↗</span>
            <p>
              From Woodlands
              <br />
              to wherever’s next.
            </p>
          </div>
        </figure>
      </section>
      <section className="clients-section">
        <div className="shell">
          <p className="eyebrow">IN GOOD COMPANY</p>
          <h2>Trusted with their next move.</h2>
          <ClientLogos />
        </div>
      </section>
      <section className="shell home-section">
        <div className="quote-panel">
          <div>
            <p className="eyebrow">LET’S TALK ABOUT YOUR MOVE</p>
            <h2>
              New keys?
              <br />
              Let’s get you there.
            </h2>
            <p>
              Send your photos, addresses and moving date.
              <br />
              We’ll take it from there.
            </p>
          </div>
          <WhatsAppCta className="button-light">
            Start on WhatsApp <span aria-hidden="true">↗</span>
          </WhatsAppCta>
        </div>
      </section>
    </div>
  );
}
