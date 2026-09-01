'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Target, Smartphone, Zap, Layers, MessageSquare, LifeBuoy, ArrowRight } from 'lucide-react'

const processSteps = [
  {
    id: '01',
    title: 'Business Focused',
    icon: Target,
    desc: 'We build solutions around your business goals, not just around design trends.',
  },
  {
    id: '02',
    title: 'Mobile First',
    icon: Smartphone,
    desc: 'Every website is designed to work perfectly across mobile, tablet and desktop.',
  },
  {
    id: '03',
    title: 'Fast & SEO Ready',
    icon: Zap,
    desc: 'Built with speed, performance and search engine fundamentals in mind.',
  },
  {
    id: '04',
    title: 'Custom & Scalable',
    icon: Layers,
    desc: 'Your website is designed around your business and can grow as your requirements grow.',
  },
  {
    id: '05',
    title: 'Clear Communication',
    icon: MessageSquare,
    desc: 'Simple discussions, regular updates and a transparent development process.',
  },
  {
    id: '06',
    title: 'Ongoing Support',
    icon: LifeBuoy,
    desc: 'We continue to support you even after your website goes live.',
  },
]

export default function Process() {
  return (
    <section id="process" className="py-16 sm:py-24 md:py-32 max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8">
      {/* Section Header */}
      <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16 md:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-150px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="glow-pill mb-4 inline-flex">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Why businesses choose{' '}
            <span className="text-gradient-accent">Mehta Technologies.</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-white/50 leading-relaxed">
            No endless delays or scope surprises. Clear communication, fixed pricing, and a website built around your business — not a template.
          </p>
        </motion.div>
      </div>

      {/* 3-Column Bento Step Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {processSteps.map((step, index) => {
          const Icon = step.icon
          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-150px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-blue-500/30 hover:bg-white/[0.035] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <Icon size={18} />
                  </div>
                  <span className="text-xs font-mono font-bold text-white/30 tracking-wider">
                    {step.id}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-2 sm:mb-3">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/55 leading-relaxed font-normal">
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
        viewport={{ once: true, margin: "-150px" }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-10 sm:mt-12 p-6 sm:p-10 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left"
      >
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
            Ready to grow your business online?
          </h3>
          <p className="text-sm text-white/50">
            Book a free, no-pressure consultation to talk through your website or project needs.
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-semibold bg-white text-black hover:bg-white/90 active:scale-[0.98] transition-all whitespace-nowrap shadow-lg shadow-white/10"
        >
          Get a Free Consultation <ArrowRight size={14} />
        </Link>
      </motion.div>
    </section>
  )
}
