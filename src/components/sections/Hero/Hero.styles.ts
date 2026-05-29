import styled from '@emotion/styled';
import { motion } from 'motion/react';

const Root = styled.section<{ $compact: boolean }>`
  position: relative;
  display: flex;
  width: 100%;
  min-height: ${({ $compact }) => ($compact ? 'max(42vh, 300px)' : 'max(76vh, 520px)')};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: ${({ $compact }) => ($compact ? 'max(52vh, 380px)' : 'max(82vh, 600px)')};
  }
`;

// Stable, non-scaling clip layer. Lives here (not on Root) so the Ken-Burns
// zoom is contained while Content's dropdowns (the date picker) can still
// overflow the hero without being clipped.
const MediaClip = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
`;

const Media = styled(motion.div)`
  position: absolute;
  inset: 0;
  will-change: transform;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Scrim = styled.div<{ $compact: boolean }>`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: ${({ $compact }) =>
    $compact
      ? 'linear-gradient(180deg, rgba(14, 30, 63, 0.4) 0%, rgba(14, 30, 63, 0.2) 45%, rgba(14, 30, 63, 0.5) 100%)'
      : `radial-gradient(120% 75% at 50% 42%, rgba(14, 30, 63, 0.12) 0%, rgba(14, 30, 63, 0.5) 100%),
         linear-gradient(180deg, rgba(14, 30, 63, 0.35) 0%, rgba(14, 30, 63, 0.12) 40%, rgba(14, 30, 63, 0.55) 100%)`};
`;

const Content = styled(motion.div)`
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[4]};
  text-align: center;
  padding: ${({ theme }) => `${theme.spacing[12]} ${theme.spacing[4]}`};
  color: ${({ theme }) => theme.colors.inverse};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: ${({ theme }) => theme.spacing[5]};
    padding: ${({ theme }) => `${theme.spacing[16]} ${theme.spacing[8]}`};
  }
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

const S = { Root, MediaClip, Media, Scrim, Content, Eyebrow };

export default S;
