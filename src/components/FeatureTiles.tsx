import Image from "next/image";

// Real captions replacing the old site's four one-line claims ("Local
// Business", "Swift Response", "Easy to Quote", "Satisfactory") with
// something concrete, per the brief.
const FEATURES = [
  {
    src: "/images/home/local-business.webp",
    alt: "Moving Solutions is a Singapore-based local business",
    title: "Singapore-based",
    detail: "Not a franchise or a reseller. Our own crew, our own trucks.",
  },
  {
    src: "/images/home/swift-response.webp",
    alt: "Moving Solutions responds quickly to enquiries",
    title: "Reply within 30 minutes",
    detail: "During working hours, on WhatsApp or the form below.",
  },
  {
    src: "/images/home/easy-to-quote.webp",
    alt: "Moving Solutions makes it easy to get a quote",
    title: "Fixed quote from photos",
    detail: "Send photos or a video walkthrough, no site visit needed.",
  },
  {
    src: "/images/home/satisfactory-service.webp",
    alt: "Moving Solutions provides reliable service across Singapore",
    title: "HDB, condo and office moves",
    detail: "Same crew handles residential and commercial jobs.",
  },
] as const;

export default function FeatureTiles() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {FEATURES.map((feature) => (
        <div key={feature.title} className="text-center">
          <Image
            src={feature.src}
            alt={feature.alt}
            width={1080}
            height={1080}
            className="mx-auto h-20 w-20 rounded-full object-cover sm:h-24 sm:w-24"
          />
          <p className="mt-2 text-sm font-semibold">{feature.title}</p>
          <p className="mt-1 text-xs text-black/60">{feature.detail}</p>
        </div>
      ))}
    </div>
  );
}
