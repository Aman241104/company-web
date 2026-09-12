import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import { CheckCircle2, ShieldCheck, Clock, ArrowLeft, ArrowUpRight } from 'lucide-react'

export const metadata: Metadata = {
  title: "Support & Maintenance Standards",
  description:
    "How Mehta Technologies handles deployments, maintenance, and ongoing support for client websites and software.",
  alternates: { canonical: "https://mehtatechnologies.com/status" },
}

const commitments = [
  { name: 'Website & Hosting Uptime', target: 'Reliable, monitored hosting', detail: 'Built on modern, well-supported infrastructure' },
  { name: 'Bug Fixes & Support', target: 'Prompt response', detail: 'Covered under your post-launch support window' },
  { name: 'Deployments & Updates', target: 'Scheduled, low-risk rollouts', detail: 'Tested before going live, with rollback if something breaks' },
  { name: 'Security & Backups', target: 'Regular patching', detail: 'Dependency updates and backups on an ongoing basis' },
]

export default function StatusPage() {
  return (
    <>
    <Navbar theme="light" />
    <main id="main-content" tabIndex={-1} className="home-light bg-white min-h-screen">

      <div className="pt-32 pb-24 max-w-[1200px] mx-auto px-6 md:px-8">

        {/* Back link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 hover:text-neutral-950 transition-colors"
          >
            <ArrowLeft size={14} /> Back to Home
          </Link>
        </div>

        {/* Header Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-emerald-50 border border-emerald-200 mb-12 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-400 via-teal-300 to-transparent" />

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-emerald-600" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600">
                Support Standards
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950">
              Support & Maintenance Standards
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 font-normal max-w-2xl">
              How we handle deployments, maintenance, and support for the websites and software we build — plain commitments, no fine print.
            </p>
          </div>
        </div>

        {/* Commitments Breakdown */}
        <div className="space-y-4 mb-16">
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2">
            What You Can Expect
          </div>

          <div className="grid grid-cols-1 gap-3">
            {commitments.map((s) => (
              <div
                key={s.name}
                className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm hover:border-neutral-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="text-sm font-bold text-neutral-900 tracking-tight flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                    <span>{s.name}</span>
                  </div>
                  <div className="text-xs text-neutral-500 pl-6">{s.detail}</div>
                </div>

                <span className="ml-6 sm:ml-0 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold text-xs shrink-0 w-fit">
                  {s.target}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Change Management */}
        <div className="rounded-3xl bg-white border border-neutral-200 shadow-sm p-8 sm:p-10 mb-16">
          <h2 className="text-xl font-bold tracking-tight mb-6 flex items-center gap-2 text-neutral-900">
            <Clock size={18} className="text-blue-600" /> How We Handle Maintenance & Deployments
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-neutral-500 leading-relaxed">
            <p>Every update is tested before it goes live, with a plan to roll back quickly if something doesn&apos;t work as expected — no risky, untested changes to a live site.</p>
            <p>Bigger changes and maintenance windows are scheduled at low-traffic times to minimize any disruption to your visitors.</p>
            <p>Every project includes a post-launch support window (see your project plan) covering bug fixes and minor updates. Ongoing monthly retainers are available after that.</p>
          </div>
        </div>

        {/* Need Ongoing Support? */}
        <div className="p-8 sm:p-10 rounded-3xl bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-xl font-bold text-neutral-950 tracking-tight mb-1">
              Need ongoing support for your website?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500">
              Ask us about monthly maintenance and support retainers.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-3.5 rounded-full text-xs font-semibold bg-neutral-950 text-white hover:bg-neutral-800 transition-all shadow-xl shadow-neutral-950/10 whitespace-nowrap"
          >
            Get in Touch <ArrowUpRight size={13} className="inline ml-1" />
          </Link>
        </div>

      </div>

      <Footer />
    </main>
    </>
  )
}
