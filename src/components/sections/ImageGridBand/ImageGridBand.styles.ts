import styled from '@emotion/styled';

const Root = styled.div<{ $columns: 2 | 3 | 4 }>`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing[6]};
  max-width: 80rem;
  margin-inline: auto;
  padding: ${({ theme }) => `${theme.spacing[10]} ${theme.spacing[4]}`};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.spacing[5]};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(${({ $columns }) => $columns}, 1fr);
    gap: ${({ theme }) => theme.spacing[6]};
    padding: ${({ theme }) => `${theme.spacing[12]} ${theme.spacing[8]}`};
  }
`;

const CtaWrap = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  margin-block-start: ${({ theme }) => theme.spacing[4]};
`;

const S = { Root, CtaWrap };

export default S;
