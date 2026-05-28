// 03 — Home Dashboard
function ScreenHome() {
  return (
    <div className="rm-screen" style={{ background: '#FBF6EB' }}>
      <div className="rm-body" style={{ padding: '52px 0 100px' }}>
        {/* top bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 22px 18px' }}>
          <div>
            <div className="rm-mono" style={{ fontSize: 11, color: 'rgba(22,16,46,0.5)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Tuesday · 8:42
            </div>
            <div className="rm-display" style={{ fontSize: 32, color: '#16102E', marginTop: 2 }}>
              Hey, Maya <span style={{ display: 'inline-block', transform: 'rotate(8deg)' }}>✦</span>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <Avatar m={MEMBERS[0]} size={44} />
            <span style={{ position: 'absolute', top: -4, right: -4, width: 16, height: 16, borderRadius: '50%', background: '#D4FF3D', border: '2px solid #FBF6EB', fontSize: 9, fontFamily: "'JetBrains Mono', monospace", display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16102E', fontWeight: 700 }}>3</span>
          </div>
        </div>

        {/* group strip */}
        <div style={{ padding: '0 22px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="rm-mono" style={{ fontSize: 11, color: 'rgba(22,16,46,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Reading with</span>
          <div style={{ display: 'flex' }}>
            {MEMBERS.slice(0,5).map((m, i) => (
              <div key={m.id} style={{ marginLeft: i === 0 ? 0 : -8 }}><Avatar m={m} size={26} /></div>
            ))}
          </div>
          <span className="rm-pill rm-pill-ink">Slow Burners · 5</span>
        </div>

        {/* HERO group recommendation card */}
        <div style={{ padding: '0 22px' }}>
          <div style={{
            borderRadius: 28, padding: 22, position: 'relative', overflow: 'hidden',
            background: 'linear-gradient(155deg, #2B1B69 0%, #16102E 60%, #1A1042 100%)',
            color: '#FBF6EB',
            boxShadow: '0 20px 50px rgba(22,16,46,0.25)',
          }}>
            <Blob size={180} fill="#7C5BFF" style={{ position: 'absolute', right: -60, top: -50, opacity: 0.4 }} />
            <Star size={42} fill="#FF7E6B" style={{ position: 'absolute', right: 28, top: 18, transform: 'rotate(15deg)' }} />

            {/* tags row */}
            <div style={{ display: 'flex', gap: 6, position: 'relative' }}>
              <span className="rm-pill rm-pill-lime">★ This week's match</span>
              <span className="rm-pill rm-pill-glass rm-mono" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase' }}>updated 2h ago</span>
            </div>

            {/* book + ring */}
            <div style={{ display: 'flex', gap: 18, marginTop: 22, position: 'relative' }}>
              <BookCover book={BOOKS[1]} w={120} h={170} tilt={-3} sticker={
                <div style={{ position: 'absolute', bottom: -8, right: -8 }}>
                  <Star size={36} fill="#D4FF3D" spikes={12} />
                </div>
              } />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Ring value={89} size={62} stroke={6} color="#D4FF3D" textColor="#FBF6EB" />
                <div>
                  <div className="rm-display" style={{ fontSize: 26, color: '#FBF6EB', lineHeight: 0.95 }}>Soft<br/>Algorithms</div>
                  <div className="rm-serif-italic" style={{ fontSize: 15, color: 'rgba(251,246,235,0.7)', marginTop: 4 }}>Yuki Tanabe</div>
                </div>
              </div>
            </div>

            {/* AI explanation */}
            <div style={{ marginTop: 18, padding: 14, borderRadius: 16, background: 'rgba(255,255,255,0.08)', border: '0.5px solid rgba(255,255,255,0.14)', backdropFilter: 'blur(8px)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ width: 22, height: 22, borderRadius: 6, background: '#D4FF3D', color: '#16102E', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 13 }}>✦</span>
                <span className="rm-mono" style={{ fontSize: 11, color: '#D4FF3D', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Why this matches</span>
              </div>
              <div style={{ fontSize: 13.5, lineHeight: 1.45, color: 'rgba(251,246,235,0.92)' }}>
                Balances <b style={{ color: '#D4FF3D' }}>Iris</b>' dark-academia streak with <b style={{ color: '#FF7E6B' }}>Theo</b>'s essay habit — and lands inside everyone's complexity band. Diversity score <b style={{ color: '#FBF6EB' }}>+18%</b> over last pick.
              </div>
            </div>

            {/* action buttons */}
            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              <button style={{ flex: 1, height: 48, borderRadius: 24, border: 'none', background: '#D4FF3D', color: '#16102E', fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 15 }}>I'm in →</button>
              <button style={{ flex: 1, height: 48, borderRadius: 24, border: '0.5px solid rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.08)', color: '#FBF6EB', fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 600, fontSize: 14 }}>See alternates</button>
            </div>
          </div>
        </div>

        {/* Telegram channel mirror — small status card */}
        <div style={{ padding: '14px 22px 0' }}>
          <div style={{
            borderRadius: 20, padding: 14, background: '#fff',
            boxShadow: '0 0 0 1px rgba(22,16,46,0.06) inset',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: '#16102E', color: '#D4FF3D', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M21 3 11 14M21 3 14.5 21l-3.5-7-7-3.5L21 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 14, color: '#16102E' }}>Telegram mirror</span>
                <span style={{ padding: '1px 6px', borderRadius: 6, background: '#E8F8D5', color: '#3F6E12', fontSize: 9, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, letterSpacing: '0.04em' }}>● LIVE</span>
              </div>
              <div className="rm-mono" style={{ fontSize: 10, color: 'rgba(22,16,46,0.5)', marginTop: 2, letterSpacing: '0.04em' }}>
                3 new votes from channel · synced 6m ago
              </div>
            </div>
            <button style={{ padding: '7px 11px', borderRadius: 999, border: 'none', background: '#D4FF3D', color: '#16102E', fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 11, cursor: 'pointer' }}>Open ↗</button>
          </div>
        </div>

        {/* Stats strip — Spotify Wrapped feel */}
        <div style={{ padding: '20px 22px 14px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
            <span className="rm-display" style={{ fontSize: 22, color: '#16102E' }}>This week, together</span>
            <span className="rm-mono" style={{ fontSize: 10, color: 'rgba(22,16,46,0.45)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>live</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gridTemplateRows: 'repeat(2, auto)', gap: 10 }}>
            <div style={{ gridRow: '1 / span 2', borderRadius: 22, background: '#D4FF3D', color: '#16102E', padding: 18, position: 'relative', overflow: 'hidden' }}>
              <Star size={48} fill="#16102E" spikes={6} style={{ position: 'absolute', right: -8, top: -8, opacity: 0.15 }} />
              <div className="rm-mono" style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.7 }}>Group mood</div>
              <div className="rm-display" style={{ fontSize: 30, marginTop: 8, lineHeight: 1 }}>Curious &<br/>contemplative</div>
              <div style={{ marginTop: 14, display: 'flex', gap: 4 }}>
                {['#16102E','#7C5BFF','#FF7E6B','#FBF6EB','#16102E'].map((c,i) => (
                  <div key={i} style={{ flex: 1, height: 6, borderRadius: 3, background: c }} />
                ))}
              </div>
              <div className="rm-mono" style={{ fontSize: 10, marginTop: 6, opacity: 0.6, letterSpacing: '0.06em' }}>essay · short · slow · dense · prose</div>
            </div>

            <div style={{ borderRadius: 22, background: '#FF7E6B', color: '#16102E', padding: 16 }}>
              <div className="rm-mono" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.65 }}>Pages read</div>
              <div className="rm-display" style={{ fontSize: 34, marginTop: 4 }}>1,284</div>
              <div style={{ fontSize: 11, opacity: 0.7, marginTop: -2 }}>↗ 12% vs last week</div>
            </div>
            <div style={{ borderRadius: 22, background: '#16102E', color: '#FBF6EB', padding: 16 }}>
              <div className="rm-mono" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(251,246,235,0.5)' }}>Diversity</div>
              <div className="rm-display" style={{ fontSize: 34, marginTop: 4, color: '#D4FF3D' }}>0.78</div>
              <div style={{ fontSize: 11, opacity: 0.6, marginTop: -2 }}>genre · setting · voice</div>
            </div>
          </div>
        </div>

        {/* Activity feed */}
        <div style={{ padding: '8px 22px' }}>
          <div className="rm-display" style={{ fontSize: 20, color: '#16102E', marginBottom: 12 }}>Group activity</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { who: MEMBERS[2], action: 'voted', target: '"Lemon, Lemon"', icon: '♥', tone: '#FF7E6B', meta: '12m', tg: true },
              { who: MEMBERS[1], action: 'finished', target: '"The Quiet Bureau"', icon: '✓', tone: '#D4FF3D', meta: '1h' },
              { who: MEMBERS[3], action: 'highlighted', target: 'p. 84 · "small kindnesses"', icon: '✎', tone: '#7C5BFF', meta: '3h' },
            ].map((a, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderRadius: 16, background: '#fff', boxShadow: '0 0 0 1px rgba(22,16,46,0.05)' }}>
                <Avatar m={a.who} size={36} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, color: '#16102E', lineHeight: 1.3 }}>
                    <b>{a.who.name}</b> {a.action} <span style={{ color: '#3A2F5C' }}>{a.target}</span>
                  </div>
                  <div className="rm-mono" style={{ fontSize: 10, color: 'rgba(22,16,46,0.45)', letterSpacing: '0.08em', marginTop: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
                    {a.meta} ago
                    {a.tg && <span style={{ padding: '1px 5px', borderRadius: 4, background: '#16102E', color: '#D4FF3D', fontSize: 8, letterSpacing: '0.08em' }}>↗ TG</span>}
                  </div>
                </div>
                <div style={{ width: 30, height: 30, borderRadius: 9, background: a.tone, color: '#16102E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 14 }}>{a.icon}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating tab bar */}
      <div style={{ position: 'absolute', left: 16, right: 16, bottom: 18, zIndex: 5 }}>
        <div style={{
          height: 64, borderRadius: 32, background: 'rgba(22,16,46,0.92)', backdropFilter: 'blur(16px)',
          display: 'flex', alignItems: 'center', padding: '0 8px', justifyContent: 'space-around',
          boxShadow: '0 14px 38px rgba(22,16,46,0.32)',
        }}>
          {['◐','◇','✦','◉','☰'].map((g, i) => (
            <button key={i} style={{
              width: 48, height: 48, borderRadius: 24, border: 'none', cursor: 'pointer',
              background: i === 0 ? '#D4FF3D' : 'transparent',
              color: i === 0 ? '#16102E' : '#FBF6EB',
              fontSize: 20, fontFamily: "'Bricolage Grotesque', system-ui",
            }}>{g}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ScreenHome });
