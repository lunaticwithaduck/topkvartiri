import styled from '@emotion/styled';

const Root = styled.input<{ $invalid: boolean }>`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[3]}`};
  border: 1px solid
    ${({ theme, $invalid }) => ($invalid ? theme.colors.destructive : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radius.button};
  background: ${({ theme }) => theme.colors.paper};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fontFamily.body};
  font-size: ${({ theme }) => theme.fontSize.base};
  line-height: ${({ theme }) => theme.lineHeight.snug};
  transition: border-color 150ms ease, box-shadow 150ms ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.muted};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 3px rgba(187, 155, 105, 0.25);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const S = { Root };

export default S;
