// 10 — Create Group flow
function ScreenCreateGroup() {
  const [name, setName] = React.useState('Slow Burners');
  const [mood, setMood] = React.useState('curious');
  const [priority, setPriority] = React.useState(new Set(['diversity', 'depth']));
  const [tg, setTg] = React.useState(true);

  const toggle = (id) => {
    const s = new Set(priority);
    s.has(id) ? s.delete(id) : s.add(id);
    setPriority(s);
  };

  const moods = [
    { id: 'curious', label: 'Curious',     emoji: '✦', c: '#D4FF3D' },
    { id: 'cozy',    label: 'Cozy',        emoji: '◐', c: '#FF7E6B' },
    { id: 'critical',label: 'Critical',    emoji: '◇', c: '#7C5BFF' },
    { id: 'wild',    label: 'Wild',        emoji: '⚡', c: '#E8E0FF' },
  ];

  return (
    <div className="rm-screen" style={{ background: '#FBF6EB' }}>
      <div className="rm-body" style={{ padding: '60px 22px 120px' }}>
        {/* top */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <button style={{ width: 36, height: 36, borderRadius: 12, border: 'none', background: '#fff', color: '#16102E', boxShadow: '0 0 0 1px rgba(22,16,46,0.08)', cursor: 'pointer', fontSize: 16 }}>‹</button>
          <span className="rm-mono" style={{ fontSize: 11, color: 'rgba(22,16,46,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Step 1 of 3</span>
          <button style={{ padding: '6px 12px', borderRadius: 999, border: 'none', background: 'transparent', color: '#7C5BFF', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Skip</button>
        </div>

        <div className="rm-display" style={{ fontSize: 38, color: '#16102E', lineHeight: 0.95 }}>
          Start a<br/>
          <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 400, color: '#7C5BFF' }}>reading circle</span>
        </div>
        <div style={{ fontSize: 14, color: 'rgba(22,16,46,0.6)', marginTop: 10, lineHeight: 1.4 }}>
          Pick a name, set the vibe, and we'll spin up a Telegram channel to keep everyone synced.
        </div>

        {/* group image + name */}
        <div style={{ marginTop: 22, padding: 18, borderRadius: 22, background: '#fff', boxShadow: '0 0 0 1px rgba(22,16,46,0.06) inset' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 76, height: 76, borderRadius: 22, background: 'linear-gradient(140deg, #7C5BFF, #2B1B69)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
              <Star size={28} fill="#D4FF3D" style={{ position: 'absolute', top: 8, right: 8, transform: 'rotate(12deg)' }} />
              <span className="rm-display" style={{ fontSize: 34, color: '#FBF6EB' }}>SB</span>
              <div style={{ position: 'absolute', bottom: 4, right: 4, width: 22, height: 22, borderRadius: 11, background: '#D4FF3D', color: '#16102E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>+</div>
            </div>
            <div style={{ flex: 1 }}>
              <div className="rm-mono" style={{ fontSize: 10, color: 'rgba(22,16,46,0.55)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>Group name</div>
              <input value={name} onChange={e => setName(e.target.value)} style={{
                width: '100%', border: 'none', outline: 'none', background: 'transparent',
                fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 22, color: '#16102E',
                padding: 0, letterSpacing: '-0.02em',
              }} />
              <div style={{ marginTop: 6, height: 2, background: 'linear-gradient(90deg, #7C5BFF, transparent)', borderRadius: 1 }} />
            </div>
          </div>
        </div>

        {/* mood */}
        <div style={{ marginTop: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
            <span className="rm-display" style={{ fontSize: 18, color: '#16102E' }}>Group mood</span>
            <span className="rm-mono" style={{ fontSize: 10, color: 'rgba(22,16,46,0.45)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>shapes recs</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
            {moods.map(m => {
              const on = m.id === mood;
              return (
                <button key={m.id} onClick={() => setMood(m.id)} style={{
                  padding: '16px 14px', borderRadius: 18, cursor: 'pointer',
                  border: 'none', textAlign: 'left',
                  background: on ? m.c : '#fff',
                  boxShadow: on ? '0 8px 22px rgba(22,16,46,0.14)' : '0 0 0 1px rgba(22,16,46,0.08) inset',
                  display: 'flex', alignItems: 'center', gap: 10,
                  transform: on ? 'rotate(-0.8deg)' : 'none',
                }}>
                  <span style={{ width: 36, height: 36, borderRadius: 12, background: on ? '#16102E' : m.c, color: on ? m.c : '#16102E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 18 }}>{m.emoji}</span>
                  <span style={{ fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 16, color: '#16102E' }}>{m.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* priorities */}
        <div style={{ marginTop: 16 }}>
          <div className="rm-display" style={{ fontSize: 18, color: '#16102E', marginBottom: 10 }}>Recommendation priorities</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {[
              { id: 'diversity',  l: 'Diversity',         c: '#7C5BFF' },
              { id: 'depth',      l: 'Depth over speed',  c: '#D4FF3D' },
              { id: 'fairness',   l: 'Fairness-aware',    c: '#FF7E6B' },
              { id: 'minority',   l: 'Minority voices',   c: '#E8E0FF' },
              { id: 'novelty',    l: 'Novelty',           c: '#FBF6EB' },
              { id: 'short',      l: 'Short reads',       c: '#fff' },
            ].map(p => {
              const on = priority.has(p.id);
              return (
                <button key={p.id} onClick={() => toggle(p.id)} style={{
                  border: 'none', cursor: 'pointer',
                  padding: '10px 14px', borderRadius: 999,
                  background: on ? p.c : '#fff',
                  color: '#16102E',
                  fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: on ? 700 : 500, fontSize: 13,
                  boxShadow: on ? '0 0 0 1.5px #16102E inset' : '0 0 0 1px rgba(22,16,46,0.12) inset',
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                }}>
                  {p.l}
                  {on && <span style={{ width: 14, height: 14, borderRadius: '50%', background: '#16102E', color: p.c, fontSize: 9, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Telegram sync card */}
        <div style={{ marginTop: 18, borderRadius: 22, padding: 18, background: tg ? '#16102E' : '#fff', color: tg ? '#FBF6EB' : '#16102E', position: 'relative', overflow: 'hidden', boxShadow: tg ? '0 12px 30px rgba(22,16,46,0.18)' : '0 0 0 1px rgba(22,16,46,0.08) inset' }}>
          {tg && <Blob size={130} fill="#7C5BFF" style={{ position: 'absolute', right: -40, top: -40, opacity: 0.35 }} />}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, position: 'relative' }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: tg ? '#D4FF3D' : '#E8E0FF', color: '#16102E', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700 }}>
              {/* paper-plane glyph */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M21 3 11 14M21 3 14.5 21l-3.5-7-7-3.5L21 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div style={{ flex: 1 }}>
              <div className="rm-display" style={{ fontSize: 17 }}>Mirror to Telegram</div>
              <div style={{ fontSize: 12.5, opacity: 0.75, marginTop: 4, lineHeight: 1.4 }}>
                We'll create a private channel. Members, votes, recommendations and discussions sync both ways.
              </div>
              {tg && (
                <div style={{ marginTop: 10, display: 'flex', gap: 6 }}>
                  <span className="rm-pill rm-pill-lime" style={{ fontSize: 10 }}>● Auto-sync</span>
                  <span className="rm-mono" style={{ padding: '4px 10px', borderRadius: 999, background: 'rgba(255,255,255,0.08)', color: 'rgba(251,246,235,0.7)', fontSize: 10, letterSpacing: '0.06em' }}>t.me/rm-slowburners</span>
                </div>
              )}
            </div>
            {/* toggle */}
            <button onClick={() => setTg(!tg)} style={{ width: 50, height: 30, borderRadius: 15, border: 'none', cursor: 'pointer', background: tg ? '#D4FF3D' : 'rgba(22,16,46,0.15)', position: 'relative', flexShrink: 0 }}>
              <span style={{ position: 'absolute', top: 3, left: tg ? 23 : 3, width: 24, height: 24, borderRadius: 12, background: '#16102E', transition: 'left .18s' }} />
            </button>
          </div>
        </div>

        {/* compatibility preview */}
        <div style={{ marginTop: 14, padding: 16, borderRadius: 18, background: '#fff', boxShadow: '0 0 0 1px rgba(22,16,46,0.06) inset' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div className="rm-mono" style={{ fontSize: 9.5, color: 'rgba(22,16,46,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Preview</div>
              <div style={{ display: 'flex', marginTop: 8 }}>
                {MEMBERS.slice(0,3).map((m, i) => (
                  <div key={m.id} style={{ marginLeft: i === 0 ? 0 : -8 }}><Avatar m={m} size={28} /></div>
                ))}
                <div style={{ marginLeft: -8, width: 28, height: 28, borderRadius: 14, background: '#16102E', color: '#D4FF3D', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, boxShadow: '0 0 0 2px #fff' }}>+2</div>
              </div>
            </div>
            <Ring value={84} size={56} stroke={5} color="#7C5BFF" track="rgba(22,16,46,0.1)" textColor="#16102E" />
          </div>
        </div>
      </div>

      {/* footer */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '14px 20px 26px', background: 'linear-gradient(180deg, rgba(251,246,235,0) 0%, #FBF6EB 30%)' }}>
        <button style={{
          width: '100%', height: 60, border: 'none', cursor: 'pointer',
          borderRadius: 30, background: '#16102E', color: '#FBF6EB',
          fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 17,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px 0 24px',
        }}>
          <span>Next · Invite members</span>
          <span style={{ width: 44, height: 44, borderRadius: 22, background: '#D4FF3D', color: '#16102E', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>→</span>
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { ScreenCreateGroup });
