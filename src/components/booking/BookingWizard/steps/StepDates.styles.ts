import styled from '@emotion/styled';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing[5]};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Guests = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[6]};
`;

const GuestCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const S = { Grid, Guests, GuestCell };

export default S;
