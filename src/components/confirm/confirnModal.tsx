import React from "react";
import { ButtonGroup, Header, Message, ModalContent, ModalOverlay } from "../../styles/confirmModal.styles"
import { AlertCircle } from "lucide-react";


interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  isDanger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isLoading = false,
  isDanger = false,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onCancel}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Header>
          <AlertCircle className="icon" size={24} />
          <h2>{title}</h2>
        </Header>

        <Message>{message}</Message>

        <ButtonGroup>
          <button
            className="cancel"
            onClick={onCancel}
            disabled={isLoading}
            type="button"
          >
            {cancelText}
          </button>
          <button
            className={isDanger ? "confirm" : ""}
            onClick={onConfirm}
            disabled={isLoading}
            style={{
              background: isDanger ? "#ef4444" : "#8b5cf6",
              color: "white",
              flex: 1,
            }}
            type="button"
          >
            {isLoading ? "Processing..." : confirmText}
          </button>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ConfirmModal;