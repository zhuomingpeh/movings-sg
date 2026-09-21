"use client";
import { useActionState, useEffect, useRef, useId } from "react";
import { useRouter } from "next/navigation";
import { submitEnquiry } from "@/app/actions/enquiry";

export default function EnquiryForm() {
  const [state, action, pending] = useActionState(submitEnquiry, {error: ""});
  const router = useRouter();
  const formId = useId();
  const tracked = useRef(false);
  useEffect(() => {
    if (!state.success || tracked.current) return;
    tracked.current = true;
    try {
      if (["www.movings.sg", "movings.sg"].includes(window.location.hostname)) {
        const analytics = window as typeof window & {
          gtag?: (command: string, event: string, parameters: Record<string, string>) => void;
        };
        analytics.gtag?.("event", "generate_lead", {form_name: "moving_enquiry"});
      }
    } finally {
      router.replace("/thank-you");
    }
  }, [state.success, router]);
  if (state.success) return <p role="status">Thanks, we&apos;ve got your enquiry. <a href="/thank-you">Continue</a></p>;
  return (
    <form action={action} className="enquiry-form">
      <div hidden aria-hidden="true"><label>Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <div className="enquiry-row">
        <label htmlFor={formId + "-name"}>Name</label>
        <input id={formId + "-name"} name="name" maxLength={100} required autoComplete="name" />
      </div>
      <div className="enquiry-row">
        <label htmlFor={formId + "-mobile"}>Mobile number</label>
        <input
          id={formId + "-mobile"}
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
        <label htmlFor={formId + "-contact"}>Email (optional)</label>
        <input id={formId + "-contact"} name="contact" maxLength={254} type="email" autoComplete="email" />
      </div>
      <div className="enquiry-row">
        <label htmlFor={formId + "-message"}>Tell us about your move</label>
        <textarea
          id={formId + "-message"}
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
