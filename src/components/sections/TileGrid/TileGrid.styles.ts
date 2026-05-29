import styled from '@emotion/styled';

const Root = styled.div<{ $columns: 2 | 3 | 4 }>`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing[3]};
  max-width: 90rem;
  margin-inline: auto;
  padding: ${({ theme }) => `${theme.spacing[8]} ${theme.spacing[4]}`};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(${({ $columns }) => $columns}, 1fr);
    gap: ${({ theme }) => theme.spacing[4]};
    padding: ${({ theme }) => `${theme.spacing[12]} ${theme.spacing[6]}`};
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

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 800ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  &:hover > img {
    transform: scale(1.07);
  }
`;

const Scrim = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    rgba(14, 30, 63, 0) 30%,
    rgba(14, 30, 63, 0.4) 70%,
    rgba(14, 30, 63, 0.82) 100%
  );
  transition: opacity 500ms ease;

  ${Tile}:hover & {
    opacity: 0.92;
  }
`;

const Caption = styled.div`
  position: absolute;
  inset-inline: 0;
  inset-block-end: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[5]};
  color: ${({ theme }) => theme.colors.inverse};
  transition: transform 500ms cubic-bezier(0.16, 1, 0.3, 1);

  /* Gold hairline that rises in above the caption on hover. */
  &::before {
    content: '';
    width: 32px;
    height: 2px;
    background: ${({ theme }) => theme.colors.accent};
    opacity: 0;
    transform: translateY(8px);
    transition: opacity 500ms ease, transform 500ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  ${Tile}:hover & {
    transform: translateY(-4px);
  }

  ${Tile}:hover &::before {
    opacity: 1;
    transform: translateY(0);
  }
`;

const S = { Root, Tile, Scrim, Caption };

export default S;
