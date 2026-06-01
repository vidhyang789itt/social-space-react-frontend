import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../hooks/useProfile";
import { updateProfileImage } from "../store/slices/userSlice";
import type { AppDispatch } from "../store/stores";
import { FollowAction } from "../components/profile/FollowAction";
import { ProfileInfo } from "../components/profile/ProfileInfo";
import * as S from "../styles/Profile.style";
import Loader from "../components/common/Loader";
import { MessageCircle } from "lucide-react";
import { getMediaUrl } from "../utils/getMediaUrl";

export const ProfilePage = () => {
  const profile = useProfile();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  if (profile.error) {
    return (
      <S.ProfilePageWrapper>
        <p style={{ textAlign: "center", color: "#ef4444", marginTop: "20px" }}>
          {profile.error}
        </p>
      </S.ProfilePageWrapper>
    );
  }

  if (profile.loading || !profile.viewedUser) {
    return (
      <S.ProfilePageWrapper>
        <Loader />
      </S.ProfilePageWrapper>
    );
  }

  const isOwnProfile = profile.currentUser?._id === profile.viewedUser._id;
  const isFollowing = profile.viewedUser.followers.includes(profile.currentUser?._id);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleMessageNavigate = () => {
    navigate(`/chat/${profile.viewedUser.userId}`);
  };

  return (
    <S.ProfilePageWrapper>
      <S.CoverSection>
        <S.CoverBackground />
      </S.CoverSection>

      <S.MainContent>
        <S.ProfileHeader>
          <div>
            <S.AvatarWrapper>
              <S.Avatar
                src={
                  profile.viewedUser.profileUrl
                    ? getMediaUrl(profile.viewedUser.profileUrl)
                    : "/profileImage.jpg"
                }
                alt="Profile"
              />

              {isOwnProfile && (
                <>
                  <S.ChangePhotoButton
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Change Photo
                  </S.ChangePhotoButton>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) dispatch(updateProfileImage(file));
                    }}
                  />
                </>
              )}
            </S.AvatarWrapper>
          </div>

          <S.InfoSection>
            <S.HeaderRow>
              <S.Username>{profile.viewedUser.username}</S.Username>

              {isOwnProfile ? (
                <S.ButtonRow>
                  <S.EditProfileButton
                    onClick={() => profile.setIsEditing(true)}
                  >
                    Edit Profile
                  </S.EditProfileButton>
                </S.ButtonRow>
              ) : (
                <S.ButtonRow style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <FollowAction targetUser={profile.viewedUser} />
                  
                  {isFollowing && (
                    <S.EditProfileButton 
                      onClick={handleMessageNavigate}
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '6px',
                        backgroundColor: 'transparent',
                        border: '1px solid #dbdbdb'
                      }}
                    >
                      <MessageCircle size={16} />
                      Message
                    </S.EditProfileButton>
                  )}
                </S.ButtonRow>
              )}
            </S.HeaderRow>

            <S.StatsRow>
              <div>
                <span>{profile.posts.length}</span> Posts
              </div>
              <div
                className="cursor-pointer"
                onClick={() =>
                  navigate(`/profile/${profile.viewedUser.userId}/followers`)
                }
              >
                <span>{profile.viewedUser.followers.length}</span> Followers
              </div>
              <div
                className="cursor-pointer"
                onClick={() =>
                  navigate(`/profile/${profile.viewedUser.userId}/following`)
                }
              >
                <span>{profile.viewedUser.following.length}</span> Following
              </div>
            </S.StatsRow>
          </S.InfoSection>
        </S.ProfileHeader>

        <S.TabDivider>
          <S.TabItem active>Posts</S.TabItem>
        </S.TabDivider>

        <S.PostsGrid>
          {profile.posts.map((post, index) => (
            <S.PostGridItem
              key={post.postId || index}
              onClick={() => navigate(`/post/${post.postId}`)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.02 }}
            >
              {post.imageUrl ? (
                <S.PostImage
                  src={`${BASE_URL}/${post.imageUrl}`}
                  alt={post.title}
                />
              ) : (
                <S.EmptyPostPlaceholder>{post.title}</S.EmptyPostPlaceholder>
              )}
              <S.PostOverlay>{post.title}</S.PostOverlay>
            </S.PostGridItem>
          ))}
        </S.PostsGrid>

        <S.PostsFooter />
      </S.MainContent>

      <ProfileInfo hookProps={profile} />
    </S.ProfilePageWrapper>
  );
};