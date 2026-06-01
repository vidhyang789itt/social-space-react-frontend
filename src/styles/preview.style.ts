import styled from "styled-components";
import type { AppTheme } from "./theme";

export const PreviewContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
  border-radius: clamp(10px, 3vw, 16px);
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  overflow: hidden;
  box-shadow: 0 clamp(4px, 2vw, 10px) clamp(16px, 5vw, 40px) rgba(0, 0, 0, 0.08);
  min-width: 0;

  @media (max-width: 768px) {
    border-radius: 12px;
  }

  @media (max-width: 480px) {
    border-radius: 10px;
  }
`;

export const PreviewHeader = styled.div`
  padding: clamp(1rem, 3vw, 1.25rem) clamp(1.25rem, 4vw, 1.75rem);
  background: linear-gradient(
    135deg,
    ${({ theme }: { theme: AppTheme }) => theme.accent}08 0%,
    ${({ theme }: { theme: AppTheme }) => theme.accent}04 100%
  );
  border-bottom: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  flex-shrink: 0;

  h3 {
    margin: 0;
    font-size: clamp(16px, 4vw, 18px);
    font-weight: 700;
    color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  }

  @media (max-width: 768px) {
    padding: 1rem;

    h3 {
      font-size: 16px;
    }
  }

  @media (max-width: 480px) {
    padding: 0.875rem;
  }
`;

export const PreviewContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  padding: clamp(1.25rem, 3vw, 1.5rem);
  min-height: 0;

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
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.875rem;
  }
`;

export const PreviewPost = styled.div`
  background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
  border-radius: clamp(6px, 2vw, 8px);
  overflow: hidden;
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const PreviewTitle = styled.h2`
  margin: 0;
  padding: clamp(0.875rem, 2vw, 1.25rem);
  font-size: clamp(16px, 4vw, 20px);
  font-weight: 700;
  color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  border-bottom: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  word-break: break-word;
  flex-shrink: 0;
  line-height: 1.3;

  @media (max-width: 768px) {
    padding: 0.875rem 1rem;
    font-size: 16px;
  }

  @media (max-width: 480px) {
    padding: 0.75rem 0.875rem;
  }
`;

export const PreviewBody = styled.div`
  padding: clamp(1rem, 3vw, 1.25rem);
  display: flex;
  flex-direction: column;
  gap: clamp(0.75rem, 2vw, 1rem);
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }: { theme: AppTheme }) => theme.divider};
    border-radius: 2px;

    &:hover {
      background: ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
    }
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.875rem;
  }
`;

export const PreviewTextContent = styled.p`
  margin: 0;
  font-size: clamp(12px, 2vw, 14px);
  color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: break-word;

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

export const ImageGallery = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(0.75rem, 2vw, 1rem);
  flex-shrink: 0;
`;

export const ImageSlideContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: clamp(6px, 2vw, 8px);
  overflow: hidden;
  background: ${({ theme }: { theme: AppTheme }) => theme.body};
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};

  @media (max-width: 768px) {
    aspect-ratio: 4 / 3;
  }
`;

export const ImageSlide = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export const ImageNavigation = styled.div`
  display: flex;
  gap: clamp(0.5rem, 1vw, 0.75rem);
  justify-content: center;
  align-items: center;
  margin-top: clamp(0.375rem, 1vw, 0.5rem);
  flex-wrap: wrap;
`;

export const ArrowButton = styled.button`
  background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  border-radius: 6px;
  width: clamp(36px, 8vw, 40px);
  height: clamp(36px, 8vw, 40px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
  min-height: 44px;
  min-width: 44px;

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: clamp(16px, 3vw, 20px);
    height: clamp(16px, 3vw, 20px);
  }

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
  }
`;

export const ImageCounter = styled.span`
  font-size: clamp(12px, 2vw, 14px);
  color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
  font-weight: 700;
  min-width: clamp(50px, 15vw, 80px);
  text-align: center;
  flex-shrink: 0;
`;

export const MediaList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(clamp(70px, 15vw, 100px), 1fr));
  gap: clamp(0.5rem, 1vw, 0.75rem);
  max-height: clamp(200px, 35vh, 300px);
  overflow-y: auto;
  padding: clamp(0.75rem, 2vw, 1rem);
  background: ${({ theme }: { theme: AppTheme }) => theme.body};
  border-radius: clamp(6px, 2vw, 8px);
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }: { theme: AppTheme }) => theme.divider};
    border-radius: 2px;

    &:hover {
      background: ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
    }
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
    gap: 0.5rem;
    padding: 0.75rem;
  }
`;

export const MediaThumbnail = styled.div`
  position: relative;
  aspect-ratio: 1;
  border-radius: clamp(4px, 1vw, 6px);
  overflow: hidden;
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 44px;

  img,
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const MediaTypeBadge = styled.div`
  position: absolute;
  top: clamp(2px, 1vw, 4px);
  right: clamp(2px, 1vw, 4px);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: 3px;
  padding: clamp(1px, 0.5vw, 3px) clamp(2px, 1vw, 6px);
  font-size: clamp(9px, 2vw, 10px);
  font-weight: 700;
  letter-spacing: 0.5px;
`;

export const RemoveMediaButton = styled.button`
  position: absolute;
  bottom: clamp(2px, 1vw, 4px);
  left: clamp(2px, 1vw, 4px);
  background: rgba(239, 68, 68, 0.8);
  color: white;
  border: none;
  border-radius: 3px;
  width: clamp(20px, 5vw, 24px);
  height: clamp(20px, 5vw, 24px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: 0;
  min-height: 32px;
  min-width: 32px;

  svg {
    width: clamp(10px, 3vw, 12px);
    height: clamp(10px, 3vw, 12px);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  &:disabled {
    cursor: not-allowed;
  }

  ${MediaThumbnail}:hover & {
    opacity: 1;
  }
`;

export const EmptyImageState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-height: clamp(250px, 40vh, 400px);
  border-radius: clamp(8px, 2vw, 12px);
  border: 2px dashed ${({ theme }: { theme: AppTheme }) => theme.divider};
  color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
  font-size: clamp(13px, 2vw, 15px);
  text-align: center;
  padding: clamp(1.5rem, 4vw, 2rem);
  width: 100%;
  line-height: 1.5;
`;

export const MediaControlsContainer = styled.div`
  display: flex;
  gap: clamp(0.75rem, 2vw, 1rem);
  margin-top: auto;
  padding: clamp(1rem, 2vw, 1.25rem);
  border-top: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  flex-shrink: 0;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

export const MediaCountBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(0.375rem, 1vw, 0.5rem);
  font-size: clamp(12px, 2vw, 14px);
  color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
  font-weight: 700;
  padding: clamp(0.5rem, 1vw, 0.75rem) clamp(0.75rem, 2vw, 1rem);
  background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  border-radius: clamp(6px, 2vw, 8px);
  white-space: nowrap;
`;

export const AddMediaButton = styled.button`
  flex: 1;
  padding: clamp(0.75rem, 2vw, 0.875rem) clamp(1rem, 3vw, 1.25rem);
  background: ${({ theme }: { theme: AppTheme }) => theme.accent};
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
  gap: clamp(0.375rem, 1vw, 0.5rem);
  white-space: nowrap;
  min-height: 44px;

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: clamp(14px, 3vw, 18px);
    height: clamp(14px, 3vw, 18px);
  }

  @media (max-width: 640px) {
    width: 100%;
  }

  @media (max-width: 480px) {
    padding: 0.75rem 1rem;
  }
`;