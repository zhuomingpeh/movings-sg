import "server-only";
import { Resend } from "resend";

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
  if (!resend) throw new Error("Email delivery is not configured");

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

  if (error) throw new Error("Email provider did not accept the enquiry");
}
