'use client'
import LogoLoop from '@/components/ui/reactbits/LogoLoop'

const makeItem = (label, color = 'rgba(255,255,255,0.35)') => ({
  node: (
    <span
      className="text-[13px] font-medium tracking-wide shrink-0"
      style={{ color }}
    >
      {label}
    </span>
  ),
})

const dot = (color) => ({
  node: <span className="w-1 h-1 rounded-full shrink-0 inline-block" style={{ background: color, verticalAlign: 'middle' }} />,
})

const row1 = [
  makeItem('Next.js'), makeItem('React'), makeItem('Node.js'), makeItem('TypeScript'),
  makeItem('Python'), makeItem('GraphQL'), makeItem('Docker'), makeItem('Kubernetes'),
  makeItem('Terraform'), makeItem('React Native'), dot('rgba(37,99,235,0.45)'),
]

const row2 = [
  makeItem('PostgreSQL'), makeItem('MongoDB'), makeItem('Redis'), makeItem('AWS'),
  makeItem('Google Cloud'), makeItem('Vercel'), makeItem('Stripe'),
  makeItem('Tailwind CSS'), makeItem('GSAP'), makeItem('Framer Motion'),
  dot('rgba(79,70,229,0.45)'),
]

const row3 = [
  makeItem('Figma', 'rgba(255,255,255,0.25)'), makeItem('Supabase', 'rgba(255,255,255,0.25)'),
  makeItem('Prisma', 'rgba(255,255,255,0.25)'), makeItem('tRPC', 'rgba(255,255,255,0.25)'),
  makeItem('Zustand', 'rgba(255,255,255,0.25)'), makeItem('Turborepo', 'rgba(255,255,255,0.25)'),
  makeItem('Cloudflare', 'rgba(255,255,255,0.25)'), makeItem('Resend', 'rgba(255,255,255,0.25)'),
  makeItem('Playwright', 'rgba(255,255,255,0.25)'), makeItem('Vitest', 'rgba(255,255,255,0.25)'),
  dot('rgba(96,165,250,0.3)'),
]

export default function TechStack() {
  return (
    <div className="border-b border-white/[0.04] overflow-hidden" style={{ background: '#04050e' }}>

      {/* Label row */}
      <div className="flex items-center gap-5 px-6 md:px-12 pt-7 pb-5">
        <span className="text-white/15 text-[9px] uppercase tracking-[0.35em] shrink-0">Tech Stack</span>
        <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.06), transparent)' }} />
        <span className="text-white/10 text-[9px] shrink-0">20+ technologies</span>
      </div>

      {/* Three rows at different speeds/opacities */}
      <div className="flex flex-col gap-2.5 pb-6">
        <LogoLoop logos={row1} speed={65} direction="left"  logoHeight={22} gap={36} pauseOnHover fadeOut />
        <LogoLoop logos={row2} speed={50} direction="right" logoHeight={22} gap={36} pauseOnHover fadeOut />
        <LogoLoop logos={row3} speed={40} direction="left"  logoHeight={22} gap={36} pauseOnHover fadeOut />
      </div>

    </div>
  )
}
