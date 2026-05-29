import styled from '@emotion/styled';
import { Parallax } from '@/design/Parallax/Parallax';

const Root = styled.section<{ $reverse: boolean }>`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing[6]};
  align-items: center;
  max-width: 90rem;
  margin-inline: auto;
  padding: ${({ theme }) => `${theme.spacing[12]} ${theme.spacing[4]}`};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: ${({ $reverse }) => ($reverse ? '5fr 7fr' : '7fr 5fr')};
    gap: ${({ theme }) => theme.spacing[16]};
    padding: ${({ theme }) => `${theme.spacing[24]} ${theme.spacing[6]}`};

    & > :first-of-type {
      order: ${({ $reverse }) => ($reverse ? 2 : 1)};
    }
    & > :last-of-type {
      order: ${({ $reverse }) => ($reverse ? 1 : 2)};
    }
  }
`;

const MediaColumn = styled.div<{ $stacked: boolean }>`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing[3]};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: ${({ $stacked }) => ($stacked ? '1fr 1fr' : '1fr')};
    gap: ${({ theme }) => theme.spacing[5]};

    /* Offset the second image for an editorial, overlapping rhythm. */
    & > :nth-of-type(2) {
      margin-block-start: ${({ $stacked }) => ($stacked ? '18%' : '0')};
    }
  }
`;

const MediaTile = styled.div<{ $aspectRatio: string }>`
  position: relative;
  width: 100%;
  aspect-ratio: ${({ $aspectRatio }) => $aspectRatio};
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.sm};

  & img {
    transition: transform 700ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  &:hover img {
    transform: scale(1.06);
  }
`;

// Overshoots the frame so the parallax drift never exposes an edge.
const ParallaxLayer = styled(Parallax)`
  position: absolute;
  inset: -9%;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const TextColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[5]};
`;

const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.accent};

  &::before {
    content: '';
    width: 36px;
    height: 1px;
    background: ${({ theme }) => theme.colors.accent};
    opacity: 0.7;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-block-start: ${({ theme }) => theme.spacing[3]};
`;

const S = { Root, MediaColumn, MediaTile, ParallaxLayer, TextColumn, Eyebrow, Actions };

export default S;
