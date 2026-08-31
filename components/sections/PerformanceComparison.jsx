'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ArrowRight, Gauge, Zap, TrendingUp, ShieldCheck, CheckCircle2, XCircle } from 'lucide-react'

const studies = [
  {
    id: 'silverspoon',
    name: 'Silver Spoon by ACJ',
    category: 'Luxury E-Commerce',
    narrative: 'Re-engineered from a sluggish legacy theme into a headless Next.js 15 storefront with sub-second LCP and optimized checkout checkout funnel.',
    before: {
      lcp: '4.8s',
      pagespeed: 38,
      bundle: '3.8 MB',
      conversion: '1.2%',
      issues: ['High bounce rate on mobile', 'Render-blocking JavaScript', 'Slow checkout dropoff'],
    },
    after: {
      lcp: '0.68s',
      pagespeed: 99,
      bundle: '82 KB',
      conversion: '4.6%',
      results: ['+280% online luxury sales', '100/100 Core Web Vitals', 'Sub-second search indexing'],
    },
  },
  {
    id: 'chahana',
    name: 'Chahana Dental Studio',
    category: 'Healthcare & Clinical',
    narrative: 'Overhauled legacy architecture with structured JSON-LD Schema markup, instant appointment booking flow, and sub-second mobile performance.',
    before: {
      lcp: '5.2s',
      pagespeed: 32,
      bundle: '4.2 MB',
      conversion: '0.8%',
      issues: ['Page 4 Google search ranking', 'Unresponsive mobile layout', 'No structured clinical schema'],
    },
    after: {
      lcp: '0.55s',
      pagespeed: 100,
      bundle: '64 KB',
      conversion: '3.8%',
      results: ['#1 Google Rank for 12 local keywords', '3.4x weekly patient bookings', 'WCAG 2.2 AA accessibility'],
    },
  },
  {
    id: 'vibo',
    name: 'Vibo ERP Platform',
    category: 'Cloud SaaS Platform',
    narrative: 'Migrated fragmented backend monolith into high-throughput distributed PostgreSQL microservices with real-time WebSockets synchronization.',
    before: {
      lcp: '3.9s',
      pagespeed: 45,
      bundle: '5.1 MB',
      conversion: '97.5% Uptime',
      issues: ['3,200ms database query latency', 'Frequent connection pool drops', 'High cloud server costs'],
    },
    after: {
      lcp: '0.48s',
      pagespeed: 98,
      bundle: '110 KB',
      conversion: '99.99% Uptime',
      results: ['18ms avg query response time', '3M+ daily transactions handled', '55% reduction in cloud infra spend'],
    },
  },
]

