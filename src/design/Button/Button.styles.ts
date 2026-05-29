import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { Theme } from '@/design/theme/theme';
import type { ButtonVariant } from './Button';

const rootCss = ($variant: ButtonVariant) => (theme: Theme) =>
  css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: ${theme.spacing[3]} ${theme.spacing[6]};
    border-radius: ${theme.radius.button};
    border: 1px solid
      ${$variant === 'primary' ? theme.colors.accent : theme.colors.border};
    background: ${$variant === 'primary' ? theme.colors.accent : 'transparent'};
    color: ${$variant === 'primary' ? theme.colors.inverse : theme.colors.text};
    font-family: ${theme.fontFamily.body};
    font-size: ${theme.fontSize.sm};
    font-weight: ${theme.fontWeight.medium};
    letter-spacing: ${theme.letterSpacing.wide};
    text-decoration: none;
    cursor: pointer;
    transition: filter 150ms ease;

    &:hover {
      filter: brightness(0.95);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;

const ButtonRoot = styled.button<{ $variant: ButtonVariant }>`
  ${({ $variant, theme }) => rootCss($variant)(theme)}
`;

// Rendered with `as={Link}` (a component), so Emotion's automatic `$`-prop
// filtering for DOM tags doesn't apply — filter explicitly so `$variant`
// doesn't leak onto the <a> and cause a hydration mismatch.
const AnchorRoot = styled('a', {
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})<{ $variant: ButtonVariant }>`
  ${({ $variant, theme }) => rootCss($variant)(theme)}
`;

const S = { ButtonRoot, AnchorRoot, rootCss };

export default S;
