'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle2, ArrowUpRight, UserCheck, Boxes, Users2, ListChecks, Receipt, Cpu, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react'
import BorderBeam from '@/components/ui/BorderBeam'
import SpotlightCard from '@/components/ui/SpotlightCard'
import ShinyText from '@/components/ui/ShinyText'

const features = [
  'Multi-tenant Cloud Architecture with schema isolation',
  'Automated Invoicing, e-Way bills & GST compliance',
  'Real-time Multi-location Inventory & Stock Sync',
  'CRM Pipeline, lead routing & attribution tracking',
  'AI-Powered Business Forecasting & Demand Models',
  'Role-based Access Control (RBAC) & immutable audit logs',
]

const microProducts = [
  { icon: UserCheck, title: 'CRM & Lead Engine', desc: 'Unified pipeline tracking and lead qualification with automated follow-ups.' },
  { icon: Boxes, title: 'Inventory Matrix', desc: 'Real-time multi-warehouse stock level tracking with barcode scanner integration.' },
  { icon: Users2, title: 'HRMS & Payroll', desc: 'Attendance, biometric sync, leaves and one-click salary dispatch engine.' },
  { icon: ListChecks, title: 'Project Management', desc: 'Sprint planning, milestone tracking, and team capacity forecasting.' },
  { icon: Receipt, title: 'Billing & GST Invoicing', desc: 'Compliant e-way bills, GST filings, and automated payment reminders.' },
  { icon: Cpu, title: 'AI Assistant Core', desc: 'Embedded business intelligence copilots for natural language reporting.' },
]

export default function Products() {
  return (
    <section id="products" className="py-16 sm:py-24 md:py-32 max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
        <div>
          <span className="glow-pill mb-4 inline-flex">
            Proprietary SaaS Platform
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Software built for scale.{' '}
            <ShinyText>Ready to deploy.</ShinyText>
          </h2>
        </div>
        <div>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 transition-all whitespace-nowrap"
          >
            Explore Product Suite <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>

      {/* Bento Grid: Featured Flagship Vibo ERP + Micro Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
        
        {/* Flagship: Vibo ERP Card with Visual preview */}
        <SpotlightCard
          enableTilt={false}
          spotlightColor="rgba(59, 130, 246, 0.2)"
          borderColor="rgba(59, 130, 246, 0.4)"
          className="lg:col-span-7 rounded-3xl bg-white/[0.02] border border-blue-500/20 p-5 sm:p-8 md:p-10 flex flex-col justify-between relative overflow-hidden shadow-2xl shadow-blue-900/10"
        >
          {/* Animated Border Beam */}
          <BorderBeam size={220} duration={12} colorFrom="#3b82f6" colorTo="#a855f7" />
          
          <div>
            <div className="flex items-center justify-between gap-2 mb-6">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  Flagship Platform
                </span>
                <span className="text-xs font-mono text-white/40">v2.4 Production</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>99.99% Cloud Uptime</span>
              </div>
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
              Vibo ERP
            </h3>
            <p className="text-sm sm:text-base text-white/60 leading-relaxed max-w-xl mb-6 font-normal">
              High-performance, AI-assisted cloud enterprise resource planning suite for scaling businesses. Replaces 6+ disjointed tools with one centralized system.
            </p>

            {/* Visual SaaS snapshot banner */}
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 mb-6 group bg-black">
              <Image
                src="/assets/vibo_erp_mockup.jpg"
                alt="Vibo ERP Platform View"
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700 opacity-95 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080C] via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 flex-wrap text-xs text-white/70">
                <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-black/80 backdrop-blur-md border border-white/10 font-mono text-[10px] sm:text-[11px] text-white">
                  Multi-Tenant Telemetry
                </span>
                <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-blue-600 text-white font-semibold text-[10px] sm:text-[11px]">
                  Live Production
                </span>
              </div>
            </div>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {features.map((f) => (
                <div key={f} className="flex items-start gap-2.5 text-xs text-white/75 font-medium">
                  <CheckCircle2 size={14} className="text-blue-400 shrink-0 mt-0.5" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between flex-wrap gap-4">
              <span className="text-xs font-semibold text-white/50">
                Live Deployment for 2,400+ Active Enterprises
              </span>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold bg-white text-black hover:bg-white/90 shadow-md shadow-white/10 transition-all active:scale-[0.98]"
              >
                Request Enterprise Demo <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </SpotlightCard>

        {/* Micro SaaS Grid */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {microProducts.map((p, index) => {
            const Icon = p.icon
            return (
              <SpotlightCard
                key={p.title}
                enableTilt={true}
                spotlightColor="rgba(59, 130, 246, 0.12)"
                borderColor="rgba(59, 130, 246, 0.25)"
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.07] hover:border-white/[0.15] hover:bg-white/[0.04] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-3.5">
                    <Icon size={16} />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1.5">{p.title}</h4>
                  <p className="text-xs text-white/50 leading-relaxed">{p.desc}</p>
                </div>
              </SpotlightCard>
            )
          })}
        </div>

      </div>
    </section>
  )
}

