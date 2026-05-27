import styled from '@emotion/styled';
import { motion } from 'motion/react';

const Section = styled.section`
  min-height: 80vh;
  display: grid;
  place-items: center;
  padding: ${({ theme }) => `${theme.spacing[16]} ${theme.spacing[6]}`};
  text-align: center;
`;

const Title = styled(motion.h1)`
  font-size: ${({ theme }) => theme.fontSize['5xl']};
  font-weight: ${({ theme }) => theme.fontWeight.light};
  letter-spacing: ${({ theme }) => theme.letterSpacing.tight};
  margin: 0 0 ${({ theme }) => theme.spacing[4]};
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.muted};
  margin: 0 0 ${({ theme }) => theme.spacing[8]};
`;

const S = { Section, Title, Subtitle };

export default S;
