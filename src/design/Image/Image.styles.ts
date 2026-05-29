import styled from '@emotion/styled';
import NextImage from 'next/image';

const Root = styled(NextImage)<{ $fit: 'cover' | 'contain' }>`
  object-fit: ${({ $fit }) => $fit};
  display: block;
  max-width: 100%;
  height: auto;
`;

const Fill = styled(NextImage)<{ $fit: 'cover' | 'contain' }>`
  object-fit: ${({ $fit }) => $fit};
`;

const S = { Root, Fill };

export default S;
