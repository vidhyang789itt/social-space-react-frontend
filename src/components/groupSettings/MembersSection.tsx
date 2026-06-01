import React, { useMemo } from "react";
import { Trash2, Plus, Shield, Users, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as S from "../../styles/groupChat.styles";
import { HeaderRow, MemberItem, MemberListContainer } from "../../styles/membersSection.styles";
import { EmptyState } from "../../styles/messageList.styles";

interface MembersSectionProps {
  groupMembers: Array<{
    userId: {
      _id: string;
      userId: string;
      username: string;
      profileUrl?: string;
    };
    role: "admin" | "member";
  }>;
  isAdmin: boolean;
  isLoading: boolean;
  currentUserId?: string;
  onRemoveMember: (userId: string) => void;
  onAddClick: () => void;
  getFullUrl: (url?: string) => string;
}

const MembersSection: React.FC<MembersSectionProps> = ({
  groupMembers,
  isAdmin,
  isLoading,
  currentUserId,
  onRemoveMember,
  onAddClick,
  getFullUrl,
}) => {
  const navigate = useNavigate();

  const adminCount = useMemo(
    () => groupMembers.filter((m) => m.role === "admin").length,
    [groupMembers]
  );

  const handleViewProfile = (e: React.MouseEvent, userId: string) => {
    e.stopPropagation();
    navigate(`/profile/${userId}`);
  };

  return (
    <S.Section>
      <HeaderRow>
        <h3>
          <Users size={18} />
          Members ({groupMembers.length})
        </h3>
        {isAdmin && (
          <button onClick={onAddClick} disabled={isLoading} type="button">
            <Plus size={16} />
            Add Member
          </button>
        )}
      </HeaderRow>

      {groupMembers.length > 0 ? (
        <MemberListContainer>
          {groupMembers.map((member) => (
            <MemberItem key={member.userId._id}>
              <div className="member-card">
                <img
                  src={
                    member.userId.profileUrl
                      ? getFullUrl(member.userId.profileUrl)
                      : "/profileImage.jpg"
                  }
                  alt={member.userId.username}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/profileImage.jpg";
                  }}
                />
                <div className="member-info">
                  <div className="member-name">
                    {member.userId.username}
                    {member.userId.userId === currentUserId && " (You)"}
                  </div>
                  <div className="member-meta">
                    {member.role === "admin" && (
                      <span className="member-role">
                        <Shield size={12} />
                        Admin
                      </span>
                    )}
                    {member.userId.userId === currentUserId && (
                      <span className="you-badge">You</span>
                    )}
                  </div>
                </div>

                {member.userId.userId !== currentUserId && (
                  <button
                    className="profile-link"
                    onClick={(e) => handleViewProfile(e, member.userId.userId)}
                    type="button"
                    title="View user profile"
                    aria-label={`View ${member.userId.username} profile`}
                  >
                    <ExternalLink size={14} />
                  </button>
                )}
              </div>

              {isAdmin && member.userId.userId !== currentUserId && (
                <div className="member-actions">
                  <button
                    onClick={() => onRemoveMember(member.userId.userId)}
                    disabled={
                      isLoading ||
                      (adminCount === 1 && member.role === "admin")
                    }
                    type="button"
                    title={
                      adminCount === 1 && member.role === "admin"
                        ? "Cannot remove the last admin"
                        : "Remove member"
                    }
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            </MemberItem>
          ))}
        </MemberListContainer>
      ) : (
        <EmptyState>
          <Users size={32} />
          <span className="text">No members yet</span>
        </EmptyState>
      )}
    </S.Section>
  );
};

export default MembersSection;