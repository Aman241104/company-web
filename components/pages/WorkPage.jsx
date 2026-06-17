'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ExternalLink } from 'lucide-react'

const Pill = ({ children }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 14px', borderRadius: 99, marginBottom: 20, border: '1px solid rgba(91,138,247,0.25)', background: 'rgba(91,138,247,0.07)', fontFamily: 'var(--font-outfit)', fontSize: 12, color: 'rgba(91,138,247,0.85)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#5B8AF7', display: 'inline-block', animation: 'opacity-glow 2s ease-in-out infinite alternate' }} />
    {children}
  </span>
)

const categories = ['All', 'Web', 'E-Commerce', 'SaaS', 'Healthcare']

const projects = [
  { name: 'ViboERP', category: 'SaaS', subtitle: 'ERP Platform for Indian SMEs', desc: 'Built from scratch — multi-tenant ERP covering inventory, billing, CRM, HR, and reporting. 200+ active SME clients across India.', tags: ['Next.js', 'Node.js', 'PostgreSQL', 'Multi-tenant'], image: null, url: null, year: '2021 – Present', featured: true },
  { name: 'Silver Spoon by ACJ', category: 'E-Commerce', subtitle: 'Luxury Silver Gifting Brand', desc: 'Bespoke Shopify storefront for a premium silver gifting brand. +280% online orders in the first 3 months post-launch.', tags: ['Shopify', 'UI/UX Design', 'E-Commerce'], image: '/silverspoon-screenshot.png', url: 'https://silverspoonbyacj.com', year: '2024' },
  { name: 'Stylux Interiors', category: 'Web', subtitle: 'Premium Interior Design Studio', desc: 'Turnkey interior design studio for residential and commercial spaces in Ahmedabad. Delivered in 90 days with GSAP-powered animations.', tags: ['Next.js', 'GSAP', 'UI/UX'], image: '/interior.png', url: 'https://interior-web-mu.vercel.app/', year: '2024' },
  { name: 'JJ Films', category: 'Web', subtitle: 'Wedding Films & Real Estate Photography', desc: 'Cinematic portfolio for a luxury wedding films and real estate photography studio — built to showcase high-end visual work.', tags: ['Next.js', 'GSAP', 'Framer Motion'], image: '/jjfilms.png', url: 'https://jjfilms.vercel.app/', year: '2024' },
  { name: 'ZingBliss Events', category: 'Web', subtitle: 'Luxury Wedding & Event Planner', desc: 'Crafting extraordinary moments — from grand weddings to intimate milestones. 18K active users with 4.8★ App Store rating.', tags: ['Next.js', 'Framer Motion', 'Luxury UI'], image: '/zingbliss.png', url: 'https://www.zingblissevents.com/', year: '2024' },
  { name: 'Gourmettazone by Kavita', category: 'E-Commerce', subtitle: 'Custom Cakes & Gourmet Brownies', desc: 'Premium artisan bakery delivering custom cakes and gourmet treats across Ahmedabad — designed for high conversion on mobile.', tags: ['Shopify', 'E-Commerce', 'Brand UI'], image: '/sweet.png', url: 'https://sweet-web-delta.vercel.app/', year: '2024' },
  { name: 'LuxeLiving', category: 'Web', subtitle: 'Luxury Stays in Ahmedabad', desc: 'Curated luxury residences across Ahmedabad — crafted for travelers who expect the very best. 4.4× ROAS on campaigns.', tags: ['Next.js', 'Property UI', 'Booking'], image: '/luxeliving.png', url: 'https://luxeliving-web.vercel.app/', year: '2024' },
  { name: 'NexSphere', category: 'Web', subtitle: 'Financial & Advisory Solutions', desc: 'Helping startups and businesses streamline accounting, taxation, compliance, and financial operations globally.', tags: ['Next.js', 'Finance UI', 'Lead Gen'], image: '/nextsphere.png', url: 'https://nextsphere-web.vercel.app/', year: '2024' },
  { name: 'College Capsule', category: 'SaaS', subtitle: 'Digital Memory Vault for College Journeys', desc: 'A high-fidelity private vault for the stories that defined your college years. Custom SaaS with media storage and social sharing.', tags: ['React', 'SaaS', 'Vault UI'], image: '/testimonial.png', url: 'https://testimonial-web-eight.vercel.app/', year: '2024' },
  { name: 'Chahana Dental Studio', category: 'Healthcare', subtitle: 'Exceptional Dental Care', desc: 'World-class dental practice site that ranked #1 for 12 local keywords within 3 months of launch via technical SEO.', tags: ['Next.js', 'Healthcare UI', 'SEO'], image: '/chahana.png', url: 'https://chahanadentalstudio.com/', year: '2024' },
  { name: 'Aangan Boutique', category: 'E-Commerce', subtitle: 'Ethnic & Bridal Fashion', desc: 'Curated ethnic, indo-western and bridal wear for timeless elegance in Ahmedabad — full Shopify storefront with custom UX.', tags: ['Shopify', 'Fashion UI', 'E-Commerce'], image: '/aangan.png', url: 'https://www.aanganboutique.in/', year: '2024' },
  { name: 'EyeCare Hospital', category: 'Healthcare', subtitle: 'Precision Vision. Beyond Care.', desc: 'Clinical digital presence for a world-class eye hospital — 99.9% surgical success rate, designed to build patient trust.', tags: ['Next.js', 'Healthcare UI', 'SEO'], image: '/eyehospital.png', url: 'https://eye-hospital-web.vercel.app/', year: '2024' },
  { name: 'Destination Anywhere', category: 'Web', subtitle: 'Luxury Travel Planner', desc: 'Bespoke travel experiences curated by expert planners — personalized itineraries worldwide with an elegant booking flow.', tags: ['Next.js', 'Travel UI', 'Booking'], image: '/destination.png', url: 'https://www.destinationanywhere.co.in/', year: '2024' },
  { name: 'FruitManager', category: 'SaaS', subtitle: 'Inventory & Transaction Management', desc: 'Smart inventory dashboard for fruit traders — real-time ledger, vendor management, and receipt generation at 3M+ daily transactions.', tags: ['React', 'Dashboard', 'SaaS'], image: '/inventory.png', url: 'https://inventory-manager-delta-nine.vercel.app/', year: '2024' },
  { name: 'HVAC Engineering Co.', category: 'Web', subtitle: 'Precision HVAC & Cooling', desc: '#1 rated HVAC engineering firm in their region — precision cooling systems site that tripled monthly lead volume.', tags: ['Next.js', 'B2B Web', 'Lead Gen'], image: '/hvac.png', url: 'https://hvac-web-topaz.vercel.app/', year: '2024' },
  { name: 'Classic Organic Chemicals', category: 'Web', subtitle: 'Agro Chemical Supplier', desc: 'Trusted supplier of high-quality agro chemicals, bio fertilizers and plant growth promoters — B2B lead generation site.', tags: ['Next.js', 'B2B Web', 'Corporate'], image: '/chemical.png', url: 'https://chemical-web-nine.vercel.app/', year: '2024' },
  { name: 'Elite Cloud Books', category: 'Web', subtitle: 'CPA Outsourcing for US Firms', desc: 'Unlock scalable growth with expert US outsourcing for CPA firms and mid-market businesses — designed for US market lead gen.', tags: ['Next.js', 'Finance UI', 'Lead Gen'], image: '/form-web.png', url: 'https://form-web-alpha.vercel.app/', year: '2024' },
]

