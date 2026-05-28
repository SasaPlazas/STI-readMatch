// 02b — Onboarding 2: Reading Behavior
function ScreenOnb2() {
  const [freq, setFreq] = React.useState('weekly');

  // Top 5 with reorderable list
  const top5 = [
    { ...BOOKS[2], rank: 1, tag: 'Comfort read' },
    { ...BOOKS[3], rank: 2, tag: 'Mind-expanding' },
    { ...BOOKS[0], rank: 3, tag: 'Life-changing' },
    { ...BOOKS[5], rank: 4, tag: 'Emotionally intense' },
  ];
  const emotionalTags = [
    { l: 'Life-changing',   c: '#D4FF3D' },
    { l: 'Comfort',         c: '#FF7E6B' },
    { l: 'Mind-expanding',  c: '#7C5BFF' },
    { l: 'Emotional',       c: '#E8E0FF' },
  ];
  const shelves = [
    { id: 'rd',   l: 'Read',              cnt: 142, c: '#D4FF3D', icon: '✓' },
    { id: 'now',  l: 'Currently reading', cnt: 2,   c: '#FF7E6B', icon: '◐' },
    { id: 'wnt',  l: 'Want to read',      cnt: 28,  c: '#7C5BFF', icon: '☆' },
    { id: 'fav',  l: 'Favorites',         cnt: 18,  c: '#E8E0FF', icon: '♥' },
    { id: 'drop', l: 'Dropped',           cnt: 6,   c: '#16102E', icon: '✕', dark: true },
  ];

  return (
    <div className="rm-screen" style={{ background: '#FBF6EB' }}>
      <div className="rm-body" style={{ padding: '54px 22px 110px' }}>
        {/* progress */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {[1,2,3,4].map(i => (
              <span key={i} style={{ width: 32, height: 4, borderRadius: 2, background: i <= 2 ? '#16102E' : 'rgba(22,16,46,0.15)' }} />
            ))}
          </div>
          <span className="rm-mono" style={{ fontSize: 11, color: 'rgba(22,16,46,0.5)', letterSpacing: '0.1em' }}>02 / 04</span>
        </div>

        <div className="rm-mono" style={{ fontSize: 10, color: '#FF7E6B', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700 }}>★ Chapter two</div>
        <div className="rm-display" style={{ fontSize: 40, color: '#16102E', lineHeight: 0.95, marginTop: 6 }}>
          Reading<br/>
          <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 400, color: '#FF7E6B' }}>history</span>
        </div>

        {/* Q1 - Top 5 */}
        <div style={{ marginTop: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 19, color: '#16102E' }}>Your top 5 ever</span>
            <span className="rm-mono" style={{ fontSize: 10, color: 'rgba(22,16,46,0.45)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>drag to rank</span>
          </div>

          {/* ranking list */}
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {top5.map((b, i) => (
              <div key={b.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 10, borderRadius: 18, background: '#fff', boxShadow: '0 0 0 1px rgba(22,16,46,0.05), 0 2px 8px rgba(22,16,46,0.04)', position: 'relative' }}>
                {/* drag handle */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '0 6px', cursor: 'grab' }}>
                  {[0,1,2].map(d => (
                    <div key={d} style={{ display: 'flex', gap: 2 }}>
                      <span style={{ width: 3, height: 3, borderRadius: 1.5, background: 'rgba(22,16,46,0.25)' }} />
                      <span style={{ width: 3, height: 3, borderRadius: 1.5, background: 'rgba(22,16,46,0.25)' }} />
                    </div>
                  ))}
                </div>
                {/* rank */}
                <div className="rm-display" style={{ fontSize: 24, color: '#16102E', width: 26, textAlign: 'center' }}>{b.rank}</div>
                {/* cover */}
                <BookCover book={b} w={46} h={64} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 14, color: '#16102E', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.title}</div>
                  <div className="rm-mono" style={{ fontSize: 9.5, color: 'rgba(22,16,46,0.5)', marginTop: 2, letterSpacing: '0.04em' }}>{b.author}</div>
                  <span style={{ display: 'inline-flex', marginTop: 4, padding: '2px 8px', borderRadius: 999, background: emotionalTags[i % 4].c, color: '#16102E', fontSize: 10, fontWeight: 700, fontFamily: "'Bricolage Grotesque', system-ui" }}>{b.tag}</span>
                </div>
              </div>
            ))}
            {/* add slot */}
            <button style={{ height: 60, borderRadius: 18, border: '1.5px dashed rgba(22,16,46,0.2)', background: 'transparent', color: 'rgba(22,16,46,0.55)', cursor: 'pointer', fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 600, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <span style={{ width: 24, height: 24, borderRadius: 12, background: 'rgba(22,16,46,0.08)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>+</span>
              Add #5
            </button>
          </div>

          {/* emotional tag picker hint */}
          <div style={{ marginTop: 10, padding: 12, borderRadius: 14, background: 'rgba(124,91,255,0.08)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 26, height: 26, borderRadius: 8, background: '#7C5BFF', color: '#FBF6EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>✦</span>
            <div style={{ fontSize: 11.5, color: '#3A2F5C', lineHeight: 1.4 }}>
              Tap a book to add emotional tags — they shape your aura.
            </div>
          </div>
        </div>

        {/* Q2 - Shelves */}
        <div style={{ marginTop: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 19, color: '#16102E' }}>Build your shelves</span>
            <span className="rm-mono" style={{ fontSize: 10, color: 'rgba(22,16,46,0.45)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>import goodreads ↗</span>
          </div>
          <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
            {shelves.map(s => (
              <div key={s.id} style={{
                borderRadius: 18, padding: 14, position: 'relative', overflow: 'hidden',
                background: s.dark ? s.c : s.c, color: s.dark ? '#FBF6EB' : '#16102E',
                gridColumn: s.id === 'drop' ? 'span 2' : 'auto',
                boxShadow: '0 0 0 1.5px #16102E inset',
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <span style={{ width: 28, height: 28, borderRadius: 9, background: s.dark ? 'rgba(212,255,61,0.18)' : '#16102E', color: s.dark ? '#D4FF3D' : s.c, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 14 }}>{s.icon}</span>
                  <span className="rm-display" style={{ fontSize: 24, lineHeight: 1 }}>{s.cnt}</span>
                </div>
                <div style={{ fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 14, marginTop: 10 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Q3 - Frequency */}
        <div style={{ marginTop: 22 }}>
          <div style={{ fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 19, color: '#16102E', marginBottom: 4 }}>How often do you read?</div>
          <div className="rm-mono" style={{ fontSize: 10, color: 'rgba(22,16,46,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>be honest — sets your pace</div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
            {[
              { id: 'daily',    l: 'Daily',        sub: 'reader · always', c: '#D4FF3D', icon: '☼' },
              { id: 'weekly',   l: 'Weekly',       sub: 'committed',       c: '#7C5BFF', icon: '◐' },
              { id: 'occas',    l: 'Occasionally', sub: 'when it calls',   c: '#FF7E6B', icon: '◌' },
              { id: 'seasonal', l: 'Seasonal',     sub: 'binge & rest',    c: '#E8E0FF', icon: '❀' },
            ].map(o => {
              const on = freq === o.id;
              return (
                <button key={o.id} onClick={() => setFreq(o.id)} style={{
                  padding: 16, borderRadius: 18, cursor: 'pointer', border: 'none', textAlign: 'left',
                  background: on ? o.c : '#fff', color: '#16102E',
                  boxShadow: on ? '0 0 0 2px #16102E inset, 0 10px 22px rgba(22,16,46,0.12)' : '0 0 0 1px rgba(22,16,46,0.08) inset',
                  transform: on ? 'rotate(-1deg)' : 'none',
                  transition: 'transform .15s',
                }}>
                  <span style={{ display: 'inline-flex', width: 32, height: 32, borderRadius: 10, background: on ? '#16102E' : o.c, color: on ? o.c : '#16102E', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontFamily: "'Bricolage Grotesque', system-ui" }}>{o.icon}</span>
                  <div className="rm-display" style={{ fontSize: 20, marginTop: 10 }}>{o.l}</div>
                  <div className="rm-mono" style={{ fontSize: 10, opacity: 0.65, marginTop: 2, letterSpacing: '0.04em' }}>{o.sub}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* footer */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '14px 20px 26px', background: 'linear-gradient(180deg, rgba(251,246,235,0) 0%, #FBF6EB 28%)' }}>
        <button style={{
          width: '100%', height: 60, border: 'none', cursor: 'pointer',
          borderRadius: 30, background: '#16102E', color: '#FBF6EB',
          fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 17,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px 0 24px',
        }}>
          <span>Continue · Personality</span>
          <span style={{ width: 44, height: 44, borderRadius: 22, background: '#D4FF3D', color: '#16102E', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>→</span>
        </button>
      </div>
    </div>
  );
}
Object.assign(window, { ScreenOnb2 });
