'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Globe, Clock, ShieldCheck, Zap, ArrowRight, CheckCircle2 } from 'lucide-react'

const hubs = [
  { city: 'San Francisco', region: 'Americas', tz: 'America/Los_Angeles', label: 'PST / Client Ops', activeOverlap: 'Active Sync Window' },
  { city: 'London', region: 'Europe & UK', tz: 'Europe/London', label: 'GMT / Client Ops', activeOverlap: 'Active Sync Window' },
  { city: 'Dubai', region: 'Middle East', tz: 'Asia/Dubai', label: 'GST / Commercial', activeOverlap: 'Active Sync Window' },
  { city: 'Mumbai', region: 'India (HQ)', tz: 'Asia/Kolkata', label: 'IST / Primary Studio', activeOverlap: 'Lead Architecture Center' },
  { city: 'Bengaluru', region: 'India (Hub)', tz: 'Asia/Kolkata', label: 'IST / Engineering Labs', activeOverlap: 'Cloud Infrastructure Lab' },
  { city: 'Singapore', region: 'APAC', tz: 'Asia/Singapore', label: 'SGT / Partner Desk', activeOverlap: 'Active Sync Window' },
]

export default function GlobalNetwork() {
  const [times, setTimes] = useState({})

  useEffect(() => {
    const updateTimes = () => {
      const formatted = {}
      hubs.forEach((h) => {
        try {
          formatted[h.city] = new Intl.DateTimeFormat('en-US', {
            timeZone: h.tz,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
          }).format(new Date())
        } catch {
          formatted[h.city] = '12:00:00 PM'
        }
      })
      setTimes(formatted)
    }

    updateTimes()
    const interval = setInterval(updateTimes, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="global-network" className="py-16 sm:py-24 md:py-32 max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8 border-t border-white/[0.06]">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
        <span className="glow-pill mb-4 inline-flex">
          International Delivery Infrastructure
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
          Global engineering delivery.{' '}
          <span className="text-gradient-accent">Seamless timezone overlap.</span>
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-white/50 leading-relaxed">
          Over 35% of our client base spans the US, UK, and Middle East. We operate on structured asynchronous sprint pipelines with 4+ hours of live daily synchronous overlap.
        </p>
      </div>

      {/* Grid of Global Hubs with Live World Clocks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-10 sm:mb-12">
        {hubs.map((hub, index) => (
          <motion.div
            key={hub.city}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-blue-500/30 hover:bg-white/[0.035] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-blue-400">
                  {hub.region}
                </span>
                <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-1">
                {hub.city}
              </h3>
              <p className="text-xs text-white/55 mb-4">{hub.label}</p>
            </div>

            <div className="pt-3.5 sm:pt-4 border-t border-white/[0.06] flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-mono font-bold text-white">
                <Clock size={14} className="text-blue-400" />
                <span>{times[hub.city] || 'Syncing...'}</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-white/60 border border-white/10">
                {hub.activeOverlap}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Overlap Guarantee Banner */}
      <div className="p-6 sm:p-10 rounded-3xl bg-blue-600/[0.08] border border-blue-500/20 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="space-y-1 text-center md:text-left">
          <div className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold">
            Asynchronous & Synchronous Guarantee
          </div>
          <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Zero communications bottleneck. Guaranteed 4h live overlap.
          </h4>
          <p className="text-xs sm:text-sm text-white/60 max-w-xl">
            Daily video standups, written sprint recaps on Loom/Slack, and transparent GitHub PR staging builds across global timezones.
          </p>
        </div>

        <a
          href="/contact"
          className="px-6 py-3.5 rounded-full text-xs font-semibold bg-white text-black hover:bg-white/90 shadow-xl shadow-white/10 transition-all whitespace-nowrap"
        >
          Schedule Cross-Timezone Discovery
        </a>
      </div>
    </section>
  )
}
