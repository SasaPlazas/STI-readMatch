// Shared desktop-web layout primitives for ReadMatch

// Left navigation sidebar
function WebSidebar({ active = 'home', w = 240 }) {
  const items = [
    { id: 'home',     l: 'Home',          icon: '◐' },
    { id: 'discover', l: 'Discover',      icon: '✦' },
    { id: 'groups',   l: 'Groups',        icon: '◉' },
    { id: 'shelf',    l: 'My shelf',      icon: '☰' },
    { id: 'sync',     l: 'Telegram sync', icon: '✈' },
  ];
  return (
    <aside style={{
      width: w, height: '100%', flexShrink: 0, padding: '24px 18px',
      background: '#fff', borderRight: '1px solid rgba(22,16,46,0.08)',
      display: 'flex', flexDirection: 'column', gap: 24,
    }}>
      {/* logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 6px' }}>
        <div style={{ width: 32, height: 32, borderRadius: 10, background: '#16102E', color: '#D4FF3D', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 800, fontSize: 18 }}>✦</div>
        <div className="rm-display" style={{ fontSize: 22, color: '#16102E', letterSpacing: '-0.04em' }}>
          read<span style={{ color: '#7C5BFF' }}>match</span>
        </div>
      </div>

      {/* nav */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {items.map(i => {
          const on = i.id === active;
          return (
            <a key={i.id} href="#" style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 12,
              background: on ? '#16102E' : 'transparent',
              color: on ? '#FBF6EB' : '#3A2F5C',
              textDecoration: 'none', fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: on ? 700 : 500, fontSize: 14,
            }}>
              <span style={{ width: 24, height: 24, borderRadius: 7, background: on ? '#D4FF3D' : '#F4F1FF', color: '#16102E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>{i.icon}</span>
              {i.l}
              {i.id === 'sync' && <span style={{ marginLeft: 'auto', padding: '2px 6px', borderRadius: 6, background: '#E8F8D5', color: '#3F6E12', fontSize: 9, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>● LIVE</span>}
            </a>
          );
        })}
      </nav>

      {/* groups */}
      <div>
        <div className="rm-mono" style={{ fontSize: 10, color: 'rgba(22,16,46,0.45)', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0 12px', marginBottom: 8 }}>Your circles</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {[
            { l: 'Slow Burners',     i: 'SB', c: '#7C5BFF', on: true },
            { l: 'Café Confessions', i: 'CC', c: '#FF7E6B' },
            { l: 'Lab Group',        i: 'LG', c: '#D4FF3D' },
          ].map(g => (
            <a key={g.l} href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 10, textDecoration: 'none', color: '#16102E', background: g.on ? 'rgba(124,91,255,0.08)' : 'transparent' }}>
              <div style={{ width: 26, height: 26, borderRadius: 8, background: g.c, color: '#16102E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 11 }}>{g.i}</div>
              <span style={{ fontSize: 13, fontWeight: g.on ? 600 : 500 }}>{g.l}</span>
              {g.on && <span style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: 3, background: '#7C5BFF' }} />}
            </a>
          ))}
          <button style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 10, background: 'transparent', border: '1.5px dashed rgba(22,16,46,0.18)', color: 'rgba(22,16,46,0.55)', cursor: 'pointer', fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 500, fontSize: 12, marginTop: 4 }}>
            <span style={{ width: 22, height: 22, borderRadius: 7, background: 'rgba(22,16,46,0.06)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>+</span>
            New circle
          </button>
        </div>
      </div>

      {/* user */}
      <div style={{ marginTop: 'auto', padding: 10, borderRadius: 12, background: '#F4F1FF', display: 'flex', alignItems: 'center', gap: 10 }}>
        <Avatar m={MEMBERS[0]} size={32} />
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: '#16102E' }}>Maya R.</div>
          <div className="rm-mono" style={{ fontSize: 9.5, color: 'rgba(22,16,46,0.55)', letterSpacing: '0.06em' }}>★ THE EXPLORER</div>
        </div>
        <button style={{ width: 26, height: 26, borderRadius: 7, border: 'none', background: '#fff', cursor: 'pointer', fontSize: 12 }}>⚙</button>
      </div>
    </aside>
  );
}

// Top bar
function WebTopBar({ title = 'Home', subtitle = '' }) {
  return (
    <header style={{ height: 72, padding: '0 32px', borderBottom: '1px solid rgba(22,16,46,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', flexShrink: 0 }}>
      <div>
        <div className="rm-display" style={{ fontSize: 26, color: '#16102E', lineHeight: 1, letterSpacing: '-0.02em' }}>{title}</div>
        {subtitle && <div className="rm-mono" style={{ fontSize: 10.5, color: 'rgba(22,16,46,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4 }}>{subtitle}</div>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* search */}
        <div style={{ height: 40, width: 280, borderRadius: 12, background: '#F4F1FF', display: 'flex', alignItems: 'center', padding: '0 14px', gap: 10 }}>
          <span style={{ color: '#7C5BFF' }}>◔</span>
          <span style={{ flex: 1, fontSize: 13, color: 'rgba(22,16,46,0.5)' }}>Search books, members, groups…</span>
          <span className="rm-mono" style={{ fontSize: 10, padding: '2px 6px', borderRadius: 5, background: '#fff', color: 'rgba(22,16,46,0.5)' }}>⌘ K</span>
        </div>
        <button style={{ height: 40, padding: '0 14px', borderRadius: 12, border: 'none', cursor: 'pointer', background: '#fff', color: '#16102E', boxShadow: '0 0 0 1px rgba(22,16,46,0.08) inset', fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 600, fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>★</span>
          New rec
        </button>
        <button style={{ width: 40, height: 40, borderRadius: 12, border: 'none', cursor: 'pointer', background: '#fff', boxShadow: '0 0 0 1px rgba(22,16,46,0.08) inset', position: 'relative', fontSize: 14 }}>
          ♡
          <span style={{ position: 'absolute', top: 6, right: 6, width: 7, height: 7, borderRadius: 4, background: '#FF7E6B' }} />
        </button>
        <Avatar m={MEMBERS[0]} size={40} />
      </div>
    </header>
  );
}

Object.assign(window, { WebSidebar, WebTopBar });
