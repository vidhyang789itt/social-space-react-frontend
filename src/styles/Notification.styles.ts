import styled from 'styled-components';
import type { AppTheme } from './theme';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background: ${({ theme }: { theme: AppTheme }) => theme.body};
  color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
`;

export const Header = styled.div`
  padding: clamp(1rem, 3vw, 1.5rem) clamp(1.25rem, 4vw, 2rem);
  border-bottom: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  background: ${({ theme }: { theme: AppTheme }) => theme.body};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: clamp(1rem, 2vw, 1.5rem);
  flex-wrap: wrap;
  flex-shrink: 0;

  @media (max-width: 768px) {
    padding: 1rem clamp(0.75rem, 3vw, 1.25rem);
  }

  @media (max-width: 480px) {
    padding: 0.875rem 0.75rem;
  }

  h1 {
    margin: 0;
    font-size: clamp(20px, 5vw, 28px);
    font-weight: 700;
    color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
    line-height: 1.2;
  }
`;

export const MarkReadBtn = styled.button`
  padding: clamp(0.625rem, 1vw, 0.75rem) clamp(1rem, 3vw, 1.25rem);
  background: ${({ theme }: { theme: AppTheme }) => theme.accent};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: clamp(12px, 2vw, 14px);
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.2);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const FilterSection = styled.div`
  padding: clamp(0.75rem, 2vw, 1rem) clamp(1.25rem, 4vw, 2rem);
  border-bottom: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  background: ${({ theme }: { theme: AppTheme }) => theme.body};
  display: flex;
  gap: clamp(0.75rem, 2vw, 1rem);
  flex-wrap: wrap;
  flex-shrink: 0;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0.75rem clamp(0.75rem, 3vw, 1.25rem);
  }

  @media (max-width: 480px) {
    padding: 0.625rem 0.75rem;
  }
`;

interface FilterTabProps {
  $active: boolean;
}

export const FilterTab = styled.button<FilterTabProps>`
  padding: clamp(0.625rem, 1vw, 0.75rem) clamp(1rem, 2vw, 1.25rem);
  background: ${({ $active, theme }: FilterTabProps & { theme: AppTheme }) =>
    $active ? theme.accent : theme.innerBg};
  color: ${({ $active, theme }: FilterTabProps & { theme: AppTheme }) =>
    $active ? "white" : theme.textSecondary};
  border: 1px solid
    ${({ $active, theme }: FilterTabProps & { theme: AppTheme }) =>
      $active ? theme.accent : theme.divider};
  border-radius: 20px;
  font-size: clamp(12px, 2vw, 13px);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background: ${({ $active, theme }: FilterTabProps & { theme: AppTheme }) =>
      $active ? "#7c3aed" : theme.cardBg};
    border-color: ${({ theme }: { theme: AppTheme }) => theme.accent};
    color: ${({ $active, theme }: FilterTabProps & { theme: AppTheme }) =>
      $active ? "white" : theme.accent};
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ContentArea = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: clamp(1rem, 2vw, 1.5rem) clamp(1.25rem, 4vw, 2rem);
  display: flex;
  flex-direction: column;
  gap: clamp(0.75rem, 2vw, 1.25rem);

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }: { theme: AppTheme }) => theme.divider};
    border-radius: 3px;
    transition: background 0.2s ease;

    &:hover {
      background: ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
    }
  }

  @media (max-width: 768px) {
    padding: 0.75rem clamp(0.75rem, 3vw, 1.25rem);
    gap: 0.875rem;
  }

  @media (max-width: 480px) {
    padding: 0.75rem 0.75rem;
  }
`;

export const SectionHeader = styled.div`
  padding: clamp(0.75rem, 1vw, 1rem) 0;
  font-size: clamp(10px, 2vw, 11px);
  font-weight: 700;
  color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  margin-top: 0.5rem;
  opacity: 0.7;

  &:first-child {
    margin-top: 0;
  }
`;

