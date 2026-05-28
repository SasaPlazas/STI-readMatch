// 12 — Group Settings + Member Management
function ScreenGroupSettings() {
  const [tgMirror, setTgMirror] = React.useState(true);
  const [autoRec, setAutoRec] = React.useState(true);
  const [fairness, setFairness] = React.useState(true);

  const members = [
    { ...MEMBERS[0], role: 'Curator',  status: 'in-sync',    last: '2m' },
    { ...MEMBERS[1], role: 'Member',   status: 'in-sync',    last: '14m' },
    { ...MEMBERS[2], role: 'Member',   status: 'in-sync',    last: '1h' },
    { ...MEMBERS[3], role: 'Member',   status: 'tg-only',    last: '3h' },
    { ...MEMBERS[4], role: 'Pending',  status: 'pending',    last: '—' },
  ];

  return (
    <div className="rm-screen" style={{ background: '#FBF6EB' }}>
      <div className="rm-body" style={{ padding: '60px 0 100px' }}>
        {/* header */}
        <div style={{ padding: '0 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <button style={{ width: 36, height: 36, borderRadius: 12, border: 'none', background: '#fff', boxShadow: '0 0 0 1px rgba(22,16,46,0.08)', cursor: 'pointer', fontSize: 16, color: '#16102E' }}>‹</button>
          <span className="rm-mono" style={{ fontSize: 11, color: 'rgba(22,16,46,0.55)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Group settings</span>
          <button style={{ width: 36, height: 36, borderRadius: 12, border: 'none', background: '#fff', boxShadow: '0 0 0 1px rgba(22,16,46,0.08)', cursor: 'pointer', fontSize: 14, color: '#16102E' }}>⋯</button>
        </div>

        {/* group hero */}
        <div style={{ padding: '0 22px 18px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 80, height: 80, borderRadius: 22, background: 'linear-gradient(140deg, #7C5BFF, #2B1B69)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
            <Star size={28} fill="#D4FF3D" style={{ position: 'absolute', top: 8, right: 8, transform: 'rotate(12deg)' }} />
            <span className="rm-display" style={{ fontSize: 36, color: '#FBF6EB' }}>SB</span>
          </div>
          <div style={{ flex: 1 }}>
            <div className="rm-display" style={{ fontSize: 26, color: '#16102E', lineHeight: 1 }}>Slow Burners</div>
            <div className="rm-mono" style={{ fontSize: 10.5, color: 'rgba(22,16,46,0.55)', letterSpacing: '0.08em', marginTop: 4, textTransform: 'uppercase' }}>5 members · est. Aug 2024</div>
            <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
              <span className="rm-pill rm-pill-lime" style={{ fontSize: 10 }}>● TG synced</span>
              <span className="rm-pill" style={{ fontSize: 10, background: '#fff', boxShadow: '0 0 0 1px rgba(22,16,46,0.1) inset' }}>Curious mood</span>
            </div>
          </div>
        </div>

        {/* member section */}
        <div style={{ padding: '0 22px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span className="rm-display" style={{ fontSize: 20, color: '#16102E' }}>Members</span>
          <button style={{ padding: '6px 12px', borderRadius: 999, border: 'none', background: '#16102E', color: '#FBF6EB', fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 600, fontSize: 11, cursor: 'pointer' }}>+ Invite</button>
        </div>

        <div style={{ padding: '12px 16px 0', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {members.map(m => (
            <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderRadius: 16, background: m.status === 'pending' ? '#fff8e6' : '#fff', boxShadow: '0 0 0 1px rgba(22,16,46,0.05)' }}>
              <Avatar m={m} size={42} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 14, color: '#16102E' }}>{m.name}</span>
                  {m.role === 'Curator' && <span style={{ padding: '1px 6px', borderRadius: 6, background: '#D4FF3D', color: '#16102E', fontSize: 9, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, letterSpacing: '0.04em' }}>CURATOR</span>}
                </div>
                <div className="rm-mono" style={{ fontSize: 10, color: 'rgba(22,16,46,0.5)', marginTop: 2, letterSpacing: '0.04em' }}>
                  {m.tag} · last {m.last}
                </div>
              </div>

              {/* sync status pill */}
              <div style={{
                padding: '5px 9px', borderRadius: 999, fontSize: 9.5,
                fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.06em', textTransform: 'uppercase',
                background: m.status === 'in-sync' ? '#E8F8D5' : m.status === 'tg-only' ? '#F4F1FF' : 'rgba(255,158,87,0.18)',
                color: m.status === 'in-sync' ? '#3F6E12' : m.status === 'tg-only' ? '#5F38C2' : '#A04A12',
                display: 'flex', alignItems: 'center', gap: 4,
              }}>
                <span style={{ width: 5, height: 5, borderRadius: 3, background: m.status === 'in-sync' ? '#7DC22A' : m.status === 'tg-only' ? '#7C5BFF' : '#FF9457' }} />
                {m.status === 'in-sync' ? '● synced' : m.status === 'tg-only' ? 'TG only' : 'pending'}
              </div>
            </div>
          ))}
        </div>

        {/* Preferences section */}
        <div style={{ padding: '24px 22px 6px' }}>
          <span className="rm-display" style={{ fontSize: 20, color: '#16102E' }}>Preferences</span>
        </div>
        <div style={{ padding: '8px 16px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { l: 'Telegram mirror',   s: 'Push recs & votes to the channel.', v: tgMirror, set: setTgMirror, c: '#7C5BFF' },
            { l: 'Auto-recommend',    s: 'AI picks a new book every Monday.', v: autoRec, set: setAutoRec, c: '#FF7E6B' },
            { l: 'Fairness guard',    s: 'Protect minority preferences.',     v: fairness, set: setFairness, c: '#D4FF3D' },
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14, borderRadius: 16, background: '#fff', boxShadow: '0 0 0 1px rgba(22,16,46,0.05)' }}>
              <span style={{ width: 36, height: 36, borderRadius: 12, background: r.c, color: '#16102E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 800 }}>{['✈','✦','⚖'][i]}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#16102E' }}>{r.l}</div>
                <div style={{ fontSize: 11.5, color: 'rgba(22,16,46,0.55)', marginTop: 1 }}>{r.s}</div>
              </div>
              <button onClick={() => r.set(!r.v)} style={{ width: 44, height: 26, borderRadius: 13, border: 'none', cursor: 'pointer', background: r.v ? '#16102E' : 'rgba(22,16,46,0.15)', position: 'relative', flexShrink: 0 }}>
                <span style={{ position: 'absolute', top: 3, left: r.v ? 21 : 3, width: 20, height: 20, borderRadius: 10, background: r.v ? '#D4FF3D' : '#fff', transition: 'left .18s' }} />
              </button>
            </div>
          ))}
        </div>

        {/* danger zone */}
        <div style={{ padding: '20px 16px 0' }}>
          <button style={{ width: '100%', padding: 14, borderRadius: 16, border: 'none', background: '#fff', color: '#C0432F', textAlign: 'left', fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 600, fontSize: 14, cursor: 'pointer', boxShadow: '0 0 0 1px rgba(192,67,47,0.2) inset', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(192,67,47,0.12)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#C0432F' }}>!</span>
            Disband group · permanent
          </button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ScreenGroupSettings });
