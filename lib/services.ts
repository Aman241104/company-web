// Service catalog — single source for the homepage chapters, /services,
// /services/[slug], the navbar dropdown, footer and contact-form options.
//
// Structure follows the 4-chapter layout benchmarked from zanservices.com
// (2026-11-12). Disciplines with `ours: true` carry the real content that was
// already on our services page (features, timelines, prices from
// lib/pricing.ts, real case studies). Disciplines with `ours: false` were added
// to match the benchmark's service range — copy is our own wording, no
// borrowed claims. Remove any we don't actually sell before launch.
import { cheapestTier, flagshipTier, pricingTiers } from './pricing'

const businessTier = pricingTiers.find((t) => t.id === 'business-website')!

export type Discipline = {
  slug: string
  title: string
  tagline: string
  desc: string
  bullets: string[]
  features?: string[]
  deliverables?: string[]
  timeline?: string
  pricing?: string
  tags?: string[]
  caseStudy?: string // slug in lib/caseStudies.ts
  ours: boolean
}

export type Chapter = {
  slug: string
  num: string
  name: string
  motto: [string, string, string]
  intro: string
  disciplines: Discipline[]
}

export const chapters: Chapter[] = [
  {
    slug: 'development',
    num: '01',
    name: 'Development',
    motto: ['Build.', 'Ship.', 'Scale.'],
    intro:
      'Websites, online stores, custom software and mobile apps, built on Next.js and modern stacks so they stay fast as your business grows.',
    disciplines: [
      {
        slug: 'website-development',
        title: 'Website Development',
        tagline: 'Sites that build trust and bring enquiries.',
        desc: 'Modern, responsive and SEO-friendly websites designed to build trust, showcase your business, and generate enquiries.',
        bullets: ['Business websites', 'Landing pages', 'Headless CMS', 'SEO-ready builds'],
        features: [
          'Next.js App Router with <1s Largest Contentful Paint',
          'Conversion-optimized UX & automated A/B testing architecture',
          'Headless CMS integration (Sanity, Strapi, Contentful)',
          '100/100 Core Web Vitals performance benchmarks',
          'Multi-currency & internationalization support',
          'WCAG 2.2 AA accessibility and semantic HTML compliance',
          'Hardware-accelerated CSS & Framer Motion micro-interactions',
          'Server-side analytics, lead routing & attribution sync',
        ],
        deliverables: ['Figma Design System', 'Next.js Production Repo', 'Headless CMS', 'SEO Architecture'],
        timeline: '3–6 weeks',
        pricing: `${cheapestTier.priceLabel} – ${businessTier.priceLabel}`,
        tags: ['Next.js', 'React', 'Tailwind', 'TypeScript'],
        caseStudy: 'silver-spoon',
        ours: true,
      },
      {
        slug: 'ecommerce-development',
        title: 'E-Commerce Development',
        tagline: 'Stores built to sell, not just look good.',
        desc: 'Online stores that make it easy for customers to browse, order and pay — from Shopify Plus builds to fully headless Next.js commerce.',
        bullets: ['Shopify & headless stores', 'Payments & checkout', 'WhatsApp ordering', 'Catalogs at scale'],
        features: [
          'Shopify Plus & headless Next.js storefront builds',
          'Product catalog & SKU management at scale (250+ SKUs shipped)',
          'WhatsApp and multi-channel checkout flows',
          'Stripe & Razorpay payment gateway integration',
          'Live inventory synchronization across channels',
          'Supabase-backed media CDN for fast product imagery',
          'Global shipping & multi-currency support for international buyers',
          'Conversion-optimized storefront UX & product pages',
        ],
        deliverables: ['Storefront Build (Shopify or Headless)', 'Product Catalog Setup', 'Payment Gateway Integration', 'Launch & Handover'],
        timeline: '4–10 weeks',
        pricing: `${cheapestTier.priceLabel} – ${businessTier.priceLabel}`,
        tags: ['Shopify Plus', 'Next.js', 'Stripe / Razorpay', 'Headless Commerce'],
        caseStudy: 'prihaan-spices',
        ours: true,
      },
      {
        slug: 'custom-software-development',
        title: 'Custom Software & ERP',
        tagline: 'Software shaped around how you work.',
        desc: 'Web applications, dashboards and business software built around your workflows, when off-the-shelf tools stop being enough.',
        bullets: ['SaaS platforms', 'Dashboards & portals', 'ERP systems', 'Billing & GST'],
        features: [
          'Multi-tenant cloud architecture with isolated tenant schemas',
          'Automated invoicing, GST compliance, and billing pipelines',
          'Stripe & Razorpay international subscription recurring engines',
          'Custom admin dashboards, audit trails, and role management',
          'Usage metering, tiered subscription gates & feature flags',
          'Customer onboarding flows and activation sequence automation',
          'Inventory, supply chain, and warehouse multi-location sync',
          'Zero-downtime database migrations and automated backups',
        ],
        deliverables: ['SaaS Core Engine', 'Stripe Billing System', 'Admin Operations Panel', 'Complete IP Transfer'],
        timeline: '8–16 weeks',
        pricing: 'Custom Quote',
        tags: ['Multi-Tenant', 'Stripe', 'ERP Suite', 'Cloud Infra'],
        caseStudy: 'vibo-erp',
        ours: true,
      },
      {
        slug: 'mobile-app-development',
        title: 'Mobile App Development',
        tagline: 'iOS and Android apps people keep.',
        desc: 'iOS & Android applications with native-feeling performance and offline-first data sync, shipped to both stores.',
        bullets: ['React Native & Flutter', 'iOS & Android', 'Push & payments', 'Store release'],
        features: [
          'React Native & Flutter cross-platform mobile engineering',
          'Native device hardware access (Camera, Biometrics, GPS, BLE)',
          'Offline-first SQLite local caching and cloud sync',
          'Push notification targeting & deep linking routing',
          'In-app purchases and subscription billing integration',
          'End-to-end App Store & Google Play submission and approval',
          'App Store Optimization (ASO) and organic discovery tuning',
          'Crash analytics and real-time user session diagnostics',
        ],
        deliverables: ['iOS & Android Builds', 'Store Approval Delivery', 'Push Notification Engine', 'Analytics Setup'],
        timeline: '6–12 weeks',
        pricing: `From ${flagshipTier.priceLabel}`,
        tags: ['React Native', 'Flutter', 'iOS', 'Android'],
        ours: true,
      },
      {
        slug: 'backend-api-development',
        title: 'Backend Systems & APIs',
        tagline: 'The part nobody sees, done properly.',
        desc: 'APIs, databases and background systems designed around your data, so the product stays reliable as usage grows.',
        bullets: ['REST & GraphQL APIs', 'PostgreSQL', 'Auth & roles', 'Testing & monitoring'],
        features: [
          'Microservices & event-driven background job queuing',
          'REST & GraphQL API design with automated OpenAPI specs',
          'Real-time WebSockets synchronization and telemetry',
          'Database clustering, index tuning & latency optimization',
          'Automated integration and end-to-end testing suites',
          'Containerized CI/CD pipelines (Docker, Kubernetes, AWS/GCP)',
          'Role-based access control (RBAC) & OAuth2/JWT auth',
          '24/7 telemetry, distributed tracing & APM monitoring',
        ],
        deliverables: ['API Specifications', 'Dockerized Architecture', 'Automated Test Suite', 'Cloud Terraform'],
        timeline: '6–14 weeks',
        pricing: 'Custom Quote',
        tags: ['Node.js', 'PostgreSQL', 'Docker', 'GraphQL'],
        ours: true,
      },
      {
        slug: 'ai-automation',
        title: 'AI & Automation',
        tagline: 'Put the repetitive work on autopilot.',
        desc: 'Chatbots, AI assistants and workflow automation wired into the tools you already use — WhatsApp, CRM, sheets and your own software.',
        bullets: ['AI chatbots', 'Workflow automation', 'Document & data extraction', 'AI consulting'],
        ours: false,
      },
      {
        slug: 'cloud-devops',
        title: 'Cloud & DevOps',
        tagline: 'Releases that are routine, not risky.',
        desc: 'Hosting, CI/CD pipelines and monitoring set up so deployments are predictable and your cloud bill makes sense.',
        bullets: ['AWS, GCP & Vercel', 'CI/CD pipelines', 'Docker', 'Monitoring & backups'],
        ours: false,
      },
      {
        slug: 'cybersecurity',
        title: 'Cybersecurity',
        tagline: 'Find the holes before someone else does.',
        desc: 'Security reviews of websites and apps, hardening, and ongoing patching so your customer data stays where it belongs.',
        bullets: ['Security audits', 'Vulnerability testing', 'Hardening', 'Ongoing patching'],
        ours: false,
      },
    ],
  },
  {
    slug: 'digital-marketing',
    num: '02',
    name: 'Digital Marketing',
    motto: ['Get found.', 'Get chosen.', 'Grow.'],
    intro:
      'Search, paid ads, social and creator marketing, measured on enquiries and revenue — including SEO for AI answer engines like ChatGPT and Google AI Overviews.',
    disciplines: [
      {
        slug: 'technical-seo',
        title: 'SEO, AEO & GEO',
        tagline: 'Rank on Google. Get cited by AI.',
        desc: 'Technical SEO that drives qualified commercial demand, extended to the AI answer engines (ChatGPT, Perplexity, AI Overviews) your customers now ask first.',
        bullets: ['Technical SEO audits', 'Schema & entities', 'Content silos', 'AI answer visibility'],
        features: [
          'Deep architectural SEO audits and Core Web Vitals remediation',
          'Search intent keyword clustering and content silos',
          'Structured data, JSON-LD Schema & entity optimization',
          'High-authority editorial backlink acquisition strategy',
          'International and programmatic SEO page generation',
          'Monthly keyword ranking, organic traffic & attribution dashboards',
        ],
        deliverables: ['Technical SEO Audit', 'Keyword Silo Map', 'Structured Schema Implementation', 'Monthly Dashboard'],
        timeline: 'Ongoing partnership',
        pricing: 'From ₹25,000/mo',
        tags: ['Technical SEO', 'Schema Markup', 'Keyword Silos', 'PageSpeed'],
        caseStudy: 'chahana-dental',
        ours: true,
      },
      {
        slug: 'performance-marketing',
        title: 'Performance Marketing',
        tagline: 'Ad spend judged on what it returns.',
        desc: 'Google and Meta ad campaigns focused on bringing in the right traffic and turning it into real enquiries, with the tracking to prove it.',
        bullets: ['Google Ads', 'Meta Ads', 'Landing pages', 'ROAS tracking'],
        features: [
          'Google Search, Performance Max & Shopping campaign architecture',
          'Meta (Instagram & Facebook) creative funnel scaling',
          'High-converting landing page rapid design & copywriting',
          'Server-side CAPI tracking & multi-touch attribution modeling',
          'Ad creative testing velocity (10+ variations weekly)',
          'Continuous conversion rate optimization (CRO) audits',
          'Transparent weekly executive ROAS and CAC reports',
        ],
        deliverables: ['Growth Strategy Blueprint', 'High-Converting Landing Pages', 'Ad Creative Suite', 'Attribution Model'],
        timeline: '2-week sprint setup',
        pricing: 'From ₹30,000/mo',
        tags: ['Google Ads', 'Meta Ads', 'CAPI Tracking', 'CRO Funnels'],
        ours: true,
      },
      {
        slug: 'social-media-management',
        title: 'Social Media Management',
        tagline: 'Post consistently. Sound like yourself.',
        desc: 'A content calendar, reels and carousels made for your brand, and someone to reply to comments and DMs — so your pages stay active.',
        bullets: ['Content calendar', 'Reels & carousels', 'Community replies', 'Monthly reporting'],
        ours: false,
      },
      {
        slug: 'influencer-marketing',
        title: 'Influencer Marketing',
        tagline: 'Borrow trust from creators people follow.',
        desc: 'Finding, vetting and briefing creators who fit your audience, then tracking what each collaboration actually brings in.',
        bullets: ['Creator discovery', 'Vetting & negotiation', 'Campaign briefs', 'Results tracking'],
        ours: false,
      },
    ],
  },
  {
    slug: 'blockchain-web3',
    num: '03',
    name: 'Blockchain & Web3',
    motto: ['Decentralized.', 'Audited.', 'Live.'],
    intro:
      'Smart contracts, decentralized apps and digital-asset platforms, written to be reviewed before launch and built to be safe to run afterwards.',
    disciplines: [
      {
        slug: 'smart-contracts',
        title: 'Smart Contracts',
        tagline: 'Contracts written to be audited.',
        desc: 'Custom smart contracts on Ethereum and Polygon, tested and reviewed before they hold real value.',
        bullets: ['Solidity', 'Ethereum & Polygon', 'Test coverage', 'Deployment'],
        ours: false,
      },
      {
        slug: 'dapps',
        title: 'dApps',
        tagline: 'From the contract to the interface.',
        desc: 'Decentralized applications with a front end ordinary users can actually use, wallet connection included.',
        bullets: ['Wallet integration', 'Web3 front ends', 'DeFi flows', 'IPFS storage'],
        ours: false,
      },
      {
        slug: 'nft-platforms',
        title: 'NFT & Digital Asset Platforms',
        tagline: 'Marketplaces on solid contracts.',
        desc: 'Minting, marketplaces and token-gated experiences, built on reviewed contracts.',
        bullets: ['Minting', 'Marketplaces', 'Token gating', 'Royalties'],
        ours: false,
      },
      {
        slug: 'contract-audits',
        title: 'Contract Security Reviews',
        tagline: 'Checked before it ships.',
        desc: 'Independent review of smart-contract code for common vulnerabilities before deployment.',
        bullets: ['Code review', 'Vulnerability checks', 'Gas optimisation', 'Report & fixes'],
        ours: false,
      },
    ],
  },
  {
    slug: 'designing',
    num: '04',
    name: 'Designing',
    motto: ['Look sharp.', 'On brand.', 'Remembered.'],
    intro:
      'Brand identity, interface design and the everyday creatives a growing business needs — designed in Figma and handed over as files you own.',
    disciplines: [
      {
        slug: 'ui-ux-design',
        title: 'UI/UX Design',
        tagline: 'Interfaces people get first time.',
        desc: 'Wireframes, prototypes and finished screens for websites, apps and dashboards, tested against real tasks before development starts.',
        bullets: ['Wireframes', 'Clickable prototypes', 'Design systems', 'Usability checks'],
        ours: false,
      },
      {
        slug: 'brand-identity-design',
        title: 'Brand Identity & Logo',
        tagline: 'A mark you actually own.',
        desc: 'Logo, colours, typography and a short guideline document, delivered as source files you own outright.',
        bullets: ['Logo design', 'Colour & type', 'Brand guidelines', 'Source files'],
        ours: false,
      },
      {
        slug: 'graphic-design',
        title: 'Graphic Design',
        tagline: 'On brand, every week.',
        desc: 'Social creatives, brochures, pitch decks, banners and packaging, built as reusable templates so everything stays consistent.',
        bullets: ['Social creatives', 'Brochures & decks', 'Banners', 'Packaging'],
        ours: false,
      },
      {
        slug: 'website-design',
        title: 'Website Design',
        tagline: 'Designed before it is built.',
        desc: 'Page layouts, responsive behaviour and a component library in Figma, ready for our developers or yours.',
        bullets: ['Page layouts', 'Responsive design', 'Figma components', 'Dev handoff'],
        ours: false,
      },
    ],
  },
]

export const allDisciplines = chapters.flatMap((c) => c.disciplines.map((d) => ({ ...d, chapter: c })))

export function findDiscipline(slug: string) {
  return allDisciplines.find((d) => d.slug === slug)
}
