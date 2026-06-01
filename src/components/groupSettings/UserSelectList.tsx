import React from "react";
import { Search, Check, AlertCircle, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Container, EmptyState, Item, List, SearchInputWrapper } from "../../styles/userSelectList.styles";


interface User {
  userId: string;
  username: string;
  profileUrl?: string;
}

interface UserSelectListProps {
  users: User[];
  selectedUserIds: string[];
  searchTerm: string;
  isLoading?: boolean;
  onSearchChange: (term: string) => void;
  onSelectUser: (userId: string) => void;
  onViewProfile?: (userId: string) => void;
  getFullUrl: (url?: string) => string;
  emptyTitle?: string;
  emptyDescription?: string;
  showProfileLink?: boolean;
}

export const UserSelectList: React.FC<UserSelectListProps> = ({
  users,
  selectedUserIds,
  searchTerm,
  isLoading,
  onSearchChange,
  onSelectUser,
  onViewProfile,
  getFullUrl,
  emptyTitle = "No Users Found",
  emptyDescription = "Try searching with a different name",
  showProfileLink = true,
}) => {
  const navigate = useNavigate();

  const handleViewProfile = (e: React.MouseEvent, userId: string) => {
    e.stopPropagation();
    if (onViewProfile) {
      onViewProfile(userId);
    } else {
      navigate(`/profile/${userId}`);
    }
  };

  return (
    <Container>
      <SearchInputWrapper>
        <Search size={18} />
        <input
          type="text"
          placeholder="Search members by name..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          disabled={isLoading}
          autoFocus
        />
      </SearchInputWrapper>

      {users.length > 0 ? (
        <List>
          {users.map((user) => (
            <Item
              key={user.userId}
              $selected={selectedUserIds.includes(user.userId)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  onSelectUser(user.userId);
                }
              }}
            >
              <div
                className="user-card"
                onClick={() => onSelectUser(user.userId)}
              >
                <img
                  src={getFullUrl(user.profileUrl)}
                  alt={user.username}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/profileImage.jpg";
                  }}
                />
                <div className="user-info">
                  <div className="user-name">{user.username}</div>
                  <div className="user-status">
                    Click to add • View profile →
                  </div>
                </div>
                {showProfileLink && (
                  <button
                    className="profile-link"
                    onClick={(e) => handleViewProfile(e, user.userId)}
                    type="button"
                    title="View user profile"
                  >
                    <ExternalLink size={14} />
                  </button>
                )}
              </div>

              <div
                className="checkbox"
                onClick={() => onSelectUser(user.userId)}
              >
                {selectedUserIds.includes(user.userId) && (
                  <Check size={12} />
                )}
              </div>
            </Item>
          ))}
        </List>
      ) : (
        <EmptyState>
          <AlertCircle />
          <div className="title">{emptyTitle}</div>
          <div className="description">{emptyDescription}</div>
        </EmptyState>
      )}
    </Container>
  );
};