'use client'
import { motion } from 'framer-motion'
import { Rocket, Package, ShieldCheck, Headphones } from 'lucide-react'

const stats = [
  { icon: Rocket, value: '150+', label: 'Projects Delivered', desc: 'Across India, UAE, and US' },
  { icon: Package, value: '10+', label: 'Proprietary Products', desc: 'In active production' },
  { icon: ShieldCheck, value: '99.9%', label: 'Uptime & Reliability', desc: 'Enterprise SLAs guaranteed' },
  { icon: Headphones, value: '24/7', label: 'Engineering Support', desc: 'Direct slack & phone access' },
]

export default function Stats() {
  return (
    <section className="py-12 max-w-[1360px] mx-auto px-6 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-150px" }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-6 sm:p-10 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
      >
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className={`flex flex-col ${i !== 0 ? 'lg:border-l lg:border-white/[0.06] lg:pl-8' : ''}`}
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
                <Icon size={18} />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-white/80 mb-0.5">
                {stat.label}
              </div>
              <div className="text-xs text-white/55">
                {stat.desc}
              </div>
            </div>
          )
        })}
      </motion.div>
    </section>
  )
}
