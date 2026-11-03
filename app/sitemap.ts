import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/siteUrl";

// Next.js serves this automatically at  https://www.pkdascollegeofphysiotherapy.com/sitemap.xml
// next.config.js has trailingSlash: true, so page addresses end with "/".
//
// updated: set this date when the PAGE CONTENT really changed.
// (Using "today" on every build tells Google that everything changed every time,
//  and Google then learns to ignore the date.)
const pages = [
  { path: "/", updated: "2026-11-02", changeFrequency: "weekly", priority: 1 },
  { path: "/about/", updated: "2026-11-02", changeFrequency: "monthly", priority: 0.8 },
  { path: "/mission-vision/", updated: "2026-11-02", changeFrequency: "monthly", priority: 0.7 },
  { path: "/departments/", updated: "2026-11-02", changeFrequency: "monthly", priority: 0.8 },
  { path: "/admissions/", updated: "2026-11-02", changeFrequency: "weekly", priority: 0.9 },
  { path: "/contact/", updated: "2026-11-02", changeFrequency: "yearly", priority: 0.7 },
  { path: "/application-form-2026/", updated: "2026-11-02", changeFrequency: "monthly", priority: 0.8 },
] as const;

// To add a page later, add one more entry to the list above.
export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((p) => ({
    url: `${SITE_URL}${p.path}`,
    lastModified: new Date(p.updated),
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}