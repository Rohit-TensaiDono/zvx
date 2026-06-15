/**
 * ZenVoraX Design Tokens — single source of truth.
 * Change brand colors here only. Components import from here.
 */

export const colors = {
  bg:       '#0B0B0C',
  bg2:      '#0D1219',
  bg3:      '#141B24',
  surface:  '#1a1a1c',
  gold:     '#F0C85A',
  goldAlt:  '#f4d373',
  red:      '#D43C2F',
  redAlt:   '#F04D3A',
  blue:     '#3BAAFF',
  cyan:     '#00D4FF',
  silver:   '#c0c0c0',
  purple:   '#a78bfa',
  green:    '#22c55e',
};

/** Build rgba string from hex + alpha */
export const rgba = (hex, a) => {
  const n = parseInt(hex.replace('#',''), 16);
  return `rgba(${(n>>16)&255},${(n>>8)&255},${n&255},${a})`;
};

/** Semantic shortcuts — use t.accent instead of colors.gold throughout */
export const t = {
  accent:       colors.gold,
  accentDim:    rgba(colors.gold, 0.09),
  accentBorder: rgba(colors.gold, 0.28),
  blueDim:      rgba(colors.blue, 0.09),
  blueBorder:   rgba(colors.blue, 0.28),
  redDim:       rgba(colors.red,  0.09),
  border:       'rgba(255,255,255,0.06)',
  borderHover:  'rgba(255,255,255,0.12)',
  muted:        '#64748B',
};
