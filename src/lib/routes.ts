// Central manifest of the 24 routes in the rebuilt architecture (see
// movings-rebuild-plan.md). Drives the sitemap and the footer's full link
// list. Nav links for the header are a curated subset — see Header.tsx.

export type Section =
  "core" | "specialist" | "supporting" | "guides" | "directory";

export type RouteEntry = {
  path: string;
  label: string;
  section: Section;
};

export const ROUTES: RouteEntry[] = [
  { path: "/blog", label: "Blog", section: "guides" },
  // Core (7)
  { path: "/", label: "Home", section: "core" },
  { path: "/pricing", label: "Pricing", section: "core" },
  { path: "/storage", label: "Storage", section: "core" },
  { path: "/house-moving", label: "House Moving", section: "core" },
  { path: "/office-moving", label: "Office Moving", section: "core" },
  { path: "/packing", label: "Packing", section: "core" },
  { path: "/contact", label: "Contact", section: "core" },

  // Specialist (6)
  {
    path: "/no-lift-access-movers",
    label: "No-Lift-Access Movers",
    section: "specialist",
  },
  {
    path: "/manpower-only-movers",
    label: "Manpower-Only Movers",
    section: "specialist",
  },
  { path: "/midnight-movers", label: "Midnight Movers", section: "specialist" },
  { path: "/same-day-movers", label: "Same-Day Movers", section: "specialist" },
  { path: "/vendor-gov", label: "Vendor@Gov Movers", section: "specialist" },
  {
    path: "/specialist-moving",
    label: "Specialist Moving (Art, Piano, Safes)",
    section: "specialist",
  },

  // Supporting (3)
  {
    path: "/international-moving",
    label: "International Moving",
    section: "supporting",
  },
  { path: "/disposal", label: "Disposal", section: "supporting" },
  { path: "/about", label: "About", section: "supporting" },

  // Guides (7)
  { path: "/guides", label: "Guides", section: "guides" },
  {
    path: "/guides/moving-costs-hidden-fees",
    label: "Hidden Moving Fees",
    section: "guides",
  },
  {
    path: "/guides/storage-options-singapore",
    label: "Storage Options in Singapore",
    section: "guides",
  },
  { path: "/guides/lorry-sizes", label: "Lorry Sizes", section: "guides" },
  { path: "/guides/bto-moving", label: "BTO Moving", section: "guides" },
  { path: "/guides/condo-moving", label: "Condo Moving", section: "guides" },
  {
    path: "/guides/moving-checklist",
    label: "Moving Checklist",
    section: "guides",
  },

  // Directory (1)
  {
    path: "/movers-directory",
    label: "Movers Directory",
    section: "directory",
  },
];

// /thank-you is intentionally excluded — it's a noindex conversion page
// (added in Phase 4), not one of the 24 indexable routes.

// Pages that describe an actual bookable service, for Service schema.
// Deliberately excludes home, pricing, contact, about, the guides index
// and individual guides, and the movers directory — none of those are a
// service in themselves.
const SERVICE_PATHS = new Set([
  "/storage",
  "/house-moving",
  "/office-moving",
  "/packing",
  "/no-lift-access-movers",
  "/manpower-only-movers",
  "/midnight-movers",
  "/same-day-movers",
  "/vendor-gov",
  "/specialist-moving",
  "/international-moving",
  "/disposal",
]);

export function isServicePath(path: string): boolean {
  return SERVICE_PATHS.has(path);
}

/** Home > [ancestor] > current page, using labels from ROUTES. Falls back
 * to the raw slug segment if a path isn't in ROUTES (shouldn't happen for
 * our own pages, but better than crashing). */
export function getBreadcrumbs(path: string): { name: string; path: string }[] {
  const crumbs: { name: string; path: string }[] = [
    { name: "Home", path: "/" },
  ];
  if (path === "/") return crumbs;

  const segments = path.split("/").filter(Boolean);
  let acc = "";
  for (const segment of segments) {
    acc += `/${segment}`;
    const match = ROUTES.find((r) => r.path === acc);
    crumbs.push({ name: match?.label ?? segment, path: acc });
  }
  return crumbs;
}
