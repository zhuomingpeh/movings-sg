// Central business/site constants. Single source of truth for anything that
// shows up in multiple places (schema, footer, WhatsApp links, metadata).

export const SITE_URL = "https://www.movings.sg";
export const SITE_NAME = "Moving Solutions";

export const BUSINESS = {
  legalName: "Moving Solutions",
  uen: "53500918J",
  phone: "+65 8801 2025",
  phoneHref: "+6588012025",
  whatsappNumber: "6588012025",
  address: {
    street: "31 Woodlands Close #03-21, Woodlands Horizon",
    locality: "Singapore",
    postalCode: "737855",
    country: "SG",
  },
  // Geocoded from the address via Google Maps (building-level accuracy).
  // TODO(Ming): confirm this is precise enough, and supply opening hours
  // (left out of the schema entirely below rather than guessed, since a
  // wrong "open now" is worse than no hours at all).
  geo: { latitude: 1.4365555, longitude: 103.8060065 },
  gbpUrl: `${SITE_URL}/?utm_source=google&utm_medium=organic&utm_campaign=gbp`,
} as const;

export const GA_MEASUREMENT_ID = "G-9H77FRG0MM";

// Real profile links, supplied by Ming.
export const SOCIAL = {
  facebook: "https://www.facebook.com/movings.sg/",
  instagram: "https://www.instagram.com/movingsolutions.sg/",
  google: "https://share.google/bdGYKzy9D9OvNpdqU",
} as const;

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${BUSINESS.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
