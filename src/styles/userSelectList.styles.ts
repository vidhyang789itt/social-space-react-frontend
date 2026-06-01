import styled from "styled-components";
import type { AppTheme } from "./theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  overflow: hidden;
  min-height: 0;

  @media (max-width: 768px) {
    gap: 0.75rem;
  }

  @media (max-width: 640px) {
    gap: 0.5rem;
  }

  @media (max-width: 480px) {
    gap: 0.4rem;
  }
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  flex-shrink: 0;

  input {
    width: 100%;
    padding: 0.875rem 1rem 0.875rem 2.75rem;
    border: 2px solid ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
    border-radius: 10px;
    font-size: 1rem;
    outline: none;
    transition: all 0.2s;
    font-family: inherit;
    background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
    color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};

    &:focus {
      border-color: #8b5cf6;
      box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
    }

    &:disabled {
      background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
      cursor: not-allowed;
      color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
    }

    &::placeholder {
      color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
    }
  }

  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
    pointer-events: none;
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    input {
      padding: 0.75rem 0.875rem 0.75rem 2.5rem;
      font-size: 0.95rem;
    }

    svg {
      left: 0.875rem;
    }
  }

  @media (max-width: 640px) {
    input {
      padding: 0.65rem 0.75rem 0.65rem 2.25rem;
      font-size: 0.9rem;
    }

    svg {
      left: 0.75rem;
      width: 16px;
      height: 16px;
    }
  }

  @media (max-width: 480px) {
    input {
      padding: 0.6rem 0.65rem 0.6rem 2rem;
      font-size: 0.85rem;
    }

    svg {
      left: 0.65rem;
      width: 14px;
      height: 14px;
    }
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 100%;
  min-height: 150px;
  overflow-y: auto;
  border: 2px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  border-radius: 10px;
  background: ${({ theme }: { theme: AppTheme }) => theme.body};
  padding: 0.5rem;
  flex: 1;
  min-height: 0;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }: { theme: AppTheme }) => theme.divider};
    border-radius: 3px;

    &:hover {
      background: ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
    }
  }

  @media (max-width: 768px) {
    gap: 0.4rem;
    padding: 0.375rem;
    min-height: 120px;
  }

  @media (max-width: 640px) {
    gap: 0.3rem;
    padding: 0.3rem;
    min-height: 100px;
  }

  @media (max-width: 480px) {
    gap: 0.25rem;
    padding: 0.25rem;
    min-height: 80px;
  }
