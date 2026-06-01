import styled from "styled-components";
import type { AppTheme } from "./theme";

export const DropdownContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 8px;
  background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  overflow: hidden;
  max-width: 80vh;
`;

export const DropdownResults = styled.div`
  max-height: 400px;
  overflow-y: auto;
  background: ${({ theme }: { theme: AppTheme }) => theme.body};

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }: { theme: AppTheme }) => theme.divider};
    border-radius: 3px;

    &:hover {
      background: ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
    }
  }
`;

export const ResultItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const ResultAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  border: 2px solid ${({ theme }: { theme: AppTheme }) => theme.accent};
  transition: transform 0.2s ease;

  ${ResultItem}:hover & {
    transform: scale(1.05);
  }
`;

export const ResultContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ResultName = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const VerificationBadge = styled.span`
  width: 16px;
  height: 16px;
  background: linear-gradient(135deg, #8b5cf6, #6366f1);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  flex-shrink: 0;
  box-shadow: 0 2px 6px rgba(139, 92, 246, 0.3);
`;

export const ResultBio = styled.p`
  font-size: 12px;
  color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ResultFollowerCount = styled.div`
  font-size: 12px;
  color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
  white-space: nowrap;
  flex-shrink: 0;
  font-weight: 500;
`;

export const DropdownFooter = styled.div`
  padding: 12px 16px;
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  color: #8b5cf6;
  background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
  cursor: pointer;
  border-top: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
  }

  &:active {
    transform: scale(0.99);
  }
`;

export const NoResults = styled.div`
  padding: 20px 16px;
  text-align: center;
  color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
  font-size: 13px;
  background: ${({ theme }: { theme: AppTheme }) => theme.body};
`;