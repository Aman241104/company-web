// Single source of truth for all published pricing figures on the site.
// Confirmed authoritative by Aman, 2026-09-15 (see
// research/build-spec-zan-benchmark.md, "Pricing decision" section).
// Any component or page that shows a starting price should import from
// here rather than hardcoding a number, so the site can never show two
// different prices for the same thing again.

export type PricingTier = {
  id: string
  name: string
  price: number
  priceLabel: string
  unit: string
  timeline: string
  badge: string | null
  highlight: boolean
  desc: string
  features: string[]
  cta: string
}

export const pricingTiers: PricingTier[] = [
  {
    id: 'landing-page',
    name: 'Landing Page',
    price: 9999,
    priceLabel: '₹9,999',
    unit: '/ project',
    timeline: '3–5 days',
    badge: null,
    highlight: false,
    desc: 'A single page built to convert one campaign, ideal for a paid ads launch or a product announcement.',
    features: [
      '1 custom responsive page',
      'Next.js App Router, sub-second load time',
      'Lead form with email & WhatsApp routing',
      'Conversion tracking wired in (GTM/Pixel)',
      '2 weeks post-launch SLA support',
    ],
    cta: 'Start your landing page',
  },
  {
    id: 'starter',
    name: 'Starter',
    price: 19999,
    priceLabel: '₹19,999',
    unit: '/ project',
    timeline: '1–2 weeks',
    badge: null,
    highlight: false,
    desc: 'A high-converting marketing website or portfolio showcase for a growing brand.',
    features: [
      'Up to 8 custom responsive pages',
      'Next.js App Router, sub-second load time',
      'Technical SEO architecture & schema markup',
      'Contact form with email & WhatsApp routing',
      '1 month post-launch SLA support',
    ],
    cta: 'Start your website',
  },
  {
    id: 'business-website',
    name: 'Business Website',
    price: 32999,
    priceLabel: '₹32,999',
    unit: '/ project',
    timeline: '2–3 weeks',
    badge: 'Most Popular',
    highlight: true,
    desc: 'Custom UI design, analytics, and enhanced functionality for a company that has outgrown a template.',
    features: [
      'Up to 15 custom responsive pages',
      'Custom UI design, no templates',
      'Advanced analytics & conversion tracking',
      'Headless CMS integration',
      '2 months post-launch SLA support',
    ],
    cta: 'Build your business site',
  },
  {
    id: 'growth-mvp',
    name: 'Growth MVP',
    price: 75000,
    priceLabel: '₹75,000',
    unit: '/ project',
    timeline: '4–8 weeks',
    badge: null,
    highlight: false,
    desc: 'A full-stack web app or mobile MVP, built for scale from the first commit.',
    features: [
      'Full-stack Next.js web app or React Native mobile app',
      'Database & secure REST/GraphQL API',
      'Payment gateway integration (Stripe/Razorpay)',
      'User authentication & role-based access',
      '3 months post-launch SLA support',
    ],
    cta: 'Build your MVP',
  },
]

export const enterpriseTier = {
  name: 'Enterprise & SaaS',
  desc: 'Custom business software, ERP systems, and larger platforms, tailored quote with transparent line items.',
  timeline: '8–16 weeks',
}

export const cheapestTier = pricingTiers[0]
export const flagshipTier = pricingTiers[pricingTiers.length - 1]

export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`
}

function tierById(id: string): PricingTier {
  const tier = pricingTiers.find((t) => t.id === id)
  if (!tier) throw new Error(`pricingSummary: no tier with id "${id}" — check lib/pricing.ts`)
  return tier
}

// A single plain-language sentence summarizing all tiers, used by the FAQ
// pricing answer so the copy can never drift from the tier data above.
// Looked up by tier id (not array position) so reordering pricingTiers can
// never silently relabel one tier's price as another's.
export const pricingSummary =
  `We operate strictly on fixed-price milestone contracts or dedicated monthly engineering retainers. No unexpected billable hours. ` +
  `Single-page campaign sites start at ${tierById('landing-page').priceLabel}; starter brand websites from ${tierById('starter').priceLabel}; ` +
  `full business websites from ${tierById('business-website').priceLabel}; full-stack web/mobile MVPs from ${tierById('growth-mvp').priceLabel}; ` +
  `enterprise systems are custom scoped with transparent line items.`
