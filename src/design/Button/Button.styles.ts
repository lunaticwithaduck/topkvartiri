import styled from '@emotion/styled';
import type { ButtonVariant } from './Button';

const Root = styled.button<{ $variant: ButtonVariant }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[6]}`};
  border-radius: ${({ theme }) => theme.radius.button};
  border: 1px solid
    ${({ theme, $variant }) =>
      $variant === 'primary' ? theme.colors.accent : theme.colors.border};
  background: ${({ theme, $variant }) =>
    $variant === 'primary' ? theme.colors.accent : 'transparent'};
  color: ${({ theme, $variant }) =>
    $variant === 'primary' ? theme.colors.inverse : theme.colors.text};
  font-family: ${({ theme }) => theme.fontFamily.body};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  letter-spacing: ${({ theme }) => theme.letterSpacing.wide};
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

const S = { Root };

export default S;
