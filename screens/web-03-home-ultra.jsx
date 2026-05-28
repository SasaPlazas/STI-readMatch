// web-03 — Ultrawide Home (1920 × 1080) — adds 4th column of analytics
function ScreenWebHomeUltra() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', background: '#F4F1FF', color: '#16102E', fontFamily: "'Inter', system-ui" }}>
      <WebSidebar active="home" w={260} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <WebTopBar title="Hey, Maya ✦" subtitle="Tuesday · 8:42 · Slow Burners · 5 members in sync" />

        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1.5fr 1.05fr 1fr', gap: 20, padding: '24px 32px 32px', overflow: 'auto', background: '#F4F1FF' }}>
          {/* COL 1 — main */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}>
            {/* hero */}
            <div style={{ borderRadius: 28, padding: 24, background: 'linear-gradient(155deg, #2B1B69, #16102E 60%, #1A1042)', color: '#FBF6EB', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 50px rgba(22,16,46,0.18)' }}>
              <Blob size={220} fill="#7C5BFF" style={{ position: 'absolute', right: -60, top: -70, opacity: 0.35 }} />
              <Star size={50} fill="#FF7E6B" style={{ position: 'absolute', right: 70, top: 30, transform: 'rotate(15deg)' }} />
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <span className="rm-pill rm-pill-lime">★ This week's match</span>
                <Ring value={89} size={56} stroke={5} color="#D4FF3D" textColor="#FBF6EB" />
              </div>
              <div style={{ display: 'flex', gap: 20, marginTop: 18 }}>
                <BookCover book={BOOKS[1]} w={130} h={184} tilt={-3} sticker={<div style={{ position: 'absolute', bottom: -8, right: -8 }}><Star size={36} fill="#D4FF3D" spikes={12}/></div>} />
                <div style={{ flex: 1 }}>
                  <div className="rm-display" style={{ fontSize: 36, lineHeight: 0.95 }}>Soft<br/>Algorithms</div>
                  <div className="rm-serif-italic" style={{ fontSize: 15, color: 'rgba(251,246,235,0.7)', marginTop: 4 }}>Yuki Tanabe · 2024</div>
                  <div style={{ marginTop: 14, padding: 12, borderRadius: 12, background: 'rgba(255,255,255,0.06)' }}>
                    <div className="rm-mono" style={{ fontSize: 9, color: '#D4FF3D', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>✦ Why this matches</div>
                    <div style={{ fontSize: 12.5, lineHeight: 1.45 }}>Balances Iris' dark-academia with Theo's essays. Diversity <b style={{ color: '#D4FF3D' }}>+18%</b>.</div>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                <button style={{ flex: 1, height: 44, borderRadius: 12, border: 'none', background: '#D4FF3D', color: '#16102E', fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>I'm in →</button>
                <button style={{ flex: 1, height: 44, borderRadius: 12, border: '0.5px solid rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.06)', color: '#FBF6EB', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Alternates</button>
              </div>
            </div>

            {/* stat row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr 1fr', gap: 10 }}>
              <div style={{ borderRadius: 18, padding: 14, background: '#D4FF3D' }}>
                <div className="rm-mono" style={{ fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.7 }}>Mood</div>
                <div className="rm-display" style={{ fontSize: 19, lineHeight: 1, marginTop: 4 }}>Curious &<br/>contemplative</div>
              </div>
              <div style={{ borderRadius: 18, padding: 14, background: '#FF7E6B' }}>
                <div className="rm-mono" style={{ fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.7 }}>Pages</div>
                <div className="rm-display" style={{ fontSize: 30, lineHeight: 1, marginTop: 4 }}>1,284</div>
              </div>
              <div style={{ borderRadius: 18, padding: 14, background: '#16102E', color: '#FBF6EB' }}>
                <div className="rm-mono" style={{ fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(251,246,235,0.5)' }}>Diversity</div>
                <div className="rm-display" style={{ fontSize: 30, lineHeight: 1, marginTop: 4, color: '#D4FF3D' }}>0.78</div>
              </div>
            </div>

            {/* alternates */}
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
                <span className="rm-display" style={{ fontSize: 18 }}>Alternates · 12 picks</span>
                <a href="#" style={{ fontSize: 11.5, color: '#7C5BFF', textDecoration: 'none', fontWeight: 600 }}>See all →</a>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                {BOOKS.slice(0,3).map(b => (
                  <div key={b.id} style={{ borderRadius: 14, padding: 10, background: '#fff', boxShadow: '0 0 0 1px rgba(22,16,46,0.05)' }}>
                    <BookCover book={b} w={140} h={196} />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                      <span className="rm-mono" style={{ fontSize: 9, color: '#7C5BFF', fontWeight: 700 }}>{b.match}%</span>
                      <button style={{ width: 22, height: 22, borderRadius: '50%', border: 'none', background: '#F4F1FF', cursor: 'pointer', fontSize: 11 }}>+</button>
                    </div>
                    <div style={{ fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 12.5, marginTop: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* COL 2 — compatibility + AI mix */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}>
            {/* compatibility network */}
            <div style={{ borderRadius: 22, padding: 16, background: '#16102E', color: '#FBF6EB', minHeight: 320, position: 'relative', overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                <span className="rm-display" style={{ fontSize: 18 }}>Compatibility</span>
                <span className="rm-display" style={{ fontSize: 28, color: '#D4FF3D' }}>0.86</span>
              </div>
              <svg width="100%" height="240" viewBox="0 0 300 240">
                {[60, 95].map(r => <circle key={r} cx={150} cy={120} r={r} stroke="rgba(255,255,255,0.07)" fill="none" />)}
                {[
                  { x: 150, y: 50  }, { x: 240, y: 100 }, { x: 220, y: 180 }, { x: 80, y: 180 }, { x: 60, y: 100 },
                ].map((p, i) => (
                  <g key={i}>
                    <line x1={150} y1={120} x2={p.x} y2={p.y} stroke={MEMBERS[i].hue} strokeOpacity="0.4" strokeDasharray="3 3" />
                    <circle cx={p.x} cy={p.y} r={14} fill={MEMBERS[i].hue} stroke="#16102E" strokeWidth="2" />
                    <text x={p.x} y={p.y + 4} textAnchor="middle" fontFamily="'Bricolage Grotesque', system-ui" fontSize="11" fontWeight="700" fill="#16102E">{MEMBERS[i].initial}</text>
                  </g>
                ))}
                <circle cx={150} cy={120} r={32} fill="rgba(212,255,61,0.18)" stroke="#D4FF3D" strokeWidth="1.5" />
                <text x={150} y={117} textAnchor="middle" fontFamily="'Bricolage Grotesque', system-ui" fontSize="11" fontWeight="700" fill="#D4FF3D">4 GENRES</text>
                <text x={150} y={130} textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="8" fill="rgba(251,246,235,0.5)">OVERLAP</text>
              </svg>
            </div>

            {/* AI mix */}
            <div style={{ borderRadius: 22, padding: 16, background: '#fff', boxShadow: '0 0 0 1px rgba(22,16,46,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
                <span className="rm-display" style={{ fontSize: 17 }}>AI recommendation mix</span>
                <span className="rm-mono" style={{ fontSize: 9, color: 'rgba(22,16,46,0.45)' }}>this week</span>
              </div>
              <div style={{ height: 20, borderRadius: 5, overflow: 'hidden', display: 'flex' }}>
                <div style={{ width: '42%', background: '#7C5BFF' }} />
                <div style={{ width: '28%', background: '#FF7E6B' }} />
                <div style={{ width: '18%', background: '#D4FF3D' }} />
                <div style={{ width: '12%', background: '#16102E' }} />
              </div>
              <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  { c: '#7C5BFF', l: 'Collaborative', v: '42%' },
                  { c: '#FF7E6B', l: 'Content',       v: '28%' },
                  { c: '#D4FF3D', l: 'Fairness',      v: '18%' },
                  { c: '#16102E', l: 'Novelty',       v: '12%' },
                ].map((r,i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
                    <span style={{ width: 8, height: 8, borderRadius: 2, background: r.c }} />
                    <span style={{ flex: 1, color: '#3A2F5C' }}>{r.l}</span>
                    <span className="rm-mono" style={{ fontWeight: 700 }}>{r.v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* diversity bars */}
            <div style={{ borderRadius: 22, padding: 16, background: '#fff', boxShadow: '0 0 0 1px rgba(22,16,46,0.05)' }}>
              <div className="rm-display" style={{ fontSize: 17, marginBottom: 12 }}>Diversity balance</div>
              {[
                { l: 'Genre',   v: 0.78, c: '#D4FF3D' },
                { l: 'Setting', v: 0.62, c: '#FF7E6B' },
                { l: 'Voice',   v: 0.85, c: '#7C5BFF' },
                { l: 'Era',     v: 0.41, c: '#E8E0FF' },
              ].map((b,i) => (
                <div key={i} style={{ marginBottom: i === 3 ? 0 : 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, marginBottom: 3 }}>
                    <span>{b.l}</span>
                    <span className="rm-mono" style={{ fontWeight: 700 }}>{b.v}</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 3, background: 'rgba(22,16,46,0.06)', overflow: 'hidden' }}>
                    <div style={{ width: `${b.v*100}%`, height: '100%', background: b.c }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* COL 3 — telegram + voting + activity */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}>
            {/* live telegram */}
            <div style={{ borderRadius: 22, padding: 16, background: '#16102E', color: '#FBF6EB', position: 'relative', overflow: 'hidden' }}>
              <Blob size={120} fill="#7C5BFF" style={{ position: 'absolute', right: -40, top: -40, opacity: 0.3 }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, position: 'relative' }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: '#D4FF3D', color: '#16102E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M21 3 11 14M21 3 14.5 21l-3.5-7-7-3.5L21 3z" stroke="currentColor" strokeWidth="2"/></svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 13 }}>Telegram mirror</span>
                    <span style={{ padding: '1px 5px', borderRadius: 5, background: '#D4FF3D', color: '#16102E', fontSize: 9, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>● LIVE</span>
                  </div>
                  <div className="rm-mono" style={{ fontSize: 9, color: 'rgba(212,255,61,0.7)', marginTop: 2 }}>@rm_slow · 0.4s</div>
                </div>
              </div>
              <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6, position: 'relative' }}>
                {[
                  { m: MEMBERS[2], txt: 'voted ★ "Soft Algorithms"', t: '12m' },
                  { m: MEMBERS[1], txt: 'finished "Quiet Bureau"', t: '1h' },
                  { m: MEMBERS[3], txt: 'highlighted p. 84', t: '3h' },
                  { m: MEMBERS[4], txt: 'joined via TG invite', t: '5h' },
                ].map((e, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <Avatar m={e.m} size={20} />
                    <div style={{ flex: 1, fontSize: 11, lineHeight: 1.3, color: 'rgba(251,246,235,0.88)' }}>
                      <b>{e.m.name}</b> {e.txt}
                    </div>
                    <span className="rm-mono" style={{ fontSize: 9, color: 'rgba(251,246,235,0.4)' }}>{e.t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* members */}
            <div style={{ borderRadius: 22, padding: 16, background: '#fff', boxShadow: '0 0 0 1px rgba(22,16,46,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <span className="rm-display" style={{ fontSize: 17 }}>Members</span>
                <span className="rm-pill rm-pill-purple" style={{ fontSize: 9 }}>5 · synced</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {MEMBERS.map((m, i) => (
                  <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Avatar m={m} size={24} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 600 }}>{m.name}</div>
                      <div style={{ height: 3, borderRadius: 1.5, background: 'rgba(22,16,46,0.05)', marginTop: 2, overflow: 'hidden' }}>
                        <div style={{ width: `${[92,88,95,76,81][i]}%`, height: '100%', background: m.hue }} />
                      </div>
                    </div>
                    <span className="rm-mono" style={{ fontSize: 10, fontWeight: 700, width: 24, textAlign: 'right' }}>{[92,88,95,76,81][i]}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* live vote */}
            <div style={{ borderRadius: 22, padding: 16, background: '#FF7E6B' }}>
              <div className="rm-mono" style={{ fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.7 }}>Live vote</div>
              <div className="rm-display" style={{ fontSize: 16, marginTop: 4 }}>3 of 5 voted</div>
              <div style={{ marginTop: 10, padding: 10, borderRadius: 10, background: '#16102E', color: '#FBF6EB', display: 'flex', alignItems: 'center', gap: 10 }}>
                <BookCover book={BOOKS[2]} w={36} h={50} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 12 }}>Lemon, Lemon</div>
                  <div className="rm-mono" style={{ fontSize: 9, color: 'rgba(212,255,61,0.7)' }}>81% · 1 ★ 1 ◐</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
Object.assign(window, { ScreenWebHomeUltra });
