'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { cheapestTier, flagshipTier, pricingTiers } from '@/lib/pricing'

// Services, rebuilt for design-system-v2 as numbered editorial rows: one
// full-width row per practice area, a large numeral as the only decoration
// (no icon-in-rounded-square), outlined tag pills, and the three shared
// button primitives. Every figure below is the same real content that was
// already here — timelines, pricing (pulled from lib/pricing.ts), and the
// related-work links point at real case studies under /work/[slug].

const services = [
  {
    num: '01',
    title: 'Website Development',
    subtitle: 'Next.js architectures built for sub-second LCP and high search authority.',
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
    // Range, not a single "From" floor: the feature list above spans simple
    // landing pages up through headless-CMS/A-B-testing builds, which only
    // the Business Website tier and up actually include — a bare "From
    // ₹9,999" next to those features would misleadingly imply they're
    // included at the cheapest tier.
    pricing: `${cheapestTier.priceLabel} – ${pricingTiers.find((t) => t.id === 'business-website').priceLabel}`,
    tags: ['Next.js', 'React', 'Tailwind', 'TypeScript'],
    caseStudy: { slug: 'silver-spoon', title: 'Silver Spoon by ACJ', result: 'Headless Next.js storefront rebuild' },
  },
  {
    num: '02',
    title: 'E-Commerce Development',
    subtitle: 'Storefronts built to sell — from Shopify Plus builds to fully headless Next.js commerce.',
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
    pricing: `${cheapestTier.priceLabel} – ${pricingTiers.find((t) => t.id === 'business-website').priceLabel}`,
    tags: ['Shopify Plus', 'Next.js', 'Stripe / Razorpay', 'Headless Commerce'],
    caseStudy: { slug: 'prihaan-spices', title: 'Prihaan Spices & Agro', result: '252+ SKU E-Commerce Catalog' },
  },
  {
    num: '03',
    title: 'Backend Systems & API Architecture',
    subtitle: 'Distributed backends, microservices, and PostgreSQL systems built for 10x throughput.',
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
    caseStudy: null,
  },
  {
    num: '04',
    title: 'Mobile App Development',
    subtitle: 'iOS & Android applications with native 60fps performance and offline-first data sync.',
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
    caseStudy: null,
  },
  {
    num: '05',
    title: 'Custom Software Development',
    subtitle: 'End-to-end multi-tenant SaaS engines built to scale from launch to 50,000+ users.',
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
    caseStudy: { slug: 'vibo-erp', title: 'Vibo ERP', result: 'Built & used in-house at Mehta Technologies' },
  },
  {
    num: '06',
    title: 'Performance Marketing',
    subtitle: 'Paid acquisition campaigns engineered around profitable unit economics and ROAS.',
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
    caseStudy: null,
  },
  {
    num: '07',
    title: 'Technical SEO',
    subtitle: 'High-intent search engine rankings that drive qualified commercial demand.',
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
    caseStudy: { slug: 'chahana-dental', title: 'Chahana Dental Clinic', result: '0.55s mobile page load' },
  },
]

// The three button primitives from design-system-v2.md, reused as-is.
const btnPrimary =
  'inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white font-semibold hover:bg-accent-dim transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2'
const btnSecondary =
  'inline-flex items-center justify-center gap-2 rounded-full border border-ink/20 text-ink font-semibold hover:border-ink/40 hover:bg-ink/[0.03] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2'
const btnIconCircle =
  'inline-flex items-center justify-center w-11 h-11 shrink-0 rounded-full border border-ink/20 text-ink hover:bg-ink hover:text-white hover:border-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2'

// Rows rise in one at a time as each scrolls into view — a longer, calmer
// tween than the card-spring used on grids, because these are long reads.
const rowReveal = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

