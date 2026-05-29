import styled from '@emotion/styled';

const Root = styled.div<{ $aspectRatio: string }>`
  position: relative;
  width: 100%;
  max-width: 64rem;
  margin-inline: auto;
  padding: ${({ theme }) => `${theme.spacing[6]} ${theme.spacing[4]}`};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => `${theme.spacing[10]} ${theme.spacing[8]}`};
  }
`;

const FrameWrap = styled.div<{ $aspectRatio: string }>`
  position: relative;
  width: 100%;
  aspect-ratio: ${({ $aspectRatio }) => $aspectRatio};
  background: ${({ theme }) => theme.colors.elevated};
  border-radius: ${({ theme }) => theme.radius.sm};
  overflow: hidden;

  & > iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

const S = { Root, FrameWrap };

export default S;
