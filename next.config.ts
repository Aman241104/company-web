import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['three'],
  images: {
    // Vercel's Image Optimization is hitting a plan/quota limit (402
    // OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED) on this account, which was
    // breaking every next/image on the live site. Serve images as-is until
    // that's resolved on the Vercel side.
    unoptimized: true,
  },
};

export default nextConfig;
