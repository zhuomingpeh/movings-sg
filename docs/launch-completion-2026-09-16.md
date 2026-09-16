# Movings production launch — 16 September 2026

## Live website

- https://www.movings.sg now serves the new website on Vercel. HTTP and apex variants redirect to the HTTPS www address. Vercel reports both domain configurations valid.
- Production deployment: https://movings-a7e3jf387-loanify.vercel.app, redeployed from the previously verified production source with the new email configuration.
- Live audit: 63 sitemap pages, 80 additional link/image targets; no failures, broken targets, duplicate titles/descriptions, or missing image alt attributes. All 243 redirect/retirement checks passed on the business domain.
- Real-domain pages are indexable. The Vercel alias retains noindex. Sitemap, robots.txt and llms.txt use the canonical www domain.
- 39 blog posts remain published through Notion. Three directory/list posts remain Draft; retired directory paths return HTTP 410/noindex on the business domain.

## Email and hosting

- Exabytes/Plesk remains the mailbox host. MX still points to mail.movings.sg; mail and webmail retain 103.7.8.230. Webmail HTTPS returned 200 with normal certificate validation after cutover.
- Existing SPF, DKIM, DMARC, Google verification and other retained mail records were compared exactly before/after cutover and are unchanged.
- FTP now aliases ipv4.movings.sg, which retains the old server address. IMAPS/POP3S/SMTPS SRV discovery targets sp131.sgcloudhosting.cloud on ports 993/995/465; all three TLS hostname checks passed. These no longer follow the website's apex address to Vercel.
- Resend domain movings.sg is verified. The new `Movings website enquiries` key has sending access restricted to movings.sg. It is saved as an encrypted production environment variable only in the Movings project, with EMAIL_FROM and LEADS_EMAIL_TO. No key is stored in this repository.
- Form test submitted successfully and redirected to /thank-you. Resend accepted the message to contact@movings.sg; delivery status is still being checked. Test message ID: 61a711ad-29b2-478b-bb0b-fbc9fa8d188b.
- The user confirmed the backup is OK before website cutover. Backup archive contents were not independently inspected in this session. Keep Exabytes hosting and the old WordPress files available; the mailbox still depends on Exabytes.
- Loanify, other domains, and existing Resend keys were not modified.

## Owner follow-up

Search Console sitemap submission, GA4/Business Profile ownership checks, approved privacy information, and confirmation of advertised business prices/hours/terms remain owner-dependent tasks from the earlier audit. They are separate from the completed website DNS and deployment work.

## Rollback

DNS snapshots are kept locally in the Git-ignored backups/dns folder. Restore apex A to 103.7.8.230 and www CNAME to movings.sg to route the website back to WordPress; retain mail records and Resend verification. DNS TTL is 300 seconds, though caches can vary. Do not cancel Exabytes or delete the old WordPress installation.
