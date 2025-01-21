import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [process.env.AWS_URL!, 'img.clerk.com'],
  },
};

export default nextConfig;
