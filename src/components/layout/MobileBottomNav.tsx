import { useNavigate } from "react-router-dom";
import { removeToken } from "../../utils/localStorage";
import { LayoutGrid, Users, User, LogOut, Plus, MessageCircle } from "lucide-react";
import { useState } from "react";
import styled from "styled-components";
import type { AppTheme } from "../../styles/theme";

const NavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: clamp(56px, 12vw, 70px);
  background: ${({ theme }: { theme: AppTheme }) => theme.headerBg};
  border-top: 1px solid ${({ theme }: { theme: AppTheme }) => theme.divider};
  display: none;
  justify-content: space-around;
  align-items: center;
  z-index: 50;
  padding: clamp(0.5rem, 1vw, 0.75rem) 0;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    display: flex;
  }

  @media (max-width: 480px) {
    height: 60px;
    padding: 0.5rem 0;
  }
`;

const NavButton = styled.button<{ $primary?: boolean; $isActive?: boolean }>`
  background: transparent;
  border: none;
  color: ${({ $isActive, $primary, theme }: { $isActive?: boolean; $primary?: boolean; theme: AppTheme }) =>
    $primary
      ? theme.accent
      : $isActive
        ? theme.accent
        : theme.textSecondary};
  cursor: pointer;
  padding: clamp(0.625rem, 2vw, 0.875rem);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  border-radius: clamp(8px, 2vw, 12px);
  min-height: 44px;
  min-width: 44px;
  position: relative;

  &:active:not(:disabled) {
    transform: scale(0.92);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: clamp(20px, 5vw, 28px);
    height: clamp(20px, 5vw, 28px);
    transition: all 0.2s ease;
  }

  ${({ $primary, theme }: { $primary?: boolean; theme: AppTheme }) =>
    $primary &&
    `
    box-shadow: 0 0 16px ${theme.accent}30;

    &:active:not(:disabled) {
      box-shadow: 0 0 24px ${theme.accent}50;
    }
  `}

  @media (max-width: 480px) {
    padding: 0.5rem;
    min-height: 40px;
    min-width: 40px;

    svg {
      width: 22px;
      height: 22px;
    }
  }
`;

const LogoutButtonStyled = styled(NavButton)`
  color: #dc2626;

  &:active:not(:disabled) {
    opacity: 0.8;
  }
`;

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path?: string;
  isPrimary?: boolean;
  action?: () => void;
}

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const [activePath, setActivePath] = useState("/home");

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  const navItems: NavItem[] = [
    {
      icon: <LayoutGrid size={24} />,
      label: "Dashboard",
      path: "/home",
    },
    {
      icon: <Users size={24} />,
      label: "Users",
      path: "/users",
    },
    {
      icon: <User size={24} />,
      label: "Profile",
      path: "/profile",
    },
    {
      icon: <MessageCircle size={24} />,
      label: "Messages",
      path: "/chat"
    }
  ];

  const handleNavigation = (item: NavItem) => {
    if (item.path) {
      setActivePath(item.path);
      navigate(item.path);
    }
  };

  const handleCreatePost = () => {
    navigate("/post/create");
  };

  return (
    <>
      <NavContainer>
        {navItems.map((item, index) => (
          <NavButton
            key={index}
            onClick={() => handleNavigation(item)}
            title={item.label}
            $isActive={activePath === item.path}
            type="button"
          >
            {item.icon}
          </NavButton>
        ))}

        <NavButton
          onClick={handleCreatePost}
          title="Create Post"
          $primary={true}
          type="button"
        >
          <Plus size={24} strokeWidth={2.5} />
        </NavButton>

        <LogoutButtonStyled
          onClick={handleLogout}
          title="Logout"
          type="button"
        >
          <LogOut size={24} />
        </LogoutButtonStyled>
      </NavContainer>
    </>
  );
};

export default MobileBottomNav;