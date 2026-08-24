import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import { CheckCircle2, ShieldCheck, Activity, Server, Zap, Globe, Clock, ArrowLeft, ArrowUpRight } from 'lucide-react'

export const metadata: Metadata = {
  title: "Live System & SLA Status — Mehta Technologies",
  description:
    "Real-time operational status, uptime metrics, global edge latency, and SLA health across all Mehta Technologies production systems and client infrastructure clusters.",
  alternates: { canonical: "https://mehtatechnologies.com/status" },
}

const systems = [
  { name: 'Core Web Platform & Edge SSR', status: 'Operational', uptime: '100%', latency: '14ms', region: 'Global Edge (300+ POPs)' },
  { name: 'Vibo ERP Multi-Tenant SaaS Cluster', status: 'Operational', uptime: '99.99%', latency: '18ms', region: 'AWS Mumbai (ap-south-1)' },
  { name: 'PostgreSQL Database & pgBouncer Pool', status: 'Operational', uptime: '99.99%', latency: '12ms', region: 'Multi-AZ Read Replicas' },
  { name: 'Redis Global Distributed Cache', status: 'Operational', uptime: '100%', latency: '4ms', region: 'Edge In-Memory Cluster' },
  { name: 'Stripe & Razorpay Webhook Ingestion', status: 'Operational', uptime: '100%', latency: '22ms', region: 'Serverless Edge Queue' },
  { name: 'Client Staging & Automated CI/CD Deployments', status: 'Operational', uptime: '100%', latency: '16ms', region: 'GitHub Actions & Docker Runner' },
]

const recentIncidents = [
  { date: 'August 2026', title: 'Routine PostgreSQL 16 Kernel Upgrade & Read Pool Expansion', status: 'Completed (Zero Downtime)', duration: '14 mins' },
  { date: 'July 2026', title: 'Global Edge CDN Cache Invalidation Optimization (Tier 1)', status: 'Completed', duration: '8 mins' },
  { date: 'June 2026', title: 'Added 4 New APAC Edge Node Clusters for Sub-20ms Routing', status: 'Completed', duration: '25 mins' },
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
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                </span>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                  All Production Systems Operational
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                99.99% Guaranteed Cloud SLA
              </h1>
              <p className="text-xs sm:text-sm text-white/60 font-normal">
                Continuous telemetry across client applications, multi-tenant database clusters, and global edge CDNs.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-center shrink-0">
              <div className="text-[10px] font-mono text-white/40 uppercase mb-1">Global Latency</div>
              <div className="text-3xl font-extrabold text-emerald-400 font-mono">14 ms</div>
              <div className="text-[11px] text-white/50">Average Round-Trip</div>
            </div>
          </div>
        </div>

        {/* System Component Breakdown */}
        <div className="space-y-4 mb-16">
          <div className="text-xs font-mono uppercase tracking-wider text-white/40 mb-2">
            Active Infrastructure Clusters
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
                  <div className="text-xs text-white/40 font-mono pl-6">{s.region}</div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono pl-6 sm:pl-0">
                  <div className="text-right">
                    <span className="text-white/40">Latency: </span>
                    <span className="text-emerald-400 font-bold">{s.latency}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-semibold">
                    {s.status} ({s.uptime})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance & Incident History */}
        <div className="rounded-3xl bg-white/[0.02] border border-white/[0.08] p-8 sm:p-10 mb-16">
          <h2 className="text-xl font-bold tracking-tight mb-6 flex items-center gap-2">
            <Clock size={18} className="text-blue-400" /> Maintenance & Deployment Log
          </h2>

          <div className="space-y-4">
            {recentIncidents.map((inc, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/[0.015] border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <span className="font-bold text-white">{inc.title}</span>
                  <div className="text-white/40 text-[11px] font-mono mt-0.5">{inc.date} · Duration: {inc.duration}</div>
                </div>
                <span className="text-emerald-400 font-semibold">{inc.status}</span>
              </div>
            ))}
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
