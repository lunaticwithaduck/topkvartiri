import styled from '@emotion/styled';

// Raised stacking context so the in-hero date picker popover paints above the
// sections that follow (which sit at the default z-index).
const Root = styled.div`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.raised};
`;

const WidgetWrap = styled.div`
  width: 100%;
  max-width: 60rem;
  margin-inline: auto;
  margin-block-start: ${({ theme }) => theme.spacing[2]};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-block-start: ${({ theme }) => theme.spacing[4]};
  }
`;

const S = { Root, WidgetWrap };

export default S;
