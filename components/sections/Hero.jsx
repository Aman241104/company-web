'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, ShieldCheck, CheckCircle2, Zap } from 'lucide-react'
import HeroInteractiveShowcase from '@/components/ui/HeroInteractiveShowcase'
import ShinyText from '@/components/ui/ShinyText'

export default function Hero() {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-28 overflow-hidden">
      {/* Subtle Ambient Radial Highlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-blue-600/[0.08] rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8">
        
        {/* Top Header & Core Pitch */}
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="glow-pill mb-5 inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Q3/Q4 · 150+ Shipped Worldwide</span>
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-[64px] font-extrabold text-white leading-[1.08] tracking-tight mb-5 sm:mb-6"
          >
            Engineering digital products that{' '}
            <ShinyText>scale businesses.</ShinyText>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="text-base sm:text-lg lg:text-xl text-white/60 leading-relaxed mb-8 max-w-2xl mx-auto font-normal"
          >
            We design, engineer, and deploy high-performance web platforms, multi-tenant SaaS architectures, mobile apps, and autonomous AI systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-semibold bg-white text-black hover:bg-white/90 active:scale-[0.98] transition-all shadow-xl shadow-white/10"
            >
              Start Your Project <ArrowRight size={15} />
            </Link>
            <a
              href="#work"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-medium text-white/80 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 transition-all"
            >
              Explore Selected Work
            </a>
          </motion.div>

          {/* Proof Metric Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.4 }}
            className="grid grid-cols-3 gap-3 sm:gap-6 pt-8 mt-8 border-t border-white/[0.08] max-w-lg mx-auto"
          >
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">150+</div>
              <div className="text-[11px] sm:text-xs text-white/45 mt-0.5">Shipped Worldwide</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">99.99%</div>
              <div className="text-[11px] sm:text-xs text-white/45 mt-0.5">Cloud Uptime SLA</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">4.9/5</div>
              <div className="text-[11px] sm:text-xs text-white/45 mt-0.5">Client Rating</div>
            </div>
          </motion.div>
        </div>

        {/* 3D Interactive Multi-Archetype Showcase */}
        <HeroInteractiveShowcase />

      </div>
    </section>
  )
}
