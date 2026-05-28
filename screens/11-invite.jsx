// 11 — Invite Members
function ScreenInvite() {
  const [tab, setTab] = React.useState('link');
  const candidates = [
    { id: 'c1', name: 'Adaeze O.',   handle: '@adze',       hue: '#FF7E6B', initial: 'A', tag: 'Mutual: Theo' },
    { id: 'c2', name: 'Sam Wren',    handle: '@samwren',    hue: '#D4FF3D', initial: 'S', tag: 'Reads ✦ Mystery' },
    { id: 'c3', name: 'Petra K.',    handle: '@petra.k',    hue: '#7C5BFF', initial: 'P', tag: '94% compatible' },
    { id: 'c4', name: 'Diego Vela',  handle: '@diegove',    hue: '#E8E0FF', initial: 'D', tag: 'Telegram only' },
    { id: 'c5', name: 'Noor Rahim',  handle: '@noor',       hue: '#FBF6EB', initial: 'N', tag: 'New reader' },
  ];

  return (
    <div className="rm-screen" style={{ background: '#FBF6EB' }}>
      <div className="rm-body" style={{ padding: '60px 22px 120px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <button style={{ width: 36, height: 36, borderRadius: 12, border: 'none', background: '#fff', boxShadow: '0 0 0 1px rgba(22,16,46,0.08)', cursor: 'pointer', fontSize: 16, color: '#16102E' }}>‹</button>
          <span className="rm-mono" style={{ fontSize: 11, color: 'rgba(22,16,46,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Step 2 of 3</span>
          <div style={{ display: 'flex', gap: 4 }}>
            {[1,2,3].map(i => (
              <span key={i} style={{ width: 24, height: 4, borderRadius: 2, background: i <= 2 ? '#16102E' : 'rgba(22,16,46,0.15)' }} />
            ))}
          </div>
        </div>

        <div className="rm-display" style={{ fontSize: 38, color: '#16102E', lineHeight: 0.95 }}>
          Add the<br/>
          <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 400, color: '#FF7E6B' }}>circle</span>
        </div>
        <div style={{ fontSize: 14, color: 'rgba(22,16,46,0.6)', marginTop: 10, lineHeight: 1.4 }}>
          Drop a link, search a handle, or pick from your reading orbit. Telegram side syncs instantly.
        </div>

        {/* tabs */}
        <div style={{ display: 'flex', gap: 4, padding: 4, marginTop: 22, background: '#fff', borderRadius: 14, boxShadow: '0 0 0 1px rgba(22,16,46,0.06) inset' }}>
          {[
            { id: 'link', label: '★ Invite link' },
            { id: 'tg',   label: '✈ Telegram' },
            { id: 'search', label: '◐ Search' },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              flex: 1, height: 38, borderRadius: 10, border: 'none', cursor: 'pointer',
              background: tab === t.id ? '#16102E' : 'transparent',
              color: tab === t.id ? '#FBF6EB' : '#3A2F5C',
              fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 600, fontSize: 13,
            }}>{t.label}</button>
          ))}
        </div>

        {/* invite link card */}
        <div style={{ marginTop: 14, padding: 18, borderRadius: 22, background: '#16102E', color: '#FBF6EB', position: 'relative', overflow: 'hidden' }}>
          <Blob size={130} fill="#7C5BFF" style={{ position: 'absolute', right: -40, bottom: -40, opacity: 0.4 }} />
          <div className="rm-mono" style={{ fontSize: 10, color: 'rgba(212,255,61,0.85)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Shareable link</div>
          <div style={{ marginTop: 8, padding: '14px 14px', borderRadius: 14, background: 'rgba(255,255,255,0.08)', border: '0.5px solid rgba(255,255,255,0.14)', display: 'flex', alignItems: 'center', gap: 10, position: 'relative' }}>
            <span className="rm-mono" style={{ flex: 1, fontSize: 12, color: '#FBF6EB', letterSpacing: '0.02em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>readmatch.io/g/slow-burners</span>
            <button style={{ padding: '8px 12px', borderRadius: 10, border: 'none', background: '#D4FF3D', color: '#16102E', fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>Copy</button>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 12, position: 'relative' }}>
            <button style={{ flex: 1, height: 42, borderRadius: 12, border: 'none', cursor: 'pointer', background: 'rgba(255,255,255,0.06)', color: '#FBF6EB', fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 600, fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M21 3 11 14M21 3 14.5 21l-3.5-7-7-3.5L21 3z" stroke="#D4FF3D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Telegram
            </button>
            <button style={{ flex: 1, height: 42, borderRadius: 12, border: 'none', cursor: 'pointer', background: 'rgba(255,255,255,0.06)', color: '#FBF6EB', fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 600, fontSize: 13 }}>QR code</button>
            <button style={{ flex: 1, height: 42, borderRadius: 12, border: 'none', cursor: 'pointer', background: 'rgba(255,255,255,0.06)', color: '#FBF6EB', fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 600, fontSize: 13 }}>SMS</button>
          </div>
        </div>

        {/* search bar */}
        <div style={{ marginTop: 14, padding: '12px 14px', borderRadius: 14, background: '#fff', boxShadow: '0 0 0 1px rgba(22,16,46,0.08) inset', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 24, height: 24, borderRadius: 8, background: '#F4F1FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7C5BFF' }}>◔</span>
          <span style={{ flex: 1, fontSize: 14, color: 'rgba(22,16,46,0.5)' }}>Search name, email, @handle…</span>
          <span className="rm-mono" style={{ fontSize: 10, color: 'rgba(22,16,46,0.4)', letterSpacing: '0.08em' }}>⌘ K</span>
        </div>

        {/* suggested */}
        <div style={{ marginTop: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span className="rm-display" style={{ fontSize: 20, color: '#16102E' }}>Suggested</span>
          <span className="rm-mono" style={{ fontSize: 10, color: 'rgba(22,16,46,0.45)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>AI-picked</span>
        </div>

        <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {candidates.map((c, i) => (
            <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderRadius: 16, background: '#fff', boxShadow: '0 0 0 1px rgba(22,16,46,0.05)' }}>
              <Avatar m={c} size={42} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 15, color: '#16102E' }}>{c.name}</span>
                  {c.tag.includes('Telegram') && (
                    <span style={{ width: 16, height: 16, borderRadius: 8, background: '#D4FF3D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none"><path d="M21 3 11 14M21 3 14.5 21l-3.5-7-7-3.5L21 3z" stroke="#16102E" strokeWidth="2.5"/></svg>
                    </span>
                  )}
                </div>
                <div className="rm-mono" style={{ fontSize: 10.5, color: 'rgba(22,16,46,0.55)', letterSpacing: '0.04em', marginTop: 1 }}>{c.handle} · {c.tag}</div>
              </div>
              <button style={{
                padding: '8px 14px', borderRadius: 999, border: 'none', cursor: 'pointer',
                background: i % 2 ? '#D4FF3D' : '#16102E',
                color: i % 2 ? '#16102E' : '#FBF6EB',
                fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 12,
              }}>{i % 2 ? '+ Add' : 'Sent ✓'}</button>
            </div>
          ))}
        </div>
      </div>

      {/* footer */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '14px 20px 26px', background: 'linear-gradient(180deg, rgba(251,246,235,0) 0%, #FBF6EB 30%)' }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '0 4px 10px' }}>
          <div style={{ display: 'flex' }}>
            {MEMBERS.slice(0,3).map((m, i) => (
              <div key={m.id} style={{ marginLeft: i === 0 ? 0 : -8 }}><Avatar m={m} size={26} /></div>
            ))}
          </div>
          <span style={{ fontSize: 12, color: 'rgba(22,16,46,0.6)' }}><b style={{ color: '#16102E' }}>3 invited</b> · 2 joined</span>
        </div>
        <button style={{
          width: '100%', height: 60, border: 'none', cursor: 'pointer',
          borderRadius: 30, background: '#16102E', color: '#FBF6EB',
          fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 17,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px 0 24px',
        }}>
          <span>Continue</span>
          <span style={{ width: 44, height: 44, borderRadius: 22, background: '#D4FF3D', color: '#16102E', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>→</span>
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { ScreenInvite });
