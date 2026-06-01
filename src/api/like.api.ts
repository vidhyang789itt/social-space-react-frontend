import { fetchClient } from "./fetchClient";
import { API_ROUTES } from "../constants/apiRoutes";

export const likePostApi = (postId: string) => {
  return fetchClient<{}>(API_ROUTES.LIKEPOST(postId), {
    method: "POST",
    requireAuth: true,
  });
};

export const unlikePostApi = (postId: string) => {
  return fetchClient<{}>(API_ROUTES.UNLIKEPOST(postId), {
    method: "DELETE",
    requireAuth: true,
  });
};

export const getAllPostLikesApi = (postId: string) => {
  return fetchClient<{}>(API_ROUTES.GETALLPOSTLIKES(postId), {
    method: "GET",
    requireAuth: true,
  });
};
