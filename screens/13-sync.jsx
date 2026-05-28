// 13 — Telegram Sync Status
function ScreenSync() {
  return (
    <div className="rm-screen" style={{ background: '#16102E', color: '#FBF6EB' }}>
      <div className="rm-body" style={{ padding: '60px 22px 100px' }}>
        {/* top */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <button style={{ width: 36, height: 36, borderRadius: 12, border: 'none', background: 'rgba(255,255,255,0.08)', color: '#FBF6EB', cursor: 'pointer', fontSize: 16 }}>‹</button>
          <span className="rm-mono" style={{ fontSize: 11, color: 'rgba(251,246,235,0.5)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Telegram sync</span>
          <span className="rm-pill rm-pill-lime" style={{ fontSize: 10 }}>● Live</span>
        </div>

        {/* status hero — two-orb diagram */}
        <div style={{ position: 'relative', height: 260, marginTop: 8, marginBottom: 18 }}>
          {/* connecting line */}
          <svg width="100%" height="260" viewBox="0 0 360 260" style={{ position: 'absolute', inset: 0 }}>
            <defs>
              <linearGradient id="syncgrad" x1="0" x2="1">
                <stop offset="0" stopColor="#7C5BFF" />
                <stop offset="1" stopColor="#D4FF3D" />
              </linearGradient>
            </defs>
            <path d="M 90 130 Q 180 60, 270 130" stroke="url(#syncgrad)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 270 130 Q 180 200, 90 130" stroke="url(#syncgrad)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="2 6" />
            {/* arrow heads */}
            <polygon points="265,130 272,124 272,136" fill="#D4FF3D" />
            <polygon points="95,130 88,124 88,136" fill="#7C5BFF" />
            {/* travelling pulses */}
            <circle cx="180" cy="86" r="4" fill="#D4FF3D"><animate attributeName="cx" values="92;270" dur="2.6s" repeatCount="indefinite"/><animate attributeName="cy" values="130;90;130" dur="2.6s" repeatCount="indefinite"/></circle>
            <circle cx="180" cy="174" r="4" fill="#7C5BFF"><animate attributeName="cx" values="268;92" dur="2.6s" repeatCount="indefinite" begin="1.3s"/><animate attributeName="cy" values="130;170;130" dur="2.6s" repeatCount="indefinite" begin="1.3s"/></circle>
          </svg>

          {/* readmatch orb */}
          <div style={{ position: 'absolute', left: 30, top: 80, width: 100, height: 100, borderRadius: '50%', background: 'radial-gradient(circle at 30% 30%, #7C5BFF, #2B1B69)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 16px 40px rgba(124,91,255,0.4), 0 0 0 4px rgba(124,91,255,0.18)' }}>
            <Star size={32} fill="#D4FF3D" />
            <div className="rm-mono" style={{ fontSize: 9, marginTop: 2, color: '#FBF6EB', letterSpacing: '0.08em' }}>ReadMatch</div>
          </div>

          {/* telegram orb */}
          <div style={{ position: 'absolute', right: 30, top: 80, width: 100, height: 100, borderRadius: '50%', background: 'radial-gradient(circle at 30% 30%, #D4FF3D, #94B82A)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 16px 40px rgba(212,255,61,0.3), 0 0 0 4px rgba(212,255,61,0.18)' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M21 3 11 14M21 3 14.5 21l-3.5-7-7-3.5L21 3z" stroke="#16102E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <div className="rm-mono" style={{ fontSize: 9, marginTop: 4, color: '#16102E', letterSpacing: '0.08em' }}>Telegram</div>
          </div>

          {/* center label */}
          <div style={{ position: 'absolute', left: '50%', top: 200, transform: 'translateX(-50%)', textAlign: 'center' }}>
            <div className="rm-display" style={{ fontSize: 24, color: '#D4FF3D' }}>0.4s</div>
            <div className="rm-mono" style={{ fontSize: 9, color: 'rgba(251,246,235,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>avg round-trip</div>
          </div>
        </div>

        {/* status card */}
        <div style={{ borderRadius: 22, padding: 18, background: 'rgba(212,255,61,0.08)', border: '0.5px solid rgba(212,255,61,0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <span style={{ width: 12, height: 12, borderRadius: 6, background: '#D4FF3D', marginTop: 6, boxShadow: '0 0 0 6px rgba(212,255,61,0.18)' }} />
            <div style={{ flex: 1 }}>
              <div className="rm-display" style={{ fontSize: 22, color: '#FBF6EB' }}>Channel is healthy</div>
              <div style={{ fontSize: 12.5, color: 'rgba(251,246,235,0.7)', marginTop: 4, lineHeight: 1.4 }}>
                Bidirectional sync active. 5 members mirrored both ways. No conflicts.
              </div>
              <div style={{ display: 'flex', gap: 14, marginTop: 12 }}>
                {[
                  { l: 'Channel', v: '@rm_slow' },
                  { l: 'Synced', v: '6m ago' },
                  { l: 'Webhook', v: 'OK · 200' },
                ].map((s,i) => (
                  <div key={i}>
                    <div className="rm-mono" style={{ fontSize: 8.5, color: 'rgba(251,246,235,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.l}</div>
                    <div className="rm-mono" style={{ fontSize: 11, color: '#FBF6EB', marginTop: 2 }}>{s.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* sync rules */}
        <div style={{ marginTop: 18 }}>
          <div className="rm-display" style={{ fontSize: 18, marginBottom: 10 }}>What syncs</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
            {[
              { l: 'Members',         d: '↔ both ways', c: '#D4FF3D' },
              { l: 'Votes',           d: '↔ instant',   c: '#7C5BFF' },
              { l: 'Recommendations', d: '→ to TG',     c: '#FF7E6B' },
              { l: 'Highlights',      d: '← from TG',   c: '#E8E0FF' },
            ].map((r,i) => (
              <div key={i} style={{ padding: 14, borderRadius: 16, background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.08)' }}>
                <div className="rm-mono" style={{ fontSize: 9, color: 'rgba(251,246,235,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{r.d}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 4, background: r.c }} />
                  <span className="rm-display" style={{ fontSize: 16, color: '#FBF6EB' }}>{r.l}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* event log */}
        <div style={{ marginTop: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
            <span className="rm-display" style={{ fontSize: 18 }}>Recent events</span>
            <span className="rm-mono" style={{ fontSize: 10, color: 'rgba(251,246,235,0.45)', letterSpacing: '0.1em' }}>last hour</span>
          </div>
          <div style={{ borderRadius: 18, background: 'rgba(255,255,255,0.04)', overflow: 'hidden', border: '0.5px solid rgba(255,255,255,0.06)' }}>
            {[
              { dir: '→ TG', t: '08:42', l: 'Recommendation "Soft Algorithms" sent', c: '#FF7E6B' },
              { dir: '← RM', t: '08:39', l: 'Iris voted ★ via Telegram', c: '#7C5BFF' },
              { dir: '↔',   t: '08:21', l: 'Diego joined from Telegram link', c: '#D4FF3D' },
              { dir: '→ TG', t: '07:50', l: 'Compatibility update posted (0.86)', c: '#FF7E6B' },
            ].map((e, i, arr) => (
              <div key={i} style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: i < arr.length - 1 ? '0.5px solid rgba(255,255,255,0.06)' : 'none' }}>
                <span className="rm-mono" style={{ width: 50, fontSize: 10, color: e.c, letterSpacing: '0.04em', fontWeight: 700, flexShrink: 0 }}>{e.dir}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12.5, color: 'rgba(251,246,235,0.9)' }}>{e.l}</div>
                </div>
                <span className="rm-mono" style={{ fontSize: 10, color: 'rgba(251,246,235,0.4)', letterSpacing: '0.04em' }}>{e.t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* reconnect cta */}
        <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
          <button style={{ flex: 1, height: 50, borderRadius: 14, border: 'none', cursor: 'pointer', background: 'rgba(255,255,255,0.06)', color: '#FBF6EB', fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 600, fontSize: 13 }}>↻ Force resync</button>
          <button style={{ flex: 1, height: 50, borderRadius: 14, border: 'none', cursor: 'pointer', background: '#D4FF3D', color: '#16102E', fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 13 }}>Open channel ↗</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ScreenSync });
