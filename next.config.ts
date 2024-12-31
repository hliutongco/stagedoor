import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [process.env.AWS_URL!],
  },
};

export default nextConfig;