function ServiceRow({ svc }) {
  return (
    <motion.article
      id={`service-${svc.num}`}
      aria-labelledby={`service-${svc.num}-title`}
      variants={rowReveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      className="group scroll-mt-28 border-t border-border py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10"
    >
      {/* Numeral — the row's only decoration */}
      <div className="lg:col-span-2">
        <span
          aria-hidden="true"
          className="block font-display font-extrabold leading-none tracking-tight text-[56px] sm:text-[72px] lg:text-[88px] text-ink/15 group-hover:text-accent transition-colors duration-500"
        >
          {svc.num}
        </span>
      </div>

      {/* Title, promise, tags */}
      <div className="lg:col-span-4">
        <h2
          id={`service-${svc.num}-title`}
          className="font-display text-2xl sm:text-3xl font-extrabold text-ink tracking-tight leading-tight mb-4"
        >
          {svc.title}
        </h2>
        <p className="text-base text-ink-soft leading-relaxed mb-6">{svc.subtitle}</p>
        <ul className="flex flex-wrap gap-2" aria-label={`${svc.title} technologies`}>
          {svc.tags.map((t) => (
            <li key={t} className="px-3 py-1 rounded-full border border-ink/15 text-xs font-medium text-ink/75">
              {t}
            </li>
          ))}
        </ul>
      </div>

      {/* What's included */}
      <div className="lg:col-span-6">
        <div className="text-xs font-mono uppercase tracking-wider text-ink/55 mb-4">What&apos;s included</div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-8">
          {svc.features.map((f) => (
            <li key={f} className="flex gap-3 text-sm text-ink/80 leading-relaxed">
              <span aria-hidden="true" className="mt-[0.6em] h-px w-3 shrink-0 bg-accent" />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <div className="text-xs font-mono uppercase tracking-wider text-ink/55 mb-3">Deliverables</div>
        <p className="text-sm text-ink/80 leading-relaxed mb-8">{svc.deliverables.join(' · ')}</p>

        {/* Facts line + circular action */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-6 border-t border-border">
          <dl className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-10 gap-y-4">
            <div>
              <dt className="text-[11px] font-mono uppercase tracking-wider text-ink/55 mb-1">Timeline</dt>
              <dd className="text-sm font-semibold text-ink">{svc.timeline}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-mono uppercase tracking-wider text-ink/55 mb-1">Investment</dt>
              <dd className="text-sm font-semibold text-ink">{svc.pricing}</dd>
            </div>
            {svc.caseStudy && (
              <div className="col-span-2 sm:col-span-1">
                <dt className="text-[11px] font-mono uppercase tracking-wider text-ink/55 mb-1">Related work</dt>
                <dd className="text-sm">
                  <Link
                    href={`/work/${svc.caseStudy.slug}`}
                    className="font-semibold text-ink underline decoration-accent decoration-2 underline-offset-4 hover:decoration-ink transition-colors"
                  >
                    {svc.caseStudy.title}
                  </Link>
                  <span className="block text-ink-soft text-xs mt-0.5">{svc.caseStudy.result}</span>
                </dd>
              </div>
            )}
          </dl>

          <Link
            href={`/contact?service=${encodeURIComponent(svc.title)}`}
            className="inline-flex items-center gap-3 text-sm font-semibold text-ink self-start sm:self-auto group/cta"
          >
            <span className="whitespace-nowrap">Request a proposal</span>
            <span className={`${btnIconCircle} group-hover/cta:bg-ink group-hover/cta:text-white`}>
              <ArrowRight size={16} aria-hidden="true" />
            </span>
          </Link>
        </div>
      </div>
    </motion.article>
  )
}

export default function ServicesPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero — cream, asymmetric: headline block left, a working index of
          the seven practices right (it doubles as in-page navigation). */}
      <section className="bg-cream pt-32 sm:pt-40 pb-16 sm:pb-24">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-end">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <div className="text-xs font-mono uppercase tracking-wider text-ink/55 mb-5">Services</div>
            <h1 className="font-display text-[40px] sm:text-6xl lg:text-7xl font-extrabold text-ink tracking-tight leading-[1.04] mb-6">
              End-to-end digital services, built for longevity.
            </h1>
            <p className="text-base sm:text-lg text-ink-soft leading-relaxed max-w-xl mb-8">
              Seven multidisciplinary practice areas. One senior engineering studio. No junior handoffs or broken promises.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className={`${btnPrimary} px-7 py-3.5 text-sm`}>
                Book a free discovery call <ArrowRight size={15} aria-hidden="true" />
              </Link>
              <Link href="/work" className={`${btnSecondary} px-7 py-3.5 text-sm`}>
                See shipped work
              </Link>
            </div>
          </motion.div>

          <motion.nav
            aria-label="Jump to a service"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4 lg:col-start-9"
          >
            <ol className="border-t border-border">
              {services.map((svc) => (
                <li key={svc.num} className="border-b border-border">
                  <a
                    href={`#service-${svc.num}`}
                    className="group flex items-baseline gap-4 py-3 text-ink hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink rounded-sm"
                  >
                    <span className="text-xs font-mono text-ink/55 w-6 shrink-0">{svc.num}</span>
                    <span className="flex-1 text-sm sm:text-[15px] font-semibold">{svc.title}</span>
                    <ArrowRight
                      size={14}
                      aria-hidden="true"
                      className="shrink-0 text-accent opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                    />
                  </a>
                </li>
              ))}
            </ol>
          </motion.nav>
        </div>
      </section>

      {/* Numbered editorial rows — white */}
      <section className="bg-white pb-12 sm:pb-20">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8">
          {services.map((svc) => (
            <ServiceRow key={svc.num} svc={svc} />
          ))}
        </div>
      </section>

      {/* Closing band — inverted ink */}
      <section className="bg-ink text-white">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8 py-20 sm:py-28 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-8"
          >
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.08] mb-5">
              Unsure which service fits your roadmap?
            </h2>
            <p className="text-base sm:text-lg text-white/75 leading-relaxed max-w-xl">
              Schedule a free 30-minute technical discovery call with our solutions architects.
            </p>
          </motion.div>
          <div className="lg:col-span-4 flex flex-wrap gap-3 lg:justify-end">
            <Link href="/contact" className={`${btnPrimary} px-7 py-3.5 text-sm focus-visible:ring-white focus-visible:ring-offset-ink`}>
              Book free discovery session <ArrowRight size={15} aria-hidden="true" />
            </Link>
            <Link
              href="/#pricing"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 text-white font-semibold px-7 py-3.5 text-sm hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              View pricing <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
