# Movings.sg Rebuild Plan

Prepared 14 September 2026. Based on Google Search Console data for
12 June – 11 September 2026: 94 URLs, 2,141 clicks, 324,437 impressions,
average position 40.

---

## Why rebuild

The site is not underperforming because of WordPress. It is underperforming
because of how it is structured. Three findings from the data:

**1. The URL structure has three parallel namespaces.**
`/services/*`, `/moving-services/*` and `/manpower-services/*` all exist,
plus bare slugs like `/packing/`, `/moving/`, `/storing/`. The same service
is reachable at up to five different addresses.

Packing alone has five URLs:
- `/packing-services-singapore/` — 6,402 impressions, 8 clicks
- `/moving-services/packing-and-unpacking-services/` — 5,455 impressions, 27 clicks
- `/manpower-services/packing-and-unpacking-services/` — 4,671 impressions, 18 clicks
- `/services/packing-and-unpacking-services/` — 1,977 impressions, 10 clicks
- `/packing/` — 9 impressions, 0 clicks

Combined: 18,514 impressions, 63 clicks. One page would have done better
than five competing ones.

**2. The commercial pages get impressions and no clicks at all.**
- `/moving-services/commercial-moving-singapore/` — 9,063 impressions, **0 clicks**, position 62
- `/services/commercial-moving/` — 6,432 impressions, **0 clicks**, position 51
- `/services/commercial-moving/office-relocation-services/` — 4,575 impressions, **0 clicks**, position 73
- `/international-moving/` — 3,443 impressions, **0 clicks**, position 65
- `/storage-services/` — 4,105 impressions, 2 clicks, position 68

That is roughly 28,000 impressions producing 2 clicks.

**3. The best pages are blog posts, not service pages.**
- `/no-lift-access-...` — 251 clicks at **9.23% CTR**, position 10.9
- `/moving-cost-in-singapore-pricing-guide/` — 475 clicks, position 25
- `/hire-reliable-movers-with-manpower-only.../` — 144 clicks, 2.70% CTR
- `/midnight-movers-singapore/` — 71 clicks, position 17.9

These four posts produce 1,141 clicks — over half the site's total — while
the entire `/services/` tree produces almost nothing.

**Conclusion:** the money is in specific, problem-shaped pages. The generic
service hierarchy is dead weight. The rebuild inverts the current structure.

---

## New architecture: 24 pages, down from 94

### Core (7)

| URL | Purpose | Evidence |
|---|---|---|
| `/` | Homepage | Currently position 52.8 for "movers singapore" with 97,173 impressions and 0.44% CTR. Needs real content, prices, named client references, review text. |
| `/pricing` | Rate card | Best commercial page: 478 clicks. Price cluster sits at positions 4–22: "moving house singapore price" (594 impr, pos 21.8), "what is the cost of hiring movers" (328 impr, pos 9.8), "how much do movers cost in singapore" (pos 6.4). |
| `/storage` | Storage services | Strongest untapped cluster: "storage solutions for domestic moves" (799 impr, pos 10.8), "movers with storage options singapore" (428 impr, pos 7.2), "movers and storage" (557 impr, pos 18.6), "moving companies with storage" (480 impr, pos 19.6), "storage services singapore" (400 impr, pos 19.8). ~4,000 impressions, **0 clicks** today. |
| `/house-moving` | HDB, condo, landed | Replaces 14 scattered URLs. |
| `/office-moving` | Commercial and office | Replaces 7 URLs holding 20,950 impressions and 10 clicks. |
| `/packing` | Packing and unpacking | Replaces 14 URLs. "packing services" 679 impr pos 22.5, "household packing services" 490 impr pos 19.5, "packing and storage services" 772 impr pos 24.4. |
| `/contact` | Enquiry | 2,228 impressions, position 16.7 — already ranks. |

### Specialist service pages (6)

These are the proven winners. Each keeps its own URL because each answers a
specific problem that generic mover pages do not.

