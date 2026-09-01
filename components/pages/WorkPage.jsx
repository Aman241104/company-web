'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ExternalLink, ArrowUpRight, Sparkles, Filter } from 'lucide-react'
import SpotlightCard from '@/components/ui/SpotlightCard'
import ShinyText from '@/components/ui/ShinyText'

const categories = ['All', 'Web', 'E-Commerce', 'SaaS', 'Media']

const projects = [
  {
    name: 'SV Space Designs',
    slug: 'sv-space-designs',
    category: 'Web',
    subtitle: 'Architecture & Turnkey Interior Studio',
    desc: 'Interior design and turnkey execution studio in Ahmedabad delivering residential penthouses, bungalows, cafes, and commercial spaces with vendor-direct pricing.',
    tags: ['Next.js 15', 'Turnkey Studio', 'Custom Grain UI', 'Ahmedabad'],
    image: '/assets/sv-space-designs-live.jpg',
    url: 'https://www.svspacedesigns.in',
    year: '2025',
    result: '100/100 Mobile Speed',
  },
  {
    name: 'Prihaan Spices & Agro',
    slug: 'prihaan-spices',
    category: 'E-Commerce',
    subtitle: 'Organic Spices & Dry Fruits Storefront',
    desc: 'Authentic Indian spices, masalas and dry fruits e-commerce storefront featuring 252+ live SKUs, Supabase media CDN, and streamlined WhatsApp checkout pipeline.',
    tags: ['Next.js 15', 'Supabase CDN', '252+ SKUs', 'WhatsApp Checkout'],
    image: '/assets/prihaan-spices-live.jpg',
    url: 'https://www.prihaanspices.in',
    year: '2025',
    result: '252+ SKU E-Commerce Catalog',
  },
  {
    name: 'The Silver Spoon / Argentum',
    slug: 'silver-spoon',
    category: 'E-Commerce',
    subtitle: 'Luxury Silver Artifacts & Gifting',
    desc: 'Bespoke high-converting storefront with custom 3D configurator and live silver bullion rate ticker.',
    tags: ['Shopify Plus', 'Next.js SSR', 'Custom 3D Configurator', 'Stripe'],
    image: '/silverspoon-screenshot.png',
    url: 'https://www.silverspoonbyacj.com',
    year: '2024',
    result: 'Headless Next.js Storefront',
  },
  {
    name: 'Vibo ERP',
    slug: 'vibo-erp',
    category: 'Our Own Product',
    categoryFilter: 'SaaS',
    subtitle: 'In-House Business Management Software',
    desc: 'Our own product — sales, inventory, billing and customers, built and refined through everyday use in our own operations.',
    tags: ['Next.js 15', 'Sales', 'Inventory', 'Billing'],
    image: '/assets/saas_hero_mockup.png',
    imageFit: 'contain',
    url: 'https://app.viboerp.com/',
    year: '2024',
    result: 'Built & Used In-House',
  },
  {
    name: 'Chahana Dental Studio',
    slug: 'chahana-dental',
    category: 'Web',
    subtitle: 'Healthcare Clinical Appointment Engine',
    desc: 'Digital patient appointment portal, smile makeover simulator, and multi-specialty clinical workflow engine.',
    tags: ['Next.js', 'Clinical Telehealth', 'Appointment Engine', 'SEO'],
    image: '/chahana.png',
    url: 'https://chahanadentalstudio.com',
    year: '2024',
    result: 'Technical SEO & Booking Flow',
  },
  {
    name: 'Destination Anywhere',
    slug: 'destination-anywhere',
    category: 'Web',
    subtitle: 'Curated Luxury Worldwide Travel',
    desc: 'Bespoke luxury travel planning platform with curated worldwide packages and personalized journey builder.',
    tags: ['Next.js', 'Itinerary Engine', 'Bespoke Travel', 'Razorpay'],
    image: '/destination.png',
    url: 'https://www.destinationanywhere.co.in/',
    year: '2024',
    result: '40+ Countries Covered',
  },
  {
    name: 'ZingBliss Events',
    slug: 'zingbliss-events',
    category: 'Web',
    subtitle: 'Luxury Wedding & Event Production',
    desc: 'High-converting luxury event design portal built to convert high-net-worth inquiries into confirmed destination contracts.',
    tags: ['Next.js', 'Luxury UX', 'Destination Weddings', 'Lead Gen'],
    image: '/zingbliss.png',
    url: 'https://www.zingblissevents.com',
    year: '2024',
    result: 'Luxury Event Portfolio Site',
  },
  {
    name: 'Ares Business League',
    slug: 'ares-business-league',
    category: 'Web',
    subtitle: 'Executive Business Networking Platform',
    desc: 'Premier business networking league, member directory, referral tracking, and executive chapter leadership portal.',
    tags: ['Next.js', 'Member Directory', 'Referral Tracking', 'Executive CRM'],
    image: '/assets/ares-business-league-live.jpg',
    url: 'https://www.aresbusinessleague.com',
    year: '2025',
    result: 'Executive Member Directory',
  },
  {
    name: 'CMJ Events',
    slug: 'club-mj-events',
    category: 'Web',
    subtitle: 'Luxury Wedding & Event Planning',
    desc: 'Award-winning in-house design and production studio behind 250+ weddings, corporate productions, and private celebrations across India and worldwide.',
    tags: ['Next.js', 'Gallery Performance', 'Lead Funnel', 'Ahmedabad'],
    image: '/assets/club-mj-events-live.jpg',
    url: 'https://www.clubmjevents.com',
    year: '2025',
    result: '250+ Events Delivered',
  },
  {
    name: 'Naam Transfer',
    slug: 'naam-transfer',
    category: 'Web',
    subtitle: 'Property Title & Legal Deed Automation',
    desc: 'Online property title deed transfer, municipal registry documentation, and legal name change workflow portal.',
    tags: ['Next.js', 'Gov Registry', 'Automated Intake', 'Document Engine'],
    image: '/assets/naam-transfer-live.jpg',
    url: 'https://www.naamtransfer.com',
    year: '2025',
    result: '100% Automated Intake',
  },
  {
    name: 'NexSphere Global',
    slug: 'nexsphere-global',
    category: 'SaaS',
    subtitle: 'Corporate Advisory & Cross-Border FinTech',
    desc: 'Global financial compliance and business advisory hub with automated tax calculators and lead qualification engines.',
    tags: ['Next.js', 'Global Compliance', 'Tax Calculators', 'Lead Engine'],
    image: '/nextsphere.png',
    url: 'https://www.thenexsphereglobal.com',
    year: '2024',
    result: 'Global Corporate Hub',
  },
  {
    name: 'Jukebox Media',
    slug: 'jukebox-media',
    category: 'Media',
    subtitle: 'Brand Growth & Performance Marketing',
    desc: 'Full-funnel digital marketing, creator talent management, and viral campaign engine for modern consumer brands.',
    tags: ['Next.js', 'Creator CRM', 'Performance Marketing', 'ROAS Tracker'],
    image: '/assets/jukebox-media-live.jpg',
    url: 'https://www.jukeboxmedia.in',
    year: '2025',
    result: 'Marketing & Creator Showcase',
  },
  {
    name: 'Rising Rechargeable',
    slug: 'rising-rechargeable',
    category: 'E-Commerce',
    subtitle: 'Clean Energy & Battery Systems Supply',
    desc: 'Industrial rechargeable battery packs, renewable energy storage systems, and lithium-ion power solutions storefront.',
    tags: ['Next.js', 'Lithium Storage', 'B2B Catalog', 'Clean Energy'],
    image: '/assets/rising-rechargeable-live.jpg',
    url: 'https://www.risingrechargeable.com',
    year: '2025',
    result: 'Clean Energy Supply',
  },
  {
    name: 'FGP Industries',
    slug: 'fgp-industries',
    category: 'Web',
    subtitle: 'Industrial FRP Composites Manufacturing',
    desc: 'Industrial fiberglass reinforced plastics (FRP) manufacturing, chemical process equipment, and custom composite storage tanks.',
    tags: ['Next.js', 'FRP Composites', 'Industrial Tanks', 'Chemical Engineering'],
    image: '/assets/fgp-industries-live.jpg',
    url: 'https://fgpind.com',
    year: '2024',
    result: 'Heavy Industrial Specs',
  },
  {
    name: 'Aangan Boutique',
    slug: 'aangan-boutique',
    category: 'E-Commerce',
    subtitle: 'Handcrafted Bridal Couture & Lehengas',
    desc: 'High-end ethnic couture showcase with custom bridal appointment booking and worldwide shipping currency switcher.',
    tags: ['Shopify Plus', 'Bridal Couture', 'Global Shipping', 'Next.js'],
    image: '/aangan.png',
    url: 'https://www.aanganboutique.in',
    year: '2024',
    result: 'Global Bridal Reach',
  },
  {
    name: 'SI Decor & Interiors',
    slug: 'si-decor',
    category: 'Web',
    subtitle: 'Turnkey Architectural Interior Design',
    desc: 'Turnkey architectural interior design studio delivering modern residential homes, luxury villas, and modular kitchens.',
    tags: ['Next.js', 'Turnkey Interiors', 'Modular Kitchens', 'Ahmedabad'],
    image: '/interior.png',
    url: 'https://www.sidecor.in',
    year: '2024',
    result: 'Turnkey Interior Portfolio',
  },
  {
    name: 'Jade Travels',
    slug: 'jade-travels',
    category: 'Web',
    subtitle: 'Corporate & Luxury Global Travel',
    desc: 'Corporate travel management and international holiday planner offering customized luxury tours, flight bookings, and visa services.',
    tags: ['Next.js', 'Corporate Travel', 'International Tours', 'Visa Booking'],
    image: null,
    url: 'https://www.jadetravels.co.in',
    year: '2026',
    result: 'In Development',
    inProgress: true,
  },
]



