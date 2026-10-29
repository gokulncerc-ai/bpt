/** @type {import('next').NextConfig} */
const nextConfig = {
  // NOTE: do NOT add  output: "export"  here. The application form needs a Node server
  // (it receives the form and saves the PDF), and a static export has no server.
  images: {
    unoptimized: true,
  },

  // Every page address ends with "/", e.g. /application-form-2026/
  // (canonical link, sitemap and the form's request are all written to match this)
  trailingSlash: true,

  poweredByHeader: false,
};

module.exports = nextConfig;