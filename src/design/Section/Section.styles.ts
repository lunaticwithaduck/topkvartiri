import styled from '@emotion/styled';

export type SectionBg = 'background' | 'elevated' | 'paper' | 'primary' | 'image';

type SectionStyleProps = {
  $bg: SectionBg;
  $imageSrc?: string;
  $minHeight: string | undefined;
  $padTop: boolean;
  $padBottom: boolean;
};

const Root = styled.section<SectionStyleProps>`
  position: relative;
  width: 100%;
  min-height: ${({ $minHeight }) => $minHeight ?? 'auto'};
  padding-block-start: ${({ theme, $padTop }) => ($padTop ? theme.spacing[16] : '0')};
  padding-block-end: ${({ theme, $padBottom }) => ($padBottom ? theme.spacing[16] : '0')};
  background-color: ${({ theme, $bg }) => {
    switch ($bg) {
      case 'elevated':
        return theme.colors.elevated;
      case 'paper':
        return theme.colors.paper;
      case 'primary':
        return theme.colors.primary;
      case 'image':
        return theme.colors.primary;
      default:
        return theme.colors.background;
    }
  }};
  background-image: ${({ $bg, $imageSrc }) => ($bg === 'image' && $imageSrc ? `url(${$imageSrc})` : 'none')};
  background-size: cover;
  background-position: center;
  color: ${({ theme, $bg }) =>
    $bg === 'primary' || $bg === 'image' ? theme.colors.inverse : theme.colors.text};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-block-start: ${({ theme, $padTop }) => ($padTop ? theme.spacing[24] : '0')};
    padding-block-end: ${({ theme, $padBottom }) => ($padBottom ? theme.spacing[24] : '0')};
  }
`;

const Overlay = styled.div<{ $tone: 'dark' | 'light' | 'none' }>`
  position: absolute;
  inset: 0;
  background: ${({ $tone }) => {
    switch ($tone) {
      case 'dark':
        return 'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 100%)';
      case 'light':
        return 'rgba(255, 252, 246, 0.7)';
      default:
        return 'transparent';
    }
  }};
  pointer-events: none;
`;

const Inner = styled.div`
  position: relative;
`;

const S = { Root, Overlay, Inner };

export default S;
