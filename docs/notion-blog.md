# Publishing the Movings blog with Notion

Database: https://app.notion.com/p/3dcb3c5e8efd8039ab63cc899ae98eae
Website: https://www.movings.sg/blog

## Write a post
1. Add a row in the Moving Solutions database.
2. Fill Name (article title), Slug (lowercase words separated by hyphens), Description, Category and Published date.
3. Write the article inside the page. Headings, paragraphs, lists, links, images and basic tables are supported. Avoid embedded databases and unsupported Notion widgets.
4. Add a Notion page cover or set Cover URL.
5. Set Status to Published. Draft, blank status, duplicate or invalid slugs, and future dates do not appear publicly.

The site checks cached Notion data after 60 seconds when visited. The first visit after expiry can see the previous version while refresh runs; refresh again shortly afterwards. There is no webhook or scheduled background job and no manual deployment needed. Published edits work the same way. To unpublish, set Draft and allow the cache to refresh. Keep Slug stable after publication to avoid broken links.

## Sitemap updates
Published Notion posts automatically enter https://www.movings.sg/sitemap.xml through the same cached query. Drafts, future-dated posts, invalid/duplicate slugs and retired posts are excluded. No deployment or manual sitemap edit is needed for a normal blog post. Allow the 60-second cache to expire and a subsequent request to refresh it; Google indexing is a separate process.

Standalone service pages and guides are maintained in the website code. Add an indexable page to src/lib/routes.ts when creating it, then deploy: the sitemap includes that route automatically. Creating a random page elsewhere in Notion does not create a website page or sitemap entry.

## Original WordPress posts
42 public posts were imported, with WordPress ID and Original URL retained. Original content responses and converted Markdown are backed up locally in backups/wordpress (Git-ignored); this is NOT a full database/WordPress backup and does not include drafts or private posts.
58 WordPress image files are stored under public/images/blog. Their Notion references use the Vercel site URL and will work independently of WordPress. New Notion-uploaded images use temporary signed URLs refreshed with the article content; they are not automatically backed up to permanent storage. Maintain separate exports of new content and images.

Original post URLs redirect in one step to /blog/<original-slug>, overriding the old service-page consolidation redirects. The six existing guides remain separate.

## Integration
Notion database has Name, Status (Draft/Published), Slug, Description, Published date, Category, WordPress ID, Original URL and Cover URL. Integration secrets are in Git-ignored .env.local and encrypted Vercel project environment variables. Never put tokens in client-side code or NEXT_PUBLIC variables.

Site pages render article content on the server and sanitize HTML. Unsupported/truncated markdown fails visibly instead of silently publishing an incomplete article. Notion outages show the blog error page when cached content cannot be used; other service pages continue working. Sitemap depends on the same published-post query.

Import can be resumed with python scripts/import-wordpress-notion.py; existing WordPress IDs are skipped to protect edits. Dependencies: Python markdownify and beautifulsoup4.

## Uploading photos
Open the post itself (not just the database row). For the thumbnail/hero, choose Add cover, Change cover, then Upload. For images within the article, type /image, choose Image, then Upload, or drag the photo into the article. A database Files property is not read by this website: use the page cover and body images. Suggested uploads: JPG or WebP, around 1600 pixels wide, ideally under 300 KB, with a meaningful caption/alt description. Preview the published article after the cache refresh. Description controls the search snippet; Category is optional.

## Retired directory content (16 September 2026)
The three company-list articles in content/retired-blog-slugs.json are Draft in Notion and excluded in code. The directory page and its legacy paths return HTTP 410 with noindex on the new site. Restoring these pages requires an intentional code change as well as a Notion status change. Original WordPress copies remain on the old host until separately unpublished or the domain is switched.
