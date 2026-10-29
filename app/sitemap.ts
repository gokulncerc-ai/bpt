import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/siteUrl";
// Next.js serves this automatically at  https://<your-domain>/sitemap.xml
// The site is one page (sections like #about are not separate URLs), so only real pages are listed.
// next.config.js has trailingSlash: true, so page addresses end with "/".
// To add a page later, add one more entry to this list.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/application-form-2026/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}