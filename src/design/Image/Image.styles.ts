import styled from '@emotion/styled';
import NextImage from 'next/image';

// next/image is a component, so Emotion forwards every prop to it (and on to the
// underlying <img>) — including transient `$`-prefixed style props. Filter those
// out, otherwise `$fit` leaks to the DOM and trips a hydration mismatch.
const noTransient = (prop: string) => !prop.startsWith('$');

const Root = styled(NextImage, { shouldForwardProp: noTransient })<{
  $fit: 'cover' | 'contain';
}>`
  object-fit: ${({ $fit }) => $fit};
  display: block;
  max-width: 100%;
  height: auto;
`;

const Fill = styled(NextImage, { shouldForwardProp: noTransient })<{
  $fit: 'cover' | 'contain';
}>`
  object-fit: ${({ $fit }) => $fit};
`;

const S = { Root, Fill };

export default S;
