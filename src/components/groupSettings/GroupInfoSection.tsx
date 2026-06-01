import React from "react";
import * as S from "../../styles/groupChat.styles";
import { Camera, AlertCircle } from "lucide-react";
import { GroupImageContainer, ImageUploadButton, InfoBanner, InputGroup, SaveButton } from "../../styles/groupInfoSection.styles";


interface GroupInfoSectionProps {
  groupName: string;
  groupImage?: string;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  isAdmin: boolean;
  isLoading: boolean;
  initialGroupName: string;
  onGroupNameChange: (name: string) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpdateGroupInfo: () => void;
  getFullUrl: (url?: string) => string;
}

const GroupInfoSection: React.FC<GroupInfoSectionProps> = ({
  groupName,
  groupImage,
  fileInputRef,
  isAdmin,
  isLoading,
  initialGroupName,
  onGroupNameChange,
  onImageUpload,
  onUpdateGroupInfo,
}) => {
  const hasChanges = groupName !== initialGroupName;

  const getImageSrc = () => {
    if (!groupImage) {
      return "/groupImage.jpg";
    }

    if (groupImage.startsWith("http")) {
      return groupImage;
    }

    if (groupImage.startsWith("/uploads")) {
      return groupImage;
    }

    try {
      const BASE_URL = import.meta.env.VITE_BASE_URL || "";
      if (groupImage.startsWith("/")) {
        return `${BASE_URL}${groupImage}`;
      }
      return `${BASE_URL}/${groupImage}`;
    } catch {
      return "/default-group.png";
    }
  };

  return (
    <S.Section>
      <h3>📋 Group Information</h3>

      {!isAdmin && (
        <InfoBanner>
          <AlertCircle size={18} />
          <span className="info-text">
            Only group admins can edit this information
          </span>
        </InfoBanner>
      )}

      <GroupImageContainer>
        <img
          src={getImageSrc()}
          alt="Group"
          loading="lazy"
          onError={(e) => {
            console.log("❌ Image failed to load:", getImageSrc());
            (e.currentTarget as HTMLImageElement).src = "/default-group.png";
          }}
          onLoad={() => {
            console.log("✅ Image loaded successfully:", getImageSrc());
          }}
        />
        {isAdmin && (
          <>
            <ImageUploadButton
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
              type="button"
              title="Upload group image"
              aria-label="Upload group image"
            >
              <Camera size={16} />
            </ImageUploadButton>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={onImageUpload}
              style={{ display: "none" }}
              disabled={isLoading}
              aria-hidden="true"
            />
          </>
        )}
      </GroupImageContainer>

      <InputGroup>
        <label>
          Group Name {isAdmin && <span style={{ color: "#ef4444" }}>*</span>}
        </label>
        <input
          type="text"
          value={groupName}
          onChange={(e) => onGroupNameChange(e.target.value)}
          disabled={!isAdmin || isLoading}
          placeholder="Enter group name"
          maxLength={50}
          aria-label="Group name"
        />
        <small>{groupName.length}/50 characters</small>
      </InputGroup>

      {isAdmin && (
        <SaveButton
          onClick={onUpdateGroupInfo}
          disabled={isLoading || !hasChanges}
          type="button"
          aria-label="Save group changes"
        >
          {isLoading ? (
            <>
              <span style={{ animation: "spin 1s linear infinite" }}>⏳</span>
              Saving...
            </>
          ) : (
            <>
              ✓ Save Changes
            </>
          )}
        </SaveButton>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </S.Section>
  );
};

export default GroupInfoSection;