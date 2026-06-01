import styled from "styled-components";

export const ActionContainer = styled.div<{ $isMe: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  min-width: 32px;
  min-height: 32px;
`;

export const ActionButton = styled.button<{ $isOpen?: boolean }>`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #cbd5e1;
  font-size: 18px;
  border-radius: 6px;
  transition: all 0.2s ease;
  flex-shrink: 0;
  width: 32px;
  height: 32px;

  &:hover {
    background-color: rgba(139, 92, 246, 0.15);
    color: #8b5cf6;
  }

  ${(props) =>
    props.$isOpen &&
    `
    background-color: rgba(139, 92, 246, 0.15);
    color: #8b5cf6;
  `}
`;

export const DropdownMenu = styled.div<{ $isMe: boolean }>`
  position: absolute;
  bottom: calc(100% + 8px);
  ${(props) => (props.$isMe ? "right: 0;" : "left: 0;")}
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  z-index: 50;
  min-width: 240px;
  overflow: hidden;
  white-space: nowrap;
  transform-origin: ${(props) => (props.$isMe ? "right" : "left")} bottom;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: ${(props) => (props.$isMe ? "translateX(8px)" : "translateX(-8px)")} translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateX(0) translateY(0);
    }
  }
`;

export const MenuItem = styled.button<{ $isDanger?: boolean }>`
  width: 100%;
  text-align: left;
  padding: 12px 16px;
  border: none;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: ${(props) => (props.$isDanger ? "#dc2626" : "#374151")};
  font-weight: 500;
  transition: all 0.15s ease;

  &:hover {
    background-color: ${(props) =>
      props.$isDanger ? "#fecaca" : "#f3f4f6"};
    padding-left: 18px;
  }

  svg {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
  }
`;

export const DisabledMenuItem = styled.div`
  width: 100%;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: #9ca3af;
  font-weight: 500;
  cursor: not-allowed;
  opacity: 0.7;
  background: #f9fafb;

  svg {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    animation: spin 2s linear infinite;
  }

  .time-remaining {
    margin-left: auto;
    font-size: 12px;
    color: #6b7280;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const MenuDivider = styled.div`
  height: 1px;
  background: #e5e7eb;
  margin: 0;
`;

export const Arrow = styled.div<{ $isMe: boolean }>`
  position: absolute;
  bottom: -4px;
  ${(props) => (props.$isMe ? "right: 8px;" : "left: 8px;")}
  width: 8px;
  height: 8px;
  background: white;
  border-right: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;
  transform: rotate(45deg);
  z-index: 49;
`;
