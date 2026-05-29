import styled from '@emotion/styled';

const Root = styled.header`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky};
  width: 100%;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.inverse};
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);
`;

const Inner = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  max-width: 80rem;
  margin-inline: auto;
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[4]}`};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: auto 1fr auto auto;
    gap: ${({ theme }) => theme.spacing[6]};
    padding: ${({ theme }) => `${theme.spacing[4]} ${theme.spacing[8]}`};
  }
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  padding-inline: ${({ theme }) => theme.spacing[1]};
`;

const Nav = styled.nav<{ $open: boolean }>`
  display: ${({ $open }) => ($open ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => `${theme.spacing[4]} ${theme.spacing[4]} ${theme.spacing[6]}`};
  gap: ${({ theme }) => theme.spacing[3]};
  border-block-start: 1px solid rgba(255, 255, 255, 0.08);

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: flex;
    position: static;
    flex-direction: row;
    justify-content: center;
    padding: 0;
    border: 0;
    gap: ${({ theme }) => theme.spacing[6]};
  }
`;

const NavItem = styled.a`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[1]}`};
  color: ${({ theme }) => theme.colors.inverse};
  text-decoration: none;
  letter-spacing: ${({ theme }) => theme.letterSpacing.wider};
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.fontSize.sm};
  transition: color 150ms ease;

  &:hover,
  &[aria-current='page'] {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const MenuButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 0;
  color: ${({ theme }) => theme.colors.inverse};
  padding: ${({ theme }) => theme.spacing[2]};
  cursor: pointer;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

const LangSwitch = styled.div`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[1]};
  }
`;

const LangLink = styled.a<{ $active: boolean }>`
  font-size: ${({ theme }) => theme.fontSize.xs};
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.letterSpacing.wider};
  color: ${({ theme, $active }) => ($active ? theme.colors.accent : theme.colors.inverse)};
  text-decoration: none;
  padding: ${({ theme }) => theme.spacing[1]};

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const S = {
  Root,
  Inner,
  Brand,
  Nav,
  NavItem,
  Actions,
  MenuButton,
  LangSwitch,
  LangLink,
};

export default S;
