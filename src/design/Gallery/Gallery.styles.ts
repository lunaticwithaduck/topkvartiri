import styled from '@emotion/styled';
import { motion } from 'motion/react';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing[3]};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
    gap: ${({ theme }) => theme.spacing[4]};
  }
`;

const Thumb = styled.button`
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  padding: 0;
  border: 0;
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.elevated};

  & > img {
    transition: transform 300ms ease;
  }

  &:hover > img {
    transform: scale(1.05);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
`;

const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.modal};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing[8]};
  background: rgba(8, 14, 28, 0.92);
`;

const Stage = styled(motion.div)`
  position: relative;
  width: min(92vw, 1100px);
  height: min(80vh, 760px);
`;

const Ctrl = styled.button`
  position: absolute;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border: 0;
  border-radius: ${({ theme }) => theme.radius.full};
  background: rgba(255, 255, 255, 0.12);
  color: ${({ theme }) => theme.colors.inverse};
  cursor: pointer;
  transition: background 150ms ease;

  &:hover {
    background: rgba(255, 255, 255, 0.24);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
`;

const CloseBtn = styled(Ctrl)`
  top: ${({ theme }) => theme.spacing[4]};
  right: ${({ theme }) => theme.spacing[4]};
`;

const PrevBtn = styled(Ctrl)`
  left: ${({ theme }) => theme.spacing[4]};
  top: 50%;
  transform: translateY(-50%);
`;

const NextBtn = styled(Ctrl)`
  right: ${({ theme }) => theme.spacing[4]};
  top: 50%;
  transform: translateY(-50%);
`;

const Counter = styled.span`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing[5]};
  left: 50%;
  transform: translateX(-50%);
  color: ${({ theme }) => theme.colors.inverse};
  font-size: ${({ theme }) => theme.fontSize.sm};
  letter-spacing: ${({ theme }) => theme.letterSpacing.wide};
`;

const S = { Grid, Thumb, Backdrop, Stage, CloseBtn, PrevBtn, NextBtn, Counter };

export default S;
