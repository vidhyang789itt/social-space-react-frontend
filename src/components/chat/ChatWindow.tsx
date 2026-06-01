import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/stores";
import { useChat } from "../../hooks/useChat";
import { fetchMessages } from "../../store/slices/chatSlice";
import * as S from "../../styles/chat.styles";
import { useNavigate, useParams } from "react-router-dom";
import { markConversationAsRead } from "../../store/slices/chatSlice";
import GroupSettingsModal from "../groupSettings/GroupSettingsModal";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MediaPreview from "./MediaPreview";
import ChatInput from "./ChatInput";
import { uploadFileApi } from "../../api/chat.api";
import { Loader, ArrowDown, Phone, Video } from "lucide-react";
import { ReplyPreview } from "./replyPreview";
import { useCall } from "../../hooks/useCall";

interface UploadedMedia {
  url: string;
  type: "image" | "video" | "file";
  fileName: string;
  fileSize: number;
}

const ChatWindow = () => {
  const { otherUserId, groupId } = useParams();

  if (!otherUserId && !groupId) {
    throw new Error("No chat selected");
  }

  const [text, setText] = useState("");
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [mediaPreviews, setMediaPreviews] = useState<
    Array<{ url: string; type: "image" | "video" | "file"; name: string }>
  >([]);
  const [isUploading, setIsUploading] = useState(false);
  const [showGroupSettings, setShowGroupSettings] = useState(false);
  const {handleCallClick,
          callInProgress} = useCall();
  const [showArrowToBottom, setShowArrowToBottom] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesStartRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const markAsReadCalledRef = useRef(false);
  const shouldScrollToBottomRef = useRef(true);
  const loadingTriggeredRef = useRef(false);
  const isPaginatingRef = useRef(false);
  const [replyingTo, setReplyingTo] = useState<{
    messageId: string;
    senderName: string;
    content: string;
  } | null>(null);

  const anchorMessageRef = useRef<{ id: string; offset: number } | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const {
    activeMessages,
    activeConversation,
    onlineUsers,
    messagesPagination,
    isLoadingMessages,
  } = useSelector((state: RootState) => state.chats);

  const { user: currentUser } = useSelector((state: RootState) => state.auth);
  const { sendMessage, markAsRead, deleteMsg } = useChat();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const isDirect = !!otherUserId;
  const isGroup = !!groupId;

  const otherUser =
    isDirect && activeConversation?.type === "direct" && activeConversation
      ? activeConversation?.user1?.userId === currentUser?.userId
        ? activeConversation?.user2
        : activeConversation?.user1
      : null;

  const isOnline =
    isDirect && otherUser
      ? (() => {
          const otherUserIdStr = String(otherUser?.userId || "").trim();
          return onlineUsers.some((id) => String(id).trim() === otherUserIdStr);
        })()
      : false;

  const groupName =
    isGroup && activeConversation?.type === "group" && activeConversation
      ? activeConversation?.groupName || "Group Chat"
      : isDirect && otherUser
        ? otherUser?.username || "User"
        : "Chat";

  useEffect(() => {
    if (activeConversation && currentUser && !markAsReadCalledRef.current) {
      const convId = activeConversation._id;
      const myId = currentUser._id;
      
      if (otherUserId) {
        markAsRead(convId, myId, otherUserId);
      } else if (groupId) {
        markAsRead(groupId, myId, groupId);
      }

      dispatch(
        markConversationAsRead({
          convId,
          _id: currentUser._id,
        }),
      );

      markAsReadCalledRef.current = true;
    }
  }, [
    activeConversation?._id,
    currentUser,
    otherUserId,
    groupId,
    dispatch,
    markAsRead,
  ]);

  useEffect(() => {
    markAsReadCalledRef.current = false;
  }, [otherUserId, groupId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [otherUserId, groupId, activeConversation?._id]);

  useEffect(() => {
    if (shouldScrollToBottomRef.current && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "auto",
        block: "end",
      });
    }
  }, [activeConversation?._id]);

  useEffect(() => {
    if (isPaginatingRef.current) {
      return;
    }
    if (messagesEndRef.current && activeMessages.length > 0) {
      shouldScrollToBottomRef.current = true;
      
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, 100);
    }
  }, [activeMessages]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;

    const isAtBottom =
      element.scrollHeight - element.scrollTop - element.clientHeight < 100;

    shouldScrollToBottomRef.current = isAtBottom;
    
    setShowArrowToBottom(!isAtBottom);

    const isAtTop = element.scrollTop < 100;

    if (
      isAtTop &&
      !isLoadingMessages &&
      !loadingTriggeredRef.current &&
      messagesPagination.hasNextPage &&
      activeConversation?._id
    ) {
      loadingTriggeredRef.current = true;
      isPaginatingRef.current = true;

      const container = element;
      const firstVisibleElement = container.querySelector(
        "[data-message-id]",
      ) as HTMLElement;

      if (
        firstVisibleElement &&
        firstVisibleElement.dataset.messageId &&
        firstVisibleElement.dataset.messageId.trim()
      ) {
        const rect = firstVisibleElement.getBoundingClientRect();
        const offset = rect.top - container.getBoundingClientRect().top;

        anchorMessageRef.current = {
          id: firstVisibleElement.dataset.messageId,
          offset: offset,
        };

        console.log(
          `📍 Anchor message set: ${anchorMessageRef.current.id} at offset ${offset}px`,
        );
      }

      const nextPage = messagesPagination.currentPage + 1;

      dispatch(
        fetchMessages({
          conversationId: activeConversation._id,
          page: nextPage,
          limit: 50,
        }),
      ).finally(() => {
        loadingTriggeredRef.current = false;
        isPaginatingRef.current = false;
      });
    }
  };

  useEffect(() => {
    if (
      !isLoadingMessages &&
      anchorMessageRef.current &&
      messagesContainerRef.current
    ) {
      const { id, offset } = anchorMessageRef.current;
      const container = messagesContainerRef.current;

      const anchorElement = container.querySelector(
        `[data-message-id="${id}"]`,
      ) as HTMLElement;

      if (anchorElement) {
        const elementRect = anchorElement.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const relativeTop =
          elementRect.top - containerRect.top + container.scrollTop;

        container.scrollTop = relativeTop + offset;

        console.log(`✅ Scrolled to anchor message ${id}`);
        anchorMessageRef.current = null;
      }
    }
  }, [isLoadingMessages]);

  const handleScrollToBottom = () => {
    if (messagesEndRef?.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  const uploadFiles = async (files: File[]): Promise<UploadedMedia[]> => {
    try {
      setIsUploading(true);
      const uploadedMedia: UploadedMedia[] = [];

      for (const file of files) {
        try {
          const data = await uploadFileApi(file);

          if (data.success) {
            const mediaType: "image" | "video" | "file" = file.type.startsWith(
              "image/",
            )
              ? "image"
              : file.type.startsWith("video/")
                ? "video"
                : "file";

            uploadedMedia.push({
              url: data.url,
              type: mediaType,
              fileName: data.fileName,
              fileSize: data.fileSize,
            });
          }
        } catch (error) {
          console.error(`❌ Error uploading ${file.name}:`, error);
          throw error;
        }
      }

      return uploadedMedia;
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    setMediaFiles([...mediaFiles, ...newFiles]);

    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const preview = event.target?.result as string;
        let type: "image" | "video" | "file" = "file";

        if (file.type.startsWith("image/")) {
          type = "image";
        } else if (file.type.startsWith("video/")) {
          type = "video";
        }

        setMediaPreviews((prev) => [
          ...prev,
          { url: preview, type, name: file.name },
        ]);
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeMedia = (index: number) => {
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
    setMediaPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!text.trim() && mediaFiles.length === 0) {
      return;
    }

    if (!activeConversation || !currentUser) {
      return;
    }

    try {
      setIsUploading(true);

      let uploadedMedia: UploadedMedia[] = [];
      if (mediaFiles.length > 0) {
        uploadedMedia = await uploadFiles(mediaFiles);
      }

      let messageType: "text" | "image" | "video" | "file" | "mixed" = "text";
      if (uploadedMedia.length > 0) {
        if (text.trim()) {
          messageType = "mixed";
        } else {
          messageType = uploadedMedia[0].type;
        }
      }

      const messageData = {
        conversationId: activeConversation._id,
        senderId: currentUser.userId,
        receiverId: otherUserId || null,
        content: text.trim(),
        media: uploadedMedia,
        messageType,
        replyTo: replyingTo ? {
          messageId: replyingTo.messageId,
          senderName: replyingTo.senderName,
          content: replyingTo.content,
        } : null,
      };

      sendMessage(messageData);

      setText("");
      setMediaFiles([]);
      setMediaPreviews([]);
      setReplyingTo(null);

      if (inputRef.current) {
        inputRef.current.focus();
      }

      if (!isPaginatingRef.current) {
        shouldScrollToBottomRef.current = true;
        setShowArrowToBottom(false);
        
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }, 150);
      }
    } catch (error) {
      console.error("❌ Error sending message:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteMessage = (messageId: string, deleteForAll: boolean) => {
    if (!activeConversation) {
      console.error("❌ No active conversation");
      return;
    }

    deleteMsg(messageId, activeConversation._id, deleteForAll);
  };

  const getFullUrl = (url: string): string => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    if (url.startsWith("/")) return `${BASE_URL}${url}`;
    return `${BASE_URL}/${url}`;
  };

  if (!activeConversation) {
    return (
      <S.WindowContainerDiv>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            color: "#94a3b8",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <Loader size={24} style={{ animation: "spin 1s linear infinite" }} />
          <span>Loading conversation...</span>
        </div>
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </S.WindowContainerDiv>
    );
  }

  return (
    <S.WindowContainerDiv>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
        <div style={{ flex: 1 }}>
          <ChatHeader
            isDirect={isDirect}
            isGroup={isGroup}
            groupName={groupName}
            otherUser={otherUser}
            isOnline={isOnline}
            activeConversation={activeConversation}
            onNavigateProfile={() => {
              if (isDirect && otherUser) {
                navigate(`/profile/${otherUser.userId}`);
              }
            }}
            onOpenGroupSettings={() => setShowGroupSettings(true)}
            getFullUrl={getFullUrl}
          />
        </div>

{isDirect && (
          <div style={{ display: "flex", gap: "8px", paddingRight: "16px" }}>
            <button
              onClick={() => handleCallClick()}
              disabled={callInProgress}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "none",
                backgroundColor: callInProgress ? "#888" : "#10b981",
                color: "white",
                cursor: callInProgress ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 2px 8px rgba(16, 185, 129, 0.3)",
              }}
              onMouseEnter={(e) => {
                if (!callInProgress) {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    "#059669";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 4px 12px rgba(16, 185, 129, 0.4)";
                  (e.currentTarget as HTMLButtonElement).style.transform =
                    "scale(1.1)";
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  callInProgress ? "#888" : "#10b981";
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 2px 8px rgba(16, 185, 129, 0.3)";
                (e.currentTarget as HTMLButtonElement).style.transform =
                  "scale(1)";
              }}
              title="Start Audio Call"
            >
              <Phone size={20} />
            </button>

            <button
              onClick={() => handleCallClick()}
              disabled={callInProgress}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "none",
                backgroundColor: callInProgress ? "#888" : "#3b82f6",
                color: "white",
                cursor: callInProgress ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 2px 8px rgba(59, 130, 246, 0.3)",
              }}
              onMouseEnter={(e) => {
                if (!callInProgress) {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                    "#2563eb";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 4px 12px rgba(59, 130, 246, 0.4)";
                  (e.currentTarget as HTMLButtonElement).style.transform =
                    "scale(1.1)";
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                  callInProgress ? "#888" : "#3b82f6";
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 2px 8px rgba(59, 130, 246, 0.3)";
                (e.currentTarget as HTMLButtonElement).style.transform =
                  "scale(1)";
              }}
              title="Start Video Call"
            >
              <Video size={20} />
            </button>
          </div>
        )}
      </div>

      <div
        ref={messagesContainerRef}
        style={{
          display: "flex",
          flex: 1,
          overflow: "auto",
          position: "relative",
        }}
      >
        <MessageList
          messages={activeMessages}
          isGroup={isGroup}
          isDirect={isDirect}
          currentUserId={currentUser?.userId}
          groupName={groupName}
          messagesStartRef={messagesStartRef}
          messagesEndRef={messagesEndRef}
          getFullUrl={getFullUrl}
          onDeleteMessage={handleDeleteMessage}
          onScroll={handleScroll}
          onReply={(msgId, sender, content) => {
            setReplyingTo({
              messageId: msgId,
              senderName: sender,
              content,
            });
            if (inputRef.current) {
              inputRef.current.focus();
            }
          }}
          onScrollToBottom={() => setShowArrowToBottom(false)} 
        />

        {showArrowToBottom && (
          <button
            onClick={handleScrollToBottom}
            style={{
              position: "absolute",
              bottom: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
              border: "none",
              color: "white",
              padding: "10px 16px",
              borderRadius: "24px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
              boxShadow: "0 4px 16px rgba(139, 92, 246, 0.4)",
              transition: "all 0.3s ease",
              zIndex: 100,
              animation: "slideUp 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform =
                "translateX(-50%) scale(1.05)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 6px 20px rgba(139, 92, 246, 0.5)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform =
                "translateX(-50%) scale(1)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 4px 16px rgba(139, 92, 246, 0.4)";
            }}
          >
            <ArrowDown size={18} />
            Jump to Latest
          </button>
        )}
      </div>

      {isLoadingMessages && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "12px",
            background: "#f5f5f5",
            borderTop: "1px solid #e5e7eb",
            gap: "8px",
          }}
        >
          <Loader size={18} style={{ animation: "spin 1s linear infinite" }} />
          <span style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 500 }}>
            Loading older messages... ({messagesPagination.currentPage} /{" "}
            {messagesPagination.totalPages})
          </span>
        </div>
      )}

      {mediaPreviews.length > 0 && (
        <MediaPreview previews={mediaPreviews} onRemove={removeMedia} />
      )}

      {replyingTo && (
        <ReplyPreview
          senderName={replyingTo.senderName}
          content={replyingTo.content}
          onClear={() => setReplyingTo(null)}
        />
      )}

      <ChatInput
        text={text}
        isUploading={isUploading}
        mediaFiles={mediaFiles}
        fileInputRef={fileInputRef}
        inputRef={inputRef}
        onTextChange={setText}
        onFileSelect={handleFileSelect}
        onSend={handleSend}
      />
      

      {isGroup && activeConversation?.type === "group" && (
        <GroupSettingsModal
          isOpen={showGroupSettings}
          onClose={() => setShowGroupSettings(false)}
          conversationId={activeConversation._id}
          groupName={activeConversation.groupName || ""}
          groupImage={activeConversation.groupImage}
          groupMembers={activeConversation.groupMembers || []}
        />
      )}


      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</style>
    </S.WindowContainerDiv>
  );
};

export default ChatWindow;