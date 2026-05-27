// Border-radius tokens. The reference site is sharp: 3px is the dominant
// radius (buttons, cards), with 10%/50% reserved for circular elements
// (avatars, icon chips). We use a tighter scale than majstorbg's webui to
// match this sharpness — soft, not chubby.

export const radius = {
  none: '0',
  xs: '2px',
  sm: '3px', // dominant on reference (32 uses)
  md: '4px',
  lg: '6px',
  xl: '8px',
  button: '3px', // matches reference button radius
  full: '9999px',
} as const;

export type RadiusToken = keyof typeof radius;
