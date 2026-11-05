import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'
import { Compass, ArrowLeft, ArrowUpRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Page Not Found',
}

export default function NotFound() {
  return (
    <>
    <Navbar />
    <main id="main-content" tabIndex={-1} className="home-light bg-white min-h-screen">

      <div className="pt-40 pb-32 max-w-[900px] mx-auto px-6 md:px-8 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#1F4FFF] mb-6">
          <Compass size={13} />
          <span>404 — Page Not Found</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0A1124] tracking-tight mb-4">
          This page doesn&apos;t exist.
        </h1>
        <p className="text-sm sm:text-base text-[#0A1124]/55 max-w-lg mx-auto mb-10 leading-relaxed">
          The page you&apos;re looking for may have been moved, renamed, or never existed. Let&apos;s get you back on track.
        </p>

        {/* Primary/secondary pill pair — solid accent primary, outlined
            ink-on-transparent secondary — the same two-button system used
            sitewide, not a one-off treatment for this page. */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold bg-[#1F4FFF] text-white hover:bg-[#1A3FD6] transition-all shadow-lg shadow-[#1F4FFF]/20 w-full sm:w-auto justify-center"
          >
            <ArrowLeft size={15} /> Back to Home
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold border border-[#0A1124]/20 text-[#0A1124] hover:bg-[#0A1124]/5 hover:border-[#0A1124]/30 transition-all w-full sm:w-auto justify-center"
          >
            View Our Work <ArrowUpRight size={15} />
          </Link>
        </div>

        <div className="surface-panel rounded-2xl p-6 sm:p-8 text-left">
          <div className="text-xs font-mono uppercase tracking-wider text-[#0A1124]/45 mb-3">
            Looking for something specific?
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            <Link href="/services" className="text-[#0A1124]/60 hover:text-[#0A1124] transition-colors">Services</Link>
            <Link href="/solutions" className="text-[#0A1124]/60 hover:text-[#0A1124] transition-colors">Solutions</Link>
            <Link href="/about" className="text-[#0A1124]/60 hover:text-[#0A1124] transition-colors">About Us</Link>
            <Link href="/contact" className="text-[#0A1124]/60 hover:text-[#0A1124] transition-colors">Contact</Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
    </>
  )
}
