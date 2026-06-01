import React from "react";
import { Settings } from "lucide-react";
import * as S from "../../styles/chat.styles";
import type { ConversationType } from "../../types/Conversation";

interface ChatHeaderProps {
  isDirect: boolean;
  isGroup: boolean;
  groupName?: string;
  otherUser?: any;
  isOnline: boolean;
  activeConversation?: ConversationType | null;
  onNavigateProfile: () => void;
  onOpenGroupSettings: () => void;
  getFullUrl: (url: string) => string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  isDirect,
  isGroup,
  groupName = "Chat", 
  otherUser,
  isOnline,
  activeConversation,
  onNavigateProfile,
  onOpenGroupSettings,
}) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  return (
    <S.ChatHeader>
      <div
        className="user-info cursor-pointer"
        onClick={onNavigateProfile}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          flex: 1,
          cursor: isDirect ? "pointer" : "default",
        }}
      >
        <div style={{ position: "relative", width: "42px", height: "42px" }}>
          <img
            src={
              isGroup && activeConversation?.type === "group"
                ? activeConversation?.groupImage ? `${BASE_URL}/${activeConversation?.groupImage}` : "/groupImage.jpg"
                : isDirect && otherUser?.profileUrl
                  ? `${BASE_URL}/${otherUser.profileUrl}`
                  : "/profileImage.jpg"
            }
            alt={groupName}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              objectFit: "cover",
              border: isDirect && isOnline ? "2px solid #22c55e" : "transparent",
              transition: "border-color 0.3s ease",
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/profileImage.jpg";
            }}
          />
          {isDirect && isOnline && (
            <span
              style={{
                position: "absolute",
                bottom: "2px",
                right: "2px",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#22c55e",
                border: "2px solid white",
                boxShadow: "0 0 4px rgba(0,0,0,0.1)",
                zIndex: 1,
                transition: "background-color 0.3s ease",
              }}
            />
          )}
        </div>

        <div>
          <div
            style={{
              fontWeight: 600,
              fontSize: "15px",
              lineHeight: "1.2",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {groupName}
          </div>
          <div
            style={{
              fontSize: "11px",
              color: isDirect && isOnline ? "#22c55e" : "#94a3b8",
              fontWeight: 500,
              marginTop: "2px",
              transition: "color 0.3s ease",
            }}
          >
            {isGroup
              ? `${activeConversation?.groupMembers?.length || 0} members`
              : isOnline
                ? "Active Now"
                : "Offline"}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        {isGroup && (
          <button
            onClick={onOpenGroupSettings}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              display: "flex",
              alignItems: "center",
              color: "#64748b",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#8b5cf6";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#64748b";
            }}
            title="Group Settings"
            type="button"
          >
            <Settings size={20} />
          </button>
        )}
      </div>
    </S.ChatHeader>
  );
};

export default ChatHeader;