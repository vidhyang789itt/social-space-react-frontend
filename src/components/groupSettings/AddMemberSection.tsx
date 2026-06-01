import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserSelectList } from "./UserSelectList";
import { SelectedCountBadge } from "./selectedCountBadge";
import { SelectAllButton } from "./selectAllButtonBadge";
import { UserActions } from "./userAction";

interface User {
  userId: string;
  username: string;
  profileUrl?: string;
}

interface AddMembersSectionProps {
  groupMembers: Array<{
    userId: {
      _id: string;
      userId: string;
      username: string;
      profileUrl?: string;
    };
    role: "admin" | "member";
  }>;
  allUsers?: User[];
  currentUserId?: string;
  isLoading: boolean;
  onAddMembers: (memberIds: string[]) => void;
  onCancel: () => void;
  getFullUrl: (url?: string) => string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const AddMembersSection: React.FC<AddMembersSectionProps> = ({
  groupMembers,
  allUsers = [],
  currentUserId,
  isLoading,
  onAddMembers,
  onCancel,
  getFullUrl,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const navigate = useNavigate();

  const currentMemberIds = useMemo(
    () => groupMembers.map((m) => m.userId.userId),
    [groupMembers]
  );

  const availableUsers = useMemo(() => {
    return allUsers.filter(
      (user) =>
        !currentMemberIds.includes(user.userId) &&
        user.userId !== currentUserId &&
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allUsers, currentMemberIds, currentUserId, searchTerm]);

  const handleSelectMember = (userId: string) => {
    setSelectedMembers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedMembers.length === availableUsers.length) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(availableUsers.map((u) => u.userId));
    }
  };

  const handleAddMembers = () => {
    if (selectedMembers.length === 0) return;
    onAddMembers(selectedMembers);
  };

  return (
    <Container>
      <UserSelectList
        users={availableUsers}
        selectedUserIds={selectedMembers}
        searchTerm={searchTerm}
        isLoading={isLoading}
        onSearchChange={setSearchTerm}
        onSelectUser={handleSelectMember}
        onViewProfile={(userId) => {
          onCancel();
          setTimeout(() => navigate(`/profile/${userId}`), 100);
        }}
        getFullUrl={getFullUrl}
        emptyTitle="No Users Available"
        emptyDescription="Follow some users first to add them to the group"
        showProfileLink
      />

      {selectedMembers.length > 0 && (
        <SelectedCountBadge count={selectedMembers.length} />
      )}

      <SelectAllButton
        totalUsers={availableUsers.length}
        selectedCount={selectedMembers.length}
        isLoading={isLoading}
        onSelectAll={handleSelectAll}
      />

      <UserActions
        primaryText="Add Members"
        secondaryText="Cancel"
        selectedCount={selectedMembers.length}
        isLoading={isLoading}
        onPrimary={handleAddMembers}
        onSecondary={onCancel}
        primaryDisabled={false}
      />

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </Container>
  );
};

export default AddMembersSection;