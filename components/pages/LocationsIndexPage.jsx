'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin } from 'lucide-react'
import { locations } from '@/lib/locations'

export default function LocationsIndexPage() {
  return (
    <div className="pt-32 pb-24 overflow-hidden">
      <section className="max-w-[1360px] mx-auto px-6 md:px-8 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <span className="glow-pill mb-4 inline-flex">Where We Work</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-6">
            Website development, <span className="text-gradient-accent">wherever you are.</span>
          </h1>
          <p className="text-base sm:text-lg text-white/50 leading-relaxed">
            Remote-first delivery with active client work across Gujarat and Maharashtra. Pick your city for specific case studies and focus areas.
          </p>
        </motion.div>
      </section>

      <section className="max-w-[1360px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {locations.map((loc, i) => (
            <motion.div
              key={loc.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link
                href={`/locations/${loc.slug}`}
                className="group block h-full p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-blue-500/30 hover:bg-white/[0.035] transition-all"
              >
                <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4 text-blue-400">
                  <MapPin size={16} />
                </div>
                <h2 className="text-lg font-bold text-white tracking-tight mb-2">{loc.city}</h2>
                <p className="text-sm text-white/55 leading-relaxed mb-5">{loc.tagline}</p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/70 group-hover:text-white transition-colors">
                  View {loc.city} page <ArrowRight size={13} />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
