import styled from '@emotion/styled';

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing[4]};
  width: 100%;
  background: ${({ theme }) => theme.colors.paper};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing[5]};
  box-shadow: 0 18px 44px rgba(14, 30, 63, 0.22);

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1.4fr auto auto;
    align-items: end;
    gap: ${({ theme }) => theme.spacing[5]};
    padding: ${({ theme }) => `${theme.spacing[5]} ${theme.spacing[6]}`};
  }
`;

const Guests = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[5]};
`;

const GuestCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const Submit = styled.div`
  display: flex;
  align-items: flex-end;

  & > * {
    width: 100%;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    & > * {
      height: 100%;
    }
  }
`;

const S = { Form, Guests, GuestCell, Submit };

export default S;
