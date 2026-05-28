// web-07 — Desktop Notifications & Activity (1440 × 900)
function ScreenWebNotifications() {
  const [tab, setTab] = React.useState('all');

  const items = [
    { id: 1, type: 'rec',    icon: '✦', c: '#D4FF3D', t: 'New recommendation', sub: '“Soft Algorithms” matched your circle at 89%', who: null, time: '2m', unread: true },
    { id: 2, type: 'tg',     icon: '✈', c: '#7C5BFF', t: 'Telegram sync',       sub: 'Iris voted ★ via channel for “Lemon, Lemon”',  who: MEMBERS[2], time: '12m', unread: true },
    { id: 3, type: 'member', icon: '+', c: '#FF7E6B', t: 'New member',          sub: 'Diego joined Slow Burners through Telegram',    who: MEMBERS[3], time: '1h', unread: true },
    { id: 4, type: 'vote',   icon: '◐', c: '#7C5BFF', t: 'Vote closing soon',   sub: '“Lemon, Lemon” poll closes in 6h — 3 of 5 voted', who: null, time: '3h' },
    { id: 5, type: 'compat', icon: '↗', c: '#D4FF3D', t: 'Compatibility ↑',     sub: 'Group score moved 0.82 → 0.86 (+0.04)',         who: null, time: '5h' },
    { id: 6, type: 'mile',   icon: '★', c: '#FF7E6B', t: 'Reading milestone',   sub: 'Theo finished his 12th book of the year',       who: MEMBERS[1], time: '8h' },
    { id: 7, type: 'rec',    icon: '✦', c: '#D4FF3D', t: 'AI re-weighted picks',sub: 'Fairness guard boosted minority preferences',   who: null, time: '1d' },
    { id: 8, type: 'tg',     icon: '✈', c: '#7C5BFF', t: 'Highlight from TG',   sub: 'Ravi shared a note on “The Quiet Bureau” p.84',  who: MEMBERS[3], time: '1d' },
  ];

  const filters = [
    { id: 'all',     l: 'All',           cnt: 8 },
    { id: 'unread',  l: 'Unread',        cnt: 3 },
    { id: 'tg',      l: 'Telegram',      cnt: 2 },
    { id: 'rec',     l: 'Recs',          cnt: 2 },
    { id: 'vote',    l: 'Votes',         cnt: 1 },
    { id: 'member',  l: 'Members',       cnt: 1 },
    { id: 'mile',    l: 'Milestones',    cnt: 1 },
  ];

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', background: '#F4F1FF', color: '#16102E', fontFamily: "'Inter', system-ui" }}>
      <WebSidebar active="home" />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <WebTopBar title="Activity" subtitle="3 unread · live · across all your circles" />

        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24, padding: '24px 32px 32px', overflow: 'auto' }}>
          {/* MAIN feed */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 }}>
            {/* filter tabs */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {filters.map(f => {
                const on = f.id === tab;
                return (
                  <button key={f.id} onClick={() => setTab(f.id)} style={{
                    padding: '8px 14px', borderRadius: 999, border: 'none', cursor: 'pointer',
                    background: on ? '#16102E' : '#fff',
                    color: on ? '#FBF6EB' : '#3A2F5C',
                    fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 600, fontSize: 12.5,
                    boxShadow: on ? 'none' : '0 0 0 1px rgba(22,16,46,0.08) inset',
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                  }}>
                    {f.l}
                    <span style={{ padding: '1px 6px', borderRadius: 5, background: on ? '#D4FF3D' : '#F4F1FF', color: '#16102E', fontSize: 10, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>{f.cnt}</span>
                  </button>
                );
              })}
            </div>

            {/* feed */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {items.map(it => (
                <div key={it.id} style={{
                  padding: 14, borderRadius: 18, background: '#fff', display: 'flex', gap: 14, alignItems: 'center',
                  boxShadow: '0 0 0 1px rgba(22,16,46,0.05)',
                  position: 'relative',
                }}>
                  {it.unread && <span style={{ position: 'absolute', left: -1, top: 14, bottom: 14, width: 3, borderRadius: 2, background: '#D4FF3D' }} />}
                  {/* type icon */}
                  <div style={{ width: 44, height: 44, borderRadius: 14, background: it.c, color: it.c === '#7C5BFF' ? '#FBF6EB' : '#16102E', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 800, fontSize: 17 }}>{it.icon}</div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 14.5 }}>{it.t}</span>
                      {it.type === 'tg' && <span style={{ padding: '1px 6px', borderRadius: 5, background: '#16102E', color: '#D4FF3D', fontSize: 9, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, letterSpacing: '0.06em' }}>↗ TG</span>}
                      {it.unread && <span style={{ width: 6, height: 6, borderRadius: 3, background: '#FF7E6B' }} />}
                    </div>
                    <div style={{ fontSize: 12.5, color: '#3A2F5C', marginTop: 2, lineHeight: 1.4 }}>{it.sub}</div>
                  </div>

                  {/* who */}
                  {it.who && <Avatar m={it.who} size={28} />}

                  {/* time + actions */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                    <span className="rm-mono" style={{ fontSize: 10, color: 'rgba(22,16,46,0.5)', letterSpacing: '0.06em' }}>{it.time} ago</span>
                    {(it.type === 'rec' || it.type === 'vote') && (
                      <button style={{ padding: '4px 10px', borderRadius: 999, border: 'none', cursor: 'pointer', background: '#D4FF3D', color: '#16102E', fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 11 }}>Open →</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — preferences + summary */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ borderRadius: 20, padding: 18, background: '#16102E', color: '#FBF6EB', position: 'relative', overflow: 'hidden' }}>
              <Blob size={120} fill="#7C5BFF" style={{ position: 'absolute', right: -40, top: -40, opacity: 0.3 }} />
              <div className="rm-mono" style={{ fontSize: 10, color: '#D4FF3D', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>★ Quiet hours</div>
              <div className="rm-display" style={{ fontSize: 22, marginTop: 6, lineHeight: 1 }}>10pm → 7am</div>
              <div style={{ fontSize: 12, color: 'rgba(251,246,235,0.65)', marginTop: 8 }}>No Telegram pings during your evening reads.</div>
              <button style={{ marginTop: 12, padding: '7px 12px', borderRadius: 999, border: 'none', cursor: 'pointer', background: 'rgba(212,255,61,0.15)', color: '#D4FF3D', fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 600, fontSize: 12 }}>Edit ↗</button>
            </div>

            {/* this week summary */}
            <div style={{ borderRadius: 20, padding: 18, background: '#fff', boxShadow: '0 0 0 1px rgba(22,16,46,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span className="rm-display" style={{ fontSize: 17 }}>This week</span>
                <span className="rm-mono" style={{ fontSize: 10, color: 'rgba(22,16,46,0.45)' }}>summary</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginTop: 12 }}>
                {[
                  { l: 'Notifications', v: '34', c: '#7C5BFF' },
                  { l: 'TG events',     v: '12', c: '#D4FF3D' },
                  { l: 'New picks',     v: '4',  c: '#FF7E6B' },
                  { l: 'Milestones',    v: '2',  c: '#E8E0FF' },
                ].map((s,i) => (
                  <div key={i} style={{ padding: 12, borderRadius: 14, background: s.c, color: s.c === '#7C5BFF' ? '#FBF6EB' : '#16102E' }}>
                    <div className="rm-mono" style={{ fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.7 }}>{s.l}</div>
                    <div className="rm-display" style={{ fontSize: 26, marginTop: 2 }}>{s.v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* notif preferences */}
            <div style={{ borderRadius: 20, padding: 18, background: '#fff', boxShadow: '0 0 0 1px rgba(22,16,46,0.05)' }}>
              <div className="rm-display" style={{ fontSize: 17, marginBottom: 12 }}>What pings you</div>
              {[
                { l: 'New recommendations', v: true,  c: '#D4FF3D' },
                { l: 'Telegram activity',   v: true,  c: '#7C5BFF' },
                { l: 'New members',         v: true,  c: '#FF7E6B' },
                { l: 'Vote closing',        v: true,  c: '#E8E0FF' },
                { l: 'Compatibility shifts',v: false, c: '#16102E' },
                { l: 'Milestones',          v: false, c: '#D4FF3D' },
              ].map((p, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < 5 ? '0.5px solid rgba(22,16,46,0.06)' : 'none' }}>
                  <span style={{ width: 8, height: 8, borderRadius: 4, background: p.c }} />
                  <span style={{ flex: 1, fontSize: 12.5 }}>{p.l}</span>
                  <button style={{ width: 36, height: 22, borderRadius: 11, border: 'none', cursor: 'pointer', background: p.v ? '#16102E' : 'rgba(22,16,46,0.15)', position: 'relative' }}>
                    <span style={{ position: 'absolute', top: 2, left: p.v ? 16 : 2, width: 18, height: 18, borderRadius: 9, background: p.v ? '#D4FF3D' : '#fff', transition: 'left .15s' }} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
Object.assign(window, { ScreenWebNotifications });
