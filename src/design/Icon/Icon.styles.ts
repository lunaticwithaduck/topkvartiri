import styled from '@emotion/styled';

const Root = styled.svg<{ $size: number; $tone: 'default' | 'inverse' | 'accent' | 'primary' }>`
  width: ${({ $size }) => `${$size}px`};
  height: ${({ $size }) => `${$size}px`};
  flex-shrink: 0;
  fill: none;
  stroke: ${({ theme, $tone }) => {
    switch ($tone) {
      case 'inverse':
        return theme.colors.inverse;
      case 'accent':
        return theme.colors.accent;
      case 'primary':
        return theme.colors.primary;
      default:
        return theme.colors.text;
    }
  }};
`;

const S = { Root };

export default S;
