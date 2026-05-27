// Color tokens derived from tools/output/palette/palette.json (extracted from
// topkvartiri.com) and tools/output/reference/design-data.json (reference site
// boutiqueholiday-pirin.com). See tools/FINDINGS.md for provenance.
//
// Brand: navy #0e1e3f + warm gold #bb9b69 + cream #fffcf6, with #303030 body
// text. We drop the imagery-derived #76644a (not a brand token) and treat
// black-at-60% as a named `backdrop` overlay rather than a base color.

export const colors = {
  // Surfaces
  background: '#fffcf6', // cream — primary surface (68% pixel area on topkvartiri)
  elevated: '#f5efe2', // slightly darker cream for alternating bands (derived)
  paper: '#ffffff',
  backdrop: 'rgba(0, 0, 0, 0.6)', // overlay-alpha-60 (modal scrims)

  // Text
  text: '#303030', // dark grey body (2004 CSS uses on topkvartiri)
  muted: '#6e6e6e', // mid grey secondary text (30 CSS uses)
  inverse: '#fffcf6', // light text on dark backgrounds

  // Brand
  primary: '#0e1e3f', // navy — brand primary (1868 CSS uses)
  accent: '#bb9b69', // warm gold — brand accent (433 CSS uses)
  highlight: '#e2ecff', // pale lavender — surface highlight

  // Borders / focus
  border: '#e0d6c4', // warm taupe (derived from cream + muted)
  ring: '#bb9b69', // gold focus ring

  // Status (semantic, not from reference — neutral defaults)
  destructive: '#b83122',
  success: '#16795b',
  warning: '#b68a0b',
} as const;

export type ColorToken = keyof typeof colors;
export type ColorValue = (typeof colors)[ColorToken];
