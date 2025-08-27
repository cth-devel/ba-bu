/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  trailingSlash: true,
  images: {
    domains: ['images.pexels.com'],
    unoptimized: true
  },
};

module.exports = nextConfig;
