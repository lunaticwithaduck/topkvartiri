import styled from '@emotion/styled';

const Root = styled.div<{ $columns: 2 | 3 | 4 }>`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing[3]};
  max-width: 80rem;
  margin-inline: auto;
  padding: ${({ theme }) => `${theme.spacing[8]} ${theme.spacing[4]}`};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(${({ $columns }) => $columns}, 1fr);
    gap: ${({ theme }) => theme.spacing[4]};
    padding: ${({ theme }) => `${theme.spacing[12]} ${theme.spacing[8]}`};
  }
`;

const Tile = styled.a`
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.sm};
  text-decoration: none;
  cursor: pointer;
  transition: transform 250ms ease;

  &:hover {
    transform: translateY(-2px);
  }

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 400ms ease;
  }

  &:hover > img {
    transform: scale(1.04);
  }
`;

const Scrim = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0.65) 100%);
  pointer-events: none;
`;

const Caption = styled.div`
  position: absolute;
  inset-inline: 0;
  inset-block-end: 0;
  padding: ${({ theme }) => theme.spacing[4]};
  color: ${({ theme }) => theme.colors.inverse};
`;

const S = { Root, Tile, Scrim, Caption };

export default S;
