import styled from "styled-components";
import type { AppTheme } from "./theme";

export const FeedContainer = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 0;

  @media (min-width: 1024px) {
    max-width: clamp(600px, 65vw, 900px);
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(1rem, 3vw, 1.5rem);
  background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
  padding: clamp(0.875rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2rem);
  border-radius: 999px;
  margin: clamp(2rem, 5vw, 2.5rem) auto;
  width: fit-content;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    margin: 1.5rem auto;
    padding: 0.875rem 1rem;
  }
`;

export const PageNumber = styled.button<{ $active?: boolean }>`
  background: ${({ $active, theme }: { $active?: boolean; theme: AppTheme }) =>
    $active ? theme.accent : "transparent"};
  color: ${({ $active, theme }: { $active?: boolean; theme: AppTheme }) =>
    $active ? "white" : theme.textPrimary};
  border: 1px solid
    ${({ $active, theme }: { $active?: boolean; theme: AppTheme }) =>
      $active ? theme.accent : theme.divider};
  width: clamp(32px, 8vw, 40px);
  height: clamp(32px, 8vw, 40px);
  border-radius: 50%;
  cursor: pointer;
  font-weight: 700;
  font-size: clamp(12px, 2vw, 14px);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  min-width: 44px;

  &:hover:not(:disabled) {
    background: ${({ $active, theme }: { $active?: boolean; theme: AppTheme }) =>
      $active ? "#7c3aed" : theme.innerBg};
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
    font-size: 12px;
  }
`;

export const NavButton = styled.button`
  background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
  color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
  padding: clamp(0.625rem, 1vw, 0.75rem) clamp(1rem, 3vw, 1.25rem);
  border-radius: clamp(8px, 2vw, 10px);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(0.5rem, 1vw, 0.75rem);
  cursor: pointer;
  font-weight: 600;
  font-size: clamp(12px, 2vw, 14px);
  transition: all 0.2s ease;
  min-height: 44px;
  white-space: nowrap;

  &:hover:not(:disabled) {
    background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
    border-color: ${({ theme }: { theme: AppTheme }) => theme.accent};
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: clamp(16px, 3vw, 18px);
    height: clamp(16px, 3vw, 18px);
  }

  @media (max-width: 640px) {
    padding: 0.625rem 1rem;
    font-size: 12px;
  }
`;

export const ControlsRow = styled.div`
  display: flex;
  gap: clamp(1rem, 3vw, 1.5rem);
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
  padding: clamp(1rem, 3vw, 1.5rem);
  border-radius: clamp(12px, 3vw, 16px);
  margin-bottom: clamp(1.5rem, 4vw, 2rem);

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }

  @media (max-width: 640px) {
    padding: 1rem;
    margin-bottom: 1.25rem;
  }
`;

export const SortSelect = styled.select`
  padding: clamp(0.75rem, 2vw, 0.875rem) clamp(1rem, 3vw, 1.25rem);
  border-radius: 999px;
  background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
  color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  font-size: clamp(12px, 2vw, 14px);
  font-weight: 600;
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease;
  min-height: 44px;
  font-family: inherit;

  &:focus {
    border-color: ${({ theme }: { theme: AppTheme }) => theme.accent};
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
  }

  &:hover {
    border-color: ${({ theme }: { theme: AppTheme }) => theme.accent};
  }

  option {
    background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
    color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  }

  @media (max-width: 640px) {
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 12px;
  }
`;

export const ResultsCount = styled.span`
  color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
  font-size: clamp(11px, 2vw, 13px);
  border-left: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  padding-left: clamp(1rem, 2vw, 1.25rem);
  margin-left: clamp(1rem, 2vw, 1.25rem);
  display: none;
  white-space: nowrap;

  @media (min-width: 768px) {
    display: inline-block;
  }

  @media (max-width: 640px) {
    display: none;
  }
`;

export const PageInfo = styled.span`
  color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  font-size: clamp(13px, 2vw, 16px);
  font-weight: 600;

  strong {
    color: ${({ theme }: { theme: AppTheme }) => theme.accent};
    font-weight: 700;
  }

  @media (max-width: 640px) {
    font-size: 13px;
  }
`;

export const NoPostMsg = styled.p`
  text-align: center;
  color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
  margin-top: clamp(2rem, 5vw, 2.5rem);
  font-size: clamp(14px, 3vw, 18px);
  line-height: 1.6;

  @media (max-width: 640px) {
    margin-top: 1.5rem;
    font-size: 14px;
  }
`;

export const PageNumbers = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(2px, 1vw, 6px);
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 480px) {
    gap: 2px;
  }
`;

export const PostMeta = styled.div`
  font-size: clamp(11px, 2vw, 12px);
  color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
  opacity: 0.8;
`;

