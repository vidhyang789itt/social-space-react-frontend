const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PREFIX = `${BASE_URL}/api`;

export const API_ROUTES = {
  LOGIN: `${API_PREFIX}/login`,
  REGISTER: `${API_PREFIX}/register`,

  GET_PROFILE: `${API_PREFIX}/profile`,
  UPDATE_PROFILE: `${API_PREFIX}/profile`,
  UPDATE_IMAGE: `${API_PREFIX}/profile/image`,
  UPDATE_PASSWORD: `${API_PREFIX}/profile/password`,
  GET_ALL_USERS: `${API_PREFIX}/profile/users`,
  GET_SPECIFIC_USER: (userId: string) => `${API_PREFIX}/profile/${userId}`,

  FOLLOW_USER: (userId: string) => `${API_PREFIX}/connect/follow/${userId}`,
  UNFOLLOW_USER: (userId: string) => `${API_PREFIX}/connect/follow/${userId}`,
  GET_CONNECTIONS: (userId: string, type: string) =>
    `${API_PREFIX}/connect/connections/${userId}/${type}`,

  GET_FEED: (page: number, limit: number) =>
    `${API_PREFIX}/posts/feed?page=${page}&limit=${limit}`,
  POSTS_BASE: `${API_PREFIX}/posts`,
  MY_POSTS: (userId: string) => `${API_PREFIX}/posts/myposts/${userId}`,
  SINGLE_POST: (postId: string) => `${API_PREFIX}/posts/${postId}`,
  UPDATE_POST_IMAGE: (postId: string) => `${API_PREFIX}/posts/image/${postId}`,
  UPDATE_POST_MEDIA: (postId: string) => `${API_PREFIX}/posts/${postId}/media`,

  LIKEPOST: (postId: string) => `${API_PREFIX}/like/${postId}`,
  UNLIKEPOST: (postId: string) => `${API_PREFIX}/like/${postId}`,
  GETALLPOSTLIKES: (postId: string) => `${API_PREFIX}/like/${postId}`,

  COMMENTPOST: (postId: string) => `${API_PREFIX}/comment/${postId}`,
  GETALLPOSTCOMMENT: (postId: string) =>
    `${API_PREFIX}/comment/post/comments/${postId}`,
  GETALLUSERCOMMENT: `${API_PREFIX}/comment/user/comments`,
  EDITCOMMENT: (commentId: string) => `${API_PREFIX}/comment/${commentId}`,
  DELETECOMMENT: (commentId: string) => `${API_PREFIX}/comment/${commentId}`,

  CREATECONVERSATION: `${API_PREFIX}/chat/conversation`,
  GETUSERCONVERSATION: `${API_PREFIX}/chat/conversations`,
  GETMESSAGES: (conversationId: string, page: number, limit: number) => `${API_PREFIX}/chat/messages/${conversationId}?page=${page}&limit=${limit}`,
  GETALLUNREADCOUNTS: `${API_PREFIX}/chat/unread-count`,

  CREATE_GROUP_CHAT: `${API_PREFIX}/chat/group`,
  ADD_GROUP_MEMBER: (groupId: string) => `${API_PREFIX}/chat/group/${groupId}/members`,
  REMOVE_GROUP_MEMBER: (groupId: string, userId: string) => `${API_PREFIX}/chat/group/${groupId}/members/${userId}`,
  LEAVE_GROUP: (groupId: string) => `${API_PREFIX}/chat/group/${groupId}/leave`,
  UPDATE_GROUP_INFO: (groupId: string) => `${API_PREFIX}/chat/group/${groupId}`,
  UPDATE_GROUP_IMAGE: (convId : string) => `${API_PREFIX}/chat/group/${convId}/image`,
  DELETEGROUP: (groupId : string) => `${API_PREFIX}/chat/group/${groupId}`,
  DELETEMESSAGEFORME: (messageId: string) => `${API_PREFIX}/chat/message/${messageId}/delete-for-me`,
  DELETEMESSAGEFORALL: (messageId: string) => `${API_PREFIX}/chat/message/${messageId}/delete-for-all`,

  GETALLNOTIFICATIONS: `${API_PREFIX}/notification/`,
  MARKNOTIFICATIONASREAD: `${API_PREFIX}/notification/mark-read`,
  MARKNOTIFICATIONREAD: (notificationId: string) => `${API_PREFIX}/notification/${notificationId}/read`,

  UPLOADFILE: `${API_PREFIX}/upload`
};