function ProjectCard({ project, index }) {
  return (
    <SpotlightCard
      enableTilt={false}
      spotlightColor="rgba(59, 130, 246, 0.15)"
      borderColor="rgba(59, 130, 246, 0.3)"
      className="group rounded-3xl bg-white/[0.02] border border-white/[0.08] hover:border-blue-500/30 overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xl shadow-black/40"
    >
      <div>
        {/* Visual Cover */}
        <div className={`relative aspect-[16/10] bg-[#07080C] overflow-hidden ${project.imageFit === 'contain' ? 'p-6' : ''}`}>
          {project.image ? (
            <Image
              src={project.image}
              alt={project.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={project.imageFit === 'contain'
                ? 'object-contain object-center group-hover:scale-[1.03] transition-transform duration-500'
                : 'object-cover object-top group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100'}
            />
          ) : project.inProgress ? (
            <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 bg-blue-600/10 text-center px-4">
              <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400/70">Build In Progress</span>
              <span className="text-xs text-white/40">Preview coming at launch</span>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center font-bold text-2xl text-blue-400/40 bg-blue-600/10">
              {project.name.slice(0, 2).toUpperCase()}
            </div>
          )}

          {/* Category Pill */}
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
            <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-semibold bg-black/70 backdrop-blur-md text-blue-400 border border-white/10">
              {project.category}
            </span>
          </div>

          {/* Metric badge */}
          {project.result && (
            <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 max-w-[70%] text-right">
              <span className="inline-block px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-bold bg-blue-600/90 text-white shadow-lg shadow-blue-900/40 truncate">
                {project.result}
              </span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-7">
          <div className="flex items-center justify-between gap-2 mb-2">
            <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">
              {project.name}
            </h3>
            <span className="text-xs font-mono text-white/55">{project.year}</span>
          </div>

          <p className="text-xs text-blue-400 font-medium mb-3">
            {project.subtitle}
          </p>

          <p className="text-xs sm:text-sm text-white/55 leading-relaxed font-normal mb-6">
            {project.desc}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.06]">
            {project.tags.map((t) => (
              <span
                key={t}
                className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-white/[0.04] text-white/60 border border-white/[0.06]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="p-6 sm:p-7 pt-0 space-y-2">
        {project.slug && (
          <Link
            href={`/work/${project.slug}`}
            className="w-full py-2.5 rounded-full text-xs font-semibold bg-blue-600/10 hover:bg-blue-600/20 text-blue-300 border border-blue-500/20 transition-all flex items-center justify-center gap-1.5"
          >
            Read Case Study Deep-Dive <ArrowRight size={12} />
          </Link>
        )}
        {project.inProgress ? (
          <div className="w-full py-2.5 rounded-full text-xs font-medium text-blue-400/70 border border-blue-500/20 text-center">
            Build In Progress
          </div>
        ) : project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 rounded-full text-xs font-semibold bg-white/[0.04] hover:bg-white text-white hover:text-black border border-white/10 transition-all flex items-center justify-center gap-1.5"
          >
            Visit Live Project <ArrowUpRight size={13} />
          </a>
        ) : (
          <div className="w-full py-2.5 rounded-full text-xs font-medium text-white/55 border border-white/[0.06] text-center">
            Enterprise Client IP Protected
          </div>
        )}
      </div>
    </SpotlightCard>
  )
}

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => (p.categoryFilter || p.category) === activeCategory)

  return (
    <div className="pt-32 pb-24 overflow-hidden">
      {/* Page Header */}
      <section className="max-w-[1360px] mx-auto px-6 md:px-8 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <span className="glow-pill mb-4 inline-flex">
            Portfolio & Case Studies
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-6">
            Engineering that drives{' '}
            <ShinyText>measurable outcomes.</ShinyText>
          </h1>
          <p className="text-base sm:text-lg text-white/50 leading-relaxed">
            150+ shipped production applications, luxury e-commerce storefronts, and cloud SaaS platforms.
          </p>
        </motion.div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-[1360px] mx-auto px-6 md:px-8 mb-12">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat
            const count =
              cat === 'All'
                ? projects.length
                : projects.filter((p) => (p.categoryFilter || p.category) === cat).length
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'bg-white/[0.04] text-white/60 hover:text-white hover:bg-white/[0.08] border border-white/10'
                }`}
              >
                <span>{cat}</span>
                <span className="text-[10px] opacity-60 font-mono">({count})</span>
              </button>
            )
          })}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-[1360px] mx-auto px-6 md:px-8 mb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProjectCard key={p.name} project={p} index={i} />
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-[1360px] mx-auto px-6 md:px-8 text-center">
        <div className="max-w-2xl mx-auto rounded-3xl bg-white/[0.02] border border-white/[0.08] p-10 sm:p-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Have a project in mind?
          </h2>
          <p className="text-sm sm:text-base text-white/50 mb-8 max-w-md mx-auto">
            Let us engineer a custom high-performance solution tailored to your roadmap.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs sm:text-sm font-semibold bg-white text-black hover:bg-white/90 shadow-xl shadow-white/10 transition-all"
          >
            Start a Conversation <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  )
}
