'use client';

import { css, Global, useTheme } from '@emotion/react';

export function GlobalStyles() {
  const theme = useTheme();
  return (
    <Global
      styles={css`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }
        html,
        body {
          margin: 0;
          padding: 0;
        }
        body {
          font-family: ${theme.fontFamily.body};
          font-size: ${theme.fontSize.base};
          line-height: ${theme.lineHeight.normal};
          color: ${theme.colors.text};
          background: ${theme.colors.background};
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
        }
        a {
          color: inherit;
          text-decoration: none;
        }
        img,
        svg {
          display: block;
          max-width: 100%;
        }
        button {
          font: inherit;
        }
      `}
    />
  );
}
