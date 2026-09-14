import { submitEnquiry } from "@/app/actions/enquiry";

/**
 * Server-rendered enquiry form (Server Action). No client JS is required
 * for it to submit — an alternative to WhatsApp for people who'd rather
 * not start there. Mobile number is required so a lead can always be
 * reached even if the email address given is wrong or unchecked.
 */
export default function EnquiryForm() {
  return (
    <form action={submitEnquiry} className="enquiry-form">
      <div className="enquiry-row">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" required autoComplete="name" />
      </div>
      <div className="enquiry-row">
        <label htmlFor="mobile">Mobile number</label>
        <input
          id="mobile"
          name="mobile"
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
        <input id="contact" name="contact" type="email" autoComplete="email" />
      </div>
      <div className="enquiry-row">
        <label htmlFor="message">Tell us about your move</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Property type, floor level, lift access, preferred date"
        />
      </div>
      <button type="submit" className="button-primary">
        Send Enquiry
      </button>
    </form>
  );
}
