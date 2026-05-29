import styled from '@emotion/styled';
import { Parallax } from '@/design/Parallax/Parallax';

const Root = styled.section`
  position: relative;
  width: 100%;
  min-height: 60vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.inverse};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: 78vh;
  }
`;

const Media = styled.div`
  position: absolute;
  inset: 0;
`;

const ParallaxLayer = styled(Parallax)`
  position: absolute;
  inset: -12%;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(120% 90% at 50% 50%, rgba(14, 30, 63, 0.55) 0%, rgba(14, 30, 63, 0.82) 100%),
    linear-gradient(180deg, rgba(14, 30, 63, 0.7) 0%, rgba(14, 30, 63, 0.55) 100%);
`;

const Inner = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 64rem;
  margin-inline: auto;
  padding: ${({ theme }) => `${theme.spacing[20]} ${theme.spacing[4]}`};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => `${theme.spacing[24]} ${theme.spacing[8]}`};
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[5]};
  text-align: center;
`;

const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};

  &::before,
  &::after {
    content: '';
    width: 32px;
    height: 1px;
    background: ${({ theme }) => theme.colors.accent};
    opacity: 0.75;
  }
`;

const Actions = styled.div`
  margin-block-start: ${({ theme }) => theme.spacing[3]};
`;

const S = { Root, Media, ParallaxLayer, Overlay, Inner, Content, Eyebrow, Actions };

export default S;
