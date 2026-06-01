import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  markConversationAsRead,
  receiveNewMessage,
  setOnlineUsers,
  handleMessageDeletedFromSocket,
  handleNewGroupReceived,
} from "../store/slices/chatSlice";
import type { AppDispatch, RootState } from "../store/stores";
import { getSocket } from "../api/socket";
import type { ConversationType } from "../types/Conversation";

export const useUpdate = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user: currentUser } = useSelector((state: RootState) => state.auth);
  const listenersAttachedRef = useRef(false);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) {
      console.error("❌ Socket not available");
      return;
    }
    if (listenersAttachedRef.current) {
      return;
    }

    listenersAttachedRef.current = true;

    const handleMessage = (message: any) => {
      console.log("📨 New message received");
      console.log(`message ${message}`);
      dispatch(receiveNewMessage(message));
    };

    const handleOnlineUsers = (onlineIds: string[]) => {
      if (!onlineIds || onlineIds.length === 0) {
        console.warn("⚠️ Empty online users list received");
      }
      const stringIds = (onlineIds || []).map((id) => String(id).trim());
      dispatch(setOnlineUsers(stringIds));
    };

    const handleMessagesRead = (data: {
      conversationId: string;
      readBy: string;
    }) => {
      console.log(data.conversationId);
      
      dispatch(
        markConversationAsRead({
          convId: data.conversationId,
          _id: data.readBy,
        })
      );
    };

    const handleError = (error: any) => {
      console.error("❌ Socket error:", error);
    };

    const handleConnect = () => {
      if (currentUser?.userId) {
        socket?.emit("userConnected", currentUser.userId);
      }
    };

    const handleDisconnect = (reason: string) => {
      console.log("❌ Socket disconnected:", reason);
    };

    const handleMessageDeleted = (data: any) => {
      console.log(`🗑️ Message deleted:`, data.messageId);
      dispatch(
        handleMessageDeletedFromSocket({
          messageId: data.messageId,
          deleteForAll: data.deleteForAll,
        })
      );
    };

    const handleNewGroupCreated = (group: ConversationType) => {
      console.log("recieved new group request");
      console.log(group);
      
      dispatch(
        handleNewGroupReceived({
          groupId: group._id,
          groupName: group.groupName,
          members: group.groupMembers,
          createdBy: group.groupAdmin,
          createdAt: group.createdAt,
        })
      );
    };

    socket.on("receiveMessage", handleMessage);
    socket.on("getOnlineUsers", handleOnlineUsers);
    socket.on("messagesRead", handleMessagesRead);
    socket.on("error", handleError);
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("messageDeleted", handleMessageDeleted);
    socket.on("newGroupCreated", handleNewGroupCreated); 

    return () => {
      socket.off("receiveMessage", handleMessage);
      socket.off("getOnlineUsers", handleOnlineUsers);
      socket.off("messagesRead", handleMessagesRead);
      socket.off("error", handleError);
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("messageDeleted", handleMessageDeleted);
      socket.off("newGroupCreated", handleNewGroupCreated); 
      listenersAttachedRef.current = false;
    };
  }, [dispatch, currentUser?.userId]);

};