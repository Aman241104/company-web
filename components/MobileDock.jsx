'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Home, Briefcase, Layers, Users, Mail } from 'lucide-react'

const items = [
  { label: 'Home',     href: '/',         icon: Home },
  { label: 'Services', href: '/services', icon: Layers },
  { label: 'Work',     href: '/work',     icon: Briefcase },
  { label: 'About',    href: '/about',    icon: Users },
  { label: 'Contact',  href: '/contact',  icon: Mail },
]

export default function MobileDock() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(true)
  const [lastY, setLastY] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setVisible(y < lastY || y < 60)
      setLastY(y)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [lastY])

  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-50 transition-transform duration-300"
      style={{
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <div
        className="mx-3 mb-3 rounded-2xl flex items-center justify-around px-2 py-2"
        style={{
          background: 'rgba(6,8,20,0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(37,99,235,0.1)',
        }}
      >
        {items.map(({ label, href, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all duration-200 min-w-[52px]"
              style={{
                background: active ? 'rgba(37,99,235,0.15)' : 'transparent',
              }}
            >
              <Icon
                size={20}
                style={{
                  color: active ? '#60a5fa' : 'rgba(255,255,255,0.35)',
                  transition: 'color 0.2s',
                }}
              />
              <span
                className="text-[9px] font-medium tracking-wide"
                style={{ color: active ? '#60a5fa' : 'rgba(255,255,255,0.3)' }}
              >
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
