import {
  ModalOverlay,
  ModalContainer,
  ModalTitle,
  ModalInput,
  ModalButtonRow,
  PurpleButton,
  CancelButton,
} from "../../styles/Profile.style";
import ErrorMessage from "../common/ErrorState";

export const ProfileInfo = ({ hookProps }: { hookProps: any }) => {
  const {
    isEditing,
    setIsEditing,
    isChangingPassword,
    setIsChangingPassword,
    formData,
    setFormData,
    passwordData,
    setPasswordData,
    error,
    setError,
    handleSaveProfile,
    handlePasswordUpdate,
  } = hookProps;

  return (
    <>
      {isEditing && (
        <ModalOverlay onClick={() => setIsEditing(false)}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <ModalTitle>Edit Profile</ModalTitle>

            {error && (
              <ErrorMessage message={error} onClose={() => setError("")} />
            )}

            <ModalInput
              value={formData.username}
              onChange={(e: any) =>
                setFormData({
                  ...formData,
                  username: e.target.value,
                })
              }
              placeholder="Username"
            />

            <ModalInput
              value={formData.email}
              onChange={(e: any) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              placeholder="Email"
            />

            <ModalButtonRow>
              <CancelButton onClick={() => setIsEditing(false)}>
                Cancel
              </CancelButton>

              <PurpleButton onClick={handleSaveProfile}>Save</PurpleButton>
            </ModalButtonRow>
          </ModalContainer>
        </ModalOverlay>
      )}

      {isChangingPassword && (
        <ModalOverlay onClick={() => setIsChangingPassword(false)}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <ModalTitle>Change Password</ModalTitle>

            {error && (
              <ErrorMessage message={error} onClose={() => setError("")} />
            )}

            <ModalInput
              type="password"
              placeholder="Current Password"
              value={passwordData.currentPassword}
              onChange={(e: any) =>
                setPasswordData({
                  ...passwordData,
                  currentPassword: e.target.value,
                })
              }
            />

            <ModalInput
              type="password"
              placeholder="New Password"
              value={passwordData.newPassword}
              onChange={(e: any) =>
                setPasswordData({
                  ...passwordData,
                  newPassword: e.target.value,
                })
              }
            />

            <ModalButtonRow>
              <CancelButton onClick={() => setIsChangingPassword(false)}>
                Cancel
              </CancelButton>

              <PurpleButton onClick={handlePasswordUpdate}>Update</PurpleButton>
            </ModalButtonRow>
          </ModalContainer>
        </ModalOverlay>
      )}
    </>
  );
};
