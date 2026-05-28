// 08 — Reading personality profile
function ScreenPersonality() {
  return (
    <div className="rm-screen" style={{ background: '#FBF6EB' }}>
      <div className="rm-body" style={{ padding: 0 }}>
        {/* hero — playful sticker */}
        <div style={{ position: 'relative', padding: '60px 22px 28px', background: 'linear-gradient(170deg, #E8E0FF 0%, #FBF6EB 100%)', overflow: 'hidden' }}>
          <Blob size={180} fill="#7C5BFF" style={{ position: 'absolute', right: -50, top: -40, opacity: 0.32 }} />
          <Star size={36} fill="#FF7E6B" style={{ position: 'absolute', left: 24, top: 90, transform: 'rotate(-12deg)' }} />
          <Star size={24} fill="#D4FF3D" spikes={5} style={{ position: 'absolute', right: 70, top: 120, transform: 'rotate(20deg)' }} />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
            <button style={{ width: 36, height: 36, borderRadius: 12, border: 'none', background: 'rgba(22,16,46,0.06)', color: '#16102E', cursor: 'pointer', fontSize: 16 }}>‹</button>
            <span className="rm-mono" style={{ fontSize: 11, color: 'rgba(22,16,46,0.5)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Reading identity · Iris</span>
            <button style={{ width: 36, height: 36, borderRadius: 12, border: 'none', background: 'rgba(22,16,46,0.06)', color: '#16102E', cursor: 'pointer', fontSize: 14 }}>↗</button>
          </div>

          {/* the card */}
          <div style={{
            borderRadius: 28, padding: 24, background: '#16102E', color: '#FBF6EB', position: 'relative', overflow: 'hidden',
            boxShadow: '0 28px 56px rgba(22,16,46,0.32)',
          }}>
            <Blob size={150} fill="#7C5BFF" style={{ position: 'absolute', right: -40, top: -40, opacity: 0.4 }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, position: 'relative' }}>
              <Avatar m={MEMBERS[2]} size={48} />
              <div>
                <div style={{ fontSize: 13.5, color: '#FBF6EB', fontWeight: 600 }}>Iris Calderón</div>
                <div className="rm-mono" style={{ fontSize: 10, color: 'rgba(251,246,235,0.5)', letterSpacing: '0.1em' }}>READER · 2.4yrs</div>
              </div>
            </div>

            <div className="rm-display" style={{ fontSize: 48, marginTop: 18, lineHeight: 0.92, position: 'relative' }}>
              The<br/>
              <span style={{ color: '#D4FF3D', fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 400 }}>Dark Academic</span>
            </div>

            <p className="rm-serif-italic" style={{ fontSize: 16, marginTop: 12, color: 'rgba(251,246,235,0.85)', lineHeight: 1.35, position: 'relative' }}>
              You read like there's a thesis to defend. Long sentences, longer silences.
            </p>

            {/* mini stats */}
            <div style={{ display: 'flex', gap: 18, marginTop: 18, position: 'relative' }}>
              {[
                { l: 'books / yr', v: '32' },
                { l: 'avg pages', v: '286' },
                { l: 'depth idx', v: '0.81' },
              ].map((s,i) => (
                <div key={i}>
                  <div className="rm-mono" style={{ fontSize: 9.5, color: 'rgba(251,246,235,0.45)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.l}</div>
                  <div className="rm-display" style={{ fontSize: 22, color: '#FBF6EB' }}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* aura traits */}
        <div style={{ padding: '22px 22px 0' }}>
          <div className="rm-display" style={{ fontSize: 22, color: '#16102E', marginBottom: 12 }}>Compatibility aura</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
            {[
              { l: 'Slow prose',     v: 92, c: '#7C5BFF' },
              { l: 'Atmosphere',     v: 88, c: '#FF7E6B' },
              { l: 'Plot velocity',  v: 28, c: '#E8E0FF', invert: true },
              { l: 'Translation',    v: 76, c: '#D4FF3D' },
            ].map((t, i) => (
              <div key={i} style={{ borderRadius: 18, padding: 14, background: t.invert ? '#fff' : t.c, color: '#16102E', boxShadow: t.invert ? '0 0 0 1px rgba(22,16,46,0.08) inset' : 'none', position: 'relative', overflow: 'hidden' }}>
                <div className="rm-mono" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.65 }}>{t.l}</div>
                <div className="rm-display" style={{ fontSize: 30, marginTop: 6 }}>{t.v}<span style={{ fontSize: 14 }}>%</span></div>
                <div style={{ marginTop: 6, height: 4, borderRadius: 2, background: t.invert ? 'rgba(22,16,46,0.08)' : 'rgba(22,16,46,0.15)', overflow: 'hidden' }}>
                  <div style={{ width: `${t.v}%`, height: '100%', background: '#16102E', borderRadius: 2 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* signature genres */}
        <div style={{ padding: '20px 22px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
            <span className="rm-display" style={{ fontSize: 22, color: '#16102E' }}>Signature genres</span>
            <span className="rm-mono" style={{ fontSize: 10, color: 'rgba(22,16,46,0.45)', letterSpacing: '0.1em' }}>top 6</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {[
              { l: 'Literary Fiction', c: '#7C5BFF', dark: true },
              { l: 'Translation', c: '#FF7E6B' },
              { l: 'Magic Realism', c: '#D4FF3D' },
              { l: 'Essays', c: '#E8E0FF' },
              { l: 'Mystery · slow', c: '#16102E', dark: true },
              { l: 'Memoir', c: '#FBF6EB', outline: true },
            ].map((g, i) => (
              <span key={i} style={{
                padding: '8px 14px', borderRadius: 999, fontSize: 13, fontWeight: 600,
                fontFamily: "'Bricolage Grotesque', system-ui",
                background: g.c, color: g.dark ? '#FBF6EB' : '#16102E',
                boxShadow: g.outline ? '0 0 0 1px rgba(22,16,46,0.15) inset' : 'none',
                transform: i % 2 ? 'rotate(-1.5deg)' : 'rotate(1deg)',
              }}>{g.l}</span>
            ))}
          </div>
        </div>

        {/* recent reads */}
        <div style={{ padding: '22px 0 100px 22px' }}>
          <div className="rm-display" style={{ fontSize: 22, color: '#16102E', marginBottom: 12 }}>Recently lived with</div>
          <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingRight: 22 }}>
            {BOOKS.map((b, i) => (
              <div key={b.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flexShrink: 0 }}>
                <BookCover book={b} w={110} h={154} tilt={i % 2 ? 2 : -2} />
                <span className="rm-mono" style={{ fontSize: 9, color: 'rgba(22,16,46,0.5)', letterSpacing: '0.06em', marginTop: 6 }}>★ {b.match}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ScreenPersonality });
