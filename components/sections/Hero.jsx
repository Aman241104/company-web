'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import HeroDashboardShowcase from '@/components/ui/HeroDashboardShowcase'

export default function Hero() {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-[#07080C]">
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-gradient-to-br from-blue-600/15 via-indigo-600/10 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Headline, Copy & CTAs */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-left">

            {/* Tag Badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-xs font-medium text-white/80 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_#3b82f6]" />
                <span>Software. Products. Growth.</span>
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-[58px] font-extrabold text-white leading-[1.08] tracking-tight"
            >
              Building software <br className="hidden sm:block" />
              that moves <br className="hidden sm:block" />
              businesses <span className="text-[#60A5FA] drop-shadow-[0_0_25px_rgba(96,165,250,0.35)]">forward.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="text-sm sm:text-base lg:text-lg text-white/60 leading-relaxed max-w-xl font-normal"
            >
              We build digital products, web and mobile applications, AI solutions and SaaS platforms that help businesses grow, scale and lead.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-2"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-xl shadow-blue-600/30 active:scale-[0.98] transition-all"
              >
                Schedule a Call <ArrowRight size={15} />
              </Link>

              <Link
                href="/#products"
                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-semibold text-white/90 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 transition-all"
              >
                Explore Our Products
              </Link>
            </motion.div>

          </div>

          {/* Right Column: Hero Dashboard Showcase */}
          <div className="lg:col-span-6">
            <HeroDashboardShowcase />
          </div>

        </div>
      </div>
    </section>
  )
}