function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.45, delay: index * 0.04 }}
    >
      <a href={project.url || '#'} target={project.url ? '_blank' : '_self'} rel="noopener noreferrer"
        style={{ display: 'block', textDecoration: 'none', background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, overflow: 'hidden', transition: 'all 0.35s', position: 'relative' }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(91,138,247,0.25)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'translateY(0)' }}>

        {/* Image */}
        <div style={{ aspectRatio: '16/9', overflow: 'hidden', position: 'relative' }}>
          {project.image ? (
            <>
              <img src={project.image} alt={project.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block', transition: 'transform 0.5s' }}
                onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(6,6,20,0.9) 100%)' }} />
            </>
          ) : (
            <div style={{ width: '100%', height: '100%', background: 'rgba(91,138,247,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 48, color: 'rgba(91,138,247,0.3)', letterSpacing: '-0.04em' }}>{project.name.slice(0,2).toUpperCase()}</span>
            </div>
          )}
          {/* Visit badge */}
          {project.url && (
            <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', alignItems: 'center', gap: 5, padding: '5px 12px', borderRadius: 99, background: 'rgba(91,138,247,0.9)', fontFamily: 'var(--font-outfit)', fontSize: 10.5, fontWeight: 600, color: '#fff', opacity: 0, transition: 'opacity 0.25s' }}
              className="visit-badge">
              Visit <ExternalLink size={10} />
            </div>
          )}
          {/* Category */}
          <div style={{ position: 'absolute', bottom: 12, left: 12 }}>
            <span style={{ padding: '4px 10px', borderRadius: 99, fontFamily: 'var(--font-outfit)', fontSize: 10, fontWeight: 500, background: 'rgba(0,0,0,0.5)', color: 'rgba(91,138,247,0.9)', border: '1px solid rgba(91,138,247,0.2)', backdropFilter: 'blur(8px)' }}>
              {project.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '20px 20px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 8 }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 16, color: '#fff', margin: '0 0 3px', letterSpacing: '-0.02em' }}>{project.name}</h3>
              <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 12, color: 'rgba(91,138,247,0.7)', margin: 0 }}>{project.subtitle}</p>
            </div>
            <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 11.5, color: 'rgba(255,255,255,0.2)', flexShrink: 0 }}>{project.year}</span>
          </div>
          <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 13, color: 'rgba(255,255,255,0.38)', lineHeight: 1.6, margin: '0 0 14px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{project.desc}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            {project.tags.map(t => (
              <span key={t} style={{ fontFamily: 'var(--font-outfit)', fontSize: 10, color: 'rgba(91,138,247,0.6)', background: 'rgba(91,138,247,0.06)', padding: '2px 8px', borderRadius: 99, border: '1px solid rgba(91,138,247,0.12)' }}>{t}</span>
            ))}
          </div>
        </div>
      </a>
      <style>{`.visit-badge { opacity: 0 !important } a:hover .visit-badge { opacity: 1 !important }`}</style>
    </motion.div>
  )
}

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [stars, setStars] = useState([])
  useEffect(() => {
    setStars(Array.from({ length: 35 }, (_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.4, opacity: Math.random() * 0.4 + 0.06, dur: 2 + Math.random() * 3,
    })))
  }, [])

  const filtered = activeCategory === 'All' ? projects : projects.filter(p => p.category === activeCategory)

  return (
    <>
      {/* Hero */}
      <section style={{ position: 'relative', paddingTop: 140, paddingBottom: 80, textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {stars.map(s => (
            <div key={s.id} style={{ position: 'absolute', left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size, borderRadius: '50%', background: '#fff', opacity: s.opacity, animation: `opacity-glow ${s.dur}s ease-in-out infinite alternate` }} />
          ))}
        </div>
        <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 400, borderRadius: '50%', pointerEvents: 'none', background: 'radial-gradient(ellipse, rgba(139,92,246,0.12) 0%, rgba(91,138,247,0.07) 45%, transparent 70%)', filter: 'blur(60px)' }} />

        <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
            <Pill>{projects.length}+ Projects Shipped</Pill>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(42px, 8vw, 80px)', lineHeight: 1.05, letterSpacing: '-0.03em', color: '#fff', margin: '0 0 20px' }}>
            Work that<br />
            <span style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', backgroundImage: 'linear-gradient(135deg, #5B8AF7, #8B5CF6)' }}>delivers.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: 'var(--font-outfit)', fontSize: 17, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, maxWidth: 520, margin: '0 auto' }}>
            Real websites. Real clients. Real results — across every industry we've touched.
          </motion.p>
        </div>
      </section>

      {/* Filters + Grid */}
      <section style={{ padding: '0 24px 100px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          {/* Category filters */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 48, paddingTop: 8 }}>
            {categories.map(cat => {
              const count = cat === 'All' ? projects.length : projects.filter(p => p.category === cat).length
              const isActive = activeCategory === cat
              return (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '8px 18px', borderRadius: 99, fontFamily: 'var(--font-outfit)', fontWeight: 500, fontSize: 13.5, cursor: 'pointer', border: 'none', transition: 'all 0.25s',
                    background: isActive ? 'linear-gradient(135deg, #5B8AF7, #8B5CF6)' : 'rgba(255,255,255,0.04)',
                    color: isActive ? '#fff' : 'rgba(255,255,255,0.4)',
                    boxShadow: isActive ? '0 4px 20px rgba(91,138,247,0.3)' : 'none',
                    outline: isActive ? 'none' : '1px solid rgba(255,255,255,0.07)',
                  }}>
                  {cat}
                  <span style={{ fontSize: 11, opacity: isActive ? 0.7 : 0.4 }}>{count}</span>
                </button>
              )
            })}
          </motion.div>

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="work-grid">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => <ProjectCard key={p.name} project={p} index={i} />)}
            </AnimatePresence>
          </div>

          {/* Bottom CTA */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ marginTop: 80, padding: '48px 32px', background: 'rgba(91,138,247,0.05)', border: '1px solid rgba(91,138,247,0.12)', borderRadius: 20, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '60%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(91,138,247,0.5), transparent)' }} />
            <div style={{ fontFamily: 'var(--font-outfit)', fontSize: 11.5, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 12 }}>Want to be next?</div>
            <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(24px, 4vw, 38px)', letterSpacing: '-0.03em', color: '#fff', margin: '0 0 20px', lineHeight: 1.1 }}>
              Let's build something{' '}
              <span style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', backgroundImage: 'linear-gradient(135deg, #5B8AF7, #8B5CF6)' }}>great.</span>
            </h2>
            <a href="/contact" style={{ textDecoration: 'none' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 28px', borderRadius: 99, background: 'linear-gradient(135deg, #5B8AF7, #8B5CF6)', fontFamily: 'var(--font-outfit)', fontWeight: 600, fontSize: 14.5, color: '#fff', cursor: 'pointer', boxShadow: '0 8px 32px rgba(91,138,247,0.28)' }}>
                Start a Project <ArrowRight size={15} />
              </span>
            </a>
          </motion.div>
        </div>
        <style>{`@media (max-width: 900px) { .work-grid { grid-template-columns: repeat(2, 1fr) !important; } } @media (max-width: 580px) { .work-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>
    </>
  )
}
