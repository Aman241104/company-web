'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Cpu, 
  Layers, 
  Database, 
  Zap, 
  Globe, 
  ShieldCheck, 
  Sparkles, 
  Terminal, 
  Server,
  ArrowRight,
  Code2
} from 'lucide-react'
import SpotlightCard from '@/components/ui/SpotlightCard'
import ShinyText from '@/components/ui/ShinyText'

const techNodes = [
  {
    id: 'nextjs',
    name: 'Next.js 15 & Turbopack',
    category: 'Core Framework',
    icon: Globe,
    latency: '42ms TTFB',
    badge: 'Edge SSR',
    desc: 'React 19 Server Components, streaming hydration, and optimized static generation for instant global page delivery.',
    spec: 'Sub-second LCP · Zero runtime waterfalls · Automated code-splitting',
    accent: '#3B82F6',
  },
  {
    id: 'react19',
    name: 'React 19 Server Actions',
    category: 'Frontend & Logic',
    icon: Layers,
    latency: '0kb Client Bloat',
    badge: 'RSC Native',
    desc: 'Bypasses client-side bundle bloat by executing mutations directly on server primitives with optimistic UI updates.',
    spec: 'Form Actions · useOptimistic · Server Functions · 60fps Transitions',
    accent: '#60A5FA',
  },
  {
    id: 'postgres',
    name: 'PostgreSQL & Schema RLS',
    category: 'Database Architecture',
    icon: Database,
    latency: '99.99% Reliability',
    badge: 'Multi-Tenant',
    desc: 'Row-level security policies (RLS), tenant schema isolation, automated ACID-compliant migrations, and connection pooling.',
    spec: 'PgBouncer · Read Replicas · Automated Daily Backups · JSONB Indices',
    accent: '#3B82F6',
  },
  {
    id: 'edge',
    name: 'Cloudflare Edge & AWS',
    category: 'Global Infrastructure',
    icon: Server,
    latency: '<20ms Edge Routing',
    badge: '280+ POPs',
    desc: 'Global anycast CDN network with edge caching rules, web application firewall (WAF), and DDoS mitigation.',
    spec: 'Anycast DNS · Global CDN · TLS 1.3 · Zero Downtime Rollouts',
    accent: '#10B981',
  },
  {
    id: 'ai-core',
    name: 'AI Agent & RAG Pipelines',
    category: 'Intelligent Systems',
    icon: Sparkles,
    latency: '4,100 tok/sec',
    badge: 'Neural Core',
    desc: 'Production vector embeddings (pgvector/Pinecone), autonomous function calling agents, and automated semantic workflows.',
    spec: 'OpenAI / Claude-3 · Vector Search · Custom Fine-Tuning · Streaming',
    accent: '#8B5CF6',
  },
  {
    id: 'security',
    name: 'SOC2 & ISO Hardening',
    category: 'Security & DevOps',
    icon: ShieldCheck,
    latency: 'Bank-Grade AES-256',
    badge: 'Hardened',
    desc: 'Encrypted token storage, automated vulnerability scanning, strict CORS policies, and immutable tamper-proof audit trails.',
    spec: 'GitHub Actions CI/CD · Docker Containers · CSP Headers · Penetration Audited',
    accent: '#EC4899',
  },
]

export default function InteractiveTechMatrix() {
  const [selectedTech, setSelectedTech] = useState(techNodes[0])

  return (
    <section className="py-16 sm:py-24 md:py-32 max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8 border-t border-white/[0.06]">
      {/* Section Header */}
      <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
        <span className="glow-pill mb-4 inline-flex">
          <Cpu size={13} className="text-blue-400" />
          <span>Modern Engineering Matrix</span>
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
          World-class stack.{' '}
          <ShinyText>Engineered for speed.</ShinyText>
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-white/50 leading-relaxed">
          We do not use outdated monolithic templates or bloated page builders. Every line of code is engineered with modern, type-safe industry standards.
        </p>
      </div>

      {/* Grid of Tech Nodes with Spotlight hover */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {techNodes.map((tech) => {
          const Icon = tech.icon
          const isSelected = selectedTech.id === tech.id

          return (
            <SpotlightCard
              key={tech.id}
              enableTilt={true}
              spotlightColor="rgba(59, 130, 246, 0.14)"
              borderColor="rgba(59, 130, 246, 0.3)"
              className={`p-6 sm:p-7 flex flex-col justify-between cursor-pointer transition-all duration-300 ${
                isSelected ? 'border-blue-500/40 bg-white/[0.04]' : 'hover:border-white/20'
              }`}
              onClick={() => setSelectedTech(tech)}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <Icon size={20} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-white/[0.05] border border-white/10 text-white/70">
                      {tech.badge}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-emerald-400">
                      {tech.latency}
                    </span>
                  </div>
                </div>

                <div className="text-xs font-mono text-blue-400/80 mb-1 uppercase tracking-wider">
                  {tech.category}
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight mb-2.5">
                  {tech.name}
                </h3>
                <p className="text-xs sm:text-sm text-white/55 leading-relaxed font-normal mb-5">
                  {tech.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-[11px] font-mono text-white/40">
                  {tech.spec.split('·')[0]}
                </span>
                <span className="text-xs font-semibold text-blue-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Verified Spec <ArrowRight size={12} />
                </span>
              </div>
            </SpotlightCard>
          )
        })}
      </div>
    </section>
  )
}