| URL | Evidence |
|---|---|
| `/no-lift-access-movers` | **251 clicks, 9.23% CTR, position 10.9.** Best page on the site. |
| `/manpower-only-movers` | 144 clicks, 2.70% CTR. "movers without truck" position 2.2. |
| `/midnight-movers` | 71 clicks, position 17.9. |
| `/same-day-movers` | 35 clicks, position 24.7. |
| `/vendor-gov` | 708 impressions at **position 7.46**, 0 clicks. "vendor@gov" 473 impressions at position 7.8. Almost no Singapore mover has this credential. Underexploited. |
| `/specialist-moving` | Artwork, antiques, piano, safes, servers. 1,028 impressions. |

### Supporting (3)

| URL | Notes |
|---|---|
| `/international-moving` | 9,861 impressions, 2 clicks. Keep one page, not two. |
| `/disposal` | Move-related disposal only. Do **not** build item-level pages here — those belong to the disposal properties. |
| `/about` | Client references: Kroll, Trelleborg, STATS ChipPAC, ADM, Sunjoy, OOm. |

### Guides (7)

| URL | Evidence |
|---|---|
| `/guides/moving-costs-hidden-fees` | 57 clicks, 1.93% CTR, position 25.3 |
| `/guides/storage-options-singapore` | 52 clicks, 19,666 impressions, position 14.3 |
| `/guides/lorry-sizes` | Position 9.7 |
| `/guides/bto-moving` | Position 9.2 |
| `/guides/condo-moving` | New |
| `/guides/moving-checklist` | Merges 8 thin posts |
| `/guides` | Index |

### Directory (1)

| URL | Notes |
|---|---|
| `/movers-directory` | Merges three competing listicles: `/movers-singapore-top-10.../` (158 clicks, 52,103 impressions), `/list-of-movers-in-singapore/` (50 clicks), `/60-movers-in-singapore/` (38 clicks). Combined 248 clicks and 68,249 impressions currently split three ways. **Must disclose that Moving Solutions is the site owner.** |

---

## What gets removed

54 URLs disappear, all redirected. The bulk are:

- Duplicate service pages across the three namespaces
- 8 near-zero blog posts merged into `/guides/moving-checklist`
- Author archives, category archives, `/hello-world/`, uploaded image URLs

No content is lost. Everything either survives as a page or is merged into one.

---

## Critical rules

1. **Every one of the 94 URLs gets a 301.** The map is in
   `movings-redirect-map.csv`. This is where migrations fail.

2. **Keep `www.movings.sg`.** The site currently serves www and Google has
   indexed it that way. Changing the canonical host during a rebuild adds
   risk for no benefit.

3. **Do not touch the Google Business Profile.** The GBP-tagged URL ranks at
   position 8.8 while the plain homepage ranks at 52.8. The profile is
   carrying this business. After launch, verify the website field still
   points at `https://www.movings.sg/?utm_source=google&utm_medium=organic&utm_campaign=gbp`.

4. **Server-render everything.** Current homepage renders "Please enable
   JavaScript" twice and shows "Trusted By Residents Across Singapore" as an
   empty heading. AI crawlers do not execute JavaScript — that is what
   ChatGPT and Perplexity currently see.

5. **No item-level disposal pages.** Sofa, mattress, fridge disposal belong
   to the disposal properties. Movings covers disposal only as part of a move.

6. **Add LocalBusiness and Service schema.** Competitors ranking above you
   have it; movings.sg has none.

---

## Expected outcome

disposalservices.com.sg, built on the same principle, went from position 77
to 22.5 in eight weeks.

Realistic expectation here: a dip for 2–4 weeks while Google reprocesses 94
redirects, then recovery, then improvement from roughly week 6. Judge it at
12 weeks, not before.

The single biggest available win is the storage cluster — roughly 4,000
impressions at positions 7–25 currently producing zero clicks, because
`/storage-services/` sits at position 68 while a blog post ranks at 14.
