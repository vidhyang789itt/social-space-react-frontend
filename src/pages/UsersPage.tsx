import { useUsers } from "../hooks/useUsers";
import { PageWrapper } from "../styles/Users.Style";
import { UserList } from "../components/users/userLists";
import Loader from "../components/common/Loader";
import { useState, useMemo, useEffect } from "react";
import * as S from "../styles/Users.Style";
import { useSearchParams } from "react-router-dom";

export const UsersPage = () => {
  const { users, loading, currentUser, error } = useUsers();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "followers" | "alphabetical">("recent");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const query = searchParams.get("search");
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  const filteredAndSortedUsers = useMemo(() => {
    let filtered = users.filter((user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.bio?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    switch (sortBy) {
      case "followers":
        filtered.sort((a, b) => (b.followers?.length || 0) - (a.followers?.length || 0));
        break;
      case "alphabetical":
        filtered.sort((a, b) => a.username.localeCompare(b.username));
        break;
      case "recent":
      default:
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return filtered;
  }, [users, searchQuery, sortBy]);

  if (loading && users.length === 0) {
    return (
      <PageWrapper>
        <S.LoadingContainer>
          <Loader />
        </S.LoadingContainer>
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper>
        <S.ErrorMessage>{error}</S.ErrorMessage>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <S.UsersHeader>
        <S.HeaderContent>
          <h1>Discover Users</h1>
          <p>Find and connect with people in the community</p>
        </S.HeaderContent>
      </S.UsersHeader>

      <S.SearchAndFilterSection>
        <S.SearchBox>
          <S.SearchIcon>🔍</S.SearchIcon>
          <S.SearchInput
            type="text"
            placeholder="Search users by name or bio..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </S.SearchBox>

        <S.FilterGroup>
          <S.FilterLabel>Sort by:</S.FilterLabel>
          <S.SortButtons>
            {(["recent", "followers", "alphabetical"] as const).map((option) => (
              <S.SortButton
                key={option}
                isActive={sortBy === option}
                onClick={() => setSortBy(option)}
              >
                {option === "recent" && "Recently Joined"}
                {option === "followers" && "Most Followers"}
                {option === "alphabetical" && "A - Z"}
              </S.SortButton>
            ))}
          </S.SortButtons>
        </S.FilterGroup>
      </S.SearchAndFilterSection>

      <UserList
        title={`All Users (${filteredAndSortedUsers.length})`}
        users={filteredAndSortedUsers}
        currentUser={currentUser}
      />
    </PageWrapper>
  );
};