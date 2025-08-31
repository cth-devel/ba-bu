/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
  output: isProd ? 'export' : undefined,
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
