import styled from '@emotion/styled';

const Root = styled.div<{ $columns: 2 | 3 | 4 }>`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing[2]};
  max-width: 80rem;
  margin-inline: auto;
  padding: ${({ theme }) => `${theme.spacing[6]} ${theme.spacing[2]}`};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.spacing[3]};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(${({ $columns }) => $columns}, 1fr);
    padding: ${({ theme }) => `${theme.spacing[8]} ${theme.spacing[4]}`};
  }
`;

const Tile = styled.figure`
  position: relative;
  margin: 0;
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.sm};
  transition: transform 250ms ease;

  &:hover {
    transform: scale(1.01);
  }
`;

const S = { Root, Tile };

export default S;