export default function PerformanceComparison() {
  const [selectedId, setSelectedId] = useState('silverspoon')
  const activeStudy = studies.find((s) => s.id === selectedId) || studies[0]

  return (
    <section className="py-16 sm:py-24 md:py-32 max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8 border-t border-white/[0.06]">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
        <span className="glow-pill mb-4 inline-flex">
          Empirical Engineering Benchmarks
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
          Before vs. After:{' '}
          <span className="text-gradient-accent">Measurable Transformation.</span>
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-white/50 leading-relaxed">
          We don&apos;t just deliver &ldquo;clean code&rdquo; — we engineer radical improvements in Core Web Vitals, speed index, and revenue conversion metrics.
        </p>
      </div>

      {/* Case Selector Tabs */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap mb-10 sm:mb-12">
        {studies.map((s) => {
          const isActive = s.id === selectedId
          return (
            <button
              key={s.id}
              onClick={() => setSelectedId(s.id)}
              className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-white/[0.04] text-white/60 hover:text-white hover:bg-white/[0.08] border border-white/10'
              }`}
            >
              {s.name} <span className="opacity-60 text-[10px] ml-1">({s.category})</span>
            </button>
          )
        })}
      </div>

      {/* Comparison Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStudy.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch"
        >
          {/* Left Column: Legacy / Before */}
          <div className="lg:col-span-6 rounded-3xl bg-red-950/[0.08] border border-red-500/20 p-5 sm:p-8 md:p-10 flex flex-col justify-between space-y-6 sm:space-y-8">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-red-500/15 mb-6">
                <div className="flex items-center gap-2">
                  <XCircle size={18} className="text-red-400" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-400">
                    Legacy Architecture (Before)
                  </span>
                </div>
                <span className="text-xs text-white/35 font-mono">Audited Baseline</span>
              </div>

              {/* Metric Row */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 sm:mb-8">
                <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-black/40 border border-white/[0.06] text-center">
                  <div className="text-[9px] sm:text-[10px] font-mono text-white/55 uppercase mb-0.5 sm:mb-1">PageSpeed</div>
                  <div className="text-lg sm:text-2xl font-extrabold text-red-400 font-mono">{activeStudy.before.pagespeed}/100</div>
                </div>
                <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-black/40 border border-white/[0.06] text-center">
                  <div className="text-[9px] sm:text-[10px] font-mono text-white/55 uppercase mb-0.5 sm:mb-1">LCP Latency</div>
                  <div className="text-lg sm:text-2xl font-extrabold text-red-400 font-mono">{activeStudy.before.lcp}</div>
                </div>
                <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-black/40 border border-white/[0.06] text-center">
                  <div className="text-[9px] sm:text-[10px] font-mono text-white/55 uppercase mb-0.5 sm:mb-1">JS Payload</div>
                  <div className="text-lg sm:text-2xl font-extrabold text-red-400 font-mono">{activeStudy.before.bundle}</div>
                </div>
              </div>

              {/* Problems list */}
              <div className="space-y-2 sm:space-y-2.5">
                <div className="text-xs font-mono uppercase tracking-wider text-white/55 mb-2.5 sm:mb-3">
                  Critical Bottlenecks Identified
                </div>
                {activeStudy.before.issues.map((issue) => (
                  <div key={issue} className="flex items-center gap-2 text-xs text-white/60">
                    <XCircle size={14} className="text-red-400 shrink-0" />
                    <span>{issue}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-red-500/10 border border-red-500/15 text-xs text-red-300 font-medium">
              Baseline Conversion: <span className="font-bold text-white font-mono">{activeStudy.before.conversion}</span>
            </div>
          </div>

          {/* Right Column: Mehta Tech Next.js 15 / After */}
          <div className="lg:col-span-6 rounded-3xl bg-blue-950/[0.12] border border-blue-500/30 p-5 sm:p-8 md:p-10 flex flex-col justify-between space-y-6 sm:space-y-8 shadow-2xl shadow-blue-950/40 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-emerald-400 to-transparent" />

            <div>
              <div className="flex items-center justify-between pb-4 border-b border-blue-500/20 mb-6">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-emerald-400" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                    Mehta Tech (After)
                  </span>
                </div>
                <span className="text-xs text-emerald-400/80 font-mono font-bold">100/100 Core Web Vitals</span>
              </div>

              {/* Metric Row */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 sm:mb-8">
                <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#07080C] border border-emerald-500/30 text-center">
                  <div className="text-[9px] sm:text-[10px] font-mono text-white/55 uppercase mb-0.5 sm:mb-1">PageSpeed</div>
                  <div className="text-lg sm:text-2xl font-extrabold text-emerald-400 font-mono">{activeStudy.after.pagespeed}/100</div>
                </div>
                <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#07080C] border border-emerald-500/30 text-center">
                  <div className="text-[9px] sm:text-[10px] font-mono text-white/55 uppercase mb-0.5 sm:mb-1">LCP Latency</div>
                  <div className="text-lg sm:text-2xl font-extrabold text-emerald-400 font-mono">{activeStudy.after.lcp}</div>
                </div>
                <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#07080C] border border-emerald-500/30 text-center">
                  <div className="text-[9px] sm:text-[10px] font-mono text-white/55 uppercase mb-0.5 sm:mb-1">JS Payload</div>
                  <div className="text-lg sm:text-2xl font-extrabold text-emerald-400 font-mono">{activeStudy.after.bundle}</div>
                </div>
              </div>

              {/* Results list */}
              <div className="space-y-2 sm:space-y-2.5">
                <div className="text-xs font-mono uppercase tracking-wider text-white/55 mb-2.5 sm:mb-3">
                  Verified Production Outcomes
                </div>
                {activeStudy.after.results.map((res) => (
                  <div key={res} className="flex items-center gap-2 text-xs text-white/80 font-medium">
                    <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                    <span>{res}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 font-medium flex items-center justify-between">
              <span>Conversion: <strong className="text-white font-mono">{activeStudy.after.conversion}</strong></span>
              <span className="text-[10px] sm:text-[11px] font-mono uppercase bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-300">Verified</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
