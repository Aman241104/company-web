'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { CheckCircle2, Star } from 'lucide-react'

export default function HeroDashboardShowcase() {
  return (
    <div className="relative w-full mx-auto pt-6 lg:pt-0 overflow-visible">
      {/* Radial ambient background glow */}
      <div className="absolute -inset-10 bg-gradient-to-r from-blue-600/25 via-indigo-600/20 to-sky-500/15 rounded-3xl blur-3xl -z-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="relative w-[104%] -mx-[2%] sm:w-[104%] sm:-mx-[2%] lg:w-[118%] lg:-ml-[9%] xl:w-[122%] xl:-ml-[11%] pb-10 sm:pb-14"
      >
        {/* Laptop: a premium business website */}
        <div className="relative w-full">
          <div className="rounded-t-xl border border-white/15 bg-[#14161C] p-2 shadow-[0_35px_60px_rgba(0,0,0,0.65)]">
            <div className="flex items-center justify-center pb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            </div>
            <div className="relative aspect-[16/10] rounded-md overflow-hidden bg-[#0B0D14]">
              <Image
                src="/assets/sv-space-designs-live.jpg"
                alt="SV Space Designs — a business website built by Mehta Technologies"
                fill
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 1280px) 620px, (min-width: 1024px) 520px, 90vw"
                className="object-cover object-top select-none"
              />
            </div>
          </div>
          {/* Laptop base */}
          <div className="h-2.5 rounded-b-[10px] bg-gradient-to-b from-[#2A2D36] to-[#14161C] border-x border-b border-white/10" />
          <div className="mx-auto h-1 w-1/3 rounded-b-xl bg-[#0B0D14]" />
        </div>

        {/* Phone: an e-commerce website */}
        <div className="absolute -bottom-2 right-0 sm:-right-4 w-[30%] max-w-[150px]">
          <div className="rounded-[1.4rem] border-[3px] border-[#1C1E26] bg-[#0B0D14] shadow-[0_25px_45px_rgba(0,0,0,0.6)] overflow-hidden">
            <div className="relative aspect-[9/19]">
              <Image
                src="/assets/prihaan-spices-mobile.jpg"
                alt="Prihaan Spices — the mobile version of an e-commerce website built by Mehta Technologies"
                fill
                loading="eager"
                sizes="180px"
                className="object-cover object-top select-none"
              />
            </div>
          </div>
        </div>

        {/* Floating trust chips */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="absolute -top-3 left-2 sm:left-6 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0B0D14]/90 border border-white/10 backdrop-blur-md text-[11px] font-semibold text-white shadow-lg"
        >
          <CheckCircle2 size={13} className="text-emerald-400" />
          SEO-Ready
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="absolute bottom-8 -left-3 sm:left-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0B0D14]/90 border border-white/10 backdrop-blur-md text-[11px] font-semibold text-white shadow-lg"
        >
          <Star size={12} className="text-amber-400 fill-amber-400" />
          4.9/5 Client Rating
        </motion.div>
      </motion.div>
    </div>
  )
}
