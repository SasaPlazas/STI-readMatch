// web-09 — Desktop Group Management workspace (1440 × 1000)
function ScreenWebGroup() {
  const members = [
    { ...MEMBERS[0], role: 'Curator',  status: 'in-sync',  last: '2m',  affinity: 92, joined: 'Aug 12' },
    { ...MEMBERS[1], role: 'Member',   status: 'in-sync',  last: '14m', affinity: 88, joined: 'Aug 14' },
    { ...MEMBERS[2], role: 'Member',   status: 'in-sync',  last: '1h',  affinity: 95, joined: 'Sep 02' },
    { ...MEMBERS[3], role: 'Member',   status: 'tg-only',  last: '3h',  affinity: 76, joined: 'Sep 11' },
    { ...MEMBERS[4], role: 'Pending',  status: 'pending',  last: '—',   affinity: 0,  joined: 'today' },
  ];

  return (
    <div style={{ width: '100%', minHeight: '100%', display: 'flex', background: '#F4F1FF', color: '#16102E', fontFamily: "'Inter', system-ui" }}>
      <WebSidebar active="groups" />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <WebTopBar title="Slow Burners" subtitle="5 members · est. Aug 2024 · curious mood · Telegram synced" />

        <div style={{ flex: 1, padding: '24px 32px 32px', display: 'flex', flexDirection: 'column', gap: 20, overflow: 'auto' }}>
          {/* HERO ROW — group identity + KPIs */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr 1fr 1fr', gap: 14 }}>
            {/* identity card */}
            <div style={{ borderRadius: 22, padding: 18, background: 'linear-gradient(140deg, #7C5BFF 0%, #2B1B69 100%)', color: '#FBF6EB', position: 'relative', overflow: 'hidden' }}>
              <Star size={56} fill="#D4FF3D" style={{ position: 'absolute', right: -10, top: -10, opacity: 0.18 }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 64, height: 64, borderRadius: 18, background: '#16102E', color: '#D4FF3D', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 800, fontSize: 24 }}>SB</div>
                <div>
                  <div className="rm-display" style={{ fontSize: 22, lineHeight: 1 }}>Slow Burners</div>
                  <div className="rm-mono" style={{ fontSize: 10, color: 'rgba(212,255,61,0.7)', letterSpacing: '0.08em', marginTop: 4 }}>● ACTIVE · 5 MEMBERS</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
                <span className="rm-pill rm-pill-lime" style={{ fontSize: 10 }}>● TG synced</span>
                <span className="rm-pill rm-pill-glass" style={{ fontSize: 10 }}>Curious mood</span>
              </div>
            </div>

            {/* KPI tiles */}
            <div style={{ borderRadius: 22, padding: 18, background: '#D4FF3D', color: '#16102E', position: 'relative' }}>
              <div className="rm-mono" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.7 }}>Compatibility</div>
              <div className="rm-display" style={{ fontSize: 46, lineHeight: 1, marginTop: 4 }}>0.86</div>
              <div style={{ fontSize: 11, marginTop: 4, opacity: 0.7 }}>↗ +0.04 this month</div>
            </div>
            <div style={{ borderRadius: 22, padding: 18, background: '#FF7E6B', color: '#16102E' }}>
              <div className="rm-mono" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.7 }}>Books finished</div>
              <div className="rm-display" style={{ fontSize: 46, lineHeight: 1, marginTop: 4 }}>14</div>
              <div style={{ fontSize: 11, marginTop: 4, opacity: 0.7 }}>since Aug 2024</div>
            </div>
            <div style={{ borderRadius: 22, padding: 18, background: '#16102E', color: '#FBF6EB' }}>
              <div className="rm-mono" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(251,246,235,0.5)' }}>Avg pace</div>
              <div className="rm-display" style={{ fontSize: 46, lineHeight: 1, marginTop: 4, color: '#D4FF3D' }}>1.2</div>
              <div className="rm-mono" style={{ fontSize: 11, color: 'rgba(251,246,235,0.55)', marginTop: 4 }}>books / month</div>
            </div>
          </div>

          {/* MAIN: members + telegram sync */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20 }}>
            {/* MEMBERS PANEL */}
            <div style={{ borderRadius: 22, padding: 22, background: '#fff', boxShadow: '0 0 0 1px rgba(22,16,46,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <div>
                  <div className="rm-display" style={{ fontSize: 22 }}>Members</div>
                  <div className="rm-mono" style={{ fontSize: 10.5, color: 'rgba(22,16,46,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 2 }}>5 members · 1 pending</div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button style={{ height: 36, padding: '0 14px', borderRadius: 10, border: 'none', background: '#fff', boxShadow: '0 0 0 1px rgba(22,16,46,0.1) inset', color: '#16102E', cursor: 'pointer', fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 600, fontSize: 12 }}>Roles</button>
                  <button style={{ height: 36, padding: '0 14px', borderRadius: 10, border: 'none', background: '#16102E', color: '#FBF6EB', cursor: 'pointer', fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 12, display: 'inline-flex', alignItems: 'center', gap: 6 }}>+ Invite</button>
                </div>
              </div>

              {/* table header */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 60px', gap: 12, padding: '8px 12px', borderBottom: '1px solid rgba(22,16,46,0.08)' }}>
                {['Member', 'Role', 'Status', 'Affinity', ''].map((h, i) => (
                  <span key={i} className="rm-mono" style={{ fontSize: 9.5, color: 'rgba(22,16,46,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700 }}>{h}</span>
                ))}
              </div>

              {/* rows */}
              {members.map(m => (
                <div key={m.id} style={{
                  display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 60px', gap: 12,
                  padding: '12px',
                  borderBottom: '0.5px solid rgba(22,16,46,0.05)',
                  alignItems: 'center',
                  background: m.status === 'pending' ? 'rgba(255,158,87,0.04)' : 'transparent',
                  borderRadius: 8,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Avatar m={m} size={32} />
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 700, color: '#16102E' }}>{m.name}</div>
                      <div className="rm-mono" style={{ fontSize: 9.5, color: 'rgba(22,16,46,0.5)', marginTop: 1, letterSpacing: '0.04em' }}>{m.tag} · joined {m.joined}</div>
                    </div>
                  </div>
                  <div>
                    <span style={{ padding: '3px 8px', borderRadius: 5, background: m.role === 'Curator' ? '#D4FF3D' : m.role === 'Pending' ? 'rgba(22,16,46,0.06)' : '#F4F1FF', color: '#16102E', fontSize: 10, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, letterSpacing: '0.04em' }}>{m.role.toUpperCase()}</span>
                  </div>
                  <div>
                    <span style={{
                      padding: '4px 8px', borderRadius: 999, fontSize: 9.5,
                      fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 700,
                      background: m.status === 'in-sync' ? '#E8F8D5' : m.status === 'tg-only' ? '#F4F1FF' : 'rgba(255,158,87,0.18)',
                      color: m.status === 'in-sync' ? '#3F6E12' : m.status === 'tg-only' ? '#5F38C2' : '#A04A12',
                      display: 'inline-flex', alignItems: 'center', gap: 4,
                    }}>
                      <span style={{ width: 5, height: 5, borderRadius: 3, background: m.status === 'in-sync' ? '#7DC22A' : m.status === 'tg-only' ? '#7C5BFF' : '#FF9457' }} />
                      {m.status === 'in-sync' ? '● synced' : m.status === 'tg-only' ? 'TG only' : 'pending'}
                    </span>
                    <div className="rm-mono" style={{ fontSize: 9, color: 'rgba(22,16,46,0.45)', marginTop: 2 }}>last {m.last}</div>
                  </div>
                  <div>
                    {m.affinity > 0 ? (
                      <>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span className="rm-mono" style={{ fontSize: 11, color: '#16102E', fontWeight: 700 }}>{m.affinity}%</span>
                        </div>
                        <div style={{ marginTop: 4, height: 4, borderRadius: 2, background: 'rgba(22,16,46,0.05)', overflow: 'hidden' }}>
                          <div style={{ width: `${m.affinity}%`, height: '100%', background: m.hue }} />
                        </div>
                      </>
                    ) : (
                      <span className="rm-mono" style={{ fontSize: 10, color: 'rgba(22,16,46,0.4)' }}>—</span>
                    )}
                  </div>
                  <button style={{ width: 28, height: 28, borderRadius: 8, border: 'none', background: 'transparent', color: 'rgba(22,16,46,0.55)', cursor: 'pointer', fontSize: 14 }}>⋯</button>
                </div>
              ))}
            </div>

            {/* TELEGRAM SYNC PANEL */}
            <div style={{ borderRadius: 22, padding: 22, background: '#16102E', color: '#FBF6EB', position: 'relative', overflow: 'hidden' }}>
              <Blob size={180} fill="#7C5BFF" style={{ position: 'absolute', right: -60, top: -80, opacity: 0.3 }} />

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 11, background: '#D4FF3D', color: '#16102E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 3 11 14M21 3 14.5 21l-3.5-7-7-3.5L21 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div>
                    <div className="rm-display" style={{ fontSize: 18 }}>Telegram sync</div>
                    <div className="rm-mono" style={{ fontSize: 10, color: 'rgba(212,255,61,0.7)', letterSpacing: '0.08em' }}>@rm_slow · 0.4s round-trip</div>
                  </div>
                </div>
                <span style={{ padding: '3px 8px', borderRadius: 5, background: '#D4FF3D', color: '#16102E', fontSize: 10, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>● LIVE</span>
              </div>

              {/* sync rules grid */}
              <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, position: 'relative' }}>
                {[
                  { l: 'Members',         d: '↔ both ways', c: '#D4FF3D' },
                  { l: 'Votes',           d: '↔ instant',   c: '#7C5BFF' },
                  { l: 'Recommendations', d: '→ to TG',     c: '#FF7E6B' },
                  { l: 'Highlights',      d: '← from TG',   c: '#E8E0FF' },
                ].map((r,i) => (
                  <div key={i} style={{ padding: 12, borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.08)' }}>
                    <div className="rm-mono" style={{ fontSize: 9, color: 'rgba(251,246,235,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{r.d}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                      <span style={{ width: 7, height: 7, borderRadius: 4, background: r.c }} />
                      <span className="rm-display" style={{ fontSize: 14 }}>{r.l}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* event log */}
              <div style={{ marginTop: 16, position: 'relative' }}>
                <div className="rm-mono" style={{ fontSize: 10, color: 'rgba(251,246,235,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Recent events · last hour</div>
                <div style={{ borderRadius: 12, background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                  {[
                    { dir: '→ TG', t: '08:42', l: 'Sent "Soft Algorithms" rec',  c: '#FF7E6B' },
                    { dir: '← RM', t: '08:39', l: 'Iris voted ★ via Telegram',   c: '#7C5BFF' },
                    { dir: '↔',   t: '08:21', l: 'Diego joined from TG link',   c: '#D4FF3D' },
                    { dir: '→ TG', t: '07:50', l: 'Compatibility update (0.86)', c: '#FF7E6B' },
                  ].map((e, i, arr) => (
                    <div key={i} style={{ padding: '9px 12px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: i < arr.length - 1 ? '0.5px solid rgba(255,255,255,0.05)' : 'none' }}>
                      <span className="rm-mono" style={{ width: 44, fontSize: 9.5, color: e.c, letterSpacing: '0.04em', fontWeight: 700, flexShrink: 0 }}>{e.dir}</span>
                      <div style={{ flex: 1, fontSize: 11.5, color: 'rgba(251,246,235,0.85)' }}>{e.l}</div>
                      <span className="rm-mono" style={{ fontSize: 9, color: 'rgba(251,246,235,0.4)' }}>{e.t}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: 14, display: 'flex', gap: 8, position: 'relative' }}>
                <button style={{ flex: 1, height: 38, borderRadius: 10, border: 'none', cursor: 'pointer', background: 'rgba(255,255,255,0.06)', color: '#FBF6EB', fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 600, fontSize: 12 }}>↻ Force resync</button>
                <button style={{ flex: 1, height: 38, borderRadius: 10, border: 'none', cursor: 'pointer', background: '#D4FF3D', color: '#16102E', fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 12 }}>Open channel ↗</button>
              </div>
            </div>
          </div>

          {/* PREFERENCES strip */}
          <div style={{ borderRadius: 22, padding: 20, background: '#fff', boxShadow: '0 0 0 1px rgba(22,16,46,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
              <span className="rm-display" style={{ fontSize: 20 }}>Recommendation priorities</span>
              <span className="rm-mono" style={{ fontSize: 10, color: 'rgba(22,16,46,0.45)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>shapes AI mix</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8 }}>
              {[
                { id: 'div',   l: 'Diversity',         on: true,  c: '#7C5BFF' },
                { id: 'depth', l: 'Depth over speed',  on: true,  c: '#D4FF3D' },
                { id: 'fair',  l: 'Fairness-aware',    on: true,  c: '#FF7E6B' },
                { id: 'min',   l: 'Minority voices',   on: true,  c: '#E8E0FF' },
                { id: 'nov',   l: 'Novelty',           on: false, c: '#FBF6EB' },
                { id: 'short', l: 'Short reads',       on: false, c: '#fff' },
              ].map(p => (
                <button key={p.id} style={{
                  padding: '14px 12px', borderRadius: 14, border: 'none', cursor: 'pointer',
                  background: p.on ? p.c : '#F4F1FF', color: '#16102E',
                  fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: p.on ? 700 : 500, fontSize: 13,
                  boxShadow: p.on ? '0 0 0 1.5px #16102E inset' : 'none',
                  textAlign: 'left',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  {p.l}
                  {p.on ? <span style={{ width: 16, height: 16, borderRadius: 8, background: '#16102E', color: '#D4FF3D', fontSize: 9, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>✓</span> : <span style={{ color: 'rgba(22,16,46,0.4)', fontSize: 14 }}>+</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
Object.assign(window, { ScreenWebGroup });
