import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import { CheckCircle2, ShieldCheck, Clock, ArrowLeft, ArrowUpRight } from 'lucide-react'

export const metadata: Metadata = {
  title: "Engineering & SLA Standards",
  description:
    "The uptime targets, latency budgets, and infrastructure standards Mehta Technologies builds and contracts to for client production systems.",
  alternates: { canonical: "https://mehtatechnologies.com/status" },
}

const systems = [
  { name: 'Web Platform & Edge SSR', target: '100% Uptime', latency: '< 50ms TTFB target', region: 'Global Edge Network' },
  { name: 'Multi-Tenant SaaS / ERP Workloads', target: '99.99% Uptime SLA', latency: '< 25ms P95 query target', region: 'AWS Mumbai (ap-south-1)' },
  { name: 'PostgreSQL Database & Connection Pooling', target: '99.99% Uptime SLA', latency: '< 20ms P95 target', region: 'Multi-AZ Read Replicas' },
  { name: 'Payment Webhook Ingestion (Stripe/Razorpay)', target: '100% Delivery SLA', latency: '< 30ms target', region: 'Serverless Edge Queue' },
  { name: 'Staging & Automated CI/CD Deployments', target: 'Zero-downtime deploys', latency: 'Automated rollback on failure', region: 'GitHub Actions & Docker' },
]

export default function StatusPage() {
  return (
    <main className="bg-[#07080C] min-h-screen text-white">
      <Navbar />

      <div className="pt-32 pb-24 max-w-[1200px] mx-auto px-6 md:px-8">
        
        {/* Back link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} /> Back to Home
          </Link>
        </div>

        {/* Status Header Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-emerald-950/[0.15] border border-emerald-500/30 mb-12 shadow-2xl shadow-emerald-950/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-400 via-teal-300 to-transparent" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                  Contracted SLA Standard
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                99.99% Uptime SLA Commitment
              </h1>
              <p className="text-xs sm:text-sm text-white/60 font-normal">
                The uptime, latency, and reliability targets we design to and contractually commit to for client applications, database clusters, and global edge delivery.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-center shrink-0">
              <div className="text-[10px] font-mono text-white/55 uppercase mb-1">Latency Target</div>
              <div className="text-3xl font-extrabold text-emerald-400 font-mono">&lt; 50ms</div>
              <div className="text-[11px] text-white/50">Edge TTFB Budget</div>
            </div>
          </div>
        </div>

        {/* System Component Breakdown */}
        <div className="space-y-4 mb-16">
          <div className="text-xs font-mono uppercase tracking-wider text-white/55 mb-2">
            SLA Targets by Infrastructure Component
          </div>

          <div className="grid grid-cols-1 gap-3">
            {systems.map((s) => (
              <div
                key={s.name}
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/15 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                    <span>{s.name}</span>
                  </div>
                  <div className="text-xs text-white/55 font-mono pl-6">{s.region}</div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono pl-6 sm:pl-0">
                  <div className="text-right">
                    <span className="text-white/55">Target: </span>
                    <span className="text-emerald-400 font-bold">{s.latency}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-semibold">
                    {s.target}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Change Management */}
        <div className="rounded-3xl bg-white/[0.02] border border-white/[0.08] p-8 sm:p-10 mb-16">
          <h2 className="text-xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <Clock size={18} className="text-blue-400" /> How We Handle Maintenance & Deployments
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-white/60 leading-relaxed">
            <p>Every production deployment ships through automated CI/CD with staged rollouts and automatic rollback on failed health checks — no manual, high-risk deploys.</p>
            <p>Database migrations and infrastructure upgrades are scheduled in low-traffic windows and designed to be zero-downtime by default (rolling replicas, connection draining).</p>
            <p>Enterprise SLA clients get a dedicated incident channel with contractual response-time commitments, detailed under Request Enterprise SLA Specs below.</p>
          </div>
        </div>

        {/* Need Dedicated SLA Support? */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight mb-1">
              Need custom 24/7 SLA infrastructure for your enterprise?
            </h3>
            <p className="text-xs sm:text-sm text-white/50">
              We manage dedicated multi-region AWS/Cloudflare clusters with contractual 99.99% uptime guarantees.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-3.5 rounded-full text-xs font-semibold bg-white text-black hover:bg-white/90 transition-all shadow-xl shadow-white/10 whitespace-nowrap"
          >
            Request Enterprise SLA Specs <ArrowUpRight size={13} className="inline ml-1" />
          </Link>
        </div>

      </div>

      <Footer />
    </main>
  )
}
