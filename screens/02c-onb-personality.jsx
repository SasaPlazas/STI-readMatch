// 02c — Onboarding 3: Reading Personality (cognitive + collaborative)
function ScreenOnb3() {
  const [depth, setDepth] = React.useState(2);
  const [openness, setOpenness] = React.useState(72);
  const [values, setValues] = React.useState(new Set(['perspectives', 'deep']));

  const toggle = (id) => {
    const s = new Set(values);s.has(id) ? s.delete(id) : s.add(id);setValues(s);
  };

  const experiences = [
  { id: 0, l: 'Light & fast', sub: 'page-turners, beachable', c: '#D4FF3D' },
  { id: 1, l: 'Balanced & immersive', sub: 'absorbed but moving', c: '#FF7E6B' },
  { id: 2, l: 'Deep & philosophical', sub: 'underline, re-read, sit', c: '#7C5BFF' },
  { id: 3, l: 'Experimental', sub: 'fragments, forms, friction', c: '#16102E', dark: true }];


  const valueOpts = [
  { id: 'harmony', l: 'Group harmony', c: '#D4FF3D' },
  { id: 'perspectives', l: 'New perspectives', c: '#7C5BFF' },
  { id: 'deep', l: 'Deep discussions', c: '#FF7E6B' },
  { id: 'emo', l: 'Emotional connection', c: '#E8E0FF' },
  { id: 'quality', l: 'Literary quality', c: '#16102E', dark: true },
  { id: 'fast', l: 'Fast & fun', c: '#FBF6EB', outline: true }];


  return (
    <div className="rm-screen" style={{ background: '#FBF6EB' }}>
      <div className="rm-body" style={{ padding: '54px 22px 110px' }}>
        {/* progress */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {[1, 2, 3, 4].map((i) =>
            <span key={i} style={{ width: 32, height: 4, borderRadius: 2, background: i <= 3 ? '#16102E' : 'rgba(22,16,46,0.15)' }} />
            )}
          </div>
          <span className="rm-mono" style={{ fontSize: 11, color: 'rgba(22,16,46,0.5)', letterSpacing: '0.1em' }}>03 / 04</span>
        </div>

        <div className="rm-mono" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, padding: '4px 8px', borderRadius: 6, display: 'inline-block', background: "rgba(22, 16, 46, 0)", color: "rgb(124, 91, 255)" }}>★ Chapter three</div>
        <div className="rm-display" style={{ fontSize: 40, color: '#16102E', lineHeight: 0.95, marginTop: 8 }}>
          Reading<br />
          <span style={{ fontStyle: 'italic', WebkitTextStroke: '1.5px #16102E', letterSpacing: "-1px", borderColor: "rgba(243, 0, 0, 0)", borderStyle: "none", color: "rgb(0, 0, 0)", fontWeight: "400", fontFamily: "\"Instrument Serif\"" }}>personality</span>
        </div>

        {/* Q1 — depth scale (visual metaphor) */}
        <div style={{ marginTop: 24 }}>
          <div style={{ fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 19, color: '#16102E' }}>How deep do you like to go?</div>
          <div className="rm-mono" style={{ fontSize: 10, color: 'rgba(22,16,46,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 4 }}>swim · dive · drown · transform</div>

          {/* depth ladder */}
          <div style={{ marginTop: 14, position: 'relative' }}>
            {experiences.map((e, i) => {
              const on = depth === e.id;
              return (
                <button key={e.id} onClick={() => setDepth(e.id)} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '14px 14px', borderRadius: 16, border: 'none', cursor: 'pointer',
                  background: on ? e.c : '#fff',
                  color: on && e.dark ? '#FBF6EB' : '#16102E',
                  marginBottom: 7,
                  marginLeft: i * 14,
                  width: `calc(100% - ${i * 14}px)`,
                  boxShadow: on ? '0 8px 22px rgba(22,16,46,0.16), 0 0 0 2px #16102E inset' : '0 0 0 1px rgba(22,16,46,0.08) inset',
                  textAlign: 'left'
                }}>
                  <span className="rm-display" style={{ fontSize: 22, opacity: 0.65 }}>{['☼', '◐', '◓', '✦'][i]}</span>
                  <div style={{ flex: 1 }}>
                    <div className="rm-display" style={{ fontSize: 17 }}>{e.l}</div>
                    <div className="rm-mono" style={{ fontSize: 10, opacity: 0.65, letterSpacing: '0.04em', marginTop: 1 }}>{e.sub}</div>
                  </div>
                  {on && <span style={{ width: 22, height: 22, borderRadius: 11, background: '#16102E', color: e.c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>✓</span>}
                </button>);

            })}
          </div>
        </div>

        {/* Q2 — openness slider */}
        <div style={{ marginTop: 24, padding: 18, borderRadius: 22, background: '#16102E', color: '#FBF6EB', position: 'relative', overflow: 'hidden' }}>
          <Blob size={150} fill="#7C5BFF" style={{ position: 'absolute', right: -50, top: -50, opacity: 0.4 }} />
          <div style={{ position: 'relative' }}>
            <div style={{ fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 18, color: '#FBF6EB' }}>Discovery openness</div>
            <div className="rm-mono" style={{ fontSize: 10, color: 'rgba(212,255,61,0.7)', letterSpacing: '0.1em', marginTop: 4, textTransform: 'uppercase' }}>shapes diversity & fairness</div>

            {/* exploration meter */}
            <div style={{ marginTop: 20, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <div className="rm-display" style={{ fontSize: 60, color: '#D4FF3D', lineHeight: 1 }}>{openness}<span style={{ fontSize: 28 }}>%</span></div>
              <span className="rm-serif-italic" style={{ fontSize: 18, color: 'rgba(251,246,235,0.7)' }}>
                {openness < 30 ? '“I know what I like”' : openness < 60 ? '“surprise me carefully”' : openness < 85 ? '“take me somewhere new”' : '“destabilize me”'}
              </span>
            </div>

            {/* slider */}
            <div style={{ marginTop: 14, position: 'relative', height: 36 }}>
              <div style={{ position: 'absolute', left: 0, right: 0, top: 14, height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.08)' }} />
              <div style={{ position: 'absolute', left: 0, top: 14, height: 8, borderRadius: 4, background: 'linear-gradient(90deg, #7C5BFF, #D4FF3D)', width: `${openness}%` }} />
              <input type="range" min="0" max="100" value={openness} onChange={(e) => setOpenness(+e.target.value)} style={{
                position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%'
              }} />
              <div style={{ position: 'absolute', left: `calc(${openness}% - 14px)`, top: 4, width: 28, height: 28, borderRadius: 14, background: '#D4FF3D', boxShadow: '0 4px 12px rgba(0,0,0,0.3), 0 0 0 4px rgba(212,255,61,0.18)' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
              <span className="rm-mono" style={{ fontSize: 9, color: 'rgba(251,246,235,0.4)', letterSpacing: '0.08em' }}>FAMILIAR</span>
              <span className="rm-mono" style={{ fontSize: 9, color: 'rgba(251,246,235,0.4)', letterSpacing: '0.08em' }}>UNCHARTED</span>
            </div>
          </div>
        </div>

        {/* Q3 — collaborative values */}
        <div style={{ marginTop: 24 }}>
          <div style={{ fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 19, color: '#16102E' }}>Reading with others, you value…</div>
          <div className="rm-mono" style={{ fontSize: 10, color: 'rgba(22,16,46,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 4, marginBottom: 14 }}>powers group compatibility</div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {valueOpts.map((v, i) => {
              const on = values.has(v.id);
              return (
                <button key={v.id} onClick={() => toggle(v.id)} style={{
                  border: 'none', cursor: 'pointer',
                  padding: '12px 16px', borderRadius: 999,
                  background: on ? v.c : '#fff',
                  color: on && v.dark ? '#FBF6EB' : '#16102E',
                  fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: on ? 700 : 500, fontSize: 13.5,
                  boxShadow: on ?
                  '0 0 0 1.5px #16102E inset, 0 4px 12px rgba(22,16,46,0.1)' :
                  v.outline ?
                  '0 0 0 1px rgba(22,16,46,0.12) inset' :
                  '0 0 0 1px rgba(22,16,46,0.08) inset',
                  transform: on ? `rotate(${i % 2 ? -1.2 : 1}deg)` : 'none',
                  transition: 'transform .15s',
                  display: 'inline-flex', alignItems: 'center', gap: 6
                }}>
                  {v.l}
                  {on && <span style={{ width: 16, height: 16, borderRadius: 8, background: '#16102E', color: v.c === '#16102E' ? '#D4FF3D' : v.c, fontSize: 9, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>✓</span>}
                </button>);

            })}
          </div>
        </div>
      </div>

      {/* footer */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '14px 20px 26px', background: 'linear-gradient(180deg, rgba(251,246,235,0) 0%, #FBF6EB 28%)' }}>
        <button style={{
          width: '100%', height: 60, border: 'none', cursor: 'pointer',
          borderRadius: 30, background: '#16102E', color: '#FBF6EB',
          fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 17,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px 0 24px'
        }}>
          <span>Continue · Find your circle</span>
          <span style={{ width: 44, height: 44, borderRadius: 22, background: '#D4FF3D', color: '#16102E', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>→</span>
        </button>
      </div>
    </div>);

}
Object.assign(window, { ScreenOnb3 });