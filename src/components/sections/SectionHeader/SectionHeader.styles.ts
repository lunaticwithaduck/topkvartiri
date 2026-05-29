import styled from '@emotion/styled';

const Root = styled.header<{ $align: 'center' | 'left' }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ $align }) => ($align === 'left' ? 'flex-start' : 'center')};
  text-align: ${({ $align }) => ($align === 'left' ? 'left' : 'center')};
  gap: ${({ theme }) => theme.spacing[3]};
  max-width: ${({ $align }) => ($align === 'left' ? '80rem' : '48rem')};
  width: 100%;
  margin-inline: auto;
  padding-inline: ${({ theme }) => theme.spacing[4]};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: ${({ theme }) => theme.spacing[4]};
    padding-inline: ${({ $align, theme }) => ($align === 'left' ? theme.spacing[8] : '0')};
  }
`;

const Ornament = styled.div`
  color: ${({ theme }) => theme.colors.accent};
`;

// Editorial index row: "01" + a gold hairline rule that runs to the column edge.
const IndexRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
  width: 100%;
  max-width: 22rem;
  color: ${({ theme }) => theme.colors.accent};

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${({ theme }) => theme.colors.accent};
    opacity: 0.4;
  }
`;

const S = { Root, Ornament, IndexRow };

export default S;
