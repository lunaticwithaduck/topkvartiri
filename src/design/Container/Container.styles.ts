import styled from '@emotion/styled';

export type ContainerWidth = 'sm' | 'md' | 'lg' | 'xl' | 'full';

const MAX_WIDTHS: Record<ContainerWidth, string> = {
  sm: '40rem', // 640px
  md: '48rem', // 768px
  lg: '64rem', // 1024px — body copy
  xl: '80rem', // 1280px — page max
  full: '100%',
};

const Root = styled.div<{ $width: ContainerWidth }>`
  width: 100%;
  max-width: ${({ $width }) => MAX_WIDTHS[$width]};
  margin-inline: auto;
  padding-inline: ${({ theme }) => theme.spacing[4]};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-inline: ${({ theme }) => theme.spacing[8]};
  }
`;

const S = { Root };

export default S;
