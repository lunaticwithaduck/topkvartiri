import styled from '@emotion/styled';

const Root = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing[5]};
  max-width: 72rem;
  margin-inline: auto;
  padding: ${({ theme }) => `${theme.spacing[8]} ${theme.spacing[4]}`};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
    gap: ${({ theme }) => theme.spacing[6]};
    padding: ${({ theme }) => `${theme.spacing[10]} ${theme.spacing[8]}`};
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.paper};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  overflow: hidden;
`;

const CardHeading = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.inverse};
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[5]}`};
  text-align: center;
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => `${theme.spacing[6]} ${theme.spacing[5]}`};
  text-align: center;
`;

const PriceRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
`;

const FeatureList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const FeatureItem = styled.li`
  display: block;
`;

const S = { Root, Card, CardHeading, CardBody, PriceRow, FeatureList, FeatureItem };

export default S;
