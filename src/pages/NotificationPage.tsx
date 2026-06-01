import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchNotifications, 
  markAllAsRead,
  markNotificationAsRead
} from "../store/slices/notificationSlice";
import type { RootState, AppDispatch } from "../store/stores";
import { formatDistanceToNow } from "date-fns";
import * as S from "../styles/Notification.styles";
import { Heart, MessageSquare, UserPlus, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { NotificationType } from "../types/NotificationType";
import { useNotifications } from "../hooks/useNotifications";
import { useTheme } from "../components/theme/ThemeContext";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, type AppTheme } from "../styles/theme";
import { groupNotificationsByDate } from "../utils/NotificationGroup";
import { getMediaUrl } from "../utils/getMediaUrl";

const renderTypeIcon = (type: string) => {
  switch (type) {
    case 'LIKE':
      return <Heart size={16} fill="#ef4444" color="#ef4444" />;
    case 'COMMENT':
      return <MessageSquare size={16} fill="#3b82f6" color="#3b82f6" />;
    case 'FOLLOW':
      return <UserPlus size={16} color="#10b981" />;
    default:
      return null;
  }
};

const NotificationPageContent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { notifications, loading } = useSelector((state: RootState) => state.notifications);
  const [filter, setFilter] = useState("ALL");
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  useNotifications();

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  useEffect(() => {
    if (notifications.length > 0) {
    }
  }, [notifications]);

  const filtered = notifications.filter(n => filter === "ALL" || n.type === filter);
  
  const groupedNotifications = groupNotificationsByDate(filtered);

  useEffect(() => {
  }, [groupedNotifications]);

  const handleNotificationClick = async (notification: NotificationType) => {
    if (!notification.isRead) {
      dispatch(markNotificationAsRead(notification._id));
    }

    switch (notification.type) {
      case 'COMMENT':
      case 'LIKE':
        if (notification.referenceId?.postId) {
          navigate(`/post/${notification.referenceId.postId}`);
        }
        break;
      case 'FOLLOW':
        navigate(`/profile/${notification.sender.userId}`);
        break;
      default:
        break;
    }
  };

  return (
    <S.PageWrapper>
      <S.Header>
        <h1>Notifications</h1>
        <S.MarkReadBtn onClick={() => dispatch(markAllAsRead())}>
          Mark all as read
        </S.MarkReadBtn>
      </S.Header>

      <S.FilterSection>
        {["ALL", "LIKE", "COMMENT", "FOLLOW"].map(tab => (
          <S.FilterTab
            key={tab}
            $active={filter === tab}
            onClick={() => setFilter(tab)}
          >
            {tab}
          </S.FilterTab>
        ))}
      </S.FilterSection>

      <S.ContentArea>
        {loading && notifications.length === 0 ? (
          <S.EmptyState>
            <p>Loading notifications...</p>
          </S.EmptyState>
        ) : filtered.length === 0 ? (
          <S.EmptyState>
            <Bell size={56} />
            <p>
              {notifications.length === 0 
                ? "No notifications yet" 
                : `No ${filter.toLowerCase()} notifications`}
            </p>
          </S.EmptyState>
        ) : (
          groupedNotifications.map((group) => (
            <S.NotificationSection key={group.label}>
              <S.SectionHeader>{group.label}</S.SectionHeader>
              {group.notifications.map((n) => (
                <S.NotificationItem
                  key={n._id}
                  $isRead={!!n.isRead}
                  onClick={() => handleNotificationClick(n)}
                >
                  <S.AvatarWrapper>
                    <S.Avatar
                      src={n.sender.profileUrl ? getMediaUrl(n.sender.profileUrl) : "/profileImage.jpg"}
                      alt={n.sender.username}
                    />
                    <S.TypeIconWrapper>
                      {renderTypeIcon(n.type)}
                    </S.TypeIconWrapper>
                  </S.AvatarWrapper>

                  <S.Content>
                    <p>
                      <strong>{n.sender.username}</strong>
                      {n.type === 'COMMENT' ? (
                        <>
                          {" commented on your post: "}
                          <span style={{ fontStyle: 'italic', opacity: 0.8 }}>
                            "{n.content?.substring(0, 40)}
                            {(n.content?.length || 0) > 40 ? '...' : ''}"
                          </span>
                        </>
                      ) : n.type === 'LIKE' ? (
                        <>{" liked your post"}</>
                      ) : n.type === 'FOLLOW' ? (
                        <>{" started following you"}</>
                      ) : (
                        <> {n.content}</>
                      )}
                    </p>
                    <S.Time>{formatDistanceToNow(new Date(n.createdAt))} ago</S.Time>
                  </S.Content>

                  {(n.type === 'LIKE' || n.type === 'COMMENT') && n.referenceId?.imageUrl && (
                    <S.PostThumbnail
                      src={`${BASE_URL}/${n.referenceId.imageUrl}`}
                      alt="post preview"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (n.referenceId?.postId) {
                          navigate(`/post/${n.referenceId.postId}`);
                        }
                      }}
                    />
                  )}

                  {!n.isRead && <S.UnreadIndicator />}
                </S.NotificationItem>
              ))}
            </S.NotificationSection>
          ))
        )}
      </S.ContentArea>
    </S.PageWrapper>
  );
};

const NotificationPage: React.FC = () => {
  const { theme } = useTheme();
  const currentTheme: AppTheme = theme === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <NotificationPageContent />
    </ThemeProvider>
  );
};

export default NotificationPage;