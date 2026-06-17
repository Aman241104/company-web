'use client'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import GradientText from '@/components/ui/reactbits/GradientText'
import BrowserMockup from '@/components/ui/BrowserMockup'
import PhoneMockup from '@/components/ui/PhoneMockup'
import ViboERPDashboard from '@/components/ui/ViboERPDashboard'
import ProjectModal from '@/components/ui/ProjectModal'

gsap.registerPlugin(ScrollTrigger)

const SS = (src, alt) => function ScreenshotMockup() {
  return <img src={src} alt={alt} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top', display:'block' }} />
}

const projects = [
  {
    id: '01', name: 'ViboERP', category: 'SaaS Platform',
    tags: ['ERP', 'Multi-Tenant', 'Analytics'],
    result: '2,400+ active users', year: '2024', type: 'Product',
    accent: '#2563EB', accentRgb: '37,99,235',
    mockupType: 'browser', mockupUrl: 'app.viboerp.com',
    MockupContent: ViboERPDashboard,
    gradient: 'linear-gradient(135deg, #03060f 0%, #060d1e 100%)',
    desc: 'A full-scale ERP SaaS — inventory, CRM, HR & finance in one unified dashboard.',
  },
  {
    id: '02', name: 'Silver Spoon by ACJ', category: 'E-Commerce',
    tags: ['Shopify', 'UI/UX', 'Luxury Gifting'],
    result: 'Live · silverspoonbyacj.com', year: '2024', type: 'Web',
    accent: '#c9a84c', accentRgb: '201,168,76',
    mockupType: 'browser', mockupUrl: 'silverspoonbyacj.com',
    MockupContent: SS('/silverspoon-screenshot.png', 'Silver Spoon by ACJ'),
    link: 'https://silverspoonbyacj.com',
    gradient: 'linear-gradient(135deg, #0e0c06 0%, #140f04 100%)',
    desc: 'Premium silver gifting brand — bespoke Shopify storefront reflecting timeless elegance and craftsmanship.',
  },
  {
    id: '03', name: 'Stylux Interiors', category: 'Interior Design',
    tags: ['Next.js', 'GSAP', 'UI/UX'],
    result: 'Turnkey delivery in 90 days', year: '2024', type: 'Web',
    accent: '#b5956a', accentRgb: '181,149,106',
    mockupType: 'browser', mockupUrl: 'styluxinteriors.com',
    MockupContent: SS('/interior.png', 'Stylux Interiors'),
    link: 'https://interior-web-mu.vercel.app/',
    gradient: 'linear-gradient(135deg, #0e0b07 0%, #130f09 100%)',
    desc: 'Premium turnkey interior design studio delivering residential and commercial spaces in Ahmedabad.',
  },
  {
    id: '04', name: 'JJ Films', category: 'Wedding Films & Real Estate',
    tags: ['Next.js', 'GSAP', 'Cinematic UI'],
    result: 'Full-service creative studio', year: '2024', type: 'Web',
    accent: '#e2d4b7', accentRgb: '226,212,183',
    mockupType: 'browser', mockupUrl: 'jjfilms.in',
    MockupContent: SS('/jjfilms.png', 'JJ Films'),
    link: 'https://jjfilms.vercel.app/',
    gradient: 'linear-gradient(135deg, #0a0907 0%, #12100c 100%)',
    desc: 'Cinematic portfolio for a luxury wedding films and real estate photography studio.',
  },
  {
    id: '05', name: 'ZingBliss Events', category: 'Event Management',
    tags: ['Next.js', 'Framer Motion', 'Luxury'],
    result: 'Grand weddings & ceremonies', year: '2024', type: 'Web',
    accent: '#d4a96a', accentRgb: '212,169,106',
    mockupType: 'browser', mockupUrl: 'zingblissevents.com',
    MockupContent: SS('/zingbliss.png', 'ZingBliss Events'),
    link: 'https://www.zingblissevents.com/',
    gradient: 'linear-gradient(135deg, #0e0906 0%, #150d08 100%)',
    desc: 'Luxury event planning studio crafting extraordinary wedding moments and intimate ceremonies.',
  },
  {
    id: '06', name: 'EyeCare Hospital', category: 'Healthcare',
    tags: ['Next.js', 'Healthcare UI', 'SEO'],
    result: '99.9% clinical success rate', year: '2024', type: 'Web',
    accent: '#22d3ee', accentRgb: '34,211,238',
    mockupType: 'browser', mockupUrl: 'eyecarehospital.com',
    MockupContent: SS('/eyehospital.png', 'EyeCare Hospital'),
    link: 'https://eye-hospital-web.vercel.app/',
    gradient: 'linear-gradient(135deg, #030d0f 0%, #041215 100%)',
    desc: 'Digital presence for a world-class eye care hospital — clinical trust built into every pixel.',
  },
  {
    id: '07', name: 'Destination Anywhere', category: 'Travel & Hospitality',
    tags: ['Next.js', 'Booking UI', 'Travel'],
    result: 'Luxury travel planner', year: '2024', type: 'Web',
    accent: '#f59e0b', accentRgb: '245,158,11',
    mockupType: 'browser', mockupUrl: 'destinationanywhere.co.in',
    MockupContent: SS('/destination.png', 'Destination Anywhere'),
    link: 'https://www.destinationanywhere.co.in/',
    gradient: 'linear-gradient(135deg, #0e0a03 0%, #150f04 100%)',
    desc: 'Bespoke luxury travel planning platform with curated packages and personalized journey builder.',
  },
  {
    id: '08', name: 'Aangan Boutique', category: 'Fashion E-Commerce',
    tags: ['Shopify', 'Fashion UI', 'E-Commerce'],
    result: 'Ethnic & bridal wear brand', year: '2024', type: 'Web',
    accent: '#f0abba', accentRgb: '240,171,186',
    mockupType: 'browser', mockupUrl: 'aanganboutique.in',
    MockupContent: SS('/aangan.png', 'Aangan Boutique'),
    link: 'https://www.aanganboutique.in/',
    gradient: 'linear-gradient(135deg, #0e0709 0%, #150b0d 100%)',
    desc: 'Curated ethnic, indo-western and bridal wear for timeless elegance, in the heart of Ahmedabad.',
  },
]

