'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Cpu,
  Layers,
  Database,
  ShieldCheck,
  Calendar,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Copy,
  Check,
  Terminal,
  Kanban,
  Activity,
  Globe2,
  MessageSquare,
  GitPullRequest,
  ExternalLink,
  Zap,
  Clock,
  Server,
  Code2,
} from 'lucide-react'
import ShinyText from '@/components/ui/ShinyText'
import SpotlightCard from '@/components/ui/SpotlightCard'
import BorderBeam from '@/components/ui/BorderBeam'

// 1. Blueprints Data
const blueprints = [
  {
    id: 'saas',
    title: 'Multi-Tenant SaaS & Cloud Platform',
    icon: Layers,
    description: 'Enterprise multi-tenant cloud architecture with isolated tenant schemas, automated Stripe/Razorpay recurring billing, RBAC, and telemetry.',
    stack: {
      frontend: 'Next.js 15 App Router + Tailwind v4 + React 19',
      backend: 'Node.js / Go Microservices + pgBouncer Connection Pool',
      database: 'PostgreSQL (Row-Level Security) + Redis Edge Cache',
      infra: 'Cloudflare Edge Workers + AWS Fargate / Docker CI/CD',
    },
    schema: ['organizations', 'users', 'subscriptions', 'invoices', 'audit_logs', 'api_keys'],
    timeline: '6–10 weeks',
    estimatedCost: 'From ₹1,50,000',
  },
  {
    id: 'ecommerce',
    title: 'Headless Luxury E-Commerce',
    icon: Sparkles,
    description: 'Ultra-fast sub-second storefront with Shopify GraphQL backend, custom 3D configurator, and express multi-currency checkout.',
    stack: {
      frontend: 'Next.js 15 Static Export + Edge ISR + GSAP',
      backend: 'Shopify Storefront GraphQL API + Node Serverless',
      database: 'Shopify Core + Redis Cart Cache + Algolia Search',
      infra: 'Vercel Edge Network + Cloudflare Security WAF',
    },
    schema: ['products', 'collections', 'carts', 'checkouts', 'customers', 'orders'],
    timeline: '4–6 weeks',
    estimatedCost: 'From ₹90,000',
  },
  {
    id: 'ai-agents',
    title: 'Autonomous AI Agent Workflows',
    icon: Cpu,
    description: 'Neural agent pipeline with vector memory, semantic search, automated tool calling, and live token usage telemetry.',
    stack: {
      frontend: 'Next.js 15 + Server Actions + Streaming UI',
      backend: 'FastAPI / Python LangGraph + Node.js Router',
      database: 'pgvector / Pinecone + PostgreSQL + Redis Streams',
      infra: 'AWS Lambda / Modal GPU + Cloudflare Edge',
    },
    schema: ['agent_sessions', 'embeddings', 'traces', 'tool_executions', 'tokens'],
    timeline: '4–8 weeks',
    estimatedCost: 'From ₹1,20,000',
  },
]

// 2. Sprint Tickets Data
const sprintTickets = [
  { id: 'MT-104', title: 'Implement Stripe & Razorpay webhook idempotency worker', status: 'Deployed to Staging', type: 'Backend', time: '2h ago' },
  { id: 'MT-103', title: 'Next.js 15 Server Action optimistic cart state sync', status: 'PR Merged', type: 'Frontend', time: '4h ago' },
  { id: 'MT-102', title: 'PostgreSQL Row-Level Security policy for isolated tenant schemas', status: 'QA Verified', type: 'Security', time: '6h ago' },
  { id: 'MT-101', title: 'Core Web Vitals profiling: image srcset & font preloading', status: 'Done', type: 'Performance', time: '1d ago' },
]

// 3. Benchmarks Data
const benchmarkMetrics = [
  { metric: 'Time to First Byte (TTFB)', mehta: '45ms (Edge SSR)', legacy: '650ms (Origin Node)', delta: '14x Faster' },
  { metric: 'Initial JavaScript Bundle', mehta: '68 KB (Zero Runtime CSS)', legacy: '520 KB (Bloated SPA)', delta: '87% Smaller' },
  { metric: 'Search Engine Hydration', mehta: 'Instant HTML Pre-Render', legacy: 'Empty root <div> (Delayed)', delta: '100% Crawl Rate' },
  { metric: 'Interaction to Next Paint (INP)', mehta: '< 16ms (60 FPS)', legacy: '180ms (Main thread block)', delta: 'Ultra Smooth' },
]

