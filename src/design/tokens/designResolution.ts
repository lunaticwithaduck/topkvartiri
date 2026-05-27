// Anchor resolution for the useUniformScale + ScaledContent system. Mirrors
// majstorbg's webui — at viewports < md (768px) the page is rendered at this
// fixed canvas size and CSS-scaled to fit. At md and above the transform is
// disabled and the layout flows responsively.

export const designResolution = {
  width: 375,
  height: 812,
} as const;
