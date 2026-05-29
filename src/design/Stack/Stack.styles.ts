import styled from '@emotion/styled';
import type { SpacingToken } from '../tokens/spacing';

export type StackAlign = 'start' | 'center' | 'end' | 'stretch';
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around';
export type StackDirection = 'row' | 'column';

const ALIGN_MAP: Record<StackAlign, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
};

const JUSTIFY_MAP: Record<StackJustify, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
};

type StackStyleProps = {
  $direction: StackDirection;
  $gap: SpacingToken;
  $align: StackAlign;
  $justify: StackJustify;
  $wrap: boolean;
};

const Root = styled.div<StackStyleProps>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction};
  gap: ${({ theme, $gap }) => theme.spacing[$gap]};
  align-items: ${({ $align }) => ALIGN_MAP[$align]};
  justify-content: ${({ $justify }) => JUSTIFY_MAP[$justify]};
  flex-wrap: ${({ $wrap }) => ($wrap ? 'wrap' : 'nowrap')};
`;

const S = { Root };

export default S;
