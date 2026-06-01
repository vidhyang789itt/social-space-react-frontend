import { useNavigate } from "react-router-dom";
import * as S from "../../styles/Users.Style";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/stores";
import { FollowAction } from "../profile/FollowAction";
import { getMediaUrl } from "../../utils/getMediaUrl";

interface UserCardProps {
  user: any;
  isFollowing: boolean;
  allUsers: any[];
}

export const UserCard = ({ user, allUsers }: UserCardProps) => {
  const navigate = useNavigate();
  const { user: currentUser } = useSelector((state: RootState) => state.auth);

  const mutualUsers =
    user.followers
      ?.filter((id: string) => currentUser?.following?.includes(id))
      .map((id: string) => allUsers.find((u) => u._id === id))
      .filter(Boolean) || [];

  return (
    <S.UserCardContainer onClick={() => navigate(`/profile/${user.userId}`)}>
      <S.UserCardHeader>
        <S.UserAvatarWrapper>
          <S.UserAvatar
            src={
              user.profileUrl
                ? getMediaUrl(user.profileUrl)
                : "/profileImage.jpg"
            }
            alt={user.username}
          />
          {user.isOnline && <S.OnlineIndicator />}
        </S.UserAvatarWrapper>
      </S.UserCardHeader>

      <S.UserCardContent>
        <S.UserNameWrapper>
          <S.UserName>{user.username}</S.UserName>
        </S.UserNameWrapper>

        {user.bio && <S.UserBio>{user.bio}</S.UserBio>}

        {mutualUsers.length > 0 && (
          <S.MutualContainer>
            <S.MutualText>
              Followed by <strong>{mutualUsers[0]?.username}</strong>
              {mutualUsers.length > 1 && (
                <> and {mutualUsers.length - 1} others</>
              )}
            </S.MutualText>
          </S.MutualContainer>
        )}

        <S.UserStatsContainer>
          <S.UserStat>
            <S.StatValue>{user.followers?.length || 0}</S.StatValue>
            <S.StatLabel>Followers</S.StatLabel>
          </S.UserStat>
          <S.StatDivider />
          <S.UserStat>
            <S.StatValue>{user.following?.length || 0}</S.StatValue>
            <S.StatLabel>Following</S.StatLabel>
          </S.UserStat>
        </S.UserStatsContainer>
      </S.UserCardContent>

      <S.UserCardFooter onClick={(e) => e.stopPropagation()}>
        <FollowAction targetUser={user} />
      </S.UserCardFooter>
    </S.UserCardContainer>
  );
};