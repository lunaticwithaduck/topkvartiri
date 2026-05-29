import styled from '@emotion/styled';
import { FluidBackground } from '@/design/FluidBackground/FluidBackground';

// Cream gutter so the navy card floats inset from the browser edges.
const Root = styled.footer`
  background: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => `${theme.spacing[8]} ${theme.spacing[4]} ${theme.spacing[4]}`};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => `${theme.spacing[12]} ${theme.spacing[6]} ${theme.spacing[6]}`};
  }
`;

const Card = styled.div`
  position: relative;
  overflow: hidden;
  max-width: 90rem;
  margin-inline: auto;
  border-radius: 24px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.inverse};
  padding: ${({ theme }) => `${theme.spacing[10]} ${theme.spacing[6]}`};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    border-radius: 32px;
    padding: ${({ theme }) => `${theme.spacing[16]} ${theme.spacing[12]}`};
  }
`;

const Fluid = styled(FluidBackground)`
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  opacity: 0.9;

  & canvas {
    position: absolute;
    inset: 0;
    width: 100% !important;
    height: 100% !important;
    display: block;
  }
`;

const Inner = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing[10]};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1.5fr 1fr 1fr 1fr;
    gap: ${({ theme }) => theme.spacing[8]};
  }
`;

const Lead = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing[4]};
  max-width: 26rem;
`;

const CtaRow = styled.div`
  margin-block-start: ${({ theme }) => theme.spacing[2]};
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const LinkList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const NavLink = styled.span`
  color: ${({ theme }) => theme.colors.inverse};
  font-size: ${({ theme }) => theme.fontSize.sm};
  cursor: pointer;
  transition: color 150ms ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Socials = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
  margin-block-start: ${({ theme }) => theme.spacing[1]};
`;

const SocialLink = styled.a`
  display: inline-flex;
  transition: transform 200ms ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const BottomBar = styled.div`
  position: relative;
  z-index: 1;
  margin-block-start: ${({ theme }) => theme.spacing[10]};
  padding-block-start: ${({ theme }) => theme.spacing[5]};
  border-block-start: 1px solid rgba(255, 255, 255, 0.12);
  display: flex;
  justify-content: center;
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-content: flex-start;
  }
`;

const S = {
  Root,
  Card,
  Fluid,
  Inner,
  Lead,
  CtaRow,
  Column,
  LinkList,
  InfoItem,
  NavLink,
  Socials,
  SocialLink,
  BottomBar,
};

export default S;
