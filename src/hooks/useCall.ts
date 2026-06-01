import { useSelector } from "react-redux";
import { getSocket } from "../api/socket";
import type { RootState } from "../store/stores";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IncomingCallData {
  from: string;
  fromEmail: string;
  fromUsername: string;
  offer: RTCSessionDescriptionInit;
  callType: "audio" | "video";
  conversationId: string;
}

export const useCall = () => {
  const { user: currentUser } = useSelector((state: RootState) => state.auth);
  const { activeConversation } = useSelector(
    (state: RootState) => state.chats
  );
  const socket = getSocket();
  const navigate = useNavigate();

  const [incomingCall, setIncomingCall] = useState<IncomingCallData | null>(
    null
  );
  const [callInProgress, setCallInProgress] = useState(false);

  const handleCallClick = useCallback(
    () => {
      if (!activeConversation) return;

      const otherUser =
        activeConversation.type === "direct"
          ? activeConversation.user1?.userId === currentUser?.userId
            ? activeConversation.user2
            : activeConversation.user1
          : null;

      if (!otherUser) {
        console.error("No other user found");
        return;
      }

      console.log("📞 Navigating to call page as initiator");

      navigate(`/call/room/${activeConversation._id}`, {
        state: {
          conversationId: activeConversation._id,
          remoteUserId: otherUser.userId,
          remoteUsername: otherUser.username || otherUser.userId,
          isInitiator: true,
        },
      });

      setCallInProgress(true);
    },
    [currentUser, activeConversation, navigate]
  );

  const handleAcceptCall = useCallback(() => {
    if (!incomingCall) return;

    console.log("✅ Call accepted. Navigating to call page:", incomingCall.conversationId);

    navigate(`/call/room/${incomingCall.conversationId}`, {
      state: {
        conversationId: incomingCall.conversationId,
        remoteUserId: incomingCall.from,
        remoteUsername: incomingCall.fromUsername,
        isInitiator: false,
        incomingCall: incomingCall,
      },
    });

    setIncomingCall(null);
  }, [incomingCall, navigate]);

  const handleRejectCall = useCallback(() => {
    if (!incomingCall) return;

    socket?.emit("call-reject", {
      to: incomingCall.from,
    });

    console.log("❌ Call rejected");
    setIncomingCall(null);
  }, [incomingCall, socket]);

  useEffect(() => {
    const handleIncomingCall = (data: IncomingCallData) => {
      console.log("📞 Received incomming:call event from:", data);
      setIncomingCall(data);
    };

    const handleCallRejected = () => {
      console.log("❌ Call was rejected");
      setCallInProgress(false);
      alert("Call was rejected");
    };

    socket?.on("incomming:call", handleIncomingCall);
    socket?.on("call-rejected", handleCallRejected);

    return () => {
      socket?.off("incomming:call", handleIncomingCall);
      socket?.off("call-rejected", handleCallRejected);
    };
  }, [socket]);

  return {
    handleCallClick,
    handleAcceptCall,
    handleRejectCall,
    incomingCall,
    callInProgress,
  };
};