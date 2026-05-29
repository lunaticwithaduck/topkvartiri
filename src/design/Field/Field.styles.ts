import styled from '@emotion/styled';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const Req = styled.span`
  color: ${({ theme }) => theme.colors.accent};
`;

const ErrorMsg = styled.span`
  color: ${({ theme }) => theme.colors.destructive};
  font-size: ${({ theme }) => theme.fontSize.xs};
  line-height: ${({ theme }) => theme.lineHeight.snug};
`;

const Hint = styled.span`
  color: ${({ theme }) => theme.colors.muted};
  font-size: ${({ theme }) => theme.fontSize.xs};
  line-height: ${({ theme }) => theme.lineHeight.snug};
`;

const S = { Root, Req, ErrorMsg, Hint };

export default S;
