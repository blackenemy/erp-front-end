/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  transpilePackages: ["@repo/shared", "@stock-box/core-auth"],
  // เพื่อให้ Next.js มองเห็น node_modules ที่ถูก hoisted ไปที่ root ของ monorepo
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"),
  },
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
