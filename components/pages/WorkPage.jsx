'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ExternalLink, ArrowUpRight, Sparkles, Filter } from 'lucide-react'

const categories = ['All', 'Web App', 'E-Commerce', 'SaaS & Cloud', 'Healthcare & Services']

const projects = [
  {
    name: 'Vibo ERP Suite',
    slug: 'vibo-erp',
    category: 'SaaS & Cloud',
    subtitle: 'Enterprise Cloud ERP Platform',
    desc: 'Proprietary cloud ERP system with inventory, GST e-invoicing, CRM pipeline, and biometric HRMS sync for 2,400+ active enterprise users.',
    tags: ['Next.js', 'PostgreSQL', 'Multi-Tenant', 'Redis'],
    image: '/assets/saas_hero_visual.jpg',
    url: null,
    year: '2024',
    result: '3M+ Daily Queries',
  },
  {
    name: 'Silver Spoon by ACJ',
    slug: 'silver-spoon',
    category: 'E-Commerce',
    subtitle: 'Luxury Silver Artifacts & Gifting',
    desc: 'Bespoke high-converting Shopify storefront with custom 3D configurator and express checkout. +280% online luxury sales in Q1.',
    tags: ['Shopify', 'Liquid', 'Custom UX', 'Stripe'],
    image: '/silverspoon-screenshot.png',
    url: 'https://silverspoonbyacj.com',
    year: '2024',
    result: '+280% Sales Growth',
  },
  {
    name: 'Stylux Interiors',
    category: 'Web App',
    subtitle: 'Luxury Interior Design Studio',
    desc: 'Turnkey architectural portfolio engineered with 60fps micro-interactions, responsive 3D floor plan viewers, and fast lead capture.',
    tags: ['Next.js', 'Tailwind', 'GSAP', 'Framer Motion'],
    image: '/interior.png',
    url: 'https://interior-web-mu.vercel.app/',
    year: '2024',
    result: '90-Day Turnkey Delivery',
  },
  {
    name: 'JJ Films Cinematic Studio',
    category: 'Web App',
    subtitle: 'Cinematic Visual Media & Production',
    desc: 'Ultra-fast 4K streaming media showcase with adaptive bitrate rendering and instant booking consultation flows.',
    tags: ['Next.js', 'Video Streaming', 'Modern UI'],
    image: '/jjfilms.png',
    url: 'https://jjfilms.vercel.app/',
    year: '2024',
    result: '4K Ultra-Fast Streaming',
  },
  {
    name: 'ZingBliss Events',
    category: 'Web App',
    subtitle: 'Luxury Wedding & Event Production',
    desc: 'High-converting luxury event design portal built to convert high-net-worth inquiries into confirmed destination contracts.',
    tags: ['Next.js', 'Luxury UX', 'Lead Gen'],
    image: '/zingbliss.png',
    url: 'https://www.zingblissevents.com/',
    year: '2024',
    result: '3.8x Inquiry Rate',
  },
  {
    name: 'Gourmettazone by Kavita',
    category: 'E-Commerce',
    subtitle: 'Artisan Bakery & Confectionery',
    desc: 'Custom bakery ordering portal with local delivery radius routing, slot booking, and instant UPI checkout.',
    tags: ['Shopify', 'Razorpay', 'Mobile First'],
    image: '/sweet.png',
    url: 'https://sweet-web-delta.vercel.app/',
    year: '2024',
    result: 'Instant Mobile Orders',
  },
  {
    name: 'LuxeLiving Residences',
    category: 'Web App',
    subtitle: 'Curated Luxury Residences & Stays',
    desc: 'High-end hospitality booking engine with dynamic pricing calendar, instant WhatsApp concierge, and 4.4x verified ROAS.',
    tags: ['Next.js', 'Hospitality', 'Booking Engine'],
    image: '/luxeliving.png',
    url: 'https://luxeliving-web.vercel.app/',
    year: '2024',
    result: '4.4x Campaign ROAS',
  },
  {
    name: 'NexSphere Financial',
    category: 'Web App',
    subtitle: 'Corporate Advisory & FinTech',
    desc: 'Global financial compliance and business advisory hub with automated tax calculators and lead qualification bots.',
    tags: ['Next.js', 'FinTech', 'Lead Engine'],
    image: '/nextsphere.png',
    url: 'https://nextsphere-web.vercel.app/',
    year: '2024',
    result: 'Global Inbound Engine',
  },
  {
    name: 'College Capsule',
    category: 'SaaS & Cloud',
    subtitle: 'Digital Memory Vault SaaS',
    desc: 'Private high-fidelity digital memory vault with encrypted cloud media uploads, social memory timelines, and alumni networks.',
    tags: ['React', 'Cloud Storage', 'SaaS Vault'],
    image: '/testimonial.png',
    url: 'https://testimonial-web-eight.vercel.app/',
    year: '2024',
    result: '50K+ Uploaded Media',
  },
  {
    name: 'Chahana Dental Clinic',
    slug: 'chahana-dental',
    category: 'Healthcare & Services',
    subtitle: 'Super-Speciality Dental Practice',
    desc: 'Clinical patient portal with online appointment booking that ranked #1 on Google for 12 local dental queries within 90 days.',
    tags: ['Next.js', 'Healthcare', 'Technical SEO'],
    image: '/chahana.png',
    url: 'https://chahanadentalstudio.com/',
    year: '2024',
    result: '#1 Local Google Rank',
  },
  {
    name: 'Aangan Boutique',
    category: 'E-Commerce',
    subtitle: 'Handcrafted Bridal Couture',
    desc: 'High-end ethnic couture showcase with custom bridal appointment booking and worldwide shipping currency switcher.',
    tags: ['Shopify', 'Bridal Couture', 'Global Ship'],
    image: '/aangan.png',
    url: 'https://www.aanganboutique.in/',
    year: '2024',
    result: 'Global Bridal Reach',
  },
  {
    name: 'EyeCare Hospital & Research',
    category: 'Healthcare & Services',
    subtitle: 'Ophthalmology & Surgical Center',
    desc: 'Clinical hospital portal featuring doctor appointment scheduling, surgeon profiles, and 99.9% surgical trust metrics.',
    tags: ['Next.js', 'Healthcare UX', 'Accessibility'],
    image: '/eyehospital.png',
    url: 'https://eye-hospital-web.vercel.app/',
    year: '2024',
    result: '2x Patient Inquiries',
  },
]

