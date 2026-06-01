import styled from "styled-components";
import type { AppTheme } from "./theme";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 80px);
  width: 100%;
  background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
  color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  overflow: hidden;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
  border-bottom: 1px solid ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
  flex-shrink: 0;
  gap: 1rem;

  @media (max-width: 480px) {
    padding: 0.75rem;
  }
`;

export const BackButton = styled.button`
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
  color: ${({ theme }: { theme: AppTheme }) => theme.accent};
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    background: rgba(139, 92, 246, 0.15);
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: 12px;
    gap: 6px;
  }
`;

export const HeaderContent = styled.div`
  flex: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-width: 0;

  h1 {
    font-size: 28px;
    font-weight: 700;
    margin: 0;
    background: linear-gradient(135deg, ${({ theme }: { theme: AppTheme }) => theme.accent} 0%, ${({ theme }: { theme: AppTheme }) => theme.accent}99 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    @media (max-width: 768px) {
      font-size: 22px;
    }

    @media (max-width: 480px) {
      font-size: 18px;
    }
  }
`;

export const StatusBadge = styled.div<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: ${(props) =>
    props.$active
      ? "rgba(76, 175, 80, 0.1)"
      : "rgba(139, 92, 246, 0.1)"};
  border: 1px solid ${(props) =>
    props.$active
      ? "rgba(76, 175, 80, 0.3)"
      : `rgba(139, 92, 246, 0.3)`};
  border-radius: 20px;
  font-size: 13px;
  color: ${(props) => (props.$active ? "#4caf50" : `rgba(139, 92, 246, 0.8)`)};
  font-weight: 500;
  transition: all 0.3s ease;
  white-space: nowrap;

  @media (max-width: 480px) {
    font-size: 11px;
    padding: 6px 12px;
  }
`;

export const CallTimer = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #4caf50;
  font-variant-numeric: tabular-nums;
  letter-spacing: 2px;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

// ✅ NEW: Center container with max-width
export const VideoContainer = styled.div`
  flex: 1;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
  padding: 1rem;

  @media (max-width: 768px) {
    padding: 0.75rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

// ✅ MAIN VIDEO: Contain with aspect ratio, no cutting
export const MainVideoBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  aspect-ratio: 4 / 3;
  background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
  border-radius: 16px;
  overflow: hidden;
  border: 2px solid ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;

  video {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
    background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
  }

  &:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
    border-color: ${({ theme }: { theme: AppTheme }) => theme.accent};
  }

  @media (max-width: 768px) {
    border-radius: 12px;
    aspect-ratio: 4 / 3;
  }

  @media (max-width: 480px) {
    border-radius: 10px;
    border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
  }
`;

// ✅ PIP VIDEO: Smaller, positioned, clickable
export const PipVideoBox = styled.div`
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
  width: 220px;
  height: 150px;
  background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
    border-color: ${({ theme }: { theme: AppTheme }) => theme.accent};
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 1024px) {
    width: 180px;
    height: 130px;
    bottom: 1rem;
    right: 1rem;
  }

  @media (max-width: 768px) {
    width: 150px;
    height: 110px;
    bottom: 0.75rem;
    right: 0.75rem;
  }

  @media (max-width: 480px) {
    width: 110px;
    height: 80px;
    bottom: 0.5rem;
    right: 0.5rem;
    border-radius: 8px;
  }
`;

export const VideoOverlay = styled.div<{ $noVideo?: boolean }>`
  position: absolute;
  inset: 0;
  display: ${(props) => (props.$noVideo ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, ${({ theme }: { theme: AppTheme }) => theme.innerBg} 0%, rgba(0,0,0,0.1) 100%);
  font-size: 80px;
  opacity: 0.8;
  z-index: 2;

  @media (max-width: 768px) {
    font-size: 60px;
  }

  @media (max-width: 480px) {
    font-size: 40px;
  }
`;

export const VideoLabel = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 5;

  @media (max-width: 768px) {
    padding: 8px 12px;
    font-size: 12px;
    bottom: 0.75rem;
    left: 0.75rem;
  }

  @media (max-width: 480px) {
    padding: 6px 10px;
    font-size: 10px;
    bottom: 0.5rem;
    left: 0.5rem;
    gap: 6px;
  }

  ${PipVideoBox} & {
    bottom: 0.5rem;
    left: 0.5rem;
    padding: 6px 10px;
    font-size: 10px;
    background: rgba(0, 0, 0, 0.8);

    @media (max-width: 480px) {
      font-size: 8px;
      padding: 4px 8px;
    }
  }
`;

export const MuteIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: rgba(255, 59, 48, 0.9);
  border-radius: 50%;
  color: white;
  animation: pulse 1.5s infinite;
  flex-shrink: 0;

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.6;
    }
  }

  svg {
    width: 14px;
    height: 14px;
  }

  ${PipVideoBox} & {
    width: 18px;
    height: 18px;

    svg {
      width: 10px;
      height: 10px;
    }
  }
`;

export const CallControlsContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
  border-top: 1px solid ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
  flex-shrink: 0;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 0.75rem;
    padding: 0.75rem;
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
    padding: 0.5rem;
  }
`;

export const ControlBtn = styled.button<{ $type?: "mic" | "video" | "end" | "screen"; $off?: boolean }>`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  flex-shrink: 0;

  ${(props) => {
    if (props.$type === "end") {
      return `
        background: linear-gradient(135deg, #ff6b6b 0%, #f44336 100%);
        width: auto;
        padding: 12px 32px;
        border-radius: 50px;
        font-size: 16px;
        font-weight: 600;
        gap: 8px;
        display: flex;
        align-items: center;

        &:hover {
          transform: scale(1.05) translateY(-2px);
          box-shadow: 0 8px 25px rgba(244, 67, 54, 0.4);
        }

        &:active {
          transform: scale(0.95);
        }
      `;
    }

    if (props.$off) {
      return `
        background: rgba(244, 67, 54, 0.2);
        border: 2px solid rgba(244, 67, 54, 0.5);

        &:hover {
          background: rgba(244, 67, 54, 0.3);
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(244, 67, 54, 0.3);
        }

        &:active {
          transform: scale(0.95);
        }
      `;
    }

    return `
      background: linear-gradient(135deg, rgb(139, 92, 246) 0%, rgba(139, 92, 246, 0.7) 100%);

      &:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 20px rgba(139, 92, 246, 0.4);
      }

      &:active {
        transform: scale(0.95);
      }
    `;
  }}

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    font-size: 20px;

    ${(props) =>
      props.$type === "end"
        ? `
      padding: 10px 24px;
      font-size: 14px;
    `
        : ""}
  }

  @media (max-width: 480px) {
    width: 45px;
    height: 45px;
    font-size: 18px;

    ${(props) =>
      props.$type === "end"
        ? `
      padding: 10px 20px;
      font-size: 12px;
      gap: 6px;
    `
        : ""}

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

export const EmptyMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
  font-size: 18px;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const WaitingMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
  font-size: 16px;
  animation: pulse 1.5s infinite;
  text-align: center;
  padding: 1rem;

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  @media (max-width: 768px) {
    font-size: 15px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

export const StatusIndicator = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #4caf50;
`;