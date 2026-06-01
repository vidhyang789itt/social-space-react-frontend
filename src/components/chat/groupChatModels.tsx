import React, { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../../store/stores";
import { createGroupChat } from "../../store/slices/chatSlice";
import { fetchConnections } from "../../store/slices/userSlice";
import {
  X,
  Check,
  Loader,
  ChevronRight,
  ChevronLeft,
  ImagePlus,
} from "lucide-react";
import { UserSelectList } from "../groupSettings/UserSelectList";
import * as S from "../../styles/createGroup.styles";
import { useChat } from "../../hooks/useChat";

interface GroupChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = "members" | "details" | "image" | "review";

interface User {
  userId: string;
  username: string;
  profileUrl?: string;
}

const GroupChatModal: React.FC<GroupChatModalProps> = ({ isOpen, onClose }) => {

  const [currentStep, setCurrentStep] = useState<Step>("members");
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [groupImage, setGroupImage] = useState<File | null>(null);
  const [groupImagePreview, setGroupImagePreview] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingUsers, setIsFetchingUsers] = useState(false);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  const dispatch = useDispatch<AppDispatch>();
  const { user: currentUser } = useSelector((state: RootState) => state.auth);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { notifyGroupCreation } = useChat();

  useEffect(() => {
    if (isOpen && currentUser?.userId && allUsers.length === 0) {
      setIsFetchingUsers(true);

      dispatch(
        fetchConnections({
          userId: currentUser.userId,
          type: "following",
        })
      ).then((result: any) => {
        if (result.payload) {
          transformAndSetUsers(result.payload);
        }
        setIsFetchingUsers(false);
      });
    }
  }, [isOpen, currentUser?.userId, dispatch]);

  const transformAndSetUsers = (connectionsData: any) => {
    let usersArray: any[] = [];

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
  };

  const filteredUsers = useMemo(() => {
    return allUsers.filter(
      (user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !selectedMembers.includes(user.userId)
    );
  }, [allUsers, searchTerm, selectedMembers]);

  const selectedUserObjects = useMemo(() => {
    return selectedMembers
      .map((userId) => allUsers.find((u) => u.userId === userId))
      .filter((u): u is User => u !== undefined);
  }, [selectedMembers, allUsers]);

  const handleSelectMember = (userId: string) => {
    setSelectedMembers((prev) => [...prev, userId]);
    setSearchTerm("");
  };

  const handleRemoveMember = (userId: string) => {
    setSelectedMembers((prev) => prev.filter((id) => id !== userId));
  };

  const handleImageUpload = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    setGroupImage(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setGroupImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleCreateGroup = async () => {
    try {
      setIsLoading(true);
      const result = await dispatch(
        createGroupChat({
          groupName: groupName.trim(),
          memberIds: selectedMembers,
          groupImage: groupImage,
        })
      ).unwrap();

      notifyGroupCreation({
        groupId: result._id,
        groupName: groupName.trim(),
        members: selectedMembers,
        createdBy: currentUser?.userId || "",
      });

      setGroupName("");
      setGroupDescription("");
      setGroupImage(null);
      setGroupImagePreview("");
      setSelectedMembers([]);
      setSearchTerm("");
      setCurrentStep("members");
      onClose();
    } catch (error) {
      console.error("❌ Error creating group:", error);
      alert("Failed to create group. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getFullUrl = (url?: string): string => {
    if (!url) return "/profileImage.jpg";
    if (url.startsWith("http")) return url;
    if (url.startsWith("/")) return `${BASE_URL}${url}`;
    return `${BASE_URL}/${url}`;
  };

  const stepTitles: Record<Step, { title: string; desc: string }> = {
    members: {
      title: "Select Members",
      desc: "Choose who you want to add to the group",
    },
    details: {
      title: "Group Details",
      desc: "Name your group and add a description",
    },
    image: {
      title: "Group Image",
      desc: "Add a profile picture (optional)",
    },
    review: {
      title: "Review & Create",
      desc: "Review your group details and create",
    },
  };

  const steps: Step[] = ["members", "details", "image", "review"];
  const currentStepIndex = steps.indexOf(currentStep);

  const canGoNext =
    (currentStep === "members" && selectedMembers.length > 0) ||
    (currentStep === "details" && groupName.trim().length > 0) ||
    currentStep === "image" ||
    currentStep === "review";

  if (!isOpen) return null;

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={(e : any) => e.stopPropagation()}>
        <S.ProgressBar>
          {steps.map((step, index) => (
            <S.ProgressStep
              key={step}
              $active={currentStep === step}
              $completed={currentStepIndex > index}
              onClick={() =>
                currentStepIndex > index && setCurrentStep(step)
              }
            >
              <div className="step-indicator">
                <div className="number">
                  {currentStepIndex > index ? (
                    <Check size={16} />
                  ) : (
                    index + 1
                  )}
                </div>
              </div>
              <div className="step-bar" />
            </S.ProgressStep>
          ))}
        </S.ProgressBar>

        <S.ModalHeader>
          <h2>
            <span className="step-title">
              {stepTitles[currentStep].title}
            </span>
            <span className="step-desc">
              {stepTitles[currentStep].desc}
            </span>
          </h2>
          <button
            onClick={onClose}
            disabled={isLoading || isFetchingUsers}
            type="button"
          >
            <X size={20} />
          </button>
        </S.ModalHeader>

        <S.ModalBody>
          <S.StepContent>
            {currentStep === "members" && (
              <S.MembersStepContainer>
                <S.UserListSection>
                  <UserSelectList
                    users={filteredUsers}
                    selectedUserIds={selectedMembers}
                    searchTerm={searchTerm}
                    isLoading={isLoading || isFetchingUsers}
                    onSearchChange={setSearchTerm}
                    onSelectUser={handleSelectMember}
                    getFullUrl={getFullUrl}
                    emptyTitle={
                      allUsers.length === 0
                        ? "No Users Available"
                        : selectedMembers.length === 0
                          ? "No Users Found"
                          : "All Users Selected"
                    }
                    emptyDescription={
                      allUsers.length === 0
                        ? "Follow some users first to create a group"
                        : selectedMembers.length === 0
                          ? "Try searching with a different name"
                          : "Add more members to continue"
                    }
                    showProfileLink={false}
                  />
                </S.UserListSection>

                {selectedUserObjects.length > 0 && (
                  <S.SelectedMembersPanel>
                    <S.SelectedCountHeader>
                      <span>Selected</span>
                      <span className="count">
                        {selectedMembers.length}
                      </span>
                    </S.SelectedCountHeader>

                    {selectedUserObjects.map((user) => (
                      <S.SelectedMemberBadge key={user.userId}>
                        <img
                          src={getFullUrl(user.profileUrl)}
                          alt={user.username}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "/profileImage.jpg";
                          }}
                        />
                        <span className="name">{user.username}</span>
                        <button
                          className="remove-btn"
                          onClick={() => handleRemoveMember(user.userId)}
                          type="button"
                          title="Remove member"
                        >
                          <X size={12} />
                        </button>
                      </S.SelectedMemberBadge>
                    ))}
                  </S.SelectedMembersPanel>
                )}
              </S.MembersStepContainer>
            )}

            {currentStep === "details" && (
              <>
                <S.InputGroup>
                  <label>
                    Group Name{" "}
                    <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Project Team, Friends, Work Group..."
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    disabled={isLoading}
                    maxLength={50}
                    autoFocus
                  />
                  <span className="char-count">
                    {groupName.length}/50 characters
                  </span>
                </S.InputGroup>

                <S.InputGroup>
                  <label>Group Description (Optional)</label>
                  <input
                    type="text"
                    placeholder="Add a description for your group..."
                    value={groupDescription}
                    onChange={(e) =>
                      setGroupDescription(e.target.value)
                    }
                    disabled={isLoading}
                    maxLength={150}
                  />
                  <span className="char-count">
                    {groupDescription.length}/150 characters
                  </span>
                </S.InputGroup>
              </>
            )}

            {currentStep === "image" && (
              <S.InputGroup>
                <label>Group Image (Optional)</label>
                <S.ImageUploadBox
                  onClick={() =>
                    document
                      .getElementById("image-input")
                      ?.click()
                  }
                >
                  <input
                    id="image-input"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        handleImageUpload(e.target.files[0]);
                      }
                    }}
                  />
                  {groupImagePreview ? (
                    <div style={{ textAlign: "center" }}>
                      <img
                        src={groupImagePreview}
                        alt="Preview"
                        style={{
                          width: "120px",
                          height: "120px",
                          borderRadius: "12px",
                          objectFit: "cover",
                          marginBottom: "1rem",
                        }}
                      />
                      <div className="upload-content">
                        <div className="text">
                          Click to change image
                        </div>
                        <div className="hint">
                          Max 5MB, JPG or PNG format
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="upload-content">
                      <ImagePlus />
                      <div className="text">
                        Click or drag to upload
                      </div>
                      <div className="hint">
                        Max 5MB, JPG or PNG format
                      </div>
                    </div>
                  )}
                </S.ImageUploadBox>
              </S.InputGroup>
            )}

            {currentStep === "review" && (
              <S.ReviewSection>
                {groupImagePreview && (
                  <div style={{ textAlign: "center" }}>
                    <img
                      src={groupImagePreview}
                      alt="Group"
                      style={{
                        width: "120px",
                        height: "120px",
                        borderRadius: "12px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}

                <S.ReviewCard>
                  <div className="label">Group Name</div>
                  <div className="content">{groupName}</div>
                </S.ReviewCard>

                {groupDescription && (
                  <S.ReviewCard>
                    <div className="label">Description</div>
                    <div
                      className="content"
                      style={{
                        fontSize: "0.95rem",
                        fontWeight: "500",
                      }}
                    >
                      {groupDescription}
                    </div>
                  </S.ReviewCard>
                )}

                <S.ReviewCard className="with-grid">
                  <div className="label">
                    Members ({selectedMembers.length})
                  </div>
                  <div className="grid">
                    {selectedUserObjects.map((user) => (
                      <div
                        key={user.userId}
                        className="member"
                      >
                        <img
                          src={getFullUrl(user.profileUrl)}
                          alt={user.username}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "/profileImage.jpg";
                          }}
                        />
                        <span className="member-name">
                          {user.username}
                        </span>
                      </div>
                    ))}
                  </div>
                </S.ReviewCard>
              </S.ReviewSection>
            )}
          </S.StepContent>
        </S.ModalBody>

        <S.ModalFooter>
          <button
            className="back"
            onClick={() => {
              const prevIndex = currentStepIndex - 1;
              if (prevIndex >= 0) {
                setCurrentStep(steps[prevIndex]);
              } else {
                onClose();
              }
            }}
            disabled={isLoading || isFetchingUsers}
            type="button"
          >
            <ChevronLeft size={18} />
            Back
          </button>

          <button
            className="next"
            onClick={() => {
              const nextIndex = currentStepIndex + 1;
              if (nextIndex < steps.length) {
                setCurrentStep(steps[nextIndex]);
              } else {
                handleCreateGroup();
              }
            }}
            disabled={!canGoNext || isLoading || isFetchingUsers}
            type="button"
          >
            {currentStep === "review" ? (
              <>
                {isLoading ? (
                  <>
                    <Loader
                      size={18}
                      style={{
                        animation: "spin 1s linear infinite",
                      }}
                    />
                    Creating...
                  </>
                ) : (
                  <>
                    Create Group
                    <Check size={18} />
                  </>
                )}
              </>
            ) : (
              <>
                Next
                <ChevronRight size={18} />
              </>
            )}
          </button>
        </S.ModalFooter>
      </S.ModalContent>

      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </S.ModalOverlay>
  );
};

export default GroupChatModal;