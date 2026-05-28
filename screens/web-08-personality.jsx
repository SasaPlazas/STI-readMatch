// web-08 — Desktop Reading Personality dashboard (1440 × 1100)
function ScreenWebPersonality() {
  const radarPoints = (vals) => {
    // 6 axes around center; return polygon points
    const cx = 150, cy = 150, R = 110;
    return vals.map((v, i) => {
      const a = (Math.PI * 2 / vals.length) * i - Math.PI / 2;
      const r = (v / 100) * R;
      return `${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`;
    }).join(' ');
  };
  const axes = ['Depth', 'Atmosphere', 'Plot velocity', 'Translation', 'Diversity', 'Novelty'];
  const vals = [88, 92, 28, 76, 78, 64];

  return (
    <div style={{ width: '100%', minHeight: '100%', display: 'flex', background: '#F4F1FF', color: '#16102E', fontFamily: "'Inter', system-ui" }}>
      <WebSidebar active="shelf" />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <WebTopBar title="Reading identity" subtitle="Maya · ★ THE EXPLORER · est. Aug 2024" />

        <div style={{ flex: 1, padding: '24px 32px 32px', overflow: 'auto' }}>
          {/* HERO + radar — 2-col */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20 }}>
            {/* identity hero card */}
            <div style={{ borderRadius: 28, padding: 28, background: 'linear-gradient(155deg, #16102E 0%, #2B1B69 100%)', color: '#FBF6EB', position: 'relative', overflow: 'hidden', boxShadow: '0 24px 50px rgba(22,16,46,0.22)' }}>
              <Blob size={260} fill="#7C5BFF" style={{ position: 'absolute', right: -80, top: -90, opacity: 0.4 }} />
              <Star size={56} fill="#FF7E6B" style={{ position: 'absolute', right: 80, top: 40, transform: 'rotate(15deg)' }} />
              <Star size={26} fill="#D4FF3D" spikes={4} style={{ position: 'absolute', right: 200, top: 90, transform: 'rotate(-8deg)' }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, position: 'relative' }}>
                <Avatar m={MEMBERS[0]} size={48} />
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>Maya Reyes</div>
                  <div className="rm-mono" style={{ fontSize: 10, color: 'rgba(212,255,61,0.7)', letterSpacing: '0.1em' }}>READER · 2.4yrs · 142 BOOKS</div>
                </div>
              </div>

              <div className="rm-display" style={{ fontSize: 84, lineHeight: 0.92, marginTop: 22, position: 'relative' }}>
                The<br/>
                <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 400, color: '#D4FF3D' }}>Explorer</span>
              </div>
              <p className="rm-serif-italic" style={{ fontSize: 18, color: 'rgba(251,246,235,0.85)', marginTop: 16, maxWidth: 380, lineHeight: 1.35, position: 'relative' }}>
                You collect maps for places you'll never visit and read books with weather you can taste.
              </p>

              <div style={{ display: 'flex', gap: 14, marginTop: 22, position: 'relative' }}>
                {[
                  { l: 'books / yr', v: '32' },
                  { l: 'avg pages',  v: '286' },
                  { l: 'depth idx',  v: '0.81' },
                  { l: 'openness',   v: '72%' },
                ].map((s,i) => (
                  <div key={i}>
                    <div className="rm-mono" style={{ fontSize: 9.5, color: 'rgba(251,246,235,0.45)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.l}</div>
                    <div className="rm-display" style={{ fontSize: 28, marginTop: 2 }}>{s.v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* radar — aura */}
            <div style={{ borderRadius: 28, padding: 22, background: '#fff', boxShadow: '0 0 0 1px rgba(22,16,46,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
                <span className="rm-display" style={{ fontSize: 20 }}>Reading aura</span>
                <span className="rm-pill rm-pill-lime" style={{ fontSize: 10 }}>↗ +4% this month</span>
              </div>
              <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                <svg width="320" height="320" viewBox="0 0 300 300">
                  {/* grid rings */}
                  {[28, 56, 84, 110].map(r => {
                    const pts = axes.map((_, i) => {
                      const a = (Math.PI * 2 / 6) * i - Math.PI / 2;
                      return `${150 + Math.cos(a) * r},${150 + Math.sin(a) * r}`;
                    }).join(' ');
                    return <polygon key={r} points={pts} stroke="rgba(22,16,46,0.06)" fill="none" />;
                  })}
                  {/* axes */}
                  {axes.map((_, i) => {
                    const a = (Math.PI * 2 / 6) * i - Math.PI / 2;
                    return <line key={i} x1="150" y1="150" x2={150 + Math.cos(a) * 110} y2={150 + Math.sin(a) * 110} stroke="rgba(22,16,46,0.08)" />;
                  })}
                  {/* value polygon */}
                  <polygon points={radarPoints(vals)} fill="rgba(124,91,255,0.18)" stroke="#7C5BFF" strokeWidth="2.5" />
                  {/* dots */}
                  {vals.map((v, i) => {
                    const a = (Math.PI * 2 / 6) * i - Math.PI / 2;
                    const r = (v / 100) * 110;
                    return <circle key={i} cx={150 + Math.cos(a) * r} cy={150 + Math.sin(a) * r} r="4" fill="#D4FF3D" stroke="#16102E" strokeWidth="1.5" />;
                  })}
                  {/* labels */}
                  {axes.map((l, i) => {
                    const a = (Math.PI * 2 / 6) * i - Math.PI / 2;
                    const lx = 150 + Math.cos(a) * 132;
                    const ly = 150 + Math.sin(a) * 132 + 4;
                    return <text key={i} x={lx} y={ly} textAnchor="middle" fontFamily="'Bricolage Grotesque', system-ui" fontWeight="600" fontSize="11" fill="#16102E">{l}</text>;
                  })}
                </svg>
              </div>
            </div>
          </div>

          {/* SECOND ROW — palette + traits + recent */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginTop: 20 }}>
            {/* literary palette */}
            <div style={{ borderRadius: 22, padding: 20, background: '#fff', boxShadow: '0 0 0 1px rgba(22,16,46,0.05)' }}>
              <div className="rm-display" style={{ fontSize: 18, marginBottom: 12 }}>Literary palette</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {[
                  { l: 'Literary Fiction', c: '#7C5BFF' },
                  { l: 'Translation', c: '#FF7E6B' },
                  { l: 'Magic Realism', c: '#D4FF3D' },
                  { l: 'Essays', c: '#E8E0FF' },
                  { l: 'Mystery · slow', c: '#16102E', dark: true },
                  { l: 'Memoir', c: '#FBF6EB', outline: true },
                  { l: 'Climate nonfic', c: '#7C5BFF' },
                ].map((g, i) => (
                  <span key={i} style={{
                    padding: '8px 14px', borderRadius: 999, fontSize: 12.5, fontWeight: 700,
                    fontFamily: "'Bricolage Grotesque', system-ui",
                    background: g.c, color: g.dark ? '#FBF6EB' : '#16102E',
                    boxShadow: g.outline ? '0 0 0 1px rgba(22,16,46,0.15) inset' : 'none',
                    transform: `rotate(${i % 2 ? -1.5 : 1.3}deg)`,
                  }}>{g.l}</span>
                ))}
              </div>
            </div>

            {/* signature traits */}
            <div style={{ borderRadius: 22, padding: 20, background: '#fff', boxShadow: '0 0 0 1px rgba(22,16,46,0.05)' }}>
              <div className="rm-display" style={{ fontSize: 18, marginBottom: 12 }}>Signature traits</div>
              {[
                { l: 'Slow prose',    v: 92, c: '#7C5BFF' },
                { l: 'Atmosphere',    v: 88, c: '#FF7E6B' },
                { l: 'Translation',   v: 76, c: '#D4FF3D' },
                { l: 'Plot velocity', v: 28, c: '#E8E0FF' },
              ].map((t,i) => (
                <div key={i} style={{ marginBottom: i === 3 ? 0 : 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                    <span style={{ fontSize: 12.5, fontWeight: 600 }}>{t.l}</span>
                    <span className="rm-mono" style={{ fontSize: 11, color: '#16102E', fontWeight: 700 }}>{t.v}%</span>
                  </div>
                  <div style={{ height: 8, borderRadius: 4, background: 'rgba(22,16,46,0.05)', overflow: 'hidden' }}>
                    <div style={{ width: `${t.v}%`, height: '100%', background: t.c, borderRadius: 4 }} />
                  </div>
                </div>
              ))}
            </div>

            {/* compatibility with members */}
            <div style={{ borderRadius: 22, padding: 20, background: '#D4FF3D', color: '#16102E', position: 'relative', overflow: 'hidden' }}>
              <Star size={70} fill="#16102E" spikes={6} style={{ position: 'absolute', right: -16, top: -16, opacity: 0.08 }} />
              <div className="rm-display" style={{ fontSize: 18, marginBottom: 4 }}>Compatibility aura</div>
              <div className="rm-display" style={{ fontSize: 56, color: '#16102E', lineHeight: 1 }}>0.88</div>
              <div className="rm-serif-italic" style={{ fontSize: 13, opacity: 0.75, marginTop: -2 }}>“you balance circles”</div>

              <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  { t: 'The Philosopher',  m: MEMBERS[1], v: 92 },
                  { t: 'Dark Academic',    m: MEMBERS[2], v: 88 },
                  { t: 'Narrative Analyst',m: MEMBERS[3], v: 81 },
                  { t: 'Romantic',         m: MEMBERS[4], v: 74 },
                ].map((p, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
                    <Avatar m={p.m} size={22} />
                    <span style={{ flex: 1 }}>{p.t}</span>
                    <span className="rm-mono" style={{ fontWeight: 700 }}>{p.v}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* THIRD ROW — recent reads + stats */}
          <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 20 }}>
            <div style={{ borderRadius: 22, padding: 20, background: '#fff', boxShadow: '0 0 0 1px rgba(22,16,46,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
                <span className="rm-display" style={{ fontSize: 20 }}>Recently lived with</span>
                <a href="#" style={{ fontSize: 12, color: '#7C5BFF', textDecoration: 'none', fontWeight: 600 }}>Shelf →</a>
              </div>
              <div style={{ display: 'flex', gap: 14 }}>
                {BOOKS.map((b, i) => (
                  <div key={b.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flexShrink: 0 }}>
                    <BookCover book={b} w={104} h={146} tilt={i % 2 ? 2 : -2} />
                    <span className="rm-mono" style={{ fontSize: 9.5, color: 'rgba(22,16,46,0.5)', marginTop: 6, letterSpacing: '0.04em' }}>★ {b.match}%</span>
                    <span style={{ fontSize: 11, fontWeight: 600, marginTop: 2 }}>{b.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* reading rhythm graph */}
            <div style={{ borderRadius: 22, padding: 20, background: '#16102E', color: '#FBF6EB', position: 'relative', overflow: 'hidden' }}>
              <Blob size={140} fill="#7C5BFF" style={{ position: 'absolute', right: -50, bottom: -50, opacity: 0.3 }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span className="rm-display" style={{ fontSize: 18 }}>Reading rhythm</span>
                <span className="rm-mono" style={{ fontSize: 10, color: 'rgba(212,255,61,0.7)' }}>last 12 weeks</span>
              </div>
              <svg width="100%" height="120" viewBox="0 0 300 120" style={{ marginTop: 10 }}>
                {[2,3,5,2,4,6,3,5,7,4,6,8].map((h, i) => (
                  <rect key={i} x={i * 22 + 10} y={120 - h * 12} width="14" height={h * 12} rx="3" fill={i === 11 ? '#D4FF3D' : '#7C5BFF'} opacity={i === 11 ? 1 : 0.5 + i * 0.04} />
                ))}
              </svg>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                <span className="rm-mono" style={{ fontSize: 9, color: 'rgba(251,246,235,0.4)', letterSpacing: '0.06em' }}>JUL</span>
                <span className="rm-mono" style={{ fontSize: 9, color: 'rgba(251,246,235,0.4)', letterSpacing: '0.06em' }}>NOW</span>
              </div>
              <div style={{ marginTop: 14, padding: 12, borderRadius: 12, background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 24, height: 24, borderRadius: 8, background: '#D4FF3D', color: '#16102E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>↗</span>
                <span style={{ fontSize: 12, color: 'rgba(251,246,235,0.85)' }}>You read <b style={{ color: '#D4FF3D' }}>+38%</b> more pages than 8 weeks ago.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
Object.assign(window, { ScreenWebPersonality });
