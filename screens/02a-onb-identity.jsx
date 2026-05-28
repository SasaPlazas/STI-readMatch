// 02a — Onboarding 1: Literary Identity
function ScreenOnb1() {
  const stories = [
    { id: 'dark', l: 'Dark Academia',         g: 'linear-gradient(155deg,#2B1B69,#16102E)',         ink: '#D4FF3D', mood: 'velvet · ivy · candle' },
    { id: 'cozy', l: 'Cozy Fantasy',          g: 'linear-gradient(155deg,#FF7E6B,#FBF6EB)',          ink: '#16102E', mood: 'tea · hearth · familiar' },
    { id: 'psyc', l: 'Psychological',         g: 'linear-gradient(165deg,#7C5BFF,#E8E0FF)',          ink: '#16102E', mood: 'unreliable · interior' },
    { id: 'emo',  l: 'Emotional Narratives',  g: 'linear-gradient(170deg,#FF7E6B,#7C5BFF)',          ink: '#FBF6EB', mood: 'heart · ache · home' },
    { id: 'phi',  l: 'Philosophical',         g: 'linear-gradient(135deg,#16102E,#3A2F5C)',          ink: '#D4FF3D', mood: 'idea · paradox · slow' },
    { id: 'thr',  l: 'Fast Thrillers',        g: 'linear-gradient(165deg,#D4FF3D,#94B82A)',          ink: '#16102E', mood: 'pulse · cliff · grip' },
    { id: 'sci',  l: 'Sci-Fi Worlds',         g: 'linear-gradient(150deg,#7C5BFF,#16102E)',          ink: '#D4FF3D', mood: 'orbit · code · soft' },
    { id: 'char', l: 'Character-driven',      g: 'linear-gradient(165deg,#FBF6EB,#F0E6D2)',          ink: '#16102E', mood: 'voice · arc · life' },
  ];

  const [picked, setPicked] = React.useState(new Set(['dark','psyc','sci']));
  const togglePick = (id) => {
    const s = new Set(picked); s.has(id) ? s.delete(id) : s.add(id); setPicked(s);
  };

  const GENRES = [
    { id: 'lit', l: 'Literary',    c: '#7C5BFF' }, { id: 'fan', l: 'Fantasy',  c: '#D4FF3D' },
    { id: 'sci', l: 'Sci-Fi',      c: '#FF7E6B' }, { id: 'mys', l: 'Mystery',  c: '#E8E0FF' },
    { id: 'rom', l: 'Romance',     c: '#FBF6EB' }, { id: 'mem', l: 'Memoir',   c: '#fff' },
    { id: 'his', l: 'History',     c: '#7C5BFF' }, { id: 'hor', l: 'Horror',   c: '#FF7E6B' },
    { id: 'ess', l: 'Essays',      c: '#D4FF3D' }, { id: 'poe', l: 'Poetry',   c: '#E8E0FF' },
    { id: 'cli', l: 'Climate',     c: '#fff' },    { id: 'pol', l: 'Politics', c: '#FBF6EB' },
  ];
  const [genres, setGenres] = React.useState(new Set(['lit','sci','ess']));
  const toggleGenre = (id) => {
    const s = new Set(genres); s.has(id) ? s.delete(id) : s.add(id); setGenres(s);
  };

  const authors = [
    { n: 'Han Kang',          tag: 'lit · korean · quiet',     c: '#7C5BFF' },
    { n: 'Ursula K. Le Guin', tag: 'sci-fi · ethics',          c: '#D4FF3D' },
    { n: 'Italo Calvino',     tag: 'magical · meta',           c: '#FF7E6B' },
    { n: 'Donna Tartt',       tag: 'dark academia',            c: '#16102E', dark: true },
  ];

  return (
    <div className="rm-screen" style={{ background: '#FBF6EB' }}>
      <div className="rm-body" style={{ padding: '54px 22px 110px' }}>
        {/* progress */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {[1,2,3,4].map(i => (
              <span key={i} style={{ width: 32, height: 4, borderRadius: 2, background: i === 1 ? '#16102E' : 'rgba(22,16,46,0.15)' }} />
            ))}
          </div>
          <span className="rm-mono" style={{ fontSize: 11, color: 'rgba(22,16,46,0.5)', letterSpacing: '0.1em' }}>01 / 04</span>
        </div>

        <div className="rm-mono" style={{ fontSize: 10, color: '#7C5BFF', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700 }}>★ Chapter one</div>
        <div className="rm-display" style={{ fontSize: 40, color: '#16102E', lineHeight: 0.95, marginTop: 6 }}>
          Your literary<br/>
          <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 400, color: '#7C5BFF' }}>identity</span>
        </div>

        {/* Q1 - story types */}
        <div style={{ marginTop: 24 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 19, color: '#16102E' }}>Stories that pull you in</span>
            <span className="rm-pill rm-pill-ink" style={{ fontSize: 10 }}>{picked.size} ↑</span>
          </div>
          <div className="rm-mono" style={{ fontSize: 10, color: 'rgba(22,16,46,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>tap any · multi</div>

          {/* horizontal scrolling cards */}
          <div style={{ display: 'flex', gap: 10, overflowX: 'auto', margin: '0 -22px', padding: '0 22px 8px' }}>
            {stories.map(s => {
              const on = picked.has(s.id);
              return (
                <button key={s.id} onClick={() => togglePick(s.id)} style={{
                  flexShrink: 0, width: 158, height: 200, borderRadius: 22,
                  background: s.g, color: s.ink, border: 'none', cursor: 'pointer',
                  padding: 14, position: 'relative', textAlign: 'left', overflow: 'hidden',
                  boxShadow: on ? '0 14px 32px rgba(22,16,46,0.22), 0 0 0 3px #16102E' : '0 6px 16px rgba(22,16,46,0.08)',
                  transform: on ? 'rotate(-1.2deg) translateY(-2px)' : 'none',
                  transition: 'transform .2s, box-shadow .2s',
                }}>
                  {on && <div style={{ position: 'absolute', top: 10, right: 10, width: 24, height: 24, borderRadius: 12, background: '#D4FF3D', color: '#16102E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800 }}>✓</div>}
                  <Blob size={70} fill="rgba(255,255,255,0.12)" style={{ position: 'absolute', bottom: -20, right: -20 }} />
                  <div className="rm-display" style={{ fontSize: 24, lineHeight: 0.95, position: 'relative', maxWidth: '90%' }}>{s.l}</div>
                  <div className="rm-mono" style={{ position: 'absolute', bottom: 14, left: 14, right: 14, fontSize: 9, letterSpacing: '0.08em', opacity: 0.7, textTransform: 'uppercase' }}>
                    {s.mood}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Q2 - genres */}
        <div style={{ marginTop: 22 }}>
          <div style={{ fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 19, color: '#16102E', marginBottom: 4 }}>Favorite genres</div>
          <div className="rm-mono" style={{ fontSize: 10, color: 'rgba(22,16,46,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>3+ recommended</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {GENRES.map((g, i) => {
              const on = genres.has(g.id);
              return (
                <button key={g.id} onClick={() => toggleGenre(g.id)} style={{
                  border: 'none', cursor: 'pointer',
                  padding: '10px 14px', borderRadius: 999,
                  background: on ? g.c : '#fff', color: '#16102E',
                  fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: on ? 700 : 500, fontSize: 13,
                  boxShadow: on ? '0 0 0 1.5px #16102E inset, 0 4px 12px rgba(22,16,46,0.1)' : '0 0 0 1px rgba(22,16,46,0.12) inset',
                  transform: on ? `rotate(${i % 2 ? -1.5 : 1.2}deg)` : 'none',
                  transition: 'transform .15s, box-shadow .15s',
                }}>
                  {g.l}
                </button>
              );
            })}
          </div>
        </div>

        {/* Q3 - authors */}
        <div style={{ marginTop: 22 }}>
          <div style={{ fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 19, color: '#16102E', marginBottom: 4 }}>Authors you trust</div>
          <div className="rm-mono" style={{ fontSize: 10, color: 'rgba(22,16,46,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>search or pick suggested</div>

          {/* search */}
          <div style={{ padding: '12px 14px', borderRadius: 14, background: '#fff', boxShadow: '0 0 0 1px rgba(22,16,46,0.08) inset', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 24, height: 24, borderRadius: 8, background: '#F4F1FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7C5BFF' }}>◔</span>
            <span style={{ flex: 1, fontSize: 14, color: 'rgba(22,16,46,0.5)' }}>Search by name…</span>
          </div>

          {/* author cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginTop: 10 }}>
            {authors.map((a, i) => (
              <div key={a.n} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderRadius: 16, background: a.dark ? '#16102E' : '#fff', color: a.dark ? '#FBF6EB' : '#16102E', boxShadow: a.dark ? '0 6px 16px rgba(22,16,46,0.18)' : '0 0 0 1px rgba(22,16,46,0.05)' }}>
                <div style={{ width: 38, height: 38, borderRadius: 12, background: a.c, color: '#16102E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 16, flexShrink: 0 }}>
                  {a.n.charAt(0)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 14 }}>{a.n}</div>
                  <div className="rm-mono" style={{ fontSize: 9.5, opacity: 0.6, letterSpacing: '0.04em', marginTop: 1 }}>{a.tag}</div>
                </div>
                <div style={{ display: 'flex', gap: 4 }}>
                  {/* star ranking */}
                  {[1,2,3].map(n => (
                    <span key={n} style={{ width: 22, height: 22, borderRadius: '50%', background: n <= (i === 0 ? 3 : i === 1 ? 2 : 1) ? '#D4FF3D' : a.dark ? 'rgba(255,255,255,0.08)' : 'rgba(22,16,46,0.06)', color: '#16102E', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>★</span>
                  ))}
                </div>
              </div>
            ))}
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
          <span>Continue · Behavior</span>
          <span style={{ width: 44, height: 44, borderRadius: 22, background: '#D4FF3D', color: '#16102E', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>→</span>
        </button>
      </div>
    </div>
  );
}
Object.assign(window, { ScreenOnb1 });