// 4. Code Snippets Data
const codeSnippets = {
  serverAction: `'use server'
import { z } from 'zod'
import { revalidateTag } from 'next/cache'
import { db } from '@/lib/db'
import { auth } from '@/lib/auth'

const CheckoutSchema = z.object({
  tierId: z.string().uuid(),
  tenantId: z.string().uuid(),
  couponCode: z.string().optional(),
})

export async function processCheckoutAction(input: z.infer<typeof CheckoutSchema>) {
  const session = await auth()
  if (!session?.user?.id) throw new Error('Unauthorized session')

  const parsed = CheckoutSchema.parse(input)
  
  // Atomic database transaction with tenant schema isolation
  const order = await db.$transaction(async (tx) => {
    return await tx.orders.create({
      data: {
        userId: session.user.id,
        tenantId: parsed.tenantId,
        tierId: parsed.tierId,
        status: 'PROCESSING',
      }
    })
  })

  revalidateTag(\`tenant-\${parsed.tenantId}-billing\`)
  return { success: true, orderId: order.id }
}`,
  postgresRls: `-- Enable Row-Level Security (RLS) on Multi-Tenant Table
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

-- Dynamic Tenant Isolation Policy
CREATE POLICY tenant_isolation_policy ON invoices
  AS RESTRICTIVE
  USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid)
  WITH CHECK (tenant_id = current_setting('app.current_tenant_id', true)::uuid);`,
}

const mainTabs = [
  { id: 'blueprint', label: 'Architecture Scoper', icon: Cpu, badge: 'Scoping' },
  { id: 'portal', label: 'Live Sprint Portal', icon: Kanban, badge: 'Workflow' },
  { id: 'benchmarks', label: 'Speed & Benchmarks', icon: Zap, badge: 'Verified' },
  { id: 'code', label: 'Production Code', icon: Terminal, badge: 'TypeScript' },
]