`;

export const Item = styled.div<{ $selected?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: ${({ $selected }: { $selected?: boolean; theme: AppTheme }) =>
    $selected ? "rgba(139, 92, 246, 0.08)" : "transparent"};
  border-radius: 8px;
  transition: all 0.2s;
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
  }

  .user-card {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex: 1;
    min-width: 0;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 6px;
    transition: all 0.2s;

    &:hover {
      background: rgba(139, 92, 246, 0.05);
    }

    img {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
      flex-shrink: 0;
      transition: transform 0.2s;

      &:hover {
        transform: scale(1.1);
        border-color: #8b5cf6;
      }
    }

    .user-info {
      flex: 1;
      min-width: 0;

      .user-name {
        font-weight: 500;
        font-size: 0.9rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
      }

      .user-status {
        font-size: 0.75rem;
        color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
        margin-top: 0.125rem;
      }
    }

    .profile-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.75rem;
      height: 1.75rem;
      border-radius: 4px;
      background: transparent;
      border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
      color: #8b5cf6;
      cursor: pointer;
      transition: all 0.2s;
      flex-shrink: 0;
      padding: 0;

      &:hover {
        background: rgba(139, 92, 246, 0.1);
        border-color: #8b5cf6;
        transform: translateX(2px);
      }

      svg {
        width: 1rem;
        height: 1rem;
      }
    }
  }

  .checkbox {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 6px;
    border: 2px solid
      ${({ $selected, theme }: { $selected?: boolean; theme: AppTheme }) =>
        $selected ? "#8b5cf6" : theme.divider};
    background: ${({ $selected }: { $selected?: boolean }) =>
      $selected ? "#8b5cf6" : "transparent"};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all 0.2s;
    cursor: pointer;

    svg {
      color: white;
      width: 1rem;
      height: 1rem;
      opacity: ${({ $selected }: { $selected?: boolean }) => ($selected ? 1 : 0)};
    }
  }

  @media (max-width: 768px) {
    padding: 0.625rem;
    gap: 0.625rem;

    .user-card {
      padding: 0.375rem;
      gap: 0.625rem;

      img {
        width: 2.25rem;
        height: 2.25rem;
      }

      .user-info {
        .user-name {
          font-size: 0.85rem;
        }

        .user-status {
          font-size: 0.7rem;
        }
      }

      .profile-link {
        width: 1.5rem;
        height: 1.5rem;

        svg {
          width: 0.875rem;
          height: 0.875rem;
        }
      }
    }

    .checkbox {
      width: 1.375rem;
      height: 1.375rem;

      svg {
        width: 0.875rem;
        height: 0.875rem;
      }
    }
  }

  @media (max-width: 640px) {
    padding: 0.5rem;
    gap: 0.5rem;

    .user-card {
      padding: 0.3rem;
      gap: 0.5rem;

      img {
        width: 2rem;
        height: 2rem;
      }

      .user-info {
        .user-name {
          font-size: 0.8rem;
        }

        .user-status {
          font-size: 0.65rem;
        }
      }

      .profile-link {
        width: 1.375rem;
        height: 1.375rem;

        svg {
          width: 0.8rem;
          height: 0.8rem;
        }
      }
    }

    .checkbox {
      width: 1.25rem;
      height: 1.25rem;

      svg {
        width: 0.8rem;
        height: 0.8rem;
      }
    }
  }

  @media (max-width: 480px) {
    padding: 0.4rem;
    gap: 0.4rem;

    .user-card {
      padding: 0.25rem;
      gap: 0.4rem;

      img {
        width: 1.75rem;
        height: 1.75rem;
      }

      .user-info {
        .user-name {
          font-size: 0.75rem;
        }

        .user-status {
          font-size: 0.6rem;
        }
      }

      .profile-link {
        width: 1.25rem;
        height: 1.25rem;

        svg {
          width: 0.7rem;
          height: 0.7rem;
        }
      }
    }

    .checkbox {
      width: 1.125rem;
      height: 1.125rem;

      svg {
        width: 0.7rem;
        height: 0.7rem;
      }
    }
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
  text-align: center;
  min-height: 200px;
  flex: 1;
  background: ${({ theme }: { theme: AppTheme }) => theme.body};

  svg {
    width: 3rem;
    height: 3rem;
    margin-bottom: 1rem;
    opacity: 0.5;
    color: ${({ theme }: { theme: AppTheme }) => theme.divider};
  }

  .title {
    font-weight: 600;
    color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
    margin-bottom: 0.5rem;
  }

  .description {
    font-size: 0.875rem;
    color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
  }

  @media (max-width: 768px) {
    padding: 1.5rem 0.75rem;
    min-height: 150px;

    svg {
      width: 2.5rem;
      height: 2.5rem;
      margin-bottom: 0.75rem;
    }

    .title {
      font-size: 0.95rem;
      margin-bottom: 0.375rem;
    }

    .description {
      font-size: 0.8rem;
    }
  }

  @media (max-width: 640px) {
    padding: 1.25rem 0.625rem;
    min-height: 120px;

    svg {
      width: 2rem;
      height: 2rem;
      margin-bottom: 0.5rem;
    }

    .title {
      font-size: 0.85rem;
      margin-bottom: 0.3rem;
    }

    .description {
      font-size: 0.75rem;
    }
  }

  @media (max-width: 480px) {
    padding: 1rem 0.5rem;
    min-height: 100px;

    svg {
      width: 1.75rem;
      height: 1.75rem;
      margin-bottom: 0.4rem;
    }

    .title {
      font-size: 0.75rem;
      margin-bottom: 0.25rem;
    }

    .description {
      font-size: 0.65rem;
    }
  }
`;