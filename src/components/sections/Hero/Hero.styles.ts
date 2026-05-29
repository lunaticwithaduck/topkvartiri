import styled from '@emotion/styled';

const Root = styled.section<{ $compact: boolean }>`
  position: relative;
  width: 100%;
  height: ${({ $compact }) => ($compact ? '40vh' : '70vh')};
  min-height: ${({ $compact }) => ($compact ? '240px' : '420px')};
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: ${({ $compact }) => ($compact ? '50vh' : '85vh')};
    min-height: ${({ $compact }) => ($compact ? '380px' : '600px')};
  }
`;

const Media = styled.div`
  position: absolute;
  inset: 0;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Scrim = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(14, 30, 63, 0.05) 0%, rgba(14, 30, 63, 0.35) 100%);
  pointer-events: none;
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: ${({ theme }) => `${theme.spacing[8]} ${theme.spacing[4]}`};
  color: ${({ theme }) => theme.colors.inverse};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => `${theme.spacing[16]} ${theme.spacing[8]}`};
  }
`;

const S = { Root, Media, Scrim, Content };

export default S;
