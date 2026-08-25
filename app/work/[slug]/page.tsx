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
  'sv-space-designs': {
    slug: 'sv-space-designs',
    name: 'SV Space Designs',
    client: 'SV Space Designs Studio',
    category: 'Architecture & Turnkey Studio',
    year: '2025',
    heroImage: '/assets/stylux_mockup.jpg',
    liveUrl: 'https://www.svspacedesigns.in',
    headline: 'Editorial luxury interior studio portfolio with turnkey execution showcase & custom grain aesthetic.',
    summary: 'A bespoke digital experience for Ahmedabad-based interior architecture studio SV Space Designs, highlighting vendor-direct material pricing, interactive video walkthroughs, and sub-second performance.',
    challenge: 'The studio needed an authentic visual identity that reflects their motto "Interiors delivered better than the render", while maintaining 100/100 performance across high-resolution image galleries.',
    solution: 'Engineered a Next.js 15 app with adaptive WebP/AVIF responsive picture sets, custom grain overlays, interactive video player modals, and direct WhatsApp lead routing.',
    architecture: ['Next.js 15 App Router', 'Tailwind CSS', 'Framer Motion', 'Vercel Edge Network', 'WhatsApp Business Routing'],
    metrics: [
      { label: 'Google Lighthouse Performance', value: '100 / 100', detail: 'Across all mobile & desktop audits' },
      { label: 'Mobile Page Load Speed', value: '0.62s', detail: 'Sub-second first contentful paint' },
      { label: 'Qualified Lead Inquiries', value: '+380%', detail: 'In direct project discovery requests' },
      { label: 'Bounce Rate Reduction', value: '-42%', detail: 'High engagement across portfolio' },
    ],
    quote: {
      text: 'Mehta Technologies captured the exact soul of our studio. Our clients frequently mention how crisp and fast the website feels.',
      author: 'Simran Vatyani',
      role: 'Founder, SV Space Designs',
    },
  },
  'prihaan-spices': {
    slug: 'prihaan-spices',
    name: 'Prihaan Spices & Agro',
    client: 'Prihaan Spices & Agro Foods',
    category: 'E-Commerce & Agro',
    year: '2025',
    heroImage: '/assets/silver_spoon_mockup.jpg',
    liveUrl: 'https://prihaan-spices-web-pi.vercel.app',
    headline: 'Scaling 252+ organic spice SKUs with Supabase storage CDN & instant WhatsApp checkout.',
    summary: 'An authentic Indian spices and dry fruits e-commerce storefront featuring instant multi-category filtering, Supabase media hosting, and streamlined zero-friction WhatsApp ordering.',
    challenge: 'Managing over 250 product SKUs across 10 categories with heavy images caused sluggish loading and cart abandonment on standard CMS platforms.',
    solution: 'Built a lightweight Next.js 15 catalog with Supabase object storage CDN, static pre-rendering, search indexing, and automated WhatsApp order message formulation.',
    architecture: ['Next.js 15', 'Supabase Object Storage', 'Tailwind CSS', 'WhatsApp Order Flow', 'Vercel Edge'],
    metrics: [
      { label: 'Live Catalog SKUs', value: '252+', detail: 'Across 10 distinct food categories' },
      { label: 'WhatsApp Checkout Speed', value: '2.4s', detail: 'From cart to verified WhatsApp message' },
      { label: 'Direct Online Orders', value: '+185%', detail: 'Growth in weekly direct retail orders' },
      { label: 'Image Asset Optimization', value: '-78%', detail: 'Bandwidth savings via edge WebP' },
    ],
    quote: {
      text: 'Our customers love how easily they can browse all 250+ spices and dry fruits and order on WhatsApp directly.',
      author: 'Prihaan Management Team',
      role: 'Prihaan Spices & Agro Foods',
    },
  },
  'ekam-by-seri': {
    slug: 'ekam-by-seri',
    name: 'Ekam by Seri',
    client: 'Ekam Artisan Décor Studio',
    category: 'Luxury Heritage Décor',
    year: '2025',
    heroImage: '/assets/silver_spoon_mockup.jpg',
    liveUrl: 'https://ekam-by-seri-web.vercel.app',
    headline: 'Preserving timeless Lippan & mirror-work crafts with editorial luxury commerce.',
    summary: 'A handcrafted heritage home décor brand platform celebrating Kutch artisan techniques with editorial typography, smooth physics, and curated collections.',
    challenge: 'Bridging the gap between traditional rural craftsmanship and ultra-high-net-worth luxury interior buyers required an uncompromising design language.',
    solution: 'Designed an editorial aesthetic featuring Cormorant Garamond typography, smooth Lenis inertial scroll physics, and custom product discovery lookbooks.',
    architecture: ['Next.js App Router', 'Lenis Smooth Scroll', 'Tailwind CSS', 'Supabase Media Storage', 'Vercel Deployment'],
    metrics: [
      { label: 'Scroll Frame Rate', value: '60 FPS', detail: 'Buttery-smooth inertial physics' },
      { label: 'Brand Inquiries', value: '+220%', detail: 'High-ticket custom interior commissions' },
      { label: 'Session Duration', value: '3m 42s', detail: 'High engagement on artisan stories' },
      { label: 'Cloud Uptime', value: '99.9%', detail: 'Hosted on global edge network' },
    ],
    quote: {
      text: 'The craftsmanship of the website matches the craftsmanship of our Lippan art pieces. Pure elegance.',
      author: 'Seri Design Team',
      role: 'Creative Directors, Ekam by Seri',
    },
  },
  'advocate-jay-patel': {
    slug: 'advocate-jay-patel',
    name: 'Advocate Jay Patel',
    client: 'Chambers of Advocate Jay Patel',
    category: 'High Court Legal Counsel',
    year: '2025',
    heroImage: '/assets/vibo_erp_mockup.jpg',
    liveUrl: 'https://advocate-jay-patel-web.vercel.app',
    headline: 'High Court litigation & criminal defence practice portal for Senior Advocate Jay Patel.',
    summary: 'A high-authority digital presence highlighting 15+ years of criminal defence, civil litigation, and corporate legal advisory across Ahmedabad and the Gujarat High Court.',
    challenge: 'Communicating high-stakes legal expertise with confidentiality, trust, and frictionless appointment scheduling across multiple legal practice areas.',
    solution: 'Constructed an authoritative dark-mode legal portal with categorized practice areas, client matter intake form, and sub-second edge response.',
    architecture: ['Next.js App Router', 'Tailwind CSS', 'Encrypted Intake Pipeline', 'Vercel Edge'],
    metrics: [
      { label: 'Track Record Showcased', value: '15+ Years', detail: '200+ successful legal representations' },
      { label: 'Edge TTFB', value: '42ms', detail: 'Instantaneous page delivery' },
      { label: 'Client Inquiry Growth', value: '+160%', detail: 'In direct legal consultation requests' },
      { label: 'Mobile Optimization', value: '100 / 100', detail: 'Accessible across all devices' },
    ],
    quote: {
      text: 'Professional, dignified, and fast. The website reflects our chamber’s standard of legal excellence.',
      author: 'Advocate Jay Patel',
      role: 'Senior Advocate, Gujarat High Court',
    },
  },
  'jj-films': {
    slug: 'jj-films',
    name: 'JJ Films & Cinematography',
    client: 'JJ Films Production House',
    category: 'Cinematic Visual Media',
    year: '2025',
    heroImage: '/jjfilms.png',
    liveUrl: 'https://jj-films-web.vercel.app',
    headline: '3,000+ cinematic masterpieces and commercial campaigns powered by ultra-fast 4K streaming.',
    summary: 'Ahmedabad’s premier cinematic production studio showcasing 24 years of real estate cinematography, commercial brand films (Tanishq, Titan, Hitachi), and luxury wedding films.',
    challenge: 'Delivering heavy 4K video reels and aerial photography without buffering or page lag on mobile devices.',
    solution: 'Engineered an adaptive streaming media gallery with WebP thumbnail preloading, custom video modal overlays, and 60fps UI transitions.',
    architecture: ['Next.js 15', 'Custom Video Player', 'Tailwind CSS', '4K CDN Delivery', 'Vercel Global Edge'],
    metrics: [
      { label: 'Archived Masterpieces', value: '3,000+', detail: '24 years of zero negative reviews' },
      { label: 'Video Initial Play Latency', value: '< 180ms', detail: 'Instant video startup without buffer' },
      { label: 'Commercial Client Inquiries', value: '+310%', detail: 'From real estate builders & brands' },
      { label: 'Lighthouse Audit', value: '98 / 100', detail: 'High performance despite heavy video' },
    ],
    quote: {
      text: 'Our 4K reels look absolutely stunning. It has elevated our brand positioning to high-ticket corporate and wedding clients.',
      author: 'Jayesh & Jignesh',
      role: 'Founders, JJ Films',
    },
  },
  'preetam-aluglaze': {
    slug: 'preetam-aluglaze',
    name: 'Preetam Aluglaze Facades',
    client: 'Preetam Aluglaze Engineering',
    category: 'Architectural Glazing & Facades',
    year: '2025',
    heroImage: '/assets/stylux_mockup.jpg',
    liveUrl: 'https://preetam-aluglaze.vercel.app',
    headline: 'Commercial architectural glazing, structural curtain walls, and facade engineering.',
    summary: 'A specialized B2B facade engineering and glazing manufacturing portal with commercial contractor bidding, technical spec downloads, and project showcase.',
    challenge: 'Facilitating commercial RFQs and technical specification downloads for large architectural projects with instant turnaround.',
    solution: 'Developed an industrial Next.js catalog with fast specification search, contractor RFQ calculator, and high-fidelity project gallery.',
    architecture: ['Next.js App Router', 'Tailwind CSS', 'B2B RFQ Engine', 'Vercel Edge'],
    metrics: [
      { label: 'Commercial Facades Delivered', value: '50+', detail: 'Across high-rise towers and complexes' },
      { label: 'Spec Sheet Download Speed', value: '0.4s', detail: 'Instant CAD/PDF spec retrieval' },
      { label: 'B2B Lead Pipeline', value: '+190%', detail: 'Growth in commercial contractor inquiries' },
      { label: 'Global Uptime', value: '99.99%', detail: 'Zero downtime' },
    ],
    quote: {
      text: 'The website makes it effortless for architects and builders to review our technical specs and submit commercial RFQs.',
      author: 'Preetam Engineering Leadership',
      role: 'Preetam Aluglaze',
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
