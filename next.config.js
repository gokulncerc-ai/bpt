/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  trailingSlash: true,
  poweredByHeader: false,

  // make sure the logo is bundled with the API function on Vercel
  outputFileTracingIncludes: {
    "/api/application-form-2026": ["./public/BPTLOGO3.png"],
  },
};

module.exports = nextConfig;