import styled from "styled-components";
import type { AppTheme } from "./theme";

export const PageDiv = styled.div`
  display: flex;
`;

export const SideItem = styled.button<{
  $primary?: boolean;
  $collapsed?: boolean;
}>`
  display: flex;
  align-items: center;
  gap: ${({ $collapsed }) => ($collapsed ? "0" : "14px")};
  justify-content: ${({ $collapsed }) =>
    $collapsed ? "center" : "flex-start"};
  width: 100%;
  padding: ${({ $collapsed }) => ($collapsed ? "14px 0" : "2px 16px")};
  border-radius: ${({ $collapsed }) => ($collapsed ? "16px" : "14px")};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;

  color: ${({ $primary, theme }: { $primary?: boolean; theme: AppTheme }) =>
    $primary ? "white" : theme.textPrimary};

  background: ${({ $primary, theme }: { $primary?: boolean; theme: AppTheme }) =>
    $primary ? theme.accent : "transparent"};

  box-shadow: ${({ $primary, theme }: { $primary?: boolean; theme: AppTheme }) =>
    $primary ? `0 0 15px ${theme.accent}66` : "none"};

  border: none;

  &:hover:not(:disabled) {
    background: ${({ $primary, theme }: { $primary?: boolean; theme: AppTheme }) =>
      $primary ? theme.accent : theme.innerBg};
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  span {
    display: ${({ $collapsed }) => ($collapsed ? "none" : "inline")};
    white-space: nowrap;
  }
`;

export const LogoutButton = styled.button`
  padding: 12px 24px;
  border-radius: 14px;
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
  color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
    transform: translateY(-2px);
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  width: 100%;
`;

export const PageContainer = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  transition: all 0.5s ease-in-out;
  margin-top: 64px;

  @media (max-width: 768px) {
    margin-top: 64px;
    margin-bottom: 60px;
  }
`;

export const MainContent = styled.main`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  transition: margin-left 0.5s ease-in-out;
  padding: 0;
  background: ${({ theme }: { theme: AppTheme }) => theme.body};

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }: { theme: AppTheme }) => theme.divider};
    border-radius: 10px;

    &:hover {
      background: ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
    }
  }

  @media (max-width: 768px) {
    margin-left: 0 !important;
  }
`;

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: clamp(0.75rem, 2vw, 1rem) clamp(1rem, 3vw, 2rem);
  height: clamp(60px, 10vh, 72px);
  gap: clamp(0.75rem, 2vw, 1.5rem);

  background: ${({ theme }: { theme: AppTheme }) => theme.headerBg};
  color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  border-bottom: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};

  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);

  transition: all 0.2s ease;

  span {
    color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  }

  svg {
    color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
  }

  @media (min-width: 769px) {
    padding: clamp(0.75rem, 2vw, 1rem) clamp(1.25rem, 4vw, 2rem);
    height: clamp(64px, 10vh, 72px);
    gap: clamp(1.5rem, 3vw, 2rem);
  }

  @media (max-width: 768px) and (min-width: 481px) {
    padding: clamp(0.75rem, 2vw, 1rem) clamp(0.75rem, 2vw, 1.25rem);
    height: clamp(56px, 9vh, 64px);
    gap: clamp(0.5rem, 1vw, 1rem);
  }

  @media (max-width: 480px) {
    padding: 0.625rem 0.75rem;
    height: 56px;
    gap: 0.5rem;
  }

  @media (max-width: 768px) {
    margin-bottom: 0;
  }
`;

export const Logo = styled.h1`
  font-size: clamp(18px, 5vw, 28px);
  font-weight: 900;
  color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  letter-spacing: clamp(-0.5px, 1vw, 1px);
  transition: all 0.2s ease;
  margin: 0;
  line-height: 1.1;

  @media (max-width: 768px) {
    font-size: clamp(16px, 4vw, 20px);
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

export const NavSection = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(1rem, 4vw, 1.75rem);
`;

export const NavItem = styled.button`
  background: transparent;
  border: none;
  font-size: clamp(12px, 2vw, 14px);
  font-weight: 600;
  color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: clamp(0.5rem, 1vw, 0.75rem);
  padding: clamp(0.5rem, 1vw, 0.75rem) clamp(1rem, 2vw, 1.25rem);
  border-radius: 999px;
  transition: all 0.2s ease;
  min-height: 44px;
  white-space: nowrap;

  &:hover:not(:disabled) {
    background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  svg {
    width: clamp(16px, 4vw, 20px);
    height: clamp(16px, 4vw, 20px);
  }

  @media (max-width: 640px) {
    font-size: 12px;
    padding: 0.5rem 0.75rem;
    gap: 0.5rem;
  }
`;

export const MembersStepContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 1.5rem;
  height: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`;

export const UserListSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 0;
`;

export const SelectedMembersPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
  border-radius: 10px;
  padding: 1rem;
  height: fit-content;
  max-height: 500px;
  overflow-y: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }: { theme: AppTheme }) => theme.divider};
    border-radius: 2px;

    &:hover {
      background: ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
    }
  }

  @media (max-width: 1024px) {
    max-height: 200px;
    grid-column: 1 / -1;
  }
`;

export const SelectedMemberBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: ${({ theme }: { theme: AppTheme }) => theme.body};
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  border-radius: 6px;
  animation: slideIn 0.2s ease-out;
  transition: all 0.2s ease;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-10px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  img {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
    border: 2px solid ${({ theme }: { theme: AppTheme }) => theme.accent};
  }

  .name {
    font-size: 0.8rem;
    font-weight: 500;
    color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .remove-btn {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #ef4444;
    color: white;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all 0.2s;

    &:hover {
      background: #dc2626;
      transform: scale(1.1);
    }

    &:active {
      transform: scale(0.95);
    }
  }

  &:hover {
    background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
    border-color: ${({ theme }: { theme: AppTheme }) => theme.accent};
  }
`;

export const SelectedCountHeader = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  position: sticky;
  top: 0;
  background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
  z-index: 10;

  .count {
    background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
    color: white;
    padding: 0.2rem 0.5rem;
    border-radius: 12px;
    font-size: 0.7rem;
    font-weight: 700;
    box-shadow: 0 2px 6px rgba(139, 92, 246, 0.3);
  }
`;