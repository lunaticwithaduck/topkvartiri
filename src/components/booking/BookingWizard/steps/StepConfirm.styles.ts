import styled from '@emotion/styled';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing[5]};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Full = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-column: 1 / -1;
  }
`;

const S = { Grid, Full };

export default S;
