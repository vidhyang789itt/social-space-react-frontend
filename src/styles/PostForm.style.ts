import styled from "styled-components";
import type { AppTheme } from "./theme";

interface CharCountProps {
  $isWarning?: boolean;
}

interface FileUploadAreaProps {
  $hasPreview?: boolean;
}

export const FormWrapper = styled.form`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
  border-radius: clamp(10px, 3vw, 16px);
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  overflow: hidden;
  box-shadow: 0 clamp(4px, 2vw, 10px) clamp(16px, 5vw, 40px) rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;

  @media (max-width: 768px) {
    border-radius: 12px;
    height: auto;
  }

  @media (max-width: 480px) {
    border-radius: 10px;
  }
`;

export const FormHeader = styled.div`
  padding: clamp(1rem, 3vw, 1.25rem) clamp(1.25rem, 4vw, 1.75rem);
  background: linear-gradient(
    135deg,
    ${({ theme }: { theme: AppTheme }) => theme.accent}08 0%,
    ${({ theme }: { theme: AppTheme }) => theme.accent}04 100%
  );
  border-bottom: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  flex-shrink: 0;

  h2 {
    margin: 0;
    font-size: clamp(18px, 5vw, 22px);
    font-weight: 700;
    color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  }

  p {
    margin: clamp(0.375rem, 1vw, 0.5rem) 0 0 0;
    font-size: clamp(12px, 2vw, 14px);
    color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    padding: 1rem;

    h2 {
      font-size: 18px;
    }

    p {
      font-size: 12px;
    }
  }

  @media (max-width: 480px) {
    padding: 0.875rem;
  }
`;

export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 2vw, 1.5rem);
  padding: clamp(1.25rem, 3vw, 1.75rem);
  overflow-y: auto;
  overflow-x: hidden;
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

  @media (max-width: 768px) {
    gap: 1rem;
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.875rem;
  }
`;

export const FormFooter = styled.div`
  display: flex;
  gap: clamp(0.75rem, 2vw, 1rem);
  padding: clamp(1rem, 2vw, 1.5rem);
  background: ${({ theme }: { theme: AppTheme }) => theme.body};
  border-top: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  flex-shrink: 0;

  @media (max-width: 640px) {
    flex-direction: column-reverse;
    gap: 0.75rem;
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.875rem;
  }
`;

export const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(0.375rem, 1vw, 0.5rem);

  label {
    font-size: clamp(12px, 2vw, 14px);
    font-weight: 700;
    color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
    display: flex;
    align-items: center;
    gap: clamp(0.375rem, 1vw, 0.5rem);

    &::before {
      content: "";
      width: 4px;
      height: 4px;
      background: ${({ theme }: { theme: AppTheme }) => theme.accent};
      border-radius: 50%;
      flex-shrink: 0;
    }
  }

  @media (max-width: 480px) {
    gap: 0.375rem;

    label {
      font-size: 12px;
    }
  }
`;

export const ContentGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(0.375rem, 1vw, 0.5rem);

  label {
    font-size: clamp(12px, 2vw, 14px);
    font-weight: 700;
    color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
    display: flex;
    align-items: center;
    gap: clamp(0.375rem, 1vw, 0.5rem);

    &::before {
      content: "";
      width: 4px;
      height: 4px;
      background: ${({ theme }: { theme: AppTheme }) => theme.accent};
      border-radius: 50%;
      flex-shrink: 0;
    }
  }

  @media (max-width: 480px) {
    gap: 0.375rem;

    label {
      font-size: 12px;
    }
  }
`;

export const Input = styled.input`
  padding: clamp(0.75rem, 2vw, 0.875rem);
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  border-radius: clamp(6px, 2vw, 8px);
  background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
  color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  font-size: clamp(13px, 2vw, 14px);
  font-family: inherit;
  transition: all 0.2s ease;
  box-sizing: border-box;
  min-height: 44px;

  &:focus {
    outline: none;
    border-color: ${({ theme }: { theme: AppTheme }) => theme.accent};
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.08);
    background: ${({ theme }: { theme: AppTheme }) => theme.body};
  }

  &::placeholder {
    color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
    opacity: 0.7;
  }

  @media (max-width: 480px) {
    font-size: 13px;
    padding: 0.75rem;
  }
`;

export const TextArea = styled.textarea`
  padding: clamp(0.75rem, 2vw, 0.875rem);
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  border-radius: clamp(6px, 2vw, 8px);
  background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
  color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  font-size: clamp(13px, 2vw, 14px);
  font-family: inherit;
  resize: none;
  min-height: clamp(120px, 25vh, 200px);
  max-height: clamp(200px, 35vh, 300px);
  transition: all 0.2s ease;
  line-height: 1.6;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${({ theme }: { theme: AppTheme }) => theme.accent};
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.08);
    background: ${({ theme }: { theme: AppTheme }) => theme.body};
  }

  &::placeholder {
    color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
    opacity: 0.7;
  }

  @media (max-width: 768px) {
    min-height: 120px;
  }

  @media (max-width: 480px) {
    padding: 0.75rem;
    font-size: 13px;
    min-height: 100px;
  }
