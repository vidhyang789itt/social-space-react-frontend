import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchConversations,
  fetchMessages,
  startConversation,
  clearActiveChat,
} from "../store/slices/chatSlice";
import type { AppDispatch, RootState } from "../store/stores";
import ChatWindow from "../components/chat/ChatWindow";
import ChatList from "../components/chat/ChatList";
import {
  ChatPageWrapper,
  ListContainer,
  WindowContainer,
  EmptyStateWrapper,
} from "../styles/chat.styles";

const ChatPage: React.FC = () => {
  const { otherUserId, groupId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { conversations } = useSelector(
    (state: RootState) => state.chats
  );
  const loadedChatRef = useRef<string | null>(null);

  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  useEffect(() => {
    const currentChatId = otherUserId || groupId;

    if (!currentChatId || loadedChatRef.current === currentChatId) {
      return;
    }

    loadedChatRef.current = currentChatId;

    if (otherUserId) {
      dispatch(startConversation(otherUserId))
        .then((res: any) => {
          if (res.payload?._id) {
            dispatch(
              fetchMessages({
                conversationId: res.payload._id,
                page: 1,
                limit: 50,
              })
            );
          }
        })
        .catch((err) => {
          console.error("❌ Error:", err);
        });
    } else if (groupId) {
      const groupConv = conversations.find(
        (c) => c._id === groupId && c.type === "group"
      );
      if (groupConv) {
        dispatch(
          fetchMessages({
            conversationId: groupId,
            page: 1,
            limit: 50,
          })
        );
      }
    }

    return () => {
      dispatch(clearActiveChat());
    };
  }, [otherUserId, groupId, conversations, dispatch]);

  const isActiveDirect = !!otherUserId;
  const isActiveGroup = !!groupId;
  const hasActiveChat = isActiveDirect || isActiveGroup;

  return (
    <ChatPageWrapper>
      <ListContainer $isActive={hasActiveChat}>
        <ChatList />
      </ListContainer>

      <WindowContainer $isActive={hasActiveChat}>
        {hasActiveChat ? (
          <ChatWindow />
        ) : (
          <EmptyStateWrapper>
            <div className="icon-container">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a.75.75 0 01-1.074-.865 5.25 5.25 0 00.84-2.4c-2.313-1.557-3.926-3.903-3.926-6.455 0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                />
              </svg>
            </div>
            <h3>Your Messages</h3>
            <p>Select a conversation from the list to get started</p>
          </EmptyStateWrapper>
        )}
      </WindowContainer>
    </ChatPageWrapper>
  );
};

export default ChatPage;