import styled from '@emotion/styled';

const Root = styled.button<{ $selected: boolean }>`
  display: block;
  width: 100%;
  text-align: left;
  padding: 0;
  overflow: hidden;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.paper};
  border: 2px solid ${({ theme, $selected }) => ($selected ? theme.colors.accent : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radius.lg};
  transition: border-color 150ms ease, box-shadow 150ms ease, transform 150ms ease;

  &:hover {
    box-shadow: 0 10px 26px rgba(14, 30, 63, 0.14);
  }

  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 3px rgba(187, 155, 105, 0.3);
  }
`;

const S = { Root };

export default S;
