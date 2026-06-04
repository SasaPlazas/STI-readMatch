// web-06 — Desktop Onboarding (split-screen, 1440 × 900)
function ScreenWebOnboarding() {
  const [picked, setPicked] = React.useState(new Set(['dark', 'psyc', 'sci']));
  const stories = [
  { id: 'dark', l: 'Dark Academia',   c: '#7C5BFF', glyph: '✦', mood: 'velvet · ivy · candle' },
  { id: 'cozy', l: 'Cozy Fantasy',    c: '#FF7E6B', glyph: '◐', mood: 'tea · hearth · familiar' },
  { id: 'psyc', l: 'Psychological',   c: '#E8E0FF', glyph: '◇', mood: 'unreliable · interior' },
  { id: 'emo',  l: 'Emotional',       c: '#FBF6EB', glyph: '❧', mood: 'heart · ache · home' },
  { id: 'phi',  l: 'Philosophical',   c: '#16102E', glyph: 'Φ', mood: 'idea · paradox · slow', dark: true },
  { id: 'thr',  l: 'Thrillers',       c: '#D4FF3D', glyph: '⚡', mood: 'pulse · cliff · grip' },
  { id: 'sci',  l: 'Sci-Fi Worlds',   c: '#2B1B69', glyph: '◉', mood: 'orbit · code · soft', dark: true },
  { id: 'char', l: 'Character-driven', c: '#F0E6D2', glyph: '❋', mood: 'voice · arc · life' }];

  const toggle = (id) => {const s = new Set(picked);s.has(id) ? s.delete(id) : s.add(id);setPicked(s);};

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', background: '#FBF6EB', color: '#16102E', fontFamily: "'Inter', system-ui" }}>
      {/* LEFT — visual storytelling */}
      <div style={{ width: '46%', position: 'relative', background: 'linear-gradient(170deg, #2B1B69 0%, #16102E 65%, #1A1042 100%)', color: '#FBF6EB', overflow: 'hidden', padding: '56px 64px', display: 'flex', flexDirection: 'column' }}>
        <Blob size={360} fill="#7C5BFF" style={{ position: 'absolute', top: -80, right: -90, opacity: 0.4, filter: 'blur(2px)' }} />
        <Blob size={220} fill="#D4FF3D" style={{ position: 'absolute', bottom: 60, left: -60, opacity: 0.5 }} />
        <Star size={56} fill="#FF7E6B" style={{ position: 'absolute', top: 200, right: 80, transform: 'rotate(15deg)' }} />
        <Star size={32} fill="#D4FF3D" spikes={4} style={{ position: 'absolute', top: 380, left: 100, transform: 'rotate(10deg)' }} />

        {/* logo top */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, position: 'relative' }}>
          <div style={{ width: 36, height: 36, borderRadius: 11, background: '#D4FF3D', color: '#16102E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 18 }}>✦</div>
          <div className="rm-display" style={{ fontSize: 24 }}>read<span style={{ color: '#D4FF3D' }}>match</span></div>
        </div>

        {/* layered book composition */}
        <div style={{ position: 'relative', flex: 1, marginTop: 40 }}>
          <div style={{ position: 'absolute', top: 30, left: 30 }}><BookCover book={BOOKS[1]} w={156} h={220} tilt={-8} /></div>
          <div style={{ position: 'absolute', top: 100, left: 180, zIndex: 2 }}><BookCover book={BOOKS[0]} w={170} h={238} tilt={4} /></div>
          <div style={{ position: 'absolute', top: 230, left: 60, zIndex: 3 }}><BookCover book={BOOKS[2]} w={140} h={196} tilt={-3} /></div>

          {/* floating UI hint */}
          <div style={{ position: 'absolute', top: 60, right: 30, padding: 12, borderRadius: 16, background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)', border: '0.5px solid rgba(255,255,255,0.14)', maxWidth: 200 }}>
            <div className="rm-mono" style={{ fontSize: 9, color: '#D4FF3D', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>★ The Curator awaits</div>
            <div style={{ fontSize: 12, lineHeight: 1.4, color: 'rgba(251,246,235,0.85)' }}>137 signals will reveal your reading aura.</div>
          </div>
        </div>

        {/* bottom copy */}
        <div style={{ position: 'relative' }}>
          <div className="rm-mono" style={{ fontSize: 11, color: '#D4FF3D', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700 }}>★ Chapter one of four</div>
          <div className="rm-display" style={{ fontSize: 64, marginTop: 12, lineHeight: 0.93, letterSpacing: '-0.03em' }}>
            Your literary<br />
            <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 400, color: '#D4FF3D' }}>identity.</span>
          </div>
          <div className="rm-serif-italic" style={{ fontSize: 17, color: 'rgba(251,246,235,0.7)', marginTop: 12, maxWidth: 380 }}>
            What pulls you in — the velvet of dark academia, the warmth of fantasy, the orbit of softer sci-fi?
          </div>
        </div>
      </div>

      {/* RIGHT — interactive form */}
      <div style={{ flex: 1, padding: '52px 64px', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
        {/* progress */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {[1, 2, 3, 4].map((i) => <div key={i} style={{ width: 60, height: 4, borderRadius: 2, background: i === 1 ? '#16102E' : 'rgba(22,16,46,0.15)' }} />)}
          </div>
          <span className="rm-mono" style={{ fontSize: 11, color: 'rgba(22,16,46,0.55)', letterSpacing: '0.1em' }}>01 / 04</span>
        </div>

        {/* Q1 — stories */}
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <span className="rm-display" style={{ fontSize: 26, color: '#16102E' }}>Stories that pull you in</span>
            <span className="rm-pill rm-pill-ink" style={{ fontSize: 11 }}>{picked.size} selected</span>
          </div>
          <div className="rm-mono" style={{ fontSize: 11, color: 'rgba(22,16,46,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4 }}>multi · click to toggle</div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 20 }}>
            {stories.map((s) => {
              const on = picked.has(s.id);
              const fg = on ? (s.dark ? '#FBF6EB' : '#16102E') : '#16102E';
              return (
                <button key={s.id} onClick={() => toggle(s.id)} style={{
                  border: 'none', cursor: 'pointer',
                  height: 200, borderRadius: 22, padding: 18, textAlign: 'left',
                  background: on ? s.c : '#fff', color: fg,
                  position: 'relative', overflow: 'hidden',
                  boxShadow: on
                    ? '0 14px 32px rgba(22,16,46,0.18), 0 0 0 2px #16102E inset'
                    : '0 0 0 1px rgba(22,16,46,0.1) inset',
                  transform: on ? 'rotate(-1.4deg) translateY(-3px)' : 'none',
                  transition: 'transform .2s, box-shadow .2s, background .15s',
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                }}>
                  {/* corner accent dot when off */}
                  {!on && <span style={{ position: 'absolute', top: 18, right: 18, width: 10, height: 10, borderRadius: 5, background: s.c, boxShadow: s.c === '#FBF6EB' || s.c === '#F0E6D2' ? '0 0 0 1px rgba(22,16,46,0.15)' : 'none' }} />}
                  {on && <div style={{ position: 'absolute', top: 14, right: 14, width: 28, height: 28, borderRadius: 14, background: '#16102E', color: s.c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14 }}>✓</div>}

                  {/* big glyph */}
                  <div style={{
                    fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700,
                    fontSize: 56, lineHeight: 1,
                    color: on ? (s.dark ? '#D4FF3D' : '#16102E') : s.c,
                    opacity: on ? 1 : 0.9,
                    letterSpacing: '-0.02em',
                  }}>{s.glyph}</div>

                  {/* title + mood */}
                  <div>
                    <div className="rm-display" style={{ fontSize: 22, lineHeight: 0.95, letterSpacing: '-0.02em' }}>{s.l}</div>
                    <div className="rm-mono" style={{ fontSize: 9.5, letterSpacing: '0.1em', opacity: 0.6, marginTop: 6, textTransform: 'uppercase' }}>{s.mood}</div>
                  </div>
                </button>);
            })}
          </div>
        </div>

        {/* Q2 — genres */}
        <div style={{ marginTop: 32 }}>
          <span className="rm-display" style={{ fontSize: 22, color: '#16102E' }}>Favorite genres</span>
          <div className="rm-mono" style={{ fontSize: 10, color: 'rgba(22,16,46,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4 }}>multi · 3+ recommended</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 14 }}>
            {[
            { l: 'Literary', c: '#7C5BFF', on: true },
            { l: 'Sci-Fi', c: '#FF7E6B', on: true },
            { l: 'Fantasy', c: '#D4FF3D' },
            { l: 'Mystery', c: '#E8E0FF' },
            { l: 'Memoir', c: '#FBF6EB' },
            { l: 'Essays', c: '#D4FF3D', on: true },
            { l: 'Poetry', c: '#E8E0FF' },
            { l: 'History', c: '#7C5BFF' },
            { l: 'Romance', c: '#FF7E6B' },
            { l: 'Climate', c: '#FBF6EB' },
            { l: 'Politics', c: '#fff' },
            { l: 'Horror', c: '#FF7E6B' }].
            map((g, i) =>
            <button key={i} style={{
              border: 'none', cursor: 'pointer', padding: '10px 16px', borderRadius: 999,
              background: g.on ? g.c : '#fff', color: '#16102E',
              fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: g.on ? 700 : 500, fontSize: 13.5,
              boxShadow: g.on ? '0 0 0 1.5px #16102E inset, 0 4px 12px rgba(22,16,46,0.1)' : '0 0 0 1px rgba(22,16,46,0.12) inset',
              transform: g.on ? `rotate(${i % 2 ? -1.5 : 1.2}deg)` : 'none'
            }}>{g.l}</button>
            )}
          </div>
        </div>

        {/* footer */}
        <div style={{ marginTop: 'auto', paddingTop: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button style={{ padding: '14px 22px', borderRadius: 999, border: 'none', cursor: 'pointer', background: 'transparent', color: '#3A2F5C', fontWeight: 600, fontSize: 14 }}>← Back</button>
          <button style={{ height: 56, padding: '0 8px 0 26px', borderRadius: 28, border: 'none', cursor: 'pointer', background: '#16102E', color: '#FBF6EB', fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 16, display: 'flex', alignItems: 'center', gap: 14 }}>
            Continue · Reading behavior
            <span style={{ width: 40, height: 40, borderRadius: 20, background: '#D4FF3D', color: '#16102E', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>→</span>
          </button>
        </div>
      </div>
    </div>);

}
Object.assign(window, { ScreenWebOnboarding });