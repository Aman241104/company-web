'use client'

function LinkedInIcon() { return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> }
function XIcon() { return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> }
function InstagramIcon() { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> }

const cols = [
  { title: 'Services', links: [
    { label: 'Website Development', href: '/services' },
    { label: 'Software Development', href: '/services' },
    { label: 'Mobile Apps', href: '/services' },
    { label: 'Performance Marketing', href: '/services' },
    { label: 'SEO Optimization', href: '/services' },
    { label: 'SaaS Products', href: '/services' },
  ]},
  { title: 'Portfolio', links: [
    { label: 'All Projects', href: '/work' },
    { label: 'Web Projects', href: '/work' },
    { label: 'E-Commerce', href: '/work' },
    { label: 'SaaS & Apps', href: '/work' },
    { label: 'ViboERP', href: '/work' },
  ]},
  { title: 'Company', links: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Process', href: '/#process' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ]},
]

const socials = [
  { icon: <LinkedInIcon />, href: '#', label: 'LinkedIn' },
  { icon: <XIcon />, href: '#', label: 'X / Twitter' },
  { icon: <InstagramIcon />, href: '#', label: 'Instagram' },
]

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.3)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 24px 0' }}>
        <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: 40, marginBottom: 56 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 16 }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg, #5B8AF7, #8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 13, color: '#fff' }}>M</div>
              <span style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 14, color: '#fff', letterSpacing: '-0.02em' }}>Mehta Technologies</span>
            </div>
            <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 13.5, color: 'rgba(255,255,255,0.35)', lineHeight: 1.65, margin: '0 0 24px', maxWidth: 240 }}>
              Great software, delivered. 150+ products shipped across India, US, UK & UAE since 2019.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              {socials.map(s => (
                <a key={s.label} href={s.href} aria-label={s.label} style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(91,138,247,0.1)'; e.currentTarget.style.color = '#5B8AF7'; e.currentTarget.style.borderColor = 'rgba(91,138,247,0.2)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {cols.map(col => (
            <div key={col.title}>
              <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 600, fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 16, letterSpacing: '0.03em' }}>{col.title}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links.map(l => (
                  <a key={l.label} href={l.href} style={{ fontFamily: 'var(--font-outfit)', fontSize: 13.5, color: 'rgba(255,255,255,0.32)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = 'rgba(255,255,255,0.75)'}
                    onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.32)'}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 12.5, color: 'rgba(255,255,255,0.22)' }}>© 2026 Mehta Technologies. All rights reserved.</span>
          <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 12.5, color: 'rgba(255,255,255,0.22)' }}>hello@mehtatechnologies.com</span>
        </div>
      </div>
    </footer>
  )
}
