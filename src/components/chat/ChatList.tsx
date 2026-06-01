import React, { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import type { RootState, AppDispatch } from "../../store/stores";
import { formatDistanceToNow } from "date-fns";
import * as S from "../../styles/chat.styles";
import { XCircle, Plus, Loader } from "lucide-react";
import GroupChatModal from "./groupChatModels";
import { fetchConversations } from "../../store/slices/chatSlice";
import { useToast } from "../notifications/toastContext";
import { getMediaUrl } from "../../utils/getMediaUrl";

const ChatList: React.FC = () => {
  const { conversations, loading, onlineUsers } = useSelector(
    (state: RootState) => state.chats
  );
  const { user: currentUser } = useSelector((state: RootState) => state.auth);
  const { otherUserId, groupId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { showToast } = useToast();

  const [searchTerm, setSearchTerm] = useState("");
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);


  const filteredConversations = useMemo(() => {
    const conversationsCopy = [...conversations];

    const filtered = conversationsCopy.filter((conv) => {
      if (conv.type === "group") {
        const groupName = conv.groupName || "";
        return groupName.toLowerCase().includes(searchTerm.toLowerCase());
      } else {
        const participant =
          conv.user1?.userId === currentUser?.userId ? conv.user2 : conv.user1;
        const username = participant?.username || "";
        return username.toLowerCase().includes(searchTerm.toLowerCase());
      }
    });

    return filtered.sort((a, b) => {
      const dateA = new Date(a.updatedAt).getTime();
      const dateB = new Date(b.updatedAt).getTime();
      return dateB - dateA;
    });
  }, [conversations, searchTerm, currentUser?.userId]);

  const isUserOnline = (userId: string | undefined): boolean => {
    if (!userId) return false;
    const userIdStr = String(userId).trim();
    return onlineUsers.some((id) => String(id).trim() === userIdStr);
  };

  const handleGroupModalClose = async () => {
    setShowGroupModal(false);
    try {
      setIsLoadingMore(true);
      await dispatch(fetchConversations()).unwrap();
    } catch (error) {
      console.error("Error refreshing conversations:", error);
      showToast("Failed to refresh conversations", "error");
    } finally {
      setIsLoadingMore(false);
    }
  };
  
  if (loading && filteredConversations.length === 0) {
    return (
      <S.SidebarList $hideMobile={!!otherUserId || !!groupId}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            color: "#94a3b8",
          }}
        >
          <Loader size={24} style={{ animation: "spin 1s linear infinite" }} />
        </div>
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </S.SidebarList>
    );
  }

  return (
    <>
      <S.SidebarList $hideMobile={!!otherUserId || !!groupId}>
        <S.SidebarHeader>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px 20px 0",
              gap: "12px",
            }}
          >
            <h2 style={{ padding: 0, fontSize: "24px", margin: 0 }}>
              Messages
            </h2>
            <button
              onClick={() => setShowGroupModal(true)}
              disabled={isLoadingMore}
              style={{
                background: "#8b5cf6",
                border: "none",
                color: "white",
                borderRadius: "8px",
                padding: "8px 12px",
                cursor: isLoadingMore ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "14px",
                fontWeight: "600",
                transition: "background 0.2s",
                opacity: isLoadingMore ? 0.5 : 1,
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                if (!isLoadingMore) {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "#7c3aed";
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "#8b5cf6";
              }}
              title="Create a new group chat"
            >
              {isLoadingMore ? (
                <Loader size={18} style={{ animation: "spin 1s linear infinite" }} />
              ) : (
                <Plus size={18} />
              )}
              New Group
            </button>
          </div>

          <S.SearchWrapper>
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={loading}
            />
            {searchTerm && (
              <XCircle
                size={18}
                onClick={() => setSearchTerm("")}
                style={{
                  position: "absolute",
                  right: "35px",
                  cursor: "pointer",
                  color: "#94a3b8",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#64748b";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#94a3b8";
                }}
              />
            )}
          </S.SearchWrapper>
        </S.SidebarHeader>

        <S.ScrollableList>
          {filteredConversations.length === 0 ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                color: "#94a3b8",
                textAlign: "center",
                padding: "20px",
              }}
            >
              <div>
                <p style={{ margin: "0 0 8px 0", fontSize: "14px" }}>
                  {searchTerm ? "No conversations found" : "No conversations yet"}
                </p>
                {!searchTerm && (
                  <p style={{ margin: 0, fontSize: "12px" }}>
                    Start a new conversation or create a group
                  </p>
                )}
              </div>
            </div>
          ) : (
            filteredConversations.map((conv) => {
              const isGroupChat = conv.type === "group";

              const participant = !isGroupChat
                ? conv.user1?.userId === currentUser?.userId
                  ? conv.user2
                  : conv.user1
                : null;

              const isActive = isGroupChat
                ? groupId === conv._id
                : otherUserId === participant?.userId;

              let unreadCount = 0;
              if (isGroupChat) {
                
                unreadCount =
                  conv.groupUnreadCounts?.find(
                    (item) => item._id === currentUser?._id
                  )?.unreadCount || 0;
              } else {
                unreadCount =
                  conv.user1?.userId === currentUser?.userId
                    ? conv.unreadCountUser1 || 0
                    : conv.unreadCountUser2 || 0;
              }

              if (unreadCount === undefined) {
                unreadCount = 0;
              }

              const isOnline = !isGroupChat && participant
                ? isUserOnline(participant.userId)
                : false;

              const displayName = isGroupChat
                ? conv.groupName
                : participant?.username;
              const displayImage = isGroupChat
                ? conv.groupImage ? getMediaUrl(conv.groupImage) : "/groupImage.jpg"
                : participant?.profileUrl ? getMediaUrl(participant.profileUrl) : "/profileImage.jpg";

              const handleClick = () => {
                if (isGroupChat) {
                  navigate(`/chat/group/${conv._id}`);
                } else {
                  navigate(`/chat/${participant?.userId}`);
                }
              };

              return (
                <S.ConversationItem
                  key={conv._id}
                  $active={isActive}
                  onClick={handleClick}
                  title={displayName}
                >
                  <div
                    style={{
                      position: "relative",
                      marginRight: 15,
                      flexShrink: 0,
                      width: "48px",
                      height: "48px",
                    }}
                  >
                    <img
                      src={displayImage}
                      alt={displayName}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: isOnline
                          ? "2px solid #22c55e"
                          : "2px solid transparent",
                        transition: "border-color 0.3s ease",
                      }}
                    />
                    {isOnline && !isGroupChat && (
                      <span
                        style={{
                          position: "absolute",
                          bottom: "2px",
                          right: "0px",
                          width: "12px",
                          height: "12px",
                          backgroundColor: "#22c55e",
                          border: "2px solid white",
                          borderRadius: "50%",
                          boxShadow: "0 0 4px rgba(34, 197, 94, 0.5)",
                          transition: "background-color 0.3s ease",
                        }}
                      />
                    )}
                    {isGroupChat && (
                      <span
                        style={{
                          position: "absolute",
                          bottom: "2px",
                          right: "0px",
                          width: "12px",
                          height: "12px",
                          backgroundColor: "#8b5cf6",
                          border: "2px solid white",
                          borderRadius: "50%",
                        }}
                      />
                    )}
                  </div>

                  <S.ConversationContent>
                    <b style={{ fontSize: "14px" }}>{displayName}</b>
                    <p
                      style={{
                        fontSize: "13px",
                        margin: 0,
                        opacity: unreadCount > 0 ? 1 : 0.7,
                        fontWeight: unreadCount > 0 ? "700" : "400",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {conv.lastMessage || "Start a conversation"}
                    </p>
                  </S.ConversationContent>

                  <S.MetaSection>
                    <S.TimeStamp>
                      {formatDistanceToNow(new Date(conv.updatedAt), {
                        addSuffix: false,
                      })}
                    </S.TimeStamp>
                    {unreadCount > 0 ? (
                      <S.UnreadBadge>
                        {unreadCount > 9 ? "9+" : unreadCount}
                      </S.UnreadBadge>
                    ) : (
                      <div style={{ height: "18px" }} />
                    )}
                  </S.MetaSection>
                </S.ConversationItem>
              );
            })
          )}
        </S.ScrollableList>
      </S.SidebarList>

      <GroupChatModal
        isOpen={showGroupModal}
        onClose={handleGroupModalClose}
      />

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default ChatList;
