import {
  DropdownContainer,
  DropdownFooter,
  DropdownResults,
  NoResults,
  ResultAvatar,
  ResultContent,
  ResultFollowerCount,
  ResultItem,
  ResultName,
} from "../../styles/searchResults";
import { getMediaUrl } from "../../utils/getMediaUrl";

interface SearchResultsProps {
  results: any[];
  query: string;
  onResultClick: (userId: string) => void;
  onViewAll: () => void;
  onClearSearch: () => void; 
  isDark: boolean;
  totalCount: number;
}

export const SearchResults = ({
  results,
  query,
  onResultClick,
  onViewAll,
  onClearSearch, 
  isDark,
  totalCount,
}: SearchResultsProps) => {

  if (query && (!results || results.length === 0)) {
    return (
      <DropdownContainer >
        <NoResults >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
            <span>❌ No users found for "{query}"</span>
            <button
              onClick={onClearSearch}
              style={{
                background: "none",
                border: "none",
                color: isDark ? "#8b5cf6" : "#8b5cf6",
                cursor: "pointer",
                fontSize: "0.85rem",
                textDecoration: "underline",
                padding: "0.25rem 0.5rem",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.opacity = "0.8";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.opacity = "1";
              }}
            >
              Clear search
            </button>
          </div>
        </NoResults>
      </DropdownContainer>
    );
  }

  if (!query) {
    return null;
  }

  return (
    <DropdownContainer>
      <DropdownResults>
        {results.map((user) => (
          <ResultItem
            key={user._id}
            onClick={() => onResultClick(user.userId)}
          >
            <ResultAvatar
              src={
                user.profileUrl
                  ? getMediaUrl(user.profileUrl)
                  : "/profileImage.jpg"
              }
              alt={user.username}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/profileImage.jpg";
              }}
            />

            <ResultContent>
              <ResultName>{user.username}</ResultName>
            </ResultContent>

            <ResultFollowerCount >
              Followers: {user.followers?.length || 0}
            </ResultFollowerCount>
          </ResultItem>
        ))}
      </DropdownResults>

      {totalCount > results.length && (
        <DropdownFooter onClick={onViewAll}>
          View all {totalCount} users
        </DropdownFooter>
      )}
    </DropdownContainer>
  );
};