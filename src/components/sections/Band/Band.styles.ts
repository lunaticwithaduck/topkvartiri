import styled from '@emotion/styled';

const Root = styled.div<{ $bg: 'default' | 'elevated' }>`
  width: 100%;
  background: ${({ theme, $bg }) =>
    $bg === 'elevated' ? theme.colors.elevated : theme.colors.background};
`;

const S = { Root };

export default S;