function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="group rounded-3xl bg-white/[0.02] border border-white/[0.08] hover:border-blue-500/30 overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xl shadow-black/40"
    >
      <div>
        {/* Visual Cover */}
        <div className="relative aspect-[16/10] bg-[#07080C] overflow-hidden">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover object-top group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-bold text-2xl text-blue-400/40 bg-blue-600/10">
              {project.name.slice(0, 2).toUpperCase()}
            </div>
          )}

          {/* Category Pill */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-black/60 backdrop-blur-md text-blue-400 border border-white/10">
              {project.category}
            </span>
          </div>

          {/* Metric badge */}
          {project.result && (
            <div className="absolute bottom-4 right-4">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-blue-600/90 text-white shadow-lg shadow-blue-900/40">
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
            <span className="text-xs font-mono text-white/40">{project.year}</span>
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
        {project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 rounded-full text-xs font-semibold bg-white/[0.04] hover:bg-white text-white hover:text-black border border-white/10 transition-all flex items-center justify-center gap-1.5"
          >
            Visit Live Project <ArrowUpRight size={13} />
          </a>
        ) : !project.slug ? (
          <Link
            href="/contact"
            className="w-full py-2.5 rounded-full text-xs font-semibold bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/30 transition-all flex items-center justify-center gap-1.5"
          >
            Request Proprietary Demo <ArrowRight size={13} />
          </Link>
        ) : null}
      </div>
    </motion.div>
  )
}

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory)

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
            <span className="text-gradient-accent">measurable outcomes.</span>
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
                : projects.filter((p) => p.category === cat).length
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
