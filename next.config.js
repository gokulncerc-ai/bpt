/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  trailingSlash: true,
  poweredByHeader: false,

  // make sure the logo is bundled with the API function on Vercel
  experimental: {
    outputFileTracingIncludes: {
      "/api/application-form-2026": ["./public/BPTLOGO3.png"],
    },
  },

  // Add security and SEO-related headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Explicitly prevent any X-Robots-Tag from being added
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
