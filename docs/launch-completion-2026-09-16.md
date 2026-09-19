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
- Form test submitted successfully and redirected to /thank-you. Resend accepted the message to contact@movings.sg, and the user subsequently confirmed receipt in the mailbox. End-to-end enquiry delivery is verified. Test message ID: 61a711ad-29b2-478b-bb0b-fbc9fa8d188b.
- On 17 September, with explicit owner approval, greylisting was disabled for movings.sg only and the persisted setting was verified. The new delivery-speed test (01a0ad74-586c-776a-a977-b1ec1dccb4c2) was sent and marked Delivered within the same displayed minute, 11:41 AM. The earlier Zm test was also delivered (sent 03:13, delivered 03:30). These are receiving-server delivery confirmations; inbox placement was not independently checked for the speed test. Other domain settings were not changed.
- The user confirmed the backup is OK before website cutover. After restoring Plesk access, its completion notification confirmed the site was backed up on 2026-09-16 at 17:06:27. Backup archive contents were not independently inspected. Keep Exabytes hosting and the old WordPress files available; the mailbox still depends on Exabytes.
- Loanify, other domains, and existing Resend keys were not modified.

## Owner follow-up

Search Console and GA4 checks are completed in [Google launch checks](google-launch-checks-2026-09-17.md): sitemap accepted with 63 pages, homepage recrawl requested, active analytics stream verified, and successful-enquiry key-event receipt verified. The owner approved pricing and terms. Approved privacy information, Business Profile access, and confirmation of business hours/response claims remain owner follow-ups.

## Rollback

DNS snapshots are kept locally in the Git-ignored backups/dns folder. Restore apex A to 103.7.8.230 and www CNAME to movings.sg to route the website back to WordPress; retain mail records and Resend verification. DNS TTL is 300 seconds, though caches can vary. Do not cancel Exabytes or delete the old WordPress installation.