export const TextBadge = styled.div`
  display: inline-block;
  font-size: clamp(11px, 2vw, 12px);
  font-weight: 700;
  padding: clamp(0.375rem, 1vw, 0.5rem) clamp(0.75rem, 2vw, 1rem);
  margin-bottom: clamp(0.75rem, 2vw, 1rem);
  background: linear-gradient(
    135deg,
    ${({ theme }: { theme: AppTheme }) => theme.accent} 0%,
    #7c3aed 100%
  );
  border-radius: 999px;
  color: white;
  letter-spacing: 0.5px;
  text-transform: uppercase;

  @media (max-width: 640px) {
    padding: 0.375rem 0.75rem;
    margin-bottom: 0.75rem;
  }
`;

export const SearchPosition = styled.div`
  margin-left: -100px;
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;

  @media (max-width: 1024px) {
    margin-left: 0;
  }
`;

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(0.5rem, 1vw, 0.75rem);
  padding: clamp(0.5rem, 1.5vw, 0.625rem) clamp(0.875rem, 2vw, 1rem);
  border-radius: clamp(8px, 2vw, 12px);
  background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
  width: 40vw;
  transition: all 0.2s ease;
  min-height: 42px;
  position: relative;

  &:focus-within {
    border-color: ${({ theme }: { theme: AppTheme }) => theme.accent};
    box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.08);
  }

  svg {
    color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
    width: clamp(14px, 3vw, 18px);
    height: clamp(14px, 3vw, 18px);
    flex-shrink: 0;
  }

  @media (max-width: 900px) {
    width: 100%;
  }

  @media (max-width: 640px) {
    padding: clamp(0.5rem, 1vw, 0.625rem) clamp(0.75rem, 2vw, 1rem);
    min-height: 40px;
  }

  @media (max-width: 480px) {
    min-height: 38px;
    border-radius: 8px;
  }
`;

export const SearchInput = styled.input`
  background: transparent;
  border: none;
  outline: none;
  width: 100%;
  font-size: clamp(12px, 2vw, 14px);
  color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  font-family: inherit;
  font-weight: 500;

  &::placeholder {
    color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
    opacity: 0.6;
    font-weight: 400;
  }

  &::-webkit-search-cancel-button {
    display: none;
  }

  @media (max-width: 640px) {
    font-size: 13px;
  }
`;

export const SearchClearButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: clamp(0.25rem, 0.5vw, 0.375rem);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
  transition: all 0.2s ease;
  flex-shrink: 0;
  min-height: 32px;
  min-width: 32px;

  svg {
    width: clamp(14px, 3vw, 18px);
    height: clamp(14px, 3vw, 18px);
  }

  &:hover {
    color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  }

  &:active {
    opacity: 0.7;
  }

  @media (max-width: 640px) {
    padding: 0.25rem;
  }
`;

export const SearchDropdownContainer = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  right: 0;
  background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  border-radius: clamp(8px, 2vw, 12px);
  box-shadow: 0 clamp(4px, 2vw, 10px) clamp(12px, 4vw, 30px) rgba(0, 0, 0, 0.12);
  max-height: clamp(200px, 50vh, 400px);
  overflow-y: auto;
  z-index: 1000;
  animation: slideDown 0.2s ease-out;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

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

  @media (max-width: 640px) {
    max-height: clamp(150px, 40vh, 300px);
  }
`;

export const SearchResultItem = styled.button`
  width: 100%;
  padding: clamp(0.75rem, 2vw, 1rem);
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: clamp(0.75rem, 2vw, 1rem);
  text-align: left;
  border-bottom: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};

  &:last-child {
    border-bottom: none;
  }

  &:hover:not(:disabled) {
    background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
  }

  &:active:not(:disabled) {
    background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .avatar {
    width: clamp(36px, 8vw, 44px);
    height: clamp(36px, 8vw, 44px);
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
    border: 2px solid ${({ theme }: { theme: AppTheme }) => theme.cardBorder};

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .info {
    flex: 1;
    min-width: 0;

    .username {
      font-size: clamp(12px, 2vw, 14px);
      font-weight: 700;
      color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
      margin: 0;
    }

    .bio {
      font-size: clamp(11px, 2vw, 12px);
      color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
      margin: clamp(0.25rem, 0.5vw, 0.375rem) 0 0 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  @media (max-width: 640px) {
    padding: 0.75rem;
  }
`;

export const SearchViewAllButton = styled.button`
  width: 100%;
  padding: clamp(0.75rem, 2vw, 1rem);
  background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
  border: none;
  border-top: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  color: ${({ theme }: { theme: AppTheme }) => theme.accent};
  font-size: clamp(12px, 2vw, 13px);
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
  }

  &:active:not(:disabled) {
    background: ${({ theme }: { theme: AppTheme }) => theme.divider};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 640px) {
    padding: 0.75rem;
  }
`;

export const SearchEmptyState = styled.div`
  padding: clamp(1.5rem, 3vw, 2rem);
  text-align: center;
  color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
  font-size: clamp(12px, 2vw, 14px);
`;