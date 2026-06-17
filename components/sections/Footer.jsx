'use client'
import GradientText from '@/components/ui/reactbits/GradientText'
import DecryptedText from '@/components/ui/reactbits/DecryptedText'

const MLogoSVG = () => (
  <svg width="30" height="26" viewBox="0 0 100 85" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="10,80 32,10 50,48 68,10 90,80 76,80 66,52 50,72 34,52 24,80" fill="white" />
    <polygon points="50,48 44,60 50,72 56,60" fill="#03040c" />
  </svg>
)

const socials = [
  {
    label: 'LinkedIn', url: 'https://linkedin.com/company/mehta-technologies',
    path: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z',
  },
  {
    label: 'Twitter / X', url: 'https://x.com/mehtatechnologies',
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.73-8.835L2.058 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  {
    label: 'Instagram', url: 'https://instagram.com/mehtatechnologies',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
  },
  {
    label: 'GitHub', url: 'https://github.com/mehta-technologies',
    path: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
  },
]

const cols = {
  Services: [
    { label: 'Website Development', href: '/services#website' },
    { label: 'Software Development', href: '/services#software' },
    { label: 'Mobile Apps', href: '/services#mobile' },
    { label: 'Performance Marketing', href: '/services#marketing' },
    { label: 'SEO', href: '/services#seo' },
    { label: 'SaaS Development', href: '/services#saas' },
  ],
  Products: [
    { label: 'ViboERP', href: '/contact' },
    { label: 'Request Demo', href: '/contact' },
    { label: 'Pricing', href: '/#pricing' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Our Work', href: '/work' },
    { label: 'Process', href: '/#process' },
    { label: 'Careers', href: 'mailto:careers@mehtatechnologies.com' },
  ],
  Contact: [
    { label: 'hello@mehtatechnologies.com', href: 'mailto:hello@mehtatechnologies.com' },
    { label: '+91 98765 43210', href: 'tel:+919876543210' },
    { label: 'Schedule a Call', href: '/contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[#03040c] border-t border-white/[0.05] relative overflow-hidden">

      {/* Ghost watermark */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-end justify-center overflow-hidden pointer-events-none select-none"
        style={{ height: 200 }}
        aria-hidden
      >
        <span
          className="font-display font-black whitespace-nowrap"
          style={{
            fontSize: 'clamp(2rem, 18vw, 14rem)',
            letterSpacing: '-0.04em',
            lineHeight: 0.8,
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.025), transparent)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          MEHTA
        </span>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-20 relative z-10">

        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10 lg:gap-16 mb-14">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <MLogoSVG />
              <span className="font-display font-semibold tracking-[0.1em] text-sm">
                <DecryptedText
                  text="MEHTA TECHNOLOGIES"
                  animateOn="hover"
                  speed={40}
                  sequential={false}
                  maxIterations={8}
                  className="text-white"
                  encryptedClassName="text-blue-400/50"
                />
              </span>
            </div>
            <p className="text-white/30 text-sm leading-relaxed mb-6">
              Premium technology partner for businesses that want to build, scale, and dominate their digital space.
            </p>
            <div className="flex gap-2.5 mb-8">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  title={s.label}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/[0.07] bg-white/[0.02] text-white/25 hover:text-white hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>

            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02]">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white/35 text-xs">Available for new projects</span>
            </div>
          </div>

          {/* Links grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {Object.entries(cols).map(([cat, links]) => (
              <div key={cat}>
                <p className="font-display text-white/60 text-[10px] font-semibold uppercase tracking-[0.2em] mb-5">{cat}</p>
                <ul className="space-y-3">
                  {links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="text-white/30 text-sm hover:text-white/65 transition-colors duration-200 leading-relaxed break-all">{l.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-white/[0.05]">
          <p className="text-white/35 text-xs">© 2026 Mehta Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookies'].map((l) => (
              <a key={l} href="#" className="text-white/30 text-xs hover:text-white/60 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
