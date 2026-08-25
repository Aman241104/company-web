'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Palette, Check, Sparkles, X } from 'lucide-react'

const themes = [
  {
    id: 'blue',
    name: 'Electric Blue',
    primary: '#2563EB',
    primaryLight: '#60A5FA',
    bgBadge: 'bg-blue-500/20 text-blue-400',
    colorHex: '#2563EB',
  },
  {
    id: 'emerald',
    name: 'Emerald Cyber',
    primary: '#059669',
    primaryLight: '#34D399',
    bgBadge: 'bg-emerald-500/20 text-emerald-400',
    colorHex: '#10B981',
  },
  {
    id: 'purple',
    name: 'Violet Aurora',
    primary: '#7C3AED',
    primaryLight: '#A78BFA',
    bgBadge: 'bg-purple-500/20 text-purple-400',
    colorHex: '#8B5CF6',
  },
  {
    id: 'amber',
    name: 'Amber Monolith',
    primary: '#D97706',
    primaryLight: '#FBBF24',
    bgBadge: 'bg-amber-500/20 text-amber-400',
    colorHex: '#F59E0B',
  },
]

export default function ThemeCustomizer() {
  const [activeTheme, setActiveTheme] = useState('blue')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('mehta-theme')
    if (saved && themes.find((t) => t.id === saved)) {
      applyTheme(saved)
    }

    const handleOpen = () => setIsOpen(true)
    window.addEventListener('open-theme-customizer', handleOpen)
    return () => window.removeEventListener('open-theme-customizer', handleOpen)
  }, [])

  const applyTheme = (themeId) => {
    const theme = themes.find((t) => t.id === themeId)
    if (!theme) return
    setActiveTheme(themeId)
    localStorage.setItem('mehta-theme', themeId)
    
    // Dynamically update CSS variables on root
    document.documentElement.style.setProperty('--color-blue', theme.primary)
    document.documentElement.style.setProperty('--color-blue-light', theme.primaryLight)
  }

  return (
    <div className="hidden md:block fixed bottom-6 left-6 z-40">
      {/* Theme Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Theme Customizer"
        className="flex items-center gap-2 px-3 py-2.5 rounded-full bg-[#0B0D14]/90 hover:bg-[#0B0D14] text-white border border-white/10 hover:border-white/20 shadow-xl backdrop-blur-xl transition-all cursor-pointer"
      >
        <Palette size={14} className="text-blue-400" />
        <span className="text-[11px] font-mono font-medium hidden sm:inline">Theme</span>
      </motion.button>

      {/* Palette Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.18 }}
            className="absolute bottom-14 left-0 w-64 p-4 rounded-2xl bg-[#0B0D14] border border-white/15 shadow-2xl shadow-black/80 z-50 backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                <Sparkles size={13} className="text-blue-400" />
                <span>Studio Accent Hue</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md text-white/40 hover:text-white transition-colors"
              >
                <X size={13} />
              </button>
            </div>

            <div className="space-y-1.5">
              {themes.map((t) => {
                const isSelected = t.id === activeTheme
                return (
                  <button
                    key={t.id}
                    onClick={() => applyTheme(t.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-white/[0.08] text-white border border-white/15'
                        : 'text-white/60 hover:text-white hover:bg-white/[0.03] border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm"
                        style={{ backgroundColor: t.colorHex }}
                      />
                      <span>{t.name}</span>
                    </div>
                    {isSelected && <Check size={13} className="text-white" />}
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
