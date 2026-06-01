import React, { useState, useEffect } from "react";
import { Phone, PhoneOff, Loader } from "lucide-react";
import styled from "styled-components";

interface CallNotificationProps {
  incomingCall: {
    from: string;
    fromEmail: string;
    fromUsername: string;
    callType: "audio" | "video";
  } | null;
  onAccept: () => void;
  onReject: () => void;
  isProcessing?: boolean;
}

// ✅ MINIMAL & CLEAN STYLING
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Container = styled.div`
  background: white;
  border-radius: 16px;
  padding: 40px;
  text-align: center;
  color: #1a1a1a;
  min-width: 360px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e5e5;
  max-width: 90vw;
  animation: slideUp 0.4s ease-out;

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @media (max-width: 480px) {
    padding: 32px 24px;
    min-width: auto;
    border-radius: 12px;
  }
`;

const IconWrapper = styled.div`
  font-size: 56px;
  margin-bottom: 24px;
  display: flex;
  justify-content: center;

  @media (max-width: 480px) {
    font-size: 48px;
    margin-bottom: 20px;
  }
`;

const Title = styled.h2`
  margin: 0 0 8px 0;
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  letter-spacing: -0.5px;

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const Subtitle = styled.p`
  margin: 0 0 32px 0;
  color: #666;
  font-size: 14px;
  font-weight: 500;

  @media (max-width: 480px) {
    margin-bottom: 24px;
    font-size: 13px;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;

  @media (max-width: 480px) {
    gap: 12px;
  }
`;

const ActionButton = styled.button<{ $type: "accept" | "reject"; $disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: none;
  color: white;
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  font-size: 24px;
  transition: all 0.2s ease;
  font-weight: 600;
  opacity: ${(props) => (props.$disabled ? 0.6 : 1)};

  ${(props) => {
    if (props.$type === "accept") {
      return `
        background: #10b981;

        &:hover:not(:disabled) {
          background: #059669;
          transform: scale(1.08);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }

        &:active:not(:disabled) {
          transform: scale(0.98);
        }
      `;
    }

    return `
      background: #ef4444;

      &:hover:not(:disabled) {
        background: #dc2626;
        transform: scale(1.08);
        box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
      }

      &:active:not(:disabled) {
        transform: scale(0.98);
      }
    `;
  }}

  @media (max-width: 480px) {
    width: 56px;
    height: 56px;
    font-size: 20px;
  }
`;

const LoadingSpinner = styled.div`
  animation: spin 1s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const CallNotification: React.FC<CallNotificationProps> = ({
  incomingCall,
  onAccept,
  onReject,
  isProcessing = false,
}) => {
  const [ringSound] = useState<HTMLAudioElement | null>(
    typeof Audio !== "undefined" ? new Audio("/call-ringtone.mp3") : null
  );

  useEffect(() => {
    if (incomingCall && ringSound) {
      ringSound.loop = true;
      ringSound.volume = 0.5;
      ringSound.play().catch((e) => console.log("Could not play sound:", e));
    }

    return () => {
      if (ringSound) {
        ringSound.pause();
        ringSound.currentTime = 0;
      }
    };
  }, [incomingCall, ringSound]);

  if (!incomingCall) return null;

  return (
    <Overlay>
      <Container>
        <IconWrapper>
          {incomingCall.callType === "video" ? "📹" : "📞"}
        </IconWrapper>

        <Title>{incomingCall.fromUsername}</Title>

        <Subtitle>
          {incomingCall.callType === "video" ? "Incoming video call" : "Incoming call"}
        </Subtitle>

        <ButtonsContainer>
          <ActionButton
            $type="accept"
            $disabled={isProcessing}
            onClick={onAccept}
            disabled={isProcessing}
            title="Accept Call"
          >
            {isProcessing ? (
              <LoadingSpinner>
                <Loader size={24} />
              </LoadingSpinner>
            ) : (
              <Phone size={24} />
            )}
          </ActionButton>

          <ActionButton
            $type="reject"
            $disabled={isProcessing}
            onClick={onReject}
            disabled={isProcessing}
            title="Reject Call"
          >
            <PhoneOff size={24} />
          </ActionButton>
        </ButtonsContainer>
      </Container>
    </Overlay>
  );
};

export default CallNotification;