import styled from '@emotion/styled';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${({ theme }) => theme.spacing[5]};
  padding: ${({ theme }) => `${theme.spacing[12]} ${theme.spacing[4]}`};
`;

const Badge = styled.div`
  display: grid;
  place-items: center;
  width: 4rem;
  height: 4rem;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.success};
  color: ${({ theme }) => theme.colors.paper};
  font-size: ${({ theme }) => theme.fontSize['3xl']};
  line-height: 1;
`;

const Ref = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[6]}`};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.elevated};
`;

const S = { Root, Badge, Ref };

export default S;
