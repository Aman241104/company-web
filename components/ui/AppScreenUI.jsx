const patients = [
  { name: 'Priya Sharma', status: 'Confirmed', time: '9:00 AM', color: '#3b82f6' },
  { name: 'Rohan Patel', status: 'Waiting', time: '9:30 AM', color: '#10b981' },
  { name: 'Anita Desai', status: 'Confirmed', time: '10:00 AM', color: '#f59e0b' },
  { name: 'Karan Mehta', status: 'Pending', time: '10:30 AM', color: '#8b5cf6' },
]

const tabs = [
  { icon: '⌂', label: 'Home' },
  { icon: '📅', label: 'Appts', active: true },
  { icon: '👥', label: 'Patients' },
  { icon: '⚙', label: 'Settings' },
]

export default function AppScreenUI() {
  return (
    <div className="flex flex-col h-full text-white overflow-hidden" style={{ background: '#080812', fontFamily: 'system-ui, sans-serif' }}>
      {/* Status bar */}
      <div className="flex items-center justify-between px-4 py-1" style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>
        <span>9:41</span>
        <span>●●●●</span>
      </div>

      {/* Header */}
      <div className="px-4 pb-3">
        <p className="text-white/30 text-[9px]">Monday, 16 June</p>
        <p className="text-white font-bold text-sm">Appointments</p>
      </div>

      {/* Quick stats */}
      <div className="flex gap-2 px-4 mb-3">
        {[
          { label: "Today's", value: '12', color: '#3b82f6' },
          { label: 'Waiting', value: '3', color: '#f59e0b' },
          { label: 'Done', value: '5', color: '#10b981' },
        ].map((s) => (
          <div key={s.label} className="flex-1 rounded-xl p-2 text-center" style={{ background: `${s.color}15`, border: `1px solid ${s.color}30` }}>
            <p className="font-bold text-xs" style={{ color: s.color }}>{s.value}</p>
            <p className="text-white/30 text-[7px] mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Patient list */}
      <div className="flex-1 px-4 space-y-2 overflow-hidden">
        <p className="text-white/30 text-[9px] uppercase tracking-wider mb-2">Patient Queue</p>
        {patients.map((p) => (
          <div
            key={p.name}
            className="flex items-center gap-2.5 rounded-xl p-2.5"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            {/* Avatar */}
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-[10px]" style={{ background: p.color }}>
              {p.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white/80 text-[10px] font-medium truncate">{p.name}</p>
              <p className="text-white/30 text-[8px]">{p.time}</p>
            </div>
            <span
              className="text-[7px] px-1.5 py-0.5 rounded-full font-medium flex-shrink-0"
              style={{
                background: p.status === 'Confirmed' ? 'rgba(16,185,129,0.15)' : p.status === 'Waiting' ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.08)',
                color: p.status === 'Confirmed' ? '#10b981' : p.status === 'Waiting' ? '#f59e0b' : 'rgba(255,255,255,0.4)',
              }}
            >
              {p.status}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom tab bar */}
      <div className="flex border-t border-white/[0.06] mt-2" style={{ background: '#0a0a18' }}>
        {tabs.map((t) => (
          <div
            key={t.label}
            className="flex-1 flex flex-col items-center py-2 gap-0.5"
            style={{ color: t.active ? '#60a5fa' : 'rgba(255,255,255,0.2)' }}
          >
            <span style={{ fontSize: 12 }}>{t.icon}</span>
            <span style={{ fontSize: 7 }}>{t.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
