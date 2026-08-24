'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react'
import BrowserMockup from '@/components/ui/BrowserMockup'
import ViboERPDashboard from '@/components/ui/ViboERPDashboard'
import ProjectModal from '@/components/ui/ProjectModal'

const SS = (src, alt) => function ScreenshotMockup() {
  return (
    <div className="relative w-full h-[240px] sm:h-[300px] overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
      />
    </div>
  )
}

export const projects = [
  {
    id: '01',
    name: 'ViboERP',
    category: 'SaaS Platform',
    categoryFilter: 'SaaS',
    tags: ['Next.js', 'PostgreSQL', 'Multi-Tenant', 'Analytics'],
    result: '2,400+ active users',
    year: '2024',
    type: 'Product',
    accent: '#3B82F6',
    mockupType: 'browser',
    mockupUrl: 'app.viboerp.com',
    MockupContent: () => (
      <div className="p-4 sm:p-5">
        <ViboERPDashboard />
      </div>
    ),
    link: null,
    desc: 'A full-scale ERP SaaS — automated billing, CRM, inventory, HR & finance in one unified dashboard.',
  },
  {
    id: '02',
    name: 'Silver Spoon by ACJ',
    category: 'Luxury E-Commerce',
    categoryFilter: 'E-Commerce',
    tags: ['Shopify Plus', 'UI/UX Design', 'Luxury Gifting'],
    result: '+280% online sales in 3 mos',
    year: '2024',
    type: 'E-Commerce',
    accent: '#60A5FA',
    mockupType: 'browser',
    mockupUrl: 'silverspoonbyacj.com',
    MockupContent: SS('/silverspoon-screenshot.png', 'Silver Spoon by ACJ'),
    link: 'https://silverspoonbyacj.com',
    desc: 'Premium silver gifting brand — bespoke Shopify storefront reflecting timeless elegance and craftsmanship.',
  },
  {
    id: '03',
    name: 'Stylux Interiors',
    category: 'Interior Design',
    categoryFilter: 'Web',
    tags: ['Next.js', 'GSAP Animation', 'Turnkey UI'],
    result: 'Turnkey delivery in 90 days',
    year: '2024',
    type: 'Web Platform',
    accent: '#3B82F6',
    mockupType: 'browser',
    mockupUrl: 'styluxinteriors.com',
    MockupContent: SS('/interior.png', 'Stylux Interiors'),
    link: 'https://interior-web-mu.vercel.app/',
    desc: 'Turnkey interior design studio delivering residential and commercial architectural spaces.',
  },
  {
    id: '04',
    name: 'JJ Films',
    category: 'Wedding Films & Media',
    categoryFilter: 'Media',
    tags: ['Next.js', 'Cinematic UI', 'Video CDN'],
    result: 'High-ticket lead generation',
    year: '2024',
    type: 'Web Platform',
    accent: '#8B5CF6',
    mockupType: 'browser',
    mockupUrl: 'jjfilms.in',
    MockupContent: SS('/jjfilms.png', 'JJ Films'),
    link: 'https://jjfilms.vercel.app/',
    desc: 'Cinematic portfolio for a luxury wedding films and real estate cinematography studio.',
  },
  {
    id: '05',
    name: 'ZingBliss Events',
    category: 'Luxury Event Management',
    categoryFilter: 'Web',
    tags: ['Next.js', 'Framer Motion', 'Luxury UI'],
    result: 'Top-tier conversion rate',
    year: '2024',
    type: 'Web Platform',
    accent: '#EC4899',
    mockupType: 'browser',
    mockupUrl: 'zingblissevents.com',
    MockupContent: SS('/zingbliss.png', 'ZingBliss Events'),
    link: 'https://www.zingblissevents.com/',
    desc: 'Luxury event planning studio crafting extraordinary wedding moments and celebrity ceremonies.',
  },
  {
    id: '06',
    name: 'EyeCare Hospital',
    category: 'Healthcare & Clinical',
    categoryFilter: 'Web',
    tags: ['Next.js', 'Healthcare UX', 'Technical SEO'],
    result: '99.9% clinical trust rate',
    year: '2024',
    type: 'Healthcare',
    accent: '#10B981',
    mockupType: 'browser',
    mockupUrl: 'eyecarehospital.com',
    MockupContent: SS('/eyehospital.png', 'EyeCare Hospital'),
    link: 'https://eye-hospital-web.vercel.app/',
    desc: 'Digital clinical presence for a world-class eye hospital — surgical trust engineered into every pixel.',
  },
  {
    id: '07',
    name: 'Destination Anywhere',
    category: 'Luxury Travel & Itinerary',
    categoryFilter: 'Web',
    tags: ['Next.js', 'Custom Booking Flow', 'Travel'],
    result: 'Global booking planner',
    year: '2024',
    type: 'Web Platform',
    accent: '#F59E0B',
    mockupType: 'browser',
    mockupUrl: 'destinationanywhere.co.in',
    MockupContent: SS('/destination.png', 'Destination Anywhere'),
    link: 'https://www.destinationanywhere.co.in/',
    desc: 'Bespoke luxury travel planning platform with curated packages and personalized journey builder.',
  },
  {
    id: '08',
    name: 'Aangan Boutique',
    category: 'Ethnic & Bridal Fashion',
    categoryFilter: 'E-Commerce',
    tags: ['Shopify Plus', 'Fashion UX', 'Conversion'],
    result: '3x mobile conversion',
    year: '2024',
    type: 'E-Commerce',
    accent: '#EF4444',
    mockupType: 'browser',
    mockupUrl: 'aanganboutique.in',
    MockupContent: SS('/aangan.png', 'Aangan Boutique'),
    link: 'https://www.aanganboutique.in/',
    desc: 'Curated ethnic, indo-western and bridal wear boutique storefront engineered for mobile shoppers.',
  },
]

