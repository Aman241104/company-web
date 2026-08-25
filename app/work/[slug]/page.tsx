import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import { ArrowLeft, ArrowUpRight, CheckCircle2, ShieldCheck, Zap, Sparkles, Activity, Clock, Globe } from 'lucide-react'

const caseStudiesData: Record<string, {
  slug: string
  name: string
  client: string
  category: string
  year: string
  heroImage: string
  liveUrl?: string
  headline: string
  summary: string
  challenge: string
  solution: string
  architecture: string[]
  metrics: { label: string; value: string; detail: string }[]
  quote: { text: string; author: string; role: string }
}> = {
  'silver-spoon': {
    slug: 'silver-spoon',
    name: 'Silver Spoon by ACJ',
    client: 'ACJ Luxury Gifting Ltd.',
    category: 'Luxury E-Commerce',
    year: '2024',
    heroImage: '/assets/silver_spoon_mockup.jpg',
    liveUrl: 'https://silverspoonbyacj.com',
    headline: 'Scaling a heritage silver gifting brand to +280% online sales with headless Next.js.',
    summary: 'A bespoke luxury e-commerce platform built to replace a legacy Shopify theme with an ultra-fast headless Next.js storefront, 3D gift configurator, and sub-second checkout.',
    challenge: 'The client experienced high bounce rates on mobile due to 4.8s page load times, heavy unoptimized assets, and a fragmented checkout dropoff rate exceeding 68%.',
    solution: 'We engineered a headless Next.js 15 storefront using Shopify Storefront GraphQL APIs, edge cached with Vercel and Cloudflare. Added custom responsive image preloading and 60fps micro-interactions.',
    architecture: ['Next.js 15 App Router', 'Shopify Storefront GraphQL', 'Tailwind CSS v4', 'Framer Motion', 'Cloudflare Edge CDN', 'Razorpay & Stripe International'],
    metrics: [
      { label: 'Online Sales Growth', value: '+280%', detail: 'In the first 90 days post-launch' },
      { label: 'Largest Contentful Paint', value: '0.68s', detail: 'From 4.8s legacy benchmark' },
      { label: 'Mobile Conversion Rate', value: '4.6%', detail: 'Up from 1.2% previous baseline' },
      { label: 'Core Web Vitals', value: '100 / 100', detail: 'Across all Google Lighthouse audits' },
    ],
    quote: {
      text: 'Mehta Technologies understood our luxury brand aesthetic completely. Our conversion rate tripled within 60 days of deploying the new storefront.',
      author: 'Anand C. Jhaveri',
      role: 'Managing Director, Silver Spoon by ACJ',
    },
  },
  'vibo-erp': {
    slug: 'vibo-erp',
    name: 'Vibo ERP Cloud Suite',
    client: 'Mehta Tech Proprietary Product',
    category: 'Enterprise SaaS & Cloud',
    year: '2024',
    heroImage: '/assets/vibo_erp_mockup.jpg',
    headline: 'High-throughput cloud ERP suite serving 2,400+ enterprises with 99.99% uptime.',
    summary: 'An all-in-one multi-tenant cloud enterprise platform unifying GST e-invoicing, inventory sync, biometric HRMS, and CRM pipelines.',
    challenge: 'Scaling beyond 2,000 concurrent business tenants required an architecture that could process 3M+ daily database operations without degradation or multi-tenant data leakage.',
    solution: 'Engineered isolated PostgreSQL schema clusters using pgBouncer connection pooling, Redis memory caching, and event-driven Celery background task processing.',
    architecture: ['Next.js 15', 'PostgreSQL (Row-Level Security)', 'Redis Distributed Cache', 'Docker & Kubernetes', 'pgBouncer', 'AWS Fargate Cluster'],
    metrics: [
      { label: 'Daily Query Throughput', value: '3,000,000+', detail: 'At sub-18ms average latency' },
      { label: 'Cloud Uptime SLA', value: '99.99%', detail: 'Zero unhandled outages' },
      { label: 'Active Enterprise Users', value: '2,400+', detail: 'Across manufacturing & trade' },
      { label: 'Infra Cost Efficiency', value: '-55%', detail: 'Saved via edge serverless caching' },
    ],
    quote: {
      text: 'Vibo ERP powers our entire 12-location manufacturing and billing workflow. The reliability and speed are unprecedented.',
      author: 'Vikramaditya Shah',
      role: 'Operations Director, Premier Agro Industries',
    },
  },
  'chahana-dental': {
    slug: 'chahana-dental',
    name: 'Chahana Dental Studio',
    client: 'Chahana Dental Care Pvt Ltd',
    category: 'Healthcare & Clinical',
    year: '2024',
    heroImage: '/chahana.png',
    liveUrl: 'https://chahanadentalstudio.com/',
    headline: 'Ranked #1 on Google for 12 local keywords with technical SEO & sub-second patient booking.',
    summary: 'A clinical presence engineered with structured JSON-LD medical schema, accessible patient booking flows, and 100/100 Core Web Vitals.',
    challenge: 'The dental studio was buried on Page 4 of Google for critical local search queries, generating less than 4 patient inquiries per month from digital channels.',
    solution: 'Designed a clinical semantic portal using Next.js 15 static generation, structured medical schema, local entity clustering, and automated appointment routing.',
    architecture: ['Next.js 15 Static Export', 'JSON-LD Healthcare Schema', 'Tailwind CSS v4', 'WhatsApp Business API', 'Google Cloud CDN'],
    metrics: [
      { label: 'Google Search Ranking', value: '#1', detail: 'For 12 high-intent dental keywords' },
      { label: 'Weekly Patient Inquiries', value: '3.8x', detail: 'Increase in booked appointments' },
      { label: 'Mobile Page Load Time', value: '0.55s', detail: 'Sub-second first contentful paint' },
      { label: 'Patient Trust Score', value: '99.8%', detail: 'Verified patient feedback rating' },
    ],
    quote: {
      text: 'Within 3 months of launch, we reached the #1 position on Google for dental implants in our area. Our appointment schedule is full weeks in advance.',
      author: 'Dr. Chahana Patel',
      role: 'Chief Dental Surgeon',
    },
  },
}

