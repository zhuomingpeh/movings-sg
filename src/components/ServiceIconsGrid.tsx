import Image from "next/image";
import Link from "next/link";

const SERVICES = [
  { href: "/house-moving", label: "House Moving", src: "/images/services/moving.webp" },
  { href: "/packing", label: "Packing", src: "/images/services/packing.webp" },
  { href: "/storage", label: "Storage", src: "/images/services/storage.webp" },
  { href: "/disposal", label: "Disposal", src: "/images/services/disposal.webp" },
] as const;

/** Visual companion to the "Our Services" text list, using the same
 * service photos from the original site. */
export default function ServiceIconsGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {SERVICES.map((service) => (
        <Link
          key={service.href}
          href={service.href}
          className="group flex flex-col items-center gap-2 rounded-lg border border-black/10 p-3 text-center hover:border-black/25"
        >
          <Image
            src={service.src}
            alt={service.label}
            width={1080}
            height={1080}
            className="h-20 w-20 rounded-md object-cover sm:h-24 sm:w-24"
          />
          <span className="text-sm font-medium group-hover:underline">
            {service.label}
          </span>
        </Link>
      ))}
    </div>
  );
}
