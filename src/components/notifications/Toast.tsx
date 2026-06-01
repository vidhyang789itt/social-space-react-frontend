import React, { useEffect } from "react";
import styled from "styled-components";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

type ToastType = "success" | "error" | "info";

const ToastContainer = styled.div<{ type: ToastType }>`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: white;
  padding: 16px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: 400px;
  z-index: 2000;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  .icon {
    flex-shrink: 0;
    color: ${(props) => {
      switch (props.type) {
        case "success":
          return "#10b981";
        case "error":
          return "#ef4444";
        case "info":
          return "#3b82f6";
        default:
          return "#6b7280";
      }
    }};
  }

  .message {
    flex: 1;
    font-size: 14px;
    color: #1f2937;
  }

  .close {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    color: #9ca3af;
    transition: color 0.2s;
    flex-shrink: 0;

    &:hover {
      color: #6b7280;
    }
  }

  @media (max-width: 768px) {
    bottom: 16px;
    right: 16px;
    left: 16px;
    max-width: none;
  }
`;

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = "info",
  duration = 4000,
  onClose,
}) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle size={20} />;
      case "error":
        return <AlertCircle size={20} />;
      case "info":
        return <Info size={20} />;
      default:
        return <Info size={20} />;
    }
  };

  return (
    <ToastContainer type={type}>
      <div className="icon">{getIcon()}</div>
      <div className="message">{message}</div>
      <button className="close" onClick={onClose}>
        <X size={16} />
      </button>
    </ToastContainer>
  );
};

export default Toast;