import Link from "next/link";
import { BUSINESS, SITE_NAME } from "@/lib/site";
import { ROUTES, type Section } from "@/lib/routes";

const SECTION_TITLES: Record<Section, string> = {
  core: "Moving services",
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
    <footer className="site-footer mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-5">
          {SECTION_ORDER.map((section) => (
            <div key={section}>
              <h2 className="mb-3 text-sm font-semibold text-white/70">
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
        <div className="mt-10 border-t border-white/20 pt-6 text-sm text-white/70">
          <p className="font-medium text-white">{SITE_NAME}</p>
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
