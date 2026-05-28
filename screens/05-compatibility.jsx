// 05 — Group compatibility visualization
function ScreenCompatibility() {
  // Radial / network map: center node + member nodes around it, with genre bubbles
  const center = { x: 200, y: 240 };
  const memberPos = [
    { m: MEMBERS[0], x: 200, y: 90,  r: 36 },
    { m: MEMBERS[1], x: 320, y: 170, r: 32 },
    { m: MEMBERS[2], x: 300, y: 320, r: 38 },
    { m: MEMBERS[3], x: 100, y: 320, r: 30 },
    { m: MEMBERS[4], x: 80,  y: 170, r: 28 },
  ];
  const genres = [
    { label: 'Lit Fic',    x: 200, y: 178, c: '#D4FF3D', s: 56 },
    { label: 'Sci-Fi',     x: 268, y: 230, c: '#7C5BFF', s: 42 },
    { label: 'Memoir',     x: 132, y: 230, c: '#FF7E6B', s: 36 },
    { label: 'Mystery',    x: 200, y: 280, c: '#E8E0FF', s: 28 },
  ];

  return (
    <div className="rm-screen" style={{ background: '#16102E', color: '#FBF6EB' }}>
      <div className="rm-body" style={{ padding: '64px 22px 100px' }}>
        {/* top */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span className="rm-mono" style={{ fontSize: 11, color: 'rgba(251,246,235,0.5)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Slow Burners · 5 members</span>
          <button style={{ width: 36, height: 36, borderRadius: 12, border: 'none', background: 'rgba(255,255,255,0.08)', color: '#FBF6EB', cursor: 'pointer', fontSize: 14 }}>↻</button>
        </div>

        <div className="rm-display" style={{ fontSize: 38, marginTop: 14, lineHeight: 0.95 }}>
          Group<br/>
          <span style={{ color: '#D4FF3D' }}>compatibility</span>
        </div>

        {/* score pill row */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, marginTop: 14 }}>
          <div>
            <div className="rm-mono" style={{ fontSize: 10, color: 'rgba(251,246,235,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Collective score</div>
            <div className="rm-display" style={{ fontSize: 72, color: '#D4FF3D', lineHeight: 1 }}>0.86</div>
          </div>
          <div style={{ paddingBottom: 14 }}>
            <span className="rm-pill rm-pill-lime">↗ +0.04 this month</span>
          </div>
        </div>

        {/* the network visualization */}
        <div style={{ marginTop: 12, height: 400, position: 'relative', borderRadius: 24, overflow: 'hidden', background: 'radial-gradient(circle at 50% 60%, rgba(124,91,255,0.22), rgba(22,16,46,0) 65%)' }}>
          <svg width="400" height="400" viewBox="0 0 400 400" style={{ position: 'absolute', inset: 0 }}>
            {/* concentric guides */}
            {[60, 110, 160].map(r => (
              <circle key={r} cx={center.x} cy={center.y} r={r} stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none" />
            ))}
            {/* connecting lines */}
            {memberPos.map((p, i) => (
              <line key={i} x1={center.x} y1={center.y} x2={p.x} y2={p.y} stroke={p.m.hue} strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="3 4" />
            ))}
            {/* genre bubbles */}
            {genres.map((g, i) => (
              <g key={i}>
                <circle cx={g.x} cy={g.y} r={g.s/2} fill={g.c} opacity="0.85" />
                <text x={g.x} y={g.y + 3} textAnchor="middle" fontFamily="'Bricolage Grotesque', system-ui" fontSize={g.s * 0.22} fontWeight="700" fill="#16102E">{g.label}</text>
              </g>
            ))}
          </svg>

          {/* member discs as HTML for crisp avatars */}
          {memberPos.map((p) => (
            <div key={p.m.id} style={{ position: 'absolute', left: p.x - p.r/2, top: p.y - p.r/2 }}>
              <Avatar m={p.m} size={p.r} />
              <div style={{ position: 'absolute', top: p.r + 2, left: '50%', transform: 'translateX(-50%)', fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: 'rgba(251,246,235,0.6)', whiteSpace: 'nowrap', letterSpacing: '0.06em' }}>
                {p.m.name}
              </div>
            </div>
          ))}

          {/* center label */}
          <div style={{ position: 'absolute', left: center.x - 36, top: center.y + 70, width: 72, textAlign: 'center' }}>
            <div className="rm-mono" style={{ fontSize: 8, color: 'rgba(251,246,235,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>overlap</div>
            <div className="rm-display" style={{ fontSize: 22, color: '#D4FF3D' }}>4 genres</div>
          </div>
        </div>

        {/* tab control */}
        <div style={{ display: 'flex', gap: 4, padding: 4, marginTop: 18, background: 'rgba(255,255,255,0.05)', borderRadius: 14 }}>
          {['Overlap','Diversity','Mood','Trends'].map((t, i) => (
            <button key={t} style={{ flex: 1, height: 36, borderRadius: 10, border: 'none', cursor: 'pointer',
              background: i === 0 ? '#FBF6EB' : 'transparent', color: i === 0 ? '#16102E' : 'rgba(251,246,235,0.65)',
              fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 600, fontSize: 13 }}>{t}</button>
          ))}
        </div>

        {/* horizontal bar — diversity dimensions */}
        <div style={{ marginTop: 16, padding: 18, borderRadius: 22, background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
            <span className="rm-display" style={{ fontSize: 18 }}>Diversity balance</span>
            <span className="rm-mono" style={{ fontSize: 10, color: 'rgba(251,246,235,0.4)', letterSpacing: '0.1em' }}>last 8 reads</span>
          </div>
          {[
            { l: 'Genre',     v: 0.78, c: '#D4FF3D' },
            { l: 'Setting',   v: 0.62, c: '#FF7E6B' },
            { l: 'Voice',     v: 0.85, c: '#7C5BFF' },
            { l: 'Era',       v: 0.41, c: '#E8E0FF' },
          ].map((b, i) => (
            <div key={i} style={{ marginBottom: i === 3 ? 0 : 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 12.5, color: 'rgba(251,246,235,0.85)' }}>{b.l}</span>
                <span className="rm-mono" style={{ fontSize: 11, color: b.c }}>{b.v}</span>
              </div>
              <div style={{ height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                <div style={{ width: `${b.v*100}%`, height: '100%', background: b.c, borderRadius: 4 }} />
              </div>
            </div>
          ))}
        </div>

        {/* satisfaction card */}
        <div style={{ marginTop: 12, borderRadius: 22, padding: 18, background: '#D4FF3D', color: '#16102E', position: 'relative', overflow: 'hidden' }}>
          <Star size={70} fill="#16102E" spikes={6} style={{ position: 'absolute', right: -16, top: -16, opacity: 0.08 }} />
          <div className="rm-mono" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.65 }}>Collective satisfaction</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 4 }}>
            <span className="rm-display" style={{ fontSize: 42 }}>92<span style={{ fontSize: 22 }}>%</span></span>
            <span className="rm-serif-italic" style={{ fontSize: 14 }}>“we trust the algorithm”</span>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ScreenCompatibility });
