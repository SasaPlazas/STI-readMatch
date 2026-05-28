// 02e — Onboarding Final: AI Reading Identity Reveal (cinematic)
function ScreenOnbReveal() {
  // Subtle entrance animation on mount
  const [in1, setIn1] = React.useState(false);
  const [in2, setIn2] = React.useState(false);
  const [in3, setIn3] = React.useState(false);
  React.useEffect(() => {
    const t1 = setTimeout(() => setIn1(true), 60);
    const t2 = setTimeout(() => setIn2(true), 380);
    const t3 = setTimeout(() => setIn3(true), 720);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className="rm-screen rm-noise" style={{ background: 'linear-gradient(170deg, #2B1B69 0%, #16102E 50%, #1A1042 100%)', color: '#FBF6EB', overflow: 'hidden' }}>
      {/* atmospheric decorations */}
      <Blob size={260} fill="#7C5BFF" style={{ position: 'absolute', top: -90, right: -90, opacity: 0.45, filter: 'blur(2px)' }} />
      <Blob size={150} fill="#D4FF3D" style={{ position: 'absolute', bottom: 60, left: -40, opacity: 0.5, filter: 'blur(1px)' }} />
      <Star size={48} fill="#FF7E6B" style={{ position: 'absolute', top: 130, right: 36, transform: 'rotate(18deg)', opacity: 0.9 }} />
      <Star size={26} fill="#D4FF3D" spikes={4} style={{ position: 'absolute', top: 280, left: 32, transform: 'rotate(12deg)' }} />
      <Star size={18} fill="#FBF6EB" spikes={4} style={{ position: 'absolute', top: 60, left: 100, opacity: 0.7 }} />

      <div className="rm-body" style={{ padding: '60px 22px 110px' }}>
        {/* lead-in */}
        <div style={{ textAlign: 'center', opacity: in1 ? 1 : 0, transform: in1 ? 'none' : 'translateY(12px)', transition: 'all .5s' }}>
          <div className="rm-mono" style={{ fontSize: 11, color: '#D4FF3D', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700 }}>★ Your reading aura</div>
          <div className="rm-serif-italic" style={{ fontSize: 18, color: 'rgba(251,246,235,0.7)', marginTop: 6 }}>after 137 signals · we have you</div>
        </div>

        {/* THE big card */}
        <div style={{ marginTop: 28, opacity: in1 ? 1 : 0, transform: in1 ? 'none' : 'translateY(24px)', transition: 'all .6s .15s' }}>
          <div style={{ borderRadius: 28, padding: '26px 22px 22px', background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.16)', backdropFilter: 'blur(20px)', position: 'relative', overflow: 'hidden' }}>
            <Blob size={140} fill="#7C5BFF" style={{ position: 'absolute', right: -40, bottom: -40, opacity: 0.35 }} />
            <div style={{ position: 'relative' }}>
              <div className="rm-mono" style={{ fontSize: 10, color: 'rgba(251,246,235,0.55)', letterSpacing: '0.16em', textTransform: 'uppercase' }}>You read like</div>
              <div className="rm-display" style={{ fontSize: 64, lineHeight: 0.9, marginTop: 8 }}>
                The<br/>
                <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 400, color: '#D4FF3D' }}>Curator</span>
              </div>
              <div className="rm-serif-italic" style={{ fontSize: 17, color: 'rgba(251,246,235,0.85)', marginTop: 12, lineHeight: 1.35, textWrap: 'pretty' }}>
                You read with intention. Stacks are short, recommendations rare, and you save the right book for the right month.
              </div>

              {/* mini stats */}
              <div style={{ display: 'flex', gap: 14, marginTop: 18 }}>
                {[
                  { l: 'depth',     v: '0.81' },
                  { l: 'openness',  v: '72%'  },
                  { l: 'group fit', v: '0.88' },
                ].map((s,i) => (
                  <div key={i} style={{ flex: 1, padding: 10, borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,255,255,0.1)' }}>
                    <div className="rm-mono" style={{ fontSize: 9, color: 'rgba(251,246,235,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.l}</div>
                    <div className="rm-display" style={{ fontSize: 22, color: '#FBF6EB', marginTop: 2 }}>{s.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* signature genres (animated chip cluster) */}
        <div style={{ marginTop: 22, opacity: in2 ? 1 : 0, transform: in2 ? 'none' : 'translateY(16px)', transition: 'all .5s' }}>
          <div className="rm-mono" style={{ fontSize: 10, color: 'rgba(251,246,235,0.5)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12 }}>Your literary palette</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {[
              { l: 'Literary Fiction', c: '#7C5BFF' },
              { l: 'Translation',      c: '#FF7E6B' },
              { l: 'Essays',           c: '#D4FF3D' },
              { l: 'Magic Realism',    c: '#E8E0FF' },
              { l: 'Memoir',           c: '#FBF6EB' },
              { l: 'Sci-Fi · soft',    c: '#16102E', dark: true },
            ].map((g, i) => (
              <span key={i} style={{
                padding: '8px 14px', borderRadius: 999,
                background: g.c, color: g.dark ? '#D4FF3D' : '#16102E',
                fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 13,
                transform: `rotate(${i % 2 ? -1.5 : 1.5}deg)`,
                boxShadow: g.dark ? '0 0 0 1px rgba(255,255,255,0.18) inset' : 'none',
              }}>{g.l}</span>
            ))}
          </div>
        </div>

        {/* compatibility ring + best-match-with */}
        <div style={{ marginTop: 22, opacity: in2 ? 1 : 0, transition: 'all .6s .2s' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'stretch' }}>
            <div style={{ flex: 1, padding: 16, borderRadius: 20, background: '#D4FF3D', color: '#16102E', position: 'relative', overflow: 'hidden' }}>
              <Star size={56} fill="#16102E" spikes={6} style={{ position: 'absolute', right: -12, top: -12, opacity: 0.08 }} />
              <div className="rm-mono" style={{ fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.7 }}>Group affinity</div>
              <div className="rm-display" style={{ fontSize: 38, marginTop: 2 }}>0.88</div>
              <div className="rm-serif-italic" style={{ fontSize: 13, opacity: 0.75, marginTop: -2 }}>“you balance circles”</div>
            </div>
            <div style={{ flex: 1, padding: 16, borderRadius: 20, background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.12)' }}>
              <div className="rm-mono" style={{ fontSize: 9, color: 'rgba(251,246,235,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>You pair with</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 8 }}>
                {[
                  { t: 'The Philosopher', m: MEMBERS[1] },
                  { t: 'The Explorer',    m: MEMBERS[0] },
                  { t: 'Dark Academic',   m: MEMBERS[2] },
                ].map((p, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Avatar m={p.m} size={16} />
                    <span style={{ fontSize: 11, color: 'rgba(251,246,235,0.85)' }}>{p.t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* "share" hint */}
        <div style={{ marginTop: 20, padding: 14, borderRadius: 16, background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: 12, opacity: in3 ? 1 : 0, transition: 'opacity .6s' }}>
          <span style={{ width: 34, height: 34, borderRadius: 10, background: 'rgba(212,255,61,0.16)', color: '#D4FF3D', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>✦</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, color: '#FBF6EB', fontWeight: 600 }}>Share your aura</div>
            <div style={{ fontSize: 11, color: 'rgba(251,246,235,0.55)', marginTop: 2 }}>1.2M readers shared theirs this week</div>
          </div>
          <button style={{ padding: '8px 14px', borderRadius: 999, border: 'none', background: '#FBF6EB', color: '#16102E', fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>Share ↗</button>
        </div>
      </div>

      {/* sticky CTA */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '14px 20px 26px', background: 'linear-gradient(180deg, rgba(22,16,46,0) 0%, rgba(22,16,46,0.85) 35%)', opacity: in3 ? 1 : 0, transition: 'opacity .5s' }}>
        <button style={{
          width: '100%', height: 60, border: 'none', cursor: 'pointer',
          borderRadius: 30, background: '#D4FF3D', color: '#16102E',
          fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 17,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px 0 24px',
          boxShadow: '0 14px 36px rgba(212,255,61,0.32)',
        }}>
          <span>Enter ReadMatch</span>
          <span style={{ width: 44, height: 44, borderRadius: 22, background: '#16102E', color: '#D4FF3D', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>→</span>
        </button>
      </div>
    </div>
  );
}
Object.assign(window, { ScreenOnbReveal });
