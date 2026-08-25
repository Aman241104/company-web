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
} from 'lucide-react'

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
    milestones: [
      'Week 1: Multi-tenant schema design & OAuth2/JWT auth',
      'Week 2-3: Core feature matrix & role-based dashboard UI',
      'Week 4: Automated recurring billing, invoicing & GST sync',
      'Week 5-6: Load testing, SOC2 security checks & production deployment',
    ],
  },
  {
    id: 'ecommerce',
    title: 'Headless Luxury E-Commerce',
    icon: Sparkles,
    description: 'Sub-second luxury retail storefront with 3D product configurators, localized multi-currency checkout, and instant search indexation.',
    stack: {
      frontend: 'Next.js 15 + Framer Motion + Three.js / Canvas',
      backend: 'Shopify Plus Storefront GraphQL API + Node Serverless',
      database: 'Redis Cache + Algolia InstantSearch Index',
      infra: 'Vercel Edge Global Network + Cloudflare Security Shield',
    },
    schema: ['products', 'variants', 'cart_sessions', 'orders', 'customers', 'reviews'],
    timeline: '4–6 weeks',
    estimatedCost: 'From ₹75,000',
    milestones: [
      'Week 1: High-fidelity Figma design system & 3D viewport setup',
      'Week 2-3: Headless storefront build with <0.7s LCP score',
      'Week 4: Payment gateways (Razorpay, Stripe, UPI) & inventory webhooks',
      'Week 5: Core Web Vitals 100/100 tuning & live launch',
    ],
  },
  {
    id: 'mobile',
    title: 'Cross-Platform Mobile App',
    icon: Cpu,
    description: 'Native 60fps iOS and Android mobile app with offline-first SQLite cache, real-time biometrics, and push notification campaigns.',
    stack: {
      frontend: 'React Native / Flutter + Native Code Bridges',
      backend: 'GraphQL API Gateway + Real-time WebSockets',
      database: 'PostgreSQL + SQLite Offline Sync Engine',
      infra: 'AWS App Runner + Firebase Cloud Messaging (FCM)',
    },
    schema: ['profiles', 'device_tokens', 'sync_events', 'in_app_purchases', 'notifications'],
    timeline: '6–12 weeks',
    estimatedCost: 'From ₹80,000',
    milestones: [
      'Week 1-2: UX wireframing, mobile design system & API contracts',
      'Week 3-5: Fluid cross-platform mobile engineering & state sync',
      'Week 6-8: Offline caching, push notifications & in-app purchases',
      'Week 9+: App Store & Google Play Store submission & approval',
    ],
  },
  {
    id: 'ai',
    title: 'AI Agent & Workflow Copilot',
    icon: Terminal,
    description: 'Custom AI agent pipelines with vector search (RAG), structured LLM JSON outputs, real-time document OCR, and human-in-the-loop validation.',
    stack: {
      frontend: 'Next.js 15 Chat UI + Stream Text Protocol',
      backend: 'Python FastAPI / LangChain + Celery Background Queue',
      database: 'PostgreSQL (pgvector embeddings) + Pinecone',
      infra: 'AWS GPU Nodes / Modal Labs + Cloudflare AI Gateway',
    },
    schema: ['agent_sessions', 'vector_embeddings', 'document_chunks', 'usage_tokens', 'feedback'],
    timeline: '4–8 weeks',
    estimatedCost: 'From ₹1,20,000',
    milestones: [
      'Week 1: Vector indexing & RAG embedding pipeline setup',
      'Week 2-3: LLM prompt engineering, fallback models & tool integration',
      'Week 4: Real-time streaming UI with low-latency WebSockets',
      'Week 5+: Hallucination guardrails, telemetry & enterprise rollout',
    ],
  },
]

