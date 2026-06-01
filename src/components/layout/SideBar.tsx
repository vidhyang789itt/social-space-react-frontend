import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutGrid,
  Users,
  User,
  LogOut,
  Plus,
  Settings,
  MessageCircle,
  Bell,
} from "lucide-react";
import { removeToken } from "../../utils/localStorage";
import { SideItem } from "../../styles/layout.styles";
import { useProfile } from "../../hooks/useProfile";
import { ConfirmModal } from "../post/DeletePostModal";
import { useTheme } from "../theme/ThemeContext";
import { ProfileInfo } from "../profile/ProfileInfo";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/stores";
import React from "react";

const UnreadBadge = ({ count }: { count: number }) => {
  if(count == 0) return;
  
  return (
    <div
      className="
        absolute -top-2 -right-2 flex items-center justify-center 
        bg-red-500
        text-white text-[10px] font-bold 
        min-w-[20px] h-[20px] px-1.5 rounded-full 
        border-2 border-white dark:border-black 
        z-10
        animate-pulse
      "
      title={`${count} unread`}
    >
      {count > 99 ? "99+" : count}
    </div>
  );
};

interface SidebarContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const SidebarContext =
  React.createContext<SidebarContextType | undefined>(undefined);

const Sidebar = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const profile = useProfile();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { unreadChatCount } = useSelector(
    (state: RootState) => state.chats
  );

  const { unreadCount: unreadNotificationCount } = useSelector(
    (state: RootState) => state.notifications
  );

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const isDark = theme === "dark";

  const handleDelete = async () => {
    removeToken();
    navigate("/login");
  };

  const navItems = [
    { icon: <LayoutGrid size={22} />, label: "Dashboard", path: "/home" },
    { icon: <Users size={22} />, label: "Users", path: "/users" },
    {
      icon: <MessageCircle size={22} />,
      label: "Messages",
      path: "/chat",
      badge: unreadChatCount,
    },
    { icon: <User size={22} />, label: "Profile", path: "/profile" },
    { icon: <Plus size={22} />, label: "Add Post", isPrimary: true },
    {
      icon: <Bell size={22} />,
      label: "Notifications",
      path: "/notifications",
      badge: unreadNotificationCount,
    },
  ];

  const handleToggleSettings = () => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setPosition({
      top: rect.top - 150,
      left: 10,
    });
    setSettingsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setSettingsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <aside
        className={`
          group hidden md:flex fixed top-16 left-0 z-50
          h-[calc(100vh-64px)]
          ${open ? "w-64" : "w-20"}
          transition-all duration-500 ease-in-out
          overflow-hidden flex-col
        `}
        style={{
          background: isDark ? "black" : "#ffffff",
          borderRight: `1px solid ${
            isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.1)"
          }`,
        }}
      >
        <div className="flex flex-col gap-2 px-3 mt-6">
          {navItems.map((item, index) => {
            const isActive =
              item.path &&
              (location.pathname === item.path ||
                (item.path !== "/home" &&
                  location.pathname.startsWith(item.path)));

            if (item.isPrimary) {
              return (
                <SideItem
                  key={item.label}
                  $primary
                  onClick={() => navigate("/post/create")}
                  className="flex items-center w-full mt-4"
                >
                  <div className="flex items-center justify-center w-10 h-10">
                    {item.icon}
                  </div>
                  <span
                    className={`ml-4 font-semibold whitespace-nowrap transition-opacity duration-300 ${
                      open ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {item.label}
                  </span>
                </SideItem>
              );
            }

            return (
              <SideItem
                key={index}
                onClick={() => {
                  navigate(item.path || "");
                  if (window.innerWidth < 768) {
                    setOpen(false);
                  }
                }}
                style={{
                  color: isActive ? "#8b5cf6" : isDark ? "#94a3b8" : "#64748b",
                  backgroundColor: isActive
                    ? "rgba(139, 92, 246, 0.1)"
                    : "transparent",
                  position: "relative",
                }}
                className="group/item flex items-center transition-all duration-200"
              >
                <div className="relative flex items-center justify-center w-10 h-10">
                  <div className={`${isActive ? "text-[#8b5cf6]" : ""}`}>
                    {item.icon}
                  </div>

                  {item.label === "Messages" && item.badge !== undefined && (
                    <UnreadBadge count={item.badge} />
                  )}

                  {item.label === "Notifications" &&
                    item.badge !== undefined && (
                      <UnreadBadge count={item.badge} />
                    )}
                </div>

                <span
                  className={`ml-4 font-medium whitespace-nowrap transition-opacity duration-300 ${
                    open ? "opacity-100" : "opacity-0"
                  } ${isActive ? "font-bold" : ""}`}
                >
                  {item.label}
                </span>

                {isActive && (
                  <div className="absolute left-0 w-1 h-6 bg-[#8b5cf6] rounded-r-full" />
                )}
              </SideItem>
            );
          })}
        </div>

        <div className="flex-1" />

        <div className="px-3 pb-6 flex flex-col gap-2">
          <SideItem
            ref={buttonRef}
            onClick={handleToggleSettings}
            className={`group/item cursor-pointer ${
              settingsOpen
                ? "bg-gray-100 dark:bg-zinc-900"
                : ""
            }`}
          >
            <div className="flex items-center justify-center w-10 h-10">
              <Settings
                size={22}
                className={settingsOpen ? "text-[#8b5cf6]" : ""}
              />
            </div>
            <span
              className={`ml-4 font-medium whitespace-nowrap transition-opacity duration-300 ${
                open ? "opacity-100" : "opacity-0"
              }`}
            >
              Settings
            </span>
          </SideItem>

          <SideItem
            onClick={() => setShowDeleteModal(true)}
            className="group/item hover:!bg-red-500/10 hover:!text-red-500"
          >
            <div className="flex items-center justify-center w-10 h-10">
              <LogOut size={22} />
            </div>
            <span
              className={`ml-4 font-medium whitespace-nowrap transition-opacity duration-300 ${
                open ? "opacity-100" : "opacity-0"
              }`}
            >
              Logout
            </span>
          </SideItem>
        </div>
      </aside>

      {settingsOpen && (
        <div
          ref={panelRef}
          style={{
            position: "fixed",
            top: position.top,
            left: position.left,
            background: isDark
              ? "rgba(24,24,27,0.95)"
              : "rgba(255,255,255,0.95)",
            border: `1px solid ${
              isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
            }`,
            color: isDark ? "white" : "black",
          }}
          className="w-60 rounded-2xl p-4 z-[60] shadow-2xl backdrop-blur-xl transition-all duration-300 animate-in fade-in slide-in-from-left-4"
        >
          <div className="flex items-center justify-between p-2">
            <span className="text-sm font-medium">Appearance</span>
            <button
              onClick={toggleTheme}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                isDark ? "bg-[#8b5cf6]" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${
                  isDark ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>
          <div className="mt-2 pt-2 border-t border-gray-200 dark:border-zinc-800">
            <button
              onClick={() => {
                profile.setIsChangingPassword(true);
                setSettingsOpen(false);
              }}
              className="w-full text-left px-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 text-sm font-medium transition-colors"
            >
              🔐 Change Password
            </button>
          </div>
        </div>
      )}

      <ConfirmModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={async () => {
          await handleDelete();
          setShowDeleteModal(false);
        }}
        action="Logout"
        message="Are you sure you want to logout?"
        messageHead="Logout"
      />

      <ProfileInfo hookProps={profile} />
    </>
  );
};

export default Sidebar;