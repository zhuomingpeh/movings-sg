import WhatsAppIcon from "./WhatsAppIcon";
import { whatsappLink } from "@/lib/site";

/**
 * Fixed WhatsApp bubble shown on every page, desktop and mobile. Plain
 * anchor tag — no client JS needed for it to work.
 */
export default function WhatsAppFloatingButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      data-analytics-event="whatsapp_click"
      className="whatsapp-bubble"
      aria-label="Chat with Moving Solutions on WhatsApp"
    >
      <WhatsAppIcon size="1.6em" />
    </a>
  );
}
