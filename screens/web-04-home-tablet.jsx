// web-04 — Tablet Home (820 × 1180 portrait) — collapsed sidebar, stacked rail
function ScreenWebHomeTablet() {
  const icons = [
    { id: 'home',     icon: '◐', on: true },
    { id: 'discover', icon: '✦' },
    { id: 'groups',   icon: '◉' },
    { id: 'shelf',    icon: '☰' },
    { id: 'sync',     icon: '✈', live: true },
  ];

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', background: '#F4F1FF', color: '#16102E', fontFamily: "'Inter', system-ui" }}>
      {/* collapsed sidebar */}
      <aside style={{ width: 72, padding: '20px 12px', background: '#fff', borderRight: '1px solid rgba(22,16,46,0.08)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, flexShrink: 0 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: '#16102E', color: '#D4FF3D', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 20 }}>✦</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 4 }}>
          {icons.map(i => (
            <button key={i.id} style={{ width: 48, height: 48, borderRadius: 14, border: 'none', cursor: 'pointer', background: i.on ? '#16102E' : 'transparent', color: i.on ? '#D4FF3D' : '#3A2F5C', fontSize: 16, position: 'relative' }}>
              {i.icon}
              {i.live && <span style={{ position: 'absolute', top: 8, right: 8, width: 7, height: 7, borderRadius: 4, background: '#D4FF3D', boxShadow: '0 0 0 2px #fff' }} />}
            </button>
          ))}
        </div>
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
          {[
            { i: 'SB', c: '#7C5BFF', on: true },
            { i: 'CC', c: '#FF7E6B' },
            { i: 'LG', c: '#D4FF3D' },
          ].map(g => (
            <div key={g.i} style={{ width: 36, height: 36, borderRadius: 11, background: g.c, color: '#16102E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 12, boxShadow: g.on ? '0 0 0 2.5px #16102E' : 'none' }}>{g.i}</div>
          ))}
          <Avatar m={MEMBERS[0]} size={36} />
        </div>
      </aside>

      {/* main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* topbar simplified */}
        <header style={{ height: 76, padding: '0 24px', borderBottom: '1px solid rgba(22,16,46,0.06)', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div className="rm-display" style={{ fontSize: 24, lineHeight: 1, letterSpacing: '-0.02em' }}>Hey, Maya ✦</div>
            <div className="rm-mono" style={{ fontSize: 10, color: 'rgba(22,16,46,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4 }}>Slow Burners · 5 members in sync</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button style={{ width: 40, height: 40, borderRadius: 12, border: 'none', background: '#F4F1FF', color: '#7C5BFF', cursor: 'pointer', fontSize: 14 }}>◔</button>
            <button style={{ width: 40, height: 40, borderRadius: 12, border: 'none', background: '#fff', boxShadow: '0 0 0 1px rgba(22,16,46,0.08) inset', cursor: 'pointer', fontSize: 14, position: 'relative' }}>♡<span style={{ position: 'absolute', top: 6, right: 6, width: 6, height: 6, borderRadius: 3, background: '#FF7E6B' }}/></button>
          </div>
        </header>

        {/* scroll */}
        <div style={{ flex: 1, padding: 20, display: 'flex', flexDirection: 'column', gap: 16, overflow: 'auto' }}>
          {/* hero recommendation */}
          <div style={{ borderRadius: 24, padding: 22, background: 'linear-gradient(155deg, #2B1B69, #16102E 60%, #1A1042)', color: '#FBF6EB', position: 'relative', overflow: 'hidden' }}>
            <Blob size={200} fill="#7C5BFF" style={{ position: 'absolute', right: -60, top: -60, opacity: 0.35 }} />
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <span className="rm-pill rm-pill-lime">★ This week's match</span>
              <Ring value={89} size={56} stroke={5} color="#D4FF3D" textColor="#FBF6EB" />
            </div>
            <div style={{ display: 'flex', gap: 18, marginTop: 16 }}>
              <BookCover book={BOOKS[1]} w={130} h={184} tilt={-3} />
              <div style={{ flex: 1 }}>
                <div className="rm-display" style={{ fontSize: 32, lineHeight: 0.95 }}>Soft<br/>Algorithms</div>
                <div className="rm-serif-italic" style={{ fontSize: 15, color: 'rgba(251,246,235,0.7)', marginTop: 4 }}>Yuki Tanabe</div>
                <div style={{ marginTop: 12, padding: 12, borderRadius: 12, background: 'rgba(255,255,255,0.06)' }}>
                  <div className="rm-mono" style={{ fontSize: 9, color: '#D4FF3D', letterSpacing: '0.1em', textTransform: 'uppercase' }}>✦ Why this matches</div>
                  <div style={{ fontSize: 12.5, lineHeight: 1.4, marginTop: 4 }}>Iris' dark-academia + Theo's essays. Diversity <b style={{ color: '#D4FF3D' }}>+18%</b>.</div>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              <button style={{ flex: 1, height: 44, borderRadius: 12, border: 'none', background: '#D4FF3D', color: '#16102E', fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>I'm in →</button>
              <button style={{ flex: 1, height: 44, borderRadius: 12, border: '0.5px solid rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.06)', color: '#FBF6EB', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>See alternates</button>
            </div>
          </div>

          {/* 2-col: telegram + stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 14 }}>
            <div style={{ borderRadius: 20, padding: 16, background: '#16102E', color: '#FBF6EB', position: 'relative', overflow: 'hidden' }}>
              <Blob size={100} fill="#7C5BFF" style={{ position: 'absolute', right: -30, top: -30, opacity: 0.3 }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 30, height: 30, borderRadius: 9, background: '#D4FF3D', color: '#16102E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24"><path d="M21 3 11 14M21 3 14.5 21l-3.5-7-7-3.5L21 3z" stroke="currentColor" strokeWidth="2" fill="none"/></svg>
                </div>
                <div>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <span style={{ fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 13 }}>Telegram</span>
                    <span style={{ padding: '1px 5px', borderRadius: 5, background: '#D4FF3D', color: '#16102E', fontSize: 8.5, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>● LIVE</span>
                  </div>
                  <div className="rm-mono" style={{ fontSize: 9, color: 'rgba(212,255,61,0.7)' }}>3 new · 6m</div>
                </div>
              </div>
              <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 5 }}>
                {[{ m: MEMBERS[2], t: 'voted ★' }, { m: MEMBERS[1], t: 'finished a book' }].map((e,i) => (
                  <div key={i} style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 11, color: 'rgba(251,246,235,0.85)' }}>
                    <Avatar m={e.m} size={18} />
                    <span><b>{e.m.name}</b> {e.t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ borderRadius: 16, padding: 12, background: '#D4FF3D' }}>
                <div className="rm-mono" style={{ fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.7 }}>Group mood</div>
                <div className="rm-display" style={{ fontSize: 16, marginTop: 2, lineHeight: 1 }}>Curious &<br/>contemplative</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ flex: 1, borderRadius: 14, padding: 10, background: '#FF7E6B' }}>
                  <div className="rm-mono" style={{ fontSize: 8.5, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.7 }}>Pages</div>
                  <div className="rm-display" style={{ fontSize: 22, marginTop: 2 }}>1.2k</div>
                </div>
                <div style={{ flex: 1, borderRadius: 14, padding: 10, background: '#16102E', color: '#FBF6EB' }}>
                  <div className="rm-mono" style={{ fontSize: 8.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(251,246,235,0.5)' }}>Div.</div>
                  <div className="rm-display" style={{ fontSize: 22, marginTop: 2, color: '#D4FF3D' }}>0.78</div>
                </div>
              </div>
            </div>
          </div>

          {/* alternates row */}
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
              <span className="rm-display" style={{ fontSize: 18 }}>Alternates</span>
              <a href="#" style={{ fontSize: 11.5, color: '#7C5BFF', textDecoration: 'none', fontWeight: 600 }}>See all →</a>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {BOOKS.slice(0,3).map(b => (
                <div key={b.id} style={{ borderRadius: 14, padding: 8, background: '#fff' }}>
                  <BookCover book={b} w={210} h={290} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, alignItems: 'center' }}>
                    <span className="rm-mono" style={{ fontSize: 10, color: '#7C5BFF', fontWeight: 700 }}>{b.match}%</span>
                    <button style={{ width: 22, height: 22, borderRadius: '50%', border: 'none', background: '#F4F1FF', cursor: 'pointer' }}>+</button>
                  </div>
                  <div style={{ fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 13, marginTop: 3 }}>{b.title}</div>
                </div>
              ))}
            </div>
          </div>

          {/* members row */}
          <div style={{ borderRadius: 20, padding: 14, background: '#fff', boxShadow: '0 0 0 1px rgba(22,16,46,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span className="rm-display" style={{ fontSize: 17 }}>Members compatibility</span>
              <span className="rm-pill rm-pill-purple" style={{ fontSize: 10 }}>5 synced</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
              {MEMBERS.map((m,i) => (
                <div key={m.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <Avatar m={m} size={42} />
                  <span style={{ fontSize: 11.5, fontWeight: 600 }}>{m.name}</span>
                  <Ring value={[92,88,95,76,81][i]} size={36} stroke={3} color={m.hue} track="rgba(22,16,46,0.06)" textColor="#16102E" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
Object.assign(window, { ScreenWebHomeTablet });
