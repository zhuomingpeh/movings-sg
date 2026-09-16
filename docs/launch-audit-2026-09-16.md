# Movings.sg launch audit — 16 September 2026

The new website is deployed on movings-sg.vercel.app. The public business domain www.movings.sg still serves WordPress. This audit does not change DNS or Loanify.

## Completed fixes
- Retired /movers-directory and /60-movers-in-singapore and the three directory/list blog articles: Movers Singapore – Top 10 Best Moving Companies; List of Movers in Singapore; Top 10 Storage Solutions in Singapore. All three are retained as Draft in Notion. 39 other posts remain published.
- New-site retired paths return HTTP 410 and noindex (both slash variants). They are absent from the blog, navigation, sitemap and llms.txt. Fixed the guide link to the removed directory. Other legacy posts keep their redirects.
- Vercel aliases receive noindex, follow. Canonicals, sitemap and llms.txt consistently use https://www.movings.sg for the planned launch. The real domain remains indexable after cutover. No robots.txt disallow is used to hide the noindex directive.
- Added unique page Open Graph/Twitter metadata and article breadcrumb schema. Corrected two duplicate Notion descriptions. All 63 sitemap pages now have distinct titles and descriptions, a canonical, one H1 and social metadata.
- Kept business/service/article/FAQ/breadcrumb structured data. Changed the business type to MovingCompany and removed the aggregate score derived from selected testimonials. Visible testimonials remain. Self-serving local-business reviews do not qualify for Google's review stars.
- Escaped JSON-LD to prevent Notion titles containing HTML from breaking out of a script tag. Notion article HTML remains sanitized; credentials remain server-only.
- Enquiry form now reports delivery/configuration failures instead of falsely thanking the visitor. Added length/format validation, a honeypot and a sending state. No lead details are printed to logs. This is basic protection, not durable abuse rate limiting.
- Vercel preview visits no longer send GA page views/events. Mobile menu now closes on navigation and Escape; the mobile quote button fits on one line.
- Removed misleading constantly changing static sitemap modification dates. Notion article modification dates remain accurate to the Notion edit timestamp.

## Verification
- Production build passed; TypeScript passed. ESLint has no errors, with two deliberate native-image optimisation warnings for Notion images.
- 243/243 redirect and retirement checks passed locally. Live checks are run after deployment.
- Crawl: 63 pages (24 site/guide/index pages plus 39 blog posts), 80 additional internal link/image targets. All return success; no duplicate titles/descriptions; one H1 per page; JSON-LD parses; no missing image alt attributes. An empty decorative alt is not the same as a descriptive alt.
- Mobile browser inspection at 390 × 844: homepage, blog cards and menu; tested menu navigation. Desktop form failure tested with dummy local data and no email configured. No real email was sent.
- Mobile Lighthouse local homepage: performance 95, accessibility 100, best practices 100, SEO 100; LCP approximately 3.0 seconds, CLS 0, TBT 30 ms. A synthetic local result, not production Core Web Vitals or a ranking score. Lighthouse produced a valid report but its Windows temporary-profile cleanup returned EPERM. A small menu fix followed this measurement.
- npm production-dependency audit reported zero known vulnerabilities at this check. This is not a penetration test.
- Read-only Vercel check: only Notion environment variables are configured; only movings-sg.vercel.app is attached to this project. No email provider configuration exists in this project.

