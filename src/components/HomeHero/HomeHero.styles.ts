import styled from '@emotion/styled';
import { motion } from 'motion/react';

const Section = styled.section`
  min-height: 80vh;
  display: grid;
  place-items: center;
  padding: ${({ theme }) => theme.space(16)} ${({ theme }) => theme.space(6)};
  text-align: center;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2rem, 6vw, 4rem);
  font-weight: 500;
  letter-spacing: -0.02em;
  margin: 0 0 ${({ theme }) => theme.space(4)};
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.muted};
  margin: 0 0 ${({ theme }) => theme.space(8)};
`;

const S = { Section, Title, Subtitle };

export default S;
