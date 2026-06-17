export default function EcommerceDashboard() {
  const products = [
    { name: 'Marble Sofa', price: '₹42,000', tag: 'Best Seller', bg: '#1e0a3a', accent: '#c084fc' },
    { name: 'Oak Desk', price: '₹18,500', tag: 'New', bg: '#0a1a2e', accent: '#60a5fa' },
    { name: 'Linen Chair', price: '₹9,200', tag: 'Sale', bg: '#0a1e0f', accent: '#34d399' },
    { name: 'Glass Table', price: '₹31,000', tag: null, bg: '#1e1000', accent: '#fbbf24' },
    { name: 'Teak Shelf', price: '₹14,800', tag: 'Popular', bg: '#140828', accent: '#a78bfa' },
    { name: 'Steel Lamp', price: '₹6,400', tag: null, bg: '#1a0a10', accent: '#f87171' },
  ]

  return (
    <div style={{ background: '#07030e', fontFamily: 'system-ui, sans-serif', color: 'white', minHeight: 340, overflow: 'hidden' }}>

      {/* Navbar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 14px', borderBottom: '1px solid rgba(192,132,252,0.12)', background: '#0a0415' }}>
        <span style={{ fontWeight: 800, fontSize: 11, letterSpacing: '0.04em', color: '#c084fc' }}>NexCommerce</span>
        <div style={{ display: 'flex', gap: 10 }}>
          {['Home', 'Shop', 'Collections', 'About'].map(l => (
            <span key={l} style={{ fontSize: 7, color: 'rgba(255,255,255,0.3)' }}>{l}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 7, color: 'rgba(255,255,255,0.3)' }}>Search</span>
          <div style={{ background: '#a855f7', borderRadius: 4, padding: '2px 7px', fontSize: 7, fontWeight: 700, color: 'white' }}>
            Cart (3)
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(135deg, #0d0320 0%, #1a0540 60%, #2a0a5e 100%)',
        padding: '18px 14px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        minHeight: 90,
      }}>
        {/* Glow */}
        <div style={{ position: 'absolute', right: 40, top: -10, width: 80, height: 80, borderRadius: '50%', background: 'rgba(168,85,247,0.25)', filter: 'blur(24px)', pointerEvents: 'none' }} />

        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 7, color: 'rgba(192,132,252,0.7)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 4 }}>
            New Collection — AW 2024
          </div>
          <div style={{ fontSize: 17, fontWeight: 800, lineHeight: 1.1, color: 'white', marginBottom: 6 }}>
            Modern Living<br />
            <span style={{ WebkitTextStroke: '1px rgba(192,132,252,0.6)', WebkitTextFillColor: 'transparent' }}>Reimagined.</span>
          </div>
          <p style={{ fontSize: 7, color: 'rgba(255,255,255,0.35)', marginBottom: 8, maxWidth: 140 }}>
            Premium furniture crafted for the contemporary home.
          </p>
          <div style={{ display: 'flex', gap: 6 }}>
            <button style={{ background: '#a855f7', color: 'white', border: 'none', borderRadius: 20, padding: '4px 10px', fontSize: 7, fontWeight: 700, cursor: 'pointer' }}>
              Shop Now →
            </button>
            <button style={{ background: 'transparent', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 20, padding: '4px 10px', fontSize: 7 }}>
              View Lookbook
            </button>
          </div>
        </div>

        {/* Product visual */}
        <div style={{ position: 'relative', width: 72, height: 72, flexShrink: 0 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(168,85,247,0.15)', borderRadius: 12, border: '1px solid rgba(168,85,247,0.3)' }} />
          <div style={{ position: 'absolute', top: '15%', left: '15%', right: '15%', bottom: '30%', background: 'rgba(168,85,247,0.35)', borderRadius: 8 }} />
          <div style={{ position: 'absolute', bottom: '10%', left: '20%', right: '20%', height: 6, background: 'rgba(0,0,0,0.3)', borderRadius: 3, filter: 'blur(3px)' }} />
        </div>
      </div>

      {/* Category pills */}
      <div style={{ display: 'flex', gap: 5, padding: '8px 14px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        {['All', 'Sofas', 'Tables', 'Chairs', 'Lighting', 'Storage'].map((c, i) => (
          <span key={c} style={{
            fontSize: 7, padding: '2px 8px', borderRadius: 20,
            background: i === 0 ? '#a855f7' : 'rgba(255,255,255,0.05)',
            color: i === 0 ? 'white' : 'rgba(255,255,255,0.3)',
            border: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.08)',
          }}>{c}</span>
        ))}
      </div>

      {/* Product Grid */}
      <div style={{ padding: '10px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <p style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Featured Products</p>
          <p style={{ fontSize: 7, color: '#a855f7' }}>View All →</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
          {products.map((p) => (
            <div key={p.name} style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
              {/* Product image area */}
              <div style={{ height: 52, background: p.bg, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* Abstract product shape */}
                <div style={{ width: 30, height: 24, background: `${p.accent}40`, borderRadius: 4, border: `1px solid ${p.accent}50` }} />
                <div style={{ position: 'absolute', bottom: 3, left: '50%', transform: 'translateX(-50%)', width: 20, height: 2, background: `${p.accent}30`, borderRadius: 2, filter: 'blur(2px)' }} />
                {p.tag && (
                  <div style={{ position: 'absolute', top: 3, left: 3, background: `${p.accent}25`, border: `1px solid ${p.accent}40`, borderRadius: 3, padding: '1px 4px', fontSize: 6, color: p.accent }}>
                    {p.tag}
                  </div>
                )}
              </div>
              <div style={{ padding: '5px 6px' }}>
                <p style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.65)', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 }}>
                  <p style={{ fontSize: 8, color: 'white', fontWeight: 700 }}>{p.price}</p>
                  <div style={{ width: 14, height: 14, borderRadius: '50%', background: `${p.accent}20`, border: `1px solid ${p.accent}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: 7, color: p.accent }}>+</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
