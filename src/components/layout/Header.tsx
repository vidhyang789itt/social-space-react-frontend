import { useNavigate } from "react-router-dom";
import { SearchInput, SearchPosition, SearchWrapper } from "../../styles/Post.style";
import { HeaderContainer, Logo } from "../../styles/layout.styles";
import { Search, Menu, X } from "lucide-react";
import { useTheme } from "../theme/ThemeContext";
import { ProfileImageDiv } from "../../styles/NewPostCardStyle";
import type { RootState } from "../../store/stores";
import { useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { SearchResults } from "./searchResults";
import { getMediaUrl } from "../../utils/getMediaUrl";

export const Header = ({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}) => {
  const navigate = useNavigate();
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const allUsers = useSelector((state: RootState) => state.users.users);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (!searchQuery.trim()) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    debounceTimer.current = setTimeout(() => {
      performLocalSearch(searchQuery);
    }, 200);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [searchQuery, allUsers]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const performLocalSearch = (query: string) => {
    const lowerQuery = query.toLowerCase();

    const results = allUsers
      .filter(
        (user: any) =>
          user.username.toLowerCase().includes(lowerQuery) ||
          user.bio?.toLowerCase().includes(lowerQuery) ||
          user.email?.toLowerCase().includes(lowerQuery)
      )
      .slice(0, 6);

    setSearchResults(results);
    setShowDropdown(true);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowDropdown(false);
  };

  const handleViewAll = () => {
    if (searchQuery.trim()) {
      navigate(`/users?search=${encodeURIComponent(searchQuery)}`);
      setShowDropdown(false);
      setSearchQuery("");
    }
  };

  const handleResultClick = (userId: string) => {
    navigate(`/profile/${userId}`);
    setSearchQuery("");
    setShowDropdown(false);
  };

  return (
    <HeaderContainer>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="hidden md:flex items-center justify-center w-10 h-10 rounded-lg transition-colors cursor-pointer"
          style={{
            backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
            color: isDark ? "white" : "black",
          }}
          title="Toggle sidebar"
        >
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <Logo
          onClick={() => navigate("/home")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(0.5rem, 1.5vw, 0.75rem)",
            cursor: "pointer",
          }}
        >
          <img 
            src="/logo2.png" 
            style={{
              width: "clamp(32px, 6vw, 44px)",
              height: "clamp(32px, 6vw, 44px)",
              borderRadius: "50%",
              objectFit: "cover",
            }}
            alt="Logo"
          />

          <span 
            style={{
              fontSize: "clamp(16px, 4vw, 24px)",
              fontWeight: "900",
              color: isDark ? "white" : "black",
              letterSpacing: "0.5px",
              margin: 0,
              lineHeight: 1.2,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            className="hidden sm:inline" 
          >
            SocialSpace
          </span>
        </Logo>
      </div>

      <div className="flex-1 flex justify-center px-4 md:px-10 w-2/3" ref={searchRef}>
        <SearchPosition>
          <SearchWrapper>
            <Search size={18} />
            <SearchInput
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.trim() && setShowDropdown(true)}
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                style={{
                  position: "absolute",
                  right: "0.75rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0.25rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = isDark
                    ? "rgba(255,255,255,0.8)"
                    : "rgba(0,0,0,0.8)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = isDark
                    ? "rgba(255,255,255,0.5)"
                    : "rgba(0,0,0,0.5)";
                }}
                title="Clear search"
              >
                <X size={18} />
              </button>
            )}
              {showDropdown && searchQuery.trim() && (
              <SearchResults
                results={searchResults}
                query={searchQuery}
                onResultClick={handleResultClick}
                onViewAll={handleViewAll}
                onClearSearch={handleClearSearch}
                isDark={isDark}
                totalCount={allUsers.length}
              />
            )}`
          </SearchWrapper>


        </SearchPosition>
      </div>

      <div className="flex items-center">
        <ProfileImageDiv onClick={() => navigate(`/profile`)}>
          <img
            src={
              currentUser?.profileUrl
                ? getMediaUrl(currentUser.profileUrl)
                : "/profileImage.jpg"
            }
            alt="Profile"
          />
        </ProfileImageDiv>
      </div>
    </HeaderContainer>
  );
};