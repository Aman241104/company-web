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
    <main className="bg-[#07080C] min-h-screen text-white">
      <Navbar />

      <div className="pt-40 pb-32 max-w-[900px] mx-auto px-6 md:px-8 text-center">
        <span className="glow-pill inline-flex items-center gap-2 mb-6">
          <Compass size={13} className="text-blue-400" />
          <span>404 — Page Not Found</span>
        </span>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
          This page doesn&apos;t exist.
        </h1>
        <p className="text-sm sm:text-base text-white/50 max-w-lg mx-auto mb-10 leading-relaxed">
          The page you&apos;re looking for may have been moved, renamed, or never existed. Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold bg-white text-black hover:bg-white/90 transition-all shadow-xl shadow-white/10 w-full sm:w-auto justify-center"
          >
            <ArrowLeft size={15} /> Back to Home
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all w-full sm:w-auto justify-center"
          >
            View Our Work <ArrowUpRight size={15} />
          </Link>
        </div>

        <div className="glass-panel rounded-2xl p-6 sm:p-8 text-left">
          <div className="text-xs font-mono uppercase tracking-wider text-white/40 mb-3">
            Looking for something specific?
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            <Link href="/services" className="text-white/70 hover:text-white transition-colors">Services</Link>
            <Link href="/solutions" className="text-white/70 hover:text-white transition-colors">Solutions</Link>
            <Link href="/about" className="text-white/70 hover:text-white transition-colors">About Us</Link>
            <Link href="/contact" className="text-white/70 hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
