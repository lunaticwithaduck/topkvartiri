import styled from '@emotion/styled';
import type { ButtonVariant } from './Button';

const Root = styled.button<{ $variant: ButtonVariant }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.space(3)} ${theme.space(6)}`};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid
    ${({ theme, $variant }) => ($variant === 'primary' ? theme.colors.accent : theme.colors.border)};
  background: ${({ theme, $variant }) =>
    $variant === 'primary' ? theme.colors.accent : 'transparent'};
  color: ${({ theme, $variant }) => ($variant === 'primary' ? theme.colors.bg : theme.colors.fg)};
  cursor: pointer;
  font-weight: 500;
  transition: filter 150ms ease;

  &:hover {
    filter: brightness(0.95);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const S = { Root };

export default S;
