import styled from '@emotion/styled';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
  background: ${({ theme }) => theme.colors.elevated};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing[6]};
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const Divider = styled.hr`
  border: 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin: ${({ theme }) => `${theme.spacing[2]} 0`};
`;

const S = { Root, Row, Divider };

export default S;
