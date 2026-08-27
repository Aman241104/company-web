'use client'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, Mail, Phone, MapPin, Heart } from 'lucide-react'

const cols = [
  {
    title: 'Products & Platforms',
    links: [
      { label: 'Vibo ERP Suite', href: '/#products' },
      { label: 'Mehta Tech Labs', href: '/labs' },
      { label: 'Inventory Matrix', href: '/#products' },
      { label: 'HRMS & Automated Payroll', href: '/#products' },
      { label: 'AI Search & Analytics', href: '/#products' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Web Applications (Next.js)', href: '/services' },
      { label: 'Mobile Apps (iOS & Android)', href: '/services' },
      { label: 'Custom Enterprise ERP', href: '/services' },
      { label: 'AI Integration & Workflows', href: '/services' },
      { label: 'Technical SEO & Performance', href: '/services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Mehta Tech', href: '/about' },
      { label: 'Portfolio & Case Studies', href: '/work' },
      { label: 'Industries & Solutions', href: '/solutions' },
      { label: 'Interactive Pricing Matrix', href: '/#pricing' },
      { label: 'Live System Status', href: '/status' },
      { label: 'Leadership & Team', href: '/about#team' },
      { label: 'Careers & Hiring', href: 'mailto:careers@mehtatechnologies.com' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-[#05060A] border-t border-white/[0.08] text-white">
      <div className="max-w-[1360px] mx-auto px-6 md:px-8 pt-16 pb-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/[0.08]">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg overflow-hidden ring-1 ring-white/10">
                <Image src="/brand/mehta-logo-icon-dark.png" alt="Mehta Technologies" width={32} height={32} className="w-full h-full object-cover" />
              </div>
              <span className="text-base font-bold tracking-tight text-white">
                Mehta Technologies
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-white/50 leading-relaxed max-w-sm font-normal">
              High-performance digital engineering studio. We build production-ready web applications, mobile apps, and scalable SaaS platforms for visionary founders and global enterprises.
            </p>

            <div className="space-y-2 text-xs text-white/50">
              <div className="flex items-center gap-2">
                <MapPin size={13} className="text-blue-400" />
                <span>Mumbai, India · Working Globally</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={13} className="text-blue-400" />
                <a href="mailto:hello@mehtatechnologies.com" className="hover:text-white transition-colors">
                  hello@mehtatechnologies.com
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://linkedin.com/company/mehta-technologies"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-blue-600/20 hover:text-blue-400 border border-white/[0.08] flex items-center justify-center text-white/50 transition-all"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>
              <a
                href="https://x.com/mehtatechnologies"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-blue-600/20 hover:text-blue-400 border border-white/[0.08] flex items-center justify-center text-white/50 transition-all"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com/mehtatechnologies"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-blue-600/20 hover:text-blue-400 border border-white/[0.08] flex items-center justify-center text-white/50 transition-all"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.987.01-4.04.059-.976.045-1.505.207-1.858.344-.466.181-.8.398-1.15.748-.35.35-.566.683-.747 1.15-.137.352-.3.881-.344 1.857-.05 1.054-.06 1.37-.06 4.04 0 2.67.01 2.987.06 4.04.045.976.207 1.505.344 1.858.181.466.398.8.748 1.15.35.35.683.566 1.15.747.352.137.881.3 1.857.344 1.054.05 1.37.06 4.04.06 2.67 0 2.987-.01 4.04-.06.976-.045 1.505-.207 1.858-.344.466-.181.8-.398 1.15-.748.35-.35.566-.683.747-1.15.137-.352.3-.881.344-1.857.05-1.054.06-1.37.06-4.04 0-2.67-.01-2.987-.06-4.04-.045-.976-.207-1.505-.344-1.858a3.09 3.09 0 0 0-.748-1.15 3.09 3.09 0 0 0-1.15-.747c-.352-.137-.881-.3-1.857-.344-1.054-.05-1.37-.06-4.04-.06zm0 4.594a5.604 5.604 0 1 1 0 11.208 5.604 5.604 0 0 1 0-11.208zm0 1.802a3.802 3.802 0 1 0 0 7.604 3.802 3.802 0 0 0 0-7.604zm5.838-2.002a1.31 1.31 0 1 1-2.62 0 1.31 1.31 0 0 1 2.62 0z"/>
                </svg>
              </a>
              <a
                href="https://github.com/mehta-technologies"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-blue-600/20 hover:text-blue-400 border border-white/[0.08] flex items-center justify-center text-white/50 transition-all"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {cols.map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-mono uppercase tracking-wider text-white/40 mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <div>
            © {new Date().getFullYear()} Mehta Technologies. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white/70 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white/70 transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-white/70 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
