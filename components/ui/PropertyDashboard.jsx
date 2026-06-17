const listings = [
  {
    name: 'Skyline Residences', loc: 'Bandra, Mumbai',
    price: '₹2.4Cr', beds: '3 BHK', type: 'Apartment',
    bg: 'linear-gradient(135deg, #0a1628, #0d2040)', accent: '#60a5fa',
    sqft: '1,850 sq.ft',
  },
  {
    name: 'Green Valley Villa', loc: 'Whitefield, Bengaluru',
    price: '₹1.8Cr', beds: '4 BHK', type: 'Villa',
    bg: 'linear-gradient(135deg, #071a0f, #0a2414)', accent: '#34d399',
    sqft: '2,400 sq.ft',
  },
  {
    name: 'The Pearl Tower', loc: 'Powai, Mumbai',
    price: '₹3.1Cr', beds: '2 BHK', type: 'Penthouse',
    bg: 'linear-gradient(135deg, #10051f, #1a0830)', accent: '#a78bfa',
    sqft: '1,420 sq.ft',
  },
  {
    name: 'Sunrise Heights', loc: 'Koramangala, Bengaluru',
    price: '₹95L', beds: '2 BHK', type: 'Apartment',
    bg: 'linear-gradient(135deg, #1a0808, #240d0d)', accent: '#f87171',
    sqft: '980 sq.ft',
  },
]

export default function PropertyDashboard() {
  return (
    <div style={{ background: '#060608', fontFamily: 'system-ui, sans-serif', color: 'white', minHeight: 340, overflow: 'hidden' }}>

      {/* Navbar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 14px', background: '#0a0a0e', borderBottom: '1px solid rgba(239,68,68,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 14, height: 14, background: '#ef4444', borderRadius: 3 }} />
          <span style={{ fontWeight: 800, fontSize: 11, color: 'white', letterSpacing: '0.02em' }}>PropSpace</span>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {['Buy', 'Rent', 'Commercial', 'New Projects'].map(l => (
            <span key={l} style={{ fontSize: 7, color: 'rgba(255,255,255,0.3)' }}>{l}</span>
          ))}
        </div>
        <div style={{ background: '#ef4444', borderRadius: 4, padding: '3px 8px', fontSize: 7, fontWeight: 700, color: 'white' }}>
          Post Property
        </div>
      </div>

      {/* Hero search section */}
      <div style={{
        background: 'linear-gradient(135deg, #0d0305 0%, #1a0808 50%, #0d0305 100%)',
        padding: '16px 14px 14px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(239,68,68,0.06), transparent)', pointerEvents: 'none' }} />
        <p style={{ fontSize: 7, color: 'rgba(248,113,113,0.7)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 6 }}>India's #1 Property Platform</p>
        <h2 style={{ fontSize: 16, fontWeight: 800, lineHeight: 1.2, marginBottom: 10, color: 'white' }}>
          Find Your<br />Dream Property
        </h2>

        {/* Search tabs */}
        <div style={{ display: 'flex', gap: 1, marginBottom: 8 }}>
          {['Buy', 'Rent', 'New Projects', 'Commercial'].map((t, i) => (
            <span key={t} style={{
              fontSize: 7, padding: '3px 8px', borderRadius: '4px 4px 0 0',
              background: i === 0 ? '#ef4444' : 'rgba(255,255,255,0.05)',
              color: i === 0 ? 'white' : 'rgba(255,255,255,0.3)',
            }}>{t}</span>
          ))}
        </div>

        {/* Search bar */}
        <div style={{ display: 'flex', gap: 5, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 8, padding: '6px 8px', alignItems: 'center' }}>
          <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.2)' }}>📍</span>
          <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.25)', flex: 1 }}>Search city, locality, landmark...</span>
          <div style={{ background: '#ef4444', borderRadius: 5, padding: '3px 8px', fontSize: 7, fontWeight: 700, color: 'white', flexShrink: 0 }}>Search</div>
        </div>

        {/* Quick filters */}
        <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
          {['2 BHK', '3 BHK', 'Under ₹1Cr', 'Ready to Move', 'New Launch'].map((f, i) => (
            <span key={f} style={{
              fontSize: 6, padding: '2px 6px', borderRadius: 12,
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171',
            }}>{f}</span>
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.04)', padding: '6px 14px', gap: 16 }}>
        {[['12,000+', 'Monthly Buyers'], ['1,240', 'Active Listings'], ['₹450Cr+', 'Properties Sold']].map(([v, l]) => (
          <div key={l} style={{ display: 'flex', gap: 4, alignItems: 'baseline' }}>
            <span style={{ fontSize: 9, fontWeight: 700, color: '#ef4444' }}>{v}</span>
            <span style={{ fontSize: 6.5, color: 'rgba(255,255,255,0.25)' }}>{l}</span>
          </div>
        ))}
      </div>

      {/* Listings */}
      <div style={{ padding: '10px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <p style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Featured Listings</p>
          <p style={{ fontSize: 7, color: '#f87171' }}>View All 1,240 →</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          {listings.map((l) => (
            <div key={l.name} style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
              {/* Property image */}
              <div style={{ height: 44, background: l.bg, position: 'relative', overflow: 'hidden' }}>
                {/* Building silhouette */}
                <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 28, height: 32, background: `${l.accent}30`, borderRadius: '3px 3px 0 0', border: `1px solid ${l.accent}40` }} />
                <div style={{ position: 'absolute', bottom: 0, left: 'calc(50% - 18px)', width: 12, height: 20, background: `${l.accent}20`, borderRadius: '2px 2px 0 0' }} />
                <div style={{ position: 'absolute', bottom: 0, right: 'calc(50% - 22px)', width: 10, height: 24, background: `${l.accent}18`, borderRadius: '2px 2px 0 0' }} />
                <div style={{ position: 'absolute', top: 4, right: 4, background: `${l.accent}20`, border: `1px solid ${l.accent}35`, borderRadius: 3, padding: '1px 4px', fontSize: 5.5, color: l.accent }}>
                  {l.type}
                </div>
                <div style={{ position: 'absolute', top: 4, left: 4, fontSize: 6, color: 'rgba(255,255,255,0.3)' }}>📍</div>
              </div>
              <div style={{ padding: '5px 7px' }}>
                <p style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.75)', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.name}</p>
                <p style={{ fontSize: 6, color: 'rgba(255,255,255,0.25)', marginTop: 1 }}>{l.loc}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
                  <span style={{ fontSize: 8, color: 'white', fontWeight: 700 }}>{l.price}</span>
                  <span style={{ fontSize: 6, color: 'rgba(255,255,255,0.3)' }}>{l.beds} · {l.sqft}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
