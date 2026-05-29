import styled from '@emotion/styled';

const Root = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing[8]};
  max-width: 72rem;
  margin-inline: auto;
  padding: ${({ theme }) => `${theme.spacing[10]} ${theme.spacing[4]}`};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr 1.4fr;
    gap: ${({ theme }) => theme.spacing[16]};
    padding: ${({ theme }) => `${theme.spacing[16]} ${theme.spacing[8]}`};
  }
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[5]};
`;

const InfoList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const InfoItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const Socials = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-block-start: ${({ theme }) => theme.spacing[3]};
`;

const FormColumn = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
  background: ${({ theme }) => theme.colors.paper};
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: ${({ theme }) => `${theme.spacing[6]} ${theme.spacing[5]}`};
  border: 1px solid ${({ theme }) => theme.colors.border};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing[8]};
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
`;

const Input = styled.input`
  font: inherit;
  font-size: ${({ theme }) => theme.fontSize.base};
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[3]}`};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.ring};
    outline-offset: 1px;
  }
`;

const Textarea = styled.textarea`
  font: inherit;
  font-size: ${({ theme }) => theme.fontSize.base};
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[3]}`};
  min-height: 8rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  resize: vertical;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.ring};
    outline-offset: 1px;
  }
`;

const ConsentRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const SubmitRow = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-block-start: ${({ theme }) => theme.spacing[2]};
`;

const S = {
  Root,
  InfoColumn,
  InfoList,
  InfoItem,
  Socials,
  FormColumn,
  Field,
  Input,
  Textarea,
  ConsentRow,
  SubmitRow,
};

export default S;
