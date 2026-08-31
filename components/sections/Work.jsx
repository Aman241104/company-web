'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ExternalLink, Sparkles, CheckCircle2, Clock } from 'lucide-react'
import BrowserMockup from '@/components/ui/BrowserMockup'
import ProjectModal from '@/components/ui/ProjectModal'
import SpotlightCard from '@/components/ui/SpotlightCard'
import ShinyText from '@/components/ui/ShinyText'

const InProgressMockup = () => (
  <div className="relative w-full h-[220px] sm:h-[280px] overflow-hidden bg-blue-600/10 flex flex-col items-center justify-center gap-1.5 text-center px-4">
    <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400/70">Build In Progress</span>
    <span className="text-xs text-white/40">Preview coming at launch</span>
  </div>
)

const SS = (src, alt, fit = 'cover') => function ScreenshotMockup() {
  return (
    <div className={`relative w-full h-[220px] sm:h-[280px] overflow-hidden bg-black ${fit === 'contain' ? 'p-6 sm:p-8 bg-[#0B0D14]' : ''}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className={fit === 'contain'
          ? 'object-contain object-center group-hover:scale-[1.03] transition-transform duration-500'
          : 'object-cover object-top group-hover:scale-[1.03] transition-transform duration-500'}
      />
    </div>
  )
}

export const projects = [
  {
    id: '01',
    name: 'SV Space Designs',
    category: 'Architecture & Turnkey Studio',
    categoryFilter: 'Web',
    tags: ['Next.js 15', 'Turnkey Studio', 'Custom Grain UI', 'Ahmedabad'],
    result: '100/100 Mobile Speed',
    year: '2025',
    type: 'Client Project',
    accent: '#B45309',
    mockupType: 'browser',
    mockupUrl: 'svspacedesigns.in',
    MockupContent: SS('/assets/sv-space-designs-live.jpg', 'SV Space Designs Architecture & Interior Studio'),
    link: 'https://www.svspacedesigns.in',
    desc: 'Interior design and turnkey execution studio in Ahmedabad delivering residential penthouses, bungalows, cafes, and commercial spaces with vendor-direct material pricing.',
  },
  {
    id: '02',
    name: 'Prihaan Spices & Agro',
    category: 'Spices & Agro E-Commerce',
    categoryFilter: 'E-Commerce',
    tags: ['Next.js 15', 'Supabase CDN', '252+ SKUs', 'WhatsApp Checkout'],
    result: '+185% WhatsApp Conversions',
    year: '2025',
    type: 'Client Project',
    accent: '#D97706',
    mockupType: 'browser',
    mockupUrl: 'prihaanspices.in',
    MockupContent: SS('/assets/prihaan-spices-live.jpg', 'Prihaan Spices E-Commerce'),
    link: 'https://www.prihaanspices.in',
    desc: 'Authentic Indian spices, masalas and dry fruits e-commerce storefront featuring 252+ live SKUs, Supabase media CDN, and streamlined WhatsApp checkout pipeline.',
  },
  {
    id: '03',
    name: 'The Silver Spoon / Argentum',
    category: 'Luxury Silver E-Commerce',
    categoryFilter: 'E-Commerce',
    tags: ['Shopify Plus', 'Next.js SSR', 'Custom 3D Configurator', 'Stripe'],
    result: '+280% Sales Growth',
    year: '2024',
    type: 'Client Project',
    accent: '#60A5FA',
    mockupType: 'browser',
    mockupUrl: 'silverspoonbyacj.com',
    MockupContent: SS('/silverspoon-screenshot.png', 'The Silver Spoon E-Commerce'),
    link: 'https://www.silverspoonbyacj.com',
    desc: 'Ultra-luxury silver gifting and silverware e-commerce storefront with live silver rate ticker and custom engraving.',
  },
  {
    id: '04',
    name: 'Vibo ERP Cloud Platform',
    category: 'Enterprise SaaS',
    categoryFilter: 'SaaS',
    tags: ['Next.js 15', 'PostgreSQL RLS', 'Multi-Tenant', 'Automated GST'],
    result: '2,400+ active enterprises',
    year: '2024',
    type: 'Product',
    accent: '#3B82F6',
    mockupType: 'browser',
    mockupUrl: 'app.viboerp.com',
    MockupContent: SS('/assets/saas_hero_mockup.png', 'Vibo ERP Platform', 'contain'),
    link: 'https://app.viboerp.com/',
    desc: 'Proprietary multi-tenant cloud ERP SaaS suite — automated billing, inventory matrix, and AI copilots for 2,400+ enterprises.',
  },
  {
    id: '05',
    name: 'Chahana Dental Studio',
    category: 'Healthcare & Clinical Systems',
    categoryFilter: 'Web',
    tags: ['Next.js', 'Clinical Telehealth', 'Appointment Engine', 'SEO'],
    result: '#1 Local Google Rank',
    year: '2024',
    type: 'Client Project',
    accent: '#10B981',
    mockupType: 'browser',
    mockupUrl: 'chahanadentalstudio.com',
    MockupContent: SS('/chahana.png', 'Chahana Dental Clinic'),
    link: 'https://chahanadentalstudio.com',
    desc: 'Digital patient appointment portal, smile makeover simulator, and multi-specialty clinical workflow engine.',
  },
  {
    id: '06',
    name: 'Destination Anywhere',
    category: 'Luxury Travel & Itinerary',
    categoryFilter: 'Web',
    tags: ['Next.js', 'Itinerary Engine', 'Bespoke Travel', 'Razorpay'],
    result: '40+ Countries Covered',
    year: '2024',
    type: 'Client Project',
    accent: '#F59E0B',
    mockupType: 'browser',
    mockupUrl: 'destinationanywhere.co.in',
    MockupContent: SS('/destination.png', 'Destination Anywhere'),
    link: 'https://www.destinationanywhere.co.in/',
    desc: 'Bespoke luxury travel planning platform with curated worldwide packages and personalized journey builder.',
  },
  {
    id: '07',
    name: 'ZingBliss Events',
    category: 'Luxury Wedding & Events',
    categoryFilter: 'Web',
    tags: ['Next.js', 'Luxury UX', 'Destination Weddings', 'Lead Gen'],
    result: '3.8x Inquiry Rate',
    year: '2024',
    type: 'Client Project',
    accent: '#EC4899',
    mockupType: 'browser',
    mockupUrl: 'zingblissevents.com',
    MockupContent: SS('/zingbliss.png', 'ZingBliss Events'),
    link: 'https://www.zingblissevents.com',
    desc: 'High-converting luxury event design portal built to convert high-net-worth inquiries into confirmed destination contracts.',
  },
  {
    id: '08',
    name: 'Ares Business League',
    category: 'Executive B2B Network',
    categoryFilter: 'Web',
    tags: ['Next.js', 'Member Directory', 'Referral Tracking', 'Executive CRM'],
    result: '500+ Executive Members',
    year: '2025',
    type: 'Client Project',
    accent: '#3B82F6',
    mockupType: 'browser',
    mockupUrl: 'aresbusinessleague.com',
    MockupContent: SS('/assets/ares-business-league-live.jpg', 'Ares Business League'),
    link: 'https://www.aresbusinessleague.com',
    desc: 'Premier business networking league, member directory, referral tracking, and executive chapter leadership portal.',
  },
  {
    id: '09',
    name: 'CMJ Events',
    category: 'Luxury Wedding & Event Planning',
    categoryFilter: 'Web',
    tags: ['Next.js', 'Gallery Performance', 'Lead Funnel', 'Ahmedabad'],
    result: '250+ Events Delivered',
    year: '2025',
    type: 'Client Project',
    accent: '#8B5CF6',
    mockupType: 'browser',
    mockupUrl: 'clubmjevents.com',
    MockupContent: SS('/assets/club-mj-events-live.jpg', 'CMJ Events'),
    link: 'https://www.clubmjevents.com',
    desc: 'Award-winning in-house design and production studio behind 250+ weddings, corporate productions, and private celebrations across India and worldwide.',
  },
  {
    id: '10',
    name: 'Naam Transfer',
    category: 'Legal Property Documentation',
    categoryFilter: 'Web',
    tags: ['Next.js', 'Gov Registry', 'Automated Intake', 'Document Engine'],
    result: '100% Automated Intake',
    year: '2025',
    type: 'Client Project',
    accent: '#0284C7',
    mockupType: 'browser',
    mockupUrl: 'naamtransfer.com',
    MockupContent: SS('/assets/naam-transfer-live.jpg', 'Naam Transfer Portal'),
    link: 'https://www.naamtransfer.com',
    desc: 'Online property title deed transfer, municipal registry documentation, and legal name change workflow portal.',
  },
  {
    id: '11',
    name: 'NexSphere Global',
    category: 'Corporate Advisory & FinTech',
    categoryFilter: 'SaaS',
    tags: ['Next.js', 'Global Compliance', 'Tax Calculators', 'Lead Engine'],
    result: 'Global Corporate Hub',
    year: '2024',
    type: 'Client Project',
    accent: '#10B981',
    mockupType: 'browser',
    mockupUrl: 'thenexsphereglobal.com',
    MockupContent: SS('/nextsphere.png', 'NexSphere Global Advisory'),
    link: 'https://www.thenexsphereglobal.com',
    desc: 'Global financial compliance and business advisory hub with automated tax calculators and lead qualification engines.',
  },
  {
    id: '12',
    name: 'Jukebox Media',
    category: 'Brand & Performance Marketing',
    categoryFilter: 'Media',
    tags: ['Next.js', 'Creator CRM', 'Performance Marketing', 'ROAS Tracker'],
    result: '4.8x Average ROAS',
    year: '2025',
    type: 'Client Project',
    accent: '#F43F5E',
    mockupType: 'browser',
    mockupUrl: 'jukeboxmedia.in',
    MockupContent: SS('/assets/jukebox-media-live.jpg', 'Jukebox Media Agency'),
    link: 'https://www.jukeboxmedia.in',
    desc: 'Full-funnel digital marketing, creator talent management, and viral campaign engine for modern consumer brands.',
  },
  {
    id: '13',
    name: 'Rising Rechargeable',
    category: 'Clean Energy & Battery Systems',
    categoryFilter: 'E-Commerce',
    tags: ['Next.js', 'Lithium Storage', 'B2B Catalog', 'Clean Energy'],
    result: 'Clean Energy Supply',
    year: '2025',
    type: 'Client Project',
    accent: '#EAB308',
    mockupType: 'browser',
    mockupUrl: 'risingrechargeable.com',
    MockupContent: SS('/assets/rising-rechargeable-live.jpg', 'Rising Rechargeable Energy'),
    link: 'https://www.risingrechargeable.com',
    desc: 'Industrial rechargeable battery packs, renewable energy storage systems, and lithium-ion power solutions storefront.',
  },
  {
    id: '14',
    name: 'FGP Industries',
    category: 'Industrial FRP Manufacturing',
    categoryFilter: 'Web',
    tags: ['Next.js', 'FRP Composites', 'Industrial Tanks', 'Chemical Engineering'],
    result: 'Heavy Industrial Specs',
    year: '2024',
    type: 'Client Project',
    accent: '#64748B',
    mockupType: 'browser',
    mockupUrl: 'fgpind.com',
    MockupContent: SS('/assets/fgp-industries-live.jpg', 'FGP Industries FRP'),
    link: 'https://fgpind.com',
    desc: 'Industrial fiberglass reinforced plastics (FRP) manufacturing, chemical process equipment, and custom composite storage tanks.',
  },
  {
    id: '15',
    name: 'Aangan Boutique',
    category: 'Handcrafted Bridal Couture',
    categoryFilter: 'E-Commerce',
    tags: ['Shopify Plus', 'Bridal Couture', 'Global Shipping', 'Next.js'],
    result: 'Global Bridal Reach',
    year: '2024',
    type: 'Client Project',
    accent: '#EC4899',
    mockupType: 'browser',
    mockupUrl: 'aanganboutique.in',
    MockupContent: SS('/aangan.png', 'Aangan Boutique Bridal'),
    link: 'https://www.aanganboutique.in',
    desc: 'High-end ethnic couture showcase with custom bridal appointment booking and worldwide shipping currency switcher.',
  },
  {
    id: '16',
    name: 'SI Decor & Interiors',
    category: 'Turnkey Architectural Interiors',
    categoryFilter: 'Web',
    tags: ['Next.js', 'Turnkey Interiors', 'Modular Kitchens', 'Ahmedabad'],
    result: '75+ Delivered Homes',
    year: '2024',
    type: 'Client Project',
    accent: '#14B8A6',
    mockupUrl: 'sidecor.in',
    MockupContent: SS('/interior.png', 'SI Decor & Interiors Studio'),
    link: 'https://www.sidecor.in',
    desc: 'Turnkey architectural interior design studio delivering modern residential homes, luxury villas, and modular kitchens.',
  },
  {
    id: '17',
    name: 'Jade Travels',
    category: 'Corporate & Global Travel',
    categoryFilter: 'Web',
    tags: ['Next.js', 'Corporate Travel', 'International Tours', 'Visa Booking'],
    result: 'In Development',
    inProgress: true,
    year: '2026',
    type: 'Client Project',
    accent: '#06B6D4',
    mockupUrl: 'jadetravels.co.in',
    MockupContent: InProgressMockup,
    link: 'https://www.jadetravels.co.in',
    desc: 'Corporate travel management and international holiday planner offering customized luxury tours, flight bookings, and visa services. Build in progress.',
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
                      <div className="flex items-center justify-between px-3.5 py-2 bg-black/40 border-b border-white/[0.06] text-[11px] text-white/55">
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
                      <div className={`flex items-center gap-2 text-xs font-semibold ${project.inProgress ? 'text-blue-400' : 'text-emerald-400'}`}>
                        {project.inProgress ? <Clock size={13} /> : <CheckCircle2 size={13} />}
                        <span>{project.result}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        {project.link && !project.inProgress && (
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
