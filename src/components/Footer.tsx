import Link from "next/link";
import { BUSINESS, SITE_NAME } from "@/lib/site";
import { ROUTES, type Section } from "@/lib/routes";

const SECTION_TITLES: Record<Section, string> = {
  core: "Core",
  specialist: "Specialist Services",
  supporting: "More",
  guides: "Guides",
  directory: "Directory",
};

const SECTION_ORDER: Section[] = [
  "core",
  "specialist",
  "supporting",
  "guides",
  "directory",
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-black/10 bg-black/[.02]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-5">
          {SECTION_ORDER.map((section) => (
            <div key={section}>
              <h2 className="mb-3 text-sm font-semibold text-black/60">
                {SECTION_TITLES[section]}
              </h2>
              <ul className="space-y-2 text-sm">
                {ROUTES.filter((r) => r.section === section).map((r) => (
                  <li key={r.path}>
                    <Link href={r.path} className="hover:underline">
                      {r.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 border-t border-black/10 pt-6 text-sm text-black/60">
          <p className="font-medium text-black/80">{SITE_NAME}</p>
          <p>{BUSINESS.address.street}</p>
          <p>
            {BUSINESS.address.locality} {BUSINESS.address.postalCode}
          </p>
          <p>
            <a href={`tel:${BUSINESS.phoneHref}`} className="hover:underline">
              {BUSINESS.phone}
            </a>
          </p>
          <p>UEN {BUSINESS.uen}</p>
          <p className="mt-4">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
