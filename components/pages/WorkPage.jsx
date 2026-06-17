'use client'
import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import GradientText from '@/components/ui/reactbits/GradientText'
import LightRays from '@/components/ui/reactbits/LightRays'
import GradualBlur from '@/components/ui/reactbits/GradualBlur'

const categories = ['All', 'Web', 'E-Commerce', 'SaaS', 'Healthcare']

const projects = [
  {
    name: 'ViboERP',
    category: 'SaaS',
    subtitle: 'ERP Platform for Indian SMEs',
    desc: 'Built from scratch — multi-tenant ERP covering inventory, billing, CRM, HR, and reporting. 200+ active SME clients.',
    tags: ['Next.js', 'Node.js', 'PostgreSQL', 'Multi-tenant'],
    accent: '#2563EB', accentRgb: '37,99,235',
    image: null,
    url: null,
    year: '2021 – Present',
    featured: true,
  },
  {
    name: 'Silver Spoon by ACJ',
    category: 'E-Commerce',
    subtitle: 'Luxury Silver Gifting Brand',
    desc: 'Bespoke Shopify storefront for a premium silver gifting brand — reflecting timeless elegance and craftsmanship.',
    tags: ['Shopify', 'UI/UX Design', 'E-Commerce'],
    accent: '#c9a84c', accentRgb: '201,168,76',
    image: '/silverspoon-screenshot.png',
    url: 'https://silverspoonbyacj.com',
    year: '2024',
  },
  {
    name: 'Stylux Interiors',
    category: 'Web',
    subtitle: 'Premium Interior Design Studio',
    desc: 'Turnkey interior design for residential and commercial spaces in Ahmedabad. Delivered in 90 days.',
    tags: ['Next.js', 'GSAP', 'UI/UX'],
    accent: '#b5956a', accentRgb: '181,149,106',
    image: '/interior.png',
    url: 'https://interior-web-mu.vercel.app/',
    year: '2024',
  },
  {
    name: 'JJ Films',
    category: 'Web',
    subtitle: 'Wedding Films & Real Estate Photography',
    desc: 'Cinematic portfolio for a luxury wedding films and real estate photography studio.',
    tags: ['Next.js', 'GSAP', 'Framer Motion'],
    accent: '#e2d4b7', accentRgb: '226,212,183',
    image: '/jjfilms.png',
    url: 'https://jjfilms.vercel.app/',
    year: '2024',
  },
  {
    name: 'ZingBliss Events',
    category: 'Web',
    subtitle: 'Luxury Wedding & Event Planner',
    desc: 'Crafting extraordinary moments — from grand weddings to intimate milestones.',
    tags: ['Next.js', 'Framer Motion', 'Luxury UI'],
    accent: '#d4a96a', accentRgb: '212,169,106',
    image: '/zingbliss.png',
    url: 'https://www.zingblissevents.com/',
    year: '2024',
  },
  {
    name: 'Gourmettazone by Kavita',
    category: 'E-Commerce',
    subtitle: 'Custom Cakes & Gourmet Brownies',
    desc: 'Premium artisan bakery delivering custom cakes and gourmet treats across Ahmedabad.',
    tags: ['Shopify', 'E-Commerce', 'Brand UI'],
    accent: '#f472b6', accentRgb: '244,114,182',
    image: '/sweet.png',
    url: 'https://sweet-web-delta.vercel.app/',
    year: '2024',
  },
  {
    name: 'LuxeLiving',
    category: 'Web',
    subtitle: 'Luxury Stays in Ahmedabad',
    desc: 'Curated luxury residences across Ahmedabad — crafted for travelers who expect the very best.',
    tags: ['Next.js', 'Property UI', 'Booking'],
    accent: '#facc15', accentRgb: '250,204,21',
    image: '/luxeliving.png',
    url: 'https://luxeliving-web.vercel.app/',
    year: '2024',
  },
  {
    name: 'NexSphere',
    category: 'Web',
    subtitle: 'Financial & Advisory Solutions',
    desc: 'Helping startups and businesses streamline accounting, taxation, compliance, and financial operations globally.',
    tags: ['Next.js', 'Finance UI', 'Lead Gen'],
    accent: '#f59e0b', accentRgb: '245,158,11',
    image: '/nextsphere.png',
    url: 'https://nextsphere-web.vercel.app/',
    year: '2024',
  },
  {
    name: 'College Capsule',
    category: 'SaaS',
    subtitle: 'Digital Memory Vault for College Journeys',
    desc: 'A high-fidelity private vault for the stories that defined your college journey. Keep them forever.',
    tags: ['React', 'SaaS', 'Vault UI'],
    accent: '#818cf8', accentRgb: '129,140,248',
    image: '/testimonial.png',
    url: 'https://testimonial-web-eight.vercel.app/',
    year: '2024',
  },
  {
    name: 'Chahana Dental Studio',
    category: 'Healthcare',
    subtitle: 'Exceptional Dental Care',
    desc: 'World-class dental practice with state-of-the-art technology and comprehensive treatments.',
    tags: ['Next.js', 'Healthcare UI', 'SEO'],
    accent: '#34d399', accentRgb: '52,211,153',
    image: '/chahana.png',
    url: 'https://chahanadentalstudio.com/',
    year: '2024',
  },
  {
    name: 'Aangan Boutique',
    category: 'E-Commerce',
    subtitle: 'Ethnic & Bridal Fashion',
    desc: 'Curated ethnic, indo-western and bridal wear for timeless elegance in Ahmedabad.',
    tags: ['Shopify', 'Fashion UI', 'E-Commerce'],
    accent: '#f0abba', accentRgb: '240,171,186',
    image: '/aangan.png',
    url: 'https://www.aanganboutique.in/',
    year: '2024',
  },
  {
    name: 'EyeCare Hospital',
    category: 'Healthcare',
    subtitle: 'Precision Vision. Beyond Care.',
    desc: 'Clinical digital presence for a world-class eye hospital — 99.9% surgical success rate.',
    tags: ['Next.js', 'Healthcare UI', 'SEO'],
    accent: '#22d3ee', accentRgb: '34,211,238',
    image: '/eyehospital.png',
    url: 'https://eye-hospital-web.vercel.app/',
    year: '2024',
  },
  {
    name: 'Destination Anywhere',
    category: 'Web',
    subtitle: 'Luxury Travel Planner',
    desc: 'Bespoke travel experiences curated by expert planners — personalized itineraries worldwide.',
    tags: ['Next.js', 'Travel UI', 'Booking'],
    accent: '#fb923c', accentRgb: '251,146,60',
    image: '/destination.png',
    url: 'https://www.destinationanywhere.co.in/',
    year: '2024',
  },
  {
    name: 'FruitManager',
    category: 'SaaS',
    subtitle: 'Inventory & Transaction Management',
    desc: 'Smart inventory dashboard for fruit traders — real-time ledger, vendors, and receipt generation.',
    tags: ['React', 'Dashboard', 'SaaS'],
    accent: '#4ade80', accentRgb: '74,222,128',
    image: '/inventory.png',
    url: 'https://inventory-manager-delta-nine.vercel.app/',
    year: '2024',
  },
  {
    name: 'HVAC Engineering Co.',
    category: 'Web',
    subtitle: 'Precision HVAC & Cooling',
    desc: '#1 rated HVAC engineering firm — precision cooling systems with annual maintenance packages.',
    tags: ['Next.js', 'B2B Web', 'Lead Gen'],
    accent: '#60a5fa', accentRgb: '96,165,250',
    image: '/hvac.png',
    url: 'https://hvac-web-topaz.vercel.app/',
    year: '2024',
  },
  {
    name: 'Classic Organic Chemicals',
    category: 'Web',
    subtitle: 'Agro Chemical Supplier',
    desc: 'Trusted supplier of high-quality agro chemicals, bio fertilizers and plant growth promoters.',
    tags: ['Next.js', 'B2B Web', 'Corporate'],
    accent: '#86efac', accentRgb: '134,239,172',
    image: '/chemical.png',
    url: 'https://chemical-web-nine.vercel.app/',
    year: '2024',
  },
  {
    name: 'Elite Cloud Books',
    category: 'Web',
    subtitle: 'CPA Outsourcing for US Firms',
    desc: 'Unlock scalable growth with expert US outsourcing for CPA firms and mid-market businesses.',
    tags: ['Next.js', 'Finance UI', 'Lead Gen'],
    accent: '#f87171', accentRgb: '248,113,113',
    image: '/form-web.png',
    url: 'https://form-web-alpha.vercel.app/',
    year: '2024',
  },
]

