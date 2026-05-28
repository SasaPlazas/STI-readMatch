// 01 — Splash
function ScreenSplash() {
  return (
    <div className="rm-screen rm-noise" style={{ background: 'linear-gradient(170deg, #2B1B69 0%, #16102E 60%, #1A1042 100%)', color: '#FBF6EB' }}>
      {/* floating decorative shapes */}
      <Blob size={180} fill="#7C5BFF" style={{ position: 'absolute', top: -40, right: -60, opacity: 0.55, filter: 'blur(2px)' }} />
      <Blob size={120} fill="#D4FF3D" style={{ position: 'absolute', top: 180, left: -30, opacity: 0.85 }} />
      <Star size={68} fill="#FF7E6B" style={{ position: 'absolute', top: 110, right: 36, transform: 'rotate(18deg)' }} />
      <Star size={28} fill="#D4FF3D" spikes={4} style={{ position: 'absolute', top: 270, right: 100, transform: 'rotate(12deg)' }} />

      {/* floating book covers */}
      <div style={{ position: 'absolute', top: 140, left: 70 }}>
        <BookCover book={BOOKS[1]} w={130} h={184} tilt={-8} />
      </div>
      <div style={{ position: 'absolute', top: 220, right: 50, zIndex: 2 }}>
        <BookCover book={BOOKS[2]} w={120} h={170} tilt={9} />
      </div>
      <div style={{ position: 'absolute', top: 300, left: 60, zIndex: 3 }}>
        <BookCover book={BOOKS[0]} w={150} h={212} tilt={-4} />
      </div>


      {/* logo wordmark */}
      <div style={{ position: 'absolute', top: 600, left: 28, right: 28 }}>
        <div className="rm-display" style={{ color: '#FBF6EB', fontSize: "70px" }}>
          read<span style={{ color: '#D4FF3D', fontSize: "70px" }}>match</span>
        </div>
        <div style={{ marginTop: 14 }}>
          <span className="rm-serif-italic" style={{ fontSize: 22, color: '#FBF6EB' }}>find the perfect book — together.</span>
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", color: 'rgba(251,246,235,0.5)', letterSpacing: '0.1em', marginTop: 10, textTransform: 'uppercase', fontSize: 11, textAlign: "center" }}>
          AI · group reads · 2.4M readers
        </div>
      </div>

      {/* CTA */}
      <div style={{ position: 'absolute', left: 24, right: 24, bottom: 60 }}>
        <button style={{
          width: '100%', height: 64, borderRadius: 32, border: 'none', cursor: 'pointer',
          background: '#D4FF3D', color: '#16102E',
          fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: 20, letterSpacing: '-0.01em',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          boxShadow: '0 12px 32px rgba(212,255,61,0.35)'
        }}>
          Start matching
          <span style={{ width: 32, height: 32, borderRadius: '50%', background: '#16102E', color: '#D4FF3D', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>→</span>
        </button>
        <div style={{ textAlign: 'center', marginTop: 14, fontSize: 13, color: 'rgba(251,246,235,0.7)' }}>
          Have an account? <span style={{ color: '#D4FF3D', textDecoration: 'underline', textUnderlineOffset: 3 }}>Sign in</span>
        </div>
      </div>
    </div>);

}

Object.assign(window, { ScreenSplash });