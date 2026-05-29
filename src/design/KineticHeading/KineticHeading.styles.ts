import styled from '@emotion/styled';
import { motion } from 'motion/react';

const Mask = styled.span`
  display: inline-block;
  overflow: hidden;
  vertical-align: bottom;
`;

const Word = styled(motion.span)`
  display: inline-block;
  will-change: transform;
`;

const S = { Mask, Word };

export default S;
