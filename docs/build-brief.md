# Movings.sg Rebuild — Build Brief for Claude Code

Give this file to Claude Code along with `movings-redirect-map.csv` and
`movings-rebuild-plan.md`. Run the phases in order. Do not skip to Phase 5.

---

## Stack

- **Next.js (App Router)** with static generation
- **Tailwind CSS**
- **Markdown content** in `/content` — every page body is a `.md` file
- **Keystatic** for editing (added in Phase 6, not before)
- **Vercel** for hosting
- **No client-side rendering for content.** Every word must be in the HTML
  source. This is non-negotiable — AI crawlers do not run JavaScript.

---

## Phase 1 — Scaffold

Create a Next.js App Router project with Tailwind. Set up:

- `/content/pages/*.md` — one file per page, with frontmatter for
  `title`, `description`, `slug`, `h1`
- `/content/guides/*.md` — guide posts
- A layout with header nav, footer, WhatsApp CTA
- `next-sitemap` or equivalent for automatic XML sitemap generation
- `robots.txt` allowing all crawlers

Build the 24 routes listed in `movings-rebuild-plan.md` as empty stubs first.
Confirm every route returns 200 before writing any content.

**Do not deploy yet.**

---

## Phase 2 — Redirects

Read `movings-redirect-map.csv`. It has 90 rows: `old_url`, `new_url`,
`clicks_3mo`, `impressions_3mo`, `position`.

Generate `next.config.js` redirects — every entry a **permanent 301**.

Then:
- Handle both trailing-slash and non-trailing-slash variants of every old URL
- Add a catch-all: any unmatched `/services/*`, `/moving-services/*` or
  `/manpower-services/*` path redirects to `/`
- Write a test script that fetches all 90 old URLs against the local build
  and asserts each returns 301 to the mapped destination

**Report the test results before proceeding.** If any redirect fails, fix it
now — this is the step that kills migrations.

---

## Phase 3 — Content

Write each page as markdown. Rules that apply to every page:

- Singapore English. No em-dashes. No "seamless", "hassle-free",
  "peace of mind", "we understand that".
- Concrete over generic: lift access, loading bays, MCST rules, stair carry,
  dismantling, HDB vs condo, weekday vs weekend.
- Every page ends with a clear next step and the WhatsApp link.
- Prices where known. Ming must supply the rate card for `/pricing` — leave
  clearly marked `[RATE TBC]` placeholders rather than inventing numbers.

**Priority order** (build these four first, they carry the site):

1. `/pricing` — rate table, what pushes price up, what's included, what
   costs extra, FAQ. Target: "moving house singapore price", "what is the
   cost of hiring movers", "mover price singapore".

2. `/storage` — the biggest opportunity. Storage types, how pricing works
   (existing rate: SGD 60 per cubic metre per month), minimum duration,
   access arrangements, what can and cannot be stored, how storage combines
   with a move. Target: "movers with storage singapore", "moving companies
   with storage", "storage services singapore".

3. `/` — homepage. Replace the four one-line claims. Needs: what the company
   does, price anchoring with a link to `/pricing`, the named client
   references, real review text as HTML (not a widget), the specialist
   services as links, and a server-rendered enquiry form.

4. `/no-lift-access-movers` — preserve and improve. This page has 9.23% CTR
   at position 10.9. Do not degrade it. Keep its angle: stairs, walk-ups,
   maisonettes, what it costs, how the crew is sized.

Then the remaining 20 pages.

**Merged pages:** where the map shows several old URLs pointing at one new
page, pull the substance out of each old page before writing. Fetch the live
old URLs to read them. Do not discard content that was ranking.

---

## Phase 4 — Technical

- **Schema:** `LocalBusiness` on the homepage with name, address
  (31 Woodlands Close #03-21, Woodlands Horizon, Singapore 737855), phone
  (+65 8801 2025), UEN 53500918J, opening hours, geo coordinates.
  `Service` schema on each service page. `FAQPage` where FAQs exist.
  `BreadcrumbList` site-wide.
- **Titles:** under 60 characters, service first, brand last. Never lead with
  "Moving Solutions".
- **Canonicals:** self-referencing on every page, `https://www.movings.sg`.
- **GA4:** measurement ID `G-9H77FRG0MM` via a single gtag include. One tag
  system only — no GTM, no Site Kit, no second source.
- **Conversion events:** `whatsapp_click`, `phone_click`, and a thank-you
  page at `/thank-you` (noindex) that the enquiry form redirects to.
  `tel:` and `wa.me` clicks need explicit listeners — GA4 Enhanced
  Measurement does not track them.
- **Performance:** target LCP under 2.5s on mobile. Images as WebP with
  explicit dimensions.

---

## Phase 5 — Launch

Order matters:

1. Deploy to a Vercel preview URL. Do not point DNS yet.
2. Run the redirect test suite against the preview.
3. Crawl the preview: every page 200, every canonical self-referencing,
   no orphan pages, sitemap complete.
4. **Full WordPress backup before DNS changes.**
5. Point DNS at Vercel. Keep the WordPress install intact and untouched for
   at least 90 days as a rollback.
6. Verify `https://www.movings.sg` serves the new site and that
   `http://`, non-www and `http://www` all 301 to it.
7. Submit the new sitemap in Search Console.
8. Re-verify the Google Business Profile website field still resolves.
9. Run the homepage through Facebook Sharing Debugger and re-scrape.

**Do not delete the WordPress site.**

---

## Phase 6 — Editing (after launch is stable)

Add Keystatic pointed at `/content`. Gives a browser editor that commits
markdown to the repo. New guides are written as markdown, committed, and
Vercel rebuilds automatically.

---

## Reporting

After each phase, report: what was built, what was tested, what failed, and
anything in the brief that turned out to be wrong or impossible. Do not
proceed to the next phase without reporting.
