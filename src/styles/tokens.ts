// ─── Design Tokens ────────────────────────────────────────────────────────────
export const COLORS = {
  bg:      '#07090f',
  panel:   '#0c0f1a',
  surface: '#111520',
  card:    '#161b28',
  border:  '#1c2235',
  text:    '#dde3f5',
  muted:   '#5a6480',
  dim:     '#2a3248',
  ts:      '#f97316',
  green:   '#4ade80',
  red:     '#f87171',
  yellow:  '#fbbf24',
  purple:  '#c084fc',
  blue:    '#60a5fa',
} as const;

export type ColorKey = keyof typeof COLORS;
