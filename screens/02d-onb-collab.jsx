// 02d — Onboarding 4: Collaborative Setup (lightweight first-group flow)
function ScreenOnb4() {
  const [name, setName] = React.useState('Slow Burners');
  const [vibe, setVibe] = React.useState('curious');
  const [tg, setTg] = React.useState(true);

  const vibes = [
  { id: 'curious', l: 'Curious', c: '#D4FF3D', emoji: '✦' },
  { id: 'cozy', l: 'Cozy', c: '#FF7E6B', emoji: '◐' },
  { id: 'sharp', l: 'Sharp', c: '#7C5BFF', emoji: '◇' },
  { id: 'wild', l: 'Wild', c: '#E8E0FF', emoji: '⚡' }];


  return (
    <div className="rm-screen" style={{ background: '#FBF6EB' }}>
      <div className="rm-body" style={{ padding: '54px 22px 110px' }}>
        {/* progress */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {[1, 2, 3, 4].map((i) =>
            <span key={i} style={{ width: 32, height: 4, borderRadius: 2, background: '#16102E' }} />
            )}
          </div>
          <span className="rm-mono" style={{ fontSize: 11, color: 'rgba(22,16,46,0.5)', letterSpacing: '0.1em' }}>04 / 04</span>
        </div>

        <div className="rm-mono" style={{ fontSize: 10, padding: '4px 8px', borderRadius: 6, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, display: 'inline-block', background: "rgba(255, 126, 107, 0)", color: "rgb(255, 126, 107)" }}>★ Chapter four</div>
        <div className="rm-display" style={{ fontSize: 40, color: '#16102E', lineHeight: 0.95, marginTop: 8 }}>
          Find your<br />
          <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 400, color: '#FF7E6B' }}>circle</span>
        </div>
        <div style={{ fontSize: 13.5, color: 'rgba(22,16,46,0.6)', marginTop: 10, lineHeight: 1.4 }}>
          ReadMatch works better with people. Start a tiny circle — we'll handle the Telegram side.
        </div>

        {/* Q1 — name + vibe + image */}
        <div style={{ marginTop: 22, padding: 18, borderRadius: 22, background: '#fff', boxShadow: '0 0 0 1px rgba(22,16,46,0.06) inset' }}>
          <div className="rm-mono" style={{ fontSize: 10, color: 'rgba(22,16,46,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Q · 01</div>
          <div style={{ fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 19, color: '#16102E', marginTop: 2 }}>Name your circle</div>

          <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 64, height: 64, borderRadius: 18, background: 'linear-gradient(140deg, #7C5BFF, #2B1B69)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
              <Star size={22} fill="#D4FF3D" style={{ position: 'absolute', top: 8, right: 8, transform: 'rotate(12deg)' }} />
              <span className="rm-display" style={{ fontSize: 26, color: '#FBF6EB' }}>SB</span>
              <div style={{ position: 'absolute', bottom: 3, right: 3, width: 18, height: 18, borderRadius: 9, background: '#D4FF3D', color: '#16102E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700 }}>+</div>
            </div>
            <input value={name} onChange={(e) => setName(e.target.value)} style={{
              flex: 1, border: 'none', outline: 'none', background: 'transparent',
              fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 22, color: '#16102E',
              padding: 0, letterSpacing: '-0.02em', borderBottom: '2px solid #7C5BFF'
            }} />
          </div>

          {/* vibes */}
          <div style={{ display: 'flex', gap: 6, marginTop: 16, flexWrap: 'wrap' }}>
            {vibes.map((v) =>
            <button key={v.id} onClick={() => setVibe(v.id)} style={{
              padding: '8px 12px', borderRadius: 999, border: 'none', cursor: 'pointer',
              background: vibe === v.id ? v.c : '#F4F1FF',
              color: '#16102E',
              fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 12.5,
              boxShadow: vibe === v.id ? '0 0 0 1.5px #16102E inset' : 'none',
              display: 'inline-flex', alignItems: 'center', gap: 6
            }}>
                <span style={{ fontSize: 13 }}>{v.emoji}</span>
                {v.l}
              </button>
            )}
          </div>
        </div>

        {/* Q2 — invite */}
        <div style={{ marginTop: 12, padding: 18, borderRadius: 22, background: '#fff', boxShadow: '0 0 0 1px rgba(22,16,46,0.06) inset' }}>
          <div className="rm-mono" style={{ fontSize: 10, color: 'rgba(22,16,46,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Q · 02</div>
          <div style={{ fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 19, color: '#16102E', marginTop: 2 }}>Invite a friend or two</div>

          {/* avatar slots with + */}
          <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
            {MEMBERS.slice(0, 3).map((m) =>
            <div key={m.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flex: 1 }}>
                <Avatar m={m} size={48} />
                <span className="rm-mono" style={{ fontSize: 9, color: 'rgba(22,16,46,0.55)', letterSpacing: '0.06em' }}>{m.name.toUpperCase()}</span>
              </div>
            )}
            {[1, 2].map((i) =>
            <button key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, border: 'none', background: 'transparent', cursor: 'pointer' }}>
                <span style={{ width: 48, height: 48, borderRadius: 24, background: 'transparent', color: 'rgba(22,16,46,0.4)', border: '1.5px dashed rgba(22,16,46,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700 }}>+</span>
                <span className="rm-mono" style={{ fontSize: 9, color: 'rgba(22,16,46,0.35)', letterSpacing: '0.06em' }}>ADD</span>
              </button>
            )}
          </div>

          {/* methods row */}
          <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
            {[
            { l: 'Link', c: '#16102E', t: '#FBF6EB' },
            { l: 'QR code', c: '#7C5BFF', t: '#FBF6EB' },
            { l: 'Telegram', c: '#D4FF3D', t: '#16102E' }].
            map((m, i) =>
            <button key={i} style={{ padding: '10px 8px', borderRadius: 12, border: 'none', cursor: 'pointer', background: m.c, color: m.t, fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 12 }}>{m.l}</button>
            )}
          </div>
        </div>

        {/* Q3 — Telegram toggle */}
        <div style={{ marginTop: 12, borderRadius: 22, padding: 18, background: tg ? '#16102E' : '#fff', color: tg ? '#FBF6EB' : '#16102E', position: 'relative', overflow: 'hidden', boxShadow: tg ? '0 12px 30px rgba(22,16,46,0.18)' : '0 0 0 1px rgba(22,16,46,0.06) inset' }}>
          {tg && <Blob size={150} fill="#7C5BFF" style={{ position: 'absolute', right: -50, top: -50, opacity: 0.35 }} />}
          <div className="rm-mono" style={{ fontSize: 10, color: tg ? 'rgba(212,255,61,0.85)' : 'rgba(22,16,46,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', position: 'relative' }}>Q · 03</div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginTop: 4, position: 'relative' }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: tg ? '#D4FF3D' : '#E8E0FF', color: '#16102E', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M21 3 11 14M21 3 14.5 21l-3.5-7-7-3.5L21 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <div style={{ flex: 1 }}>
              <div className="rm-display" style={{ fontSize: 18 }}>Connect Telegram</div>
              <div style={{ fontSize: 12.5, opacity: 0.75, marginTop: 4, lineHeight: 1.4 }}>
                We'll create a private channel for the group. Recs, votes & members sync both ways — automatically.
              </div>
              {tg &&
              <div style={{ marginTop: 10, display: 'flex', gap: 6 }}>
                  <span className="rm-pill rm-pill-lime" style={{ fontSize: 10 }}>● Auto-create</span>
                  <span className="rm-pill" style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(251,246,235,0.7)', fontSize: 10 }}>Bidirectional</span>
                </div>
              }
            </div>
            <button onClick={() => setTg(!tg)} style={{ width: 50, height: 30, borderRadius: 15, border: 'none', cursor: 'pointer', background: tg ? '#D4FF3D' : 'rgba(22,16,46,0.15)', position: 'relative', flexShrink: 0 }}>
              <span style={{ position: 'absolute', top: 3, left: tg ? 23 : 3, width: 24, height: 24, borderRadius: 12, background: '#16102E', transition: 'left .18s' }} />
            </button>
          </div>

          {tg &&
          <div style={{ marginTop: 14, padding: 12, borderRadius: 12, background: 'rgba(212,255,61,0.08)', border: '0.5px solid rgba(212,255,61,0.25)', position: 'relative' }}>
              <div className="rm-mono" style={{ fontSize: 10, color: 'rgba(251,246,235,0.55)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>What syncs</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {['Members ↔', 'Votes ↔', 'Recs →', 'Highlights ←'].map((t, i) =>
              <span key={i} className="rm-mono" style={{ fontSize: 10, padding: '3px 8px', borderRadius: 999, background: 'rgba(255,255,255,0.06)', color: '#D4FF3D', letterSpacing: '0.04em' }}>{t}</span>
              )}
              </div>
            </div>
          }
        </div>
      </div>

      {/* footer */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '14px 20px 26px', background: 'linear-gradient(180deg, rgba(251,246,235,0) 0%, #FBF6EB 28%)' }}>
        <button style={{
          width: '100%', height: 60, border: 'none', cursor: 'pointer',
          borderRadius: 30, background: '#16102E', color: '#FBF6EB',
          fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 17,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px 0 24px'
        }}>
          <span>Reveal my reader aura</span>
          <span style={{ width: 44, height: 44, borderRadius: 22, background: '#D4FF3D', color: '#16102E', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>✦</span>
        </button>
      </div>
    </div>);

}
Object.assign(window, { ScreenOnb4 });