'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Mail, Phone, Clock, ShieldCheck, Sparkles } from 'lucide-react'

export default function CTA() {
  return (
    <section id="contact" className="py-20 sm:py-28 md:py-36 bg-[#07080C] relative overflow-hidden border-t border-white/[0.08]">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[400px] bg-blue-600/[0.08] rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-150px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          {/* Header pill */}
          <span className="glow-pill mb-6 inline-flex">
            Ready to Build?
          </span>

          {/* Main Title */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-6">
            Your vision deserves{' '}
            <span className="text-gradient-accent">an elite launch.</span>
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-white/50 leading-relaxed max-w-xl mx-auto mb-10 font-normal">
            Book a 30-minute discovery session with our engineering leads. We will review your architecture, define milestones, and provide a fixed-price proposal in 24 hours.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-full text-sm font-semibold bg-white text-black hover:bg-white/90 shadow-xl shadow-white/10 transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              Schedule Free Discovery Call <ArrowRight size={15} />
            </Link>
            <a
              href="mailto:hello@mehtatechnologies.com"
              className="w-full sm:w-auto px-8 py-4 rounded-full text-sm font-semibold bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2"
            >
              Email Brief Directly
            </a>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-10 border-t border-white/[0.08] max-w-2xl mx-auto text-xs text-white/50">
            <div className="flex items-center justify-center gap-2">
              <Clock size={14} className="text-blue-400" />
              <span>24-Hour Scope Turnaround</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck size={14} className="text-blue-400" />
              <span>Mutual NDA Guaranteed</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Sparkles size={14} className="text-blue-400" />
              <span>100% Full IP Ownership</span>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  )
}
