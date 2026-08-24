'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, ClipboardList, Lightbulb, Code2, Rocket, LifeBuoy, ArrowRight } from 'lucide-react'

const processSteps = [
  {
    id: '01',
    title: 'Discovery & Scoping',
    icon: Search,
    desc: 'We analyze your business architecture, unit economics, and user flows to define fixed deliverables, milestone schedules, and technical requirements.',
  },
  {
    id: '02',
    title: 'Architecture & UX',
    icon: Lightbulb,
    desc: 'Interactive Figma design systems and database schemas you can test before writing a single line of production code.',
  },
  {
    id: '03',
    title: 'Agile Engineering',
    icon: Code2,
    desc: 'Two-week sprint cycles with live staging URLs, automated GitHub CI/CD pipelines, and direct Slack communications with your engineers.',
  },
  {
    id: '04',
    title: 'QA & Security Hardening',
    icon: ClipboardList,
    desc: 'End-to-end regression testing, Core Web Vitals profiling, load tests, and security penetration checks before rollout.',
  },
  {
    id: '05',
    title: 'Production Deployment',
    icon: Rocket,
    desc: 'Zero-downtime DNS propagation, automated backup verification, analytics integration, and real-time error logging.',
  },
  {
    id: '06',
    title: 'SLA Support & Scale',
    icon: LifeBuoy,
    desc: 'Guaranteed 99.9% uptime maintenance, feature enhancements, and continuous performance tuning as your user base expands.',
  },
]

export default function Process() {
  return (
    <section id="process" className="py-24 md:py-32 max-w-[1360px] mx-auto px-6 md:px-8">
      {/* Section Header */}
      <div className="max-w-2xl mx-auto text-center mb-16 md:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="glow-pill mb-4 inline-flex">
            Engineering Methodology
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Predictable sprints.{' '}
            <span className="text-gradient-accent">Zero guesswork.</span>
          </h2>
          <p className="text-base sm:text-lg text-white/50 leading-relaxed">
            No endless delays or scope surprises. We operate with strict milestone accountability, weekly staging deployments, and fixed pricing.
          </p>
        </motion.div>
      </div>

      {/* 3-Column Bento Step Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {processSteps.map((step, index) => {
          const Icon = step.icon
          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-blue-500/30 hover:bg-white/[0.035] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <Icon size={18} />
                  </div>
                  <span className="text-xs font-mono font-bold text-white/30 tracking-wider">
                    STEP {step.id}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-white/55 leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Discovery CTA Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-12 p-8 sm:p-10 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
            Ready to scope your project with an engineer?
          </h3>
          <p className="text-sm text-white/50">
            Book a complimentary 30-minute architecture discovery session. No sales pressure — strictly technical review.
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-semibold bg-white text-black hover:bg-white/90 active:scale-[0.98] transition-all whitespace-nowrap shadow-lg shadow-white/10"
        >
          Book Architecture Session <ArrowRight size={14} />
        </Link>
      </motion.div>
    </section>
  )
}
