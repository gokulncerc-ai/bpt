import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/siteUrl";
// Next.js serves this automatically at  https://<your-domain>/robots.txt
// (do not create a robots.txt file by hand)
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // keep search engines away from the API and the saved application PDFs
        disallow: ["/api/", "/uploads/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}