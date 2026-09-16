import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "./site";
export function pageMetadata(title: string, description: string, path: string, image = "/images/about-us.webp"): Metadata {
  return {
    title, description, alternates: {canonical: path},
    openGraph: {title, description, url: new URL(path, SITE_URL).href, siteName: SITE_NAME, locale: "en_SG", type: "website", images: [{url: new URL(image, SITE_URL).href, alt: SITE_NAME}]},
    twitter: {card: "summary_large_image", title, description, images: [new URL(image, SITE_URL).href]},
  };
}
