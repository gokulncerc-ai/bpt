import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/siteUrl";

// Next.js serves this automatically at  https://www.pkdascollegeofphysiotherapy.com/sitemap.xml
// The site is one page (sections like #about are not separate URLs), so only real pages are listed.
// next.config.js has trailingSlash: true, so page addresses end with "/".
// lastModified: set the date when the PAGE CONTENT really changed.
// (Using "today" on every build tells Google that everything changed every time,
//  and Google then learns to ignore the date.)
const HOME_UPDATED = "2026-10-29";
const FORM_UPDATED = "2026-10-29";

// To add a page later, add one more entry to this list.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(HOME_UPDATED),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/application-form-2026/`,
      lastModified: new Date(FORM_UPDATED),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}