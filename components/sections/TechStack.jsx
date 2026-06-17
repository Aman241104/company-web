'use client'
import { motion } from 'framer-motion'

const clients = [
  'Silver Spoon by ACJ', 'TechVista Solutions', 'GreenLeaf Organics',
  'NovaMed Diagnostics', 'PeakPerform Sports', 'UrbanNest Realty',
  'ClearPath Finance', 'Stellar Logistics', 'BrightMind EdTech',
  'SwiftShip Commerce', 'Vertex Analytics', 'PureForm Wellness',
  'JJ Films', 'ZingBliss', 'Stylux Interiors',
]

const doubled = [...clients, ...clients]

export default function TechStack() {
  return (
    <section style={{ padding: '56px 0', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden', position: 'relative' }}>
      {/* Fade edges */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, zIndex: 2, background: 'linear-gradient(90deg, #060614, transparent)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, zIndex: 2, background: 'linear-gradient(-90deg, #060614, transparent)', pointerEvents: 'none' }} />

      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 12, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          Trusted by 80+ clients worldwide
        </span>
      </div>

      <motion.div
        style={{ display: 'flex', width: 'max-content' }}
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((name, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '0 32px', whiteSpace: 'nowrap' }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(91,138,247,0.4)', flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-syne)', fontWeight: 600, fontSize: 13.5, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.01em' }}>{name}</span>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
