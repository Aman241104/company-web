'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Globe, Code2, Smartphone, Package, TrendingUp, Search, ArrowRight, Check, Sparkles, Layers, ShieldCheck } from 'lucide-react'

const services = [
  {
    num: '01',
    icon: Globe,
    title: 'Website Development',
    subtitle: 'Next.js 15 architectures built for sub-second LCP and high search authority.',
    features: [
      'Next.js 15 App Router with <1s Largest Contentful Paint',
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
    pricing: 'From ₹20,000',
    tags: ['Next.js', 'React', 'Tailwind', 'TypeScript'],
    caseStudy: { title: 'Silver Spoon by ACJ', result: 'Headless Next.js storefront rebuild' },
  },
  {
    num: '02',
    icon: Code2,
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
    num: '03',
    icon: Smartphone,
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
    pricing: 'From ₹75,000',
    tags: ['React Native', 'Flutter', 'iOS', 'Android'],
    caseStudy: null,
  },
  {
    num: '04',
    icon: Package,
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
    caseStudy: { title: 'Vibo ERP', result: 'Built & used in-house at Mehta Technologies' },
  },
  {
    num: '05',
    icon: TrendingUp,
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
    num: '06',
    icon: Search,
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
    caseStudy: { title: 'Chahana Dental Clinic', result: '0.55s mobile page load' },
  },
]

function ServiceCard({ svc, index }) {
  const Icon = svc.icon
  return (
    <motion.div
      id={`service-${svc.num}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="rounded-3xl bg-white/[0.02] border border-white/[0.08] hover:border-blue-500/30 p-8 sm:p-10 transition-all duration-300 shadow-2xl shadow-black/40 relative overflow-hidden scroll-mt-28"
    >
      {/* Top Accent Line */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      {/* Card Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
            <Icon size={22} />
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-blue-400 mb-0.5">
              Service {svc.num}
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {svc.title}
            </h3>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {svc.tags.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-md text-xs font-medium bg-white/[0.04] text-white/70 border border-white/[0.08]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <p className="text-sm sm:text-base text-white/60 leading-relaxed font-normal mb-8 max-w-2xl">
        {svc.subtitle}
      </p>

      {/* Grid: Included Features & Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 border-t border-white/[0.08]">
        
        {/* Features List */}
        <div className="lg:col-span-8 space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-white/55 mb-4">
            Key Architecture & Capabilities
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {svc.features.map((f) => (
              <div key={f} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/75 font-normal">
                <Check size={14} className="text-blue-400 shrink-0 mt-1" />
                <span className="leading-relaxed">{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-4 rounded-2xl bg-[#0B0D14] border border-white/[0.08] p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <span className="text-xs text-white/55 font-mono uppercase">Timeline</span>
              <span className="text-xs font-bold text-white">{svc.timeline}</span>
            </div>
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <span className="text-xs text-white/55 font-mono uppercase">Investment</span>
              <span className="text-xs font-bold text-blue-400 font-mono">{svc.pricing}</span>
            </div>
            {svc.caseStudy && (
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <div className="text-[10px] font-mono uppercase tracking-wider text-blue-400/80 mb-0.5">Related Work</div>
                <div className="text-xs font-bold text-white">{svc.caseStudy.title}</div>
                <div className="text-xs text-blue-300">{svc.caseStudy.result}</div>
              </div>
            )}
          </div>

          <Link
            href={`/contact?service=${encodeURIComponent(svc.title)}`}
            className="w-full py-3 rounded-full text-xs font-semibold bg-white text-black hover:bg-white/90 text-center transition-all flex items-center justify-center gap-2 shadow-lg shadow-white/10"
          >
            Request Proposal <ArrowRight size={13} />
          </Link>
        </div>

      </div>
    </motion.div>
  )
}

export default function ServicesPage() {
  return (
    <div className="pt-32 pb-24 overflow-hidden">
      {/* Section Header */}
      <section className="max-w-[1360px] mx-auto px-6 md:px-8 mb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <span className="glow-pill mb-4 inline-flex">
            Full-Stack Engineering & Growth
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-6">
            End-to-end digital services.{' '}
            <span className="text-gradient-accent">Built for longevity.</span>
          </h1>
          <p className="text-base sm:text-lg text-white/50 leading-relaxed">
            Six multidisciplinary practice areas. One senior engineering studio. No junior handoffs or broken promises.
          </p>
        </motion.div>
      </section>

      {/* Services List */}
      <section className="max-w-[1360px] mx-auto px-6 md:px-8 space-y-8 mb-28">
        {services.map((svc, i) => (
          <ServiceCard key={svc.num} svc={svc} index={i} />
        ))}
      </section>

      {/* Bottom CTA */}
      <section className="max-w-[1360px] mx-auto px-6 md:px-8 text-center">
        <div className="max-w-2xl mx-auto rounded-3xl bg-white/[0.02] border border-white/[0.08] p-10 sm:p-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Unsure which service architecture fits your roadmap?
          </h2>
          <p className="text-sm sm:text-base text-white/50 mb-8 max-w-md mx-auto">
            Schedule a free 30-minute technical discovery call with our solutions architects.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs sm:text-sm font-semibold bg-white text-black hover:bg-white/90 shadow-xl shadow-white/10 transition-all"
          >
            Book Free Discovery Session <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  )
}
