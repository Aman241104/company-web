import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['three'],
  // Service URLs moved to the benchmark's nested structure on 2026-11-12;
  // keep the flat URLs that were live for a day working.
  async redirects() {
    const nested: Record<string, string[]> = {
      'digital-marketing': ['technical-seo', 'performance-marketing', 'social-media-management', 'influencer-marketing'],
      designing: ['ui-ux-design', 'brand-identity-design', 'graphic-design', 'website-design'],
    }
    const web3 = ['smart-contracts', 'dapps', 'nft-platforms', 'contract-audits']
    return [
      ...Object.entries(nested).flatMap(([hub, subs]) => subs.map((s) => ({ source: `/services/${s}`, destination: `/services/${hub}/${s}`, permanent: true }))),
      ...web3.map((s) => ({ source: `/services/${s}`, destination: '/services/blockchain-web3', permanent: true })),
      { source: '/services/development', destination: '/services#development', permanent: false },
    ]
  },
  images: {
    // Vercel's Image Optimization is hitting a plan/quota limit (402
    // OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED) on this account, which was
    // breaking every next/image on the live site. Serve images as-is until
    // that's resolved on the Vercel side.
    unoptimized: true,
  },
};

export default nextConfig;
