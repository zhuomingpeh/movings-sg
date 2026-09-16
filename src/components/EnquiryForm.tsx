"use client";
import { useActionState } from "react";
import { submitEnquiry } from "@/app/actions/enquiry";

export default function EnquiryForm() {
  const [state, action, pending] = useActionState(submitEnquiry, {error: ""});
  return (
    <form action={action} className="enquiry-form">
      <div hidden aria-hidden="true"><label>Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <div className="enquiry-row">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" maxLength={100} required autoComplete="name" />
      </div>
      <div className="enquiry-row">
        <label htmlFor="mobile">Mobile number</label>
        <input
          id="mobile"
          name="mobile"
          maxLength={25}
          type="tel"
          required
          autoComplete="tel"
          placeholder="+65 9123 4567"
          pattern="[0-9+\s-]{8,}"
          title="A phone number, at least 8 digits"
        />
      </div>
      <div className="enquiry-row">
        <label htmlFor="contact">Email (optional)</label>
        <input id="contact" name="contact" maxLength={254} type="email" autoComplete="email" />
      </div>
      <div className="enquiry-row">
        <label htmlFor="message">Tell us about your move</label>
        <textarea
          id="message"
          name="message"
          maxLength={5000}
          rows={4}
          placeholder="Property type, floor level, lift access, preferred date"
        />
      </div>
      {state.error && <p role="alert">{state.error} <a href="https://wa.me/6588012025">Chat on WhatsApp</a></p>}
      <button type="submit" disabled={pending} className="button-primary">
        {pending ? "Sending…" : "Send Enquiry"}
      </button>
    </form>
  );
}
