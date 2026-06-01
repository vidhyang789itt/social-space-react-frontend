import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { getSocket } from "../../api/socket";

export interface ActiveCallState {
  conversationId: string;
  remoteUserId: string;
  remoteUsername: string;
  isInitiator: boolean;
  incomingCall?: any;
  startTime: number;
  remoteSocketId?: string; // ✅ Add this
}

interface CallContextType {
  activeCall: ActiveCallState | null;
  setActiveCall: (call: ActiveCallState | null) => void;
  isOnCallPage: boolean;
  setIsOnCallPage: (on: boolean) => void;
  remoteSocketId: string | null; // ✅ Add this
  setRemoteSocketId: (id: string | null) => void; // ✅ Add this
  endCall: () => void;
  endCallWithNotify: (remoteSocketId: string | null) => void;
}

const CallContext = createContext<CallContextType | undefined>(undefined);

export const CallProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeCall, setActiveCall] = useState<ActiveCallState | null>(null);
  const [isOnCallPage, setIsOnCallPage] = useState(false);
  const [remoteSocketId, setRemoteSocketId] = useState<string | null>(null); // ✅ Add this
  const navigate = useNavigate();
  const socket = getSocket();

  // ✅ End call locally
  const endCall = useCallback(() => {
    console.log("📴 Ending call from context");
    setActiveCall(null);
    setRemoteSocketId(null); // ✅ Clear socket ID
  }, []);

  // ✅ End call and notify remote user
  const endCallWithNotify = useCallback(
    (remoteSocketIdParam: string | null) => {
      const socketIdToUse = remoteSocketIdParam || remoteSocketId;
      console.log("🔴 END CALL with notification to:", socketIdToUse);
      
      if (socketIdToUse) {
        socket?.emit("call-ended", {
          to: socketIdToUse,
        });
      }

      setActiveCall(null);
      setRemoteSocketId(null); // ✅ Clear socket ID

      // Navigate after a short delay
      setTimeout(() => {
        navigate("/home");
      }, 500);
    },
    [socket, navigate, remoteSocketId]
  );

  return (
    <CallContext.Provider
      value={{
        activeCall,
        setActiveCall,
        isOnCallPage,
        setIsOnCallPage,
        remoteSocketId,
        setRemoteSocketId,
        endCall,
        endCallWithNotify,
      }}
    >
      {children}
    </CallContext.Provider>
  );
};

export const useCallContext = () => {
  const context = useContext(CallContext);
  if (!context) {
    throw new Error("useCallContext must be used within CallProvider");
  }
  return context;
};