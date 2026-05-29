import styled from '@emotion/styled';

const Root = styled.footer`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.inverse};
  padding-block: ${({ theme }) => theme.spacing[10]};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-block: ${({ theme }) => theme.spacing[16]};
  }
`;

const Inner = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing[8]};
  max-width: 80rem;
  margin-inline: auto;
  padding-inline: ${({ theme }) => theme.spacing[4]};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr 1fr;
    padding-inline: ${({ theme }) => theme.spacing[8]};
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const Brand = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing[1]};
`;

const InfoList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const InfoItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const Socials = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-block-start: ${({ theme }) => theme.spacing[2]};
`;

const PolicyLink = styled.a`
  color: ${({ theme }) => theme.colors.inverse};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const S = { Root, Inner, Column, Brand, InfoList, InfoItem, Socials, PolicyLink };

export default S;
