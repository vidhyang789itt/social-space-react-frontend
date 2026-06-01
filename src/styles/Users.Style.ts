import styled from "styled-components";
import type { AppTheme } from "./theme";

export const PageWrapper = styled.div`
  width: 100%;
  padding: 24px;
  background: ${({ theme }: { theme: AppTheme }) => theme.body};
  min-height: 100vh;
  transition: background 0.2s ease;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const UsersHeader = styled.div`
  margin-bottom: 32px;
  padding: 24px;
  background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
  border-radius: 12px;
  color: white;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);

  @media (max-width: 768px) {
    padding: 16px;
    margin-bottom: 24px;
  }
`;

export const HeaderContent = styled.div`
  h1 {
    margin: 0 0 8px 0;
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -0.5px;
    color: white;

    @media (max-width: 768px) {
      font-size: 24px;
    }
  }

  p {
    margin: 0;
    font-size: 14px;
    opacity: 0.9;
    letter-spacing: 0.3px;
    color: rgba(255, 255, 255, 0.9);
  }
`;

export const SearchAndFilterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    margin-bottom: 24px;
  }
`;

export const SearchBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
  border: 1.5px solid ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
  border-radius: 12px;
  padding: 0 16px;
  transition: all 0.3s ease;

  &:focus-within {
    border-color: #8b5cf6;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
  }
`;

export const SearchIcon = styled.span`
  font-size: 18px;
  margin-right: 12px;
  color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
`;

export const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding: 12px 0;
  font-size: 14px;
  background: transparent;
  color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  font-family: inherit;

  &::placeholder {
    color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  }
`;

export const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const FilterLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  white-space: nowrap;
`;

export const SortButtons = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SortButton = styled.button<{ isActive: boolean }>`
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 600;
  border: 1.5px solid ${({ isActive, theme }: { isActive: boolean; theme: AppTheme }) =>
    isActive ? "#8b5cf6" : theme.cardBorder};
  background: ${({ isActive, theme }: { isActive: boolean; theme: AppTheme }) =>
    isActive ? "#8b5cf6" : theme.cardBg};
  color: ${({ isActive, theme }: { isActive: boolean; theme: AppTheme }) =>
    isActive ? "white" : theme.textPrimary};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    border-color: #8b5cf6;
    background: ${({ isActive, theme }: { isActive: boolean; theme: AppTheme }) =>
      isActive ? "#7c3aed" : theme.innerBg};
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 12px;
  }
`;

export const UsersWrapper = styled.div`
  width: 100%;
`;

export const UsersListHeader = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  margin-bottom: 24px;
  letter-spacing: -0.3px;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 16px;
  }
`;

export const UsersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  width: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 16px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 12px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const UserCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: #8b5cf6;
    box-shadow: 0 10px 25px rgba(139, 92, 246, 0.15);
    transform: translateY(-2px);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #8b5cf6, #6366f1);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const UserCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

export const UserAvatarWrapper = styled.div`
  position: relative;
`;

export const UserAvatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  transition: transform 0.3s ease;

  ${UserCardContainer}:hover & {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;

export const OnlineIndicator = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 14px;
  height: 14px;
  background: #10b981;
  border: 2px solid white;
  border-radius: 50%;
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
    }
    70% {
      box-shadow: 0 0 0 6px rgba(16, 185, 129, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
    }
  }
`;

export const VerificationBadge = styled.div`
  width: 24px;
  height: 24px;
  background: linear-gradient(135deg, #8b5cf6, #6366f1);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(139, 92, 246, 0.3);
`;

export const UserCardContent = styled.div`
  flex: 1;
  margin-bottom: 16px;
`;

export const UserNameWrapper = styled.div`
  margin-bottom: 8px;
`;

export const UserName = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  letter-spacing: -0.2px;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

export const UserBio = styled.p`
  margin: 0 0 12px 0;
  font-size: 13px;
  color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const UserStatsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
  border-radius: 8px;
`;

export const UserStat = styled.div`
  flex: 1;
  text-align: center;
`;

export const StatValue = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #8b5cf6;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const StatLabel = styled.div`
  font-size: 11px;
  color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  margin-top: 4px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

export const StatDivider = styled.div`
  width: 1px;
  height: 24px;
  background: ${({ theme }: { theme: AppTheme }) => theme.divider};
`;

export const UserCardFooter = styled.div`
  display: flex;
  gap: 8px;
`;

export const FollowButton = styled.button<{
  isFollowing: boolean;
  isOwnProfile: boolean;
}>`
  flex: 1;
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 600;
  border: 1.5px solid
    ${({ isFollowing, theme }: { isFollowing: boolean; theme: AppTheme }) =>
      isFollowing ? theme.cardBorder : "#8b5cf6"};
  background: ${({ isFollowing, theme }: { isFollowing: boolean; theme: AppTheme }) =>
    isFollowing ? theme.cardBg : "#8b5cf6"};
  color: ${({ isFollowing, theme }: { isFollowing: boolean; theme: AppTheme }) =>
    isFollowing ? theme.textSecondary : "white"};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  &:hover:not(:disabled) {
    ${({ isFollowing, theme }: { isFollowing: boolean; theme: AppTheme }) =>
      isFollowing
        ? `
      background: ${theme.innerBg};
      border-color: ${theme.accent};
      color: ${theme.accent};
    `
        : `
      background: #7c3aed;
      border-color: #7c3aed;
      box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
    `}
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 8px 12px;
    font-size: 12px;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

export const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  padding: 40px 20px;
  text-align: center;
  background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
  border-radius: 12px;
  border: 2px dashed ${({ theme }: { theme: AppTheme }) => theme.divider};
`;

export const EmptyStateIcon = styled.div`
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.5;
  color: ${({ theme }: { theme: AppTheme }) => theme.divider};
`;

export const EmptyStateTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
`;

export const EmptyStateText = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  max-width: 300px;
`;

export const ErrorMessage = styled.div`
  padding: 16px;
  background: rgba(220, 38, 38, 0.1);
  color: #dc2626;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
  border: 1px solid rgba(220, 38, 38, 0.2);
`;

export const NoPostMsg = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  font-size: 16px;
`;

export const MutualContainer = styled.div`
  padding: 8px 12px;
  background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
  border-radius: 6px;
  margin-bottom: 12px;
`;

export const MutualText = styled.p`
  margin: 0;
  font-size: 12px;
  color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  line-height: 1.4;

  strong {
    color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
    font-weight: 600;
  }

  @media (max-width: 768px) {
    font-size: 11px;
  }
`;