'use client'
import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Cloud, 
  ShoppingBag, 
  Bot, 
  TrendingUp, 
  ArrowUpRight, 
  ShieldCheck, 
  Zap, 
  Activity, 
  Maximize2,
  CheckCircle2
} from 'lucide-react'
import BorderBeam from '@/components/ui/BorderBeam'

const archetypes = [
  {
    id: 'saas',
    label: 'Enterprise SaaS',
    icon: Cloud,
    tag: 'Cloud ERP v2.4',
    url: 'app.viboerp.com/analytics',
    image: '/assets/saas_hero_mockup.png',
    imageFit: 'contain',
    title: 'Vibo ERP — Multi-Tenant Cloud Architecture',
    subtitle: 'Automated billing, inventory matrix, and AI copilots for 2,400+ enterprises.',
    metrics: [
      { label: 'Cloud Uptime', val: '99.99%', highlight: true },
      { label: 'Edge TTFB', val: '42ms' },
      { label: 'Throughput', val: '98.4%' },
      { label: 'Active Users', val: '14.8k' },
    ],
    pills: ['PostgreSQL RLS', 'Stripe & Razorpay', 'Schema Isolation', 'Real-time WebSocket'],
  },
  {
    id: 'commerce',
    label: 'Luxury Commerce',
    icon: ShoppingBag,
    tag: 'Headless Storefront',
    url: 'silverspoonbyacj.com',
    image: '/assets/silver_spoon_mockup.jpg',
    title: 'Argentum / Silver Spoon — Bespoke E-Commerce',
    subtitle: 'High-converting luxury silverware and fine jewelry storefront with sub-second checkout.',
    metrics: [
      { label: 'LCP Score', val: '0.6s', highlight: true },
      { label: 'Sales Growth', val: '+280%' },
      { label: 'Mobile Conv', val: '3.4x' },
      { label: 'Cart Latency', val: '140ms' },
    ],
    pills: ['Shopify Plus', 'Next.js 15 SSR', 'Tailwind CSS', 'Instant Search'],
  },
  {
    id: 'ai',
    label: 'AI Agent Workflows',
    icon: Bot,
    tag: 'Neural Hub',
    url: 'agents.mehtatechnologies.com',
    image: '/assets/ai_agent_mockup.jpg',
    title: 'Autonomous AI Agent Orchestration Engine',
    subtitle: 'Real-time multi-agent execution traces, streaming token telemetry, and self-healing pipelines.',
    metrics: [
      { label: 'Throughput', val: '4.1k t/s', highlight: true },
      { label: 'Router Latency', val: '12ms' },
      { label: 'Active Agents', val: '142' },
      { label: 'Error Rate', val: '0.05%' },
    ],
    pills: ['LangChain / LangGraph', 'Vector RAG', 'Function Calling', 'OpenAI & Claude-3'],
  },
  {
    id: 'fintech',
    label: 'Fintech & Trading',
    icon: TrendingUp,
    tag: 'High-Frequency',
    url: 'terminal.nexusfintech.io',
    image: '/assets/fintech_mockup.jpg',
    title: 'Algorithmic Treasury & Liquidity Router',
    subtitle: 'Ultra-low latency multi-currency order book, real-time charting, and bank-grade security.',
    metrics: [
      { label: 'Execution Speed', val: '2.17ms', highlight: true },
      { label: 'Liquidity Routed', val: '$1.96B' },
      { label: 'Precision', val: '99.999%' },
      { label: 'Slippage', val: '0.001%' },
    ],
    pills: ['WebSocket Feeds', 'Financial Charting', 'Hardware Vaults', 'ISO 27001'],
  },
]

