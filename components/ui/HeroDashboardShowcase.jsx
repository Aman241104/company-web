'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function HeroDashboardShowcase() {
  return (
    <div className="relative w-full mx-auto pt-6 lg:pt-0 overflow-visible">
      {/* Radial ambient background glow */}
      <div className="absolute -inset-10 bg-gradient-to-r from-blue-600/25 via-indigo-600/20 to-sky-500/15 rounded-3xl blur-3xl -z-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="relative w-[125%] -mx-[12%] sm:w-[118%] sm:-mx-[9%] lg:w-[145%] lg:mx-0 lg:-ml-[20%] xl:w-[170%] xl:-ml-[32%]"
      >
        <Image
          src="/assets/saas_hero_mockup.png"
          alt="Vibo ERP dashboard, AI assistant, and mobile app showcase"
          width={1376}
          height={768}
          loading="eager"
          fetchPriority="high"
          className="w-full h-auto select-none drop-shadow-[0_35px_60px_rgba(0,0,0,0.65)]"
          sizes="(min-width: 1280px) 900px, (min-width: 1024px) 760px, 100vw"
        />
      </motion.div>
    </div>
  )
}
