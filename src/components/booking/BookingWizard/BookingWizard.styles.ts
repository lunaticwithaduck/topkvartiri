import styled from '@emotion/styled';

const Root = styled.div`
  width: 100%;
  max-width: 72rem;
  margin-inline: auto;
  padding: ${({ theme }) => `${theme.spacing[8]} ${theme.spacing[4]}`};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => `${theme.spacing[12]} ${theme.spacing[8]}`};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[8]};
`;

const Body = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing[8]};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr 20rem;
    align-items: start;
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[6]};
  min-width: 0;
`;

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const Aside = styled.aside`
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    position: sticky;
    top: 6rem;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
  margin-top: ${({ theme }) => theme.spacing[4]};
`;

const Spacer = styled.span``;

const S = { Root, Form, Body, Main, Heading, Aside, Actions, Spacer };

export default S;
