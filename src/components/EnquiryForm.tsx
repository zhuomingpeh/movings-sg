import { submitEnquiry } from "@/app/actions/enquiry";

/**
 * Server-rendered enquiry form (Server Action). No client JS is required
 * for it to submit — the brief is explicit that content and core
 * interactions must work without client-side rendering.
 */
export default function EnquiryForm() {
  return (
    <form action={submitEnquiry} className="grid gap-4 sm:max-w-md">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          className="w-full rounded-md border border-black/15 px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor="contact" className="mb-1 block text-sm font-medium">
          Phone or email
        </label>
        <input
          id="contact"
          name="contact"
          required
          className="w-full rounded-md border border-black/15 px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium">
          Tell us about your move
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Property type, floor level, lift access, preferred date"
          className="w-full rounded-md border border-black/15 px-3 py-2"
        />
      </div>
      <button
        type="submit"
        className="rounded-md bg-black px-5 py-3 font-semibold text-white hover:bg-black/80"
      >
        Send Enquiry
      </button>
    </form>
  );
}
