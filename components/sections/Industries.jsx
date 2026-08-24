'use client'
import { motion } from 'framer-motion'
import { Factory, FlaskConical, HardHat, Landmark, HeartPulse, ShoppingCart, GraduationCap, Plane } from 'lucide-react'

const industries = [
  { icon: Factory, label: 'Manufacturing & Supply' },
  { icon: FlaskConical, label: 'Chemicals & Pharma' },
  { icon: HardHat, label: 'Real Estate & Interior' },
  { icon: Landmark, label: 'FinTech & Banking' },
  { icon: HeartPulse, label: 'Healthcare & Clinical' },
  { icon: ShoppingCart, label: 'Luxury E-Commerce' },
  { icon: Plane, label: 'Travel & Hospitality' },
  { icon: GraduationCap, label: 'EdTech & Learning' },
]

export default function Industries() {
  return (
    <section id="industries" className="py-20 max-w-[1360px] mx-auto px-6 md:px-8">
      <div className="border-t border-white/[0.08] pt-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="glow-pill mb-4 inline-flex">
              Domain Expertise
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Tailored solutions for{' '}
              <span className="text-gradient-accent">critical industries.</span>
            </h2>
          </div>
          <p className="text-sm text-white/50 max-w-md">
            From regulated clinical workflows to high-volume e-commerce and multi-tier industrial ERPs, we understand the domain nuances.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {industries.map((ind, i) => {
            const Icon = ind.icon
            return (
              <motion.div
                key={ind.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.15] hover:bg-white/[0.04] transition-all flex items-center gap-3.5"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                  <Icon size={18} />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-white/80">
                  {ind.label}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
