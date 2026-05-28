// 04 — Book detail / Recommendation card (oversized)
function ScreenBook() {
  const book = BOOKS[0]; // The Glass Library
  return (
    <div className="rm-screen" style={{ background: '#FBF6EB' }}>
      {/* Cover hero — full bleed */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 460, background: book.bg, overflow: 'hidden' }}>
        <Blob size={140} fill="#7C5BFF" style={{ position: 'absolute', top: 280, left: -40, opacity: 0.35 }} />
        <Star size={56} fill="#D4FF3D" style={{ position: 'absolute', top: 110, right: 36, transform: 'rotate(-12deg)' }} />

        {/* top chrome */}
        <div style={{ position: 'absolute', top: 56, left: 16, right: 16, display: 'flex', justifyContent: 'space-between' }}>
          {['‹','♡'].map((g, i) => (
            <button key={i} style={{
              width: 44, height: 44, borderRadius: 22, border: 'none', cursor: 'pointer',
              background: 'rgba(22,16,46,0.55)', color: '#FBF6EB', fontSize: 20, backdropFilter: 'blur(8px)',
              fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700,
            }}>{g}</button>
          ))}
        </div>

        {/* Book mock floating */}
        <div style={{ position: 'absolute', top: 110, left: '50%', transform: 'translateX(-50%) rotate(-3deg)' }}>
          <BookCover book={book} w={196} h={278} />
        </div>

        {/* sticker overlapping cover */}
        <div style={{ position: 'absolute', top: 88, right: 30, transform: 'rotate(8deg)' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#16102E', color: '#D4FF3D', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div className="rm-display" style={{ fontSize: 28, lineHeight: 0.9 }}>94<span style={{ fontSize: 14 }}>%</span></div>
            <div className="rm-mono" style={{ fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 2 }}>group match</div>
          </div>
        </div>
      </div>

      {/* content sheet */}
      <div className="rm-body" style={{ padding: 0, top: 0 }}>
        <div style={{ height: 430 }} />
        <div style={{
          position: 'relative', background: '#FBF6EB', borderRadius: '28px 28px 0 0',
          marginTop: -28, padding: '24px 22px 110px',
          boxShadow: '0 -10px 30px rgba(22,16,46,0.08)',
        }}>
          {/* drag handle */}
          <div style={{ width: 44, height: 4, borderRadius: 2, background: 'rgba(22,16,46,0.15)', margin: '0 auto 18px' }} />

          {/* title + meta */}
          <div className="rm-display" style={{ fontSize: 38, color: '#16102E', lineHeight: 0.95 }}>The Glass<br/>Library</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
            <span className="rm-serif-italic" style={{ fontSize: 17, color: '#3A2F5C' }}>by A. Marlowe</span>
            <span style={{ width: 4, height: 4, borderRadius: 2, background: 'rgba(22,16,46,0.25)' }} />
            <span className="rm-mono" style={{ fontSize: 12, color: 'rgba(22,16,46,0.55)', letterSpacing: '0.06em' }}>2023 · 312p</span>
          </div>

          {/* meta chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14 }}>
            <span className="rm-pill rm-pill-coral">Literary Fiction</span>
            <span className="rm-pill" style={{ background: '#fff', color: '#16102E', boxShadow: '0 0 0 1px rgba(22,16,46,0.12) inset' }}>Translation</span>
            <span className="rm-pill" style={{ background: '#fff', color: '#16102E', boxShadow: '0 0 0 1px rgba(22,16,46,0.12) inset' }}>Quiet</span>
            <span className="rm-pill" style={{ background: '#fff', color: '#16102E', boxShadow: '0 0 0 1px rgba(22,16,46,0.12) inset' }}>Cities</span>
          </div>

          {/* summary */}
          <p style={{ marginTop: 18, fontSize: 15, lineHeight: 1.55, color: '#3A2F5C', textWrap: 'pretty' }}>
            A translator drifts between three cities and the libraries that built them — collecting other people's marginalia like weather reports.
          </p>

          {/* "Why this matches your group" — explainable AI block */}
          <div style={{ marginTop: 22, borderRadius: 22, background: '#16102E', color: '#FBF6EB', padding: 20, position: 'relative', overflow: 'hidden' }}>
            <Blob size={120} fill="#7C5BFF" style={{ position: 'absolute', right: -40, bottom: -40, opacity: 0.4 }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, position: 'relative' }}>
              <span style={{ width: 26, height: 26, borderRadius: 8, background: '#D4FF3D', color: '#16102E', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>✦</span>
              <span className="rm-display" style={{ fontSize: 17 }}>Why this matches your group</span>
            </div>

            {/* per-member contribution bars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, position: 'relative' }}>
              {[
                { m: MEMBERS[0], v: 92, why: 'literary fiction · cities' },
                { m: MEMBERS[1], v: 88, why: 'translation · slow prose' },
                { m: MEMBERS[2], v: 95, why: 'dark academia adjacent' },
                { m: MEMBERS[3], v: 76, why: 'meta-narrative · libraries' },
                { m: MEMBERS[4], v: 81, why: 'quiet emotional arc' },
              ].map(({ m, v, why }) => (
                <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Avatar m={m} size={28} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>{m.name}</span>
                      <span className="rm-mono" style={{ fontSize: 11, color: '#D4FF3D' }}>{v}%</span>
                    </div>
                    <div style={{ marginTop: 4, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                      <div style={{ width: `${v}%`, height: '100%', background: m.hue, borderRadius: 3 }} />
                    </div>
                    <div className="rm-mono" style={{ fontSize: 9.5, color: 'rgba(251,246,235,0.5)', marginTop: 3, letterSpacing: '0.04em' }}>{why}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* fairness flag */}
            <div style={{ marginTop: 14, padding: '10px 12px', borderRadius: 12, background: 'rgba(212,255,61,0.1)', border: '0.5px solid rgba(212,255,61,0.35)', display: 'flex', alignItems: 'center', gap: 8, position: 'relative' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#D4FF3D' }} />
              <span style={{ fontSize: 11.5, color: 'rgba(251,246,235,0.9)' }}>Fairness balanced — no member below 70% affinity.</span>
            </div>
          </div>

          {/* signals row */}
          <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {[
              { l: 'Genre overlap', v: '4/5', tone: '#D4FF3D' },
              { l: 'Complexity', v: 'High', tone: '#FF7E6B' },
              { l: 'Estimated', v: '14 days', tone: '#7C5BFF', invert: true },
            ].map((s,i) => (
              <div key={i} style={{ borderRadius: 16, padding: 12, background: s.invert ? s.tone : '#fff', color: s.invert ? '#FBF6EB' : '#16102E', boxShadow: '0 0 0 1px rgba(22,16,46,0.05)' }}>
                <div className="rm-mono" style={{ fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.6 }}>{s.l}</div>
                <div className="rm-display" style={{ fontSize: 20, marginTop: 2 }}>{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* sticky CTA */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '14px 16px 22px', background: 'linear-gradient(180deg, rgba(251,246,235,0) 0%, rgba(251,246,235,0.95) 30%)' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ width: 60, height: 60, borderRadius: 30, border: 'none', cursor: 'pointer', background: '#fff', color: '#16102E', fontSize: 22, boxShadow: '0 8px 24px rgba(22,16,46,0.08), 0 0 0 1px rgba(22,16,46,0.06) inset' }}>↻</button>
          <button style={{ flex: 1, height: 60, borderRadius: 30, border: 'none', cursor: 'pointer', background: '#16102E', color: '#FBF6EB', fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 17, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px 0 24px' }}>
            <span>Send to group vote</span>
            <span style={{ width: 44, height: 44, borderRadius: 22, background: '#D4FF3D', color: '#16102E', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ScreenBook });