`;

export const CharCount = styled.span<CharCountProps>`
  font-size: clamp(11px, 2vw, 12px);
  color: ${({ $isWarning, theme }: CharCountProps & { theme: AppTheme }) =>
    $isWarning ? "#dc2626" : theme.textSecondary};
  text-align: right;
  transition: color 0.2s ease;
  margin-top: clamp(-0.25rem, -1vw, 0);
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const SubmitButton = styled.button`
  flex: 1;
  padding: clamp(0.75rem, 2vw, 0.875rem) clamp(1.5rem, 3vw, 2rem);
  background: linear-gradient(
    135deg,
    ${({ theme }: { theme: AppTheme }) => theme.accent} 0%,
    #7c3aed 100%
  );
  color: white;
  border: none;
  border-radius: clamp(6px, 2vw, 8px);
  font-weight: 700;
  font-size: clamp(12px, 2vw, 14px);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(0.5rem, 1vw, 0.75rem);
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  min-height: 44px;

  &:hover:not(:disabled) {
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 640px) {
    width: 100%;
  }

  @media (max-width: 480px) {
    padding: 0.75rem 1.25rem;
  }
`;

export const CancelButton = styled.button`
  flex: 1;
  padding: clamp(0.75rem, 2vw, 0.875rem) clamp(1.5rem, 3vw, 2rem);
  background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
  color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  border-radius: clamp(6px, 2vw, 8px);
  font-weight: 700;
  font-size: clamp(12px, 2vw, 14px);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  min-height: 44px;

  &:hover:not(:disabled) {
    background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
    border-color: ${({ theme }: { theme: AppTheme }) => theme.accent};
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 640px) {
    width: 100%;
  }

  @media (max-width: 480px) {
    padding: 0.75rem 1.25rem;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: clamp(0.75rem, 2vw, 1rem);
  right: clamp(0.75rem, 2vw, 1rem);
  background: ${({ theme }: { theme: AppTheme }) => theme.divider};
  border: none;
  color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  border-radius: 6px;
  padding: clamp(0.375rem, 1vw, 0.5rem);
  cursor: pointer;
  transition: all 0.2s ease;
  display: none;
  min-height: 44px;
  min-width: 44px;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background: ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  svg {
    width: clamp(16px, 4vw, 20px);
    height: clamp(16px, 4vw, 20px);
  }
`;

export const FileUploadArea = styled.div<FileUploadAreaProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(0.75rem, 2vw, 1rem);
  padding: clamp(1rem, 3vw, 1.5rem);
  border: 2px dashed ${({ theme }: { theme: AppTheme }) => theme.divider};
  border-radius: clamp(8px, 2vw, 12px);
  background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: clamp(100px, 20vh, 150px);

  &:hover {
    border-color: ${({ theme }: { theme: AppTheme }) => theme.accent};
    background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
  }

  p {
    margin: 0;
    font-size: clamp(12px, 2vw, 14px);
    color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
    text-align: center;
    line-height: 1.5;
  }

  svg {
    width: clamp(32px, 8vw, 48px);
    height: clamp(32px, 8vw, 48px);
    color: ${({ theme }: { theme: AppTheme }) => theme.accent};
    opacity: 0.7;
  }

  @media (max-width: 480px) {
    min-height: 100px;
    padding: 1rem;
  }
`;

export const PreviewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: clamp(0.75rem, 2vw, 1rem);
  padding: clamp(1rem, 2vw, 1.25rem);
  background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
  border-radius: clamp(8px, 2vw, 12px);
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};

  @media (max-width: 480px) {
    gap: 0.75rem;
    padding: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
  }
`;

export const PreviewImage = styled.div`
  position: relative;
  aspect-ratio: 1;
  border-radius: clamp(6px, 2vw, 8px);
  overflow: hidden;
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};

  img,
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  button {
    position: absolute;
    top: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
    border: none;
    color: white;
    padding: clamp(0.25rem, 1vw, 0.375rem);
    cursor: pointer;
    border-radius: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 32px;
    min-width: 32px;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(0, 0, 0, 0.9);
    }

    &:active:not(:disabled) {
      transform: scale(0.95);
    }

    svg {
      width: clamp(14px, 3vw, 16px);
      height: clamp(14px, 3vw, 16px);
    }
  }
`;

export const HelperText = styled.p`
  margin: 0;
  font-size: clamp(11px, 2vw, 12px);
  color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
  line-height: 1.5;
`;

export const ErrorText = styled.p`
  margin: clamp(0.375rem, 1vw, 0.5rem) 0 0 0;
  font-size: clamp(11px, 2vw, 12px);
  color: #dc2626;
  line-height: 1.5;
`;

export const SuccessText = styled.p`
  margin: clamp(0.375rem, 1vw, 0.5rem) 0 0 0;
  font-size: clamp(11px, 2vw, 12px);
  color: #16a34a;
  line-height: 1.5;
`;

export const InfoBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: clamp(0.75rem, 2vw, 1rem);
  padding: clamp(0.75rem, 2vw, 1rem);
  background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  border-radius: clamp(6px, 2vw, 8px);

  svg {
    width: clamp(18px, 4vw, 20px);
    height: clamp(18px, 4vw, 20px);
    color: ${({ theme }: { theme: AppTheme }) => theme.accent};
    flex-shrink: 0;
    margin-top: 2px;
  }

  p {
    margin: 0;
    font-size: clamp(12px, 2vw, 13px);
    color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
    line-height: 1.5;
  }

  @media (max-width: 480px) {
    gap: 0.75rem;
    padding: 0.75rem;
  }
`;