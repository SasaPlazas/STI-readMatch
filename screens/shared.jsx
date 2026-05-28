// Shared components + sample data for ReadMatch screens

// ─── Book covers as gradient cards (placeholder approach, looks intentional) ───
const BOOKS = [
{ id: 'b1', title: 'The Glass Library', author: 'A. Marlowe', genre: 'Literary Fiction', year: 2023,
  bg: 'linear-gradient(155deg, #FF7E6B 0%, #FFB199 60%, #FBF6EB 100%)', ink: '#2B1B69', match: 94,
  summary: 'A translator drifts between three cities and the books that built them.', complexity: 'High', pages: 312 },
{ id: 'b2', title: 'Soft Algorithms', author: 'Yuki Tanabe', genre: 'Sci-Fi Essays', year: 2024,
  bg: 'linear-gradient(220deg, #7C5BFF 0%, #2B1B69 100%)', ink: '#D4FF3D', match: 89,
  summary: 'Eleven essays on tenderness, technology, and the polite machines we live with.', complexity: 'Medium', pages: 224 },
{ id: 'b3', title: 'Lemon, Lemon', author: 'Inés Cordero', genre: 'Romance · Slice of Life', year: 2022,
  bg: 'linear-gradient(190deg, #D4FF3D 0%, #B5E62A 70%, #2B1B69 100%)', ink: '#16102E', match: 81,
  summary: 'Two stationery clerks, one drawer of love notes, summer in Valparaíso.', complexity: 'Low', pages: 268 },
{ id: 'b4', title: 'The Quiet Bureau', author: 'M. Adekunle', genre: 'Mystery · Slow Burn', year: 2024,
  bg: 'linear-gradient(135deg, #16102E 0%, #2B1B69 50%, #7C5BFF 100%)', ink: '#FBF6EB', match: 76,
  summary: 'A records clerk in Lagos quietly investigates a case nobody will admit exists.', complexity: 'Medium', pages: 388 },
{ id: 'b5', title: 'Field Notes on Joy', author: 'Priya Ramaswamy', genre: 'Memoir', year: 2023,
  bg: 'linear-gradient(160deg, #FBF6EB 0%, #F0E6D2 50%, #FF7E6B 110%)', ink: '#16102E', match: 71,
  summary: 'A botanist learns to keep notebooks for the things she cannot name.', complexity: 'Low', pages: 196 },
{ id: 'b6', title: 'Permanent Weather', author: 'Léa Bonnefoy', genre: 'Climate · Nonfiction', year: 2024,
  bg: 'linear-gradient(200deg, #D4FF3D 0%, #7C5BFF 100%)', ink: '#16102E', match: 68,
  summary: 'Field reports from places that no longer have seasons.', complexity: 'High', pages: 344 }];


const MEMBERS = [
{ id: 'm1', name: 'Maya', hue: '#FF7E6B', initial: 'M', tag: 'Explorer' },
{ id: 'm2', name: 'Theo', hue: '#D4FF3D', initial: 'T', tag: 'Philosopher' },
{ id: 'm3', name: 'Iris', hue: '#7C5BFF', initial: 'I', tag: 'Dark Academic' },
{ id: 'm4', name: 'Ravi', hue: '#FBF6EB', initial: 'R', tag: 'Narrative Analyst' },
{ id: 'm5', name: 'June', hue: '#E8E0FF', initial: 'J', tag: 'Romantic' }];


// ─── BookCover ───
function BookCover({ book, w = 120, h = 168, tilt = 0, sticker = null }) {
  return (
    <div style={{
      width: w, height: h, borderRadius: 10, position: 'relative',
      background: book.bg, color: book.ink, overflow: 'hidden', flexShrink: 0,
      boxShadow: '0 10px 28px rgba(22,16,46,0.18), 0 1px 0 rgba(255,255,255,0.4) inset, 0 0 0 1px rgba(0,0,0,0.04)',
      transform: tilt ? `rotate(${tilt}deg)` : undefined
    }}>
      <div style={{ position: 'absolute', left: 8, top: 0, bottom: 0, width: 1, background: 'rgba(0,0,0,0.18)' }} />
      <div style={{ padding: '14px 12px 12px 16px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: w * 0.13, lineHeight: 1, letterSpacing: '-0.02em' }}>
          {book.title}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{ fontSize: w * 0.06, fontFamily: "'JetBrains Mono', monospace", textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.7 }}>{book.genre}</div>
          <div style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: w * 0.085 }}>{book.author}</div>
        </div>
      </div>
      {sticker}
    </div>);

}

// ─── Avatar (initial + bright disc, optional ring) ───
function Avatar({ m, size = 32, ring = null }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: m.hue, color: '#16102E',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, fontSize: size * 0.45,
      boxShadow: ring ? `0 0 0 2px #fff, 0 0 0 ${2 + ring}px ${m.hue}` : '0 0 0 2px #fff',
      flexShrink: 0
    }}>{m.initial}</div>);

}

// ─── Geometric sticker shapes (used as decoration only) ───
function Star({ size = 36, fill = '#FF7E6B', spikes = 8, style = {} }) {
  const pts = [];
  const cx = size / 2,cy = size / 2,outer = size / 2,inner = size / 2 * 0.45;
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = Math.PI / spikes * i - Math.PI / 2;
    pts.push(`${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`);
  }
  return <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={style}><polygon points={pts.join(' ')} fill={fill} /></svg>;
}
function Blob({ size = 64, fill = '#D4FF3D', style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={style}>
      <path d="M50 5 C70 5 95 25 92 50 C95 75 70 95 50 92 C30 95 8 75 8 50 C5 25 30 5 50 5 Z" fill={fill} />
    </svg>);

}
function Squiggle({ w = 60, h = 16, color = '#7C5BFF', style = {} }) {
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ ...style, width: "0px", height: "0px" }}>
      <path d={`M2 ${h / 2} Q ${w / 6} 1, ${w / 3} ${h / 2} T ${2 * w / 3} ${h / 2} T ${w - 2} ${h / 2}`} stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" style={{ stroke: "rgba(255, 126, 107, 0)" }} />
    </svg>);

}

// ─── ProgressRing — used for compatibility % ───
function Ring({ value = 80, size = 56, stroke = 5, color = '#D4FF3D', track = 'rgba(255,255,255,0.18)', textColor = '#fff' }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c - value / 100 * c;
  return (
    <div style={{ width: size, height: size, position: 'relative', flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} stroke={track} strokeWidth={stroke} fill="none" />
        <circle cx={size / 2} cy={size / 2} r={r} stroke={color} strokeWidth={stroke} fill="none"
        strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round" style={{ transition: 'stroke-dashoffset .6s ease' }} />
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Bricolage Grotesque', system-ui", fontWeight: 700, color: textColor, fontSize: size * 0.32,
        letterSpacing: '-0.02em'
      }}>{value}<span style={{ fontSize: size * 0.18, opacity: 0.7 }}>%</span></div>
    </div>);

}

Object.assign(window, { BOOKS, MEMBERS, BookCover, Avatar, Star, Blob, Squiggle, Ring });