import styled from "styled-components";
import type { AppTheme } from "./theme";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(1rem, 3vw, 2rem);
  height: 100%;
  overflow: hidden;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.875rem;
    overflow-y: auto;
    height: auto;
  }
`;

export const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  gap: clamp(1rem, 2vw, 1.25rem);

  @media (max-width: 1024px) {
    height: auto;
    max-height: 50vh;
  }

  @media (max-width: 768px) {
    max-height: none;
    gap: 0.875rem;
  }
`;

export const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  gap: clamp(1rem, 2vw, 1.25rem);

  @media (max-width: 1024px) {
    height: auto;
    max-height: 45vh;
  }

  @media (max-width: 768px) {
    max-height: none;
    gap: 0.875rem;
  }
`;

export const FormContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: clamp(0.5rem, 1vw, 1rem);

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

  @media (max-width: 768px) {
    height: auto;
    padding-right: 0;
  }
`;

export const PreviewContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
  border-radius: clamp(10px, 3vw, 16px);
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
  overflow: hidden;
  box-shadow: 0 clamp(4px, 2vw, 10px) clamp(16px, 5vw, 40px) rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;

  @media (max-width: 1024px) {
    max-height: 45vh;
  }

  @media (max-width: 768px) {
    border-radius: 12px;
    max-height: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }

  @media (max-width: 480px) {
    border-radius: 10px;
  }
`;

export const PreviewHeader = styled.div`
  padding: clamp(1rem, 3vw, 1.25rem);
  border-bottom: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  background: ${({ theme }: { theme: AppTheme }) => theme.body};
  flex-shrink: 0;

  h3 {
    margin: 0;
    font-size: clamp(14px, 3vw, 16px);
    font-weight: 700;
    color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  }

  @media (max-width: 640px) {
    padding: 0.875rem;

    h3 {
      font-size: 14px;
    }
  }
`;

export const PreviewContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: clamp(1rem, 3vw, 1.5rem);
  display: flex;
  flex-direction: column;
  gap: clamp(0.875rem, 2vw, 1.25rem);

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
    padding: 1rem;
    gap: 0.75rem;
  }
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(0.875rem, 2vw, 1rem);
  padding: clamp(1rem, 2vw, 1.25rem);
  background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
  border-radius: clamp(8px, 2vw, 12px);

  h3 {
    margin: 0;
    font-size: clamp(13px, 3vw, 15px);
    font-weight: 700;
    color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  }

  @media (max-width: 640px) {
    padding: 1rem;
    gap: 0.875rem;

    h3 {
      font-size: 13px;
    }
  }
`;

export const TextareaField = styled.textarea`
  width: 100%;
  min-height: clamp(100px, 30vh, 200px);
  padding: clamp(0.75rem, 2vw, 1rem);
  background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
  border-radius: clamp(6px, 2vw, 8px);
  color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  font-size: clamp(13px, 2vw, 14px);
  font-family: inherit;
  resize: vertical;
  outline: none;
  transition: all 0.2s ease;

  &::placeholder {
    color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
    opacity: 0.7;
  }

  &:focus {
    border-color: ${({ theme }: { theme: AppTheme }) => theme.accent};
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.08);
  }

  &:disabled {
    background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
    cursor: not-allowed;
    opacity: 0.6;
  }

  @media (max-width: 640px) {
    min-height: 120px;
    padding: 0.75rem;
    font-size: 13px;
  }
`;

export const InputField = styled.input`
  width: 100%;
  padding: clamp(0.75rem, 2vw, 0.875rem);
  background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
  border-radius: clamp(6px, 2vw, 8px);
  color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  font-size: clamp(13px, 2vw, 14px);
  font-family: inherit;
  outline: none;
  transition: all 0.2s ease;
  box-sizing: border-box;
  min-height: 44px;

  &::placeholder {
    color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
    opacity: 0.7;
  }

  &:focus {
    border-color: ${({ theme }: { theme: AppTheme }) => theme.accent};
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.08);
  }

  &:disabled {
    background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
    cursor: not-allowed;
    opacity: 0.6;
  }

  @media (max-width: 640px) {
    padding: 0.75rem;
    font-size: 13px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: clamp(0.75rem, 2vw, 1rem);
  padding: clamp(1rem, 2vw, 1.25rem);
  background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
  border-top: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  border-radius: clamp(8px, 2vw, 12px);

  button {
    flex: 1;
    padding: clamp(0.75rem, 2vw, 0.875rem) clamp(1rem, 3vw, 1.5rem);
    border-radius: clamp(6px, 2vw, 8px);
    font-weight: 700;
    font-size: clamp(12px, 2vw, 14px);
    cursor: pointer;
    border: none;
    transition: all 0.2s ease;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &.primary {
      background: linear-gradient(135deg, ${({ theme }: { theme: AppTheme }) => theme.accent} 0%, #7c3aed 100%);
      color: white;

      &:hover:not(:disabled) {
        box-shadow: 0 4px 12px rgba(139, 92, 246, 0.2);
      }

      &:active:not(:disabled) {
        transform: scale(0.98);
      }
    }

    &.secondary {
      background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
      color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
      border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.cardBorder};

      &:hover:not(:disabled) {
        background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
        border-color: ${({ theme }: { theme: AppTheme }) => theme.accent};
      }

      &:active:not(:disabled) {
        transform: scale(0.98);
      }
    }
  }

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 0.75rem;
    padding: 1rem;
  }
`;

