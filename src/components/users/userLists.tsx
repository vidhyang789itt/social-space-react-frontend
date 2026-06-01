import * as S from "../../styles/Users.Style";
import type { User } from "../../types/user.types";
import { UserCard } from "./userCard";

interface Props {
  title: string;
  users: any[];
  currentUser: User | null;
}

export const UserList = ({ title, users, currentUser }: Props) => {
  return (
    <S.UsersWrapper>
      <S.UsersListHeader>{title}</S.UsersListHeader>

      {users.length === 0 ? (
        <S.EmptyStateContainer>
          <S.EmptyStateIcon>👥</S.EmptyStateIcon>
          <S.EmptyStateTitle>No Users Found</S.EmptyStateTitle>
          <S.EmptyStateText>
            Try adjusting your search or filters to find more users
          </S.EmptyStateText>
        </S.EmptyStateContainer>
      ) : (
        <S.UsersContainer>
          {users.map((user) => {
            const isFollowing =
              currentUser?.following?.includes(user._id) ?? false;
            return (
              <UserCard
                key={user._id}
                user={user}
                isFollowing={isFollowing}
                allUsers={users}
              />
            );
          })}
        </S.UsersContainer>
      )}
    </S.UsersWrapper>
  );
};