export default function BlueprintGenerator() {
  const [selectedId, setSelectedId] = useState('saas')
  const [copied, setCopied] = useState(false)
  const activeBlueprint = blueprints.find((b) => b.id === selectedId) || blueprints[0]

  const handleCopy = () => {
    const text = `Mehta Technologies Architecture Blueprint\nProject: ${activeBlueprint.title}\nStack: ${JSON.stringify(activeBlueprint.stack, null, 2)}\nTimeline: ${activeBlueprint.timeline}\nEstimated Investment: ${activeBlueprint.estimatedCost}`
    navigator.clipboard?.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <section id="blueprint-generator" className="py-16 sm:py-24 md:py-32 max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8 border-t border-white/[0.06]">
      {/* Section Header */}
      <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
        <span className="glow-pill mb-4 inline-flex">
          Automated Scoping Engine
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
          Instant architecture &{' '}
          <span className="text-gradient-accent">tech stack blueprint.</span>
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-white/50 leading-relaxed">
          Select your product archetype to review recommended tech stack specifications, database schemas, and milestone roadmaps.
        </p>
      </div>

      {/* Blueprint Archetype Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mb-10 sm:mb-12">
        {blueprints.map((bp) => {
          const Icon = bp.icon
          const isSelected = bp.id === selectedId
          return (
            <button
              key={bp.id}
              onClick={() => setSelectedId(bp.id)}
              className={`p-3.5 sm:p-4 rounded-2xl text-left transition-all flex items-center gap-3 sm:gap-3.5 cursor-pointer ${
                isSelected
                  ? 'bg-blue-600/20 border border-blue-500/40 text-white shadow-xl shadow-blue-900/20'
                  : 'bg-white/[0.02] border border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <div
                className={`w-9 sm:w-10 h-9 sm:h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  isSelected ? 'bg-blue-600 text-white' : 'bg-white/[0.05] text-white/60'
                }`}
              >
                <Icon size={18} />
              </div>
              <div>
                <div className="text-xs font-bold tracking-tight text-white">{bp.title}</div>
                <div className="text-[10px] font-mono text-blue-400">{bp.timeline}</div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Blueprint Schematic Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeBlueprint.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3 }}
          className="rounded-3xl bg-[#090B12] border border-white/[0.1] p-5 sm:p-10 lg:p-12 shadow-2xl shadow-black/60 relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Left: Architecture Specifications */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    Production Architecture
                  </span>
                  <span className="text-xs text-white/40 font-mono">100% IP Transfer</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
                  {activeBlueprint.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-normal">
                  {activeBlueprint.description}
                </p>
              </div>

              {/* Recommended Stack Matrix */}
              <div className="space-y-3 pt-4 border-t border-white/[0.08]">
                <div className="text-xs font-mono uppercase tracking-wider text-white/40">
                  Recommended Core Stack
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <div className="text-[10px] font-mono text-white/40 uppercase mb-0.5">Frontend & UI</div>
                    <div className="font-semibold text-white">{activeBlueprint.stack.frontend}</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <div className="text-[10px] font-mono text-white/40 uppercase mb-0.5">Backend & API</div>
                    <div className="font-semibold text-white">{activeBlueprint.stack.backend}</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <div className="text-[10px] font-mono text-white/40 uppercase mb-0.5">Database & Cache</div>
                    <div className="font-semibold text-white">{activeBlueprint.stack.database}</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <div className="text-[10px] font-mono text-white/40 uppercase mb-0.5">Infra & CI/CD</div>
                    <div className="font-semibold text-white">{activeBlueprint.stack.infra}</div>
                  </div>
                </div>
              </div>

              {/* Database Entities */}
              <div className="pt-2">
                <div className="text-xs font-mono uppercase tracking-wider text-white/40 mb-2">
                  Key Relational Schemas
                </div>
                <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                  {activeBlueprint.schema.map((tbl) => (
                    <span
                      key={tbl}
                      className="px-2.5 py-1 rounded-md bg-white/[0.04] text-blue-300 border border-white/[0.08]"
                    >
                      {tbl}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Milestone Breakdown & Actions */}
            <div className="lg:col-span-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] p-6 sm:p-7 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-4">
                  <span className="text-xs font-mono uppercase text-white/40">Sprint Horizon</span>
                  <span className="text-xs font-bold text-white">{activeBlueprint.timeline}</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-6">
                  <span className="text-xs font-mono uppercase text-white/40">Fixed Milestone Pricing</span>
                  <span className="text-xs font-bold text-blue-400 font-mono">{activeBlueprint.estimatedCost}</span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="text-xs font-mono uppercase tracking-wider text-white/40">
                    Execution Schedule
                  </div>
                  {activeBlueprint.milestones.map((m, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-white/70">
                      <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/[0.06]">
                <Link
                  href={`/contact?service=${encodeURIComponent(activeBlueprint.title)}&budget=${encodeURIComponent(activeBlueprint.estimatedCost)}`}
                  className="w-full py-3.5 rounded-full text-xs font-semibold bg-white text-black hover:bg-white/90 shadow-xl shadow-white/10 transition-all flex items-center justify-center gap-2"
                >
                  Initiate Discovery on This Blueprint <ArrowRight size={13} />
                </Link>

                <button
                  onClick={handleCopy}
                  className="w-full py-2.5 rounded-full text-xs font-semibold bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 transition-all flex items-center justify-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check size={12} className="text-emerald-400" /> Copied to Clipboard
                    </>
                  ) : (
                    <>
                      <Copy size={12} /> Copy Blueprint Specs
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
