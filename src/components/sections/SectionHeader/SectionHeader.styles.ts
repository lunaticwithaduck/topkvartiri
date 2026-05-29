import styled from '@emotion/styled';

const Root = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  max-width: 48rem;
  margin-inline: auto;
  padding-inline: ${({ theme }) => theme.spacing[4]};
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: ${({ theme }) => theme.spacing[4]};
    padding-inline: 0;
  }
`;

const Ornament = styled.div`
  color: ${({ theme }) => theme.colors.accent};
`;

const S = { Root, Ornament };

export default S;
