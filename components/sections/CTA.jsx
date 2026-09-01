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
            Get Started
          </span>

          {/* Main Title */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-6">
            Ready to grow{' '}
            <span className="text-gradient-accent">your business online?</span>
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-white/50 leading-relaxed max-w-xl mx-auto mb-10 font-normal">
            Let&apos;s discuss your business and build a website that helps you make a stronger impression and reach more customers.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-full text-sm font-semibold bg-white text-black hover:bg-white/90 shadow-xl shadow-white/10 transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              Get a Free Consultation <ArrowRight size={15} />
            </Link>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full text-sm font-semibold bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2"
            >
              WhatsApp Us
            </a>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-10 border-t border-white/[0.08] max-w-2xl mx-auto text-xs text-white/50">
            <div className="flex items-center justify-center gap-2">
              <Clock size={14} className="text-blue-400" />
              <span>Fixed-Price Proposal in 24 Hrs</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck size={14} className="text-blue-400" />
              <span>Mutual NDA on Request</span>
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
