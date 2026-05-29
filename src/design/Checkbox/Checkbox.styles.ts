import styled from '@emotion/styled';

const Root = styled.label`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing[3]};
  cursor: pointer;
`;

const Box = styled.input`
  flex: 0 0 auto;
  width: 1.15rem;
  height: 1.15rem;
  margin-top: 0.15rem;
  accent-color: ${({ theme }) => theme.colors.accent};
  cursor: pointer;
`;

const LabelText = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.sm};
  line-height: ${({ theme }) => theme.lineHeight.snug};
`;

const S = { Root, Box, LabelText };

export default S;
