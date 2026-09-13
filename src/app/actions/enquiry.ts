"use server";

import { redirect } from "next/navigation";

/**
 * Handles the homepage enquiry form. Server Action, so the form works
 * without client JS (progressive enhancement) and posts straight to the
 * server rather than needing a separate API route.
 *
 * TODO(Phase 4 / Ming): wire this up to email (Resend?) or a CRM instead
 * of just logging. Right now an enquiry is not silently dropped, but it
 * also isn't going anywhere a human will see it.
 */
export async function submitEnquiry(formData: FormData) {
  const name = formData.get("name");
  const contact = formData.get("contact");
  const message = formData.get("message");

  console.log("[enquiry]", { name, contact, message, at: new Date().toISOString() });

  redirect("/thank-you");
}
