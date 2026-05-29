import styled from '@emotion/styled';

const Root = styled.div`
  position: relative;
  width: 100%;
`;

const Trigger = styled.button<{ $invalid: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[2]};
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[3]}`};
  border: 1px solid
    ${({ theme, $invalid }) => ($invalid ? theme.colors.destructive : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radius.button};
  background: ${({ theme }) => theme.colors.paper};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fontFamily.body};
  font-size: ${({ theme }) => theme.fontSize.base};
  line-height: ${({ theme }) => theme.lineHeight.snug};
  text-align: left;
  cursor: pointer;
  transition: border-color 150ms ease, box-shadow 150ms ease;

  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 3px rgba(187, 155, 105, 0.25);
  }
`;

const TriggerText = styled.span<{ $placeholder: boolean }>`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${({ theme, $placeholder }) => ($placeholder ? theme.colors.muted : theme.colors.text)};
`;

const Popover = styled.div`
  position: absolute;
  top: calc(100% + ${({ theme }) => theme.spacing[2]});
  left: 0;
  z-index: ${({ theme }) => theme.zIndex.dropdown};
  background: ${({ theme }) => theme.colors.paper};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: 0 18px 40px rgba(14, 30, 63, 0.18);
  padding: ${({ theme }) => theme.spacing[3]};

  .rdp-root {
    --rdp-accent-color: ${({ theme }) => theme.colors.accent};
    --rdp-accent-background-color: rgba(187, 155, 105, 0.16);
    --rdp-today-color: ${({ theme }) => theme.colors.accent};
    --rdp-font-family: ${({ theme }) => theme.fontFamily.body};
    margin: 0;
  }

  .rdp-selected .rdp-day_button {
    color: ${({ theme }) => theme.colors.inverse};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
  }

  .rdp-range_middle .rdp-day_button {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const S = { Root, Trigger, TriggerText, Popover };

export default S;
