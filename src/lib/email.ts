import "server-only";
import { Resend } from "resend";

// Domain verification for EMAIL_FROM's domain happens in the Resend
// dashboard (Ming needs to add the DNS records Resend gives you). Until
// that's done, sends will fail or land from Resend's shared onboarding
// address instead of an @movings.sg one. If RESEND_API_KEY isn't set at
// all (e.g. local dev), sendEnquiryEmail logs instead of throwing, so an
// enquiry is never silently lost either way.
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const LEADS_TO = process.env.LEADS_EMAIL_TO ?? "contact@movings.sg";
const EMAIL_FROM =
  process.env.EMAIL_FROM ?? "Moving Solutions Website <onboarding@resend.dev>";

export async function sendEnquiryEmail(fields: {
  name: string;
  mobile: string;
  contact: string;
  message: string;
}) {
  if (!resend) {
    console.log("[enquiry] RESEND_API_KEY not set, logging only:", fields);
    return;
  }

  const { error } = await resend.emails.send({
    from: EMAIL_FROM,
    to: LEADS_TO,
    replyTo: fields.contact || undefined,
    subject: `New moving enquiry from ${fields.name}`,
    text: [
      `Name: ${fields.name}`,
      `Mobile: ${fields.mobile}`,
      `Email/other contact: ${fields.contact || "(not given)"}`,
      "",
      "Message:",
      fields.message || "(none)",
    ].join("\n"),
  });

  if (error) {
    // Don't throw — the visitor already sees the thank-you page by the
    // time this runs. Log loudly so a delivery failure doesn't go unnoticed.
    console.error("[enquiry] Resend send failed:", error);
  }
}
