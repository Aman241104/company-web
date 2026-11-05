import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'

const caseStudiesData: Record<string, {
  slug: string
  name: string
  client: string
  category: string
  year: string
  heroImage?: string
  heroImageFit?: 'cover' | 'contain'
  status?: 'in-progress'
  liveUrl?: string
  headline: string
  summary: string
  challenge: string
  solution: string
  architecture: string[]
  metrics: { label: string; value: string; detail: string }[]
  quote?: { text: string; author: string; role: string }
}> = {
  'sv-space-designs': {
    slug: 'sv-space-designs',
    name: 'SV Space Designs',
    client: 'SV Space Designs Studio',
    category: 'Architecture & Turnkey Studio',
    year: '2025',
    heroImage: '/assets/sv-space-designs-live.jpg',
    liveUrl: 'https://www.svspacedesigns.in',
    headline: 'Editorial luxury interior studio portfolio with turnkey execution showcase & custom grain aesthetic.',
    summary: 'A bespoke digital experience for Ahmedabad-based interior architecture studio SV Space Designs, highlighting vendor-direct material pricing, interactive video walkthroughs, and sub-second performance.',
    challenge: 'The studio needed an authentic visual identity that reflects their motto "Interiors delivered better than the render", while maintaining 100/100 performance across high-resolution image galleries.',
    solution: 'Engineered a Next.js 15 app with adaptive WebP/AVIF responsive picture sets, custom grain overlays, interactive video player modals, and direct WhatsApp lead routing.',
    architecture: ['Next.js 15 App Router', 'Tailwind CSS', 'Framer Motion', 'Vercel Edge Network', 'WhatsApp Business Routing'],
    metrics: [
      { label: 'Google Lighthouse Performance', value: '100 / 100', detail: 'Across all mobile & desktop audits' },
      { label: 'Mobile Page Load Speed', value: '0.62s', detail: 'Sub-second first contentful paint' },
    ],
  },
  'prihaan-spices': {
    slug: 'prihaan-spices',
    name: 'Prihaan Spices & Agro',
    client: 'Prihaan Spices & Agro Foods',
    category: 'Spices & Agro E-Commerce',
    year: '2025',
    heroImage: '/assets/prihaan-spices-live.jpg',
    liveUrl: 'https://www.prihaanspices.in',
    headline: 'Scaling 252+ organic spice SKUs with Supabase storage CDN & instant WhatsApp checkout.',
    summary: 'An authentic Indian spices and dry fruits e-commerce storefront featuring instant multi-category filtering, Supabase media hosting, and streamlined zero-friction WhatsApp ordering.',
    challenge: 'Managing over 250 product SKUs across 10 categories with heavy images caused sluggish loading and cart abandonment on standard CMS platforms.',
    solution: 'Built a lightweight Next.js 15 catalog with Supabase object storage CDN, static pre-rendering, search indexing, and automated WhatsApp order message formulation.',
    architecture: ['Next.js 15', 'Supabase Object Storage', 'Tailwind CSS', 'WhatsApp Order Flow', 'Vercel Edge'],
    metrics: [
      { label: 'Live Catalog SKUs', value: '252+', detail: 'Across 10 distinct food categories' },
      { label: 'WhatsApp Checkout Speed', value: '2.4s', detail: 'From cart to verified WhatsApp message' },
      { label: 'Image Asset Optimization', value: '-78%', detail: 'Bandwidth savings via edge WebP' },
    ],
  },
  'silver-spoon': {
    slug: 'silver-spoon',
    name: 'Silver Spoon by ACJ',
    client: 'ACJ Luxury Gifting Ltd.',
    category: 'Luxury E-Commerce',
    year: '2024',
    heroImage: '/silverspoon-screenshot.png',
    liveUrl: 'https://www.silverspoonbyacj.com',
    headline: 'A fast, headless Next.js storefront for a heritage silver gifting brand.',
    summary: 'A bespoke luxury e-commerce platform built to replace a legacy Shopify theme with an ultra-fast headless Next.js storefront, 3D gift configurator, and sub-second checkout.',
    challenge: 'The client experienced high bounce rates on mobile due to 4.8s page load times, heavy unoptimized assets, and a fragmented checkout experience.',
    solution: 'We engineered a headless Next.js 15 storefront using Shopify Storefront GraphQL APIs, edge cached with Vercel and Cloudflare. Added custom responsive image preloading and 60fps micro-interactions.',
    architecture: ['Next.js 15 App Router', 'Shopify Storefront GraphQL', 'Tailwind CSS v4', 'Framer Motion', 'Cloudflare Edge CDN', 'Razorpay & Stripe International'],
    metrics: [
      { label: 'Largest Contentful Paint', value: '0.68s', detail: 'From 4.8s legacy benchmark' },
      { label: 'Core Web Vitals', value: '100 / 100', detail: 'Across all Google Lighthouse audits' },
    ],
  },
  'vibo-erp': {
    slug: 'vibo-erp',
    name: 'Vibo ERP',
    client: 'Built & Used In-House',
    category: 'Our Own Product',
    year: '2024',
    heroImage: '/assets/saas_hero_mockup.png',
    heroImageFit: 'contain',
    liveUrl: 'https://app.viboerp.com/',
    headline: 'Our own business management software, built to run our own operations.',
    summary: 'Vibo ERP is our in-house product — a single dashboard for sales, inventory, billing, customers, purchases, and business reporting.',
    challenge: 'We were running our own operations across spreadsheets and disconnected tools, with no single place to see sales, stock, and billing together.',
    solution: 'We built Vibo ERP ourselves to solve that — and kept refining it through everyday use, before making it available to clients who need more than a website.',
    architecture: ['Next.js 15', 'PostgreSQL', 'Sales & Inventory', 'Billing & Invoicing'],
    metrics: [],
  },
  'chahana-dental': {
    slug: 'chahana-dental',
    name: 'Chahana Dental Studio',
    client: 'Chahana Dental Care Pvt Ltd',
    category: 'Healthcare & Clinical',
    year: '2024',
    heroImage: '/chahana.png',
    liveUrl: 'https://chahanadentalstudio.com',
    headline: 'A clinical presence built on technical SEO and sub-second patient booking.',
    summary: 'A clinical presence engineered with structured JSON-LD medical schema, accessible patient booking flows, and 100/100 Core Web Vitals.',
    challenge: 'The dental studio had low visibility on Google for the local search queries that matter most to a growing clinic.',
    solution: 'Designed a clinical semantic portal using Next.js 15 static generation, structured medical schema, local entity clustering, and automated appointment routing.',
    architecture: ['Next.js 15 Static Export', 'JSON-LD Healthcare Schema', 'Tailwind CSS v4', 'WhatsApp Business API', 'Google Cloud CDN'],
    metrics: [
      { label: 'Mobile Page Load Time', value: '0.55s', detail: 'Sub-second first contentful paint' },
    ],
  },
  'destination-anywhere': {
    slug: 'destination-anywhere',
    name: 'Destination Anywhere',
    client: 'Destination Anywhere Luxury Travels',
    category: 'Luxury Travel & Itinerary',
    year: '2024',
    heroImage: '/destination.png',
    liveUrl: 'https://www.destinationanywhere.co.in/',
    headline: 'Curated luxury global travel planning platform with custom itinerary builder.',
    summary: 'A bespoke travel discovery platform featuring interactive worldwide destination guides, personalized inquiry builders, and instant consultation scheduling.',
    challenge: 'Creating a high-ticket travel booking experience that feels ultra-exclusive while maintaining quick load times across immersive photography.',
    solution: 'Engineered an interactive travel platform using Next.js static generation, map overlays, and automated lead qualification.',
    architecture: ['Next.js App Router', 'Tailwind CSS', 'Framer Motion', 'Edge CDN Delivery'],
    metrics: [
      { label: 'Global Destinations', value: '40+ Countries', detail: 'Curated international luxury tours' },
      { label: 'Image Load Latency', value: '0.45s', detail: 'Edge-optimized responsive gallery' },
    ],
  },
  'zingbliss-events': {
    slug: 'zingbliss-events',
    name: 'ZingBliss Events',
    client: 'ZingBliss Event Production',
    category: 'Luxury Wedding & Events',
    year: '2024',
    heroImage: '/zingbliss.png',
    liveUrl: 'https://www.zingblissevents.com',
    headline: 'High-converting luxury event design portal converting HNW inquiries into confirmed destination contracts.',
    summary: 'A luxury wedding and corporate event production portal engineered for ultra-high conversion, interactive portfolio showcases, and client inquiry workflows.',
    challenge: 'High drop-off rates on legacy landing pages failed to capture high-budget destination wedding inquiries.',
    solution: 'Designed an editorial visual portfolio with smooth motion aesthetics, destination package calculator, and instant VIP consultation scheduling.',
    architecture: ['Next.js App Router', 'Tailwind CSS', 'Framer Motion', 'Vercel Global Edge'],
    metrics: [
      { label: 'Mobile Performance', value: '99 / 100', detail: 'Smooth animations across devices' },
    ],
  },
  'ares-business-league': {
    slug: 'ares-business-league',
    name: 'Ares Business League',
    client: 'Ares Executive Network',
    category: 'Executive B2B Network',
    year: '2025',
    heroImage: '/assets/ares-business-league-live.jpg',
    liveUrl: 'https://www.aresbusinessleague.com',
    headline: 'Executive business networking league, member directory & chapter referral tracking portal.',
    summary: 'A private business league portal unifying executive member directories, chapter attendance tracking, and cross-company business referral telemetry.',
    challenge: 'Managing a growing base of executive members and their business referrals required a robust, secure B2B platform.',
    solution: 'Developed a custom Next.js portal with role-based member dashboards, chapter directories, and automated referral logging.',
    architecture: ['Next.js 15', 'Tailwind CSS', 'PostgreSQL', 'Vercel Deployment'],
    metrics: [
      { label: 'Directory Lookup Speed', value: '0.2s', detail: 'Instant member filtering' },
    ],
  },
  'club-mj-events': {
    slug: 'club-mj-events',
    name: 'CMJ Events',
    client: 'CMJ Events',
    category: 'Luxury Wedding & Event Planning',
    year: '2025',
    heroImage: '/assets/club-mj-events-live.jpg',
    liveUrl: 'https://www.clubmjevents.com',
    headline: 'Award-winning wedding & event studio’s digital presence, built to turn portfolio browsing into consultations.',
    summary: 'A digital presence for CMJ Events, an Ahmedabad-based in-house design and production studio behind 250+ weddings, corporate productions, and private celebrations across India and worldwide.',
    challenge: 'A portfolio-driven business needed a fast, gallery-heavy site that lets prospective clients browse hundreds of real celebrations without sacrificing load speed, while routing high-intent inquiries straight into a consultation funnel.',
    solution: 'Built a Next.js gallery and inquiry experience with optimized image delivery for a large real-event photo library, structured service pages by celebration type, and a direct WhatsApp/consultation funnel.',
    architecture: ['Next.js App Router', 'Tailwind CSS', 'Framer Motion', 'Vercel Edge'],
    metrics: [],
  },
  'naam-transfer': {
    slug: 'naam-transfer',
    name: 'Naam Transfer',
    client: 'Naam Transfer Legal Tech',
    category: 'Legal Property Documentation',
    year: '2025',
    heroImage: '/assets/naam-transfer-live.jpg',
    liveUrl: 'https://www.naamtransfer.com',
    headline: 'Property title deed transfer, municipal registry documentation & legal name change portal.',
    summary: 'A specialized legal workflow platform streamlining property name transfers, electricity bill name changes, and municipal property tax transfers.',
    challenge: 'Navigating government registry requirements was confusing for property owners, leading to incomplete submissions and long delays.',
    solution: 'Created an intelligent step-by-step document wizard with automated document verification and case status tracking.',
    architecture: ['Next.js 15', 'Tailwind CSS', 'Encrypted Intake Pipeline', 'Vercel Edge'],
    metrics: [
      { label: 'Automated Intake Rate', value: '100%', detail: 'Fully digitized documentation pipeline' },
      { label: 'Mobile Accessibility Score', value: '100 / 100', detail: 'Google Lighthouse audit' },
    ],
  },
  'nexsphere-global': {
    slug: 'nexsphere-global',
    name: 'NexSphere Global',
    client: 'NexSphere Financial Advisory',
    category: 'Corporate Advisory & FinTech',
    year: '2024',
    heroImage: '/nextsphere.png',
    liveUrl: 'https://www.thenexsphereglobal.com',
    headline: 'Global financial compliance, international tax advisory hub & cross-border services.',
    summary: 'A financial compliance and global entity advisory portal featuring automated international tax calculators, country comparison tools, and corporate lead engine.',
    challenge: 'Presenting intricate global corporate tax laws clearly while positioning the firm as a leader for cross-border expansion.',
    solution: 'Engineered a clean advisory platform with dynamic calculators, jurisdiction guides, and automated consultation scheduling.',
    architecture: ['Next.js App Router', 'Tailwind CSS', 'Interactive Calculators', 'Vercel Edge'],
    metrics: [
      { label: 'Jurisdictions Covered', value: '25+ Countries', detail: 'International corporate compliance' },
    ],
  },
  'jukebox-media': {
    slug: 'jukebox-media',
    name: 'Jukebox Media',
    client: 'Jukebox Digital Agency',
    category: 'Brand & Performance Marketing',
    year: '2025',
    heroImage: '/assets/jukebox-media-live.jpg',
    liveUrl: 'https://www.jukeboxmedia.in',
    headline: 'Full-funnel digital marketing, creator talent management & high-ROAS viral campaigns.',
    summary: 'A performance marketing showcase featuring brand campaign case studies, influencer rosters, and real-time ROAS tracking metrics.',
    challenge: 'Demonstrating measurable performance marketing ROI to consumer brands in a crowded digital agency landscape.',
    solution: 'Engineered an interactive case study gallery with dynamic metric counters, video embeds, and live client campaign results.',
    architecture: ['Next.js 15', 'Tailwind CSS', 'Framer Motion', 'Vercel Deployment'],
    metrics: [],
  },
  'rising-rechargeable': {
    slug: 'rising-rechargeable',
    name: 'Rising Rechargeable',
    client: 'Rising Rechargeable Power Systems',
    category: 'Clean Energy & Battery Systems Supply',
    year: '2025',
    heroImage: '/assets/rising-rechargeable-live.jpg',
    liveUrl: 'https://www.risingrechargeable.com',
    headline: 'Industrial rechargeable battery packs, renewable energy storage & lithium-ion solutions.',
    summary: 'An industrial B2B storefront showcasing rechargeable lithium battery packs, solar energy storage units, and custom power bank assemblies.',
    challenge: 'Presenting technical battery cell specifications and bulk industrial quoting capabilities clearly for B2B buyers.',
    solution: 'Constructed an industrial product matrix with technical data sheets, battery runtime calculators, and direct RFQ quoting.',
    architecture: ['Next.js App Router', 'Tailwind CSS', 'B2B RFQ Calculator', 'Vercel Edge'],
    metrics: [
      { label: 'Energy Solutions Catalog', value: '80+ Battery SKUs', detail: 'Across consumer, EV & industrial storage' },
      { label: 'Page Load Speed', value: '0.48s', detail: 'Sub-second technical catalog' },
    ],
  },
  'fgp-industries': {
    slug: 'fgp-industries',
    name: 'FGP Industries',
    client: 'FGP Industries Manufacturing',
    category: 'Industrial FRP Composites Manufacturing',
    year: '2024',
    heroImage: '/assets/fgp-industries-live.jpg',
    liveUrl: 'https://fgpind.com',
    headline: 'Industrial fiberglass reinforced plastics (FRP) manufacturing & chemical process equipment.',
    summary: 'An engineering and manufacturing catalog showcasing heavy-duty industrial FRP storage tanks, ducting systems, scrubbers, and composite equipment.',
    challenge: 'Communicating heavy industrial engineering certifications and custom manufacturing capabilities to corporate chemical plant managers.',
    solution: 'Designed an industrial specification explorer with 3D product diagrams, engineering standards breakdowns, and direct technical quoting.',
    architecture: ['Next.js 15', 'Tailwind CSS', 'Industrial Spec Sheets', 'Vercel Deployment'],
    metrics: [
      { label: 'Specification Download Time', value: '0.38s', detail: 'Instant engineering datasheets' },
    ],
  },
  'aangan-boutique': {
    slug: 'aangan-boutique',
    name: 'Aangan Boutique',
    client: 'Aangan Boutique Couture',
    category: 'Handcrafted Bridal Couture & Lehengas',
    year: '2024',
    heroImage: '/aangan.png',
    liveUrl: 'https://www.aanganboutique.in',
    headline: 'High-end handcrafted ethnic couture showcase with bridal appointment booking & worldwide shipping.',
    summary: 'A luxury bridal boutique platform showcasing designer bridal lehengas, hand-embroidered anarkalis, and virtual video styling appointments for international clients.',
    challenge: 'Reaching high-spending Indian diaspora brides in the USA, UK, and Canada with a trustworthy luxury digital experience.',
    solution: 'Built an editorial bridal lookbook with multi-currency conversion, video appointment booking, and WhatsApp concierge styling.',
    architecture: ['Shopify Plus', 'Next.js Frontend', 'Tailwind CSS', 'Currency Localization'],
    metrics: [],
  },
  'si-decor': {
    slug: 'si-decor',
    name: 'SI Decor & Interiors',
    client: 'SI Decor Design Studio',
    category: 'Turnkey Architectural Interior Design',
    year: '2024',
    heroImage: '/interior.png',
    liveUrl: 'https://www.sidecor.in',
    headline: 'Modern architectural interiors, turnkey residential styling & bespoke modular kitchens.',
    summary: 'A contemporary interior design portfolio showcasing high-end residential apartments, bungalows, and modular kitchen installations across Ahmedabad.',
    challenge: 'Visualizing turnkey transformations and material finishes clearly to prospective homeowners.',
    solution: 'Created an aesthetic portfolio gallery with before/after comparisons, room-by-room walkthroughs, and direct project estimates.',
    architecture: ['Next.js App Router', 'Tailwind CSS', 'Framer Motion', 'Vercel Edge'],
    metrics: [
      { label: 'Mobile Speed', value: '100 / 100', detail: 'Fast photo gallery rendering' },
    ],
  },
  'jade-travels': {
    slug: 'jade-travels',
    name: 'Jade Travels',
    client: 'Jade Travels International',
    category: 'Corporate & Luxury Global Travel',
    year: '2026',
    status: 'in-progress',
    liveUrl: 'https://www.jadetravels.co.in',
    headline: 'Corporate travel management & luxury travel itinerary platform — currently in development.',
    summary: 'A planned travel platform for Jade Travels, covering corporate booking solutions and curated international holiday itineraries. Build is in progress; case study will be updated with real results at launch.',
    challenge: 'Providing both streamlined corporate account travel tools and inspiring vacation packages for luxury leisure travelers.',
    solution: 'Building a dual-path portal catering to both corporate travel managers and individual holiday seekers with instant quoting.',
    architecture: ['Next.js 15', 'Tailwind CSS', 'Booking Form Pipeline', 'Vercel Deployment'],
    metrics: [],
  },
}

