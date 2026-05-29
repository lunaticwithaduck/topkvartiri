import styled from '@emotion/styled';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing[5]};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Cell = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const DetailsLink = styled.span`
  align-self: flex-start;
  color: ${({ theme }) => theme.colors.accent};
  font-size: ${({ theme }) => theme.fontSize.sm};
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Media = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[4]};
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-top: ${({ theme }) => theme.spacing[2]};
`;

const S = { Grid, Cell, DetailsLink, Media, Body, PriceRow };

export default S;
