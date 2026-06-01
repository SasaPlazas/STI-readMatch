import { colors } from '../theme/tokens';

export const BOOKS = [
  {
    id: 'b1', title: 'The Glass Library', author: 'A. Marlowe',
    genre: 'Literary Fiction', year: 2023,
    gradient: [colors.coral, '#FFB199', colors.cream], ink: colors.violet,
    summary: 'A translator drifts between three cities and the books that built them.',
    complexity: 'High', pages: 312, tags: ['literary', 'memoir', 'essays'],
  },
  {
    id: 'b2', title: 'Soft Algorithms', author: 'Yuki Tanabe',
    genre: 'Sci-Fi Essays', year: 2024,
    gradient: [colors.purple, colors.violet], ink: colors.lime,
    summary: 'Eleven essays on tenderness, technology, and the polite machines we live with.',
    complexity: 'Medium', pages: 224, tags: ['sci-fi', 'essays', 'philosophy'],
  },
  {
    id: 'b3', title: 'Lemon, Lemon', author: 'Inés Cordero',
    genre: 'Romance · Slice of Life', year: 2022,
    gradient: [colors.lime, '#B5E62A', colors.violet], ink: colors.ink,
    summary: 'Two stationery clerks, one drawer of love notes, summer in Valparaíso.',
    complexity: 'Low', pages: 268, tags: ['romance', 'slice-of-life'],
  },
  {
    id: 'b4', title: 'The Quiet Bureau', author: 'M. Adekunle',
    genre: 'Mystery · Slow Burn', year: 2024,
    gradient: [colors.ink, colors.violet, colors.purple], ink: colors.cream,
    summary: 'A records clerk in Lagos quietly investigates a case nobody will admit exists.',
    complexity: 'Medium', pages: 388, tags: ['mystery', 'thriller', 'dark'],
  },
  {
    id: 'b5', title: 'Field Notes on Joy', author: 'Priya Ramaswamy',
    genre: 'Memoir', year: 2023,
    gradient: [colors.cream, colors.beige, colors.coral], ink: colors.ink,
    summary: 'A botanist learns to keep notebooks for the things she cannot name.',
    complexity: 'Low', pages: 196, tags: ['memoir', 'nature', 'essays'],
  },
  {
    id: 'b6', title: 'Permanent Weather', author: 'Léa Bonnefoy',
    genre: 'Climate · Nonfiction', year: 2024,
    gradient: [colors.lime, colors.purple], ink: colors.ink,
    summary: 'Field reports from places that no longer have seasons.',
    complexity: 'High', pages: 344, tags: ['climate', 'essays', 'nonfiction'],
  },
];

export const MEMBERS = [
  { id: 'm1', name: 'Maya', hue: colors.coral,    initial: 'M', tag: 'Explorer' },
  { id: 'm2', name: 'Theo', hue: colors.lime,     initial: 'T', tag: 'Philosopher' },
  { id: 'm3', name: 'Iris', hue: colors.purple,   initial: 'I', tag: 'Dark Academic' },
  { id: 'm4', name: 'Ravi', hue: colors.cream,    initial: 'R', tag: 'Narrative Analyst' },
  { id: 'm5', name: 'June', hue: colors.lavender, initial: 'J', tag: 'Romantic' },
];

// Preferencias de cada miembro (alimentan el algoritmo de recomendación)
export const MEMBER_PREFS = {
  m1: { tags: ['literary', 'memoir', 'essays'],       depth: 3, openness: 65 },
  m2: { tags: ['sci-fi', 'essays', 'philosophy'],     depth: 4, openness: 72 },
  m3: { tags: ['dark', 'mystery', 'literary'],        depth: 4, openness: 45 },
  m4: { tags: ['mystery', 'sci-fi', 'nonfiction'],    depth: 2, openness: 60 },
  m5: { tags: ['romance', 'memoir', 'slice-of-life'], depth: 2, openness: 70 },
};

// Grupos a los que pertenece el usuario actual
export const GROUPS = [
  {
    id: 'g1',
    name: 'Slow Burners',
    initials: 'SB',
    color: colors.purple,
    mood: 'Curious & contemplative',
    memberIds: ['m1', 'm2', 'm3', 'm4', 'm5'],
    activities: [
      { who: MEMBERS[2], action: 'voted',      target: '"Lemon, Lemon"',              icon: '♥', tone: colors.coral,  meta: '12m', screen: 'Vote' },
      { who: MEMBERS[1], action: 'finished',   target: '"The Quiet Bureau"',           icon: '✓', tone: colors.lime,   meta: '1h',  screen: 'Book' },
      { who: MEMBERS[3], action: 'highlighted',target: 'p. 84 · "small kindnesses"',  icon: '✎', tone: colors.purple, meta: '3h',  screen: 'Explain' },
    ],
    stats: { pages: 1284, diversity: '0.78', mood: 'Curious &\ncontemplative' },
  },
  {
    id: 'g2',
    name: 'Page Turners',
    initials: 'PT',
    color: colors.coral,
    mood: 'Fast & wild',
    memberIds: ['m1', 'm3', 'm5'],
    activities: [
      { who: MEMBERS[0], action: 'added',      target: '"Permanent Weather"',          icon: '+', tone: colors.lime,   meta: '30m', screen: 'Book' },
      { who: MEMBERS[4], action: 'rated',      target: '"Field Notes on Joy" ★★★★',   icon: '★', tone: colors.coral,  meta: '2h',  screen: 'Book' },
      { who: MEMBERS[2], action: 'suggested',  target: 'speed-reading session Fri.',   icon: '◎', tone: colors.purple, meta: '5h',  screen: 'Vote' },
    ],
    stats: { pages: 876, diversity: '0.61', mood: 'Fast &\nwild' },
  },
  {
    id: 'g3',
    name: 'Lit & Chill',
    initials: 'LC',
    color: colors.lime,
    mood: 'Cozy · emotional',
    memberIds: ['m1', 'm2', 'm4'],
    activities: [
      { who: MEMBERS[1], action: 'shared note', target: '"The Glass Library" ch. 7',   icon: '✎', tone: colors.purple, meta: '1d',  screen: 'Explain' },
      { who: MEMBERS[3], action: 'joined',       target: 'the group',                   icon: '◉', tone: colors.lime,   meta: '2d',  screen: 'Home' },
    ],
    stats: { pages: 412, diversity: '0.54', mood: 'Cozy &\nemotional' },
  },
];
