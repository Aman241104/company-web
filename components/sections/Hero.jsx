'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Sparkles, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react'
import ViboERPDashboard from '@/components/ui/ViboERPDashboard'

const showcaseProjects = [
  {
    id: 'vibo',
    tabName: 'Vibo ERP',
    category: 'SaaS Platform',
    url: 'app.viboerp.com',
    link: null,
    metric: '2,400+ Active Users',
    type: 'component',
    Component: ViboERPDashboard,
  },
  {
    id: 'saas-cloud',
    tabName: 'Cloud & AI Platform',
    category: 'Enterprise Infrastructure',
    url: 'cloud.mehtatechnologies.com',
    link: null,
    metric: '99.99% Enterprise SLA',
    type: 'image',
    image: '/assets/saas_hero_visual.jpg',
  },
  {
    id: 'silverspoon',
    tabName: 'Silver Spoon',
    category: 'Luxury E-Commerce',
    url: 'silverspoonbyacj.com',
    link: 'https://silverspoonbyacj.com',
    metric: '+280% Online Sales',
    type: 'image',
    image: '/silverspoon-screenshot.png',
  },
  {
    id: 'stylux',
    tabName: 'Stylux Interiors',
    category: 'Interior Design',
    url: 'styluxinteriors.com',
    link: 'https://interior-web-mu.vercel.app/',
    metric: '90-Day Turnkey Delivery',
    type: 'image',
    image: '/interior.png',
  },
  {
    id: 'jjfilms',
    tabName: 'JJ Films',
    category: 'Cinematic Media',
    url: 'jjfilms.in',
    link: 'https://jjfilms.vercel.app/',
    metric: '4K Ultra-Fast Streaming',
    type: 'image',
    image: '/jjfilms.png',
  },
]

export default function Hero() {
  const [activeTab, setActiveTab] = useState(showcaseProjects[0])

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Subtle Ambient Radial Highlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/[0.07] rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-[1360px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-5 max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="glow-pill mb-6 inline-flex">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for Q3/Q4 · 150+ Shipped
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-white leading-[1.08] tracking-tight mb-6"
            >
              Engineering digital products that{' '}
              <span className="text-gradient-accent">scale businesses.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="text-base sm:text-lg text-white/60 leading-relaxed mb-8 font-normal"
            >
              We design, build, and scale high-performance web platforms, mobile apps, and custom software for ambitious businesses worldwide.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3.5"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold bg-white text-black hover:bg-white/90 active:scale-[0.98] transition-all shadow-lg shadow-white/10"
              >
                Start Your Project <ArrowRight size={15} />
              </Link>
              <a
                href="#work"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-sm font-medium text-white/80 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 transition-all"
              >
                Explore Selected Work
              </a>
            </motion.div>

            {/* Proof Metric Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.55, delay: 0.45 }}
              className="grid grid-cols-3 gap-6 pt-10 mt-10 border-t border-white/[0.08]"
            >
              <div>
                <div className="text-2xl font-bold text-white tracking-tight">150+</div>
                <div className="text-xs text-white/45 mt-0.5">Projects Delivered</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white tracking-tight">99.9%</div>
                <div className="text-xs text-white/45 mt-0.5">Uptime & SLA</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white tracking-tight">4.9/5</div>
                <div className="text-xs text-white/45 mt-0.5">Client Rating</div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Live Interactive Device Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="rounded-2xl border border-white/10 bg-[#0B0D14]/90 backdrop-blur-2xl shadow-2xl shadow-black/80 overflow-hidden">
              
              {/* Tab Selector Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                  {showcaseProjects.map((p) => {
                    const isActive = activeTab.id === p.id
                    return (
                      <button
                        key={p.id}
                        onClick={() => setActiveTab(p)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                          isActive
                            ? 'bg-white/10 text-white border border-white/15 shadow-sm'
                            : 'text-white/50 hover:text-white/80 hover:bg-white/[0.04]'
                        }`}
                      >
                        {p.tabName}
                      </button>
                    )
                  })}
                </div>

                <div className="hidden sm:flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-[11px] font-medium text-blue-400">
                    <CheckCircle2 size={11} /> {activeTab.metric}
                  </span>
                </div>
              </div>

              {/* Browser Window Chrome */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-black/40 border-b border-white/[0.06] text-xs text-white/40">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  </div>
                </div>
                <div className="px-4 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-[11px] font-mono text-white/50 truncate max-w-[240px] sm:max-w-[320px]">
                  https://{activeTab.url}
                </div>
                <div>
                  {activeTab.link ? (
                    <a
                      href={activeTab.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Visit <ExternalLink size={10} />
                    </a>
                  ) : (
                    <span className="text-[10px] text-white/30 font-medium uppercase tracking-wider">Product</span>
                  )}
                </div>
              </div>

              {/* Showcase Body Preview */}
              <div className="relative min-h-[340px] sm:min-h-[420px] bg-[#07080C] overflow-hidden flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                    className="w-full h-full"
                  >
                    {activeTab.type === 'component' ? (
                      <div className="p-4 sm:p-6">
                        <ViboERPDashboard />
                      </div>
                    ) : (
                      <div className="relative w-full h-[340px] sm:h-[420px]">
                        <Image
                          src={activeTab.image}
                          alt={activeTab.tabName}
                          fill
                          className="object-cover object-top"
                          priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#07080C] via-transparent to-transparent opacity-60" />
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