function ProjectPanel({ project, index, onOpen }) {
  const { MockupContent } = project

  return (
    <div
      className="proj-panel relative flex-shrink-0 flex flex-col md:flex-row items-center justify-center overflow-hidden"
      data-cursor="view"
      style={{
        width: '100vw',
        minHeight: '100vh',
        background: project.gradient,
      }}
    >
      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />

      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse 60% 50% at 30% 50%, rgba(${project.accentRgb},0.1) 0%, transparent 70%)`,
      }} />

      {/* Ghost number */}
      <span
        className="absolute right-0 bottom-0 font-display font-black select-none pointer-events-none leading-none"
        style={{
          fontSize: 'clamp(12rem, 28vw, 32rem)',
          color: `rgba(${project.accentRgb}, 0.04)`,
          letterSpacing: '-0.04em',
          lineHeight: 0.8,
        }}
        aria-hidden
      >
        {project.id}
      </span>

      {/* Inner content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 md:px-14 lg:px-20 py-28 grid md:grid-cols-[1fr_1.1fr] gap-12 md:gap-16 items-center">

        {/* Left: text */}
        <div className="flex flex-col">
          <div className="flex items-center gap-4 mb-8">
            <span
              className="font-display font-bold tabular-nums text-xs"
              style={{ color: `rgba(${project.accentRgb},0.5)` }}
            >
              {project.id} / 0{projects.length}
            </span>
            <div className="h-px flex-1 max-w-[3rem]" style={{ background: `rgba(${project.accentRgb},0.3)` }} />
            <span
              className="text-[10px] px-3 py-1 rounded-full font-medium"
              style={{ background: `rgba(${project.accentRgb},0.1)`, color: project.accent, border: `1px solid rgba(${project.accentRgb},0.2)` }}
            >
              {project.type}
            </span>
            <span className="text-white/20 text-xs">{project.year}</span>
          </div>

          <h2
            className="font-display font-black text-white leading-none mb-4"
            style={{ fontSize: 'clamp(3.5rem, 7vw, 9rem)', letterSpacing: '-0.04em' }}
          >
            {project.name}
          </h2>

          <p
            className="font-display font-medium mb-5"
            style={{ color: project.accent, fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)', letterSpacing: '-0.01em' }}
          >
            {project.category}
          </p>

          <p className="text-white/35 text-base leading-relaxed mb-8 max-w-md">
            {project.desc}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((t) => (
              <span
                key={t}
                className="text-[11px] px-3 py-1 rounded-full"
                style={{ background: `rgba(${project.accentRgb},0.08)`, color: project.accent, border: `1px solid rgba(${project.accentRgb},0.15)` }}
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3 pt-6 border-t border-white/[0.06]">
            <div className="w-2 h-2 rounded-full" style={{ background: project.accent }} />
            <span className="text-white font-semibold text-sm">{project.result}</span>
          </div>
        </div>

        {/* Right: mockup */}
        <div
          className="relative flex items-center justify-center"
          style={{ filter: `drop-shadow(0 30px 80px rgba(${project.accentRgb},0.2))` }}
        >
          {project.mockupType === 'phone' ? (
            <div className="flex justify-center">
              <PhoneMockup style={{ maxWidth: 240 }}>
                <MockupContent />
              </PhoneMockup>
            </div>
          ) : (
            <BrowserMockup url={project.mockupUrl}>
              <MockupContent />
            </BrowserMockup>
          )}
        </div>
      </div>

      {/* Bottom actions */}
      <div className="absolute bottom-8 left-8 md:left-14 right-8 md:right-14 flex items-center justify-between">
        <div className="flex items-center gap-2 pointer-events-none" style={{ color: `rgba(${project.accentRgb},0.3)` }}>
          <span className="text-[10px] uppercase tracking-[0.25em]">{project.id} of 0{projects.length}</span>
        </div>
        {project.link && (
          <a
            href={project.link} target="_blank" rel="noopener noreferrer"
            className="group flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-xs border transition-all duration-300"
            style={{ background: `rgba(${project.accentRgb},0.1)`, borderColor: `rgba(${project.accentRgb},0.3)`, backdropFilter: 'blur(8px)', color: project.accent }}
            onMouseEnter={(e) => { e.currentTarget.style.background = `rgba(${project.accentRgb},0.25)`; e.currentTarget.style.borderColor = `rgba(${project.accentRgb},0.5)` }}
            onMouseLeave={(e) => { e.currentTarget.style.background = `rgba(${project.accentRgb},0.1)`; e.currentTarget.style.borderColor = `rgba(${project.accentRgb},0.3)` }}
          >
            Visit Site <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        )}
        <button
          onClick={onOpen}
          className="group flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-medium text-xs border transition-all duration-300"
          style={{
            background: `rgba(${project.accentRgb},0.1)`,
            borderColor: `rgba(${project.accentRgb},0.3)`,
            backdropFilter: 'blur(8px)',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = `rgba(${project.accentRgb},0.25)` }}
          onMouseLeave={(e) => { e.currentTarget.style.background = `rgba(${project.accentRgb},0.1)` }}
        >
          <span>View Case Study</span>
          <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: project.accent }} />
        </button>
      </div>
    </div>
  )
}

/* Mobile card view (fallback) */
function ProjectCard({ project, onOpen }) {
  const { MockupContent } = project
  return (
    <div
      className="rounded-2xl border border-white/[0.06] overflow-hidden"
      style={{ background: project.gradient }}
    >
      <div className="relative overflow-hidden" style={{
        background: `radial-gradient(ellipse at 50% 120%, rgba(${project.accentRgb},0.15) 0%, transparent 60%)`,
      }}>
        <div className="p-5" style={{ filter: `drop-shadow(0 16px 40px rgba(${project.accentRgb},0.2))` }}>
          {project.mockupType === 'phone'
            ? <div className="flex justify-center"><PhoneMockup style={{ maxWidth: 160 }}><MockupContent /></PhoneMockup></div>
            : <div className="overflow-hidden" style={{ maxHeight: 160 }}><BrowserMockup url={project.mockupUrl}><MockupContent /></BrowserMockup></div>
          }
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-white/30 text-xs tabular-nums">{project.id}</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full"
            style={{ background: `rgba(${project.accentRgb},0.1)`, color: project.accent, border: `1px solid rgba(${project.accentRgb},0.15)` }}>
            {project.type}
          </span>
        </div>
        <h3 className="font-display font-black text-white mb-1" style={{ fontSize: '1.8rem', letterSpacing: '-0.03em' }}>{project.name}</h3>
        <p className="text-xs mb-3" style={{ color: `rgba(${project.accentRgb},0.7)` }}>{project.category}</p>
        <p className="text-white/35 text-sm leading-relaxed mb-4">{project.desc}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <span key={t} className="text-[10px] px-2 py-0.5 rounded-full"
              style={{ background: `rgba(${project.accentRgb},0.08)`, color: project.accent }}>
              {t}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/[0.05]">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: project.accent }} />
            <span className="text-white/50 text-xs font-medium">{project.result}</span>
          </div>
          <button
            onClick={onOpen}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-medium"
            style={{ background: `rgba(${project.accentRgb},0.1)`, color: project.accent, border: `1px solid rgba(${project.accentRgb},0.2)` }}
          >
            View <ArrowUpRight size={11} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Work() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const headRef = useRef(null)
  const [activeProject, setActiveProject] = useState(null)

  /* Header animation */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 768px)', () => {
        gsap.fromTo('.work-h-word',
          { y: '108%', opacity: 0 },
          {
            y: '0%', opacity: 1, stagger: 0.09, duration: 0.85, ease: 'power3.out',
            scrollTrigger: { trigger: headRef.current, start: 'top 80%', once: true },
          }
        )
      })
      mm.add('(max-width: 767px)', () => {
        gsap.fromTo('.work-h-word',
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0, stagger: 0.08, duration: 0.65, ease: 'power2.out',
            scrollTrigger: { trigger: headRef.current, start: 'top 85%', once: true },
          }
        )
      })
    })
    return () => ctx.revert()
  }, [])

  /* Horizontal scroll — desktop only */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 1024px)', () => {
        const track = trackRef.current
        if (!track) return
        ScrollTrigger.refresh()

        const totalMove = track.scrollWidth - window.innerWidth

        gsap.to(track, {
          x: -totalMove,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => '+=' + totalMove,
            pin: true,
            scrub: 1.2,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="work" ref={sectionRef} className="bg-[#04050e]">

      {/* Section heading — visible above horizontal track */}
      <div ref={headRef} className="px-6 md:px-12 lg:px-16 pt-20 md:pt-28 pb-10 max-w-[1400px] mx-auto lg:absolute lg:top-0 lg:left-0 lg:right-0 lg:z-20 lg:pointer-events-none lg:opacity-0">
        {/* Mobile header only — desktop header is overlaid by pin */}
        <p className="lg:hidden text-white/25 text-xs uppercase tracking-[0.3em] mb-5">Selected Work</p>
        <h2 className="lg:hidden font-display font-black leading-none" style={{ fontSize: 'clamp(2rem, 8vw, 7rem)', letterSpacing: '-0.04em' }}>
          {['Projects', 'That', 'Deliver.'].map((w, i) => (
            <span key={i} className="block overflow-hidden">
              <span className={`work-h-word inline-block opacity-0 will-change-transform ${i !== 2 ? 'text-white' : ''}`}>
                {i === 2 ? (
                  <GradientText colors={['#60a5fa', '#818cf8', '#a78bfa', '#c084fc', '#60a5fa']} animationSpeed={6}>
                    {w}
                  </GradientText>
                ) : w}
              </span>
            </span>
          ))}
        </h2>
      </div>

      {/* DESKTOP: horizontal scroll track */}
      <div
        ref={trackRef}
        className="hidden lg:flex will-change-transform"
        style={{ width: `${projects.length * 100}vw` }}
      >
        {projects.map((p, i) => (
          <ProjectPanel key={p.id} project={p} index={i} onOpen={() => setActiveProject(p)} />
        ))}
      </div>

      {/* MOBILE: vertical card grid */}
      <div className="lg:hidden px-4 sm:px-5 pb-20 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} onOpen={() => setActiveProject(p)} />
        ))}
      </div>

      {/* Modal */}
      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </section>
  )
}
