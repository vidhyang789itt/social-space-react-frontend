import React, { useRef, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, X, GripHorizontal } from "lucide-react";
import styled from "styled-components";
import type { ActiveCallState } from "../../hooks/useCallState";

interface CallWidgetProps {
  call: ActiveCallState | null;
  onClose: () => void;
}

// ✅ STYLED COMPONENTS
const WidgetContainer = styled.div<{ $x: number; $y: number }>`
  position: fixed;
  bottom: auto;
  right: auto;
  left: ${(props) => props.$x}px;
  top: ${(props) => props.$y}px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  border: 1px solid #e5e5e5;
  overflow: hidden;
  z-index: 9000;
  user-select: none;
  animation: slideIn 0.3s ease-out;
  width: fit-content;

  @keyframes slideIn {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
    left: auto;
    top: auto;
  }

  @media (max-width: 480px) {
    bottom: 16px;
    right: 16px;
    left: auto;
    top: auto;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  gap: 8px;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const GripIcon = styled(GripHorizontal)`
  width: 16px;
  height: 16px;
  opacity: 0.7;
`;

const CallInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const CallerName = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: white;
`;

const CallDuration = styled.span`
  font-size: 11px;
  color: rgba(255, 255, 255, 0.8);
  font-variant-numeric: tabular-nums;
`;

const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const Body = styled.div`
  padding: 12px 16px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f9f9f9;
  }

  &:active {
    background: #f0f0f0;
  }
`;

const JoinButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 10px 12px;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #059669;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const CallWidget: React.FC<CallWidgetProps> = ({ call, onClose }) => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth - 330, y: 30 }); // ✅ Start at bottom right
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [callDuration, setCallDuration] = useState(0);

  // ✅ Timer for call duration
  useEffect(() => {
    if (!call) return;

    const startTime = call.startTime;
    const interval = setInterval(() => {
      const duration = Math.floor((Date.now() - startTime) / 1000);
      setCallDuration(duration);
    }, 1000);

    return () => clearInterval(interval);
  }, [call]);

  // ✅ Format call duration
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // ✅ Handle drag start
  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      setOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
    },
    []
  );

  // ✅ Handle drag move
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const newX = e.clientX - offset.x;
      const newY = e.clientY - offset.y;

      // ✅ Keep widget in viewport
      const maxX = window.innerWidth - containerRef.current.offsetWidth;
      const maxY = window.innerHeight - containerRef.current.offsetHeight;

      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      });
    },
    [isDragging, offset]
  );

  // ✅ Handle drag end
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // ✅ Navigate to call page
  const handleJoinCall = useCallback(() => {
    if (!call) return;

    navigate(`/call/room/${call.conversationId}`, {
      state: {
        conversationId: call.conversationId,
        remoteUserId: call.remoteUserId,
        remoteUsername: call.remoteUsername,
        isInitiator: call.isInitiator,
        incomingCall: call.incomingCall,
      },
    });
  }, [call, navigate]);

  if (!call) return null;

  return (
    <WidgetContainer ref={containerRef} $x={position.x} $y={position.y}>
      <Header ref={headerRef} onMouseDown={handleMouseDown}>
        <HeaderLeft>
          <GripIcon />
          <CallInfo>
            <CallerName>
              {call.isInitiator ? "Calling" : "Connected to"} {call.remoteUsername}
            </CallerName>
            <CallDuration>{formatDuration(callDuration)}</CallDuration>
          </CallInfo>
        </HeaderLeft>
        <CloseButton
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          title="End Call"
        >
          <X size={16} />
        </CloseButton>
      </Header>
      <Body onClick={handleJoinCall}>
        <JoinButton>
          <Phone size={16} />
          Return to Call
        </JoinButton>
      </Body>
    </WidgetContainer>
  );
};

export default CallWidget;