export const LeftPanelContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 2vw, 1.25rem);
  flex: 1;
  overflow-y: auto;
  padding-right: clamp(0.5rem, 1vw, 1rem);

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

  @media (max-width: 768px) {
    padding-right: 0;
  }
`;

export const FeatureList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: clamp(0.75rem, 2vw, 1rem);
`;

export const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: clamp(0.75rem, 2vw, 1rem);
  padding: clamp(0.875rem, 2vw, 1rem);
  background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
  border-radius: clamp(6px, 2vw, 8px);
  font-size: clamp(12px, 2vw, 13px);
  color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
  line-height: 1.5;

  svg {
    width: clamp(18px, 4vw, 20px);
    height: clamp(18px, 4vw, 20px);
    color: ${({ theme }: { theme: AppTheme }) => theme.accent};
    flex-shrink: 0;
    margin-top: 2px;
  }

  @media (max-width: 640px) {
    padding: 0.75rem;
    gap: 0.75rem;
    font-size: 12px;
  }
`;

export const Tips = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(0.75rem, 2vw, 1rem);
  padding: clamp(1rem, 2vw, 1.25rem);
  background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
  border-radius: clamp(8px, 2vw, 12px);

  h4 {
    margin: 0;
    font-size: clamp(13px, 2vw, 14px);
    font-weight: 700;
    color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  }

  p {
    margin: 0;
    font-size: clamp(12px, 2vw, 13px);
    color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
    line-height: 1.5;
  }

  @media (max-width: 640px) {
    padding: 1rem;

    h4 {
      font-size: 13px;
    }

    p {
      font-size: 12px;
    }
  }
`;

export const Label = styled.label`
  display: block;
  font-size: clamp(12px, 2vw, 13px);
  font-weight: 700;
  color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  margin-bottom: clamp(0.5rem, 1vw, 0.75rem);

  span {
    color: #dc2626;
    margin-left: 2px;
  }
`;

export const UploadArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(0.75rem, 2vw, 1rem);
  padding: clamp(1.5rem, 3vw, 2rem);
  background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
  border: 2px dashed ${({ theme }: { theme: AppTheme }) => theme.divider};
  border-radius: clamp(8px, 2vw, 12px);
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 120px;

  &:hover {
    border-color: ${({ theme }: { theme: AppTheme }) => theme.accent};
    background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
  }

  svg {
    width: clamp(32px, 8vw, 48px);
    height: clamp(32px, 8vw, 48px);
    color: ${({ theme }: { theme: AppTheme }) => theme.accent};
    opacity: 0.7;
  }

  p {
    margin: 0;
    font-size: clamp(12px, 2vw, 13px);
    color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
    text-align: center;
    line-height: 1.5;
  }

  @media (max-width: 640px) {
    padding: 1.25rem;
    min-height: 100px;
  }
`;

export const PageWrapper = styled.div`
  height: calc(100vh - clamp(60px, 10vh, 72px));
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.textPrimary};
  width: 100%;
  transition: background 0.2s ease;
  padding: clamp(1rem, 4vw, 2rem);
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  align-items: flex-start;
  justify-content: center;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.divider};
    border-radius: 3px;

    &:hover {
      background: ${({ theme }) => theme.cardBorder};
    }
  }

  @media (min-width: 1025px) {
    padding: clamp(2rem, 5vw, 3rem);
    height: calc(100vh - clamp(64px, 10vh, 72px));
  }

  @media (max-width: 1024px) and (min-width: 769px) {
    padding: clamp(1.5rem, 4vw, 2rem);
    height: calc(100vh - clamp(60px, 10vh, 72px));
  }

  @media (max-width: 768px) {
    padding: clamp(1rem, 3vw, 1.25rem);
    padding-bottom: clamp(80px, 15vw, 100px);
    height: auto;
    min-height: calc(100vh - 60px);
    overflow-y: visible;
    flex-direction: column;
  }

  @media (max-width: 480px) {
    padding: clamp(0.75rem, 2vw, 1rem);
    padding-bottom: clamp(70px, 12vw, 80px);
    margin-top: 0;
    min-height: calc(100vh - 56px);
  }
`;