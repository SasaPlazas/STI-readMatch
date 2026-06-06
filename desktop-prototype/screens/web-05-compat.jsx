// web-05 — Desktop Compatibility / AI workspace (1440 × 900)
function ScreenWebCompat() {
  const positions = [
    { m: MEMBERS[0], x: 50, y: 15, r: 56 },
    { m: MEMBERS[1], x: 85, y: 42, r: 50 },
    { m: MEMBERS[2], x: 75, y: 82, r: 58 },
    { m: MEMBERS[3], x: 22, y: 78, r: 48 },
    { m: MEMBERS[4], x: 12, y: 38, r: 44 },
  ];

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', background: '#F4F1FF', color: '#16102E', fontFamily: "'Inter', system-ui" }}>
      <WebSidebar active="groups" />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <WebTopBar title="Slow Burners · Compatibility map" subtitle="Live · last sync 6m ago" />

        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '320px 1fr 380px', gap: 0, overflow: 'hidden' }}>
          {/* LEFT — score + diversity */}
          <aside style={{ padding: 24, borderRight: '1px solid rgba(22,16,46,0.06)', background: '#fff', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 18 }}>
            {/* big score */}
            <div>
              <div className="rm-mono" style={{ fontSize: 10, color: 'rgba(22,16,46,0.5)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Collective score</div>
              <div className="rm-display" style={{ fontSize: 92, color: '#7C5BFF', lineHeight: 1, marginTop: 6, letterSpacing: '-0.04em' }}>0.86</div>
              <span className="rm-pill rm-pill-lime" style={{ marginTop: 8 }}>↗ +0.04 this month</span>
            </div>

            {/* tabs */}
            <div style={{ display: 'flex', gap: 4, padding: 4, background: '#F4F1FF', borderRadius: 12 }}>
              {['Overlap', 'Diversity', 'Mood', 'Trends'].map((t, i) => (
                <button key={t} style={{ flex: 1, height: 32, borderRadius: 8, border: 'none', cursor: 'pointer',
                  background: i === 0 ? '#16102E' : 'transparent', color: i === 0 ? '#FBF6EB' : '#3A2F5C',
                  fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 600, fontSize: 11 }}>{t}</button>
              ))}
            </div>

            {/* diversity bars */}
            <div>
              <div className="rm-display" style={{ fontSize: 16, marginBottom: 12 }}>Diversity balance</div>
              {[
                { l: 'Genre',     v: 0.78, c: '#D4FF3D' },
                { l: 'Setting',   v: 0.62, c: '#FF7E6B' },
                { l: 'Voice',     v: 0.85, c: '#7C5BFF' },
                { l: 'Era',       v: 0.41, c: '#E8E0FF' },
                { l: 'Language',  v: 0.52, c: '#16102E' },
              ].map((b, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                    <span>{b.l}</span>
                    <span className="rm-mono" style={{ fontWeight: 700, color: b.c === '#E8E0FF' ? '#7C5BFF' : b.c }}>{b.v}</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 3, background: 'rgba(22,16,46,0.06)', overflow: 'hidden' }}>
                    <div style={{ width: `${b.v*100}%`, height: '100%', background: b.c }} />
                  </div>
                </div>
              ))}
            </div>

            {/* satisfaction */}
            <div style={{ marginTop: 'auto', borderRadius: 18, padding: 16, background: '#D4FF3D' }}>
              <div className="rm-mono" style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.7 }}>Satisfaction</div>
              <div className="rm-display" style={{ fontSize: 38, lineHeight: 1, marginTop: 4 }}>92<span style={{ fontSize: 18 }}>%</span></div>
              <div className="rm-serif-italic" style={{ fontSize: 13, marginTop: 4 }}>“we trust the algorithm”</div>
            </div>
          </aside>

          {/* CENTER — big radial */}
          <div style={{ position: 'relative', padding: 32, overflow: 'hidden', background: 'radial-gradient(circle at 50% 50%, #F8F4FF 0%, #F4F1FF 100%)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
              <div>
                <div className="rm-display" style={{ fontSize: 24, color: '#16102E' }}>Compatibility network</div>
                <div className="rm-mono" style={{ fontSize: 10.5, color: 'rgba(22,16,46,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4 }}>5 members · 4 genre overlap · live</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {['Radial', 'Network', 'Bubbles'].map((m, i) => (
                  <button key={m} style={{ height: 32, padding: '0 12px', borderRadius: 10, border: 'none', cursor: 'pointer', background: i === 0 ? '#16102E' : '#fff', color: i === 0 ? '#FBF6EB' : '#3A2F5C', fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 600, fontSize: 12, boxShadow: i === 0 ? 'none' : '0 0 0 1px rgba(22,16,46,0.08) inset' }}>{m}</button>
                ))}
              </div>
            </div>

            {/* the viz */}
            <div style={{ position: 'relative', height: 'calc(100% - 60px)' }}>
              <svg width="100%" height="100%" viewBox="0 0 600 540" preserveAspectRatio="xMidYMid meet">
                {/* concentric rings */}
                {[80, 140, 200, 260].map(r => (
                  <circle key={r} cx={300} cy={270} r={r} stroke="rgba(22,16,46,0.06)" fill="none" />
                ))}
                {/* radial lines */}
                {positions.map((p, i) => {
                  const cx = (p.x / 100) * 600, cy = (p.y / 100) * 540;
                  return (
                    <line key={i} x1={300} y1={270} x2={cx} y2={cy} stroke={p.m.hue} strokeOpacity="0.35" strokeWidth="2" strokeDasharray="4 5" />
                  );
                })}

                {/* genre bubbles inside */}
                {[
                  { l: 'Lit Fic', x: 300, y: 230, r: 44, c: '#D4FF3D' },
                  { l: 'Sci-Fi',  x: 380, y: 290, r: 36, c: '#7C5BFF', dark: true },
                  { l: 'Memoir',  x: 220, y: 290, r: 32, c: '#FF7E6B' },
                  { l: 'Mystery', x: 300, y: 350, r: 26, c: '#E8E0FF' },
                ].map((g,i) => (
                  <g key={i}>
                    <circle cx={g.x} cy={g.y} r={g.r} fill={g.c} opacity="0.92" />
                    <text x={g.x} y={g.y+4} textAnchor="middle" fontFamily="'Bricolage Grotesque', system-ui" fontWeight="700" fontSize={g.r * 0.32} fill={g.dark ? '#FBF6EB' : '#16102E'}>{g.l}</text>
                  </g>
                ))}
              </svg>

              {/* member nodes — HTML for crisp avatars */}
              {positions.map(p => (
                <div key={p.m.id} style={{ position: 'absolute', left: `calc(${p.x}% - ${p.r/2}px)`, top: `calc(${p.y}% - ${p.r/2}px)`, textAlign: 'center' }}>
                  <Avatar m={p.m} size={p.r} />
                  <div style={{ marginTop: 4, padding: '2px 6px', borderRadius: 6, background: '#fff', fontSize: 10.5, fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, color: '#16102E', boxShadow: '0 0 0 1px rgba(22,16,46,0.06)', display: 'inline-block' }}>
                    {p.m.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — AI explanation analytics */}
          <aside style={{ padding: 24, borderLeft: '1px solid rgba(22,16,46,0.06)', background: '#fff', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* AI mix */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <span style={{ width: 26, height: 26, borderRadius: 8, background: '#D4FF3D', color: '#16102E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>✦</span>
                <div className="rm-display" style={{ fontSize: 18 }}>AI reasoning</div>
              </div>
              <div className="rm-serif-italic" style={{ fontSize: 14, color: '#3A2F5C', lineHeight: 1.4 }}>
                "Fantasy affinity raised group fit by <b style={{ color: '#7C5BFF' }}>32%</b> after Iris joined."
              </div>

              {/* stacked mix */}
              <div style={{ marginTop: 14, height: 18, borderRadius: 5, overflow: 'hidden', display: 'flex' }}>
                <div style={{ width: '42%', background: '#7C5BFF' }} />
                <div style={{ width: '28%', background: '#FF7E6B' }} />
                <div style={{ width: '18%', background: '#D4FF3D' }} />
                <div style={{ width: '12%', background: '#16102E' }} />
              </div>
              <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  { c: '#7C5BFF', l: 'Collaborative', v: '42%' },
                  { c: '#FF7E6B', l: 'Content-based', v: '28%' },
                  { c: '#D4FF3D', l: 'Fairness',      v: '18%' },
                  { c: '#16102E', l: 'Novelty',       v: '12%' },
                ].map((r,i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
                    <span style={{ width: 8, height: 8, borderRadius: 2, background: r.c }} />
                    <span style={{ flex: 1, color: '#3A2F5C' }}>{r.l}</span>
                    <span className="rm-mono" style={{ fontWeight: 700, color: '#16102E' }}>{r.v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* member contribution */}
            <div>
              <div className="rm-display" style={{ fontSize: 16, marginBottom: 10 }}>Per-member affinity</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {MEMBERS.map((m, i) => (
                  <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Avatar m={m} size={28} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: 12.5, fontWeight: 600 }}>{m.name}</span>
                        <span className="rm-mono" style={{ fontSize: 11, color: m.hue === '#E8E0FF' || m.hue === '#FBF6EB' ? '#7C5BFF' : m.hue, fontWeight: 700 }}>{[92,88,95,76,81][i]}%</span>
                      </div>
                      <div style={{ marginTop: 4, height: 5, borderRadius: 3, background: 'rgba(22,16,46,0.06)', overflow: 'hidden' }}>
                        <div style={{ width: `${[92,88,95,76,81][i]}%`, height: '100%', background: m.hue, borderRadius: 3 }} />
                      </div>
                      <div className="rm-mono" style={{ fontSize: 9.5, color: 'rgba(22,16,46,0.5)', marginTop: 2 }}>
                        {['literary fiction · cities','translation · slow prose','dark academia adjacent','meta-narrative · libraries','quiet emotional arc'][i]}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* fairness flag */}
            <div style={{ padding: 12, borderRadius: 12, background: 'rgba(212,255,61,0.12)', border: '0.5px solid rgba(124,91,255,0.25)', display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 8, height: 8, borderRadius: 4, background: '#7C5BFF' }} />
              <span style={{ fontSize: 11.5, color: '#3A2F5C' }}><b>Fairness balanced</b> — no member below 70% affinity.</span>
            </div>

            {/* trend */}
            <div style={{ marginTop: 'auto' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <div className="rm-display" style={{ fontSize: 16 }}>Trend · 8 weeks</div>
                <span className="rm-pill rm-pill-lime" style={{ fontSize: 10 }}>↗ +0.04</span>
              </div>
              <svg width="100%" height="70" viewBox="0 0 300 70" style={{ marginTop: 8 }}>
                <defs>
                  <linearGradient id="sg2" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor="#7C5BFF" stopOpacity="0.3" />
                    <stop offset="1" stopColor="#7C5BFF" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,55 L40,48 L80,50 L120,38 L160,34 L200,28 L240,24 L280,16 L300,12 L300,70 L0,70 Z" fill="url(#sg2)" />
                <polyline points="0,55 40,48 80,50 120,38 160,34 200,28 240,24 280,16 300,12" stroke="#7C5BFF" strokeWidth="2.5" fill="none" />
                <circle cx="300" cy="12" r="4" fill="#D4FF3D" stroke="#16102E" strokeWidth="1.5" />
              </svg>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
Object.assign(window, { ScreenWebCompat });
