'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react'
import BrowserMockup from '@/components/ui/BrowserMockup'
import ProjectModal from '@/components/ui/ProjectModal'
import SpotlightCard from '@/components/ui/SpotlightCard'
import ShinyText from '@/components/ui/ShinyText'

const SS = (src, alt) => function ScreenshotMockup() {
  return (
    <div className="relative w-full h-[220px] sm:h-[280px] overflow-hidden bg-black">
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
    name: 'Vibo ERP Platform',
    category: 'Enterprise SaaS',
    categoryFilter: 'SaaS',
    tags: ['Next.js 15', 'PostgreSQL RLS', 'Multi-Tenant', 'Real-time Telemetry'],
    result: '2,400+ active enterprises',
    year: '2024',
    type: 'Product',
    accent: '#3B82F6',
    mockupType: 'browser',
    mockupUrl: 'app.viboerp.com',
    MockupContent: SS('/assets/vibo_erp_mockup.jpg', 'Vibo ERP Platform'),
    link: null,
    desc: 'Multi-tenant cloud ERP SaaS suite — automated billing, CRM pipeline, inventory matrix, and AI copilots.',
  },
  {
    id: '02',
    name: 'Argentum / Silver Spoon',
    category: 'Luxury E-Commerce',
    categoryFilter: 'E-Commerce',
    tags: ['Shopify Plus', 'Next.js SSR', 'Headless UI', 'Sub-second Checkout'],
    result: '+280% online sales lift',
    year: '2024',
    type: 'E-Commerce',
    accent: '#60A5FA',
    mockupType: 'browser',
    mockupUrl: 'silverspoonbyacj.com',
    MockupContent: SS('/assets/silver_spoon_mockup.jpg', 'Silver Spoon Luxury E-Commerce'),
    link: 'https://silverspoonbyacj.com',
    desc: 'Ultra-luxury bespoke silver gifting and fine silverware storefront engineered for frictionless checkout and high ROAS.',
  },
  {
    id: '03',
    name: 'Autonomous AI Orchestrator',
    category: 'AI Agents & Telemetry',
    categoryFilter: 'SaaS',
    tags: ['LangGraph', 'Vector RAG', 'OpenAI & Claude-3', 'Live Traces'],
    result: '4,110 tokens/sec throughput',
    year: '2024',
    type: 'Product',
    accent: '#8B5CF6',
    mockupType: 'browser',
    mockupUrl: 'agents.mehtatechnologies.com',
    MockupContent: SS('/assets/ai_agent_mockup.jpg', 'Autonomous AI Workflow Orchestrator'),
    link: null,
    desc: 'Neural workflow builder and multi-agent execution orchestrator with real-time token telemetry and self-healing pipelines.',
  },
  {
    id: '04',
    name: 'Nexus High-Frequency Fintech',
    category: 'Fintech & Algorithmic Trading',
    categoryFilter: 'SaaS',
    tags: ['WebSocket Streams', 'Order Book', 'Bank-Grade AES-256', '2.17ms Execution'],
    result: '$1.96B liquidity routed',
    year: '2024',
    type: 'Product',
    accent: '#10B981',
    mockupType: 'browser',
    mockupUrl: 'terminal.nexusfintech.io',
    MockupContent: SS('/assets/fintech_mockup.jpg', 'Nexus Fintech Platform'),
    link: null,
    desc: 'Institutional-grade algorithmic treasury, instant multi-currency routing, and sub-millisecond execution engine.',
  },
  {
    id: '05',
    name: 'Studio Aeterna Architecture',
    category: 'Luxury Architecture & Interiors',
    categoryFilter: 'Web',
    tags: ['Next.js 15', 'Framer Motion', 'Editorial Web Design', 'Turnkey UI'],
    result: 'Turnkey delivery in 60 days',
    year: '2024',
    type: 'Web Platform',
    accent: '#3B82F6',
    mockupType: 'browser',
    mockupUrl: 'studioaeterna.com',
    MockupContent: SS('/assets/stylux_mockup.jpg', 'Studio Aeterna Architecture'),
    link: 'https://interior-web-mu.vercel.app/',
    desc: 'Brutalist minimalist digital presence for an international luxury architectural studio and turnkey interior practice.',
  },
  {
    id: '06',
    name: 'JJ Films & Cinematography',
    category: 'Wedding Films & Media',
    categoryFilter: 'Media',
    tags: ['Next.js', 'Cinematic UI', '4K Video Streaming CDN'],
    result: 'High-ticket lead generation',
    year: '2024',
    type: 'Web Platform',
    accent: '#8B5CF6',
    mockupType: 'browser',
    mockupUrl: 'jjfilms.in',
    MockupContent: SS('/jjfilms.png', 'JJ Films'),
    link: 'https://jjfilms.vercel.app/',
    desc: 'Cinematic portfolio and high-ticket lead funnel for a premier luxury wedding cinematography studio.',
  },
  {
    id: '07',
    name: 'EyeCare Clinical Hospital',
    category: 'Healthcare & Surgical Trust',
    categoryFilter: 'Web',
    tags: ['Next.js', 'Healthcare UX', 'Technical SEO', 'Appointment Flow'],
    result: '99.9% clinical trust rate',
    year: '2024',
    type: 'Healthcare',
    accent: '#10B981',
    mockupType: 'browser',
    mockupUrl: 'eyecarehospital.com',
    MockupContent: SS('/eyehospital.png', 'EyeCare Hospital'),
    link: 'https://eye-hospital-web.vercel.app/',
    desc: 'Digital clinical presence for a multispecialty eye surgical center engineered for patient trust and high search conversion.',
  },
  {
    id: '08',
    name: 'Destination Anywhere',
    category: 'Luxury Travel & Itinerary',
    categoryFilter: 'Web',
    tags: ['Next.js', 'Custom Booking Flow', 'Itinerary Engine'],
    result: 'Global booking planner',
    year: '2024',
    type: 'Web Platform',
    accent: '#F59E0B',
    mockupType: 'browser',
    mockupUrl: 'destinationanywhere.co.in',
    MockupContent: SS('/destination.png', 'Destination Anywhere'),
    link: 'https://www.destinationanywhere.co.in/',
    desc: 'Bespoke luxury travel planning platform with curated worldwide packages and personalized journey builder.',
  },
]

