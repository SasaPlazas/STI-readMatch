// 09 — Telegram bot companion
function ScreenTelegram() {
  const reactions = ['✦', '♥', '◐', '↑', '?'];
  return (
    <div className="rm-screen" style={{ background: '#E8E0FF' }}>
      {/* "telegram" themed chrome — generic chat header */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 92, background: '#16102E', color: '#FBF6EB', padding: '54px 16px 0', display: 'flex', alignItems: 'center', gap: 12, zIndex: 5 }}>
        <button style={{ width: 28, height: 28, border: 'none', background: 'transparent', color: '#FBF6EB', fontSize: 18, cursor: 'pointer' }}>‹</button>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#D4FF3D', color: '#16102E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 16 }}>✦</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 15 }}>ReadMatch Bot</div>
          <div className="rm-mono" style={{ fontSize: 10, color: 'rgba(212,255,61,0.85)', letterSpacing: '0.06em' }}>● online · slow burners</div>
        </div>
        <button style={{ width: 32, height: 32, borderRadius: 10, border: 'none', background: 'rgba(255,255,255,0.08)', color: '#FBF6EB', fontSize: 14, cursor: 'pointer' }}>⋮</button>
      </div>

      <div className="rm-body" style={{ padding: '104px 14px 110px', background: '#E8E0FF' }}>
        {/* date stamp */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
          <span style={{ padding: '4px 10px', borderRadius: 8, background: 'rgba(22,16,46,0.12)', color: '#16102E', fontSize: 11, fontWeight: 600 }}>Today · 8:42</span>
        </div>

        {/* incoming AI bot card — recommendation summary */}
        <div style={{ marginBottom: 12, maxWidth: 300 }}>
          <div style={{
            borderRadius: '18px 18px 18px 4px', background: '#fff', overflow: 'hidden',
            boxShadow: '0 4px 14px rgba(22,16,46,0.08)',
          }}>
            {/* mini hero */}
            <div style={{ padding: 14, background: 'linear-gradient(140deg, #2B1B69, #7C5BFF)', color: '#FBF6EB', display: 'flex', alignItems: 'center', gap: 12 }}>
              <BookCover book={BOOKS[1]} w={60} h={84} tilt={-3} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="rm-mono" style={{ fontSize: 9, color: '#D4FF3D', letterSpacing: '0.12em', textTransform: 'uppercase' }}>★ this week</div>
                <div className="rm-display" style={{ fontSize: 20, marginTop: 2, lineHeight: 1 }}>Soft Algorithms</div>
                <div className="rm-serif-italic" style={{ fontSize: 12, opacity: 0.75 }}>Yuki Tanabe</div>
              </div>
              <Ring value={89} size={44} stroke={4} color="#D4FF3D" textColor="#FBF6EB" />
            </div>
            <div style={{ padding: '12px 14px' }}>
              <div style={{ fontSize: 12.5, color: '#3A2F5C', lineHeight: 1.4 }}>
                Picked for your group because <b>Iris</b>' dark-academia streak met <b>Theo</b>'s essay habit. Diversity <b style={{ color: '#7C5BFF' }}>+18%</b>.
              </div>
            </div>
            {/* inline buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '1px solid rgba(22,16,46,0.08)' }}>
              <button style={{ padding: 12, border: 'none', borderRight: '1px solid rgba(22,16,46,0.08)', background: 'transparent', color: '#7C5BFF', fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>✦ I'm in</button>
              <button style={{ padding: 12, border: 'none', background: 'transparent', color: '#16102E', fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 500, fontSize: 13, cursor: 'pointer' }}>See why</button>
            </div>
          </div>
          <div className="rm-mono" style={{ fontSize: 9, color: 'rgba(22,16,46,0.45)', marginTop: 4, marginLeft: 4, letterSpacing: '0.08em' }}>BOT · 08:42</div>
        </div>

        {/* quick-vote chip rail */}
        <div style={{ marginBottom: 12, maxWidth: 280 }}>
          <div style={{ padding: '12px 14px', borderRadius: '18px 18px 18px 4px', background: '#16102E', color: '#FBF6EB' }}>
            <div style={{ fontSize: 12.5, lineHeight: 1.45 }}>Quick poll — want this for Oct?</div>
            <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
              {[
                { l: '✦ Yes', c: '#D4FF3D', cnt: 2 },
                { l: '◐ Maybe', c: '#7C5BFF', cnt: 1 },
                { l: '✕ Pass', c: '#FF7E6B', cnt: 0 },
              ].map((b,i) => (
                <button key={i} style={{
                  padding: '6px 10px', borderRadius: 999, border: 'none', cursor: 'pointer',
                  background: b.c, color: '#16102E',
                  fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 12,
                  display: 'flex', alignItems: 'center', gap: 6,
                }}>{b.l}{b.cnt > 0 && <span style={{ background: '#16102E', color: b.c, padding: '1px 6px', borderRadius: 999, fontSize: 10, fontFamily: "'JetBrains Mono', monospace" }}>{b.cnt}</span>}</button>
              ))}
            </div>
          </div>
        </div>

        {/* outgoing user message */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
          <div style={{ maxWidth: 240, padding: '10px 14px', borderRadius: '18px 18px 4px 18px', background: '#7C5BFF', color: '#FBF6EB', fontSize: 13.5, lineHeight: 1.4 }}>
            Can you swap the second pick for something shorter?
            <div className="rm-mono" style={{ fontSize: 9, color: 'rgba(255,255,255,0.55)', marginTop: 4, textAlign: 'right' }}>08:43 ✓✓</div>
          </div>
        </div>

        {/* compatibility alert */}
        <div style={{ marginBottom: 12, maxWidth: 290 }}>
          <div style={{ padding: 14, borderRadius: '18px 18px 18px 4px', background: '#fff', boxShadow: '0 4px 14px rgba(22,16,46,0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ width: 22, height: 22, borderRadius: 7, background: '#D4FF3D', color: '#16102E', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12 }}>↗</span>
              <span className="rm-mono" style={{ fontSize: 10, color: '#7C5BFF', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>Compatibility update</span>
            </div>
            <div style={{ fontSize: 12.5, lineHeight: 1.45, color: '#3A2F5C' }}>
              Group score is up to <b style={{ color: '#16102E' }}>0.86</b> after June joined. New alternates ready.
            </div>
            {/* sparkline */}
            <svg width="100%" height="32" viewBox="0 0 260 32" style={{ marginTop: 8 }}>
              <polyline points="0,24 30,22 60,18 90,20 120,14 150,12 180,8 210,10 240,4 260,6" fill="none" stroke="#7C5BFF" strokeWidth="2" />
              <polyline points="0,24 30,22 60,18 90,20 120,14 150,12 180,8 210,10 240,4 260,6" fill="none" stroke="#D4FF3D" strokeWidth="2" strokeDasharray="0 2 6" opacity="0.6" />
              <circle cx="260" cy="6" r="3" fill="#D4FF3D" />
            </svg>
          </div>
        </div>

        {/* reaction row from group */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, margin: '14px 0' }}>
          {MEMBERS.slice(0,4).map((m, i) => (
            <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px', borderRadius: 999, background: 'rgba(22,16,46,0.08)' }}>
              <Avatar m={m} size={14} />
              <span style={{ fontSize: 11 }}>{reactions[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* bottom composer + quick actions */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '8px 12px 22px', background: '#16102E' }}>
        {/* quick suggestions */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 10, overflowX: 'auto' }}>
          {['/match', '/vote', '/why', '/swap', '/stats'].map((s,i) => (
            <span key={i} className="rm-mono" style={{ padding: '6px 10px', borderRadius: 999, background: 'rgba(255,255,255,0.08)', color: '#D4FF3D', fontSize: 11, letterSpacing: '0.04em', flexShrink: 0 }}>{s}</span>
          ))}
        </div>
        <div style={{ height: 44, borderRadius: 22, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', padding: '0 6px 0 16px', gap: 8 }}>
          <span style={{ flex: 1, fontSize: 13, color: 'rgba(251,246,235,0.5)' }}>Ask the bot…</span>
          <button style={{ width: 34, height: 34, borderRadius: 17, border: 'none', background: '#D4FF3D', color: '#16102E', fontSize: 14, cursor: 'pointer' }}>↑</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ScreenTelegram });
