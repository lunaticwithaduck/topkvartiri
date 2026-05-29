import styled from '@emotion/styled';

type CardStyleProps = {
  $hover: boolean;
  $variant: 'media' | 'plain';
};

const Root = styled.div<CardStyleProps>`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radius.sm};
  overflow: hidden;
  transition: transform 250ms ease, box-shadow 250ms ease;
  box-shadow: ${({ $variant }) => ($variant === 'media' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none')};

  ${({ $hover }) =>
    $hover &&
    `
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 18px rgba(0,0,0,0.12);
    }
  `}
`;

const Media = styled.div<{ $aspectRatio: string }>`
  position: relative;
  width: 100%;
  aspect-ratio: ${({ $aspectRatio }) => $aspectRatio};
  overflow: hidden;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => `${theme.spacing[5]} ${theme.spacing[4]}`};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing[6]};
  }
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: ${({ theme }) => `0 ${theme.spacing[4]} ${theme.spacing[5]}`};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => `0 ${theme.spacing[6]} ${theme.spacing[6]}`};
  }
`;

const S = { Root, Media, Body, Footer };

export default S;
