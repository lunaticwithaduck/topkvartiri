import styled from '@emotion/styled';

const Root = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.button};
  background: ${({ theme }) => theme.colors.paper};
  padding: ${({ theme }) => theme.spacing[1]};
`;

const Btn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: 0;
  border-radius: ${({ theme }) => theme.radius.button};
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  line-height: 1;
  cursor: pointer;
  transition: background 150ms ease;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.elevated};
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
`;

const Value = styled.span`
  min-width: 1.5rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.base};
  font-variant-numeric: tabular-nums;
`;

const S = { Root, Btn, Value };

export default S;
