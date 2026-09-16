# Google launch checks — 17 September 2026

- Owner approved the published pricing and terms.
- Search Console domain property movings.sg is accessible. The resubmitted https://www.movings.sg/sitemap.xml shows Success, 63 discovered pages, submitted/read 16 September 2026.
- Homepage inspection reports URL on Google, indexed, HTTPS, and a valid breadcrumb item. A fresh indexing request was accepted into the priority crawl queue. This does not guarantee when Google will recrawl or update results.
- GA4 property www.movings.sg (516257302), web stream 13127478507, measurement ID G-9H77FRG0MM matches the site. Stream details confirm active collection and data flowing in the last 48 hours.
- Existing whatsapp_click events were visible and marked as key events. They measure contact-button clicks, not confirmed conversations or bookings.
- Successful enquiry submissions now emit generate_lead with only form_name=moving_enquiry after the server receives acceptance from the email provider. Validation failures, provider failures, and direct visits to /thank-you do not emit that event. A client-side route change preserves the analytics request; blocked analytics does not stop the thank-you navigation.
- generate_lead is configured as a key event, once per event, without an invented monetary value. Historical submit_lead_form is retained but not marked as a successful-enquiry conversion because its trigger on the old site has not been established.
- No new Google property or replacement stream was created; existing reporting history is retained.
- Privacy notice approval, Google Business Profile access, and ongoing search/performance review remain separate owner follow-ups. Google Search Console and GA4 product linking has not been changed.

Validation: production build and TypeScript passed; focused ESLint passed. Deployment movings-nf9ivqyr6-loanify.vercel.app is Ready. Live invalid-phone test displayed the validation error; a subsequent valid test reached /thank-you. GA4 Realtime confirmed exactly one generate_lead event and one generate_lead key event. The test email was clearly labelled Analytics verification — no booking.
