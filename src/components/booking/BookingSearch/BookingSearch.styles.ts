import styled from '@emotion/styled';

const Form = styled.form`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing[4]};
  width: 100%;
  background: rgba(255, 252, 246, 0.86);
  backdrop-filter: blur(16px) saturate(1.1);
  -webkit-backdrop-filter: blur(16px) saturate(1.1);
  border: 1px solid rgba(255, 252, 246, 0.6);
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing[5]};
  box-shadow: 0 24px 60px rgba(14, 30, 63, 0.28);

  /* Hairline gold accent along the top edge — the one bright detail. */
  &::before {
    content: '';
    position: absolute;
    inset-inline: ${({ theme }) => theme.radius.lg};
    inset-block-start: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.accent};
    opacity: 0.85;
    border-radius: ${({ theme }) => theme.radius.full};
  }

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
