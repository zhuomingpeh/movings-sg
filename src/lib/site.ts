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
  // TODO(Ming): confirm exact opening hours and geo coordinates for schema.
  gbpUrl: `${SITE_URL}/?utm_source=google&utm_medium=organic&utm_campaign=gbp`,
} as const;

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${BUSINESS.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
