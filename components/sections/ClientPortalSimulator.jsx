'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Kanban,
  Activity,
  Globe2,
  MessageSquare,
  CheckCircle2,
  GitPullRequest,
  ExternalLink,
  ShieldCheck,
  Zap,
  Clock,
  Sparkles,
  ArrowRight,
  Server,
  Layers,
} from 'lucide-react'

const tabs = [
  { id: 'sprint', label: 'Sprint & Kanban Velocity', mobileLabel: 'Sprint & Kanban', icon: Kanban },
  { id: 'staging', label: 'Live Staging & QA Scorecard', mobileLabel: 'Live Staging', icon: Globe2 },
  { id: 'telemetry', label: 'API Telemetry & Edge SLA', mobileLabel: 'Edge Telemetry', icon: Activity },
  { id: 'feed', label: 'Direct Engineer Stream', mobileLabel: 'Engineer Feed', icon: MessageSquare },
]

const sprintTickets = [
  { id: 'MT-104', title: 'Implement Stripe & Razorpay webhook idempotency worker', status: 'Deployed to Staging', type: 'Backend', time: '2h ago' },
  { id: 'MT-103', title: 'Next.js 15 Server Action optimistic cart state sync', status: 'PR Merged', type: 'Frontend', time: '4h ago' },
  { id: 'MT-102', title: 'PostgreSQL Row-Level Security policy for isolated tenant schemas', status: 'QA Verified', type: 'Security', time: '6h ago' },
  { id: 'MT-101', title: 'Core Web Vitals profiling: image srcset & font preloading', status: 'Done', type: 'Performance', time: '1d ago' },
]

const stagingMetrics = [
  { label: 'Performance Score', value: '100 / 100', status: 'Optimal' },
  { label: 'Largest Contentful Paint', value: '0.62s', status: 'Sub-second' },
  { label: 'Cumulative Layout Shift', value: '0.000', status: 'Zero Shift' },
  { label: 'Total Blocking Time', value: '0 ms', status: 'Instant' },
]

const streamMessages = [
  { sender: 'Arjun Pillai (Backend Lead)', time: '10:45 AM', text: 'Staging build v2.4 deployed to staging.clientbrand.com. Database migrations applied with zero downtime.' },
  { sender: 'Riya Shah (Design Director)', time: '11:15 AM', text: 'Mobile interaction audit complete. Micro-interactions calibrated to 60fps hardware acceleration.' },
  { sender: 'Gaurav Mehta (Lead Architect)', time: '11:40 AM', text: 'All 8 end-to-end checkout scenarios verified. Ready for client stakeholder walkthrough today.' },
]