export default function HeroInteractiveShowcase() {
  const [activeTab, setActiveTab] = useState(archetypes[0])
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })
  const containerRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -3.5
    const rotateY = ((x - centerX) / centerX) * 3.5
    setTilt({ rotateX, rotateY })
  }

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 })
  }

  return (
    <div className="w-full max-w-5xl mx-auto mt-12 sm:mt-16">
      {/* Archetype Selector Tabs */}
      <div className="flex justify-center mb-5 px-2">
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl overflow-x-auto max-w-full no-scrollbar shadow-xl shadow-black/40">
          {archetypes.map((arch) => {
            const Icon = arch.icon
            const isActive = activeTab.id === arch.id
            return (
              <button
                key={arch.id}
                onClick={() => setActiveTab(arch)}
                className={`relative flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'text-white shadow-lg'
                    : 'text-white/50 hover:text-white/80 hover:bg-white/[0.04]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="hero-active-tab-glow"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/90 to-indigo-600/90 border border-blue-400/30 shadow-[0_0_20px_rgba(59,130,246,0.35)]"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <Icon size={14} className={`relative z-10 ${isActive ? 'text-white' : 'text-white/55'}`} />
                <span className="relative z-10">{arch.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* 3D Tilt Showcase Window */}
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          transformPerspective: 1200,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        className="relative rounded-3xl bg-[#090B12]/90 border border-white/10 p-2.5 sm:p-4 backdrop-blur-2xl shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_50px_rgba(37,99,235,0.12)] overflow-hidden"
      >
        {/* Animated Perimeter Border Beam */}
        <BorderBeam size={240} duration={10} colorFrom="#3b82f6" colorTo="#a855f7" />

        {/* Browser Mockup Top Bar */}
        <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 mb-2.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" />
            </div>
            <div className="hidden sm:flex items-center gap-1.5 ml-3 px-3 py-1 rounded-md bg-black/40 border border-white/[0.06] text-[11px] font-mono text-white/50">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-semibold">https://</span>
              <span>{activeTab.url}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-blue-500/15 border border-blue-500/25 text-blue-400">
              {activeTab.tag}
            </span>
            <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Production Live</span>
            </div>
          </div>
        </div>

        {/* Dynamic Image & Live State Canvas */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="w-full rounded-2xl overflow-hidden border border-white/10 group bg-[#050608]"
          >
            {/* Image Canvas Container */}
            <div className={`relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[#050608] ${activeTab.imageFit === 'contain' ? 'p-8 sm:p-12' : ''}`}>
              <Image
                src={activeTab.image}
                alt={activeTab.title}
                fill
                loading="eager"
                fetchPriority="high"
                sizes="(max-width: 1024px) 100vw, 60vw"
                className={activeTab.imageFit === 'contain'
                  ? 'object-contain object-center transition-transform duration-700 group-hover:scale-[1.03]'
                  : 'object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]'}
              />

              {/* Desktop-only Ambient Dark Bottom Gradient */}
              <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-[#080A12] via-[#080A12]/30 to-transparent opacity-95" />

              {/* Desktop-only Bottom Overlay */}
              <div className="hidden sm:flex absolute bottom-0 inset-x-0 p-6 flex-col justify-end">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div className="max-w-md">
                    <h4 className="text-lg md:text-xl font-bold text-white tracking-tight drop-shadow-md">
                      {activeTab.title}
                    </h4>
                    <p className="text-xs md:text-sm text-white/70 mt-1 font-normal leading-relaxed drop-shadow">
                      {activeTab.subtitle}
                    </p>
                  </div>

                  {/* 4 Metric Pills */}
                  <div className="grid grid-cols-4 gap-2 bg-black/70 backdrop-blur-md p-2 rounded-xl border border-white/10">
                    {activeTab.metrics.map((m) => (
                      <div key={m.label} className="text-center px-2 py-1">
                        <div className={`text-xs sm:text-sm font-extrabold font-mono ${m.highlight ? 'text-blue-400' : 'text-white'}`}>
                          {m.val}
                        </div>
                        <div className="text-[10px] text-white/55 font-medium tracking-tight">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile-only Content Card (Clean separation below image with zero image overlap) */}
            <div className="sm:hidden p-4 bg-[#090B14] border-t border-white/[0.08] space-y-3">
              <div>
                <h4 className="text-sm font-bold text-white tracking-tight">
                  {activeTab.title}
                </h4>
                <p className="text-xs text-white/60 mt-1 leading-relaxed">
                  {activeTab.subtitle}
                </p>
              </div>

              {/* 4 Metric Pills on Mobile */}
              <div className="grid grid-cols-2 gap-2 bg-white/[0.03] p-2 rounded-xl border border-white/[0.06]">
                {activeTab.metrics.map((m) => (
                  <div key={m.label} className="text-center p-1.5 rounded-lg bg-black/40">
                    <div className={`text-xs font-extrabold font-mono ${m.highlight ? 'text-blue-400' : 'text-white'}`}>
                      {m.val}
                    </div>
                    <div className="text-[9px] text-white/55 font-medium">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Feature Badges Footer */}
        <div className="flex items-center justify-between flex-wrap gap-2 pt-3 px-2">
          <div className="flex items-center flex-wrap gap-1.5">
            {activeTab.pills.map((pill) => (
              <span
                key={pill}
                className="text-[10px] sm:text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-white/[0.04] text-white/60 border border-white/[0.08]"
              >
                {pill}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors">
            <span>Milestone-Guaranteed SLA</span>
            <CheckCircle2 size={13} className="text-emerald-400" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
