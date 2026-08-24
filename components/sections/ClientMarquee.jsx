'use client'
import { motion } from 'framer-motion'
import { projects } from './Work'
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion'

const clients = projects.map((p) => p.name)
const doubled = [...clients, ...clients]

export default function ClientMarquee() {
  const reducedMotion = usePrefersReducedMotion()
  return (
    <section className="py-6 border-y border-white/[0.06] overflow-hidden relative bg-[#07080C]">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#07080C] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#07080C] to-transparent pointer-events-none" />

      <div className="text-center mb-3">
        <span className="text-[11px] font-medium uppercase tracking-wider text-white/35">
          Trusted by high-growth businesses & ambitious founders
        </span>
      </div>

      <motion.div
        className={`flex w-max ${reducedMotion ? 'flex-wrap justify-center' : 'flex-nowrap'}`}
        animate={reducedMotion ? undefined : { x: ['0%', '-50%'] }}
        transition={reducedMotion ? undefined : { duration: 32, repeat: Infinity, ease: 'linear' }}
      >
        {(reducedMotion ? clients : doubled).map((name, i) => (
          <div key={i} className="flex items-center gap-3 px-6 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500/40 shrink-0" />
            <span className="text-[13px] font-medium text-white/50 hover:text-white/80 transition-colors">
              {name}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