export const NotificationSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(0.5rem, 1vw, 0.75rem);
`;

interface NotificationItemProps {
  $isRead: boolean;
}

export const NotificationItem = styled.button<NotificationItemProps>`
  display: flex;
  gap: clamp(0.875rem, 2vw, 1rem);
  align-items: flex-start;
  padding: clamp(0.875rem, 1vw, 1rem) clamp(1rem, 2vw, 1.25rem);
  background: ${({ $isRead }: NotificationItemProps & { theme: AppTheme }) =>
    $isRead ? "transparent" : `rgba(139, 92, 246, 0.05)`};
  border: 1px solid
    ${({ $isRead, theme }: NotificationItemProps & { theme: AppTheme }) =>
      $isRead ? theme.divider : theme.accent + "20"};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  text-align: left;
  width: 100%;
  max-width: 100%;
  min-height: 44px;

  &:hover:not(:disabled) {
    background: ${({ $isRead, theme }: NotificationItemProps & { theme: AppTheme }) =>
      $isRead ? theme.cardBg : `rgba(139, 92, 246, 0.1)`};
    border-color: ${({ theme }: { theme: AppTheme }) => theme.accent};
    transform: translateX(2px);
  }

  &:active:not(:disabled) {
    transform: translateX(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    gap: 0.75rem;
    padding: 0.75rem 0.875rem;
  }
`;

export const AvatarWrapper = styled.div`
  position: relative;
  flex-shrink: 0;
  margin-top: clamp(0px, 1vw, 2px);
`;

export const Avatar = styled.img`
  width: clamp(36px, 8vw, 48px);
  height: clamp(36px, 8vw, 48px);
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${({ theme }: { theme: AppTheme }) => theme.accent};
  opacity: 0.95;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
  }
`;

export const TypeIconWrapper = styled.div`
  position: absolute;
  bottom: -4px;
  right: -4px;
  width: clamp(20px, 5vw, 28px);
  height: clamp(20px, 5vw, 28px);
  background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
  border: 2px solid ${({ theme }: { theme: AppTheme }) => theme.accent};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(10px, 3vw, 14px);
  flex-shrink: 0;

  @media (max-width: 480px) {
    width: 20px;
    height: 20px;
    font-size: 10px;
    bottom: -2px;
    right: -2px;
  }
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: clamp(0.25rem, 1vw, 0.5rem);
  min-width: 0;
  justify-content: center;

  p {
    margin: 0;
    font-size: clamp(13px, 2vw, 14px);
    line-height: 1.5;
    color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
    word-break: break-word;
    overflow-wrap: break-word;

    strong {
      color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
      font-weight: 700;
    }
  }

  @media (max-width: 480px) {
    gap: 0.25rem;
  }
`;

export const Time = styled.span`
  font-size: clamp(10px, 1.5vw, 12px);
  color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
  font-weight: 500;
  white-space: nowrap;
  flex-shrink: 0;
`;

export const PostThumbnail = styled.img`
  width: clamp(36px, 8vw, 48px);
  height: clamp(36px, 8vw, 48px);
  border-radius: 6px;
  object-fit: cover;
  flex-shrink: 0;
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    border-color: ${({ theme }: { theme: AppTheme }) => theme.accent};
  }

  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
  }
`;

export const UnreadIndicator = styled.div`
  width: 8px;
  height: 8px;
  background: ${({ theme }: { theme: AppTheme }) => theme.accent};
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: clamp(4px, 1vw, 6px);
  animation: pulse 2s infinite;

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(0.75rem, 2vw, 1.25rem);
  height: 100%;
  color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
  padding: clamp(2rem, 5vw, 3rem) clamp(1rem, 3vw, 2rem);

  svg {
    width: clamp(48px, 10vw, 64px);
    height: clamp(48px, 10vw, 64px);
    opacity: 0.4;
    color: ${({ theme }: { theme: AppTheme }) => theme.accent};
  }

  p {
    margin: 0;
    font-size: clamp(13px, 2vw, 16px);
    font-weight: 600;
    text-align: center;
    line-height: 1.5;
    color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
  }
`;