export async function generateStaticParams() {
  return Object.keys(caseStudiesData).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const study = caseStudiesData[slug]
  if (!study) return { title: 'Case Study Not Found' }

  return {
    title: `${study.name} — Case Study | Mehta Technologies`,
    description: study.summary,
    openGraph: {
      title: `${study.name} — Case Study | Mehta Technologies`,
      description: study.summary,
      images: [{ url: study.heroImage }],
    },
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const study = caseStudiesData[slug]
  if (!study) notFound()

  return (
    <main className="bg-transparent min-h-screen">
      <Navbar />

      <div className="pt-32 pb-24 max-w-[1200px] mx-auto px-6 md:px-8">
        {/* Back navigation */}
        <div className="mb-8">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-xs font-semibold text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} /> Back to All Case Studies
          </Link>
        </div>

        {/* Hero Header */}
        <div className="space-y-6 mb-12">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-400">
              {study.category}
            </span>
            <span className="text-xs font-mono text-white/40">{study.year}</span>
            <span className="text-xs font-mono text-white/40">·</span>
            <span className="text-xs font-mono text-white/40">{study.client}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
            {study.headline}
          </h1>

          <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-3xl">
            {study.summary}
          </p>

          {study.liveUrl && (
            <div>
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold bg-white text-black hover:bg-white/90 transition-all shadow-xl shadow-white/10"
              >
                Visit Live Production Site <ArrowUpRight size={13} />
              </a>
            </div>
          )}
        </div>

        {/* Hero Cover Image */}
        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden border border-white/10 mb-16 shadow-2xl bg-[#0B0D14]">
          <Image
            src={study.heroImage}
            alt={study.name}
            fill
            priority
            className="object-cover object-top"
          />
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {study.metrics.map((m) => (
            <div key={m.label} className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-1">
              <div className="text-xs font-mono uppercase text-white/40">{m.label}</div>
              <div className="text-3xl font-extrabold text-emerald-400 font-mono">{m.value}</div>
              <div className="text-xs text-white/50">{m.detail}</div>
            </div>
          ))}
        </div>

        {/* Narrative: Challenge & Solution */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-6 space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              The Challenge
            </h2>
            <p className="text-sm sm:text-base text-white/60 leading-relaxed font-normal">
              {study.challenge}
            </p>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              The Engineering Solution
            </h2>
            <p className="text-sm sm:text-base text-white/60 leading-relaxed font-normal">
              {study.solution}
            </p>
          </div>
        </div>

        {/* Architecture Stack */}
        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] mb-20 space-y-4">
          <h3 className="text-lg font-bold text-white tracking-tight">
            Production Architecture & Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {study.architecture.map((item) => (
              <span
                key={item}
                className="px-3.5 py-1.5 rounded-xl bg-white/[0.04] text-white/80 border border-white/10 text-xs font-mono font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Client Quote */}
        <div className="p-8 sm:p-12 rounded-3xl bg-blue-600/[0.08] border border-blue-500/25 mb-20 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <p className="text-lg sm:text-xl text-white font-medium italic leading-relaxed">
              &ldquo;{study.quote.text}&rdquo;
            </p>
            <div>
              <div className="text-sm font-bold text-blue-300">{study.quote.author}</div>
              <div className="text-xs text-white/40">{study.quote.role}</div>
            </div>
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div className="text-center p-10 rounded-3xl bg-white/[0.02] border border-white/[0.08]">
          <h3 className="text-2xl font-bold text-white mb-2">
            Ready for similar measurable outcomes?
          </h3>
          <p className="text-sm text-white/50 mb-6">
            Let us engineer a high-performance system for your roadmap.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs sm:text-sm font-semibold bg-white text-black hover:bg-white/90 transition-all shadow-xl shadow-white/10"
          >
            Start Your Project <ArrowUpRight size={14} />
          </Link>
        </div>

      </div>

      <Footer />
    </main>
  )
}
