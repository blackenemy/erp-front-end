/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@repo/shared', '@stock-box/core-auth'],
};

module.exports = nextConfig;
