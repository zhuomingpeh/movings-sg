"use server";

import { redirect } from "next/navigation";
import { sendEnquiryEmail } from "@/lib/email";

/**
 * Handles the homepage enquiry form. Server Action, so the form works
 * without client JS (progressive enhancement) and posts straight to the
 * server rather than needing a separate API route. Emails the lead to
 * contact@movings.sg (see src/lib/email.ts) — WhatsApp stays the faster
 * path, but not everyone wants to message a business on WhatsApp first.
 */
export async function submitEnquiry(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const mobile = String(formData.get("mobile") ?? "").trim();
  const contact = String(formData.get("contact") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !mobile) {
    // Shouldn't happen past the form's own `required` attributes, but
    // don't silently succeed if it does (e.g. JS-less client stripping
    // fields some other way).
    redirect("/?enquiry=error");
  }

  await sendEnquiryEmail({ name, mobile, contact, message });

  redirect("/thank-you");
}
