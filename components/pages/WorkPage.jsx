'use client'
import { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useClearanceGuard } from '@/lib/useClearanceGuard'
import { cardGridContainer, cardSpringItem } from '@/lib/motionVariants'

const categories = ['All', 'Web', 'E-Commerce', 'SaaS', 'Media']

// Real project data only (lib/ + public/assets, per research/design-system-v2.md —
// no invented projects, stats, or client logos). Each entry additionally carries
// an `accent` — an editorial art-direction color for that project's card (tag
// pill / overlaid stat text / the block background for the one project with no
// live screenshot yet), loosely evoking that client's industry the way
// composite.global tints each case-study card with the client's own brand color.
// This is presentation styling, not a factual claim about the client's brand.
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
    accent: '#B5652D',
    featured: true,
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
    result: '252+ SKU Catalog',
    accent: '#9C3B2E',
    featured: true,
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
    accent: '#5B6169',
    featured: true,
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
    accent: '#0A1124',
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
    accent: '#2C6E6B',
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
    accent: '#1F4E5F',
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
    accent: '#7A2E3A',
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
    accent: '#1E2A3A',
    featured: true,
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
    accent: '#5A2A52',
    featured: true,
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
    accent: '#22344A',
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
    accent: '#24425C',
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
    accent: '#B23A6B',
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
    accent: '#2F6F4E',
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
    accent: '#3E5064',
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
    accent: '#6E1F2C',
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
    accent: '#9C5A34',
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
    accent: '#4A5468',
  },
]

const featuredProjects = projects.filter((p) => p.featured)

// Three reused button primitives (design-system-v2.md's "button/affordance
// system, reused consistently") instead of one-off classes per section.
const btnPrimary =
  'inline-flex items-center justify-center gap-1.5 rounded-full text-xs font-semibold bg-[#1F4FFF] text-white hover:bg-[#1A3FD6] transition-all'
const btnSecondary =
  'inline-flex items-center justify-center gap-1.5 rounded-full text-xs font-semibold bg-white hover:bg-[#0A1124]/[0.03] text-[#0A1124] border border-[#0A1124]/15 hover:border-[#0A1124]/25 transition-all'
const btnIconCircle =
  'w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#0A1124]/15 bg-white hover:bg-[#0A1124]/[0.04] hover:border-[#0A1124]/30 text-[#0A1124] flex items-center justify-center transition-all disabled:opacity-30 disabled:pointer-events-none'

function ProjectTag({ label, accent }) {
  return (
    <span
      className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold backdrop-blur-md border"
      style={{ color: accent, borderColor: `${accent}55`, backgroundColor: `${accent}14` }}
    >
      {label}
    </span>
  )
}

