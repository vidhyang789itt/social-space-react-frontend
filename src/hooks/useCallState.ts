import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getSocket } from "../api/socket";

export interface ActiveCallState {
  conversationId: string;
  remoteUserId: string;
  remoteUsername: string;
  isInitiator: boolean;
  incomingCall?: any;
  startTime: number;
}

export const useCallState = () => {
  const [activeCall, setActiveCall] = useState<ActiveCallState | null>(null);
  const [isOnCallPage, setIsOnCallPage] = useState(false);
  
  let location;
  
  try {
    location = useLocation();
    useNavigate();
  } catch (error) {
    console.warn("Router context not available");
    return {
      activeCall,
      setActiveCall,
      isOnCallPage: false,
      startCall: () => {},
      endCall: () => {},
    };
  }

  const socket = getSocket();

  useEffect(() => {
    if (location) {
      setIsOnCallPage(location.pathname.includes("/call/room/"));
    }
  }, [location?.pathname]);

  const startCall = useCallback((callData: ActiveCallState) => {
    setActiveCall(callData);
  }, []);

  const endCall = useCallback(() => {
    setActiveCall(null);
  }, []);

  useEffect(() => {
    const handleCallEnded = () => {
      setActiveCall(null);
    };

    socket?.on("call-ended", handleCallEnded);

    return () => {
      socket?.off("call-ended", handleCallEnded);
    };
  }, [socket]);

  return {
    activeCall,
    setActiveCall,
    isOnCallPage,
    startCall,
    endCall,
  };
};