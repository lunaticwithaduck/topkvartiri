import styled from '@emotion/styled';

const Root = styled.section<{ $reverse: boolean }>`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing[6]};
  align-items: center;
  max-width: 80rem;
  margin-inline: auto;
  padding: ${({ theme }) => `${theme.spacing[10]} ${theme.spacing[4]}`};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
    gap: ${({ theme }) => theme.spacing[12]};
    padding: ${({ theme }) => `${theme.spacing[16]} ${theme.spacing[8]}`};

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
    gap: ${({ theme }) => theme.spacing[4]};
  }
`;

const MediaTile = styled.div<{ $aspectRatio: string }>`
  position: relative;
  width: 100%;
  aspect-ratio: ${({ $aspectRatio }) => $aspectRatio};
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.sm};
`;

const TextColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const Eyebrow = styled.div`
  color: ${({ theme }) => theme.colors.accent};
`;

const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-block-start: ${({ theme }) => theme.spacing[3]};
`;

const S = { Root, MediaColumn, MediaTile, TextColumn, Eyebrow, Actions };

export default S;
