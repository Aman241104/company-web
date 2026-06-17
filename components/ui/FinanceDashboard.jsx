'use client'
import { motion } from 'framer-motion'

const linePoints = [20, 45, 30, 65, 50, 80, 60, 90, 72, 85, 95, 78]

function Sparkline({ points, color }) {
  const max = Math.max(...points)
  const min = Math.min(...points)
  const w = 200
  const h = 50
  const coords = points.map((p, i) => {
    const x = (i / (points.length - 1)) * w
    const y = h - ((p - min) / (max - min + 1)) * h
    return `${x},${y}`
  })
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height: 40 }}>
      <defs>
        <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        points={coords.join(' ')}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polygon
        points={`0,${h} ${coords.join(' ')} ${w},${h}`}
        fill="url(#sparkGrad)"
      />
    </svg>
  )
}

export default function FinanceDashboard() {
  return (
    <div className="h-full min-h-[320px] text-white p-3 space-y-2.5 overflow-hidden" style={{ background: '#080812', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/30 text-[8px] uppercase tracking-wider">Portfolio</p>
          <p className="text-white font-bold text-sm">₹4,82,340</p>
          <p className="text-emerald-400 text-[9px]">↑ +2.4% today</p>
        </div>
        <div className="flex gap-1">
          {['1D', '1W', '1M', '1Y'].map((t, i) => (
            <span key={t} className="text-[8px] px-1.5 py-0.5 rounded" style={{
              background: i === 2 ? 'rgba(37,99,235,0.3)' : 'rgba(255,255,255,0.05)',
              color: i === 2 ? '#60a5fa' : 'rgba(255,255,255,0.3)',
            }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="rounded-lg p-2.5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <Sparkline points={linePoints} color="#3b82f6" />
      </div>

      {/* Holdings */}
      <p className="text-white/30 text-[8px] uppercase tracking-wider">Top Holdings</p>
      <div className="space-y-1.5">
        {[
          { name: 'RELIANCE', val: '₹1,24,000', change: '+3.2%', up: true },
          { name: 'INFY', val: '₹98,500', change: '-0.8%', up: false },
          { name: 'TCS', val: '₹76,200', change: '+1.5%', up: true },
          { name: 'HDFC', val: '₹64,800', change: '+0.4%', up: true },
        ].map((h) => (
          <div key={h.name} className="flex items-center justify-between px-2.5 py-1.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <span className="text-white/60 text-[9px] font-medium">{h.name}</span>
            <span className="text-white/80 text-[9px]">{h.val}</span>
            <span className="text-[8px]" style={{ color: h.up ? '#10b981' : '#f87171' }}>{h.change}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