function ProjectCard({ project }) {
  return (
    <a
      href={project.url || '#'}
      target={project.url ? '_blank' : '_self'}
      rel="noopener noreferrer"
      className="group block rounded-2xl overflow-hidden border border-white/[0.06] transition-all duration-500 hover:border-white/[0.15] hover:-translate-y-1"
      style={{ background: 'linear-gradient(145deg, #0a0a10 0%, #0d0d16 100%)' }}
    >
      {/* Screenshot */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        {project.image ? (
          <>
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-60"
              style={{ background: 'linear-gradient(to bottom, transparent 40%, #0a0a10 100%)' }} />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, rgba(${project.accentRgb},0.08) 0%, rgba(${project.accentRgb},0.03) 100%)` }}>
            <div style={{ color: `rgba(${project.accentRgb},0.5)`, fontSize: '4rem', fontWeight: 900, fontFamily: 'var(--font-display)' }}>
              {project.name.slice(0,2).toUpperCase()}
            </div>
          </div>
        )}
        {/* Visit badge */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md"
            style={{ background: `rgba(${project.accentRgb},0.9)`, color: '#000' }}>
            Visit Site <ArrowUpRight size={11} />
          </div>
        </div>
        {/* Category badge */}
        <div className="absolute bottom-3 left-3">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-medium backdrop-blur-md"
            style={{ background: 'rgba(0,0,0,0.5)', color: `rgba(${project.accentRgb},0.9)`, border: `1px solid rgba(${project.accentRgb},0.25)` }}>
            {project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="font-display font-bold text-white group-hover:text-white transition-colors"
              style={{ fontSize: '1.05rem', letterSpacing: '-0.02em' }}>
              {project.name}
            </h3>
            <p className="text-xs mt-0.5" style={{ color: `rgba(${project.accentRgb},0.7)` }}>{project.subtitle}</p>
          </div>
          <span className="text-white/20 text-xs shrink-0 mt-0.5">{project.year}</span>
        </div>
        <p className="text-white/35 text-sm leading-relaxed mb-3 line-clamp-2">{project.desc}</p>
        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.05]">
          {project.tags.map(t => (
            <span key={t} style={{ fontSize: '0.6rem', padding: '2px 8px', borderRadius: 9999, background: `rgba(${project.accentRgb},0.07)`, color: `rgba(${project.accentRgb},0.6)`, border: `1px solid rgba(${project.accentRgb},0.12)` }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </a>
  )
}

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory)

  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-16 overflow-hidden" style={{ background: '#03050f' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.5 }}>
          <LightRays raysOrigin="top-center" raysColor="#6d44ff" raysSpeed={0.7} lightSpread={1.1} rayLength={1.6} followMouse mouseInfluence={0.07} />
        </div>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(79,70,229,0.07), transparent)' }} />
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-white/30 text-xs tracking-[0.2em] uppercase mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            {projects.length}+ Projects Shipped
          </div>
          <h1 className="font-display font-black leading-none mb-5" style={{ fontSize: 'clamp(2rem, 8vw, 7rem)', letterSpacing: '-0.04em' }}>
            <span className="block text-white">Work That</span>
            <span className="block">
              <GradientText colors={['#a78bfa','#4f46e5','#60a5fa','#a78bfa']} animationSpeed={5}>Delivers.</GradientText>
            </span>
          </h1>
          <p className="text-white/40 text-lg max-w-xl mx-auto leading-relaxed">
            Real websites, real clients, real results — across every industry we've touched.
          </p>
        </div>
        <GradualBlur position="bottom" strength={3} height="8rem" />
      </section>

      {/* Filters + Grid */}
      <section className="pb-24" style={{ background: '#03050f' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">

          {/* Category filter */}
          <div className="flex gap-2 flex-wrap mb-12 pt-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
                style={activeCategory === cat
                  ? { background: 'linear-gradient(135deg,#2563EB,#4f46e5)', color: '#fff', boxShadow: '0 0 20px rgba(37,99,235,0.3)' }
                  : { background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.35)', border: '1px solid rgba(255,255,255,0.07)' }
                }
              >
                {cat}
                <span className="ml-2 text-xs opacity-50">
                  {cat === 'All' ? projects.length : projects.filter(p => p.category === cat).length}
                </span>
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p, i) => (
              <ProjectCard key={p.name} project={p} index={i} />
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-20 text-center">
            <div className="inline-flex flex-col items-center gap-5 px-8 py-10 rounded-3xl border border-white/[0.06]"
              style={{ background: 'linear-gradient(135deg, #0a0a14 0%, #0d0d1a 100%)' }}>
              <p className="text-white/40 text-sm uppercase tracking-[0.25em]">Want to be next?</p>
              <h2 className="font-display font-black text-white text-3xl md:text-4xl" style={{ letterSpacing: '-0.03em' }}>
                Let's build something <GradientText colors={['#2563EB','#a78bfa','#2563EB']} animationSpeed={4}>great.</GradientText>
              </h2>
              <a href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white font-semibold text-sm"
                style={{ background: 'linear-gradient(135deg, #2563EB, #4f46e5)', boxShadow: '0 0 30px rgba(37,99,235,0.3)' }}>
                Start a Project <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
