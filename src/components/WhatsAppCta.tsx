import { whatsappLink } from "@/lib/site";

type Props = {
  message?: string;
  className?: string;
  children?: React.ReactNode;
};

/**
 * WhatsApp call-to-action link. Renders as a plain anchor so the href is in
 * the HTML source (no client JS required to see or follow it). GA4 click
 * tracking is wired up in Phase 4 — Enhanced Measurement does not catch
 * wa.me links on its own.
 */
export default function WhatsAppCta({ message, className, children }: Props) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      data-analytics-event="whatsapp_click"
      className={
        className ??
        "inline-block rounded-md bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
      }
    >
      {children ?? "WhatsApp Us for a Quote"}
    </a>
  );
}
