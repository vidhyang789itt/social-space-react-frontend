import { fetchClient } from "./fetchClient";
import { API_ROUTES } from "../constants/apiRoutes";
import type { Post, CreatePostPayload, UpdatePostMediaPayload } from "../types/post.types";

export const getFeedApi = (page: number = 1, limit: number = 10) => {
  return fetchClient<{
    success: boolean;
    body: Post[];
    pagination: {
      totalPosts: number;
      totalPages: number;
      currentPage: number;
    };
  }>(API_ROUTES.GET_FEED(page, limit), {
    method: "GET",
    requireAuth: true,
  });
};

export const createPostApi = (payload: CreatePostPayload) => {
  const formData = new FormData();
  formData.append("title", payload.title);
  formData.append("content", payload.content);

  if (payload.media && payload.media.length > 0) {
    for (const file of payload.media) {
      formData.append("media", file);
    }
  }

  return fetchClient<{ success: boolean; data: Post }>(
    API_ROUTES.POSTS_BASE,
    {
      method: "POST",
      body: formData,
      requireAuth: true,
    },
  );
};

export const getUserPostsApi = (userId: string) => {
  return fetchClient<{ success: boolean; body: Post[] }>(
    API_ROUTES.MY_POSTS(userId),
    {
      method: "GET",
      requireAuth: true,
    },
  );
};

export const getSinglePostApi = (postId: string) => {
  return fetchClient<{ success: boolean; data: Post }>(
    API_ROUTES.SINGLE_POST(postId),
    {
      method: "GET",
      requireAuth: true,
    },
  );
};

export const deletePostApi = (postId: string) => {
  return fetchClient<{ success: boolean }>(API_ROUTES.SINGLE_POST(postId), {
    method: "DELETE",
    requireAuth: true,
  });
};

export const updatePostApi = (
  postId: string,
  body: { title: string; content: string },
) => {
  return fetchClient<{ success: boolean; data: Post }>(
    API_ROUTES.SINGLE_POST(postId),
    {
      method: "PUT",
      body: JSON.stringify(body),
      requireAuth: true,
    },
  );
};

export const updatePostMediaApi = (payload: UpdatePostMediaPayload) => {
  const formData = new FormData();

  if (payload.media && payload.media.length > 0) {
    for (const file of payload.media) {
      formData.append("media", file);
    }
  }

  if (payload.removeMediaIds && payload.removeMediaIds.length > 0) {
    formData.append("removeMediaIds", JSON.stringify(payload.removeMediaIds));
  }

  return fetchClient<{ success: boolean; data: Post }>(
    API_ROUTES.UPDATE_POST_MEDIA(payload.postId),
    {
      method: "PUT",
      body: formData,
      requireAuth: true,
    },
  );
};