const categories = ['All', 'SaaS', 'E-Commerce', 'Web', 'Media']

export default function Work() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeProject, setActiveProject] = useState(null)
  const [showAll, setShowAll] = useState(false)

  const allFiltered =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.categoryFilter === activeCategory)

  const displayedProjects =
    activeCategory === 'All' && !showAll
      ? allFiltered.slice(0, 4)
      : allFiltered

  return (
    <section id="work" className="py-16 sm:py-24 md:py-32 bg-[#07080C] relative">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8">
        
        {/* Section Header with Category Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-xl">
            <span className="glow-pill mb-4 inline-flex">
              Selected Case Studies
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Work that creates{' '}
              <ShinyText>measurable impact.</ShinyText>
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
                  className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project, index) => {
              const { MockupContent } = project
              return (
                <SpotlightCard
                  key={project.id}
                  enableTilt={false}
                  spotlightColor="rgba(59, 130, 246, 0.14)"
                  borderColor="rgba(59, 130, 246, 0.3)"
                  className="group rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.18] overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xl shadow-black/40"
                >
                  {/* Browser Mockup Area */}
                  <div className="p-3.5 sm:p-6 bg-gradient-to-b from-white/[0.03] to-transparent border-b border-white/[0.06]">
                    <div className="rounded-xl border border-white/10 overflow-hidden bg-[#0B0D14] shadow-2xl">
                      {/* Browser header */}
                      <div className="flex items-center justify-between px-3.5 py-2 bg-black/40 border-b border-white/[0.06] text-[11px] text-white/40">
                        <div className="flex gap-1.5">
                          <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-red-500/60" />
                          <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-yellow-500/60" />
                          <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-green-500/60" />
                        </div>
                        <span className="font-mono text-white/50 truncate max-w-[180px] sm:max-w-none">{project.mockupUrl}</span>
                        <div className="w-4 sm:w-8" />
                      </div>
                      
                      {/* Content view */}
                      <div className="relative overflow-hidden bg-[#07080C]">
                        <MockupContent />
                      </div>
                    </div>
                  </div>

                  {/* Project Details Footer */}
                  <div className="p-5 sm:p-8 flex flex-col justify-between flex-1">
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
                          className="px-4 py-1.5 rounded-full text-xs font-semibold bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/10 transition-all active:scale-[0.98] cursor-pointer"
                        >
                          Case Study
                        </button>
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              )
            })}
          </AnimatePresence>
        </div>

        {/* View All Projects Strip */}
        <div className="mt-12 sm:mt-14 flex items-center justify-center gap-4 flex-wrap">
          {activeCategory === 'All' && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/10 transition-all cursor-pointer"
            >
              {showAll ? 'Show Fewer Projects' : `Show Remaining Projects (+${allFiltered.length - 4})`}
            </button>
          )}
          <Link
            href="/work"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-lg shadow-blue-600/25"
          >
            Explore Complete Portfolio Archive <ArrowUpRight size={13} />
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