export default function EngineeringLab() {
  const [activeMainTab, setActiveMainTab] = useState('blueprint')
  const [selectedBlueprint, setSelectedBlueprint] = useState(blueprints[0])
  const [copiedCode, setCopiedCode] = useState(false)
  const [activeCodeTab, setActiveCodeTab] = useState('serverAction')

  const copySnippet = (text) => {
    navigator.clipboard?.writeText(text)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  return (
    <section id="engineering-lab" className="py-16 sm:py-24 max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
        <div className="max-w-2xl">
          <span className="glow-pill mb-4 inline-flex items-center gap-2">
            <Terminal size={13} className="text-blue-400" />
            Engineering & Architecture Console
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            How we engineer.{' '}
            <ShinyText>Zero guesswork.</ShinyText>
          </h2>
          <p className="text-sm sm:text-base text-white/50 leading-relaxed mt-3 font-normal">
            Explore live architecture blueprints, client sprint transparency, stack benchmarks, and production-grade code.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl overflow-x-auto max-w-full no-scrollbar">
          {mainTabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeMainTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveMainTab(tab.id)}
                className={`relative flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'text-white shadow-lg'
                    : 'text-white/50 hover:text-white/80 hover:bg-white/[0.04]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="eng-tab-active"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 border border-blue-400/30 shadow-[0_0_20px_rgba(59,130,246,0.35)]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon size={14} className={`relative z-10 ${isActive ? 'text-white' : 'text-white/40'}`} />
                <span className="relative z-10">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Main Console Canvas */}
      <SpotlightCard
        enableTilt={false}
        spotlightColor="rgba(59, 130, 246, 0.12)"
        borderColor="rgba(59, 130, 246, 0.25)"
        className="rounded-3xl bg-[#080A12]/90 border border-white/10 p-5 sm:p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden"
      >
        <BorderBeam size={220} duration={14} colorFrom="#3b82f6" colorTo="#8b5cf6" />

        <AnimatePresence mode="wait">
          {/* TAB 1: ARCHITECTURE SCOPER */}
          {activeMainTab === 'blueprint' && (
            <motion.div
              key="blueprint"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Archetype Selector Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {blueprints.map((bp) => {
                  const Icon = bp.icon
                  const isSelected = selectedBlueprint.id === bp.id
                  return (
                    <button
                      key={bp.id}
                      onClick={() => setSelectedBlueprint(bp)}
                      className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-blue-600/15 border-blue-500/50 shadow-lg shadow-blue-900/20'
                          : 'bg-white/[0.02] border-white/[0.07] hover:border-white/[0.15] hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          isSelected ? 'bg-blue-500/20 text-blue-400' : 'bg-white/5 text-white/40'
                        }`}>
                          <Icon size={16} />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">{bp.title}</div>
                          <div className="text-[10px] text-white/45">{bp.timeline}</div>
                        </div>
                      </div>
                      {isSelected && <CheckCircle2 size={14} className="text-blue-400 shrink-0" />}
                    </button>
                  )
                })}
              </div>

              {/* Scoper Blueprint Specs Grid */}
              <div className="p-6 rounded-2xl bg-black/40 border border-white/[0.08] space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-white/[0.06]">
                  <div>
                    <span className="text-[11px] font-mono text-blue-400 uppercase tracking-wider">
                      Architectural Blueprint
                    </span>
                    <h3 className="text-xl font-bold text-white mt-0.5">{selectedBlueprint.title}</h3>
                    <p className="text-xs text-white/55 mt-1 max-w-xl">{selectedBlueprint.description}</p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <div className="text-[10px] text-white/40 font-mono">TIMELINE</div>
                      <div className="text-sm font-bold text-white">{selectedBlueprint.timeline}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-white/40 font-mono">ESTIMATION</div>
                      <div className="text-sm font-bold text-emerald-400">{selectedBlueprint.estimatedCost}</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <div className="text-[10px] font-mono text-white/40 uppercase mb-1.5">Frontend & UI</div>
                    <div className="text-xs font-semibold text-white/90">{selectedBlueprint.stack.frontend}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <div className="text-[10px] font-mono text-white/40 uppercase mb-1.5">Backend & API</div>
                    <div className="text-xs font-semibold text-white/90">{selectedBlueprint.stack.backend}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <div className="text-[10px] font-mono text-white/40 uppercase mb-1.5">Database & Cache</div>
                    <div className="text-xs font-semibold text-white/90">{selectedBlueprint.stack.database}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <div className="text-[10px] font-mono text-white/40 uppercase mb-1.5">Infrastructure & Edge</div>
                    <div className="text-xs font-semibold text-white/90">{selectedBlueprint.stack.infra}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between flex-wrap gap-4 pt-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] text-white/40 mr-2 font-mono">Core Schemas:</span>
                    {selectedBlueprint.schema.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] font-mono text-[11px] text-white/60">
                        {s}
                      </span>
                    ))}
                  </div>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-white text-black hover:bg-white/90 transition-all active:scale-[0.98]"
                  >
                    Initiate Discovery on This Blueprint <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: LIVE CLIENT PORTAL */}
          {activeMainTab === 'portal' && (
            <motion.div
              key="portal"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Portal Header */}
              <div className="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-black/50 border border-white/[0.08] text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-white/60">portal.mehtatech.app/sprint-04</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-mono text-[11px]">
                    Staging Active (17ms)
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-[11px]">
                    82% Sprint Done
                  </span>
                </div>
              </div>

              {/* Sprint Tickets List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {sprintTickets.map((t) => (
                  <div
                    key={t.id}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-mono text-[10px] font-bold">
                          {t.id}
                        </span>
                        <span className="text-[10px] font-mono text-white/40">{t.time}</span>
                      </div>
                      <div className="text-xs font-semibold text-white/90 leading-snug">{t.title}</div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono font-medium shrink-0">
                      {t.status}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-900/15 via-transparent to-transparent border border-blue-500/20 flex items-center justify-between flex-wrap gap-4">
                <div className="text-xs text-white/70">
                  <span className="font-bold text-white">Full Client Transparency:</span> Every project includes daily GitHub PRs, live staging URLs, and private Slack access with senior engineers.
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-md shadow-blue-600/30"
                >
                  Start Your Dedicated Sprint <ArrowRight size={12} />
                </Link>
              </div>
            </motion.div>
          )}

          {/* TAB 3: SPEED & BENCHMARKS */}
          {activeMainTab === 'benchmarks' && (
            <motion.div
              key="benchmarks"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 gap-3">
                {benchmarkMetrics.map((b) => (
                  <div
                    key={b.metric}
                    className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="text-xs font-bold text-white mb-1">{b.metric}</div>
                      <div className="flex items-center gap-4 text-xs">
                        <span className="text-emerald-400 font-medium">Mehta Standard: {b.mehta}</span>
                        <span className="text-white/35">Legacy Standard: {b.legacy}</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-bold text-xs font-mono shrink-0 self-start sm:self-center">
                      {b.delta}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] flex items-center justify-between text-xs text-white/50">
                <span className="font-mono">Audit Benchmark: 100/100 Google Lighthouse across mobile & desktop</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 size={13} /> SLA: 99.99% Cloud Uptime
                </span>
              </div>
            </motion.div>
          )}

          {/* TAB 4: PRODUCTION CODE */}
          {activeMainTab === 'code' && (
            <motion.div
              key="code"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              {/* Code Sub-tabs & Copy Button */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveCodeTab('serverAction')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                      activeCodeTab === 'serverAction'
                        ? 'bg-blue-600 text-white font-bold'
                        : 'bg-white/[0.04] text-white/50 hover:text-white'
                    }`}
                  >
                    app/actions/checkout.ts
                  </button>
                  <button
                    onClick={() => setActiveCodeTab('postgresRls')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                      activeCodeTab === 'postgresRls'
                        ? 'bg-blue-600 text-white font-bold'
                        : 'bg-white/[0.04] text-white/50 hover:text-white'
                    }`}
                  >
                    database/schema_rls.sql
                  </button>
                </div>

                <button
                  onClick={() => copySnippet(codeSnippets[activeCodeTab])}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-xs font-mono text-white/70 border border-white/10 transition-all cursor-pointer"
                >
                  {copiedCode ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  <span>{copiedCode ? 'Copied to Clipboard' : 'Copy Code'}</span>
                </button>
              </div>

              {/* Code Pre Block */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#050608] border border-white/10 font-mono text-xs text-blue-200/90 overflow-x-auto leading-relaxed shadow-inner">
                <pre>
                  <code>{codeSnippets[activeCodeTab]}</code>
                </pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </SpotlightCard>
    </section>
  )
}
