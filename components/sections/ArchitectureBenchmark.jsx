'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code2, Database, Cloud, ShieldCheck, Cpu, Layers, Sparkles, Check, Activity } from 'lucide-react'

const benchmarkCategories = [
  {
    id: 'frontend',
    title: 'Frontend & Rendering',
    icon: Code2,
    mehtaStack: 'Next.js 15 App Router + React 19 Server Components',
    legacyStack: 'Legacy Single-Page Apps (Client-Side Rendering)',
    metrics: [
      { name: 'Time to First Byte (TTFB)', mehta: '45ms (Edge SSR)', legacy: '650ms (Origin Node)', diff: '14x Faster' },
      { name: 'Initial JavaScript Bundle', mehta: '68 KB (Zero Runtime CSS)', legacy: '520 KB (Bloated SPA)', diff: '87% Smaller' },
      { name: 'Search Engine Hydration', mehta: 'Instant HTML Pre-Render', legacy: 'Empty root <div> (Delayed)', diff: '100% Crawl Rate' },
      { name: 'Interaction to Next Paint (INP)', mehta: '< 16ms (60 FPS)', legacy: '180ms (Main thread block)', diff: 'Ultra Smooth' },
    ],
  },
  {
    id: 'backend',
    title: 'Database & API Throughput',
    icon: Database,
    mehtaStack: 'Distributed PostgreSQL + Redis Edge Cache + pgBouncer',
    legacyStack: 'Traditional Monolithic Shared MySQL / Single Instance',
    metrics: [
      { name: 'Peak Concurrent Queries', mehta: '25,000+ Req/sec', legacy: '1,200 Req/sec (Thread lock)', diff: '20x Scale' },
      { name: 'Average Query Execution', mehta: '12ms (Read-replicated)', legacy: '140ms (Sequential scan)', diff: '11x Quicker' },
      { name: 'Cache Hit Ratio', mehta: '94.8% (Redis Memory)', legacy: 'None / Disk Bound', diff: 'Sub-millisecond' },
      { name: 'Disaster Recovery (RTO)', mehta: '< 5 Minutes (Point-in-time)', legacy: '24+ Hours (Manual dump)', diff: 'Instant Rollback' },
    ],
  },
  {
    id: 'infra',
    title: 'Cloud Infra & Global Edge',
    icon: Cloud,
    mehtaStack: 'Multi-Region Serverless Edge + Cloudflare Tier 1 CDN',
    legacyStack: 'Single-Zone Unmanaged VPS Droplet',
    metrics: [
      { name: 'Global Edge Availability', mehta: '300+ Edge POPs Worldwide', legacy: '1 Datacenter location', diff: 'Global Reach' },
      { name: 'Automated DDoS Mitigation', mehta: 'Unlimited L3/L4/L7 Shielding', legacy: 'Manual firewall rule setup', diff: 'Zero Downtime' },
      { name: 'SSL Handshake Latency', mehta: '8ms (0-RTT TLS 1.3)', legacy: '95ms (Legacy TLS)', diff: '12x Faster' },
      { name: 'Cloud SLA Guarantee', mehta: '99.99% Guaranteed SLA', legacy: 'No formal uptime SLA', diff: 'Enterprise Grade' },
    ],
  },
]

export default function ArchitectureBenchmark() {
  const [activeTab, setActiveTab] = useState('frontend')
  const activeData = benchmarkCategories.find((c) => c.id === activeTab) || benchmarkCategories[0]

  return (
    <section id="architecture-benchmark" className="py-16 sm:py-24 md:py-32 max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8 border-t border-white/[0.06]">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
        <span className="glow-pill mb-4 inline-flex">
          Stack Specifications
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
          Engineered on modern standards.{' '}
          <span className="text-gradient-accent">Zero legacy debt.</span>
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-white/50 leading-relaxed">
          See how our Next.js 15, PostgreSQL, and global edge architectures outperform traditional software agency builds.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-10 sm:mb-12">
        {benchmarkCategories.map((cat) => {
          const Icon = cat.icon
          const isActive = cat.id === activeTab
          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-3.5 sm:px-5 py-2 sm:py-3 rounded-full text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-white/[0.04] text-white/60 hover:text-white hover:bg-white/[0.08] border border-white/10'
              }`}
            >
              <Icon size={14} />
              <span>{cat.title}</span>
            </button>
          )
        })}
      </div>

      {/* Benchmark Matrix Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeData.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3 }}
          className="rounded-3xl bg-white/[0.02] border border-white/[0.08] p-5 sm:p-10 shadow-2xl shadow-black/50"
        >
          {/* Header comparison banner */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 pb-6 sm:pb-8 mb-6 sm:mb-8 border-b border-white/[0.08]">
            <div className="p-4 sm:p-5 rounded-2xl bg-blue-500/10 border border-blue-500/30 space-y-1">
              <div className="text-[11px] font-mono uppercase tracking-wider text-blue-400 font-bold">
                Mehta Technologies Architecture
              </div>
              <div className="text-sm sm:text-base font-extrabold text-white">
                {activeData.mehtaStack}
              </div>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-1">
              <div className="text-[11px] font-mono uppercase tracking-wider text-white/55 font-bold">
                Conventional Legacy Standard
              </div>
              <div className="text-sm sm:text-base font-semibold text-white/60">
                {activeData.legacyStack}
              </div>
            </div>
          </div>

          {/* Metric Comparison Rows */}
          <div className="space-y-3 sm:space-y-4">
            {activeData.metrics.map((m) => (
              <div
                key={m.name}
                className="p-4 sm:p-5 rounded-2xl bg-white/[0.015] border border-white/[0.06] hover:border-white/15 transition-all grid grid-cols-1 sm:grid-cols-12 gap-2.5 sm:gap-4 items-center"
              >
                <div className="sm:col-span-4">
                  <div className="text-xs font-bold text-white tracking-tight">{m.name}</div>
                </div>

                <div className="sm:col-span-3">
                  <div className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                    {m.mehta}
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <div className="text-xs font-mono text-white/55">
                    {m.legacy}
                  </div>
                </div>

                <div className="sm:col-span-2 text-left sm:text-right">
                  <span className="inline-block px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-bold bg-blue-500/15 border border-blue-500/30 text-blue-300">
                    {m.diff}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Live Telemetry Ping */}
          <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/[0.06] flex items-center justify-between flex-wrap gap-3 text-xs text-white/55 font-mono">
            <div className="flex items-center gap-2 text-emerald-400">
              <Activity size={14} className="animate-pulse" />
              <span>Real-time benchmark passing on edge nodes</span>
            </div>
            <span>SLA: 99.99% Cloud Uptime</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