// Per-project art-direction accent — the same editorial colors
// components/pages/WorkPage.jsx uses for each project's card, so a card and
// its detail page read as one piece. Presentation styling only, not a claim
// about the client's brand palette. Surfaces carrying white text use a
// darkened mix of the accent (see `panelBg`) so small text clears WCAG AA.
const accents: Record<string, string> = {
  'sv-space-designs': '#B5652D',
  'prihaan-spices': '#9C3B2E',
  'silver-spoon': '#5B6169',
  'vibo-erp': '#0A1124',
  'chahana-dental': '#2C6E6B',
  'destination-anywhere': '#1F4E5F',
  'zingbliss-events': '#7A2E3A',
  'ares-business-league': '#1E2A3A',
  'club-mj-events': '#5A2A52',
  'naam-transfer': '#22344A',
  'nexsphere-global': '#24425C',
  'jukebox-media': '#B23A6B',
  'rising-rechargeable': '#2F6F4E',
  'fgp-industries': '#3E5064',
  'aangan-boutique': '#6E1F2C',
  'si-decor': '#9C5A34',
  'jade-travels': '#4A5468',
}

const panelBg = (accent: string) => `color-mix(in srgb, ${accent} 82%, #000)`

export async function generateStaticParams() {
  return Object.keys(caseStudiesData).map((slug) => ({ slug }))
}

