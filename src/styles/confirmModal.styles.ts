import styled from "styled-components";
import type { AppTheme } from "./theme";

const slideDown = `
  @keyframes slideDown {
    from {
      transform: translateY(-50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
  padding: clamp(1rem, 4vw, 2rem);
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: 640px) {
    padding: 1rem;
  }
`;

export const ModalContent = styled.div`
  background: ${({ theme }: { theme: AppTheme }) => theme.body};
  border-radius: clamp(8px, 3vw, 12px);
  padding: clamp(1.5rem, 4vw, 2rem);
  max-width: clamp(300px, 90vw, 500px);
  width: 100%;
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
  box-shadow: 0 clamp(10px, 5vw, 20px) clamp(30px, 8vw, 60px) rgba(0, 0, 0, 0.15);
  animation: slideDown 0.3s ease-out;
  max-height: clamp(60vh, 90vh, 90vh);
  overflow-y: auto;

  ${slideDown}

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
    padding: 1.25rem;
    border-radius: 12px;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: clamp(1rem, 3vw, 1.5rem);
  padding-bottom: clamp(0.75rem, 2vw, 1rem);
  border-bottom: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};

  h2 {
    margin: 0;
    font-size: clamp(18px, 5vw, 22px);
    font-weight: 700;
    color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
    padding: clamp(0.25rem, 1vw, 0.5rem);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
      background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
      color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
    }

    &:active:not(:disabled) {
      transform: scale(0.95);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    svg {
      width: clamp(18px, 4vw, 24px);
      height: clamp(18px, 4vw, 24px);
    }
  }

  @media (max-width: 640px) {
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;

    h2 {
      font-size: 18px;
    }
  }
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(1.5rem, 3vw, 2rem);
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(0.75rem, 2vw, 1rem);
  margin-bottom: clamp(1rem, 3vw, 1.5rem);
  padding-bottom: clamp(0.75rem, 2vw, 1rem);
  border-bottom: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};

  .icon {
    color: ${({ theme }: { theme: AppTheme }) => theme.accent};
    opacity: 0.8;
    flex-shrink: 0;
    width: clamp(20px, 5vw, 24px);
    height: clamp(20px, 5vw, 24px);
  }

  h2 {
    margin: 0;
    font-size: clamp(16px, 4vw, 18px);
    font-weight: 700;
    color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  }

  @media (max-width: 640px) {
    gap: 0.75rem;
    margin-bottom: 1rem;
  }
`;

export const Message = styled.p`
  margin: 0 0 clamp(1rem, 3vw, 1.5rem) 0;
  font-size: clamp(13px, 3vw, 14px);
  color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
  line-height: 1.6;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: clamp(0.75rem, 2vw, 1rem);
  padding-top: clamp(1rem, 3vw, 1.5rem);
  border-top: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};

  button {
    flex: 1;
    padding: clamp(0.75rem, 2vw, 0.875rem) clamp(1rem, 3vw, 1.25rem);
    border-radius: clamp(6px, 2vw, 8px);
    font-size: clamp(13px, 3vw, 14px);
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    min-height: 44px;

    &.cancel {
      background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
      color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
      border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.cardBorder};

      &:hover:not(:disabled) {
        background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
        border-color: ${({ theme }: { theme: AppTheme }) => theme.divider};
      }

      &:active:not(:disabled) {
        transform: scale(0.98);
      }
    }

    &.confirm {
      background: ${({ theme }: { theme: AppTheme }) => theme.accent};
      color: white;

      &:hover:not(:disabled) {
        box-shadow: 0 4px 12px rgba(139, 92, 246, 0.2);
      }

      &:active:not(:disabled) {
        transform: scale(0.98);
      }
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    @media (max-width: 640px) {
      padding: 0.75rem 1rem;
      font-size: 13px;
    }
  }

  @media (max-width: 640px) {
    gap: 0.75rem;
    padding-top: 1rem;
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(0.875rem, 2vw, 1.25rem);
  padding: clamp(1rem, 3vw, 1.5rem);
  background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
  border-radius: clamp(8px, 2vw, 12px);

  h3 {
    margin: 0;
    font-size: clamp(16px, 4vw, 18px);
    font-weight: 700;
    color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
    display: flex;
    align-items: center;
    gap: clamp(0.5rem, 2vw, 0.75rem);
  }

  @media (max-width: 640px) {
    padding: 1rem;
    gap: 0.875rem;

    h3 {
      font-size: 16px;
    }
  }
`;

export const LeaveGroupButton = styled.button`
  width: 100%;
  padding: clamp(0.875rem, 2vw, 1rem);
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  border: none;
  border-radius: clamp(8px, 2vw, 12px);
  font-size: clamp(13px, 3vw, 14px);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 44px;

  &:hover:not(:disabled) {
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 640px) {
    padding: 0.875rem;
    font-size: 13px;
  }
`;

export const DeleteGroupButton = styled(LeaveGroupButton)`
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);

  &:hover:not(:disabled) {
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
  }
`;

export const InfoBanner = styled.div`
  display: flex;
  align-items: flex-start;
  gap: clamp(0.75rem, 2vw, 1rem);
  padding: clamp(0.875rem, 2vw, 1rem);
  background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
  border-radius: clamp(6px, 2vw, 8px);
  color: ${({ theme }: { theme: AppTheme }) => theme.accent};

  svg {
    flex-shrink: 0;
    width: clamp(18px, 4vw, 20px);
    height: clamp(18px, 4vw, 20px);
    opacity: 0.8;
  }

  .info-text {
    font-size: clamp(12px, 3vw, 13px);
    line-height: 1.5;
    color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
  }

  @media (max-width: 640px) {
    padding: 0.75rem;
    gap: 0.75rem;

    .info-text {
      font-size: 12px;
    }
  }
`;