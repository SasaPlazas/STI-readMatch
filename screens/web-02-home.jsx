// web-02 — Desktop Home Dashboard (1440 × 900)
function ScreenWebHome() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', background: '#F4F1FF', color: '#16102E', fontFamily: "'Inter', system-ui" }}>
      <WebSidebar active="home" />

      {/* main column area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <WebTopBar title="Hey, Maya ✦" subtitle="Tuesday · 8:42 · Slow Burners · 5 members in sync" />

        {/* content scroll */}
        <div style={{ flex: 1, display: 'flex', gap: 24, padding: '24px 32px 32px', overflow: 'auto', background: '#F4F1FF' }}>
          {/* main column */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20, minWidth: 0 }}>
            {/* Hero recommendation — large */}
            <div style={{ borderRadius: 28, padding: 28, background: 'linear-gradient(155deg, #2B1B69 0%, #16102E 60%, #1A1042 100%)', color: '#FBF6EB', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 50px rgba(22,16,46,0.18)' }}>
              <Blob size={260} fill="#7C5BFF" style={{ position: 'absolute', right: -80, top: -90, opacity: 0.35 }} />
              <Star size={56} fill="#FF7E6B" style={{ position: 'absolute', right: 80, top: 40, transform: 'rotate(15deg)' }} />

              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative' }}>
                <div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <span className="rm-pill rm-pill-lime">★ This week's match</span>
                    <span className="rm-pill rm-pill-glass rm-mono" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase' }}>updated 2h ago</span>
                  </div>
                </div>
                <Ring value={89} size={68} stroke={6} color="#D4FF3D" textColor="#FBF6EB" />
              </div>

              <div style={{ display: 'flex', gap: 28, marginTop: 24, position: 'relative' }}>
                <BookCover book={BOOKS[1]} w={158} h={222} tilt={-3} sticker={
                  <div style={{ position: 'absolute', bottom: -10, right: -10 }}><Star size={42} fill="#D4FF3D" spikes={12} /></div>
                } />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div className="rm-display" style={{ fontSize: 48, color: '#FBF6EB', lineHeight: 0.95 }}>Soft<br/>Algorithms</div>
                  <div className="rm-serif-italic" style={{ fontSize: 18, color: 'rgba(251,246,235,0.75)', marginTop: 6 }}>Yuki Tanabe · 2024</div>

                  <div style={{ marginTop: 16, padding: 14, borderRadius: 14, background: 'rgba(255,255,255,0.08)', border: '0.5px solid rgba(255,255,255,0.14)' }}>
                    <div className="rm-mono" style={{ fontSize: 10, color: '#D4FF3D', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>✦ Why this matches</div>
                    <div style={{ fontSize: 14, lineHeight: 1.5, color: 'rgba(251,246,235,0.92)' }}>
                      Balances <b style={{ color: '#D4FF3D' }}>Iris</b>' dark-academia streak with <b style={{ color: '#FF7E6B' }}>Theo</b>'s essay habit. Diversity score <b style={{ color: '#FBF6EB' }}>+18%</b> over last pick.
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                    <button style={{ flex: 1, height: 48, borderRadius: 14, border: 'none', background: '#D4FF3D', color: '#16102E', fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>I'm in →</button>
                    <button style={{ flex: 1, height: 48, borderRadius: 14, border: '0.5px solid rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.06)', color: '#FBF6EB', fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>See alternates</button>
                    <button style={{ width: 48, height: 48, borderRadius: 14, border: '0.5px solid rgba(255,255,255,0.18)', background: 'transparent', color: '#FBF6EB', cursor: 'pointer', fontSize: 16 }}>↻</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 14 }}>
              <div style={{ borderRadius: 20, padding: 18, background: '#D4FF3D', color: '#16102E', position: 'relative', overflow: 'hidden' }}>
                <Star size={42} fill="#16102E" spikes={6} style={{ position: 'absolute', right: -6, top: -6, opacity: 0.12 }} />
                <div className="rm-mono" style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.7 }}>Group mood</div>
                <div className="rm-display" style={{ fontSize: 26, marginTop: 4, lineHeight: 1 }}>Curious &<br/>contemplative</div>
                <div style={{ marginTop: 12, display: 'flex', gap: 4 }}>
                  {['#16102E','#7C5BFF','#FF7E6B','#FBF6EB','#16102E'].map((c,i) => (
                    <div key={i} style={{ flex: 1, height: 6, borderRadius: 3, background: c }} />
                  ))}
                </div>
              </div>
              <div style={{ borderRadius: 20, padding: 18, background: '#FF7E6B', color: '#16102E' }}>
                <div className="rm-mono" style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.7 }}>Pages this week</div>
                <div className="rm-display" style={{ fontSize: 42, marginTop: 4, lineHeight: 1 }}>1,284</div>
                <div className="rm-mono" style={{ fontSize: 10, opacity: 0.7, marginTop: 8 }}>↗ +12% vs last week</div>
              </div>
              <div style={{ borderRadius: 20, padding: 18, background: '#16102E', color: '#FBF6EB' }}>
                <div className="rm-mono" style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(251,246,235,0.5)' }}>Diversity</div>
                <div className="rm-display" style={{ fontSize: 42, marginTop: 4, lineHeight: 1, color: '#D4FF3D' }}>0.78</div>
                <div className="rm-mono" style={{ fontSize: 10, color: 'rgba(251,246,235,0.55)', marginTop: 8 }}>genre · setting · voice</div>
              </div>
            </div>

            {/* Recommendation strip — alternates */}
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
                <span className="rm-display" style={{ fontSize: 22 }}>Alternates the group might love</span>
                <span className="rm-mono" style={{ fontSize: 10, color: 'rgba(22,16,46,0.45)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>AI-curated · 12</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                {BOOKS.slice(0, 4).map(b => (
                  <div key={b.id} style={{ borderRadius: 18, padding: 12, background: '#fff', boxShadow: '0 0 0 1px rgba(22,16,46,0.05)', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <BookCover book={b} w={150} h={210} />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span className="rm-mono" style={{ fontSize: 10, color: '#7C5BFF', letterSpacing: '0.04em', fontWeight: 700 }}>{b.match}% MATCH</span>
                        <button style={{ width: 22, height: 22, borderRadius: '50%', border: 'none', background: '#F4F1FF', cursor: 'pointer', fontSize: 11 }}>+</button>
                      </div>
                      <div style={{ fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 14, marginTop: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.title}</div>
                      <div className="rm-mono" style={{ fontSize: 9.5, color: 'rgba(22,16,46,0.5)', marginTop: 2, letterSpacing: '0.04em' }}>{b.genre}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI explanation analytics */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div style={{ borderRadius: 20, padding: 20, background: '#fff', boxShadow: '0 0 0 1px rgba(22,16,46,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
                  <span className="rm-display" style={{ fontSize: 18 }}>Recommendation mix</span>
                  <span className="rm-mono" style={{ fontSize: 10, color: 'rgba(22,16,46,0.45)' }}>this week</span>
                </div>
                <div style={{ height: 22, borderRadius: 6, overflow: 'hidden', display: 'flex' }}>
                  <div style={{ width: '42%', background: '#7C5BFF' }} />
                  <div style={{ width: '28%', background: '#FF7E6B' }} />
                  <div style={{ width: '18%', background: '#D4FF3D' }} />
                  <div style={{ width: '12%', background: '#16102E' }} />
                </div>
                <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[
                    { c: '#7C5BFF', l: 'Collaborative filtering', v: '42%' },
                    { c: '#FF7E6B', l: 'Content-based',          v: '28%' },
                    { c: '#D4FF3D', l: 'Fairness re-weighting',  v: '18%' },
                    { c: '#16102E', l: 'Novelty bonus',          v: '12%' },
                  ].map((r,i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 10, height: 10, borderRadius: 3, background: r.c }} />
                      <span style={{ flex: 1, fontSize: 12.5, color: '#3A2F5C' }}>{r.l}</span>
                      <span className="rm-mono" style={{ fontSize: 11, color: '#16102E', fontWeight: 700 }}>{r.v}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ borderRadius: 20, padding: 20, background: '#fff', boxShadow: '0 0 0 1px rgba(22,16,46,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span className="rm-display" style={{ fontSize: 18 }}>Compatibility trend</span>
                  <span className="rm-pill rm-pill-lime" style={{ fontSize: 10 }}>↗ +0.04</span>
                </div>
                <div className="rm-display" style={{ fontSize: 38, color: '#7C5BFF' }}>0.86</div>
                {/* sparkline */}
                <svg width="100%" height="80" viewBox="0 0 300 80" style={{ marginTop: 8 }}>
                  <defs>
                    <linearGradient id="sg" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0" stopColor="#7C5BFF" stopOpacity="0.3" />
                      <stop offset="1" stopColor="#7C5BFF" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0,60 L40,52 L80,55 L120,42 L160,38 L200,30 L240,28 L280,18 L300,14 L300,80 L0,80 Z" fill="url(#sg)" />
                  <polyline points="0,60 40,52 80,55 120,42 160,38 200,30 240,28 280,18 300,14" stroke="#7C5BFF" strokeWidth="2.5" fill="none" />
                  <circle cx="300" cy="14" r="4" fill="#D4FF3D" stroke="#16102E" strokeWidth="1.5" />
                </svg>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                  <span className="rm-mono" style={{ fontSize: 9, color: 'rgba(22,16,46,0.4)', letterSpacing: '0.06em' }}>8 WEEKS AGO</span>
                  <span className="rm-mono" style={{ fontSize: 9, color: 'rgba(22,16,46,0.4)', letterSpacing: '0.06em' }}>NOW</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT RAIL */}
          <div style={{ width: 320, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Live Telegram card */}
            <div style={{ borderRadius: 20, padding: 16, background: '#16102E', color: '#FBF6EB', position: 'relative', overflow: 'hidden' }}>
              <Blob size={120} fill="#7C5BFF" style={{ position: 'absolute', right: -40, top: -40, opacity: 0.35 }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, position: 'relative' }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: '#D4FF3D', color: '#16102E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 3 11 14M21 3 14.5 21l-3.5-7-7-3.5L21 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 14 }}>Telegram mirror</span>
                    <span style={{ padding: '1px 6px', borderRadius: 6, background: '#D4FF3D', color: '#16102E', fontSize: 9, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>● LIVE</span>
                  </div>
                  <div className="rm-mono" style={{ fontSize: 9.5, color: 'rgba(212,255,61,0.7)', marginTop: 2, letterSpacing: '0.04em' }}>@rm_slow · sync 6m</div>
                </div>
              </div>
              {/* mini chat lines */}
              <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 6, position: 'relative' }}>
                {[
                  { m: MEMBERS[2], txt: 'Voted ★ for "Soft Algorithms"', t: '12m' },
                  { m: MEMBERS[1], txt: 'finished "Quiet Bureau"', t: '1h' },
                  { m: MEMBERS[3], txt: 'highlighted p. 84 — "small kindnesses"', t: '3h' },
                ].map((e, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <Avatar m={e.m} size={22} />
                    <div style={{ flex: 1, fontSize: 11.5, lineHeight: 1.35, color: 'rgba(251,246,235,0.88)' }}>
                      <b>{e.m.name}</b> {e.txt}
                      <div className="rm-mono" style={{ fontSize: 9, color: 'rgba(251,246,235,0.4)', marginTop: 1 }}>{e.t} ago</div>
                    </div>
                  </div>
                ))}
              </div>
              <button style={{ width: '100%', marginTop: 14, height: 36, borderRadius: 10, border: 'none', cursor: 'pointer', background: 'rgba(255,255,255,0.08)', color: '#D4FF3D', fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 600, fontSize: 12 }}>Open channel ↗</button>
            </div>

            {/* Members compatibility */}
            <div style={{ borderRadius: 20, padding: 16, background: '#fff', boxShadow: '0 0 0 1px rgba(22,16,46,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <span className="rm-display" style={{ fontSize: 17 }}>Members</span>
                <span className="rm-pill rm-pill-purple" style={{ fontSize: 10 }}>5 · in sync</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {MEMBERS.map((m, i) => (
                  <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Avatar m={m} size={28} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12.5, fontWeight: 600 }}>{m.name}</div>
                      <div style={{ height: 4, borderRadius: 2, background: 'rgba(22,16,46,0.05)', marginTop: 3, overflow: 'hidden' }}>
                        <div style={{ width: `${[92,88,95,76,81][i]}%`, height: '100%', background: m.hue, borderRadius: 2 }} />
                      </div>
                    </div>
                    <span className="rm-mono" style={{ fontSize: 10.5, color: '#16102E', fontWeight: 700, width: 28, textAlign: 'right' }}>{[92,88,95,76,81][i]}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Voting panel */}
            <div style={{ borderRadius: 20, padding: 16, background: '#FF7E6B', color: '#16102E', position: 'relative', overflow: 'hidden' }}>
              <Star size={60} fill="#16102E" spikes={6} style={{ position: 'absolute', right: -12, top: -12, opacity: 0.08 }} />
              <div className="rm-mono" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.7 }}>Live vote</div>
              <div className="rm-display" style={{ fontSize: 18, marginTop: 4 }}>3 of 5 voted</div>
              <div style={{ marginTop: 10, padding: 12, borderRadius: 12, background: '#16102E', color: '#FBF6EB' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <BookCover book={BOOKS[2]} w={44} h={62} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 13 }}>Lemon, Lemon</div>
                    <div className="rm-mono" style={{ fontSize: 9, color: 'rgba(212,255,61,0.7)', marginTop: 2 }}>romance · 81% match</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 4, marginTop: 10 }}>
                  <button style={{ flex: 1, height: 32, borderRadius: 8, border: 'none', background: '#D4FF3D', color: '#16102E', fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>✦ Yes</button>
                  <button style={{ flex: 1, height: 32, borderRadius: 8, border: 'none', background: 'rgba(255,255,255,0.08)', color: '#FBF6EB', fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>Pass</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ScreenWebHome });
