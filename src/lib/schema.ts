// JSON-LD builders for structured data (Phase 4 of the rebuild brief):
// LocalBusiness on the homepage, Service on each service page, FAQPage
// where FAQs exist, BreadcrumbList site-wide.

import { BUSINESS, SITE_NAME, SITE_URL, SOCIAL } from "./site";

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    "@id": `${SITE_URL}/#business`,
    areaServed: { "@type": "Country", name: "Singapore" },
    name: SITE_NAME,
    legalName: BUSINESS.legalName,
    url: SITE_URL,
    telephone: BUSINESS.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.address.street,
      addressLocality: BUSINESS.address.locality,
      postalCode: BUSINESS.address.postalCode,
      addressCountry: BUSINESS.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.geo.latitude,
      longitude: BUSINESS.geo.longitude,
    },
    // Opening hours deliberately omitted: not yet confirmed (see TODO in
    // src/lib/site.ts). Add an `openingHoursSpecification` array once Ming
    // supplies real hours.
    sameAs: [SOCIAL.facebook, SOCIAL.instagram, SOCIAL.google].filter(Boolean),

  };
}

export function serviceSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${SITE_URL}${url}`,
    provider: {
      "@type": "LocalBusiness",
      name: SITE_NAME,
      telephone: BUSINESS.phone,
    },
    areaServed: {
      "@type": "Country",
      name: "Singapore",
    },
  };
}

export function faqPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbListSchema(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })),
  };
}
