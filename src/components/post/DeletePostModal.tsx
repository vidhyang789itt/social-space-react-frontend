import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import type { AppTheme } from "../../styles/theme";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  action: string;
  message: string;
  messageHead: string;
}

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(1rem, 3vw, 2rem);
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(6px);
`;

const ModalContainer = styled(motion.div)`
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: clamp(300px, 90vw, 450px);
  background: ${({ theme }: { theme: AppTheme }) => theme.cardBg};
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  border-radius: clamp(12px, 3vw, 16px);
  padding: clamp(1.5rem, 4vw, 2rem);
  box-shadow: 0 clamp(10px, 5vw, 25px) clamp(30px, 8vw, 80px) rgba(0, 0, 0, 0.2);
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: clamp(18px, 4vw, 22px);
  font-weight: 700;
  color: ${({ theme }: { theme: AppTheme }) => theme.textPrimary};
  margin-bottom: clamp(0.75rem, 2vw, 1rem);
  letter-spacing: -0.5px;
`;

const ModalMessage = styled.p`
  margin: 0;
  font-size: clamp(13px, 2vw, 15px);
  color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
  line-height: 1.6;
  margin-bottom: clamp(1.5rem, 3vw, 2rem);
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: clamp(0.75rem, 2vw, 1rem);
  flex-wrap: wrap;

  @media (max-width: 480px) {
    flex-direction: column-reverse;
    gap: 0.75rem;
  }
`;

const CancelButton = styled.button`
  padding: clamp(0.625rem, 1vw, 0.75rem) clamp(1rem, 2vw, 1.25rem);
  border: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  background: transparent;
  color: ${({ theme }: { theme: AppTheme }) => theme.textSecondary};
  border-radius: clamp(6px, 2vw, 8px);
  font-size: clamp(12px, 2vw, 13px);
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;

  &:hover:not(:disabled) {
    background: ${({ theme }: { theme: AppTheme }) => theme.innerBg};
    border-color: ${({ theme }: { theme: AppTheme }) => theme.cardBorder};
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const ConfirmButton = styled.button`
  padding: clamp(0.625rem, 1vw, 0.75rem) clamp(1rem, 2vw, 1.25rem);
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  border: none;
  color: white;
  border-radius: clamp(6px, 2vw, 8px);
  font-size: clamp(12px, 2vw, 13px);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);

  &:hover:not(:disabled) {
    box-shadow: 0 6px 20px rgba(239, 68, 68, 0.3);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const ConfirmModal = ({
  open,
  onClose,
  onConfirm,
  action,
  message,
  messageHead,
}: Props) => {
  return (
    <AnimatePresence>
      {open && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <ModalContainer
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <ModalTitle>{messageHead}</ModalTitle>
            <ModalMessage>{message}</ModalMessage>

            <ButtonGroup>
              <CancelButton onClick={onClose} type="button">
                Cancel
              </CancelButton>

              <ConfirmButton onClick={onConfirm} type="button">
                {action}
              </ConfirmButton>
            </ButtonGroup>
          </ModalContainer>
        </Overlay>
      )}
    </AnimatePresence>
  );
};