const categories = ['All', 'SaaS', 'E-Commerce', 'Web', 'Media']

export default function Work() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeProject, setActiveProject] = useState(null)

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.categoryFilter === activeCategory)

  return (
    <section id="work" className="py-24 md:py-32 bg-[#07080C] relative">
      <div className="max-w-[1360px] mx-auto px-6 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div>
            <span className="glow-pill mb-4 inline-flex">
              Featured Case Studies
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Work that creates{' '}
              <span className="text-gradient-accent">measurable impact.</span>
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-white text-black shadow-md shadow-white/10'
                      : 'bg-white/[0.04] text-white/60 hover:text-white hover:bg-white/[0.08] border border-white/[0.07]'
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </div>

        {/* 2-Column Bento Project Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const { MockupContent } = project
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  className="group rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.18] overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xl shadow-black/40"
                >
                  {/* Browser Mockup Area */}
                  <div className="p-4 sm:p-6 bg-gradient-to-b from-white/[0.03] to-transparent border-b border-white/[0.06]">
                    <div className="rounded-xl border border-white/10 overflow-hidden bg-[#0B0D14] shadow-2xl">
                      {/* Browser header */}
                      <div className="flex items-center justify-between px-3.5 py-2 bg-black/40 border-b border-white/[0.06] text-[11px] text-white/40">
                        <div className="flex gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-red-500/60" />
                          <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
                          <span className="w-2 h-2 rounded-full bg-green-500/60" />
                        </div>
                        <span className="font-mono text-white/50">{project.mockupUrl}</span>
                        <div className="w-8" />
                      </div>
                      
                      {/* Content view */}
                      <div className="relative overflow-hidden bg-[#07080C]">
                        <MockupContent />
                      </div>
                    </div>
                  </div>

                  {/* Project Details Footer */}
                  <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center justify-between gap-4 mb-3">
                        <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                          {project.category}
                        </span>
                        <span className="text-xs font-mono text-white/35">
                          {project.year}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-white tracking-tight mb-2 group-hover:text-blue-400 transition-colors">
                        {project.name}
                      </h3>

                      <p className="text-sm text-white/55 leading-relaxed mb-6 font-normal">
                        {project.desc}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-white/[0.04] text-white/60 border border-white/[0.06]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-5 border-t border-white/[0.06] flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                        <CheckCircle2 size={13} />
                        <span>{project.result}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-white/70 hover:text-white transition-colors"
                          >
                            Visit Site <ArrowUpRight size={12} />
                          </a>
                        )}
                        <button
                          onClick={() => setActiveProject(project)}
                          className="px-4 py-1.5 rounded-full text-xs font-semibold bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/10 transition-all active:scale-[0.98]"
                        >
                          Case Study
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* View All Projects Strip */}
        <div className="mt-14 text-center">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 transition-all"
          >
            View All 150+ Shipped Projects <ArrowUpRight size={13} />
          </Link>
        </div>

      </div>

      {/* Project Case Study Modal */}
      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </section>
  )
}
