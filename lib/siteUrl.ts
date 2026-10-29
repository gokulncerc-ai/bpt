/**
 * The public address of the website, without a trailing slash.
 * Used by the sitemap, robots.txt and metadataBase in layout.tsx.
 * Set NEXT_PUBLIC_SITE_URL in .env to change it without editing code.
 * The fallback is the live address, so a missing .env can never put "localhost" in the sitemap.
 */
export const SITE_URL = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.pkdascollegeofphysiotherapy.com"
  ).replace(/\/+$/, "");