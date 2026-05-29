import styled from '@emotion/styled';

const Root = styled.ol`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Item = styled.li`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const Bar = styled.div`
  height: 3px;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.border};
  overflow: hidden;
`;

const Fill = styled.div<{ $on: boolean }>`
  height: 100%;
  background: ${({ theme }) => theme.colors.accent};
  transform: scaleX(${({ $on }) => ($on ? 1 : 0)});
  transform-origin: left;
  transition: transform 400ms ease;
`;

const S = { Root, Item, Bar, Fill };

export default S;
