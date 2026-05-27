export const theme = {
  colors: {
    bg: '#ffffff',
    fg: '#111111',
    muted: '#666666',
    accent: '#b8862a',
    border: '#e5e5e5',
  },
  fonts: {
    body: 'var(--font-sans), system-ui, sans-serif',
  },
  radii: {
    sm: '4px',
    md: '8px',
    lg: '16px',
  },
  space: (n: number) => `${n * 4}px`,
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
} as const;

export type Theme = typeof theme;
