const bars = [38, 62, 47, 78, 55, 88, 70, 91, 66, 96, 84, 100]
const months = ['J','F','M','A','M','J','J','A','S','O','N','D']
const navItems = ['Overview', 'Inventory', 'Orders', 'Customers', 'Reports', 'Settings']
const orders = [
  { id: '#4821', item: 'Raw Materials', amount: '₹84,200', status: 'Processing' },
  { id: '#4820', item: 'Office Equipment', amount: '₹32,500', status: 'Delivered' },
  { id: '#4819', item: 'Software Licenses', amount: '₹18,000', status: 'Pending' },
]

export default function DashboardMock() {
  return (
    <div style={{
      background: 'linear-gradient(145deg, #0C0C24 0%, #090920 100%)',
      border: '1px solid rgba(91,138,247,0.18)',
      borderRadius: 14,
      overflow: 'hidden',
      boxShadow: '0 0 0 1px rgba(91,138,247,0.06), 0 40px 120px rgba(91,138,247,0.08), 0 0 80px rgba(139,92,246,0.05)',
      position: 'relative',
      userSelect: 'none',
    }}>
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '55%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(91,138,247,0.55), transparent)' }} />

      {/* Browser chrome */}
      <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(0,0,0,0.2)' }}>
        <div style={{ display: 'flex', gap: 5 }}>
          {['#FF5F57','#FEBC2E','#28C840'].map(c => <div key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c, opacity: 0.8 }} />)}
        </div>
        <div style={{ flex: 1, background: 'rgba(255,255,255,0.04)', borderRadius: 5, padding: '4px 10px', fontSize: 10, color: 'rgba(255,255,255,0.28)', fontFamily: 'var(--font-outfit)' }}>
          viboerp.mehtatlabs.com/dashboard
        </div>
        <div style={{ width: 56, height: 20, background: 'rgba(255,255,255,0.04)', borderRadius: 4 }} />
      </div>

      {/* Dashboard body */}
      <div style={{ display: 'flex', minHeight: 310 }}>
        {/* Sidebar */}
        <div style={{ width: 150, borderRight: '1px solid rgba(255,255,255,0.05)', padding: '14px 10px', flexShrink: 0 }}>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', letterSpacing: '0.1em', paddingLeft: 8, marginBottom: 8, fontFamily: 'var(--font-outfit)' }}>ViboERP</div>
          {navItems.map((item, i) => (
            <div key={item} style={{ padding: '7px 8px', borderRadius: 6, marginBottom: 2, fontSize: 11, fontFamily: 'var(--font-outfit)', color: i === 0 ? '#fff' : 'rgba(255,255,255,0.3)', background: i === 0 ? 'rgba(91,138,247,0.15)' : 'transparent', display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: i === 0 ? '#5B8AF7' : 'rgba(255,255,255,0.15)' }} />
              {item}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: '14px 16px', overflow: 'hidden' }}>
          {/* KPI row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 12 }}>
            {[
              { label: 'Total Revenue', val: '₹24.8L', delta: '+18.2%', up: true },
              { label: 'Active Orders', val: '1,247', delta: '+6.4%', up: true },
              { label: 'Inventory SKUs', val: '3,840', delta: '-1.2%', up: false },
            ].map(s => (
              <div key={s.label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: '10px 10px 8px' }}>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', marginBottom: 4, fontFamily: 'var(--font-outfit)' }}>{s.label}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', fontFamily: 'var(--font-syne)', lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: 9, color: s.up ? '#34D399' : '#F87171', marginTop: 3, fontFamily: 'var(--font-outfit)' }}>{s.delta} vs last mo.</div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8, padding: '10px 12px', marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-outfit)' }}>Revenue Overview — 2025</div>
              <div style={{ fontSize: 9, color: 'rgba(91,138,247,0.7)', fontFamily: 'var(--font-outfit)' }}>Monthly</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 64 }}>
              {bars.map((h, i) => (
                <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: '3px 3px 0 0', background: i === 11 ? 'linear-gradient(180deg, #5B8AF7, #8B5CF6)' : i >= 9 ? 'rgba(91,138,247,0.3)' : 'rgba(91,138,247,0.14)' }} />
              ))}
            </div>
            <div style={{ display: 'flex', gap: 3, marginTop: 5 }}>
              {months.map((m, i) => <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: 8, color: 'rgba(255,255,255,0.18)', fontFamily: 'var(--font-outfit)' }}>{m}</div>)}
            </div>
          </div>

          {/* Mini table */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ padding: '7px 10px 5px' }}>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-outfit)' }}>Recent Orders</div>
            </div>
            {orders.map((o, i) => (
              <div key={o.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', borderTop: '1px solid rgba(255,255,255,0.04)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}>
                <div style={{ fontSize: 9, color: 'rgba(91,138,247,0.7)', fontFamily: 'var(--font-syne)', width: 36 }}>{o.id}</div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-outfit)', flex: 1 }}>{o.item}</div>
                <div style={{ fontSize: 9, color: '#fff', fontFamily: 'var(--font-syne)', width: 52 }}>{o.amount}</div>
                <div style={{ fontSize: 8, fontFamily: 'var(--font-outfit)', padding: '2px 6px', borderRadius: 4, background: o.status === 'Delivered' ? 'rgba(52,211,153,0.12)' : o.status === 'Processing' ? 'rgba(91,138,247,0.12)' : 'rgba(251,191,36,0.12)', color: o.status === 'Delivered' ? '#34D399' : o.status === 'Processing' ? '#5B8AF7' : '#FBBF24' }}>
                  {o.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
