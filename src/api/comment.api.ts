import { fetchClient } from "./fetchClient";
import { API_ROUTES } from "../constants/apiRoutes";
import type { Comment } from "../types/comment.type";

export const commentPostApi = (postId: string, content: string) => {
  return fetchClient<{ newComment: Comment }>(API_ROUTES.COMMENTPOST(postId), {
    method: "POST",
    requireAuth: true,
    body: JSON.stringify({ content }),
  });
};

export const getAllPostCommentsApi = (postId: string) => {
  return fetchClient<{ comments: Comment[] }>(
    API_ROUTES.GETALLPOSTCOMMENT(postId),
    {
      method: "GET",
      requireAuth: true,
    },
  );
};

export const getAllUserCommentsApi = () => {
  return fetchClient<{ comments: Comment[] }>(API_ROUTES.GETALLUSERCOMMENT, {
    method: "GET",
    requireAuth: true,
  });
};

export const editCommentApi = (commentId: string, content: string) => {
  return fetchClient<{ newComment: Comment }>(
    API_ROUTES.EDITCOMMENT(commentId),
    {
      method: "PUT",
      requireAuth: true,
      body: JSON.stringify({ content }),
    },
  );
};

export const deleteCommentApi = (commentId: string) => {
  return fetchClient<{ success: boolean }>(
    API_ROUTES.DELETECOMMENT(commentId),
    {
      method: "DELETE",
      requireAuth: true,
    },
  );
};