export default function ClientPortalSimulator() {
  const [activeTab, setActiveTab] = useState('sprint')
  const [ping, setPing] = useState(18)

  useEffect(() => {
    const interval = setInterval(() => {
      setPing(Math.floor(16 + Math.random() * 6))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="portal-simulator" className="py-16 sm:py-24 md:py-32 max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8 border-t border-white/[0.06]">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
        <span className="glow-pill mb-4 inline-flex">
          Client Transparency & Workflow
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
          Experience our live{' '}
          <span className="text-gradient-accent">client project portal.</span>
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-white/50 leading-relaxed">
          From Day 1, you receive dedicated dashboard access with real-time sprint ticket tracking, automatic staging environments, and live engineering updates.
        </p>
      </div>

      {/* Main Dashboard Frame */}
      <div className="rounded-3xl bg-[#090B12] border border-white/[0.12] overflow-hidden shadow-2xl shadow-black/80">
        
        {/* Top Window Bar */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 bg-black/60 border-b border-white/[0.08] flex items-center justify-between flex-wrap gap-2.5 sm:gap-4">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="flex gap-1.5">
              <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-green-500/80" />
            </div>
            <div className="h-4 w-[1px] bg-white/10 mx-0.5 sm:mx-1" />
            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-mono text-white/60 truncate max-w-[170px] sm:max-w-none">
              <span className="text-blue-400 font-bold truncate">portal.mehtatech.app</span>
              <span className="text-white/20">/</span>
              <span className="truncate">sprint-04</span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs font-mono">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Staging Active ({ping}ms)</span>
            </div>
            <span className="px-2.5 py-1 rounded-md bg-white/[0.04] text-white/60 border border-white/10 hidden sm:inline">
              Sprint 4 of 6
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-4 sm:px-6 pt-3 sm:pt-4 border-b border-white/[0.08] bg-white/[0.01] flex items-center gap-2 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = tab.id === activeTab
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 border-b-2 text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'border-blue-500 text-white bg-blue-500/10 rounded-t-lg'
                    : 'border-transparent text-white/50 hover:text-white/80'
                }`}
              >
                <Icon size={14} className={isActive ? 'text-blue-400' : 'opacity-60'} />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.mobileLabel}</span>
              </button>
            )
          })}
        </div>

        {/* Tab Body */}
        <div className="p-5 sm:p-10 min-h-[380px] bg-[#07080C]">
          <AnimatePresence mode="wait">
            
            {/* Tab 1: Sprint & Kanban */}
            {activeTab === 'sprint' && (
              <motion.div
                key="sprint"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between pb-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-white/55">
                    Active Sprint 4 Deliverables (Target: Oct 30)
                  </div>
                  <span className="text-xs font-mono font-bold text-blue-400">82% Completed</span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {sprintTickets.map((t) => (
                    <div
                      key={t.id}
                      className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/15 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/[0.04] text-white/50 border border-white/10">
                          {t.id}
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-white">
                          {t.title}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {t.status}
                        </span>
                        <span className="text-xs font-mono text-white/30">{t.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Tab 2: Live Staging & QA */}
            {activeTab === 'staging' && (
              <motion.div
                key="staging"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-8"
              >
                <div className="p-5 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
                      QA
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Automated Staging Preview URL</div>
                      <div className="text-xs font-mono text-blue-300">https://staging-v2.acme-platform.mehtatech.app</div>
                    </div>
                  </div>
                  <span className="px-4 py-2 rounded-full text-xs font-semibold bg-white text-black self-start sm:self-auto flex items-center gap-1.5">
                    Launch Staging View <ExternalLink size={12} />
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {stagingMetrics.map((m) => (
                    <div key={m.label} className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] text-center space-y-1">
                      <div className="text-[10px] font-mono uppercase text-white/55">{m.label}</div>
                      <div className="text-2xl font-extrabold text-emerald-400 font-mono">{m.value}</div>
                      <div className="text-[11px] font-semibold text-emerald-300/80">{m.status}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Tab 3: API Telemetry */}
            {activeTab === 'telemetry' && (
              <motion.div
                key="telemetry"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-1">
                    <div className="text-xs font-mono uppercase text-white/55">Global Edge Latency</div>
                    <div className="text-3xl font-extrabold text-white font-mono">{ping} ms</div>
                    <div className="text-xs text-emerald-400">99.99% Cloud Uptime SLA</div>
                  </div>
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-1">
                    <div className="text-xs font-mono uppercase text-white/55">Database Connection Pool</div>
                    <div className="text-3xl font-extrabold text-white font-mono">14 / 200</div>
                    <div className="text-xs text-blue-400">pgBouncer Distributed Cluster</div>
                  </div>
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-1">
                    <div className="text-xs font-mono uppercase text-white/55">Production Error Rate</div>
                    <div className="text-3xl font-extrabold text-emerald-400 font-mono">0.000%</div>
                    <div className="text-xs text-white/50">Zero unhandled exceptions</div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-white/60">Simulated Request Load (24h Window)</span>
                    <span className="text-emerald-400">2,410,920 Successful Requests</span>
                  </div>
                  <div className="h-12 w-full flex items-end gap-1.5 pt-2">
                    {Array.from({ length: 32 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-blue-600 to-emerald-400 rounded-t-sm opacity-70 hover:opacity-100 transition-opacity"
                        style={{ height: `${Math.floor(35 + Math.sin(i * 0.4) * 25 + Math.random() * 15)}%` }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab 4: Engineer Feed */}
            {activeTab === 'feed' && (
              <motion.div
                key="feed"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <div className="text-xs font-mono uppercase tracking-wider text-white/55 pb-2">
                  Direct Technical Architecture Channel (#acme-production-sprint)
                </div>

                <div className="space-y-3">
                  {streamMessages.map((msg, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-400">{msg.sender}</span>
                        <span className="text-[11px] font-mono text-white/30">{msg.time}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
                        {msg.text}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Footer Bar */}
        <div className="p-6 bg-white/[0.01] border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-white/50 font-normal">
            Included with every Mehta Technologies sprint agreement.
          </span>
          <a
            href="/contact"
            className="px-6 py-2.5 rounded-full text-xs font-semibold bg-white text-black hover:bg-white/90 transition-all flex items-center gap-2"
          >
            Start Your Dedicated Sprint <ArrowRight size={13} />
          </a>
        </div>

      </div>
    </section>
  )
}
