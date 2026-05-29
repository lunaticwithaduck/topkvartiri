import styled from '@emotion/styled';

const Root = styled.div`
  position: relative;
`;

const WidgetWrap = styled.div`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.raised};
  width: 100%;
  max-width: 72rem;
  margin-inline: auto;
  margin-top: ${({ theme }) => theme.spacing[6]};
  padding-inline: ${({ theme }) => theme.spacing[4]};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin-top: -4.5rem;
    padding-inline: ${({ theme }) => theme.spacing[8]};
  }
`;

const S = { Root, WidgetWrap };

export default S;
