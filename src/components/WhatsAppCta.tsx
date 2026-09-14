import WhatsAppIcon from "./WhatsAppIcon";
import { whatsappLink } from "@/lib/site";

type Props = {
  message?: string;
  className?: string;
  children?: React.ReactNode;
  /** Set false to omit the WhatsApp glyph, e.g. inside a badge that's
   * already tight on space. Shown by default. */
  icon?: boolean;
};

/**
 * WhatsApp call-to-action link. Renders as a plain anchor so the href is in
 * the HTML source (no client JS required to see or follow it). GA4 click
 * tracking is wired up in Phase 4 — Enhanced Measurement does not catch
 * wa.me links on its own.
 */
export default function WhatsAppCta({
  message,
  className,
  children,
  icon = true,
}: Props) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      data-analytics-event="whatsapp_click"
      className={className ?? "button-primary"}
    >
      {icon && <WhatsAppIcon />}
      {children ?? "WhatsApp Us for a Quote"}
    </a>
  );
}
