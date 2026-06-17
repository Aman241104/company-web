'use client'
import { motion } from 'framer-motion'

const channels = [
  { name: 'Google Ads', spend: '₹48K', roas: '4.8x', color: '#3b82f6', pct: 78 },
  { name: 'Meta Ads', spend: '₹32K', roas: '3.9x', color: '#8b5cf6', pct: 62 },
  { name: 'WhatsApp', spend: '₹8K', roas: '6.2x', color: '#10b981', pct: 90 },
  { name: 'Email', spend: '₹4K', roas: '5.1x', color: '#f59e0b', pct: 82 },
]

export default function MarketingDashboard() {
  return (
    <div className="h-full min-h-[320px] text-white p-3 space-y-2.5 overflow-hidden" style={{ background: '#080812', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header metrics */}
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: 'Avg. ROAS', value: '4.2x', color: '#10b981' },
          { label: 'Total Spend', value: '₹92K', color: '#3b82f6' },
          { label: 'Leads', value: '1,284', color: '#f59e0b' },
          { label: 'Conv. Rate', value: '8.4%', color: '#8b5cf6' },
        ].map((m) => (
          <div key={m.label} className="rounded-lg p-2" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="text-white/25 text-[7px] uppercase tracking-wide">{m.label}</p>
            <p className="font-bold text-xs mt-0.5" style={{ color: m.color }}>{m.value}</p>
          </div>
        ))}
      </div>

      {/* Channel breakdown */}
      <p className="text-white/30 text-[8px] uppercase tracking-wider">Channel Performance</p>
      <div className="space-y-2">
        {channels.map((c, i) => (
          <div key={c.name}>
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-white/50 text-[8px]">{c.name}</span>
              <div className="flex gap-2">
                <span className="text-white/30 text-[8px]">{c.spend}</span>
                <span className="text-[8px] font-medium" style={{ color: c.color }}>{c.roas}</span>
              </div>
            </div>
            <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: c.color, willChange: 'width' }}
                initial={{ width: '0%' }}
                animate={{ width: `${c.pct}%` }}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: 'easeOut' }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Trend mini-area */}
      <div className="rounded-lg p-2" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <p className="text-white/30 text-[8px] mb-1.5">Lead Flow (Last 7 days)</p>
        <div className="flex items-end gap-1.5" style={{ height: 32 }}>
          {[40, 65, 52, 80, 70, 90, 85].map((v, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-sm"
              style={{ background: 'linear-gradient(to top, #3b82f6, #60a5fa)', originY: 1, willChange: 'transform' }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <div style={{ height: `${v}%` }} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
