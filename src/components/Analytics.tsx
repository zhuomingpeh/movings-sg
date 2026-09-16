import Script from "next/script";
import { GA_MEASUREMENT_ID } from "@/lib/site";

/**
 * GA4 via a single gtag include (no GTM, no second tag system, per the
 * brief). Only loaded in production so local dev and preview traffic
 * don't pollute the real GA4 property.
 *
 * tel: and wa.me links don't fire GA4's Enhanced Measurement outbound-click
 * events on their own, so a small inline listener below sends whatsapp_click
 * / phone_click explicitly. It's the one bit of client-side script on the
 * site, and it doesn't touch content rendering, only analytics.
 */
export default function Analytics() {
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          if (['www.movings.sg', 'movings.sg'].includes(window.location.hostname)) {
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
          }
        `}
      </Script>
      <Script id="ga4-click-events" strategy="afterInteractive">
        {`
          document.addEventListener('click', function (e) {
            var link = e.target.closest('a[href]');
            if (!link || typeof window.gtag !== 'function') return;
            var href = link.getAttribute('href') || '';
            if (href.indexOf('wa.me') !== -1) {
              window.gtag('event', 'whatsapp_click', { link_url: href });
            } else if (href.indexOf('tel:') === 0) {
              window.gtag('event', 'phone_click', { link_url: href });
            }
          });
        `}
      </Script>
    </>
  );
}
