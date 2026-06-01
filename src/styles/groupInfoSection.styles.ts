import styled from "styled-components";
import type { AppTheme } from "./theme";

export const GroupImageContainer = styled.div`
  position: relative;
  width: 8rem;
  height: 8rem;
  margin-bottom: 1.5rem;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid ${({ theme }: { theme: AppTheme }) => theme.cardBorder};

  img {
    width: 100%;
    height: 100%;
    border-radius: 12px;
    object-fit: cover;
    border: 3px solid ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
    transition: transform 0.2s;
  }

  &:hover img {
    transform: scale(1.05);
  }

  @media (max-width: 640px) {
    width: 7rem;
    height: 7rem;
    margin-bottom: 1.25rem;
  }
`;

export const ImageUploadButton = styled.button`
  position: absolute;
  bottom: -8px;
  right: -8px;
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  border: 3px solid ${({ theme }: { theme: AppTheme }) => theme.body};
  color: white;
  border-radius: 50%;
  width: 2.75rem;
  height: 2.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
  font-size: 1.1rem;
  padding: 0;

  &:hover:not(:disabled) {
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(139, 92, 246, 0.5);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 640px) {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1rem;
    bottom: -4px;
    right: -4px;
  }
`;

export const InputGroup = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-size: 0.875rem;
    font-weight: 600;
    color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
    display: flex;
    align-items: center;
    gap: 0.375rem;
  }

  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
    border-radius: 8px;
    font-size: 1rem;
    outline: none;
    transition: all 0.2s;
    font-family: inherit;
    box-sizing: border-box;
    background: ${({ theme }: { theme: AppTheme }) => theme.body};
    color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};

    &:focus {
      border-color: #8b5cf6;
      box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
    }

    &:disabled {
      background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
      cursor: not-allowed;
      color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
    }

    &::placeholder {
      color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
    }
  }

  small {
    font-size: 0.75rem;
    color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
    margin-top: 0.25rem;
  }

  @media (max-width: 640px) {
    margin-bottom: 1.25rem;

    input {
      padding: 0.625rem;
      font-size: 0.95rem;
    }
  }
`;

export const SaveButton = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 4px 6px rgba(139, 92, 246, 0.3);
  font-family: inherit;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(139, 92, 246, 0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 640px) {
    padding: 0.625rem 0.75rem;
    font-size: 0.9rem;
    margin-bottom: 1.25rem;
  }
`;

export const InfoBanner = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  border-radius: 8px;
  margin-bottom: 1rem;
  color: #8b5cf6;

  svg {
    flex-shrink: 0;
    margin-top: 0.125rem;
    color: #8b5cf6;
  }

  .info-text {
    font-size: 0.875rem;
    line-height: 1.4;
    color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
  }

  @media (max-width: 640px) {
    padding: 0.625rem 0.75rem;
    gap: 0.5rem;

    .info-text {
      font-size: 0.8rem;
    }
  }
`;