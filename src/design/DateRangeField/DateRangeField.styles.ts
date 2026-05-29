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

const Popover = styled.div<{ $placement: 'top' | 'bottom' }>`
  position: absolute;
  ${({ $placement, theme }) =>
    $placement === 'top'
      ? `bottom: calc(100% + ${theme.spacing[2]}); top: auto;`
      : `top: calc(100% + ${theme.spacing[2]}); bottom: auto;`}
  left: 0;
  z-index: ${({ theme }) => theme.zIndex.dropdown};
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.paper};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: 0 24px 60px rgba(14, 30, 63, 0.22);
  padding: ${({ theme }) => theme.spacing[4]};

  .rdp-root {
    --rdp-font-family: ${({ theme }) => theme.fontFamily.body};
    --rdp-accent-color: ${({ theme }) => theme.colors.accent};
    --rdp-accent-background-color: rgba(187, 155, 105, 0.14);
    --rdp-day-width: 42px;
    --rdp-day-height: 42px;
    --rdp-day_button-width: 42px;
    --rdp-day_button-height: 42px;
    --rdp-day_button-border-radius: 9999px;
    --rdp-today-color: ${({ theme }) => theme.colors.accent};
    --rdp-range_start-color: ${({ theme }) => theme.colors.inverse};
    --rdp-range_start-background: ${({ theme }) => theme.colors.accent};
    --rdp-range_start-date-background-color: ${({ theme }) => theme.colors.accent};
    --rdp-range_end-color: ${({ theme }) => theme.colors.inverse};
    --rdp-range_end-background: ${({ theme }) => theme.colors.accent};
    --rdp-range_end-date-background-color: ${({ theme }) => theme.colors.accent};
    --rdp-range_middle-background-color: rgba(187, 155, 105, 0.16);
    --rdp-range_middle-color: ${({ theme }) => theme.colors.text};
    --rdp-disabled-opacity: 0.32;
    --rdp-outside-opacity: 0.45;
    color: ${({ theme }) => theme.colors.text};
    margin: 0;
  }

  .rdp-months {
    gap: ${({ theme }) => theme.spacing[6]};
  }

  .rdp-month_caption,
  .rdp-caption_label {
    color: ${({ theme }) => theme.colors.text};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    font-size: ${({ theme }) => theme.fontSize.base};
    letter-spacing: ${({ theme }) => theme.letterSpacing.wide};
  }

  .rdp-weekday {
    color: ${({ theme }) => theme.colors.muted};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    font-size: ${({ theme }) => theme.fontSize.xs};
    text-transform: uppercase;
  }

  .rdp-day_button {
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.fontSize.sm};
    transition: background-color 140ms ease, color 140ms ease;
  }

  .rdp-day:not(.rdp-selected):not(.rdp-disabled) .rdp-day_button:hover {
    background: rgba(187, 155, 105, 0.16);
  }

  .rdp-today:not(.rdp-selected) .rdp-day_button {
    color: ${({ theme }) => theme.colors.accent};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
  }

  .rdp-button_previous,
  .rdp-button_next {
    color: ${({ theme }) => theme.colors.accent};
    border-radius: ${({ theme }) => theme.radius.full};
    transition: background-color 140ms ease;
  }

  .rdp-button_previous:hover,
  .rdp-button_next:hover {
    background: rgba(187, 155, 105, 0.16);
  }
`;

const S = { Root, Trigger, TriggerText, Popover };

export default S;
