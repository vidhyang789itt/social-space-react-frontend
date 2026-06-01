import styled from "styled-components";
import type { AppTheme } from "./theme";

export const PostCardWrapper = styled.div`
  background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
  border-radius: 1rem;
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  margin: 1.5rem 0;

  &:hover {
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.1);
  }

  @media (max-width: 768px) {
    border-radius: 0.75rem;
    margin-bottom: 1rem;
  }
`;

export const HeaderSection = styled.div`
  padding: 1rem 1.25rem;
  background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
  border-bottom: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
`;

export const UserBrand = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  .meta {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    flex: 1;

    span {
      font-size: 0.9rem;
      font-weight: 600;
      color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
    }

    small {
      font-size: 0.75rem;
      color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
    }
  }
`;

export const ProfileImageDiv = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  border: 2px solid ${({ theme }: { theme: AppTheme }) => theme.accent};
  cursor: pointer;
  transition: all 0.2s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

export const InfoBody = styled.div`
  padding: 1rem 1.25rem;
`;

export const MainTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  word-break: break-word;

  @media (max-width: 640px) {
    font-size: 0.95rem;
  }
`;

export const SummaryText = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;

  @media (max-width: 640px) {
    font-size: 0.85rem;
    -webkit-line-clamp: 2;
  }
`;

export const DesktopImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 50vh;
  background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  border-top: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  border-bottom: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
  }

  @media (max-width: 768px) {
    height: 260px;
  }

  @media (max-width: 640px) {
    height: 220px;
  }
`;

export const PostImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
  transition: transform 0.2s ease;

  ${DesktopImageWrapper}:hover & {
    transform: scale(1.02);
  }
`;

export const NoImageSpacer = styled.div`
  display: none;
`;

export const InteractionBar = styled.div`
  display: flex;
  gap: 1.5rem;
  padding: 0.8rem 1.25rem;
  background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
  border-top: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  border-bottom: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};

  svg {
    transition: all 0.3s ease;
    color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
  }

  span {
    color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
    font-size: 0.85rem;
    font-weight: 500;
  }

  @media (max-width: 640px) {
    gap: 1rem;
    padding: 0.6rem 1rem;
  }
`;

export const BottomActionsRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 0;
`;

export const CommentLink = styled.button`
  flex: 1;
  background: transparent;
  border: none;
  border-bottom: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
  padding: 0.7rem 1.25rem;
  text-align: left;
  font-size: 0.85rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
    color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  }

  @media (max-width: 640px) {
    padding: 0.6rem 1rem;
    font-size: 0.8rem;
  }
`;

export const DetailsLink = styled.button`
  flex: 1;
  background: transparent;
  border: none;
  color: ${({ theme }: { theme: AppTheme }) => theme.accent};
  padding: 0.7rem 1.25rem;
  text-align: left;
  font-size: 0.85rem;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(139, 92, 246, 0.08);
    padding-left: 1.5rem;
  }

  @media (max-width: 640px) {
    padding: 0.6rem 1rem;
    font-size: 0.8rem;

    &:hover {
      padding-left: 1.1rem;
    }
  }
`;