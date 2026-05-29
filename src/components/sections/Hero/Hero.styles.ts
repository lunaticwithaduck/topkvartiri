import { keyframes } from '@emotion/react';
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
  /* Extra top padding clears the fixed header on mobile, where the content is tall. */
  padding: ${({ theme }) => `${theme.spacing[24]} ${theme.spacing[4]} ${theme.spacing[12]}`};
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

// Subtle film grain over the image for cinematic texture.
const Grain = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.14;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
`;

const sweep = keyframes`
  0% { background-position: 220% 0; }
  100% { background-position: -80% 0; }
`;

// Slow diagonal light sweep across the hero.
const Sweep = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  mix-blend-mode: soft-light;
  background: linear-gradient(
    105deg,
    transparent 38%,
    rgba(255, 255, 255, 0.16) 50%,
    transparent 62%
  );
  background-size: 250% 100%;
  animation: ${sweep} 14s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const S = { Root, MediaClip, Media, Scrim, Content, Eyebrow, Grain, Sweep };

export default S;
