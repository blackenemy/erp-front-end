/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@repo/shared", "@stock-box/core-auth"],
  publicRuntimeConfig: {
    NEXT_PUBLIC_PRICING_SERVICE_URL:
      process.env.NEXT_PUBLIC_PRICING_SERVICE_URL ||
      "https://api-hubs-quotes.project-hub.it.com",
    NEXT_PUBLIC_RULE_SERVICE_URL:
      process.env.NEXT_PUBLIC_RULE_SERVICE_URL ||
      "https://api-hubs-rules.project-hub.it.com",
  },
};

module.exports = nextConfig;
