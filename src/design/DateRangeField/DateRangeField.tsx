'use client';

import 'react-day-picker/style.css';
import { format, parseISO } from 'date-fns';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { type DateRange, DayPicker } from 'react-day-picker';
import { ChevronDown } from '@/design/Icon/icons';
import S from './DateRangeField.styles';

type DateRangeFieldProps = {
  from?: string;
  to?: string;
  onChange: (range: { from?: string; to?: string }) => void;
  minDate?: string; // ISO yyyy-mm-dd
  invalid?: boolean;
  placeholder?: string;
  numberOfMonths?: number;
};

const toISO = (d?: Date) => (d ? format(d, 'yyyy-MM-dd') : undefined);
const fromISO = (s?: string) => (s ? parseISO(s) : undefined);
const display = (s?: string) => (s ? format(parseISO(s), 'd MMM yyyy') : '');

export function DateRangeField({
  from,
  to,
  onChange,
  minDate,
  invalid = false,
  placeholder,
  numberOfMonths = 1,
}: DateRangeFieldProps) {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<'top' | 'bottom'>('bottom');
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Open upward when there isn't room for the calendar below the trigger.
  useLayoutEffect(() => {
    if (!open) return;
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const POPOVER_HEIGHT = 380;
    const spaceBelow = window.innerHeight - rect.bottom;
    setPlacement(spaceBelow < POPOVER_HEIGHT && rect.top > spaceBelow ? 'top' : 'bottom');
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const selected: DateRange | undefined =
    from || to ? { from: fromISO(from), to: fromISO(to) } : undefined;
  const minD = minDate ? fromISO(minDate) : new Date();

  const handleSelect = (range: DateRange | undefined) => {
    onChange({ from: toISO(range?.from), to: toISO(range?.to) });
    // react-day-picker sets `to === from` on the first click of a range; only
    // close once a real multi-day range is chosen so the user can pick the end.
    if (range?.from && range?.to && range.from.getTime() !== range.to.getTime()) {
      setOpen(false);
    }
  };

  const label =
    from && to ? `${display(from)} – ${display(to)}` : from ? `${display(from)} – …` : '';

  return (
    <S.Root ref={rootRef}>
      <S.Trigger
        ref={triggerRef}
        type="button"
        $invalid={invalid}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-invalid={invalid || undefined}
        onClick={() => setOpen((o) => !o)}
      >
        <S.TriggerText $placeholder={!label}>{label || placeholder || ''}</S.TriggerText>
        <ChevronDown size={18} />
      </S.Trigger>
      {open ? (
        <S.Popover role="dialog" aria-label={placeholder} $placement={placement}>
          <DayPicker
            mode="range"
            selected={selected}
            onSelect={handleSelect}
            disabled={minD ? { before: minD } : undefined}
            numberOfMonths={numberOfMonths}
            weekStartsOn={1}
          />
        </S.Popover>
      ) : null}
    </S.Root>
  );
}
