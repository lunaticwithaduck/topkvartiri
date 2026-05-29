'use client';

import { Icon } from './Icon';

type IconWrapperProps = {
  size?: number;
  tone?: 'default' | 'inverse' | 'accent' | 'primary';
  strokeWidth?: number;
  className?: string;
  'aria-label'?: string;
};

// MountainOrnament — abstract three-peak mountain line used as a decorative
// flourish above section headings. Original line-art in the brand's geometric
// style; matches the role of the reference's ornament without copying its
// specific path.
export function MountainOrnament(props: IconWrapperProps) {
  return (
    <Icon {...props} viewBox="0 0 48 16" strokeWidth={props.strokeWidth ?? 1}>
      <path d="M2 14 L12 4 L18 10 L26 2 L34 10 L40 6 L46 14" />
    </Icon>
  );
}

export function ArrowUpRight(props: IconWrapperProps) {
  return (
    <Icon {...props}>
      <path d="M7 17 L17 7 M9 7 H17 V15" />
    </Icon>
  );
}

export function ChevronDown(props: IconWrapperProps) {
  return (
    <Icon {...props}>
      <path d="M6 9 L12 15 L18 9" />
    </Icon>
  );
}

export function Phone(props: IconWrapperProps) {
  return (
    <Icon {...props}>
      <path d="M5 4 H9 L11 9 L8.5 10.5 A11 11 0 0 0 13.5 15.5 L15 13 L20 15 V19 A2 2 0 0 1 18 21 A16 16 0 0 1 3 6 A2 2 0 0 1 5 4 Z" />
    </Icon>
  );
}

export function Mail(props: IconWrapperProps) {
  return (
    <Icon {...props}>
      <path d="M3 6 H21 V18 H3 Z M3 6 L12 13 L21 6" />
    </Icon>
  );
}

export function Facebook(props: IconWrapperProps) {
  return (
    <Icon {...props}>
      <path d="M14 4 H17 V8 H14 A1 1 0 0 0 13 9 V11 H17 L16 15 H13 V21 H9 V15 H7 V11 H9 V8 A4 4 0 0 1 13 4 Z" />
    </Icon>
  );
}

export function Instagram(props: IconWrapperProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" />
    </Icon>
  );
}

export function Menu(props: IconWrapperProps) {
  return (
    <Icon {...props}>
      <path d="M4 7 H20 M4 12 H20 M4 17 H20" />
    </Icon>
  );
}

export function Close(props: IconWrapperProps) {
  return (
    <Icon {...props}>
      <path d="M6 6 L18 18 M18 6 L6 18" />
    </Icon>
  );
}
