"use server";
import { redirect } from "next/navigation";
import { sendEnquiryEmail } from "@/lib/email";
export async function submitEnquiry(_previous: {error: string}, formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const mobile = String(formData.get("mobile") ?? "").trim();
  const contact = String(formData.get("contact") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  if (formData.get("website")) return {error: "Please contact us on WhatsApp to complete your enquiry."};
  if (!name || name.length > 100 || !/^[+0-9 ()-]{8,25}$/.test(mobile) || mobile.replace(/\D/g, "").length < 8 || contact.length > 254 || (contact && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)) || message.length > 5000) {
    return {error: "Please enter a name, valid phone number and email (if provided). Keep your message under 5,000 characters."};
  }
  try {
    await sendEnquiryEmail({ name, mobile, contact, message });
  } catch {
    return {error: "We could not send your enquiry. Please try again or WhatsApp us on +65 8801 2025."};
  }
  redirect("/thank-you");
}
