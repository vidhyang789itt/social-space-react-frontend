import styled from "styled-components";
import type { AppTheme } from "./theme";

export const MemberListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 35vh;
  min-height: 150px;
  overflow-y: auto;
  background: ${({ theme }: { theme: AppTheme }) => theme.body};

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

  @media (max-width: 640px) {
    max-height: 30vh;
    min-height: 120px;
    gap: 0.375rem;
  }
`;

export const MemberItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
  border-radius: 8px;
  transition: all 0.2s;
  border: 1px solid transparent;

  &:hover {
    background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
    border-color: ${({ theme }: { theme: AppTheme }) => theme.divider};
    padding-left: 1rem;
  }

  .member-card {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex: 1;
    min-width: 0;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 6px;
    transition: all 0.2s;
    position: relative;

    &:hover {
      background: rgba(139, 92, 246, 0.05);
    }

    img {
      width: 2.75rem;
      height: 2.75rem;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
      flex-shrink: 0;
      transition: transform 0.2s;
    }

    &:hover img {
      transform: scale(1.05);
      border-color: #8b5cf6;
    }

    .member-info {
      flex: 1;
      min-width: 0;

      .member-name {
        font-weight: 500;
        font-size: 0.9rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
      }

      .member-meta {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-top: 0.25rem;
        font-size: 0.75rem;
      }

      .member-role {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        color: #8b5cf6;
        font-weight: 500;
        background: rgba(139, 92, 246, 0.1);
        padding: 0.125rem 0.375rem;
        border-radius: 4px;
      }

      .you-badge {
        color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
        background: ${({ theme }: { theme: AppTheme }) => theme.divider};
        padding: 0.125rem 0.375rem;
        border-radius: 4px;
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

      &:active {
        transform: translateX(0);
      }

      svg {
        width: 1rem;
        height: 1rem;
      }
    }
  }

  .member-actions {
    display: flex;
    gap: 0.5rem;

    button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.375rem;
      color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;

      &:hover:not(:disabled) {
        color: #ef4444;
        background: rgba(239, 68, 68, 0.1);
      }

      &:active:not(:disabled) {
        background: rgba(239, 68, 68, 0.2);
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }

  @media (max-width: 640px) {
    padding: 0.625rem;
    gap: 0.625rem;

    &:hover {
      padding-left: 0.75rem;
    }

    .member-card {
      padding: 0.375rem;

      img {
        width: 2.5rem;
        height: 2.5rem;
      }

      .member-info .member-name {
        font-size: 0.85rem;
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

    .member-actions {
      gap: 0.375rem;

      button {
        padding: 0.3rem;
      }
    }
  }
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid ${({ theme }: { theme: AppTheme }) => theme.divider};

  h3 {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  button {
    background: ${({ theme }: { theme: AppTheme }) => theme.body};
    border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
    cursor: pointer;
    color: #8b5cf6;
    font-size: 0.875rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.5rem 0.75rem;
    transition: all 0.2s;
    border-radius: 6px;
    font-family: inherit;

    &:hover:not(:disabled) {
      background: rgba(139, 92, 246, 0.1);
      border-color: #8b5cf6;
      transform: translateY(-1px);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  @media (max-width: 640px) {
    margin-bottom: 0.75rem;
    padding-bottom: 0.5rem;

    h3 {
      font-size: 0.95rem;
    }

    button {
      padding: 0.375rem 0.625rem;
      font-size: 0.8rem;
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
  min-height: 150px;
  background: ${({ theme }: { theme: AppTheme }) => theme.body};

  svg {
    width: 2.5rem;
    height: 2.5rem;
    margin-bottom: 0.75rem;
    opacity: 0.5;
    color: ${({ theme }: { theme: AppTheme }) => theme.divider};
  }

  .text {
    font-size: 0.875rem;
    color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
  }
`;