import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['stagedoor-images.s3.us-east-2.amazonaws.com'],
  },
};

export default nextConfig;
