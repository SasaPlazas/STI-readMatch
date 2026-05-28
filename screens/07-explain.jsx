// 07 — AI Explanation widget (deep dive)
function ScreenExplain() {
  return (
    <div className="rm-screen" style={{ background: '#FBF6EB' }}>
      <div className="rm-body" style={{ padding: '60px 22px 100px' }}>
        {/* breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <button style={{ width: 36, height: 36, borderRadius: 12, border: 'none', background: '#fff', color: '#16102E', boxShadow: '0 0 0 1px rgba(22,16,46,0.08)', cursor: 'pointer', fontSize: 16 }}>‹</button>
          <span className="rm-mono" style={{ fontSize: 11, color: 'rgba(22,16,46,0.55)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Reasoning · Soft Algorithms</span>
        </div>

        {/* hero card */}
        <div style={{ borderRadius: 26, padding: 22, background: 'linear-gradient(165deg, #D4FF3D 0%, #B5E62A 100%)', color: '#16102E', position: 'relative', overflow: 'hidden' }}>
          <Star size={84} fill="#16102E" spikes={6} style={{ position: 'absolute', right: -18, top: -18, opacity: 0.08 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 24, height: 24, borderRadius: 7, background: '#16102E', color: '#D4FF3D', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14 }}>✦</span>
            <span className="rm-mono" style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>How we got here</span>
          </div>
          <div className="rm-display" style={{ fontSize: 30, marginTop: 10, lineHeight: 1 }}>
            Fantasy affinity raised<br/>group fit by <span style={{ fontStyle: 'italic', fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}>32%</span>
          </div>
          <div style={{ fontSize: 13, marginTop: 12, opacity: 0.7, textWrap: 'pretty' }}>
            Re-weighting after Iris joined the group nudged hybrid scoring toward speculative non-fiction — a soft cluster that everyone shares at least a thread of.
          </div>
        </div>

        {/* Algorithm breakdown */}
        <div style={{ marginTop: 18 }}>
          <div className="rm-display" style={{ fontSize: 22, color: '#16102E', marginBottom: 12 }}>The mix</div>
          <div style={{ borderRadius: 22, padding: 18, background: '#fff', boxShadow: '0 0 0 1px rgba(22,16,46,0.06) inset' }}>
            {/* stacked horizontal bar */}
            <div style={{ height: 26, borderRadius: 8, overflow: 'hidden', display: 'flex', boxShadow: '0 0 0 1px rgba(22,16,46,0.05)' }}>
              <div style={{ width: '42%', background: '#7C5BFF' }} />
              <div style={{ width: '28%', background: '#FF7E6B' }} />
              <div style={{ width: '18%', background: '#D4FF3D' }} />
              <div style={{ width: '12%', background: '#16102E' }} />
            </div>
            <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { c: '#7C5BFF', l: 'Collaborative filtering', v: '42%', s: 'Books readers similar to your group already love.' },
                { c: '#FF7E6B', l: 'Content-based',           v: '28%', s: 'Genre, complexity, language, and theme proximity.' },
                { c: '#D4FF3D', l: 'Fairness re-weighting',   v: '18%', s: 'Boost for under-represented preferences.' },
                { c: '#16102E', l: 'Novelty bonus',           v: '12%', s: 'Encourages reads outside the group\'s usual cluster.' },
              ].map((row, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ width: 12, height: 12, borderRadius: 4, background: row.c, marginTop: 4, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: '#16102E' }}>{row.l}</span>
                      <span className="rm-mono" style={{ fontSize: 12, color: row.c === '#D4FF3D' ? '#7C5BFF' : row.c, fontWeight: 700 }}>{row.v}</span>
                    </div>
                    <div style={{ fontSize: 12, color: 'rgba(22,16,46,0.6)', marginTop: 2, lineHeight: 1.35 }}>{row.s}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* factor cards */}
        <div className="rm-display" style={{ fontSize: 22, color: '#16102E', margin: '18px 0 12px' }}>Factors at play</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { tone: '#7C5BFF', txt: 'Iris\'s dark-academia streak pulled the group toward slow, atmospheric prose.', dir: '↑', pct: '+24%' },
            { tone: '#FF7E6B', txt: 'Theo finishing two essay collections last month raised non-fiction weight.', dir: '↑', pct: '+11%' },
            { tone: '#16102E', txt: 'Last pick scored low on novelty — we counterbalance this round.', dir: '↓', pct: '−06%', invert: true },
            { tone: '#D4FF3D', txt: 'June\'s minority romance preference protected from being averaged out.', dir: '⊕', pct: 'safeguarded' },
          ].map((c, i) => (
            <div key={i} style={{
              borderRadius: 18, padding: 14, display: 'flex', gap: 12, alignItems: 'center',
              background: c.invert ? c.tone : '#fff', color: c.invert ? '#FBF6EB' : '#16102E',
              boxShadow: c.invert ? 'none' : '0 0 0 1px rgba(22,16,46,0.06) inset',
            }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: c.invert ? 'rgba(255,255,255,0.12)' : c.tone, color: c.invert ? '#D4FF3D' : '#16102E', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 800, fontSize: 18 }}>
                {c.dir}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, lineHeight: 1.4 }}>{c.txt}</div>
                <div className="rm-mono" style={{ fontSize: 10, opacity: 0.6, marginTop: 2, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{c.pct}</div>
              </div>
            </div>
          ))}
        </div>

        {/* feedback */}
        <div style={{ marginTop: 18, padding: 16, borderRadius: 18, background: '#16102E', color: '#FBF6EB', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(212,255,61,0.18)', color: '#D4FF3D', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>?</span>
          <div style={{ flex: 1, fontSize: 12.5, color: 'rgba(251,246,235,0.85)' }}>Was this explanation useful?</div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button style={{ width: 32, height: 32, borderRadius: 10, border: 'none', background: '#D4FF3D', color: '#16102E', fontSize: 14, cursor: 'pointer' }}>↑</button>
            <button style={{ width: 32, height: 32, borderRadius: 10, border: 'none', background: 'rgba(255,255,255,0.06)', color: '#FBF6EB', fontSize: 14, cursor: 'pointer' }}>↓</button>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ScreenExplain });