const base = 'https://mehtatechnologies.com'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const study = caseStudiesData[slug]
  if (!study) return { title: 'Case Study Not Found' }

  return {
    title: `${study.name} — Case Study`,
    description: study.summary,
    alternates: { canonical: `${base}/work/${study.slug}` },
    openGraph: {
      url: `${base}/work/${study.slug}`,
      title: `${study.name} — Case Study`,
      description: study.summary,
      images: [{ url: study.heroImage || '/og.png' }],
    },
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const study = caseStudiesData[slug]
  if (!study) notFound()

  const accent = accents[study.slug] ?? '#0A1124'
  const inProgress = study.status === 'in-progress'

  // Next case study, in the same order as the data above (wraps around).
  const slugs = Object.keys(caseStudiesData)
  const next = caseStudiesData[slugs[(slugs.indexOf(study.slug) + 1) % slugs.length]]
  const nextAccent = accents[next.slug] ?? '#0A1124'

  const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2'

  return (
    <>
    <Navbar />
    <main id="main-content" tabIndex={-1} className="home-light bg-white min-h-screen">

      {/* Hero — cream, asymmetric: headline left, project facts right */}
      <section className="bg-cream pt-32 sm:pt-40 pb-12 sm:pb-16">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8">
          <Link
            href="/work"
            className={`inline-flex items-center gap-2 text-xs font-semibold text-ink/70 hover:text-ink transition-colors mb-10 rounded-sm ${focusRing}`}
          >
            <ArrowLeft size={14} aria-hidden="true" /> Back to All Case Studies
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-6">
                <span aria-hidden="true" className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: accent }} />
                <span className="text-sm font-bold text-ink tracking-tight">{study.name}</span>
                <span className="px-2.5 py-0.5 rounded-full border border-ink/15 text-[11px] font-medium text-ink/75">
                  {inProgress ? 'In development' : 'Case study'}
                </span>
              </div>
              <h1 className="font-display text-[34px] sm:text-5xl lg:text-6xl font-extrabold text-ink tracking-tight leading-[1.08] mb-6">
                {study.headline}
              </h1>
              <p className="text-base sm:text-lg text-ink-soft leading-relaxed max-w-2xl">
                {study.summary}
              </p>
            </div>

            <div className="lg:col-span-4">
              <dl className="border-t border-border mb-8">
                {[
                  ['Client', study.client],
                  ['Category', study.category],
                  ['Year', study.year],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-6 py-3 border-b border-border">
                    <dt className="text-[11px] font-mono uppercase tracking-wider text-ink/55 shrink-0">{k}</dt>
                    <dd className="text-sm font-semibold text-ink text-right">{v}</dd>
                  </div>
                ))}
              </dl>
              {study.liveUrl && !inProgress && (
                <a
                  href={study.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white font-semibold px-7 py-3.5 text-sm hover:bg-accent-dim transition-colors ${focusRing}`}
                >
                  Visit live production site <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Art-directed panel — this project's own accent, real screenshot,
          real metrics set directly onto the colour field. */}
      <section className="bg-cream pb-16 sm:pb-24">
        <div className="max-w-[1360px] mx-auto px-3 sm:px-6 md:px-8">
          <div
            className="rounded-[28px] sm:rounded-[36px] p-3 sm:p-8 lg:p-12 text-white"
            style={{ background: panelBg(accent) }}
          >
            <div
              className={`relative aspect-[4/3] sm:aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden ${
                study.heroImageFit === 'contain' ? 'bg-cream-dim p-6 sm:p-14' : ''
              }`}
              style={study.heroImage ? undefined : { backgroundColor: accent }}
            >
              {study.heroImage ? (
                <Image
                  src={study.heroImage}
                  alt={`${study.name} — live site screenshot`}
                  fill
                  loading="eager"
                  fetchPriority="high"
                  sizes="(max-width: 1360px) 100vw, 1300px"
                  className={study.heroImageFit === 'contain' ? 'object-contain object-center' : 'object-cover object-top'}
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-start justify-end gap-2 p-6 sm:p-12">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-white/80">Build in progress</div>
                  <div className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight max-w-lg leading-tight">
                    This case study will be updated with a live preview and real results once the project ships.
                  </div>
                </div>
              )}
            </div>

            {study.metrics.length > 0 && (
              <dl className={`grid grid-cols-1 ${study.metrics.length > 1 ? 'sm:grid-cols-2' : ''} ${study.metrics.length > 2 ? 'lg:grid-cols-3' : ''} gap-x-10 gap-y-8 px-3 sm:px-0 pt-8 sm:pt-12 pb-4 sm:pb-0`}>
                {study.metrics.map((m) => (
                  <div key={m.label} className="flex flex-col border-t border-white/25 pt-5">
                    <dt className="order-2 text-sm font-semibold text-white">{m.label}</dt>
                    <dd className="order-1 font-display text-4xl sm:text-5xl font-extrabold tracking-tight leading-none mb-3">{m.value}</dd>
                    <dd className="order-3 text-sm text-white/80 mt-0.5">{m.detail}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>
      </section>

      {/* Narrative — white, editorial rows */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8">
          {[
            ['01', 'The challenge', study.challenge],
            ['02', 'The engineering solution', study.solution],
          ].map(([num, title, body]) => (
            <div key={num} className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 py-10 sm:py-12 border-t border-border first:border-t-0 first:pt-0">
              <div className="lg:col-span-4 flex items-baseline gap-4">
                <span className="text-xs font-mono text-ink/55">{num}</span>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">{title}</h2>
              </div>
              <p className="lg:col-span-8 text-lg sm:text-xl text-ink/80 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stack — cream-dim */}
      <section className="bg-cream-dim py-14 sm:py-20">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          <h2 className="lg:col-span-4 font-display text-xl sm:text-2xl font-extrabold text-ink tracking-tight">
            Production architecture &amp; stack
          </h2>
          <ul className="lg:col-span-8 flex flex-wrap gap-2">
            {study.architecture.map((item) => (
              <li key={item} className="px-3.5 py-1.5 rounded-full border border-ink/20 bg-white/50 text-sm font-medium text-ink">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Client quote — only when a real one exists */}
      {study.quote && (
        <section className="bg-white py-16 sm:py-24">
          <figure className="max-w-3xl mx-auto px-5 sm:px-6 md:px-8">
            <blockquote className="font-display text-2xl sm:text-3xl font-bold text-ink leading-snug tracking-tight mb-6">
              &ldquo;{study.quote.text}&rdquo;
            </blockquote>
            <figcaption className="flex items-center gap-3">
              <span aria-hidden="true" className="w-6 h-px" style={{ backgroundColor: accent }} />
              <span className="text-sm font-bold text-ink">{study.quote.author}</span>
              <span className="text-sm text-ink-soft">{study.quote.role}</span>
            </figcaption>
          </figure>
        </section>
      )}

      {/* Next case study — white */}
      <section className="bg-white border-t border-border">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8 py-12 sm:py-16">
          <Link
            href={`/work/${next.slug}`}
            className={`group grid grid-cols-[auto_1fr_auto] items-center gap-5 sm:gap-8 rounded-2xl ${focusRing}`}
          >
            <span
              className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0"
              style={{ backgroundColor: nextAccent }}
            >
              {next.heroImage && (
                <Image
                  src={next.heroImage}
                  alt=""
                  fill
                  sizes="112px"
                  className={`${next.heroImageFit === 'contain' ? 'object-contain p-2' : 'object-cover object-top'} group-hover:scale-105 transition-transform duration-500`}
                />
              )}
            </span>
            <span className="min-w-0">
              <span className="block text-[11px] font-mono uppercase tracking-wider text-ink/55 mb-1.5">Next case study</span>
              <span className="block font-display text-2xl sm:text-4xl font-extrabold text-ink tracking-tight leading-tight truncate">
                {next.name}
              </span>
              <span className="block text-sm text-ink-soft mt-1 truncate">{next.category}</span>
            </span>
            <span
              aria-hidden="true"
              className="w-11 h-11 sm:w-14 sm:h-14 rounded-full border border-ink/20 text-ink flex items-center justify-center group-hover:bg-ink group-hover:text-white group-hover:border-ink transition-colors"
            >
              <ArrowRight size={18} />
            </span>
          </Link>
        </div>
      </section>

      {/* Closing — ink band */}
      <section className="bg-ink text-white">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8 py-16 sm:py-24 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.08] mb-4">
              Ready for similar measurable outcomes?
            </h2>
            <p className="text-base sm:text-lg text-white/75">
              Let us engineer a high-performance system for your roadmap.
            </p>
          </div>
          <Link
            href="/contact"
            className="self-start lg:self-auto inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white font-semibold px-7 py-3.5 text-sm hover:bg-accent-dim transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            Start your project <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
    </>
  )
}
