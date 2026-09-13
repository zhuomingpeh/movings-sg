// Shared parser for movings-redirect-map.csv, used by both next.config.ts
// (to build the actual redirects) and scripts/test-redirects.mjs (to verify
// them against a running server). Keeping one implementation means the
// redirects we ship and the redirects we test can never drift apart.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_CSV_PATH = path.join(__dirname, "..", "movings-redirect-map.csv");

export const CATCH_ALL_PREFIXES = [
  "/services",
  "/moving-services",
  "/manpower-services",
];

// The 24 routes in the new site (kept in sync with src/lib/routes.ts by
// hand — that file is TypeScript under src/, this one is plain JS used by
// next.config.ts, so it can't import it directly). Used only to generate
// trailing-slash-normalize redirects for our own pages.
export const CANONICAL_PATHS = [
  "/",
  "/pricing",
  "/storage",
  "/house-moving",
  "/office-moving",
  "/packing",
  "/contact",
  "/no-lift-access-movers",
  "/manpower-only-movers",
  "/midnight-movers",
  "/same-day-movers",
  "/vendor-gov",
  "/specialist-moving",
  "/international-moving",
  "/disposal",
  "/about",
  "/guides",
  "/guides/moving-costs-hidden-fees",
  "/guides/storage-options-singapore",
  "/guides/lorry-sizes",
  "/guides/bto-moving",
  "/guides/condo-moving",
  "/guides/moving-checklist",
  "/movers-directory",
];

export function stripQuery(url) {
  return url.split("?")[0];
}

/** "/foo/", "/foo", "/foo/?x=1" all normalize to "/foo". "/" stays "/". */
export function normalizePath(url) {
  const noQuery = stripQuery(url);
  if (noQuery === "/") return "/";
  return noQuery.endsWith("/") ? noQuery.slice(0, -1) : noQuery;
}

/** Parse the CSV into row objects. Field order: old_url, new_url, clicks_3mo,
 * impressions_3mo, position. None of the URLs in the map contain commas, so
 * a plain split is safe here. */
export function parseCsv(csvPath = DEFAULT_CSV_PATH) {
  const raw = fs.readFileSync(csvPath, "utf8").trim();
  const [, ...lines] = raw.split(/\r?\n/);
  return lines.filter(Boolean).map((line) => {
    const [old_url, new_url, clicks_3mo, impressions_3mo, position] =
      line.split(",");
    return { old_url, new_url, clicks_3mo, impressions_3mo, position };
  });
}

/**
 * Build the deduplicated { source, destination } redirect rules derived
 * from the CSV: both trailing-slash and non-trailing-slash variants of
 * every old URL, plus a catch-all for each retired namespace, plus a
 * trailing-slash-normalize rule for each of our own 24 canonical routes.
 *
 * Every one of the 90 CSV rows gets at least one rule — the plan's own
 * rule is "every one of the 94 URLs gets a 301" — with exactly one
 * exception: a row is skipped only when its old URL (query string
 * stripped) is *literally* identical to its new URL, meaning it's already
 * the right page at the right address (the bare homepage, and its
 * GBP-tracked query-string variant — redirecting either would either loop
 * or drop the GBP attribution params).
 */
export function buildRedirectRules(csvPath = DEFAULT_CSV_PATH) {
  const rows = parseCsv(csvPath);
  const seen = new Set();
  const rules = [];

  const addRule = (source, destination) => {
    if (seen.has(source)) return;
    seen.add(source);
    rules.push({ source, destination });
  };

  for (const row of rows) {
    if (stripQuery(row.old_url) === row.new_url) continue; // already correct

    const oldPath = normalizePath(row.old_url);
    const newPath = row.new_url === "/" ? "/" : row.new_url.replace(/\/$/, "");

    const variants = oldPath === "/" ? [oldPath] : [oldPath, `${oldPath}/`];
    for (const source of variants) addRule(source, newPath);
  }

  for (const prefix of CATCH_ALL_PREFIXES) {
    addRule(`${prefix}/:path*`, "/");
  }

  // Next's own trailing-slash redirect is disabled (skipTrailingSlashRedirect
  // in next.config.ts) so every slash variant gets an explicit 301 instead
  // of a 308 — including for our own pages, not just retired ones.
  for (const path of CANONICAL_PATHS) {
    if (path === "/") continue;
    addRule(`${path}/`, path);
  }

  return rules;
}