## Required before the business-domain launch
1. **DNS access and launch timing.** Identify the DNS host and confirm www.movings.sg as canonical. Add both hostnames to this Vercel project, configure HTTPS and apex-to-www redirects, preserve all mail records, then verify HTTP/HTTPS/www/non-www variants. Do not alter Loanify project settings.
2. **Full WordPress backup.** Need database plus wp-content/uploads, themes and plugins. The existing 42-post export and 58 copied images are not a full backup. Keep WordPress available for rollback for at least 90 days; do not delete it.
3. **Email setup.** Confirm the enquiry recipient (currently contact@movings.sg) and sender domain. Configure a verified Resend sender and RESEND_API_KEY, EMAIL_FROM, LEADS_EMAIL_TO on Movings only. Then send an explicitly authorised test and confirm inbox delivery. Current failure handling is honest but does not make email work.
4. **Business facts.** Confirm office/service hours, the 30-minute response claim, prices including SGD 80 minimum and SGD 60/m³/month storage, inclusions, GST treatment, actual address/service area, insurance/damage terms and cancellation/deposit rules. Do not invent these in schema or copy.
5. **Privacy information.** Provide the approved customer privacy notice and the contact for enquiries about data. The current form collects names, phone numbers, email and move details, and the production site uses GA4. A public explanation of those uses is missing.
6. **Search/analytics ownership.** Need Search Console, GA4 and Google Business Profile access or owner verification. Submit the production sitemap after cutover, inspect key URLs and confirm conversion events. Account receipt and indexing have not been verified.
7. **Old WordPress directory posts.** All three still returned HTTP 200 on www.movings.sg during this audit. They must be set to draft there too if removal is wanted before cutover. The new-site 410 rules take effect on the business domain after cutover. WordPress username/login access is needed for immediate removal from the old host.

## SEO and GEO assessment
The technical foundations are in place; this is not a claim that every article is optimised or that rankings are guaranteed. llms.txt is present and updated, but Google explicitly says it does not use that file for rankings or AI features. Useful original content, crawlability, reliable business facts and a maintained Google Business Profile matter more.

Similar subject matter alone does not prove keyword cannibalisation. Several imported posts overlap with service pages and guides (packing, moving prices, same-day moves, BTO/condo, lorry sizes and storage). Review Search Console query-to-page data before further consolidation. Assign service pages booking intent, guides planning intent, and blog posts specific questions/case studies. Give each a distinct purpose and add contextual links to the relevant service. Avoid deleting useful posts solely because a keyword repeats.

## Next improvements in priority order
- Complete email, domain, backup and business-fact checks above.
- Improve mobile LCP below 2.5 s; inspect the hero request priority and responsive image delivery, then measure production real-user data. Add production error monitoring and uptime checks when the user chooses an account/provider.
- Add persistent spam rate limiting or Turnstile to enquiries and durable lead storage/retry so provider outages cannot lose enquiries.
- Add a controlled backup process for new Notion posts and images. Uploaded Notion images currently rely on expiring signed URLs refreshed with content; they are not copied to permanent storage automatically. During extended Notion outages expired image URLs can fail.
- Replace generic introductory blog excerpts with finished descriptions, use descriptive photo alt text/captions, add specific author/reviewer details and a content review schedule. Preserve stable slugs.
- Publish real move case studies with permission: property/access constraints, packing approach, crew/time, scope and price range. Prefer original evidence over more generic moving advice.
- Add blog categories/filtering and related articles if browsing 39 posts becomes cumbersome. Improve service-specific sharing images.
- Validate structured data with Google's Rich Results Test after domain cutover and monitor Search Console for indexing/404 changes. FAQ markup alone does not guarantee a rich result.

## Photos for new Notion posts
Open the article page. For its card/hero image choose **Add cover → Change cover → Upload**. For an image within the article type **/image → Image → Upload**, or drag a photo into the body. Use the page cover, not an arbitrary database Files property. Aim for JPG/WebP around 1600 px wide and under 300 KB when practical. Add a meaningful caption/alt description, publish and inspect after about a minute plus a refresh. Keep original photo backups.

## Sources and limits
- Google AI optimisation: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Google review structured-data policy: https://developers.google.com/search/docs/appearance/structured-data/review-snippet
- Notion images: https://www.notion.com/en-gb/help/images-files-and-media
- Evidence: docs/launch-crawl.json; local docs/lighthouse-mobile.json; scripts/test-redirects.mjs.
- Not completed: actual email delivery, DNS/SSL cutover, account-level Search Console/GA/GBP verification, field Core Web Vitals, a full security/accessibility audit, legal-policy review, full WordPress backup, or a complete factual/editorial review of every imported article.
