'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, ArrowRight, Zap, TrendingUp, Building2 } from 'lucide-react'

const segments = [
  {
    id: 'startups',
    tabName: 'For Early-Stage Founders',
    icon: Zap,
    badge: 'Launch Fast · Zero Bloat',
    headline: 'Go from concept to production-ready product in weeks.',
    desc: 'We partner with early-stage founders to scope, design, and engineer launch-ready MVPs. No unnecessary agency overhead—just high-velocity full-stack execution.',
    points: [
      'Comprehensive MVP scoping & interactive clickable Figma prototype',
      'Production-grade Next.js & mobile app architecture with clean scalable code',
      'Automated Stripe / Razorpay subscription billing & user authentication',
      'Founder-friendly sprint retainers & investor demo readiness',
    ],
    stats: [
      { val: '4–6 Wks', label: 'Average MVP Delivery' },
      { val: '3x', label: 'Faster than Hiring In-House' },
      { val: '100%', label: 'Full Code & IP Ownership' },
    ],
    highlightTag: 'Fast-Track Track',
    accentColor: 'from-blue-500/20 to-blue-600/5',
    borderColor: 'border-blue-500/30',
  },
  {
    id: 'scaleups',
    tabName: 'For Growing Teams & Scaleups',
    icon: TrendingUp,
    badge: 'Scale Capacity · Accelerate Roadmap',
    headline: 'Extend your engineering firepower without hiring bottlenecks.',
    desc: 'When feature backlogs outpace team capacity, we embed as high-output senior engineering partners—shipping critical modules, refactoring bottlenecks, and maintaining code health.',
    points: [
      'Dedicated engineering pods that seamlessly integrate with your sprints',
      'Automated CI/CD deployment pipelines, Docker environments & DevOps',
      'Database optimization, caching architectures & Core Web Vitals tuning',
      'Full-funnel performance marketing & ROAS-driven customer acquisition',
    ],
    stats: [
      { val: '40%+', label: 'Cost Savings vs Full-Time Team' },
      { val: '48 Hrs', label: 'Average Onboarding Time' },
      { val: '2.4k+', label: 'Concurrent Users Scaled' },
    ],
    highlightTag: 'Growth Accelerator',
    accentColor: 'from-purple-500/20 to-indigo-600/5',
    borderColor: 'border-purple-500/30',
  },
  {
    id: 'enterprises',
    tabName: 'For Enterprise Leaders',
    icon: Building2,
    badge: 'Enterprise Security · SLA Guaranteed',
    headline: 'Custom ERPs, cloud platforms, and mission-critical software.',
    desc: 'From bespoke multi-tenant SaaS to legacy system modernizations, we engineer systems that handle enterprise-grade complexity, data compliance, and multi-tier integrations.',
    points: [
      'Custom ERP, HRMS, and multi-warehouse supply chain platforms',
      'High-throughput REST/GraphQL APIs with microservice topologies',
      'Strict role-based access control (RBAC), audit logs & SOC2-ready practices',
      'Guaranteed 99.9% uptime SLAs with 24/7 dedicated engineering support',
    ],
    stats: [
      { val: '99.9%', label: 'Guaranteed Uptime SLA' },
      { val: '12 Mo', label: 'Included SLA Maintenance' },
      { val: '3M+', label: 'Daily Transactions Handled' },
    ],
    highlightTag: 'Enterprise Grade',
    accentColor: 'from-emerald-500/20 to-teal-600/5',
    borderColor: 'border-emerald-500/30',
  },
]

export default function Featured() {
  const [activeSegment, setActiveSegment] = useState(segments[0])

  return (
    <section id="featured" className="py-16 sm:py-24 md:py-32 max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8 border-t border-white/[0.06]">
      {/* Header */}
      <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16 md:mb-18">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="glow-pill mb-4 inline-flex">
            Strategic Fit
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            The right engineering team for{' '}
            <span className="text-gradient-accent">where you are today.</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-white/50 leading-relaxed">
            Whether launching your first MVP or scaling enterprise cloud infrastructure, our engagement models adapt directly to your business goals.
          </p>
        </motion.div>
      </div>

      {/* Interactive Tabs */}
      <div className="flex justify-center mb-10 sm:mb-12">
        <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] overflow-x-auto max-w-full no-scrollbar">
          {segments.map((seg) => {
            const Icon = seg.icon
            const isActive = activeSegment.id === seg.id
            return (
              <button
                key={seg.id}
                onClick={() => setActiveSegment(seg)}
                className={`flex items-center gap-2 px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-white text-black shadow-lg shadow-white/10 font-semibold'
                    : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Icon size={14} className={isActive ? 'text-blue-600' : 'text-white/40'} />
                <span>{seg.tabName}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Segment Content Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSegment.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35 }}
          className={`rounded-3xl bg-gradient-to-b ${activeSegment.accentColor} border ${activeSegment.borderColor} p-6 sm:p-10 lg:p-14 backdrop-blur-xl relative overflow-hidden shadow-2xl`}
        >
          {/* Subtle Ambient Light */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Scope details */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 border border-white/15 text-white mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {activeSegment.badge}
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
                {activeSegment.headline}
              </h3>

              <p className="text-base text-white/60 leading-relaxed mb-8 font-normal">
                {activeSegment.desc}
              </p>

              {/* Checklist */}
              <div className="space-y-3.5 mb-10">
                {activeSegment.points.map((pt) => (
                  <div key={pt} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-blue-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-white/80 font-normal leading-relaxed">{pt}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold bg-white text-black hover:bg-white/90 active:scale-[0.98] transition-all shadow-md shadow-white/10"
                >
                  Discuss Your Requirements <ArrowRight size={14} />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-medium text-white/70 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all"
                >
                  Explore Capabilities
                </Link>
              </div>
            </div>

            {/* Right Column: Key SLA & Performance Metrics */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-[#0B0D14]/90 border border-white/10 p-6 sm:p-8 backdrop-blur-2xl shadow-xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                  <span className="text-xs font-mono uppercase tracking-wider text-white/40">Engagement Benchmark</span>
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {activeSegment.highlightTag}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {activeSegment.stats.map((s) => (
                    <div key={s.label} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-white tracking-tight">{s.val}</div>
                        <div className="text-xs text-white/40 mt-0.5">{s.label}</div>
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-blue-400">
                        <CheckCircle2 size={14} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/[0.08] text-center">
                  <span className="text-xs text-white/40">
                    Transparent milestone billing · Written timeline commitments
                  </span>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
