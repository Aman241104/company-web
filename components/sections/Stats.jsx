'use client'
import { motion } from 'framer-motion'
import { Rocket, Users, Star, Headphones } from 'lucide-react'

const stats = [
  { icon: Rocket, value: '150+', label: 'Projects Delivered', desc: 'Across India & globally' },
  { icon: Users, value: '100+', label: 'Happy Clients', desc: 'Across industries' },
  { icon: Star, value: '4.9/5', label: 'Client Satisfaction', desc: 'Rated by real clients' },
  { icon: Headphones, value: 'Ongoing', label: 'Support & Maintenance', desc: 'Even after launch' },
]

export default function Stats() {
  return (
    <section className="bg-white py-10 sm:py-16 max-w-[1360px] mx-auto px-6 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-150px" }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl bg-white border border-neutral-200 shadow-sm p-6 sm:p-10 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
      >
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className={`flex flex-col ${i !== 0 ? 'lg:border-l lg:border-neutral-100 lg:pl-8' : ''}`}
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-4">
                <Icon size={18} />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-neutral-800 mb-0.5">
                {stat.label}
              </div>
              <div className="text-xs text-neutral-500">
                {stat.desc}
              </div>
            </div>
          )
        })}
      </motion.div>
    </section>
  )
}
