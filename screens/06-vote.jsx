// 06 — Group decision (swipe-to-vote)
function ScreenVote() {
  const [card, setCard] = React.useState(0);
  const book = BOOKS[card % BOOKS.length];
  const next = BOOKS[(card + 1) % BOOKS.length];
  const [dx, setDx] = React.useState(0);

  // simulated drag with React state
  const onDown = (e) => {
    const startX = e.clientX ?? e.touches?.[0].clientX;
    const move = (ev) => setDx((ev.clientX ?? ev.touches?.[0].clientX) - startX);
    const up = () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', up);
      setDx(d => {
        if (Math.abs(d) > 80) setCard(c => c + 1);
        return 0;
      });
    };
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerup', up);
  };

  const rot = dx * 0.05;
  const liked = dx > 30;
  const nope = dx < -30;

  return (
    <div className="rm-screen" style={{ background: '#FBF6EB' }}>
      <div className="rm-body" style={{ padding: '56px 22px 100px', overflow: 'hidden' }}>
        {/* header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span className="rm-pill rm-pill-purple">Group vote</span>
            <div className="rm-display" style={{ fontSize: 30, marginTop: 12, color: '#16102E' }}>Pick your next<br/>read together</div>
            <div className="rm-mono" style={{ fontSize: 11, color: 'rgba(22,16,46,0.5)', letterSpacing: '0.08em', marginTop: 6, textTransform: 'uppercase' }}>
              Closes Thu 9pm · 3 of 5 voted
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', marginBottom: 6 }}>
              {MEMBERS.slice(0,5).map((m, i) => (
                <div key={m.id} style={{ marginLeft: i === 0 ? 0 : -6 }}>
                  <Avatar m={m} size={24} ring={i < 3 ? 1 : null} />
                </div>
              ))}
            </div>
            <span className="rm-mono" style={{ fontSize: 9, color: 'rgba(22,16,46,0.45)', letterSpacing: '0.1em' }}>3 / 5 IN</span>
          </div>
        </div>

        {/* card stack */}
        <div style={{ position: 'relative', marginTop: 22, height: 460, display: 'flex', justifyContent: 'center' }}>
          {/* back card */}
          <div style={{ position: 'absolute', top: 14, width: 280, height: 430, borderRadius: 26, background: '#fff', boxShadow: '0 4px 14px rgba(22,16,46,0.06)', transform: 'scale(0.95)', overflow: 'hidden' }}>
            <div style={{ height: 240, background: next.bg }} />
            <div style={{ padding: 16 }}>
              <div className="rm-display" style={{ fontSize: 20, color: '#16102E' }}>{next.title}</div>
            </div>
          </div>

          {/* main card */}
          <div onPointerDown={onDown} style={{
            position: 'absolute', top: 0, width: 280, height: 460, borderRadius: 26, background: '#fff',
            boxShadow: '0 18px 48px rgba(22,16,46,0.18)', overflow: 'hidden', cursor: 'grab',
            transform: `translateX(${dx}px) rotate(${rot}deg)`,
            transition: dx === 0 ? 'transform .25s' : 'none',
            userSelect: 'none', touchAction: 'none',
          }}>
            {/* cover area */}
            <div style={{ position: 'relative', height: 260, background: book.bg, overflow: 'hidden' }}>
              <Blob size={120} fill="#7C5BFF" style={{ position: 'absolute', right: -40, top: -40, opacity: 0.3 }} />
              <Star size={32} fill="#D4FF3D" style={{ position: 'absolute', right: 18, top: 20, transform: 'rotate(20deg)' }} />

              {/* match score */}
              <div style={{ position: 'absolute', top: 16, left: 16, padding: '6px 12px', borderRadius: 999, background: '#16102E', color: '#D4FF3D', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, letterSpacing: '0.04em' }}>
                ✦ {book.match}% MATCH
              </div>

              <div style={{ position: 'absolute', left: 20, right: 20, bottom: 22, color: book.ink }}>
                <div className="rm-display" style={{ fontSize: 28, lineHeight: 0.95 }}>{book.title}</div>
                <div className="rm-serif-italic" style={{ fontSize: 16, marginTop: 6 }}>{book.author}</div>
              </div>

              {/* directional badges */}
              {liked && (
                <div style={{ position: 'absolute', top: 80, right: 24, padding: '8px 14px', borderRadius: 12, background: '#D4FF3D', color: '#16102E', fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 800, fontSize: 22, transform: 'rotate(15deg)', border: '3px solid #16102E' }}>I'M IN</div>
              )}
              {nope && (
                <div style={{ position: 'absolute', top: 80, left: 24, padding: '8px 14px', borderRadius: 12, background: '#FF7E6B', color: '#16102E', fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 800, fontSize: 22, transform: 'rotate(-15deg)', border: '3px solid #16102E' }}>PASS</div>
              )}
            </div>

            {/* body */}
            <div style={{ padding: 18 }}>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
                <span className="rm-pill rm-pill-coral" style={{ fontSize: 10 }}>{book.genre}</span>
                <span className="rm-pill" style={{ fontSize: 10, background: '#F4F1FF', color: '#16102E' }}>{book.complexity}</span>
                <span className="rm-pill" style={{ fontSize: 10, background: '#F4F1FF', color: '#16102E' }}>{book.pages}p</span>
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.45, color: '#3A2F5C', margin: 0 }}>{book.summary}</p>

              {/* live group reactions */}
              <div style={{ marginTop: 14, padding: '10px 12px', borderRadius: 14, background: '#F4F1FF', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className="rm-mono" style={{ fontSize: 9, color: 'rgba(22,16,46,0.6)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>so far</span>
                <div style={{ display: 'flex', gap: 4 }}>
                  {['✦','♡','◐'].map((g, i) => (
                    <div key={i} style={{ padding: '3px 8px', borderRadius: 999, background: '#fff', fontSize: 11, color: '#16102E', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span>{g}</span><span className="rm-mono" style={{ fontSize: 10 }}>{[2,1,1][i]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* swipe hint */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 14, alignItems: 'center' }}>
          <span className="rm-mono" style={{ fontSize: 10, color: 'rgba(22,16,46,0.45)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>← pass</span>
          <span style={{ width: 24, height: 1, background: 'rgba(22,16,46,0.15)' }} />
          <span className="rm-mono" style={{ fontSize: 10, color: 'rgba(22,16,46,0.45)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>in →</span>
        </div>

        {/* action buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 14, marginTop: 18 }}>
          {[
            { c: '#fff', t: '#16102E', s: '✕', size: 52, action: () => setCard(c => c + 1) },
            { c: '#FF7E6B', t: '#16102E', s: '☐', size: 44 },
            { c: '#16102E', t: '#D4FF3D', s: '✦', size: 64 },
            { c: '#E8E0FF', t: '#16102E', s: '♡', size: 44 },
            { c: '#D4FF3D', t: '#16102E', s: '→', size: 52, action: () => setCard(c => c + 1) },
          ].map((b, i) => (
            <button key={i} onClick={b.action} style={{
              width: b.size, height: b.size, borderRadius: b.size/2, border: 'none', cursor: 'pointer',
              background: b.c, color: b.t,
              fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: b.size * 0.32,
              boxShadow: i === 2 ? '0 12px 30px rgba(22,16,46,0.25)' : '0 4px 10px rgba(22,16,46,0.08)',
            }}>{b.s}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ScreenVote });