// Bespoke, per-project card: real photography, that project's own accent
// tint on the tag pills, and the real metric set directly into the photo —
// not a uniform white icon-square card. `size` varies the card between the
// horizontal rail (tall, one column of copy) and the filterable grid below.
function ProjectCard({ project, size = 'grid' }) {
  const isRail = size === 'rail'

  return (
    <motion.div
      variants={cardSpringItem}
      className={`group rounded-3xl bg-white border border-[#0A1124]/10 overflow-hidden flex flex-col shadow-sm hover:shadow-lg transition-shadow duration-300 h-full ${
        isRail ? 'w-[300px] sm:w-[360px] shrink-0 snap-start' : ''
      }`}
    >
      {/* Visual Cover — full-bleed real photography, this project's accent
          used for the tag pills and the stat set directly onto the photo. */}
      <div
        className={`relative overflow-hidden ${isRail ? 'aspect-[3/4]' : 'aspect-[16/10]'} ${
          project.imageFit === 'contain' ? 'p-6' : ''
        }`}
        style={{ backgroundColor: project.image ? '#E7EDF8' : project.accent }}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes={isRail ? '360px' : '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'}
            className={
              project.imageFit === 'contain'
                ? 'object-contain object-center group-hover:scale-[1.03] transition-transform duration-500'
                : 'object-cover object-top group-hover:scale-105 transition-transform duration-500'
            }
          />
        ) : project.inProgress ? (
          <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 text-center px-4">
            <span className="text-[10px] font-mono uppercase tracking-wider text-white/70">Build In Progress</span>
            <span className="text-xs text-white/90">Preview coming at launch</span>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center font-bold text-2xl text-white/70">
            {project.name.slice(0, 2).toUpperCase()}
          </div>
        )}

        {/* Gradient scrim so the overlaid pill/stat stay legible over any photo */}
        {project.image && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/10 pointer-events-none" />
        )}

        {/* Category tag — outlined pill, tinted with this project's accent */}
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
          <ProjectTag label={project.category} accent={project.image ? '#FFFFFF' : project.accent} />
        </div>

        {/* Real result, set directly into the photo — large, not a separate badge component */}
        {project.result && (
          <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
            <div className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-white/70 mb-0.5">
              {project.year}
            </div>
            <div className="text-base sm:text-lg font-extrabold text-white tracking-tight leading-tight">
              {project.result}
            </div>
          </div>
        )}
      </div>

      {/* Content Body */}
      <div className="p-6 sm:p-7 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="text-lg sm:text-xl font-bold text-[#0A1124] tracking-tight">
            {project.name}
          </h3>
        </div>

        <p className="text-xs font-medium mb-3" style={{ color: project.accent }}>
          {project.subtitle}
        </p>

        <p className="text-xs sm:text-sm text-[#0A1124]/60 leading-relaxed font-normal mb-5">
          {project.desc}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 pt-4 mt-auto border-t border-[#0A1124]/[0.06] mb-5">
          {project.tags.map((t) => (
            <span
              key={t}
              className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[#0A1124]/[0.03] text-[#0A1124]/65 border border-[#0A1124]/10"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Footer Links — the 3-button system: solid accent primary for the
            proof-in-the-world action, outlined secondary for the deep-dive. */}
        <div className="space-y-2">
          {project.inProgress ? (
            <div className="w-full py-2.5 rounded-full text-xs font-medium text-[#0A1124]/50 border border-[#0A1124]/15 text-center">
              Build In Progress
            </div>
          ) : project.url ? (
            <a href={project.url} target="_blank" rel="noopener noreferrer" className={`w-full py-2.5 ${btnPrimary}`}>
              Visit Live Project <ArrowUpRight size={13} />
            </a>
          ) : (
            <div className="w-full py-2.5 rounded-full text-xs font-medium text-[#0A1124]/50 border border-[#0A1124]/15 text-center">
              Enterprise Client IP Protected
            </div>
          )}
          {project.slug && (
            <Link href={`/work/${project.slug}`} className={`w-full py-2.5 ${btnSecondary}`}>
              Read Case Study <ArrowRight size={12} />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// Signature interaction: horizontal-scroll, manually-controlled case-study
// rail (design-system-v2.md's "supporting motion / signature interaction"
// budget item) for the flagship, most-photographed real projects. Native
// touch/trackpad scrolling still works — the circular arrows are an
// additional, explicit control, not a replacement for it.
function FeaturedRail() {
  const railRef = useRef(null)

  const scrollRail = (dir) => {
    const el = railRef.current
    if (!el) return
    const card = el.querySelector('[data-rail-card]')
    const step = (card?.offsetWidth || 320) + 24
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  return (
    <section className="mb-28">
      <div className="max-w-[1360px] mx-auto px-6 md:px-8 flex items-end justify-between gap-6 mb-8">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-[#0A1124]/45 mb-3">
            Featured Case Studies
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A1124] tracking-tight">
            Real projects, art-directed one at a time.
          </h2>
        </div>
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <button type="button" aria-label="Scroll to previous case study" className={btnIconCircle} onClick={() => scrollRail(-1)}>
            <ChevronLeft size={16} />
          </button>
          <button type="button" aria-label="Scroll to next case study" className={btnIconCircle} onClick={() => scrollRail(1)}>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div
        ref={railRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pl-6 md:pl-[max(1.5rem,calc((100vw-1360px)/2+2rem))] pr-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {featuredProjects.map((p) => (
          <div key={p.slug} data-rail-card>
            <ProjectCard project={p} size="rail" />
          </div>
        ))}
      </div>

      {/* Mobile controls — the rail scrolls natively via touch above this
          breakpoint too, these just surface the same manual control. */}
      <div className="sm:hidden flex items-center gap-2 px-6 mt-4">
        <button type="button" aria-label="Scroll to previous case study" className={btnIconCircle} onClick={() => scrollRail(-1)}>
          <ChevronLeft size={16} />
        </button>
        <button type="button" aria-label="Scroll to next case study" className={btnIconCircle} onClick={() => scrollRail(1)}>
          <ChevronRight size={16} />
        </button>
      </div>
    </section>
  )
}

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const categoryPanelRef = useRef(null)

  // Guards the category panel from landing under the fixed floating
  // WhatsApp button on initial mobile load — see `lib/useClearanceGuard.ts`.
  // Round 1 measured this exact overlap on the "Media" row at 375x800.
  useClearanceGuard('--whatsapp-clearance', [categoryPanelRef])

  const filtered =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => (p.categoryFilter || p.category) === activeCategory)

  return (
    <div className="pt-32 pb-24 overflow-hidden">
      {/* Page Header — the filter bar isn't a separate row below a centered
          hero, it IS the right half of the hero: an asymmetric split
          instead of centered-pill-H1-subtext-then-tabs. */}
      <section className="max-w-[1360px] mx-auto px-6 md:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <div className="text-xs font-mono uppercase tracking-wider text-[#0A1124]/45 mb-4">
              Portfolio & Case Studies
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0A1124] tracking-tight leading-[1.08] mb-6">
              Engineering that drives measurable outcomes.
            </h1>
            <p className="text-base sm:text-lg text-[#0A1124]/60 leading-relaxed max-w-lg">
              150+ shipped production applications, luxury e-commerce storefronts, and cloud SaaS platforms.
            </p>
          </motion.div>

          <motion.div
            ref={categoryPanelRef}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="rounded-2xl bg-white border border-[#0A1124]/10 shadow-sm p-2 sm:p-2.5">
              <div className="px-3.5 pt-2.5 pb-1.5 text-[11px] font-mono uppercase tracking-wider text-[#0A1124]/45">
                Browse by category
              </div>
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
                    aria-pressed={isSelected}
                    className={`w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      isSelected
                        ? 'bg-[#1F4FFF]/10 text-[#1F4FFF]'
                        : 'text-[#0A1124]/65 hover:bg-[#0A1124]/[0.03] hover:text-[#0A1124]'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${isSelected ? 'bg-[#1F4FFF] text-white' : 'bg-[#0A1124]/[0.05] text-[#0A1124]/50'}`}>
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Signature horizontal case-study rail */}
      <FeaturedRail />

      {/* Full Portfolio Grid */}
      <section className="max-w-[1360px] mx-auto px-6 md:px-8 mb-28">
        <div className="text-xs font-mono uppercase tracking-wider text-[#0A1124]/45 mb-6">
          Full Portfolio
        </div>
        <motion.div
          key={activeCategory}
          variants={cardGridContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <ProjectCard key={p.name} project={p} size="grid" />
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Bottom CTA — a warm cream surface (the About page's own bottom CTA
          already carries the dark inverted-ink treatment; alternating which
          page does which keeps this a genuine rhythm, not a repeated tic). */}
      <section className="max-w-[1360px] mx-auto px-6 md:px-8 text-center">
        <div className="max-w-2xl mx-auto rounded-3xl bg-[#F4F7FC] border border-[#0A1124]/10 p-10 sm:p-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A1124] tracking-tight mb-4">
            Have a project in mind?
          </h2>
          <p className="text-sm sm:text-base text-[#0A1124]/60 mb-8 max-w-md mx-auto">
            Let us engineer a custom high-performance solution tailored to your roadmap.
          </p>
          <Link href="/contact" className={`px-8 py-4 ${btnPrimary}`}>
            Start a Conversation <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  )
}
