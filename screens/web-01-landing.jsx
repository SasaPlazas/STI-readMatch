// web-01 — Desktop Landing Page (1440 wide, scrolls)
function ScreenWebLanding() {
  return (
    <div style={{ width: '100%', minHeight: '100%', background: '#FBF6EB', color: '#16102E', fontFamily: "'Inter', system-ui", overflow: 'auto' }}>
      {/* TOP NAV */}
      <nav style={{ height: 72, padding: '0 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(22,16,46,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: '#16102E', color: '#D4FF3D', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 17 }}>✦</div>
          <div className="rm-display" style={{ fontSize: 24, letterSpacing: '-0.04em' }}>read<span style={{ color: '#7C5BFF' }}>match</span></div>
        </div>
        <div style={{ display: 'flex', gap: 30, alignItems: 'center' }}>
          {['Product', 'How it works', 'For groups', 'Pricing', 'Manifesto'].map(l => (
            <a key={l} href="#" style={{ textDecoration: 'none', color: '#3A2F5C', fontSize: 14, fontWeight: 500 }}>{l}</a>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <a href="#" style={{ textDecoration: 'none', color: '#16102E', fontSize: 14, fontWeight: 600 }}>Sign in</a>
          <button style={{ height: 40, padding: '0 18px', borderRadius: 999, border: 'none', cursor: 'pointer', background: '#16102E', color: '#FBF6EB', fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 13 }}>Start matching →</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position: 'relative', padding: '70px 56px 90px', overflow: 'hidden' }}>
        <Blob size={420} fill="#7C5BFF" style={{ position: 'absolute', right: -120, top: -60, opacity: 0.15 }} />
        <Star size={68} fill="#FF7E6B" style={{ position: 'absolute', left: '46%', top: 70, transform: 'rotate(12deg)' }} />
        <Star size={28} fill="#D4FF3D" spikes={4} style={{ position: 'absolute', left: '38%', top: 200, transform: 'rotate(-8deg)' }} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          {/* LEFT — copy */}
          <div>
            <span className="rm-pill" style={{ background: '#fff', color: '#16102E', fontSize: 11, boxShadow: '0 0 0 1px rgba(22,16,46,0.1) inset' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#D4FF3D' }} />
              now in early access · 2,418 readers waiting
            </span>
            <h1 className="rm-display" style={{ fontSize: 92, lineHeight: 0.93, margin: '20px 0 0', letterSpacing: '-0.04em' }}>
              Find the<br/>
              <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 400, color: '#7C5BFF' }}>perfect book</span><br/>
              together.
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.5, color: '#3A2F5C', marginTop: 22, maxWidth: 480, textWrap: 'pretty' }}>
              ReadMatch is the AI that mediates your reading group. It picks books everyone will love — and explains why. Telegram-native, group-first, fairness-aware.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 32, alignItems: 'center' }}>
              <button style={{ height: 60, padding: '0 28px', borderRadius: 999, border: 'none', cursor: 'pointer', background: '#D4FF3D', color: '#16102E', fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 17, display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 12px 30px rgba(212,255,61,0.3)' }}>
                Start matching
                <span style={{ width: 32, height: 32, borderRadius: 16, background: '#16102E', color: '#D4FF3D', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>→</span>
              </button>
              <button style={{ height: 60, padding: '0 22px', borderRadius: 999, border: 'none', cursor: 'pointer', background: 'transparent', color: '#16102E', fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 600, fontSize: 15, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 40, height: 40, borderRadius: 20, background: '#fff', boxShadow: '0 0 0 1px rgba(22,16,46,0.1) inset', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>▶</span>
                Watch demo · 1:24
              </button>
            </div>

            {/* social proof */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 36 }}>
              <div style={{ display: 'flex' }}>
                {MEMBERS.slice(0,5).map((m,i) => (
                  <div key={m.id} style={{ marginLeft: i === 0 ? 0 : -8 }}><Avatar m={m} size={36} /></div>
                ))}
              </div>
              <div>
                <div style={{ display: 'flex', gap: 4 }}>{[1,2,3,4,5].map(s => <span key={s} style={{ color: '#FF7E6B', fontSize: 14 }}>★</span>)}</div>
                <div style={{ fontSize: 12.5, color: 'rgba(22,16,46,0.6)', marginTop: 2 }}>“finally we agree on books” — <b>740 reading groups</b></div>
              </div>
            </div>
          </div>

          {/* RIGHT — floating mockup composition */}
          <div style={{ position: 'relative', height: 620 }}>
            <Blob size={320} fill="#D4FF3D" style={{ position: 'absolute', right: 20, top: 30, opacity: 0.35 }} />

            {/* layered book covers */}
            <div style={{ position: 'absolute', top: 40, left: 30, zIndex: 2 }}>
              <BookCover book={BOOKS[1]} w={150} h={210} tilt={-8} />
            </div>
            <div style={{ position: 'absolute', top: 120, right: 30, zIndex: 1 }}>
              <BookCover book={BOOKS[0]} w={160} h={224} tilt={6} />
            </div>
            <div style={{ position: 'absolute', top: 270, left: 70, zIndex: 3 }}>
              <BookCover book={BOOKS[2]} w={130} h={184} tilt={-3} />
            </div>

            {/* floating UI card 1 — match score */}
            <div style={{ position: 'absolute', top: 30, right: -10, zIndex: 4, padding: 14, borderRadius: 18, background: '#fff', boxShadow: '0 18px 40px rgba(22,16,46,0.14)', display: 'flex', alignItems: 'center', gap: 10, transform: 'rotate(4deg)' }}>
              <Ring value={89} size={48} stroke={5} color="#7C5BFF" track="rgba(22,16,46,0.08)" textColor="#16102E" />
              <div>
                <div className="rm-mono" style={{ fontSize: 9, color: 'rgba(22,16,46,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Group match</div>
                <div style={{ fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 14 }}>Soft Algorithms</div>
              </div>
            </div>

            {/* floating UI card 2 — Why */}
            <div style={{ position: 'absolute', top: 240, right: 200, zIndex: 5, width: 240, padding: 14, borderRadius: 18, background: '#16102E', color: '#FBF6EB', transform: 'rotate(-3deg)', boxShadow: '0 18px 40px rgba(22,16,46,0.22)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <span style={{ width: 18, height: 18, borderRadius: 5, background: '#D4FF3D', color: '#16102E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 11 }}>✦</span>
                <span className="rm-mono" style={{ fontSize: 9, color: '#D4FF3D', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Why this matches</span>
              </div>
              <div style={{ fontSize: 11.5, lineHeight: 1.4 }}>Iris' dark-academia + Theo's essays + group diversity <b style={{ color: '#D4FF3D' }}>+18%</b></div>
            </div>

            {/* floating UI card 3 — Telegram */}
            <div style={{ position: 'absolute', bottom: 60, left: -20, zIndex: 6, padding: 12, borderRadius: 16, background: '#D4FF3D', color: '#16102E', display: 'flex', alignItems: 'center', gap: 10, transform: 'rotate(2deg)', boxShadow: '0 18px 40px rgba(22,16,46,0.14)' }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: '#16102E', color: '#D4FF3D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M21 3 11 14M21 3 14.5 21l-3.5-7-7-3.5L21 3z" stroke="currentColor" strokeWidth="2"/></svg>
              </div>
              <div>
                <div style={{ fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 12 }}>Telegram synced</div>
                <div className="rm-mono" style={{ fontSize: 9, opacity: 0.7 }}>3 new votes · 6m ago</div>
              </div>
            </div>

            {/* floating compatibility bubble */}
            <div style={{ position: 'absolute', bottom: 30, right: 30, zIndex: 4, width: 130, height: 130, borderRadius: '50%', background: 'radial-gradient(circle at 30% 30%, #FF7E6B, #C44C3C)', color: '#FBF6EB', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 18px 40px rgba(196,76,60,0.32)' }}>
              <div className="rm-display" style={{ fontSize: 38, lineHeight: 1 }}>0.86</div>
              <div className="rm-mono" style={{ fontSize: 9, marginTop: 2, opacity: 0.8 }}>GROUP FIT</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES STRIP */}
      <section style={{ padding: '60px 56px', background: '#16102E', color: '#FBF6EB', position: 'relative', overflow: 'hidden' }}>
        <Blob size={260} fill="#7C5BFF" style={{ position: 'absolute', right: -60, top: -80, opacity: 0.3 }} />
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 40 }}>
          <div>
            <div className="rm-mono" style={{ fontSize: 11, color: '#D4FF3D', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700 }}>★ Three engines, one circle</div>
            <h2 className="rm-display" style={{ fontSize: 56, marginTop: 10, lineHeight: 0.95, letterSpacing: '-0.03em' }}>
              How <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 400, color: '#D4FF3D' }}>ReadMatch</span> thinks
            </h2>
          </div>
          <div style={{ width: 280, fontSize: 14, color: 'rgba(251,246,235,0.65)', lineHeight: 1.45 }}>
            Three recommender systems, blended live. Not one cold algorithm — a chorus.
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, position: 'relative' }}>
          {[
            { num: '01', tone: '#7C5BFF', l: 'Collaborative',  d: 'Books readers like your circle already loved — without averaging away the outliers.', stat: '8.4M' , statL: 'reader vectors' },
            { num: '02', tone: '#FF7E6B', l: 'Content-aware',  d: 'Embeddings of genre, complexity, language and theme — recombined for your group.', stat: '142k', statL: 'book embeds' },
            { num: '03', tone: '#D4FF3D', l: 'Fairness-aware', d: 'Protect minority preferences. Boost diversity. Surface what would have been averaged out.', stat: '+18%', statL: 'novelty bump' },
          ].map((f, i) => (
            <div key={i} style={{ borderRadius: 22, padding: 24, background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.1)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="rm-mono" style={{ fontSize: 10, color: 'rgba(251,246,235,0.4)', letterSpacing: '0.12em' }}>{f.num}</span>
                <span style={{ width: 12, height: 12, borderRadius: 6, background: f.tone }} />
              </div>
              <div className="rm-display" style={{ fontSize: 28, marginTop: 18 }}>{f.l}</div>
              <p style={{ fontSize: 13.5, lineHeight: 1.45, color: 'rgba(251,246,235,0.7)', marginTop: 8 }}>{f.d}</p>
              <div style={{ marginTop: 24, paddingTop: 16, borderTop: '0.5px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span className="rm-display" style={{ fontSize: 30, color: f.tone }}>{f.stat}</span>
                <span className="rm-mono" style={{ fontSize: 10, color: 'rgba(251,246,235,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{f.statL}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* QUOTE / TELEGRAM BAND */}
      <section style={{ padding: '70px 56px', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 60, alignItems: 'center' }}>
        <div>
          <span className="rm-pill rm-pill-coral">★ Telegram-native</span>
          <h2 className="rm-display" style={{ fontSize: 56, marginTop: 14, lineHeight: 0.95 }}>
            Your group is already<br/>
            <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 400, color: '#FF7E6B' }}>on Telegram.</span><br/>
            ReadMatch lives there too.
          </h2>
          <p style={{ fontSize: 16, color: '#3A2F5C', marginTop: 16, lineHeight: 1.5, maxWidth: 500 }}>
            Create a circle here — a private channel spins up automatically. Votes, recommendations, members and highlights flow both ways in real time.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 22 }}>
            {['Members ↔', 'Votes ↔', 'Recs →', 'Highlights ←', '0.4s round-trip'].map(t => (
              <span key={t} className="rm-pill" style={{ background: '#16102E', color: '#D4FF3D', fontSize: 11 }}>{t}</span>
            ))}
          </div>
        </div>
        {/* mini telegram mock */}
        <div style={{ background: '#E8E0FF', borderRadius: 28, padding: 18, position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{ width: 36, height: 36, borderRadius: 18, background: '#D4FF3D', color: '#16102E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>✦</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 14 }}>ReadMatch Bot</div>
              <div className="rm-mono" style={{ fontSize: 10, color: 'rgba(22,16,46,0.55)' }}>● online · slow burners</div>
            </div>
          </div>
          {/* recommendation chat */}
          <div style={{ background: '#fff', padding: 12, borderRadius: '14px 14px 14px 4px', maxWidth: 280, boxShadow: '0 4px 14px rgba(22,16,46,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <BookCover book={BOOKS[1]} w={48} h={68} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="rm-mono" style={{ fontSize: 9, color: '#7C5BFF', letterSpacing: '0.1em', fontWeight: 700 }}>★ THIS WEEK</div>
                <div style={{ fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 13, marginTop: 2 }}>Soft Algorithms</div>
                <div className="rm-mono" style={{ fontSize: 9.5, color: 'rgba(22,16,46,0.5)' }}>89% match</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 4, marginTop: 10 }}>
              {[
                { l: '✦ Yes', c: '#D4FF3D', n: 2 },
                { l: '◐ Maybe', c: '#7C5BFF', n: 1 },
                { l: '✕ Pass', c: '#FF7E6B', n: 0 },
              ].map((b, i) => (
                <span key={i} style={{ padding: '4px 8px', borderRadius: 999, background: b.c, color: b.c === '#7C5BFF' ? '#FBF6EB' : '#16102E', fontSize: 10, fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700 }}>
                  {b.l}{b.n > 0 && ` · ${b.n}`}
                </span>
              ))}
            </div>
          </div>
          {/* incoming user vote */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
            <div style={{ padding: '8px 12px', borderRadius: '14px 14px 4px 14px', background: '#7C5BFF', color: '#FBF6EB', fontSize: 12, maxWidth: 220 }}>
              I'm in. start it monday?
            </div>
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section style={{ padding: '60px 56px 90px' }}>
        <div style={{ borderRadius: 32, padding: '60px 50px', background: 'linear-gradient(155deg, #D4FF3D 0%, #B5E62A 100%)', color: '#16102E', position: 'relative', overflow: 'hidden' }}>
          <Star size={150} fill="#16102E" spikes={8} style={{ position: 'absolute', right: -30, top: -30, opacity: 0.06 }} />
          <Star size={80} fill="#16102E" spikes={4} style={{ position: 'absolute', left: 40, bottom: -10, opacity: 0.08, transform: 'rotate(12deg)' }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
            <div>
              <div className="rm-mono" style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700 }}>★ Free during early access</div>
              <h2 className="rm-display" style={{ fontSize: 64, marginTop: 14, lineHeight: 0.95 }}>
                Make your circle<br/>read what they'll<br/>
                <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontWeight: 400 }}>actually finish.</span>
              </h2>
            </div>
            <button style={{ height: 72, padding: '0 32px', borderRadius: 36, border: 'none', cursor: 'pointer', background: '#16102E', color: '#D4FF3D', fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 20, display: 'flex', alignItems: 'center', gap: 14 }}>
              Start matching
              <span style={{ width: 40, height: 40, borderRadius: 20, background: '#D4FF3D', color: '#16102E', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '32px 56px 50px', borderTop: '1px solid rgba(22,16,46,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="rm-mono" style={{ fontSize: 11, color: 'rgba(22,16,46,0.45)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>© 2025 ReadMatch · est. with care</div>
        <div style={{ display: 'flex', gap: 22 }}>
          {['Manifesto', 'Privacy', 'Bot setup', 'Status', 'Twitter'].map(l => (
            <a key={l} href="#" style={{ textDecoration: 'none', color: 'rgba(22,16,46,0.6)', fontSize: 12 }}>{l}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}

Object.assign(window, { ScreenWebLanding });
