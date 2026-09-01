'use client'
import { useEffect, useState } from 'react'

const WHATSAPP_NUMBER = '919876543210'
const WHATSAPP_MESSAGE = 'Hi Mehta Technologies, I would like to know more about your services.'
const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

export default function FloatingWhatsApp() {
  const [navMenuOpen, setNavMenuOpen] = useState(false)

  useEffect(() => {
    const handleNavToggle = (e) => setNavMenuOpen(!!e.detail?.open)
    window.addEventListener('mobile-nav-toggle', handleNavToggle)
    return () => window.removeEventListener('mobile-nav-toggle', handleNavToggle)
  }, [])

  if (navMenuOpen) return null

  return (
    <a
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-28 right-4 sm:bottom-24 sm:right-6 z-40 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20BD5C] shadow-2xl shadow-[#25D366]/30 border border-white/10 transition-all hover:scale-105 active:scale-95 group"
    >
      <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-60 animate-ping" />
      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
        className="relative w-7 h-7 sm:w-8 sm:h-8 fill-white"
      >
        <path d="M16.005 3C9.377 3 4 8.373 4 15c0 2.386.706 4.607 1.92 6.47L4 29l7.72-1.887A11.93 11.93 0 0 0 16.005 27C22.633 27 28 21.627 28 15S22.633 3 16.005 3Zm6.964 17.1c-.297.836-1.474 1.53-2.415 1.73-.643.137-1.482.246-4.308-.925-3.615-1.497-5.94-5.155-6.122-5.395-.176-.24-1.462-1.945-1.462-3.71 0-1.765.925-2.633 1.253-2.994.328-.36.716-.45.955-.45.238 0 .477.002.686.013.22.011.516-.084.807.615.297.716 1.01 2.475 1.098 2.655.088.18.147.392.03.633-.117.24-.176.39-.35.6-.176.21-.37.469-.528.63-.176.18-.36.375-.155.735.206.36.917 1.514 1.968 2.452 1.352 1.206 2.492 1.58 2.852 1.756.36.176.57.147.78-.09.211-.24.9-1.05 1.14-1.41.238-.36.477-.3.805-.18.328.12 2.079.98 2.436 1.158.357.18.594.27.682.42.089.15.089.87-.208 1.707Z" />
      </svg>
    </a>
  )
}
