import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../../store/stores";
import {
  updateGroupInfo,
  updateGroupImage,
  addGroupMember,
  removeGroupMember,
  leaveGroup,
  deleteGroup,
} from "../../store/slices/chatSlice";
import { fetchConnections } from "../../store/slices/userSlice";
import { X, Loader } from "lucide-react";
import * as S from "../../styles/groupChat.styles";
import GroupInfoSection from "./GroupInfoSection";
import MembersSection from "./MembersSection";
import AddMembersSection from "./AddMemberSection";
import ConfirmModal from "../confirm/confirnModal";
import { useToast } from "../notifications/toastContext";

interface User {
  userId: string;
  username: string;
  profileUrl?: string;
}

interface GroupSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  conversationId: string;
  groupName: string;
  groupImage?: string;
  groupMembers: Array<{
    userId: {
      _id: string;
      userId: string;
      username: string;
      profileUrl?: string;
    };
    role: "admin" | "member";
  }>;
}

interface ConfirmAction {
  type: "remove" | "leave" | "delete" | null;
  data?: { userId?: string };
}

const GroupSettingsModal: React.FC<GroupSettingsModalProps> = ({
  isOpen,
  onClose,
  conversationId,
  groupName: initialGroupName,
  groupImage: initialGroupImage,
  groupMembers,
}) => {
  const [groupName, setGroupName] = useState(initialGroupName);
  const [groupImage, setGroupImage] = useState(initialGroupImage);
  const [isAddingMembers, setIsAddingMembers] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [isFetchingUsers, setIsFetchingUsers] = useState(false);
  const [confirmAction, setConfirmAction] = useState<ConfirmAction>({
    type: null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const { user: currentUser } = useSelector((state: RootState) => state.auth);
  
  const currentUserRole = groupMembers.find(
    (m) => m.userId.userId === currentUser?.userId
  )?.role;

  const isAdmin = currentUserRole === "admin";

  useEffect(() => {
    if (isOpen && isAdmin && currentUser?.userId && allUsers.length === 0) {
      console.log("📥 Fetching followers for:", currentUser.userId);
      setIsFetchingUsers(true);

      dispatch(
        fetchConnections({
          userId: currentUser.userId,
          type: "followers",
        })
      ).then((result: any) => {
        if (result.payload) {
          transformAndSetUsers(result.payload);
        }
        setIsFetchingUsers(false);
      });
    }
  }, [isOpen, isAdmin, currentUser?.userId, dispatch]);

  const transformAndSetUsers = (connectionsData: any) => {

    let usersArray = [];

    if (Array.isArray(connectionsData)) {
      usersArray = connectionsData;
    } else if (
      connectionsData.followers &&
      Array.isArray(connectionsData.followers)
    ) {
      usersArray = connectionsData.followers;
    } else if (connectionsData.data && Array.isArray(connectionsData.data)) {
      usersArray = connectionsData.data;
    }


    const transformedUsers: User[] = usersArray.map((user: any) => ({
      userId: user.userId || user._id || user.id,
      username: user.username || user.name || "Unknown",
      profileUrl: user.profileUrl || user.profile_url || "",
    }));

    setAllUsers(transformedUsers);

    if (transformedUsers.length === 0) {
      showToast("No followers found. Follow some users first!", "info");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      showToast("Please select an image file", "error");
      return;
    }

    if (!file.type.startsWith("image/")) {
      showToast("Please select a valid image file", "error");
      return;
    }

    try {
      setIsLoading(true);

      const result = await dispatch(
        updateGroupImage({
          groupId: conversationId,
          file: file,
        })
      ).unwrap();


      setGroupImage(result.groupImage);
      showToast("Group image updated successfully", "success");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("❌ Error uploading image:", error);
      showToast(
        `Failed to upload image: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateGroupInfo = async () => {
    if (!groupName.trim()) {
      showToast("Group name is required", "error");
      return;
    }

    try {
      setIsLoading(true);

      await dispatch(
        updateGroupInfo({
          groupId: conversationId,
          groupName: groupName.trim(),
        })
      ).unwrap();

      showToast("Group updated successfully", "success");
    } catch (error) {
      console.error("Error updating group:", error);
      showToast("Failed to update group", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddMembers = async (selectedMemberIds: string[]) => {
    if (selectedMemberIds.length === 0) {
      showToast("Please select at least one member", "error");
      return;
    }

    try {
      setIsLoading(true);
      await dispatch(
        addGroupMember({
          groupId: conversationId,
          memberIds: selectedMemberIds,
        })
      ).unwrap();

      showToast("Members added successfully", "success");
      setIsAddingMembers(false);
    } catch (error) {
      console.error("Error adding members:", error);
      showToast("Failed to add members", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveMember = async (userId: string) => {
    try {
      setIsLoading(true);
      await dispatch(
        removeGroupMember({
          groupId: conversationId,
          userId,
        })
      ).unwrap();

      showToast("Member removed successfully", "success");
      setConfirmAction({ type: null });
    } catch (error) {
      console.error("Error removing member:", error);
      showToast("Failed to remove member", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeaveGroup = async () => {
    try {
      setIsLoading(true);
      await dispatch(leaveGroup(conversationId)).unwrap();

      showToast("You left the group", "success");
      setConfirmAction({ type: null });
      onClose();
      navigate("/chat");
    } catch (error) {
      console.error("Error leaving group:", error);
      showToast("Failed to leave group", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteGroup = async () => {
    try {
      setIsLoading(true);
      await dispatch(deleteGroup(conversationId)).unwrap(); 

      showToast("Group deleted successfully", "success");
      setConfirmAction({ type: null });
      onClose();
      navigate("/chat");
    } catch (error) {
      console.error("Error deleting group:", error);
      showToast("Failed to delete group", "error");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const getFullUrl = (url?: string): string => {
    if (!url) {
      return "./groupImage.jpg";
    }

    if (url.startsWith("http")) {
      return url;
    }

    if (url.startsWith("/")) {
      return url;
    }

    const BASE_URL = import.meta.env.VITE_BASE_URL || "";
    return `${BASE_URL}/${url}`;
  };

  return (
    <>
      <S.ModalOverlay onClick={onClose}>
        <S.ModalContent onClick={(e) => e.stopPropagation()}>
          <S.ModalHeader>
            <h2>Group Settings</h2>
            <button onClick={onClose} disabled={isLoading} type="button">
              <X size={20} />
            </button>
          </S.ModalHeader>

          <S.ModalBody>
            <GroupInfoSection
              groupName={groupName}
              groupImage={groupImage}
              fileInputRef={fileInputRef}
              isAdmin={isAdmin}
              isLoading={isLoading}
              initialGroupName={initialGroupName}
              onGroupNameChange={setGroupName}
              onImageUpload={handleImageUpload}
              onUpdateGroupInfo={handleUpdateGroupInfo}
              getFullUrl={getFullUrl}
            />

            {!isAddingMembers ? (
              <MembersSection
                groupMembers={groupMembers}
                isAdmin={isAdmin}
                isLoading={isLoading}
                currentUserId={currentUser?.userId}
                onRemoveMember={(userId) => {
                  setConfirmAction({ type: "remove", data: { userId } });
                }}
                onAddClick={() => setIsAddingMembers(true)}
                getFullUrl={getFullUrl}
              />
            ) : isFetchingUsers ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "40px 20px",
                  color: "#94a3b8",
                }}
              >
                <Loader
                  size={24}
                  style={{ animation: "spin 1s linear infinite" }}
                />
                <span style={{ marginLeft: "12px" }}>Loading users...</span>
              </div>
            ) : (
               <AddMembersSection
                groupMembers={groupMembers}
                allUsers={allUsers}
                currentUserId={currentUser?.userId}
                isLoading={isLoading}
                onAddMembers={handleAddMembers}
                onCancel={() => setIsAddingMembers(false)}
                getFullUrl={getFullUrl}
              />
            )}

          {!isAdmin && (
            <S.Section>
              <S.LeaveGroupButton
                onClick={() => setConfirmAction({ type: "leave" })}
                disabled={isLoading}
              >
                📤 Leave Group
              </S.LeaveGroupButton>
            </S.Section>
          )}

          {isAdmin && (
            <S.Section>
              <S.DeleteGroupButton
                onClick={() => setConfirmAction({ type: "delete" })}
                disabled={isLoading}
              >
                🗑️ Delete Group
              </S.DeleteGroupButton>
            </S.Section>
          )}
          </S.ModalBody>
        </S.ModalContent>
      </S.ModalOverlay>

      <ConfirmModal
        isOpen={confirmAction.type === "remove"}
        title="Remove Member"
        message="Are you sure you want to remove this member from the group? They can be added back later."
        confirmText="Remove"
        cancelText="Cancel"
        isLoading={isLoading}
        isDanger={true}
        onConfirm={() => {
          if (confirmAction.data?.userId) {
            handleRemoveMember(confirmAction.data.userId);
          }
        }}
        onCancel={() => setConfirmAction({ type: null })}
      />

      <ConfirmModal
        isOpen={confirmAction.type === "leave"}
        title="Leave Group"
        message="Are you sure you want to leave this group? You won't be able to rejoin unless someone adds you back."
        confirmText="Leave"
        cancelText="Cancel"
        isLoading={isLoading}
        isDanger={true}
        onConfirm={handleLeaveGroup}
        onCancel={() => setConfirmAction({ type: null })}
      />

      <ConfirmModal
        isOpen={confirmAction.type === "delete"}
        title="Delete Group"
        message="Are you sure you want to delete this group? This action cannot be undone. All members will be removed and the group will be permanently deleted."
        confirmText="Delete Group"
        cancelText="Cancel"
        isLoading={isLoading}
        isDanger={true}
        onConfirm={handleDeleteGroup}
        onCancel={() => setConfirmAction({ type: null })}
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

export default GroupSettingsModal;